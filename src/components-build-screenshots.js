const _ = require('lodash');
const chalk = require('chalk');
const co = require('co');
const express = require('express');
const filesize = require('filesize');
const fs = require('fs');
const Jimp = require('jimp');
const Nightmare = require('nightmare');
const path = require('path');
const tmp = require('tmp');

const defaults = require('./components-build-defaults');

const startServer = options => new Promise((resolve) => {
  const app = express();
  app.set('port', options.serverPort);
  app.use(express.static(path.join(__dirname, '..')));
  const server = app.listen(app.get('port'), () => {
    console.log('- Started static HTML server on port:', server.address().port);
    resolve(server);
  });
});

const initNightmare = () => Nightmare({ // eslint-disable-line
  show: false,
  frame: false,
  useContentSize: true,
  switches: {
    // Unfortunately .viewport() sets the viewport size in *CSS pixels*.
    // Let's force device pixel ratio to 1 otherwise screenshots will vary in size
    // depending on the machine running this script (double for Retina Macbook Pro)
    // https://github.com/segmentio/nightmare/issues/498#issuecomment-265948400
    'force-device-scale-factor': '1',
  },
});

const formatFromSizeToSize = (from, to) => `(${filesize(from)} => ${filesize(to)})`;

module.exports = _options => new Promise((resolve, reject) => {
  const options = _.assign({}, defaults, _options);
  console.log(chalk.magenta('Working on components screenshots...'));
  if (options.componentsForNavPath === undefined || !fs.existsSync(options.componentsForNavPath)) {
    reject('Can not find components nav JSON file');
    return;
  }
  if (!options.componentsBuildScreenshots) {
    console.log(chalk.dim('Skipped by request.'));
    resolve();
    return;
  }
  const componentsForNav = JSON.parse(fs.readFileSync(options.componentsForNavPath, 'utf8'));

  const nightmare = initNightmare();

  let tmpTotalFileSize = 0;
  let screenshotTotalFileSize = 0;
  const renderPromise = co(function* generator() {
    // Setup a quick static HTML server so that CSS is loaded correctly.
    const server = yield startServer(options);

    // Unfortunately, can't use forEach() in generators, so let's for()...
    const categories = Object.keys(componentsForNav);
    for (let cat_idx = 0; cat_idx < categories.length; cat_idx += 1) {
      const category = categories[cat_idx];
      console.log(chalk.yellow('- Processing category:'), category);

      for (let comp_idx = 0; comp_idx < componentsForNav[category].length; comp_idx += 1) {
        const component = componentsForNav[category][comp_idx];
        let selector = options.screenshotSelector;
        if (component.frontMatter.screenshot && component.frontMatter.screenshot.selector) {
          selector = `${selector} ${component.frontMatter.screenshot.selector}`;
        }

        // Grab the size of the component enclosing rectangle
        // https://github.com/segmentio/nightmare/issues/498#issuecomment-189156529
        const componentRect = yield nightmare
          .viewport(options.screenshotViewportWidth, options.screenshotViewportMaxHeight)
          // .wait(1000)
          .goto(`http://localhost:${options.serverPort}${component.href}`)
          .wait(selector)
          .evaluate((_selector) => {
            // Hide scrollbar that could pop up due to .scrollTo
            const sheet = document.styleSheets[0];
            sheet.insertRule('::-webkit-scrollbar { display:none; }');
            const element = document.querySelector(_selector);
            if (element) {
              const rect = element.getBoundingClientRect();
              return {
                x: Math.round(rect.left),
                y: Math.round(rect.top),
                width: Math.round(rect.width),
                height: Math.round(rect.height),
              };
            }
            return false;
          }, selector);

        // Capture the component
        if (componentRect === false) {
          console.log(chalk.red('  * FAILED to create screenshot:'), component.screenshot.name);
          continue; // eslint-disable-line
        }
        const tmpObj = tmp.fileSync({ dir: path.dirname(component.screenshot.path) });
        componentRect.height = Math.min(componentRect.height, options.screenshotViewportMaxHeight);
        yield nightmare
          // we can not use .screenshot() with componentRect, so constrain the viewport instead
          .viewport(
            componentRect.width || options.screenshotViewportWidth,
            componentRect.height || options.screenshotViewportMaxHeight
          ).scrollTo(componentRect.y, componentRect.x)
          // .wait(1000)
          // do *not* use componentRect in .screenshot() below or risk distortions
          .screenshot(tmpObj.name);
        const tmpFileSize = fs.statSync(tmpObj.name).size;
        tmpTotalFileSize += tmpFileSize;

        // Resize and convert
        const screenshot = yield Jimp.read(tmpObj.name);
        yield new Promise((write_resolve, write_reject) => {
          if (component.frontMatter.screenshot === undefined ||
              component.frontMatter.screenshot.autocrop !== false) {
            screenshot.autocrop(0.0, false);
          }
          // Allow shrinking, up to a point
          const scaleHeight = screenshot.bitmap.height <= options.screenshotFinalMinHeight
            ? 0.0 : options.screenshotFinalMinHeight / screenshot.bitmap.height;
          const scaleWidth = screenshot.bitmap.width <= options.screenshotFinalMinWidth
            ? 0.0 : options.screenshotFinalMinWidth / screenshot.bitmap.width;
          const scale = Math.max(scaleHeight, scaleWidth);
          screenshot
            .scale(scale > 0 ? scale : 1.0)
            .quality(options.screenshotCompressionQuality)
            .write(component.screenshot.path, (err) => {
              if (err) {
                write_reject(err);
              }
              write_resolve();
            });
        });

        tmpObj.removeCallback();
        const screenshotFileSize = fs.statSync(component.screenshot.path).size;
        screenshotTotalFileSize += screenshotFileSize;
        console.log(
          '  * Created screenshot:',
          component.screenshot.path,
          chalk.dim(formatFromSizeToSize(tmpFileSize, screenshotFileSize))
        );
      } // Loop over components
    } // Loop over categories

    yield nightmare.end();
    server.close();
    console.log('- Closed static HTML server');
    console.log(
      chalk.magenta('Done with components screenshots!'),
      chalk.dim(formatFromSizeToSize(tmpTotalFileSize, screenshotTotalFileSize))
    );
  });

  resolve(renderPromise);

  // TODO: optimize all PNG files, eventually resize to smaller width
  // const imagemin = require('imagemin');
  // const imageminPngquant = require('imagemin-pngquant');
  // imagemin(['components/*.{jpg,png}'], ??, {
  //     plugins: [
  //         imageminPngquant({quality: '65-80'})
  //     ]
  // }).then(files => {
  //     console.log(files);
  //     //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
  // });
  //
}); // return promise

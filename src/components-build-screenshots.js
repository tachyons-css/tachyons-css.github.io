const _ = require('lodash');
const chalk = require('chalk');
const co = require('co');
const express = require('express');
const filesize = require('filesize');
const fs = require('fs');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const Jimp = require('jimp');
const Nightmare = require('nightmare');
const path = require('path');
const prettyHrtime = require('pretty-hrtime');
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
  const options = _.merge({}, defaults, _options);
  const startTime = process.hrtime();
  console.log(chalk.magenta('Working on components screenshots...'));
  if (options.components.forNavPath === undefined || !fs.existsSync(options.components.forNavPath)) {
    reject('Can not find components nav JSON file');
    return;
  }
  if (!options.components.buildScreenshots) {
    console.log(chalk.dim('Skipped by request.'));
    resolve();
    return;
  }
  const componentsForNav = JSON.parse(fs.readFileSync(options.components.forNavPath, 'utf8'));

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
        const frontMatter = _.merge({}, options.components.frontMatter, component.frontMatter);

        // Grab the size of the component enclosing rectangle
        // https://github.com/segmentio/nightmare/issues/498#issuecomment-189156529
        const componentRect = yield nightmare
          .viewport(options.screenshot.viewportWidth, options.screenshot.viewportHeight)
          // .wait(1000)
          .goto(`http://localhost:${options.serverPort}${component.href}`)
          .wait(frontMatter.screenshot.selector)
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
          }, frontMatter.screenshot.selector);

        // Capture the component
        if (componentRect === false) {
          console.log(chalk.red('  * FAILED to create screenshot:'), component.screenshot.name);
          continue; // eslint-disable-line
        }

        const screenshotDir = path.dirname(component.screenshot.path);
        const tmpPngObj = tmp.fileSync({ dir: screenshotDir });
        componentRect.height = Math.min(componentRect.height, options.screenshot.viewportHeight);
        yield nightmare
          // we can not use .screenshot() with componentRect, so constrain the viewport instead
          .viewport(
            componentRect.width || options.screenshot.viewportWidth,
            componentRect.height || options.screenshot.viewportHeight
          ).scrollTo(componentRect.y, componentRect.x)
          // .wait(1000)
          .screenshot(tmpPngObj.name); // do *not* use componentRect here or risk distortions

        // Resize and convert to JPEG, and optimize
        const tmpJpegDirObj = tmp.dirSync({ dir: screenshotDir, unsafeCleanup: true });
        const tmpJpegPath = path.join(tmpJpegDirObj.name, path.basename(component.screenshot.path));
        const screenshot = yield Jimp.read(tmpPngObj.name);
        yield new Promise((write_resolve, write_reject) => {
          if (frontMatter.screenshot.autocrop) {
            screenshot.autocrop(false);
          }
          // Allow shrinking, up to a point
          const scaleHeight = screenshot.bitmap.height <= options.screenshot.targetMinHeight
            ? 0.0 : options.screenshot.targetMinHeight / screenshot.bitmap.height;
          const scaleWidth = screenshot.bitmap.width <= options.screenshot.targetMinWidth
            ? 0.0 : options.screenshot.targetMinWidth / screenshot.bitmap.width;
          const scale = Math.max(scaleHeight, scaleWidth);
          screenshot
            .scale(scale > 0 ? scale : 1.0)
            // Do not use .quality() here, default max quality helps optimizers below
            .write(tmpJpegPath, (jimp_err) => {
              if (jimp_err) {
                write_reject(jimp_err);
              }
              // Optimize
              imagemin([tmpJpegPath], screenshotDir, {
                plugins: [
                  imageminMozjpeg({ quality: options.screenshot.mozjpegQuality }),
                  // imageminJpegRecompress(), // this guy is useless
                  // imageminJpegtran(),       // this guy is useless
                ],
              }).then(() => {
                write_resolve();
              }).catch((imagemin_err) => {
                write_reject(imagemin_err);
              });
            });
        });

        const tmpFileSize = fs.statSync(tmpPngObj.name).size;
        tmpTotalFileSize += tmpFileSize;
        const screenshotFileSize = fs.statSync(component.screenshot.path).size;
        screenshotTotalFileSize += screenshotFileSize;

        // Cleanup
        tmpPngObj.removeCallback();
        fs.unlinkSync(tmpJpegPath);
        tmpJpegDirObj.removeCallback();

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
    const elapsed = process.hrtime(startTime);
    console.log(
      chalk.magenta('Done with components screenshots!'),
      chalk.dim(formatFromSizeToSize(tmpTotalFileSize, screenshotTotalFileSize)),
      chalk.dim(prettyHrtime(elapsed))
    );
  });

  resolve(renderPromise);
}); // return promise

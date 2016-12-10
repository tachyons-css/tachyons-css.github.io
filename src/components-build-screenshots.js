const chalk = require('chalk');
const co = require('co');
const express = require('express');
const fs = require('fs');
const Nightmare = require('nightmare');
const path = require('path');

const screenshotTargetWidth = 1024;
const screenshotMaxHeight = 768;
const screenshotSelector = '[data-name="component-container"]';
const serverPort = 3333;

module.exports = componentsForNavPath => new Promise((resolve, reject) => {
  console.log(chalk.magenta('Working on components screenshots...'));
  if (componentsForNavPath === undefined || !fs.existsSync(componentsForNavPath)) {
    reject('Can not find components nav JSON file');
  }
  const componentsForNav = JSON.parse(fs.readFileSync(componentsForNavPath, 'utf8'));

  // Setup a quick static HTML server so that CSS is loaded correctly.
  const app = express();
  app.set('port', serverPort);
  app.use(express.static(path.join(__dirname, '..')));
  const server = app.listen(app.get('port'), () => {
    console.log('- Started static HTML server on port:', server.address().port);
  });

  // Initialize nightmware now.
  const nightmare = Nightmare({ // eslint-disable-line
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

  const renderPromise = co(function* generator() {
    const categories = Object.keys(componentsForNav);
    for (let cat_idx = 0; cat_idx < categories.length; cat_idx += 1) {
      const category = categories[cat_idx];
      console.log(chalk.yellow('- Processing category:'), category);

      for (let comp_idx = 0; comp_idx < componentsForNav[category].length; comp_idx += 1) {
        const component = componentsForNav[category][comp_idx];
        let selector = screenshotSelector;
        if (component.frontMatter.screenshot && component.frontMatter.screenshot.selector) {
          selector = `${selector} ${component.frontMatter.screenshot.selector}`;
        }

        // Grab the size of the component enclosing rectangle
        // https://github.com/segmentio/nightmare/issues/498#issuecomment-189156529
        const componentRect = yield nightmare
          .viewport(screenshotTargetWidth, screenshotMaxHeight)
          // .wait(1000)
          .goto(`http://localhost:${app.get('port')}${component.href}`)
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
        if (componentRect !== false) {
          componentRect.height = Math.min(componentRect.height, screenshotMaxHeight);
          yield nightmare
            // we can not use .screenshot() with componentRect, so constrain the viewport instead
            .viewport(componentRect.width, componentRect.height)
            .scrollTo(componentRect.y, componentRect.x)
            // .wait(1000)
            // do *not* use componentRect in .screenshot() below or risk distortions
            .screenshot(component.screenshot.path)
            .then(() => {
              console.log('  * Created screenshot: ', component.screenshot.href);
            });
        }
      } // Loop over components
    } // Loop over categories
    yield nightmare.end();
  }).then(() => {
    console.log('- Closed static HTML server');
    server.close();
    console.log(chalk.magenta('Done with components screenshots!'));
  }, (err) => {
    console.error(err);
    reject(err);
  });

  return resolve(renderPromise);

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

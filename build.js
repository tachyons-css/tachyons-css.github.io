const chalk = require('chalk');
const co = require('co');
const prettyHrtime = require('pretty-hrtime');

const startTime = process.hrtime();

// require('./src/header-build')()
// require('./src/gallery-build')()
// require('./src/resources-build')()
// console.log('header build complete')
// require('./src/table-of-styles-build')()
// console.log('table of styles build complete')
// require('./src/table-of-properties-build')()
// console.log('table of properties build complete')
// require('./src/home-build')()
// console.log('home build complete')

const componentsBuildIndex = require('./src/components-build-index');
const componentsBuildPages = require('./src/components-build-pages');
const componentsBuildScreenshots = require('./src/components-build-screenshots');

// See src/components-build-defaults for list of options that can be overriden
const options = {
  // componentsGlobPattern: 'src/components/text/*.html',
};

// Note that componentsBuildIndex() generates the index *and* the JSON
// file listing all the components pages and screenshots should be built for.
// Scenario: if you are working on one component, uncomment and set componentsGlobPattern
// in the options above to only (re-)generate the index, pages, and screenshots for the
// corresponding category. When you are done, comment componentsGlobPattern back, comment
// the line below that generate the screenshots, then run the script -- this will
// re-create the full index page for all components, re-generate all the pages (since they need
// to cross-reference the new component), and use the previously generated screenshots as well
// as the new one (i.e. no need to re-generate *all* the screenshots unless you made
// modifications to the screenshots script itself).
co(function* generator() {
  yield componentsBuildIndex(options);        // <- builds component index page and JSON index
  yield componentsBuildPages(options);        // <- comment to skip building pages
  yield componentsBuildScreenshots(options);  // <- comment to skip building screenshots
}).then(() => {
  const elapsed = process.hrtime(startTime);
  console.log(chalk.green('All done'), chalk.dim(prettyHrtime(elapsed)));
}).catch((err) => {
  console.log(err);
});

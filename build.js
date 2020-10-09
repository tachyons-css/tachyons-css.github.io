const chalk = require('chalk');
const co = require('co');
const prettyHrtime = require('pretty-hrtime');

const startTime = process.hrtime();

 require('./src/header-build')()
// require('./src/gallery-build')()
 //require('./src/resources-build')()
 console.log('header build complete')
 require('./src/table-of-styles-build')()
 console.log('table of styles build complete')
 require('./src/table-of-properties-build')()
 console.log('table of properties build complete')
 require('./src/home-build')()
 console.log('home build complete')

//const componentsBuildList = require('./src/components-build-list');
//const componentsBuildIndex = require('./src/components-build-index');
//const componentsBuildRSS = require('./src/components-build-rss');
//const componentsBuildPages = require('./src/components-build-pages');
//const componentsBuildScreenshots = require('./src/components-build-screenshots');

// See src/components-build-defaults for list of options that can be overriden
const options = {
  components: {
    // globPattern: 'src/components/article**/*.html',
    // frontMatter: {
    //   bodyClass: 'bg-red',
    //   screenshot: {
    //     autocrop: false,
    //   },
    // },
  },
  // screenshot: {
  //   aspectRatio: '16x9',
  // },
};

// Note that componentsBuildList() generates a temporary components list (saved as JSON),
// which is re-used by later steps (for performance).
// If you are working on one component, uncomment and set components.GlobPattern
// in the options above to only (re-)generate the list, index, pages, and screenshots for the
// corresponding category. Once you are done, comment components.GlobPattern back, comment
// the line below that generate the screenshots, then run the script -- this will
// re-create the full index pages for all components, re-generate all the pages (since they need
// to cross-reference the new component), and use the previously generated screenshots as well
// as the new one (i.e. no need to re-generate *all* the screenshots unless you made
// modifications to the screenshots script itself).
co(function* generator() {
  //yield componentsBuildList(options);        // <- builds temporary components list (JSON)
  //yield componentsBuildIndex(options);       // <- builds index pages (by category & most recent)
  //yield componentsBuildRSS(options);         // <- builds RSS feed
  //yield componentsBuildPages(options);       // <- comment to skip building pages
  //yield componentsBuildScreenshots(options); // <- comment to skip building screenshots
}).then(() => {
  const elapsed = process.hrtime(startTime);
  console.log(chalk.green('All done'), chalk.dim(prettyHrtime(elapsed)));
}).catch((err) => {
  console.log(err);
});

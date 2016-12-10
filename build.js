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

// The rest of the build process is async and requires some promises
// var comp_build = Promise.resolve(true); // uncomment and comment next to skip build

const componentsBuildIndex = require('./src/components-build-index');
const componentsBuildPages = require('./src/components-build-pages');
const componentsBuildScreenshots = require('./src/components-build-screenshots');

const globPattern = 'src/components/cards/*.html';
componentsBuildIndex(globPattern)
.then(componentsForNavPath => componentsBuildPages(componentsForNavPath))
.then(componentsForNavPath => componentsBuildScreenshots(componentsForNavPath))
.then(() => {
  console.log('All done');
})
.catch((err) => {
  console.log(err);
});

// var comp_build = require('./src/components-build')();
// comp_build.then(function () {
//   console.log('components build complete')
// }).then(function () {
//   // return require('./src/components-screenshot-build')().then(function () {
//   //   console.log('components screenshots complete')
//   // })
// })

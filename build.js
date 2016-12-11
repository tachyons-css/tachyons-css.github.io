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

// The rest of the build process is async and return promises
const componentsBuildIndex = require('./src/components-build-index');
const componentsBuildPages = require('./src/components-build-pages');
const componentsBuildScreenshots = require('./src/components-build-screenshots');

// See components-build-defaults for list of options
const options = {
  // componentsGlobPattern: 'src/components/text/*.html',
  componentsBuildPages: true, // false to skip
  componentsBuildScreenshots: true, // false to skip
};

componentsBuildIndex(options)
.then(() => componentsBuildPages(options))
.then(() => componentsBuildScreenshots(options))
.then(() => {
  console.log('All done');
})
.catch((err) => {
  console.log(err);
});

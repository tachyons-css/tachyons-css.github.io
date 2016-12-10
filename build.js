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
var comp_build = require('./src/components-build')();
comp_build.then(function () {
  console.log('components build complete')
}).then(function () {
  return require('./src/components-screenshot-build')().then(function () {
    console.log('components screenshots complete')
  })
})

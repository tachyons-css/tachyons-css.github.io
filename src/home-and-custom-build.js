var _ = require('lodash')
var fs = require('fs')
var filesize = require('filesize')
var camelize = require('camelize')
var cssstats = require('cssstats')
var tachyonsModules = require('tachyons-modules')


module.exports = function () {
  var homePagePkgs = []
  var customBuildPkgs = []
  var modulesCount = 0
  tachyonsModules().then(function (moduleList) {
    // TODO: Missing tachyons-skins
    moduleList = moduleList

    moduleList.forEach(function (module) {
      var pkg = require(module.name + '/package.json')
      var css = fs.readFileSync('node_modules/' + module.name + '/css/' + module.name + '.min.css', 'utf8')
      var stats = cssstats(css)
      var size = filesize(stats.gzipSize)
      homePagePkgs.push({
        pkg: pkg,
        stats: stats,
        size: size
      })

      customBuildPkgs.push({
        name: pkg.name,
        version: pkg.version,
        size: size,
        css: css
      })
    })

    return render(homePagePkgs, customBuildPkgs, moduleList.length)
  }).catch(function (e) {
    console.log('Rendering Failed:')
    console.log(e)
    throw e
  })
}

function render (indexModules, customModules, modulesCount) {
  var tachyons = require('../package.json')

  var css = fs.readFileSync('./css/tachyons.css', 'utf8')
  var cssMin = fs.readFileSync('./css/tachyons.min.css', 'utf8')

  var obj = cssstats(cssMin)
  var size = filesize(obj.gzipSize)

  var template = fs.readFileSync('./src/templates/index.html', 'utf8')
  var head = fs.readFileSync('./src/templates/head.html', 'utf8')
  var siteFooter = fs.readFileSync('./src/templates/footer.html', 'utf8')
  var siteHeader = fs.readFileSync('./src/templates/header.html', 'utf8')
  var custom = fs.readFileSync('./src/templates/custom.html', 'utf8')

  var tpl = _.template(template)
  var index = tpl({
    size: size,
    version: tachyons.version,
    modulesCount: modulesCount,
    siteFooter: siteFooter,
    siteHeader: siteHeader,
    head: head,
    modules: indexModules
  })

  var custom_tpl = _.template(custom)
  var custom_build = custom_tpl({
    siteFooter: siteFooter,
    siteHeader: siteHeader,
    head: head,
    modules: customModules
  })


  fs.writeFileSync('./index.html', index)
  fs.writeFileSync('./custom/index.html', custom_build)
  console.log(size)
}

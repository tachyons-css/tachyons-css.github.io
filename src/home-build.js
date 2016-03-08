var _ = require('lodash')
var fs = require('fs')
var filesize = require('filesize')
var camelize = require('camelize')
var cssstats = require('cssstats')
var tachyonsModules = require('tachyons-modules')

var pkgs = []
var modulesCount = 0

module.exports = function () {
  tachyonsModules().then(function (moduleList) {
    // TODO: Missing tachyons-skins
    moduleList = moduleList
    moduleCount = moduleList.length

    moduleList.forEach(function (module) {
      var pkg = require(module.name + '/package.json')
      var css = fs.readFileSync('node_modules/' + module.name + '/css/' + module.name + '.min.css', 'utf8')
      var stats = cssstats(css)
      var size = filesize(stats.gzipSize)
      pkgs.push({
        pkg: pkg,
        stats: stats,
        size: size
      })
    })

    return renderHomePage(pkgs)
  }).catch(function (e) {
    console.log('Home Page Build Failed:')
    console.log(e)
    throw e
  })
}

function renderHomePage (modules) {
  var tachyons = require('../package.json')

  var css = fs.readFileSync('./css/tachyons.css', 'utf8')
  var cssMin = fs.readFileSync('./css/tachyons.min.css', 'utf8')

  var obj = cssstats(cssMin)
  var size = filesize(obj.gzipSize)

  var template = fs.readFileSync('./src/templates/index.html', 'utf8')
  var head = fs.readFileSync('./src/templates/head.html', 'utf8')
  var siteFooter = fs.readFileSync('./src/templates/footer.html', 'utf8')
  var siteHeader = fs.readFileSync('./src/templates/header.html', 'utf8')

  var tpl = _.template(template)
  var html = tpl({
    size: size,
    version: tachyons.version,
    modulesCount: modulesCount,
    siteFooter: siteFooter,
    siteHeader: siteHeader,
    head: head,
    modules: modules
  })

  fs.writeFileSync('./index.html', html)
  console.log(size)
}

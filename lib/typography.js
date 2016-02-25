var _ = require('lodash')
var fs = require('fs')
var gzip = require('gzip-size')
var filesize = require('filesize')
var cssstats = require('cssstats')


var module = require('tachyons-type-scale/package.json')
var moduleCss = fs.readFileSync('node_modules/tachyons-type-scale/css/tachyons-type-scale.min.css', 'utf8')
var moduleObj = cssstats(moduleCss)
var moduleSize = filesize(moduleObj.gzipSize)
var moduleName = module.name.split("tachyons-").pop()

var srcCSS = fs.readFileSync('./src/css/_type-scale.css', 'utf8')
var navDocs = fs.readFileSync('./src/templates/nav_docs.html', 'utf8')
var siteFooter = fs.readFileSync('./src/templates/footer.html', 'utf8')
var siteHeader = fs.readFileSync('./src/templates/header.html', 'utf8')
var googleAnalytics = fs.readFileSync('./src/templates/ga.html', 'utf8')


var template = fs.readFileSync('./src/templates/docs/type-scale/index.html', 'utf8')
var tpl = _.template(template)
var html = tpl({
  moduleVersion: module.version,
  moduleSize: moduleSize,
  name: moduleName,
  moduleObj: moduleObj,
  srcCSS: srcCSS,
  navDocs: navDocs,
  siteFooter: siteFooter,
  googleAnalytics: googleAnalytics,
  siteHeader: siteHeader
})

fs.writeFileSync('./docs/typography/scale/index.html', html)

var _ = require('lodash')
var fs = require('fs')
var gzip = require('gzip-size')
var filesize = require('filesize')
var postcss = require('postcss')

var cssstats = require('cssstats')

var module = require('tachyons-widths/package.json')
var moduleCss = fs.readFileSync('./node_modules/tachyons-widths/css/tachyons-widths.min.css', 'utf8')
var moduleObj = cssstats(moduleCss)
var moduleSize = filesize(moduleObj.gzipSize)
var moduleName = module.name

var srcCSS = fs.readFileSync('./src/css/_widths.css', 'utf8')
var navDocs = fs.readFileSync('./src/templates/nav_docs.html', 'utf8')
var siteFooter = fs.readFileSync('./src/templates/footer.html', 'utf8')
var siteHeader = fs.readFileSync('./src/templates/header.html', 'utf8')
var head = fs.readFileSync('./src/templates/head.html', 'utf8')
var googleAnalytics = fs.readFileSync('./src/templates/ga.html', 'utf8')
var googleAnalytics = fs.readFileSync('./src/templates/ga.html', 'utf8')


var template = fs.readFileSync('./src/templates/docs/widths/index.html', 'utf8')
var tpl = _.template(template)
var html = tpl({
  moduleVersion: module.version,
  moduleSize: moduleSize,
  moduleObj: moduleObj,
  srcCSS: srcCSS,
  name: moduleName,
  navDocs: navDocs,
  siteFooter: siteFooter,
  googleAnalytics: googleAnalytics,
  head: head,
  siteHeader: siteHeader

})

fs.writeFileSync('./docs/layout/widths/index.html', html)

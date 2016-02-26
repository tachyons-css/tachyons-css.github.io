var _ = require('lodash')
var fs = require('fs')
var gzip = require('gzip-size')
var filesize = require('filesize')
var postcss = require('postcss')

var cssstats = require('cssstats')

var module = require('tachyons-floats/package.json')
var moduleCss = fs.readFileSync('node_modules/tachyons-floats/css/tachyons-floats.min.css', 'utf8')
var moduleObj = cssstats(moduleCss)
var moduleSize = filesize(moduleObj.gzipSize)
var moduleName = module.name

var srcCSS = fs.readFileSync('./src/css/_floats.css', 'utf8')
var navDocs = fs.readFileSync('./src/templates/nav_docs.html', 'utf8')
var siteFooter  = fs.readFileSync('./src/templates/footer.html', 'utf8')
var siteHeader  = fs.readFileSync('./src/templates/header.html', 'utf8')
var googleAnalytics = fs.readFileSync('./src/templates/ga.html', 'utf8')

var template = fs.readFileSync('./src/templates/docs/floats/index.html', 'utf8')
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

fs.writeFileSync('./docs/layout/floats/index.html', html)

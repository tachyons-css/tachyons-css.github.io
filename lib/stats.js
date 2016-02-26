var _ = require('lodash')
var fs = require('fs')
var filesize = require('filesize')
var cssstats = require('cssstats')

var module = require('./package.json')
var moduleObj = cssstats(moduleCss)
var moduleSize = filesize(moduleObj.gzipSize)
var moduleName = module.name

var siteFooter = fs.readFileSync('./templates/footer.html', 'utf8')
var siteHeader = fs.readFileSync('./templates/header.html', 'utf8')
var googleAnalytics = fs.readFileSync('./src/templates/ga.html', 'utf8')

var template = fs.readFileSync('./templates/stats.html', 'utf8')
var tpl = _.template(template)
var html = tpl({
  moduleSize: moduleSize,
  name: moduleName,
  moduleObj: moduleObj,
  siteFooter: siteFooter,
  googleAnalytics: googleAnalytics,
  siteHeader: siteHeader
})

fs.writeFileSync('./stats/index.html', html)

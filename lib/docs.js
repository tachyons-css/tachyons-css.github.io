var _ = require('lodash')
var fs = require('fs')
var gzip = require('gzip-size')
var filesize = require('filesize')
var postcss = require('postcss')

var navDocs = fs.readFileSync('./src/templates/nav_docs.html', 'utf8')
var siteFooter = fs.readFileSync('./src/templates/footer.html', 'utf8')
var siteHeader = fs.readFileSync('./src/templates/header.html', 'utf8')
var googleAnalytics = fs.readFileSync('./src/templates/ga.html', 'utf8')

var template = fs.readFileSync('./src/templates/docs/index.html', 'utf8')
var tpl = _.template(template)
var html = tpl({
  navDocs: navDocs,
  siteFooter: siteFooter,
  googleAnalytics: googleAnalytics,
  siteHeader: siteHeader
})

fs.writeFileSync('./docs/index.html', html)

var _ = require('lodash')
var fs = require('fs')
var filesize = require('filesize')
var camelize = require('camelize')
var cssstats = require('cssstats')

module.exports = function () {
  return renderResources()
}

function renderResources () {
  var tachyons = require('../package.json')

  var css = fs.readFileSync('./css/tachyons.css', 'utf8')
  var cssMin = fs.readFileSync('./css/tachyons.min.css', 'utf8')

  var obj = cssstats(cssMin)
  var size = filesize(obj.gzipSize)

  var template = fs.readFileSync('./src/templates/resources.html', 'utf8')
  var head = fs.readFileSync('./src/templates/head.html', 'utf8')
  var siteFooter = fs.readFileSync('./src/templates/footer.html', 'utf8')
  var siteHeader = fs.readFileSync('./src/templates/header.html', 'utf8')

  var tpl = _.template(template)
  var html = tpl({
    size: size,
    version: tachyons.version,
    siteFooter: siteFooter,
    siteHeader: siteHeader,
    head: head,
  })

  fs.writeFileSync('./resources/index.html', html)
}

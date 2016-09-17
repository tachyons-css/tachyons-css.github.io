var _ = require('lodash')
var fs = require('fs')

module.exports = function () {
  return renderHeader()
}

function renderHeader () {
  var tachyons = require('../package.json')

  var template = fs.readFileSync('./src/templates/header-template.html', 'utf8')

  var tpl = _.template(template)
  var html = tpl({
    version: tachyons.version
  })

  fs.writeFileSync('./src/templates/header.html', html)
}

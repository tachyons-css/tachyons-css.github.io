var fs = require('fs')
var _ = require('lodash')
var path = require('path')
var mkdirp = require('mkdirp')
var glob = require('glob')
var escapeHtml = require('escape-html')
var titleize = require('titleize')
var fm = require('json-front-matter')

var footer = fs.readFileSync('src/templates/footer.html', 'utf8')
var analytics = fs.readFileSync('src/templates/ga.html', 'utf8')
var head = fs.readFileSync('src/templates/head.html', 'utf8')
var highlight = fs.readFileSync('src/templates/highlight.html', 'utf8')

module.exports = function () {
  glob('src/css/**/*.css', {}, function (err, cssModules) {
    if (err) {
      console.error(err)
      return
    }

    var template = fs.readFileSync('src/templates/customize.html', 'utf8')

    cssModules = cssModules.map(function (cssModule) {
      var css = fs.readFileSync(cssModule)
      var name = cssModule.split('/')[2].replace('.css', '').replace('_', '')
      return {
        name: name,
        css: escapeHtml(css)
      }
    })

    var compiledPage = _.template(template)({
      cssModules: cssModules,
      title: 'Customize',
      analytics: analytics,
      footer: footer,
      head: head
    })

    mkdirp.sync('customize')
    fs.writeFileSync('customize/index.html', compiledPage)
    console.log('customize page build done')
  })
}

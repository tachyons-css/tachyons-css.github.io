var fs = require('fs')
var _ = require('lodash')
var path = require('path')
var mkdirp = require('mkdirp')
var glob = require('glob')
var titleize = require('titleize')
var fm = require('json-front-matter')
var escapeHtml = require('escape-html')
var rmHtmlExt = require('remove-html-extension')
var getClasses = require('get-classes-from-html')
var postcss = require('postcss')
var select = require('postcss-select')
var atImport = require('postcss-import')
var conditionals = require('postcss-conditionals')
var removeComments = require('postcss-discard-comments')
var perfectionist = require('perfectionist')
var removeEmpty = require('postcss-discard-empty')
var cssVariables = require('postcss-css-variables')
var customMedia = require('postcss-custom-media')
var mqPacker = require('css-mqpacker')
var cssstats = require('cssstats')

var tachyonsCss = fs.readFileSync('src/css/tachyons.css', 'utf8')

module.exports = function () {
  glob('src/components/**/*.html', {}, function (err, components) {
    if (err) {
      console.error(err)
      return
    }

    var indexTemplate = fs.readFileSync('src/templates/footer-template.html', 'utf8')

    var componentsByCategory = {}
    components.map(function (component) {
      var componentTokens = component.replace('src/components/', '').split('/')
      var category = componentTokens[0]

      componentsByCategory[category] = componentsByCategory[category] || []
      componentsByCategory[category].push({
        href: component.replace('src', '').replace('.html', '') + '/index.html',
        name: getName(component)
      })
    })

    var compiledPage = _.template(indexTemplate)({
      componentsByCategory: componentsByCategory,
      title: 'Components',
    })

    mkdirp.sync('components')
    fs.writeFileSync('src/templates/footer.html', compiledPage)

  })
}

function getTitle(component) {
  var title = rmHtmlExt(component).replace('src/components/', '').replace(/(\/|_|-)/g, ' ')
  return titleize(title)
}

function getName(component) {
  return titleize(getTitle(component.split('/')[3]))
}

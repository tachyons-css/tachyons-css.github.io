var fs = require('fs')
var _ = require('lodash')
var path = require('path')
var glob = require('glob')
var titleize = require('titleize')
var fm = require('json-front-matter')
var rmHtmlExt = require('remove-html-extension')

glob('src/components/**/*.html', {}, function (err, components) {
  if (err) {
    console.error(err)
    return
  }

  var cson = '".text.html":\n\n'
  components.forEach(function (component) {
    var prefix = rmHtmlExt(component.replace('src/components/', '')).split('/')[1]
    var componentHtml = fs.readFileSync(component, 'utf8')

    var fmParsed = fm.parse(componentHtml)
    var frontMatter = fmParsed.attributes || {}

    cson += `
    '${frontMatter.title || getTitle(component)}':
      'prefix': '${prefix}'
      'body': """
      ${fmParsed.body.trim()}
      """
`
  })

  console.log(cson)
})

function getTitle(component) {
  var title = rmHtmlExt(component).replace('src/components/', '').replace(/(\/|_|-)/g, ' ')
  return titleize(title)
}

function getName(component) {
  return titleize(getTitle(component.split('/')[3]))
}

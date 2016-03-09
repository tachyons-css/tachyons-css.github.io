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

    var template = fs.readFileSync('src/templates/components.html', 'utf8')

    var componentsForNav = {}
    components.map(function (component) {
      var componentTokens = component.replace('src/components/', '').split('/')
      var category = componentTokens[0]

      componentsForNav[category] = componentsForNav[category] || []
      componentsForNav[category].push({
        href: component.replace('src', '').replace('.html', '') + '/index.html',
        name: getTitle(component)
      })
    })

    components.forEach(function (component) {
      var newDir = rmHtmlExt(component.replace('src/', ''))
      var newFile = newDir + '/index.html'
      var componentHtml = fs.readFileSync(component, 'utf8')

      var fmParsed = fm.parse(componentHtml)
      var frontMatter = fmParsed.attributes || {}
      frontMatter.bodyClass = frontMatter.bodyClass || ''
      frontMatter.title = frontMatter.title || getTitle(component)
      frontMatter.classes = getClasses(fmParsed.body).map(function(klass) {
        return '.' + klass
      })
      frontMatter.componentHtml = componentHtml
      frontMatter.content = fmParsed.body
      frontMatter.escapedHtml = escapeHtml(fmParsed.body)
      frontMatter.footer = fs.readFileSync('src/templates/footer.html', 'utf8')
      frontMatter.analytics = fs.readFileSync('src/templates/ga.html', 'utf8')
      frontMatter.head = fs.readFileSync('src/templates/head.html', 'utf8')
      frontMatter.componentsForNav = componentsForNav

      var moduleSrcs = {}
      var getModules = postcss.plugin('get-modules', function () {
        return function (css, result) {
          css.walkRules(function (rule) {
            moduleSrcs[rule.source.input.from] = true
          })
        }
      })

      frontMatter.componentCss = postcss([
        atImport(), cssVariables(), conditionals(), customMedia(), select(frontMatter.classes),
        removeComments(), mqPacker(), getModules()
      ]).process(tachyonsCss, {
        from: 'src/css/tachyons.css'
      }).css

      frontMatter.stats = cssstats(frontMatter.componentCss)

      // TODO: Update me once src/ uses the npm modules
      frontMatter.modules = Object.keys(moduleSrcs).map(function (module) {
        return 'tachyons-' + module.split('/_')[1].replace('.css', '')
      })

      var compiledPage = _.template(template)(frontMatter)
      mkdirp.sync(newDir)
      fs.writeFileSync(newFile, compiledPage)
    })
  })
}

function getTitle(component) {
  var title = rmHtmlExt(component).replace('src/components/', '').replace(/(\/|_|-)/g, ' ')
  return titleize(title)
}

var fs = require('fs')
var _ = require('lodash')
var mkdirp = require('mkdirp')
var postcss = require('postcss')
var atImport = require('postcss-import')
var removeComments = require('postcss-discard-comments')
var isRoot = require('is-css-root')

module.exports = function () {
  var tachyonsCss = fs.readFileSync('src/css/tachyons.css', 'utf8')
  var navDocs = fs.readFileSync('./src/templates/nav_docs.html', 'utf8')
  var siteFooter = fs.readFileSync('./src/templates/footer.html', 'utf8')
  var siteHeader = fs.readFileSync('./src/templates/header.html', 'utf8')
  var head = fs.readFileSync('./src/templates/head.html', 'utf8')
  var googleAnalytics = fs.readFileSync('./src/templates/ga.html', 'utf8')
  var template = fs.readFileSync('src/templates/table_of_properties.html', 'utf8')
  var frontMatter = {}

  var properties = {};
  var getTrs = postcss.plugin('get-trs', function () {
    return function (css, result) {
      css.walkRules(function (rule) {
        if (isRoot(rule.selector)) { return }

        var moduleName = rule.source.input.from.split('/_')[1].replace('.css', '')

        if (moduleName === 'normalize') { return }

        rule.nodes.map(function (decl) {
          var data = properties[decl.prop] = properties[decl.prop] || {
            modules: {},
            selectors: {}
          }
          data.modules[moduleName] = true
          data.selectors[rule.selector] = decl.value
        })
      })
    }
  })

  postcss([
    atImport(), removeComments(), getTrs()
  ]).process(tachyonsCss, {
    from: 'src/css/tachyons.css'
  }).then(function () {
    var tableData = Object.keys(properties).sort().map(
      function (property) {
        var newRow = '<tr>' +
          '<td class="bb b--black-05 pv3">' + '<pre class="f6 f5-l">' + property + '</pre>'+'</td>' +
          '<td class="bb b--black-05 pv3 mw6">' +
            '<pre class="f6 f5-l" style="white-space:pre-wrap; word-wrap:break-word;">' +
            Object.keys(properties[property].selectors).sort().map(function (selector) {
              return  selector + ': ' + properties[property].selectors[selector]
            }).join('<br>') +
            '</pre>' +
          '</td>' +
          '<td class="bb b--black-05 pv2">' +
            Object.keys(properties[property].modules).map(function (moduleName) {
              return '<a class="link blue dim f6 f5-l" href="https://github.com/tachyons-css/tachyons-' + moduleName +'">' + moduleName + '</a>'
            }).join('<br>') +
          '</td>' +
          '</tr>'
        return newRow
      })
      .join('\n')

    var compiledPage = _.template(template)({
      name: 'Table of Properties',
      tableData: tableData,
      navDocs: navDocs,
      siteFooter: siteFooter,
      googleAnalytics: googleAnalytics,
      head: head,
      siteHeader: siteHeader
    })

    mkdirp.sync('docs/table-of-properties')
    fs.writeFileSync('docs/table-of-properties/index.html', compiledPage)
  })
}

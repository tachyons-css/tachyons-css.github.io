var fs = require('fs')
var _ = require('lodash')
var path = require('path')
var mkdirp = require('mkdirp')
var glob = require('glob')
var titleize = require('titleize')
var postcss = require('postcss')
var atImport = require('postcss-import')
var removeComments = require('postcss-discard-comments')
var cssstats = require('cssstats')
var isRoot = require('is-css-root')
var isBlank = require('is-blank')

module.exports = function () {
  var tachyonsCss = fs.readFileSync('src/css/tachyons.css', 'utf8')
  var navDocs = fs.readFileSync('./src/templates/nav_docs.html', 'utf8')
  var siteFooter = fs.readFileSync('./src/templates/footer.html', 'utf8')
  var siteHeader = fs.readFileSync('./src/templates/header.html', 'utf8')
  var head = fs.readFileSync('./src/templates/head.html', 'utf8')
  var googleAnalytics = fs.readFileSync('./src/templates/ga.html', 'utf8')
  var template = fs.readFileSync('src/templates/table_of_styles.html', 'utf8')
  var frontMatter = {}

  var tableData = ''
  var getTrs = postcss.plugin('get-trs', function () {
    return function (css, result) {
      css.walkRules(function (rule) {
        if (isRoot(rule.selector)) { return }

        var moduleName = rule.source.input.from.split('/_')[1].replace('.css', '')

        if (moduleName === 'normalize') { return }

        var newRow = '<tr>' +
          '<td>' + rule.selector + '</td>' +
          '<td>' +
            rule.nodes.map(function (decl) {
              return '<pre>' + decl.prop + ':' + decl.value
            }).join('<br>') +
          '</td>' +
          '<td><a href="https://github.com/tachyons-css/tachyons-' + moduleName +'">' + moduleName + '</a></td>' +
        '</tr>'

        tableData += newRow
      })
    }
  })

  postcss([
    atImport(), removeComments(), getTrs()
  ]).process(tachyonsCss, {
    from: 'src/css/tachyons.css'
  }).css

  var compiledPage = _.template(template)({
    name: 'Table of Styles',
    tableData: tableData,
    navDocs: navDocs,
    siteFooter: siteFooter,
    googleAnalytics: googleAnalytics,
    head: head,
    siteHeader: siteHeader
  })

  mkdirp.sync('docs/table-of-styles')
  fs.writeFileSync('docs/table-of-styles/index.html', compiledPage)
}

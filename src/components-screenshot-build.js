var co = require('co')
var express = require('express');
var fm = require('json-front-matter')
var fs = require('fs')
var glob = require('glob')
var Nightmare = require('nightmare')
var path = require('path')
var rmHtmlExt = require('remove-html-extension')

var screenshotTargetWidth = 1024
var screenshotMaxHeight = 768
var screenshotName = 'screenshot.png'
var screenshotSelector = '[data-name="component-container"]'

module.exports = function () {
  return new Promise(function (resolve, reject) {
    glob('src/components/**/*.html', {}, function (err, components) {
      if (err) {
        console.error(err)
        return reject(err)
      }

      // Setup a quick static HTML server so that CSS is loaded correctly.
      var app = express()
      app.set('port', 3333)
      app.use(express.static(path.join(__dirname, '..')))
      var server = app.listen(app.get('port'), function() {
        console.log('Starting static HTML server on port ' + server.address().port)
      })

      // Initialize nightmware now.
      var nightmare = Nightmare({
        show: false,
        frame: false,
        useContentSize: true,
        switches: {
          // Unfortunately .viewport() sets the viewport size in *CSS pixels*.
          // Let's force device pixel ratio to 1 otherwise screenshots will vary in size
          // depending on the machine running this script (double for Retina Macbook Pro)
          // https://github.com/segmentio/nightmare/issues/498#issuecomment-265948400
          'force-device-scale-factor': '1'
        }
      })

      return co(function *() {
        for (var i = 0; i < components.length; i++) {
          var newDir = rmHtmlExt(components[i].replace('src/', ''))
          var newFile = newDir + '/index.html'

          // Check the front matter for screenshot overrides
          var componentHtml = fs.readFileSync(components[i], 'utf8')
          var fmParsed = fm.parse(componentHtml)
          var frontMatter = fmParsed.attributes || {}
          var selector = screenshotSelector
          if (frontMatter.screenshot && frontMatter.screenshot.selector) {
            selector += ' ' + frontMatter.screenshot.selector
          }

          // Grab the size of the component enclosing rectangle
          // https://github.com/segmentio/nightmare/issues/498#issuecomment-189156529
          var rect = yield nightmare
            .viewport(screenshotTargetWidth, screenshotMaxHeight)
            // .wait(1000)
            .goto('http://localhost:' + app.get('port') + '/' + newFile)
            .wait(selector)
            .evaluate(function(_selector) {
              // Hide scrollbar that could pop up due to .scrollTo
              var sheet = document.styleSheets[0]
              sheet.insertRule('::-webkit-scrollbar { display:none; }')
              var element = document.querySelector(_selector)
              if (element) {
                var rect = element.getBoundingClientRect()
                return {
                  x: Math.round(rect.left),
                  y: Math.round(rect.top),
                  width: Math.round(rect.width),
                  height: Math.round(rect.height)
                }
              }
              return false
            }, selector)

          // Capture the component
          if (rect !== false) {
            rect.height = Math.min(rect.height, screenshotMaxHeight)
            yield nightmare
              // we can not use .screenshot() with rect, so constrain the viewport instead
              .viewport(rect.width, rect.height)
              .scrollTo(rect.y, rect.x)
              // .wait(1000)
              // do *not* use rect in .screenshot() below or risk distortions
              .screenshot(newDir + '/' + screenshotName)
              .then(function () {
                console.log('screenshotted: ' + newFile)
              })
          }
        }

        yield nightmare.end()
      }).then(function () {
        console.log('finished rendering screenshots')
      }, function(err) {
        console.error(err)
      }).then(function () {
        console.log('closing static HTML server')
        server.close()
      })

      // TODO: optimize all PNG files, eventually resize to smaller width
      // const imagemin = require('imagemin');
      // const imageminPngquant = require('imagemin-pngquant');
      // imagemin(['components/*.{jpg,png}'], ??, {
      //     plugins: [
      //         imageminPngquant({quality: '65-80'})
      //     ]
      // }).then(files => {
      //     console.log(files);
      //     //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
      // });

    }) // glob
  }) // return promise
}

// dependencies

var fs = require('fs')
var filesize = require('filesize')
var gzipSize = require('gzip-size')
var autoprefixer = require('autoprefixer')
var postcss = require('postcss')
var atImport = require('postcss-import')
var cssvariables = require('postcss-css-variables')
var compressor = require('node-minify')
var conditionals = require('postcss-conditionals')
var cssvariables = require('postcss-css-variables')
var customMedia = require('postcss-custom-media')

var componentsBuild = require('./src/components-build')

// css to be processed
var css = fs.readFileSync('src/css/tachyons.css', 'utf8')

// process css
var output = postcss([
  atImport(), cssvariables(), conditionals(), customMedia(), autoprefixer()
]).process(css, {
  from: 'src/css/tachyons.css',
  to: 'css/tachyons.css'
}).css

// get the original css size
fs.writeFile('css/tachyons.css', output, 'utf-8')
uncompressed = fs.statSync('css/tachyons.css')
var uncompressedSize = uncompressed['size']
var gzippedSRC = gzipSize.sync(output)
console.log('This file starts out at ' + filesize(uncompressedSize) + ' which would be ' + filesize(gzippedSRC))

// minify the css
new compressor.minify({
  type: 'sqwish',
  fileIn: 'css/tachyons.css',
  fileOut: 'css/tachyons.min.css',
  callback: function (err, min) {}
})

var minified = fs.statSync('css/tachyons.min.css', 'utf8')
var gzipped = gzipSize.sync(fs.readFileSync('css/tachyons.min.css', 'utf8'))
var minifiedSize = minified['size']

console.log('After minification it is ' + filesize(minifiedSize))
console.log('After gzipping it is ' + filesize(gzipped)  + 'instead of ' + filesize(gzipped))

componentsBuild()

const fs = require('fs')
const compdoc = require('compdoc')
const globby = require('globby')

const css = fs.readFileSync('node_modules/tachyons/css/tachyons.css', 'utf8')

const compGlob = process.argv.slice(2)[0] || '**'

globby(`build/components/${compGlob}/*.html`)
  .then(files => files.forEach(buildComponent))

const buildComponent = file => {
  const html = fs.readFileSync(file, 'utf8')

  console.log(`Building ${file}`)
  compdoc(file, { html, css })
    .then({
      
    })
    .catch(console.log)
}

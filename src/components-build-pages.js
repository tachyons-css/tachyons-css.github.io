const _ = require('lodash');
const atImport = require('postcss-import');
const chalk = require('chalk');
const co = require('co');
const conditionals = require('postcss-conditionals');
const cssstats = require('cssstats');
const cssVariables = require('postcss-css-variables');
const customMedia = require('postcss-custom-media');
const escapeHtml = require('escape-html');
const fm = require('json-front-matter');
const fs = require('fs');
const getClasses = require('get-classes-from-html');
const mkdirp = require('mkdirp');
const mqPacker = require('css-mqpacker');
const path = require('path');
const perfectionist = require('perfectionist');
const postcss = require('postcss');
const prettyHrtime = require('pretty-hrtime');
const removeComments = require('postcss-discard-comments');
const removeEmpty = require('postcss-discard-empty');
const select = require('postcss-select');

const defaults = require('./components-build-defaults');

module.exports = _options => new Promise((resolve, reject) => {
  const options = _.merge({}, defaults, _options);
  const startTime = process.hrtime();
  console.log(chalk.magenta('Working on components pages...'));
  if (options.components.forNavPath === undefined || !fs.existsSync(options.components.forNavPath)) {
    reject('Can not find components nav JSON file');
    return;
  }
  if (!options.components.buildPages) {
    console.log(chalk.dim('Skipped by request.'));
    resolve();
    return;
  }
  const componentsForNav = JSON.parse(fs.readFileSync(options.components.forNavPath, 'utf8'));

  const componentTemplate = fs.readFileSync(options.templates.componentPath, 'utf8');
  const analytics = fs.readFileSync(options.templates.analyticsPath, 'utf8');
  const footer = fs.readFileSync(options.templates.footerPath, 'utf8');
  const head = fs.readFileSync(options.templates.headPath, 'utf8');
  const highlight = fs.readFileSync(options.templates.highlightPath, 'utf8');

  const tachyonsCss = fs.readFileSync(options.tachyonsCssPath, 'utf8');

  const renderPromise = co(function* generator() {
    // Unfortunately, can't use forEach() in generators, so let's for()...
    const categories = Object.keys(componentsForNav);
    for (let cat_idx = 0; cat_idx < categories.length; cat_idx += 1) {
      const category = categories[cat_idx];
      console.log(chalk.yellow('- Processing category:'), category);

      for (let comp_idx = 0; comp_idx < componentsForNav[category].length; comp_idx += 1) {
        const component = componentsForNav[category][comp_idx];
        const componentHtml = fs.readFileSync(component.src, 'utf8');
        const fmParsed = fm.parse(componentHtml);

        const frontMatter = _.merge({}, options.components.frontMatter, component.frontMatter);
        frontMatter.title = component.title;
        frontMatter.name = component.name;
        frontMatter.classes = getClasses(fmParsed.body).map(klass => `.${klass}`);
        frontMatter.componentHtml = componentHtml;
        frontMatter.content = fmParsed.body;
        frontMatter.escapedHtml = escapeHtml(fmParsed.body);
        frontMatter.footer = footer;
        frontMatter.analytics = analytics;
        frontMatter.head = head;
        frontMatter.highlight = highlight;
        frontMatter.componentsForNav = componentsForNav;

        const moduleSrcs = {};
        const getModules = postcss.plugin('get-modules', () => (css) => {
          css.walkRules((rule) => {
            moduleSrcs[rule.source.input.from] = true;
          });
        });

        yield postcss([
          atImport(),
          cssVariables(),
          conditionals(),
          customMedia(),
          select(frontMatter.classes),
          removeComments({ removeAll: true }),
          mqPacker(),
          removeEmpty(),
          getModules(),
          perfectionist(),
        ]).process(tachyonsCss, {
          from: options.tachyonsCssPath,
        }).then((result) => {
          frontMatter.componentCss = result.css;
          frontMatter.stats = cssstats(frontMatter.componentCss);

          // TODO: Update me once src/ uses the npm modules
          frontMatter.modules = Object.keys(moduleSrcs).map(
            module => `tachyons-${module.split('/_')[1].replace('.css', '')}`
          );

          const compiledComponent = _.template(componentTemplate)(frontMatter);
          mkdirp.sync(path.dirname(component.path));
          fs.writeFileSync(component.path, compiledComponent);
          console.log('  * Created page for:', component.src);
        }).catch((e) => {
          console.log(e);
        });
      }
    }
  }).then(() => {
    const elapsed = process.hrtime(startTime);
    console.log(chalk.magenta('Done with components pages!'), chalk.dim(prettyHrtime(elapsed)));
  });
  resolve(renderPromise);
}); // return promise

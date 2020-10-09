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
const createSections = require('./components-build-sections');

module.exports = _options => new Promise((resolve, reject) => {
  const options = _.merge({}, defaults, _options);
  const startTime = process.hrtime();
  console.log(chalk.magenta('Working on components pages...'));
  if (options.components.tempListPath === undefined ||
      !fs.existsSync(options.components.tempListPath)) {
    reject('Can not find components list (JSON)');
    return;
  }
  if (!options.components.build.pages) {
    console.log(chalk.dim('Skipped by request.'));
    resolve();
    return;
  }

  const components = JSON.parse(fs.readFileSync(options.components.tempListPath, 'utf8'));

  // We need the components by category to display a TOC in the footer
  const componentsByCategory = createSections(
    components,
    options.components.index.byCategory,
    options
  );

  const templates = {
    component: fs.readFileSync(options.templates.componentPath, 'utf8'),
    analytics: fs.readFileSync(options.templates.analyticsPath, 'utf8'),
    footer: fs.readFileSync(options.templates.footerPath, 'utf8'),
    head: fs.readFileSync(options.templates.headPath, 'utf8'),
    highlight: fs.readFileSync(options.templates.highlightPath, 'utf8'),
  };

  const tachyonsCss = fs.readFileSync(options.tachyonsCssPath, 'utf8');

  const renderPromise = co(function* generator() {
    // Unfortunately, can't use forEach() in generators, so let's for()...
    for (let comp_idx = 0; comp_idx < components.length; comp_idx += 1) {
      const component = components[comp_idx];
      const componentHtml = fs.readFileSync(component.src, 'utf8');
      const fmParsed = fm.parse(componentHtml);

      const frontMatter = _.merge({}, options.components.frontMatter, component.frontMatter);
      frontMatter.title = component.page.title;
      frontMatter.name = component.page.name;
      frontMatter.classes = getClasses(fmParsed.body).map(klass => `.${klass}`);
      frontMatter.componentHtml = componentHtml;
      frontMatter.content = fmParsed.body;
      frontMatter.escapedHtml = escapeHtml(fmParsed.body);
      frontMatter.templates = templates;
      frontMatter.componentsByCategory = componentsByCategory;

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

        const compiledComponent = _.template(templates.component)(frontMatter);
        mkdirp.sync(path.dirname(component.page.path));
        fs.writeFileSync(component.page.path, compiledComponent);
        console.log('  * Created page for:', component.src);
      }).catch((e) => {
        console.log(e);
      });
    }
  }).then(() => {
    const elapsed = process.hrtime(startTime);
    console.log(chalk.magenta('Done with components pages!'), chalk.dim(prettyHrtime(elapsed)));
  });
  resolve(renderPromise);
}); // return promise

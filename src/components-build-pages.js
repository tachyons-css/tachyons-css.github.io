const _ = require('lodash');
const atImport = require('postcss-import');
const chalk = require('chalk');
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
const removeComments = require('postcss-discard-comments');
const removeEmpty = require('postcss-discard-empty');
const select = require('postcss-select');

const analyticsTemplatePath = 'src/templates/ga.html';
const componentTemplatePath = 'src/templates/components.html';
const footerTemplatePath = 'src/templates/footer.html';
const headTemplatePath = 'src/templates/head.html';
const highlightTemplatePath = 'src/templates/highlight.html';

const tachyonsCssPath = 'src/css/tachyons.css';

module.exports = componentsForNavPath => new Promise((resolve, reject) => {
  console.log(chalk.magenta('Working on components pages...'));
  if (componentsForNavPath === undefined || !fs.existsSync(componentsForNavPath)) {
    reject('Can not find components nav JSON file');
  }
  const componentsForNav = JSON.parse(fs.readFileSync(componentsForNavPath, 'utf8'));

  const componentTemplate = fs.readFileSync(componentTemplatePath, 'utf8');
  const analytics = fs.readFileSync(analyticsTemplatePath, 'utf8');
  const footer = fs.readFileSync(footerTemplatePath, 'utf8');
  const head = fs.readFileSync(headTemplatePath, 'utf8');
  const highlight = fs.readFileSync(highlightTemplatePath, 'utf8');

  const tachyonsCss = fs.readFileSync(tachyonsCssPath, 'utf8');

  const promises = [];
  Object.keys(componentsForNav).forEach((category) => {
    console.log(chalk.yellow('- Processing category:'), category);
    componentsForNav[category].forEach((component) => {
      const componentHtml = fs.readFileSync(component.src, 'utf8');
      const fmParsed = fm.parse(componentHtml);

      const frontMatter = _.assign({}, component.frontMatter);
      frontMatter.title = component.title;
      frontMatter.name = component.name;
      frontMatter.bodyClass = frontMatter.bodyClass || '';
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

      const promise = postcss([
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
        from: tachyonsCssPath,
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
        console.log('  * Created component:', component.href);
      }).catch((e) => {
        console.log(e);
      });
      promises.push(promise);
    });
  });
  resolve(Promise.all(promises).then(() => {
    console.log(chalk.magenta('Done with components pages!'));
    return componentsForNavPath;
  }));
}); // return promise

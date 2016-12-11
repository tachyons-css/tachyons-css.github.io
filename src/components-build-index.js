const _ = require('lodash');
const chalk = require('chalk');
const crypto = require('crypto');
const fm = require('json-front-matter');
const fs = require('fs');
const glob = require('glob');
const mkdirp = require('mkdirp');
const path = require('path');
const rmHtmlExt = require('remove-html-extension');
const titleize = require('titleize');

const defaults = require('./components-build-defaults');

const getTitle = (component) => {
  const title = rmHtmlExt(component).replace('src/components/', '').replace(/(\/|_|-)/g, ' ');
  return titleize(title);
};

const getName = component => titleize(getTitle(component.split('/')[3]));

module.exports = _options => new Promise((resolve, reject) => {
  const options = _.assign({}, defaults, _options);
  glob(options.componentsGlobPattern, {}, (err, components) => {
    console.log(chalk.magenta('Working on components index...'));
    if (err) {
      reject(err);
      return;
    }

    const npmPackage = JSON.parse(fs.readFileSync('package.json', 'utf8'));

    const componentsForNav = {};
    components.forEach((component) => {
      const componentTokens = component.replace('src/components/', '').split('/');
      const category = componentTokens[0];

      const componentHtml = fs.readFileSync(component, 'utf8');
      const fmParsed = fm.parse(componentHtml);
      const frontMatter = fmParsed.attributes || {};
      const dir = component.replace('src/', '').replace('.html', '');

      // Compute component signature based on the Tachyons version and the contents of the
      // component itself. This can be used to bust the browser cache of screenshots.
      const md5sum = crypto.createHash('md5');
      md5sum.update(npmPackage.version);
      md5sum.update(componentHtml);
      const signature = md5sum.digest('hex');

      componentsForNav[category] = componentsForNav[category] || [];
      componentsForNav[category].push({
        name: frontMatter.name || getName(component),
        title: frontMatter.title || getTitle(component),
        src: component,
        path: `${dir}/index.html`,
        href: `/${dir}/index.html`,
        screenshot: {
          path: `${dir}/${options.screenshotName}`,
          href: `/${dir}/${options.screenshotName}?version=${signature}`,
        },
        signature,
        frontMatter,
      });
    });

    const categories = Object.keys(componentsForNav);
    console.log(
      '- Found', components.length, components.length > 1 ? 'components' : 'component',
      'in', categories.length, categories.length > 1 ? 'categories' : 'category'
    );

    mkdirp.sync(path.dirname(options.componentsForNavPath));
    fs.writeFileSync(options.componentsForNavPath, JSON.stringify(componentsForNav, undefined, 2));
    console.log('- Created navigation JSON:', options.componentsForNavPath);

    const analytics = fs.readFileSync(options.analyticsTemplatePath, 'utf8');
    const footer = fs.readFileSync(options.footerTemplatePath, 'utf8');
    const head = fs.readFileSync(options.headTemplatePath, 'utf8');
    const header = fs.readFileSync(options.headerTemplatePath, 'utf8');
    const indexTemplate = fs.readFileSync(options.componentsIndexTemplatePath, 'utf8');

    const compiledPage = _.template(indexTemplate)({
      componentsForNav,
      title: 'Components',
      analytics,
      footer,
      head,
      header,
      options,
    });
    mkdirp.sync(path.dirname(options.componentsIndexPath));
    fs.writeFileSync(options.componentsIndexPath, compiledPage);
    console.log('- Created index:', options.componentsIndexPath);

    console.log(chalk.magenta('Done with components index!'));
    resolve();
  }); // glob
}); // return promise

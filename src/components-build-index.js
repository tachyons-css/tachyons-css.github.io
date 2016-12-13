const _ = require('lodash');
const chalk = require('chalk');
const crypto = require('crypto');
const fm = require('json-front-matter');
const fs = require('fs');
const glob = require('glob');
const mkdirp = require('mkdirp');
const path = require('path');
const prettyHrtime = require('pretty-hrtime');
const rmHtmlExt = require('remove-html-extension');
const titleize = require('titleize');

const defaults = require('./components-build-defaults');

const getTitle = (component) => {
  const title = rmHtmlExt(component).replace('src/components/', '').replace(/(\/|_|-)/g, ' ');
  return titleize(title);
};

const getName = component => titleize(getTitle(component.split('/')[3]));

module.exports = _options => new Promise((resolve, reject) => {
  const options = _.merge({}, defaults, _options);
  const startTime = process.hrtime();
  glob(options.components.globPattern, {}, (err, components) => {
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
      const srcFrontMatter = fmParsed.attributes || {};
      const frontMatter = _.merge({}, options.components.frontMatter, srcFrontMatter);
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
          path: `${dir}/${options.screenshot.basename}`,
          href: `/${dir}/${options.screenshot.basename}?version=${signature}`,
        },
        signature,
        // This is the raw front matter, as found in the component source, NOT merged
        // with any defaults, so that it is easier to spot the overrides.
        // It is up to build scripts to merge with options.components.frontMatter down the road.
        frontMatter: srcFrontMatter,
      });
    });

    const categories = Object.keys(componentsForNav);
    console.log(
      '- Found', components.length, components.length > 1 ? 'components' : 'component',
      'in', categories.length, categories.length > 1 ? 'categories' : 'category'
    );

    mkdirp.sync(path.dirname(options.components.forNavPath));
    fs.writeFileSync(options.components.forNavPath, JSON.stringify(componentsForNav, undefined, 2));
    console.log('- Created navigation JSON:', options.components.forNavPath);

    const analytics = fs.readFileSync(options.templates.analyticsPath, 'utf8');
    const footer = fs.readFileSync(options.templates.footerPath, 'utf8');
    const head = fs.readFileSync(options.templates.headPath, 'utf8');
    const header = fs.readFileSync(options.templates.headerPath, 'utf8');
    const componentsIndexTemplate = fs.readFileSync(options.templates.componentsIndexPath, 'utf8');
    const lazysizesTemplate = fs.readFileSync(options.templates.lazysizesPath, 'utf8');

    const compiledPage = _.template(componentsIndexTemplate)({
      componentsForNav,
      title: 'Components',
      analytics,
      footer,
      head,
      header,
      lazysizesTemplate,
      options,
    });
    mkdirp.sync(path.dirname(options.components.indexPath));
    fs.writeFileSync(options.components.indexPath, compiledPage);
    console.log('- Created index:', options.components.indexPath);

    const elapsed = process.hrtime(startTime);
    console.log(chalk.magenta('Done with components index!'), chalk.dim(prettyHrtime(elapsed)));
    resolve();
  }); // glob
}); // return promise

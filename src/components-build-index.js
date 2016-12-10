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

const componentIndexPath = 'components/index.html';
const componentsForNavPath = 'tmp/componentsForNav.json';
const defaultComponentsGlobPattern = 'src/components/**/*.html';
const screenshotBasename = 'screenshot';

const analyticsTemplatePath = 'src/templates/ga.html';
const footerTemplatePath = 'src/templates/footer.html';
const headerTemplatePath = 'src/templates/header.html';
const headTemplatePath = 'src/templates/head.html';
const indexTemplatePath = 'src/templates/components-index.html';

const getTitle = (component) => {
  const title = rmHtmlExt(component).replace('src/components/', '').replace(/(\/|_|-)/g, ' ');
  return titleize(title);
};

const getName = component => titleize(getTitle(component.split('/')[3]));

module.exports = globPattern => new Promise((resolve, reject) => {
  glob(globPattern || defaultComponentsGlobPattern, {}, (err, components) => {
    console.log(chalk.magenta('Working on components index...'));
    if (err) {
      reject(err);
    }

    const npmPackage = JSON.parse(fs.readFileSync('package.json', 'utf8'));

    console.log('- Found', components.length, 'components');

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
          path: `${dir}/${screenshotBasename}.png`,
          href: `/${dir}/${screenshotBasename}.png?version=${signature}`,
        },
        signature,
        frontMatter,
      });
    });

    mkdirp.sync(path.dirname(componentsForNavPath));
    fs.writeFileSync(componentsForNavPath, JSON.stringify(componentsForNav, undefined, 2));
    console.log('- Created navigation JSON:', componentsForNavPath);

    const analytics = fs.readFileSync(analyticsTemplatePath, 'utf8');
    const footer = fs.readFileSync(footerTemplatePath, 'utf8');
    const head = fs.readFileSync(headTemplatePath, 'utf8');
    const header = fs.readFileSync(headerTemplatePath, 'utf8');
    const indexTemplate = fs.readFileSync(indexTemplatePath, 'utf8');

    const compiledPage = _.template(indexTemplate)({
      componentsForNav,
      title: 'Components',
      analytics,
      footer,
      head,
      header,
    });
    mkdirp.sync(path.dirname(componentIndexPath));
    fs.writeFileSync(componentIndexPath, compiledPage);
    console.log('- Created index:', componentIndexPath);

    console.log(chalk.magenta('Done with components index!'));
    resolve(componentsForNavPath);
  }); // glob
}); // return promise

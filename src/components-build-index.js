const _ = require('lodash');
const chalk = require('chalk');
const co = require('co');
const crypto = require('crypto');
const fm = require('json-front-matter');
const fs = require('fs');
const glob = require('glob');
const mkdirp = require('mkdirp');
const nodegit = require('nodegit');
const path = require('path');
const prettyHrtime = require('pretty-hrtime');
const rmHtmlExt = require('remove-html-extension');

const defaults = require('./components-build-defaults');

/*
 * Return the first commit that even introduced a component, given its path
 */
const getComponentFirstCommit = (repo, componentPath) =>
  co(function* generator() {
    const headCommit = yield repo.getHeadCommit();
    const walker = repo.createRevWalk();
    walker.push(headCommit.id());
    walker.sorting(nodegit.Revwalk.SORT.TIME);
    // Not happy about that hard-coded constant here, but this is the only way to
    // tell the walker to go as far back in time as possible. No amount of asking
    // on nodegit's Slack or Gitter gave me a better way to do it.
    const historyCommits = yield walker.fileHistoryWalk(componentPath, 30000);
    return historyCommits[historyCommits.length - 1].commit;
  });

/*
 * Return the list of components
 */
const getComponents = options => new Promise((resolve, reject) => {
  glob(options.components.globPattern, {}, (err, componentPaths) => {
    if (err) {
      reject(err);
      return;
    }
    const npmPackage = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    co(function* generator() {
      const repo = yield nodegit.Repository.open(path.resolve('.'));

      const components = [];
      for (let comp_idx = 0; comp_idx < componentPaths.length; comp_idx += 1) {
        const componentPath = componentPaths[comp_idx];

        const firstCommit = yield getComponentFirstCommit(repo, componentPath);
        const creationTime = firstCommit.date().getTime();

        const componentHtml = fs.readFileSync(componentPath, 'utf8');
        const fmParsed = fm.parse(componentHtml);
        const srcFrontMatter = fmParsed.attributes || {};
        const frontMatter = _.merge({}, options.components.frontMatter, srcFrontMatter);

        const targetDir = componentPath.replace('src/', '').replace('.html', '');

        const tokens = rmHtmlExt(componentPath).replace('src/components/', '').split('/');
        const category = tokens[0];
        const id = tokens[1];

        // Compute component signature based on the Tachyons version and the contents of the
        // component itself. This can be used to bust the browser cache of screenshots.
        const md5sum = crypto.createHash('md5');
        md5sum.update(npmPackage.version);
        md5sum.update(componentHtml);
        const signature = md5sum.digest('hex');

        const page = {
          path: `${targetDir}/index.html`,
          href: `/${targetDir}/index.html`,
          name: frontMatter.name || options.components.prettify.id(id),
          category: frontMatter.category || options.components.prettify.category(category),
        };
        page.title = frontMatter.title ||
          options.components.prettify.title(page.category, page.name);

        const screenshot = {
          path: `${targetDir}/${options.screenshot.basename}`,
          href: `/${targetDir}/${options.screenshot.basename}?version=${signature}`,
        };

        components.push({
          id,
          category,
          src: componentPath,
          creationTime,
          signature,
          page,
          screenshot,
          // This is the raw front matter, as found in the component source, NOT merged
          // with any defaults, so that it is easier to spot the overrides.
          // It is up to build scripts to merge with options.components.frontMatter down the road.
          frontMatter: srcFrontMatter,
        });
      }
      resolve(components);
    }); // generator
  }); // glob
});

module.exports = _options => new Promise((resolve, reject) => {
  const options = _.merge({}, defaults, _options);
  const startTime = process.hrtime();
  console.log(chalk.magenta('Working on components index...'));
  co(function* generator() {
    const components = yield getComponents(options);

    // Map by category
    const componentsByCategory = {};
    components.forEach((component) => {
      const categoryKey = component.page.category;
      componentsByCategory[categoryKey] = componentsByCategory[categoryKey] || [];
      componentsByCategory[categoryKey].push(component);
    });

    // Map by time
    // componentsByTime[component.creationTime] = componentsByTime[component.creationTime] || [];
    // componentsByTime[component.creationTime].push(component);

    // So what did we find?
    const categories = Object.keys(componentsByCategory);
    console.log(
      '- Found', components.length, components.length > 1 ? 'components' : 'component',
      'in', categories.length, categories.length > 1 ? 'categories' : 'category'
    );

    // Save by category (for later re-use)
    mkdirp.sync(path.dirname(options.components.indexByCategory.json));
    fs.writeFileSync(
      options.components.indexByCategory.json,
      JSON.stringify(componentsByCategory, undefined, 2)
    );
    console.log('- Created index by category (JSON):', options.components.indexByCategory.json);

    // Save by time (for later re-use)
    // Note that you should not rely, in general, on a specific key ordering.
    // Should you use that file later on, grab the keys as array, sort them, and iterate
    // const componentsSortedByTime = _(componentsByTime)
    //   .toPairs()
    //   .sortBy(0)
    //   .reverse()
    //   .fromPairs()
    //   .value();
    // mkdirp.sync(path.dirname(options.components.paths.byTime));
    // fs.writeFileSync(
    //   options.components.paths.byTime,
    //   JSON.stringify(componentsSortedByTime, undefined, 2)
    // );
    // console.log('- Created components by time (JSON):', options.components.paths.byTime);

    const templates = {
      analytics: fs.readFileSync(options.templates.analyticsPath, 'utf8'),
      footer: fs.readFileSync(options.templates.footerPath, 'utf8'),
      head: fs.readFileSync(options.templates.headPath, 'utf8'),
      header: fs.readFileSync(options.templates.headerPath, 'utf8'),
      componentsIndex: fs.readFileSync(options.templates.componentsIndexPath, 'utf8'),
      lazysizes: fs.readFileSync(options.templates.lazysizesPath, 'utf8'),
    };

    const compiledPage = _.template(templates.componentsIndex)({
      title: 'Components',
      componentsByCategory,
      templates,
      options,
    });
    mkdirp.sync(path.dirname(options.components.indexByCategory.path));
    fs.writeFileSync(options.components.indexByCategory.path, compiledPage);
    console.log('- Created index by category:', options.components.indexByCategory.path);

    const elapsed = process.hrtime(startTime);
    console.log(chalk.magenta('Done with components index!'), chalk.dim(prettyHrtime(elapsed)));
  }).then(resolve).catch(reject); // generator
}); // return promise

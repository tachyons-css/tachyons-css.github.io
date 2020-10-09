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
          name: frontMatter.name ||
            (options.components.prettify.id ? options.components.prettify.id(id) : id),
          category: options.components.prettify.category
            ? options.components.prettify.category(category) : category,
        };
        page.title = frontMatter.title ||
          options.components.page.composeTitle(page.category, page.name);

        const screenshot = {
          path: `${targetDir}/${options.screenshot.basename}`,
          href: `/${targetDir}/${options.screenshot.basename}?version=${signature}`,
        };

        components.push({
          id,
          category,
          src: componentPath,
          creationTime: firstCommit.date().getTime(),
          author: firstCommit.author().toString(),
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
  console.log(chalk.magenta('Working on components list...'));
  getComponents(options).then((components) => {
    mkdirp.sync(path.dirname(options.components.tempListPath));
    fs.writeFileSync(options.components.tempListPath, JSON.stringify(components, undefined, 2));
    console.log('- Created components list (JSON):', options.components.tempListPath);
    const elapsed = process.hrtime(startTime);
    console.log(chalk.magenta('Done with components list!'), chalk.dim(prettyHrtime(elapsed)));
  }).then(resolve).catch(reject);
}); // return promise

const _ = require('lodash');
const chalk = require('chalk');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const prettyHrtime = require('pretty-hrtime');

const defaults = require('./components-build-defaults');
const createSections = require('./components-build-sections');

module.exports = _options => new Promise((resolve, reject) => {
  const options = _.merge({}, defaults, _options);
  const startTime = process.hrtime();
  console.log(chalk.magenta('Working on components index...'));
  if (options.components.tempListPath === undefined ||
      !fs.existsSync(options.components.tempListPath)) {
    reject('Can not find components list (JSON)');
    return;
  }

  const components = JSON.parse(fs.readFileSync(options.components.tempListPath, 'utf8'));

  const templates = {
    analytics: fs.readFileSync(options.templates.analyticsPath, 'utf8'),
    footer: fs.readFileSync(options.templates.footerPath, 'utf8'),
    head: fs.readFileSync(options.templates.headPath, 'utf8'),
    header: fs.readFileSync(options.templates.headerPath, 'utf8'),
    componentsIndex: fs.readFileSync(options.templates.componentsIndexPath, 'utf8'),
    lazysizes: fs.readFileSync(options.templates.lazysizesPath, 'utf8'),
  };

  Object.keys(options.components.index).forEach((key) => {
    const index = options.components.index[key];
    const componentsBySections = createSections(components, index, options);
    const compiledIndexPage = _.template(templates.componentsIndex)({
      index,
      componentsBySections,
      templates,
      options,
    });
    mkdirp.sync(path.dirname(index.path));
    fs.writeFileSync(index.path, compiledIndexPage);
    console.log(`- Created index "${index.title}":`, index.path);
  });

  const elapsed = process.hrtime(startTime);
  console.log(chalk.magenta('Done with components index!'), chalk.dim(prettyHrtime(elapsed)));
  resolve();
}); // return promise

const _ = require('lodash');
const chalk = require('chalk');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const prettyHrtime = require('pretty-hrtime');
const RSS = require('rss');

const defaults = require('./components-build-defaults');

module.exports = _options => new Promise((resolve, reject) => {
  const options = _.merge({}, defaults, _options);
  const startTime = process.hrtime();
  console.log(chalk.magenta('Working on components RSS feed...'));
  if (options.components.tempListPath === undefined ||
      !fs.existsSync(options.components.tempListPath)) {
    reject('Can not find components list (JSON)');
    return;
  }

  const components = JSON.parse(fs.readFileSync(options.components.tempListPath, 'utf8'));
  const recentComponents = _.orderBy(components, ['creationTime'], ['desc'])
    .slice(0, options.components.rss.count);

  // Create the feed
  // See https://github.com/dylang/node-rss
  const feedOptions = {
    title: options.components.rss.title,
    description: options.siteDescription,
    feed_url: `${options.siteUrl}/${options.components.rss.path}`,
    site_url: options.siteUrl,
    categories: options.components.rss.categories,
    ttl: options.components.rss.ttl,
  };
  const feed = new RSS(feedOptions);

  // Add feed items
  recentComponents.forEach((component) => {
    const url = `${options.siteUrl}${component.page.href}`;
    const screenshotUrl = `${options.siteUrl}${component.screenshot.href}`;
    const description = `
    <p>${options.siteDescription}</p>
    <a href="${url}"><img src="${screenshotUrl}"></a>
    <p><small>Component by ${_.escape(component.author)}</small></p>
    `;
    feed.item({
      title: component.page.title,
      description,
      url,
      guid: `${component.category}:${component.id}`,
      categories: options.components.rss.categories,
      date: component.creationTime,
      author: component.author,
      // None of this below appears to work.
      // Let's put the screenshot straight in the description.
      // enclosure: {
      //   url: `${options.siteUrl}${component.screenshot.href}`,
      //   type: 'image/jpeg',
      // },
      // custom_elements: [{
      //   'media:content': [{
      //     _attr: {
      //       medium: 'image',
      //       href: `${options.siteUrl}${component.screenshot.href}`,
      //       // height: media.height,
      //       // width: media.width
      //     },
      //   }],
      // }],
    });
  });

  // Save the feed
  mkdirp.sync(path.dirname(options.components.rss.path));
  fs.writeFileSync(options.components.rss.path, feed.xml());
  console.log('- Created RSS feed:', options.components.rss.path);

  const elapsed = process.hrtime(startTime);
  console.log(chalk.magenta('Done with components RSS feed!'), chalk.dim(prettyHrtime(elapsed)));
  resolve();
}); // return promise

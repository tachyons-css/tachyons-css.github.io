const moment = require('moment');
const titleize = require('titleize');

const cleanTitleize = str => titleize(str.replace(/(_|-)/g, ' '));
const creationTimeToYMD = c => moment(c.creationTime).format('YYYY-MM-DD');

module.exports = {
  siteUrl: 'https://tachyons.io',                   // needed for RSS feed
  siteDescription: 'Tachyons. Functional CSS for humans.',
  // Components
  components: {
    globPattern: 'src/components/**/*.html',       // source components to process
    tempListPath: 'tmp/components.json',           // temporary JSON file built by the index
    build: {
      pages: true,                                 // false to skip building pages
      screenshots: true,                           // false to skip building screenshots
    },
    index: {                                       // list index pages to build
      byCategory: {                                // components by category
        title: 'Components',
        path: 'components/index.html',             // target location of index by category
        sortAllBy: [['src'], ['asc']],             // sort by file location will do
        limitAll: false,                           // use all components
        createSectionsBy: 'category',              // create a section for each category
        showSectionsTOC: true,                     // show Table of Contents (e.g. categories)
      },
      mostRecent: {                                // most recent components
        title: 'Recent Components',
        path: 'components/recent.html',            // target location of recent index
        sortAllBy: [['creationTime'], ['desc']],   // sort by most recent component first
        limitAll: 50,                              // use the 50 most recent ones
        createSectionsBy: creationTimeToYMD,       // group by day
        prettifySection: v => moment(v).format('LL'), // display as day
        showSectionsTOC: false,                    // no need for Table of Contents
      },
    },
    rss: {                                         // RSS feed
      title: 'Tachyons Recent Components',
      categories: ['CSS', 'Functional CSS'],       // Categories this feed belongs to
      ttl: 60,                                     // Number of mins feed can be cached
      path: 'components/rss.xml',                  // target location of feed (sync head.html)
      count: 20,                                   // how many in feed
    },
    page: {                                        // options related to each component page
      composeTitle: (category, name) => `${category} | ${name}`, // compose title from cat, name
    },
    prettify: {
      id: cleanTitleize,                           // prettify component id into component name
      category: cleanTitleize,                     // prettify component category
      creationTime: v => moment(v).format('LLL'),  // prettify component creation time
    },
    frontMatter: {                                 // font matter defaults (i.e. optional)
      name: undefined,                             // undefined to infer component name
      title: undefined,                            // undefined to infer component title
      bodyClass: 'bg-white',                       // class to apply on <body>
      screenshot: {                                // per-component screenshot options
        selector: '[data-name="component"]',       // DOM element to capture
        autocrop: true,                            // autocrop the capture
        'background-position': 'center center',    // CSS bg position
        'background-size': 'cover',                // CSS bg size ('cover', 'contain', 'auto')
      },
    },
  },
  // Screenshot options
  // (components only for now, but could apply to other areas for consistency)
  screenshot: {
    basename: 'screenshot.jpg',                    // name of *JPEG* screenshot
    aspectRatio: '4x3',                            // Tachyons aspect ratio of screenshots
    viewport: {
      width: 1024,                                 // viewport width used for capture
      height: 768,                                 // viewport height used for capture
    },
    target: {
      minWidth: 400,                               // min width of target (final) screenshot
      minHeight: 160,                              // min height of target (final) screenshot
    },
    mozjpegQuality: 90,                            // mozjpeg optimizer quality (default 75)
  },
  // Misc
  tachyonsCssPath: 'src/css/tachyons.css',
  serverPort: 3333,
  // Templates
  templates: {
    analyticsPath: 'src/templates/ga.html',
    componentsIndexPath: 'src/templates/components-index.html',
    componentPath: 'src/templates/component.html',
    footerPath: 'src/templates/footer.html',
    headerPath: 'src/templates/header.html',
    headPath: 'src/templates/head.html',
    highlightPath: 'src/templates/highlight.html',
    lazysizesPath: 'src/templates/lazysizes.html',
  },
};

const titleize = require('titleize');

const cleanTitleize = str => titleize(str.replace(/(_|-)/g, ' '));

module.exports = {
  // Components
  components: {
    globPattern: 'src/components/**/*.html',       // source components to process
    indexByCategory: {
      path: 'components/index.html',               // target location of index by category
      json: 'tmp/componentsByCategory.json',       // temporary JSON file built by the index
    },
    build: {
      pages: true,                                 // false to skip building pages
      screenshots: true,                           // false to skip building screenshots
    },
    prettify: {
      id: cleanTitleize,                           // prettify component id into component name
      category: cleanTitleize,                     // prettify component category
      title: (category, name) => `${category} | ${name}`, // compose title from category and name
    },
    frontMatter: {                                 // font matter defaults (i.e. optional)
      name: undefined,                             // undefined to infer component name
      title: undefined,                            // undefined to infer component title
      category: undefined,                         // undefined to infer component category
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

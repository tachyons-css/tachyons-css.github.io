module.exports = {
  // Components
  components: {
    globPattern: 'src/components/**/*.html',    // source components to process
    forNavPath: 'tmp/componentsForNav.json',    // temporary file built by the index
    indexPath: 'components/index.html',         // target location of components index
    buildPages: true,                           // false to skip building pages
    buildScreenshots: true,                     // false to skip building screenshots
    frontMatter: {                              // font matter defaults (i.e. optional)
      name: undefined,                          // undefined to infer component name
      title: undefined,                         // undefined to infer component title
      bodyClass: 'bg-white',                    // class to apply on <body>
      screenshot: {                             // per-component screenshot options
        selector: '[data-name="component"]',    // DOM element to capture
        autocrop: true,                         // autocrop the capture
        'background-position': 'center center', // CSS background position
        'background-size': 'cover',             // CSS background size ('cover', 'contain', 'auto')
      },
    },
  },
  // Screenshot options
  // (components only for now, but could apply to other areas for consistency)
  screenshot: {
    basename: 'screenshot.jpg',                 // name of *JPEG* screenshot
    aspectRatio: '4x3',                         // Tachyons aspect ratio of screenshots
    viewportWidth: 1024,                        // viewport width used for capture
    viewportHeight: 768,                        // viewport height used for capture
    targetMinWidth: 400,                        // min width of target (final) screenshot
    targetMinHeight: 160,                       // min height of target (final) screenshot
    mozjpegQuality: 90,                         // mozjpeg optimizer quality (default 75)
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

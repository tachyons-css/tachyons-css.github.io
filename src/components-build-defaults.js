module.exports = {
  // Components
  componentsForNavPath: 'tmp/componentsForNav.json', // temporary file built by the index
  componentsGlobPattern: 'src/components/**/*.html', // source components to process
  componentsIndexPath: 'components/index.html',      // target location of components index
  componentsBuildPages: true,                        // false to skip building pages
  componentsBuildScreenshots: true,                  // false to skip building screenshots
  // Screenshots
  screenshotName: 'screenshot.jpg',                  // name JPEG screenshot in each component dir
  screenshotAspectRatio: '4x3',                      // Tachyon aspect ratio of screenshot in index
  screenshotViewportWidth: 1024,                     // viewport width used for capture
  screenshotViewportHeight: 768,                     // viewport height used for capture
  screenshotTargetMinWidth: 400,                     // min width of target, resized screenshot
  screenshotTargetMinHeight: 160,                    // min height of target, resized screenshot
  mozjpegQuality: 90,                                // mozjpeg optimizer quality (default 75)
  screenshotSelector: '[data-name="component-container"]', // DOM element to capture
  // Misc
  tachyonsCssPath: 'src/css/tachyons.css',
  serverPort: 3333,
  // Templates
  analyticsTemplatePath: 'src/templates/ga.html',
  componentsIndexTemplatePath: 'src/templates/components-index.html',
  componentsTemplatePath: 'src/templates/components.html',
  footerTemplatePath: 'src/templates/footer.html',
  headerTemplatePath: 'src/templates/header.html',
  headTemplatePath: 'src/templates/head.html',
  highlightTemplatePath: 'src/templates/highlight.html',
};

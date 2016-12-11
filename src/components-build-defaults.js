module.exports = {
  // Components
  componentsForNavPath: 'tmp/componentsForNav.json',
  componentsGlobPattern: 'src/components/**/*.html',
  componentsIndexPath: 'components/index.html',
  componentsBuildPages: true, // false to skip
  componentsBuildScreenshots: true, // false to skip
  // Screenshots
  screenshotName: 'screenshot.jpg',
  screenshotAspectRatio: '4x3',
  screenshotViewportWidth: 1024,
  screenshotViewportMaxHeight: 768,
  screenshotFinalMinWidth: 360,
  screenshotFinalMinHeight: 128,
  screenshotSelector: '[data-name="component-container"]',
  screenshotCompressionQuality: 98,
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

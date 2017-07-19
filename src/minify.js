const SVGO = require('svgo')
const minifier = new SVGO({
  plugins: [
    // Keep unused plugin comments since order is important when re-enabling
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    // 'removeXMLNS',
    'removeEditorsNSData',
    'cleanupAttrs',
    {
      'inlineStyles': {
        onlyMatchedOnce: false
      }
    },
    'minifyStyles',
    'convertStyleToAttrs',
    'cleanupIDs',
    // 'removeRasterImages',
    'removeUselessDefs',
    'cleanupNumericValues',
    'cleanupListOfValues',
    'convertColors',
    'removeUnknownsAndDefaults',
    'removeNonInheritableGroupAttrs',
    'removeUselessStrokeAndFill',
    // 'removeViewBox',
    'cleanupEnableBackground',
    'removeHiddenElems',
    'removeEmptyText',
    'convertShapeToPath',
    'moveElemsAttrsToGroup',
    'moveGroupAttrsToElems',
    'collapseGroups',
    'convertPathData',
    'convertTransform',
    'removeEmptyAttrs',
    'removeEmptyContainers',
    'mergePaths',
    'removeUnusedNS',
    // 'transformsWithOnePath',
    // 'sortAttrs',
    'removeTitle',
    'removeDesc',
    'removeDimensions',
    'removeAttrs',
    // 'removeElementsByAttr',
    'addClassesToSVGElement',
    'removeStyleElement',
    'addAttributesToSVGElement'
  ]
})

function minify (content) {
  return minifier.optimize(content)
}

module.exports = minify

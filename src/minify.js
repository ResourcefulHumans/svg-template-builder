const SVGO = require('svgo')
const Promise = require('bluebird')
const minifier = new SVGO({
  plugins: [
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',
    'cleanupAttrs',
    'convertStyleToAttrs',
    'cleanupIDs',
    'removeRasterImages',
    'removeUselessDefs',
    'cleanupNumericValues',
    'cleanupListOfValues',
    'convertColors',
    'removeUnknownsAndDefaults',
    'removeNonInheritableGroupAttrs',
    'removeUselessStrokeAndFill',
    'removeViewBox',
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
    'transformsWithOnePath',
    'sortAttrs',
    'removeTitle',
    'removeDesc',
    'removeDimensions',
    'removeAttrs',
    'addClassesToSVGElement',
    'removeStyleElement'
  ]
})

function minify(content) {
  return new Promise(resolve => {
    minifier.optimize(content, result => resolve(result))
  })
}

module.exports = minify

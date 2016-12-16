#!/usr/bin/env node
'use strict'

const Promise = require('bluebird')
const program = require('commander')
const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const globAsync = Promise.promisify(require('glob'))
const minify = require('./minify')
const transform = require('./transform')
const template = require('./template')

program
  .command('build <source> <target>')
    .description('builds a react component based on all SVG\'s included in source')
    .option('-d, --debug', 'output debug information')
    .option('-r, --react', 'transform svg attributes to corresponding react attributes')
    .option('-t, --template <file>', 'which template file to use (default: templates/example.tpl)')
    .option('-l, --label <name>', 'the file name of the resulting file, also a template variable (default: Icon)')
    .option('-e, --extention <ext>', 'the extention of the resulting file (default: js)')
    .action(
      (source, target, options) => {
        const log = options.debug ? console.log : () => {}
        const targetDir = path.resolve(target)
        const targetName = options.label ? options.label : 'Icon'
        const targetEnding = options.extention ? options.extention : 'js'
        const templateFile = options.template ? path.resolve(options.template) : path.join(process.cwd(), 'templates', 'example.tpl')
        source = path.resolve(source)
        const sourceFiles = fs.statSync(source).isFile() ? source : path.join(source, '*.svg')

        log('Starting svg-to-react-components.')
        log(`Converting SVGs from "${source}" to React Class "${targetName}.${targetEnding}" at "${targetDir}".`)

        globAsync(sourceFiles)
        .map(filePath => {
          return fs.readFileAsync(filePath, 'utf8')
            .then(fileContent => {
              return minify(fileContent)
            })
            .then(fileContent => {
              if (!options.react) {
                return fileContent.data
              }
              return transform(fileContent.data)
            })
            .then(svgContent => {
              return {
                content: svgContent,
                name: path.basename(filePath, '.svg')
              }
            })
        })
        .then((icons) => {
          return template(templateFile, targetName, icons)
        })
        .then((result) => {
          const target = path.join(targetDir, `${targetName}.${targetEnding}`)
          return fs.writeFileAsync(target, result)
        })
        .then(() => {
          log('Finished.')
        })
        .then(() => {
          process.exit(0)
        })
        .catch((err) => {
          console.error(err)
          process.exit(1)
        })
      }
    )

program.parse(process.argv)

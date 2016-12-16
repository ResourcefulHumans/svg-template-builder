#!/usr/bin/env node
'use strict'

const Promise = require('bluebird')
const program = require('commander')
const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const globAsync = Promise.promisify(require('glob'))
const minify = require('./minify')
const _template = require('lodash/template')
const _forEach = require('lodash/forEach')
const transform = require('./transform')

program
  .command('build <source> <target>')
    .description('builds a react component based on all SVG\'s included in source')
    .option('-d, --debug', 'output debug information')
    .option('-r, --react', 'transform svg attributes to corresponding react attributes')
    .option('-t, --template <file>', 'which template file to use (default: templates/example.tpl)')
    .option('-c, --class <name>', 'the class name of the component (default: Icon)')
    .action(
      (source, target, options) => {
        const log = options.debug ? console.log : () => {}
        const sourceDir = path.resolve(source)
        const sourceFiles = path.join(sourceDir, '*.svg')
        const targetDir = path.resolve(target)
        const targetName = options.class ? options.class : 'Icon'
        const templateFile = options.template ? path.resolve(options.template) : path.join(process.cwd(), 'templates', 'example.tpl')
        log('Starting svg-to-react-components.')
        log(`Converting SVGs from "${sourceDir}" to React Class "${targetName}.js" at "${targetDir}".`)

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
          return fs.readFileAsync(templateFile).then(templateString => {
            const template = _template(templateString, {imports: {_forEach: _forEach}})
            return template({
              name: targetName,
              icons: icons
            })
          })
        })
        .then((result) => {
          const target = path.join(targetDir, `${targetName}.js`)
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

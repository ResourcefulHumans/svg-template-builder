'use strict'
/* global describe, it */
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const expect = require('chai').expect
const minify = require('../src/minify')
const transform = require('../src/transform')
const template = require('../src/template')
const path = require('path')

describe('svg-template-builder', () => {
  it('should minify SVGs', (done) => {
    Promise.join(
      fs.readFileAsync(path.join(__dirname, './data/01-in.svg'), 'utf8'),
      fs.readFileAsync(path.join(__dirname, './data/01-out.svg'), 'utf8')
    )
    .spread((input, expectedOutput) => {
      minify(input).then((output) => {
        expect(output.data.trim()).to.equal(expectedOutput.trim())
        done()
      })
    })
  })

  it('should transform SVG properties to React properties', (done) => {
    Promise.join(
      fs.readFileAsync(path.join(__dirname, './data/01-in.svg'), 'utf8'),
      fs.readFileAsync(path.join(__dirname, './data/02-out.svg'), 'utf8')
    )
    .spread((input, expectedOutput) => {
      minify(input).then((output) => {
        expect(transform(output.data).trim()).to.equal(expectedOutput.trim())
        done()
      })
    })
  })

  it('should wrap SVG contents inside a template file', (done) => {
    Promise.join(
      fs.readFileAsync(path.join(__dirname, './data/01-in.svg'), 'utf8'),
      fs.readFileAsync(path.join(__dirname, './data/03-out.svg'), 'utf8')
    )
    .spread((input, expectedOutput) => {
      minify(input).then((output) => {
        const icons = [{content: output.data, name: 'Sample'}]
        const templateFile = path.join(__dirname, './data/test.tpl')
        return template(templateFile, 'Icon', icons)
      }).then((output) => {
        expect(output.trim()).to.equal(expectedOutput.trim())
        done()
      })
    })
  })
})

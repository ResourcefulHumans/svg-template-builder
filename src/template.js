const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const _ = require('lodash')

function template (templateFile, label, icons) {
  return fs.readFileAsync(templateFile).then(templateString => {
    const template = _.template(templateString, {imports: {_: _}})
    return template({
      label: label,
      icons: icons
    })
  })
}

module.exports = template

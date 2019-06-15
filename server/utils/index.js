const fp = require('lodash/fp')

const toInteger = (value, defaultValue = 0) =>
  fp.compose(
    fp.defaultTo(defaultValue),
    fp.toInteger,
    fp.replace(/\D/g, '')
  )(value)

const getText = $el => $el.text().trim()

module.exports = {
  toInteger,
  getText
}

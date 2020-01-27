import fp from 'lodash/fp'

export const toInteger = (value, defaultValue = 0) =>
  fp.compose(
    fp.defaultTo(defaultValue),
    fp.toInteger,
    fp.replace(/\D/g, '')
  )(value)

export const getText = $el => $el.text().trim()

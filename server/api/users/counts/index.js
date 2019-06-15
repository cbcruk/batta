const { toInteger, getText } = require('../../../utils')
const { COUNTS_SELECTOR, COUNT_SELECTOR } = require('./selectors')

const getCounts = $ =>
  $(COUNTS_SELECTOR)
    .find(COUNT_SELECTOR)
    .toArray()
    .map(element => toInteger(getText($(element))))

module.exports = getCounts

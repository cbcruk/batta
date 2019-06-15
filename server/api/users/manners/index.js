const { getText, toInteger } = require('../../../utils')
const {
  MANNERS_SELECTOR,
  MANNER_SELECTOR,
  MANNER_CONTENT_SELECTOR,
  MANNER_COUNT_SELECTOR
} = require('./selectors')

const getManners = $ =>
  $(MANNERS_SELECTOR)
    .find(MANNER_SELECTOR)
    .toArray()
    .map(element => {
      const $this = $(element)

      const [content, countText] = [
        MANNER_CONTENT_SELECTOR,
        MANNER_COUNT_SELECTOR
      ].map(selector => getText($this.find(selector)))
      const count = toInteger(countText)

      return {
        content,
        count
      }
    })

module.exports = getManners

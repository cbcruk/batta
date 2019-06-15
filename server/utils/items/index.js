const { toInteger, getText } = require('../../utils')
const {
  ID_SELECTOR,
  IMAGE_SELECTOR,
  TITLE_SELECTOR,
  REGION_SELECTOR,
  PRICE_SELECTOR,
  COUNTS_SELECTOR
} = require('./selectors')

function getItems($, selector) {
  return $(selector)
    .toArray()
    .map(element => {
      const $this = $(element)

      const [title, region, priceText] = [
        TITLE_SELECTOR,
        REGION_SELECTOR,
        PRICE_SELECTOR
      ].map(selector => getText($this.find(selector)))
      const price = toInteger(priceText, '무료나눔')
      const id = $this
        .find(ID_SELECTOR)
        .attr('href')
        .replace('/articles/', '')
      const image = $this.find(IMAGE_SELECTOR).attr('src')
      const [interest, reply, chat] = $this
        .find(COUNTS_SELECTOR)
        .toArray()
        .map(element => toInteger($(element).text()))

      return {
        id,
        image,
        title,
        region,
        price,
        interest,
        reply,
        chat
      }
    })
}

module.exports = getItems

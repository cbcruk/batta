const { toInteger, getText } = require('../../../utils')
const {
  ITEMS_SELECTOR,
  ITEM_SELECTOR,
  ID_SELECTOR,
  IMAGE_SELECTOR,
  LIKE_SELECTOR,
  COMMENT_SELECTOR,
  TITLE_SELECTOR,
  CONTENT_SELECTOR,
  REGION_SELECTOR,
  PRICE_SELECTOR
} = require('./selectors')

const getLocal = $ =>
  $(ITEMS_SELECTOR)
    .find(ITEM_SELECTOR)
    .toArray()
    .map(element => {
      const $this = $(element)

      const [likeText, commentText, title, contentText, region, priceText] = [
        LIKE_SELECTOR,
        COMMENT_SELECTOR,
        TITLE_SELECTOR,
        CONTENT_SELECTOR,
        REGION_SELECTOR,
        PRICE_SELECTOR
      ].map(selector => getText($this.find(selector)))
      const id = $this
        .find(ID_SELECTOR)
        .attr('href')
        .replace('/articles/', '')
      const image = $this.find(IMAGE_SELECTOR).attr('src')
      const price = toInteger(priceText, '무료나눔')
      const content = contentText.slice(0, 100)
      const [like, comment] = [likeText, commentText].map(text =>
        toInteger(text)
      )

      return {
        id,
        image,
        title,
        content,
        region,
        price,
        like,
        comment
      }
    })

module.exports = getLocal

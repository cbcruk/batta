const { toInteger, getText } = require('../../../utils')
const {
  ITEMS_SELECTOR,
  ITEM_SELECTOR,
  ID_SELECTOR,
  IMAGE_SELECTOR,
  LIKE_SELECTOR,
  REVIEW_SELECTOR,
  TITLE_SELECTOR,
  REGION_CATEGORY_SELECTOR
} = require('./selectors')

const getStores = $ =>
  $(ITEMS_SELECTOR)
    .find(ITEM_SELECTOR)
    .toArray()
    .map(element => {
      const $this = $(element)

      const [likeText, commentText, title, regionCategoryText] = [
        LIKE_SELECTOR,
        REVIEW_SELECTOR,
        TITLE_SELECTOR,
        REGION_CATEGORY_SELECTOR
      ].map(selector => getText($this.find(selector)))
      const id = $this
        .find(ID_SELECTOR)
        .attr('href')
        .replace('/smbs/', '')
      const image = $this.find(IMAGE_SELECTOR).attr('src')
      const [region, category] = regionCategoryText
        .split('∙')
        .map(text => text.trim())
      const [like, comment] = [likeText, commentText].map(text =>
        toInteger(text)
      )

      return {
        id,
        image,
        title,
        region,
        category,
        like,
        comment
      }
    })

module.exports = getStores

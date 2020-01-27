import {
  ITEMS_SELECTOR,
  ITEM_SELECTOR,
  ID_SELECTOR,
  IMAGE_SELECTOR,
  LIKE_SELECTOR,
  COMMENT_SELECTOR,
  TITLE_SELECTOR,
  REGION_SELECTOR,
  PRICE_SELECTOR
} from './selectors'
import { getText, toInteger } from '../../../../lib/text-helpers'

function getItems($) {
  return $(ITEMS_SELECTOR)
    .find(ITEM_SELECTOR)
    .toArray()
    .map(element => {
      const $this = $(element)

      const [title, region, likeText, commentText, priceText] = [
        TITLE_SELECTOR,
        REGION_SELECTOR,
        LIKE_SELECTOR,
        COMMENT_SELECTOR,
        PRICE_SELECTOR
      ].map(selector => getText($this.find(selector)))
      const id = $this
        .find(ID_SELECTOR)
        .attr('href')
        .replace('/articles/', '')
      const image = $this.find(IMAGE_SELECTOR).attr('src')
      const price = toInteger(priceText, '무료나눔')
      const [like, comment] = [likeText, commentText].map(text =>
        toInteger(text)
      )

      return {
        id,
        image,
        title,
        region,
        price,
        like,
        comment
      }
    })
}

export default getItems

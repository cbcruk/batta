import { getText, toInteger } from '../text-helpers'

export const ID_SELECTOR = '.card-link'
export const IMAGE_SELECTOR = 'img'
export const TITLE_SELECTOR = '.card-title'
export const REGION_SELECTOR = '.card-region-name'
export const PRICE_SELECTOR = '.card-price'
export const COUNTS_SELECTOR = '.card-counts > span'

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

export default getItems

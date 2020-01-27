import {
  ITEM_SELECTOR,
  COUNTS_SELECTOR,
  CATEGORY_SELECTOR,
  TITLE_SELECTOR,
  PRICE_SELECTOR,
  DESC_SELECTOR,
  IMAGES_SELECTOR
} from './selectors'
import { getText, toInteger } from '../../../../lib/text-helpers'

function getItem($) {
  const $this = $(ITEM_SELECTOR)

  const [counts, categoryText, title, price, desc] = [
    COUNTS_SELECTOR,
    CATEGORY_SELECTOR,
    TITLE_SELECTOR,
    PRICE_SELECTOR,
    DESC_SELECTOR
  ].map(selector => getText($this.find(selector)))
  const [interest, reply, chat] = counts
    .split(' ∙ ')
    .map(text => toInteger(text))
  const [category, time] = categoryText.split('∙').map(text => text.trim())
  const images = $this
    .find(IMAGES_SELECTOR)
    .toArray()
    .map(elemenet => $(elemenet).data('lazy'))

  return {
    title,
    price,
    desc,
    images,
    category,
    time,
    interest,
    reply,
    chat
  }
}

export default getItem

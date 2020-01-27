import {
  COMMENT_SELECTOR,
  TOTAL_SELECTOR,
  USER_NAME_SELECTOR,
  USER_ID_SELECTOR,
  USER_REGION_SELECTOR,
  DESC_SELECTOR,
  TIME_SELECTOR,
  ITEMS_SELECTOR
} from './selectors'
import { toInteger, getText } from '../../../../lib/text-helpers'

function getComment($) {
  const $this = $(COMMENT_SELECTOR)

  const total = toInteger($this.find(TOTAL_SELECTOR).text())
  const items = $this
    .find(ITEMS_SELECTOR)
    .toArray()
    .map(element => {
      const $this = $(element)

      const [user_name, user_region, desc, time] = [
        USER_NAME_SELECTOR,
        USER_REGION_SELECTOR,
        DESC_SELECTOR,
        TIME_SELECTOR
      ].map(selector => getText($this.find(selector)))
      const user_id = toInteger($this.find(USER_ID_SELECTOR).attr('href'))

      return {
        user_name,
        user_id,
        user_region,
        desc,
        time
      }
    })

  return {
    total,
    items
  }
}

export default getComment

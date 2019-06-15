const { toInteger, getText } = require('../../../utils')
const {
  COMMENT_SELECTOR,
  TOTAL_SELECTOR,
  USER_NAME_SELECTOR,
  USER_ID_SELECTOR,
  USER_REGION_SELECTOR,
  DESC_SELECTOR,
  TIME_SELECTOR,
  ITEMS_SELECTOR
} = require('./selectors')

const getComment = $ => {
  const $this = $(COMMENT_SELECTOR)

  const total = toInteger($this.find(TOTAL_SELECTOR).text())
  const items = $this.find(ITEMS_SELECTOR).map((_, comment) => {
    const $this = $(comment)

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

module.exports = getComment

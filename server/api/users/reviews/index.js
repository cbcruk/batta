const { getText } = require('../../../utils')
const {
  REVIEWS_SELECTOR,
  AVATAR_SELECTOR,
  NAME_SELECTOR,
  REGION_SELECTOR,
  CONTENT_SELECTOR,
  TIME_SELECTOR
} = require('./selectors')

const getReviews = $ =>
  $(REVIEWS_SELECTOR)
    .toArray()
    .map(element => {
      const $this = $(element)

      const [name, region, content, time] = [
        NAME_SELECTOR,
        REGION_SELECTOR,
        CONTENT_SELECTOR,
        TIME_SELECTOR
      ].map(selector => getText($this.find(selector)))
      const avatar = $this.find(AVATAR_SELECTOR).attr('src')

      return {
        avatar,
        name,
        region,
        content,
        time
      }
    })

module.exports = getReviews

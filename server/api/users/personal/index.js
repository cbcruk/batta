const { getText } = require('../../../utils')
const {
  PERSONAL_SELECTOR,
  NAME_SELECTOR,
  REGION_SELECTOR,
  AVATAR_SELECTOR,
  TEMPERATURE_SELECTOR
} = require('./selectors')

const getPersonal = $ => {
  const $this = $(PERSONAL_SELECTOR)

  const [nameText, region] = [NAME_SELECTOR, REGION_SELECTOR].map(selector =>
    getText($(selector))
  )
  const [temperature, desired_rate_resale] = $this
    .find(TEMPERATURE_SELECTOR)
    .toArray()
    .map(element => getText($(element)))
  const name = nameText.split('\n')[0]
  const avatar = $this.find(AVATAR_SELECTOR).attr('src')

  return {
    name,
    region,
    avatar,
    temperature,
    desired_rate_resale
  }
}

module.exports = getPersonal

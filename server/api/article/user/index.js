const { getText } = require('../../../utils')
const {
  USER_SELECTOR,
  ID_SELECTOR,
  AVATAR_SELECTOR,
  NAME_SELECTOR,
  REGION_SELECTOR,
  TEMPERATURE_SELECTOR
} = require('./selectors')

const getUser = $ => {
  const $this = $(USER_SELECTOR)

  const [name, region, temperature] = [
    NAME_SELECTOR,
    REGION_SELECTOR,
    TEMPERATURE_SELECTOR
  ].map(selector => getText($this.find(selector)))
  const id = $this
    .find(ID_SELECTOR)
    .attr('href')
    .replace('/users/', '')
  const avatar = $this.find(AVATAR_SELECTOR).attr('src')

  return {
    id,
    name,
    region,
    avatar,
    temperature
  }
}

module.exports = getUser

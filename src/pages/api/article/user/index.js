import {
  USER_SELECTOR,
  ID_SELECTOR,
  AVATAR_SELECTOR,
  NAME_SELECTOR,
  REGION_SELECTOR,
  TEMPERATURE_SELECTOR
} from './selectors'
import { getText } from '../../../../lib/text-helpers'

function getUser($) {
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

export default getUser

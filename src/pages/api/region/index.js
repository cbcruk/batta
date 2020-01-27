import {
  DISTRICTS_SELECTOR,
  DISTRICT_SELECTOR,
  ITEMS_SELECTOR
} from './selectors'
import rpc from '../../../lib/daangn/rpc'
import getItems from '../../../lib/daangn/getItems'

async function region(req, res) {
  const { region1, region2, region3 } = req.query
  const regions = [region1, region2, region3]
    .filter(Boolean)
    .map(r => encodeURIComponent(r))
    .join('/')
  const $ = await rpc(`/region/${regions}`)

  const district = $(DISTRICTS_SELECTOR)
    .find(DISTRICT_SELECTOR)
    .toArray()
    .map(element =>
      $(element)
        .children()
        .map((_, option) => $(option).val())
        .toArray()
        .slice(1)
    )
  const items = getItems($, ITEMS_SELECTOR)

  res.json({
    district,
    items
  })
}

export default region

import { KEYWORDS_SELECTOR, KEYWORD_SELECTOR } from './selectors'
import getItems from './items'
import getStores from './stores'
import getLocal from './local'
import rpc from '../../../lib/daangn/rpc'
import { getText } from '../../../lib/text-helpers'

async function search(req, res) {
  const $ = await rpc(`/search/${encodeURIComponent(req.query.keyword)}`)

  const keywords = $(KEYWORDS_SELECTOR)
    .find(KEYWORD_SELECTOR)
    .toArray()
    .map(element => getText($(element)))
  const items = getItems($)
  const stores = getStores($)
  const local = getLocal($)

  res.json({
    keywords,
    items,
    stores,
    local
  })
}

export default search

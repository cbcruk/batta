import { ITEMS_SELECTOR } from './selectors'
import rpc from '../../../lib/daangn/rpc'
import getItems from '../../../lib/daangn/getItems'

async function articles(req, res) {
  const endpoint = ['/', '/hot_articles'][~~req.query.is_hot]
  const $ = await rpc(endpoint)

  const items = getItems($, ITEMS_SELECTOR)

  res.json({
    items
  })
}

export default articles

import getUser from './user'
import getItem from './item'
import getComment from './comment'
import { RELATED_SELECTOR, NEAR_SELECTOR } from './selectors'
import rpc from '../../../lib/daangn/rpc'
import getItems from '../../../lib/daangn/getItems'

async function article(req, res) {
  const $ = await rpc(`/articles/${req.query.id}`)

  const [user, item, comment] = [getUser, getItem, getComment].map(fn => fn($))
  const related = getItems($, RELATED_SELECTOR)
  const near = getItems($, NEAR_SELECTOR)

  res.json({
    user,
    item,
    comment,
    related,
    near
  })
}

export default article

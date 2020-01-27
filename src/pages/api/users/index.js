import getPersonal from './personal'
import getCounts from './counts'
import getManners from './manners'
import getReviews from './reviews'
import { ITEMS_SELECTOR } from './selectors'
import rpc from '../../../lib/daangn/rpc'
import getItems from '../../../lib/daangn/getItems'

async function users(req, res) {
  const [$, $reviews, $manners] = await Promise.all([
    rpc(`/users/${req.query.id}`),
    rpc(`/users/${req.query.id}?kind=reviews`),
    rpc(`/users/${req.query.id}?kind=manners`)
  ])

  const items = getItems($, ITEMS_SELECTOR)
  const [personal, counts] = [getPersonal, getCounts].map(fn => fn($))
  const reviews = getReviews($reviews)
  const manners = getManners($manners)

  res.json({
    personal,
    items,
    counts,
    reviews,
    manners
  })
}

export default users

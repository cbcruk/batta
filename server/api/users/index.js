const express = require('express')
const { getHtml } = require('../../lib/axios')
const getItems = require('../../utils/items')
const getPersonal = require('./personal')
const getCounts = require('./counts')
const getManners = require('./manners')
const getReviews = require('./reviews')

const ITEMS_SELECTOR = '#user-records article'

const app = express()

app.get('*', async (req, res) => {
  const [$, $reviews, $manners] = await Promise.all([
    getHtml(`/users/${req.query.id}`),
    getHtml(`/users/${req.query.id}?kind=reviews`),
    getHtml(`/users/${req.query.id}?kind=manners`)
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
})

module.exports = app

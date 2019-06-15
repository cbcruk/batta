const express = require('express')
const { getHtml } = require('../../lib/axios')
const getItems = require('../../utils/items')
const getUser = require('./user')
const getItem = require('./item')
const getComment = require('./comment')
const { RELATED_SELECTOR, NEAR_SELECTOR } = require('./selectors')

const app = express()

app.get('*', async (req, res) => {
  const $ = await getHtml(`/articles/${req.query.id}`)

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
})

module.exports = app

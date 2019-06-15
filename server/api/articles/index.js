const express = require('express')
const { getHtml } = require('../../lib/axios')
const getItems = require('../../utils/items')
const { ITEMS_SELECTOR } = require('./selectors')

const app = express()

app.get('*', async (req, res) => {
  const endpoint = ['/', '/hot_articles'][~~req.query.is_hot]
  const $ = await getHtml(endpoint)

  const items = getItems($, ITEMS_SELECTOR)

  res.json({
    items
  })
})

module.exports = app

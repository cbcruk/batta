const express = require('express')
const { getHtml } = require('../../lib/axios')
const { getText } = require('../../utils')
const { KEYWORDS_SELECTOR, KEYWORD_SELECTOR } = require('./selectors')
const getItems = require('./items')
const getStores = require('./stores')
const getLocal = require('./local')

const app = express()

app.get('*', async (req, res) => {
  const $ = await getHtml(`/search/${encodeURIComponent(req.query.keyword)}`)

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
})

module.exports = app

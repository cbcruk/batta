const express = require('express')
const { getHtml } = require('../../lib/axios')
const getItems = require('../../utils/items')
const {
  DISTRICTS_SELECTOR,
  DISTRICT_SELECTOR,
  ITEMS_SELECTOR
} = require('./selectors')

const app = express()

app.get('*', async (req, res) => {
  const { region1, region2, region3 } = req.query
  const regions = [region1, region2, region3]
    .map(r => encodeURIComponent(r))
    .join('/')
  const $ = await getHtml(`/region/${regions}`)

  const district = $(DISTRICTS_SELECTOR)
    .find(DISTRICT_SELECTOR)
    .toArray()
    .map(element =>
      $(element)
        .children()
        .map((_, option) => $(option).val())
        .slice(1)
    )
  const items = getItems($, ITEMS_SELECTOR)

  res.json({
    district,
    items
  })
})

module.exports = app

const { Router } = require('express')
const { constructPage } = require('../lib/puppeteer')
const getItems = require('../utils/getItems')

function region() {
  const DISTRICT_SELECTOR = '#hot-articles-navigation > select'
  const ITEMS_SELECTOR = '#content .cards-wrap > article'

  const router = Router()

  router.get('/', async (req, res) => {
    const { region1, region2, region3 } = req.query
    const regions = [region1, region2, region3].join('/')
    const endpoint = `region/${regions}`
    const page = await constructPage(endpoint)

    const district = await page.evaluate(
      selector =>
        [...document.querySelectorAll(selector)].map(select =>
          [...select.children].slice(1).map(option => option.value)
        ),
      DISTRICT_SELECTOR
    )

    const items = await page.evaluate(getItems, ITEMS_SELECTOR)

    res.json({
      district,
      items
    })
  })

  return router
}

module.exports = region

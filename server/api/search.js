const { Router } = require('express')
const { constructPage } = require('../lib/puppeteer')
const getItems = require('../utils/getItems')

function search() {
  const KEYWORDS_SELECTOR = '#search-top-keywords-list > li'
  const ITEMS_SELECTOR = '#search-cards-list .cards-wrap > article'
  const TOP_KEYWORDS_SELECTOR = '#top-keywords-list > li'

  const router = Router()

  router.get('/', async (req, res) => {
    const endpoint = `search/${req.query.keyword}`
    const page = await constructPage(endpoint)

    const keywords = await page.evaluate(selector => {
      return [...document.querySelectorAll(selector)].map(li => li.innerText)
    }, KEYWORDS_SELECTOR)
    const items = await page.evaluate(getItems, ITEMS_SELECTOR)

    res.json({
      keywords,
      items
    })
  })

  router.get('/keywords', async (_req, res) => {
    const endpoint = 'top_keywords'
    const page = await constructPage(endpoint)
    const keywords = await page.evaluate(selector => {
      const KEYWORD_SELECTOR = '.keyword-text'
      const CHANGED_RANK_SELECTOR = '.changed_rank'
      const DOWN_SELECTOR = '.down'
      const UP_SELECTOR = '.up'

      return [...document.querySelectorAll(selector)].map(li => {
        const find = li.querySelector.bind(li)
        const text = (find(KEYWORD_SELECTOR) || {}).innerText
        const rank = (find(CHANGED_RANK_SELECTOR) || {}).innerText
        const is_down = Boolean(find(DOWN_SELECTOR))
        const is_up = Boolean(find(UP_SELECTOR))

        return {
          text,
          rank,
          is_down,
          is_up
        }
      })
    }, TOP_KEYWORDS_SELECTOR)

    res.json({
      keywords
    })
  })

  return router
}

module.exports = search

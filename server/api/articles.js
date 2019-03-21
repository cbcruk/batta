const { Router } = require('express')
const { constructPage } = require('../lib/puppeteer')
const getItems = require('../utils/getItems')

function articles() {
  const ITEMS_SELECTOR = '.cards-wrap > article.card-top'
  const RELATED_SELECTOR = '#article-detail-related article.card'
  const NEAR_SELECTOR = '#article-detail-hot-more article.card'

  const router = Router()

  router.get('/', async (req, res) => {
    const endpoint = req.query.is_hot ? 'hot_articles' : ''
    const page = await constructPage(endpoint)
    const items = await page.evaluate(getItems, ITEMS_SELECTOR)

    res.json({
      items
    })
  })

  router.get('/:id', async (req, res) => {
    const endpoint = `articles/${req.params.id}`
    const page = await constructPage(endpoint)

    const user = await page.evaluate(() => {
      const find = document.querySelector.bind(document)

      const NAME_SELECTOR = '#nickname'
      const REGION_SELECTOR = '#region-name'
      const AVATAR_SELECTOR = '#article-profile-image > img'
      const TEMPERATURE_SELECTOR = '#temperature-wrap dd'

      const name = find(NAME_SELECTOR).innerText
      const region = find(REGION_SELECTOR).innerText
      const avatar = find(AVATAR_SELECTOR).getAttribute('src')
      const temperature = find(TEMPERATURE_SELECTOR).innerText

      return {
        name,
        region,
        avatar,
        temperature
      }
    })

    const item = await page.evaluate(() => {
      const find = document.querySelector.bind(document)
      const findAll = document.querySelectorAll.bind(document)

      const COUNTS_SELECTOR = '#article-counts'
      const CATEGORY_SELECTOR = '#article-category'
      const TITLE_SELECTOR = '#article-title'
      const STATUS_SELECTOR = '.status'
      const PRICE_SELECTOR = '#article-price'
      const DESC_SELECTOR = '#article-detail'
      const IMAGES_SELECTOR = '#image-slider img'

      const title = find(TITLE_SELECTOR).innerText
      const status = find(STATUS_SELECTOR).innerText
      const price = find(PRICE_SELECTOR).innerText
      const desc = find(DESC_SELECTOR).innerText
      const images = [...findAll(IMAGES_SELECTOR)].map(img => img.dataset.lazy)
      const [interest, reply, chat] = find(COUNTS_SELECTOR)
        .innerText.split(' ∙ ')
        .map(t => parseInt(t.replace(/\D/g, ''), 10))
      const [category, time] = find(CATEGORY_SELECTOR).innerText.split(' ∙ ')

      return {
        title,
        status,
        price,
        desc,
        images,
        category,
        time,
        interest,
        reply,
        chat
      }
    })

    const comment = await page.evaluate(() => {
      const find = document.querySelector.bind(document)
      const findAll = document.querySelectorAll.bind(document)

      const TOTAL_SELECTOR = '#article-comments'
      const ITEMS_SELECTOR = '.article-comment'
      const USER_NAME_SELECTOR = '.article-comment-nickname'
      const USER_ID_SELECTOR = '.article-comment-nickname a'
      const USER_REGION_SELECTOR = '.article-comment-region-name'
      const DESC_SELECTOR = '.article-comment-text'
      const TIME_SELECTOR = '.article-comment-time'

      const total = find(TOTAL_SELECTOR).innerText.replace(/\D/g, '')
      const items = [...findAll(ITEMS_SELECTOR)].map(comment => {
        const find = comment.querySelector.bind(comment)

        if (comment) {
          const user_name = find(USER_NAME_SELECTOR).innerText
          const user_id = find(USER_ID_SELECTOR)
            .getAttribute('href')
            .replace(/\D/g, '')
          const user_region = find(USER_REGION_SELECTOR).innerText
          const desc = find(DESC_SELECTOR).innerText
          const time = find(TIME_SELECTOR).innerText

          return {
            user_name,
            user_id,
            user_region,
            desc,
            time
          }
        }
      })

      return {
        total,
        items
      }
    })

    const related = await page.evaluate(getItems, RELATED_SELECTOR)

    const near = await page.evaluate(getItems, NEAR_SELECTOR)

    res.json({
      user,
      item,
      comment,
      related,
      near
    })
  })

  return router
}

module.exports = articles

const { Router } = require('express')
const { constructPage } = require('../lib/puppeteer')
const getItems = require('../utils/getItems')

function users() {
  const ITEMS_SELECTOR = '#user-records article'
  const COUNTS_SELECTOR = '#user-filter li'
  const MANNERS_SELECTOR = '#manners-list > li'
  const REVIEWS_SELECTOR = '#reviews-list > li'

  const router = Router()

  router.get('/:id', async (req, res) => {
    const endpoint = `users${req.url}`
    const page = await constructPage(endpoint)

    const personal = await page.evaluate(() => {
      const NAME_SELECTOR = '#nickname'
      const REGION_SELECTOR = '#region_name'
      const AVATAR_SELECTOR = '#profile-image > img'
      const TEMPERATURE_SELECTOR = '.profile-detail-count'

      const find = document.querySelector.bind(document)

      const name = find(NAME_SELECTOR).firstChild.textContent.trim()
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

    const items = await page.evaluate(getItems, ITEMS_SELECTOR)

    const counts = await page.evaluate(
      selector =>
        [...document.querySelectorAll(selector)].map(li =>
          li.innerText.replace(/\D/g, '')
        ),
      COUNTS_SELECTOR
    )

    const manners = await page.evaluate(
      selector =>
        [...document.querySelectorAll(selector)].map(li => {
          const [content, count] = [...li.children].map(
            child => child.innerText
          )

          return {
            content,
            count
          }
        }),
      MANNERS_SELECTOR
    )

    const reviews = await page.evaluate(selector => {
      const AVATAR_SELECTOR = '.review-profile-photo img'
      const NAME_SELECTOR = '.review-writer-nickname'
      const REGION_SELECTOR = '.review-writer-region-name'
      const CONTENT_SELECTOR = '.review-content'
      const TIME_SELECTOR = '.review-time'

      return [...document.querySelectorAll(selector)].map(li => {
        const find = li.querySelector.bind(li)

        const avatar = find(AVATAR_SELECTOR).getAttribute('src')
        const name = find(NAME_SELECTOR).innerText
        const region = find(REGION_SELECTOR).innerText
        const content = find(CONTENT_SELECTOR).innerText
        const time = find(TIME_SELECTOR).innerText

        return {
          avatar,
          name,
          region,
          content,
          time
        }
      })
    }, REVIEWS_SELECTOR)

    res.json({
      personal,
      items,
      counts,
      manners,
      reviews
    })
  })

  return router
}

module.exports = users

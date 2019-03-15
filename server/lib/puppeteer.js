const puppeteer = require('puppeteer')
const { SITE_ORIGIN } = require('../config')

let browser

async function constructPage(path = '') {
  const url = `${SITE_ORIGIN}/${path}`

  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null
    })
  }

  const page = await fetchRemotePage(url)

  return page
}

async function fetchRemotePage(url) {
  const page = await browser.newPage()

  try {
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 5000
    })
  } catch (error) {
    await page.close()
    throw new Error('page.goto/waitForSelector timed out.')
  }

  return page
}

module.exports = {
  constructPage
}

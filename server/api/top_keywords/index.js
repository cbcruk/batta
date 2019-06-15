const express = require('express')
const { getText } = require('../../utils')
const { getHtml } = require('../../lib/axios')
const {
  KEYWORDS_SELECTOR,
  KEYWORD_SELECTOR,
  KEYWORD_TEXT_SELECTOR,
  CHANGED_RANK_SELECTOR,
  DOWN_SELECTOR,
  UP_SELECTOR
} = require('./selectors')

const app = express()

app.get('*', async (_req, res) => {
  const $ = await getHtml('/top_keywords')
  const keywords = $(KEYWORDS_SELECTOR)
    .find(KEYWORD_SELECTOR)
    .toArray()
    .map(element => {
      const $this = $(element)

      const [text, rank] = [KEYWORD_TEXT_SELECTOR, CHANGED_RANK_SELECTOR].map(
        selector => getText($this.find(selector))
      )
      const [is_down, is_up] = [DOWN_SELECTOR, UP_SELECTOR].map(selector =>
        Boolean($this.find(selector).length)
      )

      return {
        text,
        rank,
        is_down,
        is_up
      }
    })

  res.json({
    keywords
  })
})

module.exports = app

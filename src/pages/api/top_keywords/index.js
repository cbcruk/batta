import {
  KEYWORDS_SELECTOR,
  KEYWORD_SELECTOR,
  KEYWORD_TEXT_SELECTOR,
  CHANGED_RANK_SELECTOR,
  DOWN_SELECTOR,
  UP_SELECTOR
} from './selectors'
import rpc from '../../../lib/daangn/rpc'
import { getText } from '../../../lib/text-helpers'

async function topKeywords(_req, res) {
  const $ = await rpc('/top_keywords')
  const keywords = $(KEYWORDS_SELECTOR)
    .find(KEYWORD_SELECTOR)
    .toArray()
    .map(element => {
      const $this = $(element)

      const [text, rank] = [
        KEYWORD_TEXT_SELECTOR,
        CHANGED_RANK_SELECTOR
      ].map(selector => getText($this.find(selector)))
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
}

export default topKeywords

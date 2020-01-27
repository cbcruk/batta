import { COUNTS_SELECTOR, COUNT_SELECTOR } from './selectors'
import { getText, toInteger } from '../../../../lib/text-helpers'

function getCounts($) {
  return $(COUNTS_SELECTOR)
    .find(COUNT_SELECTOR)
    .toArray()
    .map(element => toInteger(getText($(element))))
}

export default getCounts

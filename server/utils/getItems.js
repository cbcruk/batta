function getItems(selector) {
  const ID_SELECTOR = '.card-link'
  const IMAGE_SELECTOR = 'img'
  const TITLE_SELECTOR = '.card-title'
  const REGION_SELECTOR = '.card-region-name'
  const PRICE_SELECTOR = '.card-price'
  const COUNTS_SELECTOR = '.card-counts > span'

  return [...document.querySelectorAll(selector)].map(item => {
    const find = item.querySelector.bind(item)
    const findAll = item.querySelectorAll.bind(item)

    const id = find(ID_SELECTOR).dataset.eventLabel
    const image = find(IMAGE_SELECTOR).getAttribute('src')
    const title = find(TITLE_SELECTOR).innerText
    const region = find(REGION_SELECTOR).innerText
    const price = parseInt(
      find(PRICE_SELECTOR).innerText.replace(/\D/g, ''),
      10
    )
    const [interest, reply, chat] = [...findAll(COUNTS_SELECTOR)].map(span =>
      parseInt(span.innerText.replace(/\D/g, ''), 10)
    )

    return {
      id,
      image,
      title,
      region,
      price,
      interest,
      reply,
      chat
    }
  })
}

module.exports = getItems

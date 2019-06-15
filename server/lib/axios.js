const axios = require('axios')
const cheerio = require('cheerio')

axios.defaults.baseURL = 'https://www.daangn.com'

axios.interceptors.request.use(config => {
  console.log(config.method.toUpperCase(), config.url)

  return config
})

const getHtml = async endpoint => {
  const response = await axios.get(endpoint)
  const html = response.data
  const $ = cheerio.load(html)

  return $
}

module.exports = {
  axios,
  getHtml
}

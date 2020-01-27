import axios from 'axios'
import cheerio from 'cheerio'

const daangn = axios.create()
daangn.defaults.baseURL = 'https://www.daangn.com'

async function rpc(endpoint) {
  try {
    const response = await daangn.get(endpoint)
    const $ = cheerio.load(response.data)

    return $
  } catch (error) {
    throw new Error(error)
  }
}

export default rpc

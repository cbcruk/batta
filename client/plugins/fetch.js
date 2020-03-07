const isDevelopment = process.env.NODE_ENV === 'development'

const API_URL = isDevelopment
  ? 'http://localhost:3000'
  : 'https://batta.cbcruk.now.sh'

async function fetchData(endpoint) {
  const response = await fetch(`${API_URL}/api/${endpoint}`)
  const data = await response.json()

  return data
}

export default fetchData

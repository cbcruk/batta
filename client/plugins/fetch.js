const fetchData = async endpoint => {
  const response = await fetch(`https://batta.cbcruk.now.sh/api/${endpoint}`)
  const data = await response.json()

  return data
}

export default fetchData

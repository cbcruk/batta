import React from 'react'
import { Text } from 'react-native'

const getCurrency = number =>
  new Intl.NumberFormat('ko-kr', {
    style: 'currency',
    currency: 'KRW'
  }).format(number)

function Price({ price, ...rest }) {
  return <Text {...rest}>{isNaN(price) ? price : getCurrency(price)}</Text>
}

export default Price

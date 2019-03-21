import React from 'react'
import { Text } from 'react-native'

const getCurrency = number =>
  new Intl.NumberFormat('ko-kr', {
    style: 'currency',
    currency: 'KRW'
  }).format(number)

const Price = ({ price, ...rest }) => (
  <Text {...rest}>{isNaN(price) ? price : getCurrency(price)}</Text>
)

export default Price

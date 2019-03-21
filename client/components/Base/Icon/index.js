import React from 'react'
import { Platform } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Icon = ({ name, ...rest }) => (
  <Ionicons
    name={Platform.OS === 'ios' ? `ios-${name}` : `md-${name}`}
    {...rest}
  />
)

export default Icon

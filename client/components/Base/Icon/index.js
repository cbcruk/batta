import React from 'react'
import { Platform } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

function Icon({ name, ...rest }) {
  return (
    <Ionicons
      name={Platform.OS === 'ios' ? `ios-${name}` : `md-${name}`}
      {...rest}
    />
  )
}

export default Icon

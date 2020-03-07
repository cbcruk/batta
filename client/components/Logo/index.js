import React from 'react'
import { Image } from 'react-native'
import logoImage from './img/logo.png'

function Logo() {
  return (
    <Image
      source={logoImage}
      style={{ width: 80, height: 80 * (111 / 369), marginLeft: 10 }}
      resizeMode="contain"
    />
  )
}

export default Logo

import React from 'react'
import { Image } from 'react-native'
import logoImage from './img/logo.png'

const Logo = () => (
  <Image
    source={logoImage}
    style={{ width: 80, marginLeft: 10 }}
    resizeMode="contain"
  />
)

export default Logo

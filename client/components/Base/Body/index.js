import React from 'react'
import { StyleSheet, View } from 'react-native'

const Body = ({ children, style }) => (
  <View style={[styles.container, style]}>{children}</View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10
  }
})

export default Body

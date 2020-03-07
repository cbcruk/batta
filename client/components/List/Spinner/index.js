import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'

function Spinner(props) {
  return <ActivityIndicator style={styles.container} {...props} />
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill
  }
})

export default Spinner

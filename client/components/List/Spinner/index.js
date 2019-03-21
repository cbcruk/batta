import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'

const Spinner = props => (
  <ActivityIndicator {...props} style={styles.container} />
)

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill
  }
})

export default Spinner

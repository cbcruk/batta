import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import useOptions from '../hooks/useOptions'
import useFetch from '../hooks/useFetch'

function UserScreen({ route }) {
  const { title, id } = route?.params ?? {}

  id && useFetch(`users?id=${id}`)

  useOptions({ title })

  return (
    <ScrollView style={styles.container}>
      <View />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
})

export default UserScreen

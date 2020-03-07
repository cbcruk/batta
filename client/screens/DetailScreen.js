import React from 'react'
import { ScrollView, View, Button, StyleSheet } from 'react-native'
import useOptions from '../hooks/useOptions'
import useFetch from '../hooks/useFetch'
import Spinner from '../components/List/Spinner'

function DetailScreen({ navigation, route }) {
  const id = route.params?.id ?? null
  const { data, status } = id && useFetch(`article?id=${id}`)
  const { user } = data ?? {}

  useOptions({ title: id })

  return (
    <ScrollView style={styles.container}>
      {status === 'loading' && <Spinner animating />}
      {status === 'success' && (
        <View>
          <Button
            title={user.name}
            onPress={() =>
              navigation.navigate('User', {
                title: user.name,
                id: user.id
              })
            }
          />
        </View>
      )}
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

export default DetailScreen

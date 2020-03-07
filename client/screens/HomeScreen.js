import React, { useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import Body from '../components/Base/Body'
import Item from '../components/Base/Item'
import ItemMore from '../components/Home/ItemMore'
import useFetch from '../hooks/useFetch'
import Spinner from '../components/List/Spinner'
import Logo from '../components/Logo'

function HomeScreen({ navigation, route }) {
  const { data, status } = useFetch('articles')
  const items = data?.items ?? []

  useEffect(() => {
    const routeName = route.state?.routes[route.state.index]?.name ?? 'Home'
    const isHome = routeName === 'Home'

    navigation.setOptions({
      headerLeft: () => (isHome ? <Logo /> : null),
      title: ''
    })
  }, [])

  return (
    <Body style={styles.container}>
      {status === 'loading' && <Spinner />}
      <FlatList
        data={[...items, { id: '🔑', isLast: true }].map(item => ({
          key: item.id,
          ...item
        }))}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) =>
          !item.isLast ? (
            <Item
              {...{ item }}
              isCard
              onPress={() =>
                navigation.navigate('Detail', {
                  id: item.id
                })
              }
            />
          ) : (
            <ItemMore
              style={{ opacity: items.length > 0 ? 1 : 0 }}
              onPress={() =>
                navigation.navigate('List', {
                  title: '인기 매물',
                  endpoint: 'articles?is_hot=1'
                })
              }
            />
          )
        }
      />
    </Body>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  },
  columnWrapper: {
    marginBottom: 20,
    marginLeft: -10
  }
})

export default HomeScreen

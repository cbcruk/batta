import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import Body from 'components/Base/Body'
import Item from 'components/Base/Item'
import ItemMore from 'components/Home/ItemMore'

class HomeScreen extends React.Component {
  state = {
    items: []
  }

  componentDidMount() {
    this.fetchItems()
  }

  fetchItems = async () => {
    const response = await fetch('http://localhost:3000/api/articles')
    const data = await response.json()

    this.setState(() => ({
      items: data.items
    }))
  }

  render() {
    const { navigation } = this.props
    const { items } = this.state

    return (
      <Body style={styles.container}>
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

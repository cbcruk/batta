import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'

const SearchResult = ({ title, items, id, renderItem }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={items}
        keyExtractor={item => item[id]}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        style={styles.list}
      />
    </View>
  </TouchableWithoutFeedback>
)

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  list: {
    marginTop: 10
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#eee'
  }
})

export default SearchResult

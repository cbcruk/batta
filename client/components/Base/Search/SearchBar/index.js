import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import Icon from 'components/Base/Icon'

const SearchBar = props => (
  <View style={styles.container}>
    <View style={styles.search}>
      <Icon name="search" size={16} color="#8e8e93" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        clearButtonMode="while-editing"
        {...props}
      />
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    height: 66,
    padding: 16,
    backgroundColor: 'rgba(248, 248, 248, 0.82)',
    alignItems: 'center'
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 36,
    paddingHorizontal: 8,
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: 'rgba(142, 142, 147, 0.24)'
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: 'rgba(142, 142, 147, 1)'
  },
  icon: {
    marginTop: -1
  }
})

export default SearchBar

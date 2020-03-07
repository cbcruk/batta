import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { styles } from '../../Base/Search/SearchResult'
import Icon from '../../Base/Icon'

function Item({ children, ...rest }) {
  return (
    <TouchableOpacity {...rest}>
      <View style={styles.item}>
        <Text>{children}</Text>
        <Icon name="arrow-forward" color="#d1d1d6" />
      </View>
    </TouchableOpacity>
  )
}

export default Item

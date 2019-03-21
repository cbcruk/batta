import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import Icon from 'components/Base/Icon'
import { styles } from 'components/Base/Search/SearchResult'

const Item = ({ children, ...rest }) => (
  <TouchableOpacity {...rest}>
    <View style={styles.item}>
      <Text>{children}</Text>
      <Icon name="arrow-forward" color="#d1d1d6" />
    </View>
  </TouchableOpacity>
)

export default Item

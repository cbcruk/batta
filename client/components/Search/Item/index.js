import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import Colors from 'constants/Colors'
import Icon from 'components/Base/Icon'
import { styles } from 'components/Base/Search/SearchResult'

const Item = ({ item, ...rest }) => (
  <TouchableOpacity {...rest}>
    <View style={styles.item}>
      <Text>{item.text}</Text>
      <View>
        {item.is_up && <Icon name="arrow-round-up" color="#e03131" />}
        {item.is_down && <Icon name="arrow-round-down" color="#186ec0" />}
        {!item.rank && <Icon name="remove" color={Colors.tintColor} />}
      </View>
    </View>
  </TouchableOpacity>
)

export default Item

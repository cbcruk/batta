import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import Icon from 'components/Base/Icon'
import { cardStyles } from 'components/Base/Item'

const ItemMore = ({ style, ...rest }) => (
  <TouchableOpacity style={{ ...styles.container, ...style }} {...rest}>
    <Icon name="add" size={26} />
    <Text style={styles.text}>당근마켓</Text>
    <Text style={styles.text}>인기 매물</Text>
    <Text style={styles.text}>더 보기</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    ...cardStyles.container,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    marginTop: 2,
    fontSize: 13
  }
})

export default ItemMore

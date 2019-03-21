import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Icon from 'components/Base/Icon'

const icons = ['heart-empty', 'mail', 'chatboxes']

const Footer = ({ counts }) => {
  return (
    <View style={styles.container}>
      {counts
        .filter(n => Boolean(n))
        .map((count, index) => (
          <View key={index} style={styles.count}>
            <Icon
              name={icons[index]}
              size={styles.text.fontSize + 1}
              color={styles.text.color}
            />
            <Text style={styles.text}>{count}</Text>
          </View>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto'
  },
  count: {
    flexDirection: 'row',
    marginRight: 5
  },
  text: {
    marginLeft: 1,
    fontSize: 11,
    color: '#adb5bd'
  }
})

export default Footer

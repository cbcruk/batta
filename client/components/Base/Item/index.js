import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import Colors from 'constants/Colors'
import Price from './Price'
import Footer from './Footer'

const Item = ({ index, item, isCard, ...rest }) => {
  const styles = isCard ? cardStyles : mediaStyles

  return (
    <TouchableOpacity
      {...rest}
      style={[styles.container, index === 0 && styles.firstItem]}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.body}>
        <Text
          numberOfLines={isCard ? 1 : 2}
          ellipsizeMode="tail"
          style={[styles.text, styles.title]}
        >
          {item.title}
        </Text>
        <Text style={[styles.text, styles.region]}>{item.region}</Text>
        <Price price={item.price} style={[styles.text, styles.price]} />
        {!isCard ? (
          <Footer counts={[item.interest, item.reply, item.chat]} />
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 3 / 2,
    resizeMode: 'cover'
  },
  text: {
    fontSize: 12,
    lineHeight: 14
  },
  title: {
    fontWeight: 'bold'
  },
  region: {
    marginTop: 3,
    color: 'rgba(0, 0, 0, 0.45)'
  },
  price: {
    marginTop: 5,
    fontWeight: 'bold',
    color: Colors.tintColor
  },
  footer: {
    flex: 1,
    flexDirection: 'row'
  }
})

export const cardStyles = StyleSheet.flatten([
  styles,
  {
    container: {
      flex: 1,
      width: '50%',
      borderRadius: 5,
      marginLeft: 10
    },
    body: {
      marginTop: 10
    }
  }
])

const mediaStyles = StyleSheet.flatten([
  styles,
  {
    container: {
      flex: 1,
      flexDirection: 'row',
      height: 110,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderTopWidth: 1,
      borderColor: '#e0e0e0'
    },
    image: {
      aspectRatio: 1,
      width: 90
    },
    body: {
      flex: 1,
      marginLeft: 10
    },
    firstItem: {
      height: 100,
      paddingTop: 0,
      paddingBottom: 10,
      borderTopWidth: 0
    }
  }
])

export default Item

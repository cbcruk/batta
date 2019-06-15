import React from 'react'
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native'

class DetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('id', 0),
    headerBackTitle: null
  })

  state = {
    item: {
      user: {
        name: ''
      }
    }
  }

  componentDidMount() {
    this.fetchItem()
  }

  fetchItem = async () => {
    const id = this.props.navigation.getParam('id', 0)
    const response = await fetch(`http://localhost:3000/api/article?id=${id}`)
    const item = await response.json()

    this.setState(() => ({
      item
    }))
  }

  render() {
    const { navigation } = this.props
    const { item } = this.state

    return (
      <ScrollView style={styles.container}>
        <View>
          <Button
            title={item.user.name}
            onPress={() =>
              navigation.navigate('User', {
                title: item.user.name,
                id: item.user.id
              })
            }
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
})

export default DetailScreen

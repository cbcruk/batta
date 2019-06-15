import React from 'react'
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native'

class UserScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title')
  })

  state = {
    user: {}
  }

  componentDidMount() {
    this.fetchUser()
  }

  fetchUser = async () => {
    const id = this.props.navigation.getParam('id', 0)
    const response = await fetch(`http://localhost:3000/api/users?id=${id}`)
    const user = await response.json()

    this.setState(() => ({
      user
    }))
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View />
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

export default UserScreen

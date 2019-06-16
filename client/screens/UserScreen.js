import React from 'react'
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native'
import fetchData from 'plugins/fetch'

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
    const user = await fetchData(`users?id=${id}`)

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

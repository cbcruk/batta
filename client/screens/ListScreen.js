import React from 'react'
import { VirtualizedList } from 'react-native'
import Body from 'components/Base/Body'
import Item from 'components/Base/Item'
import Spinner from 'components/List/Spinner'

class ListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title')
  })

  state = {
    fetched: false,
    items: []
  }

  componentDidMount() {
    this.fetchItems()
  }

  fetchItems = async () => {
    this.setState({
      fetched: true
    })

    const endpoint = this.props.navigation.getParam('endpoint')
    const response = await fetch(`http://localhost:3000/api/${endpoint}`)
    const data = await response.json()

    this.setState(() => ({
      items: data.items,
      fetched: false
    }))
  }

  render() {
    const { navigation } = this.props
    const { items, fetched } = this.state

    return (
      <Body>
        <Spinner animating={fetched} />
        <VirtualizedList
          getItem={(data, index) => data[index]}
          getItemCount={data => data.length}
          data={items.map(item => ({ key: item.id, ...item }))}
          renderItem={({ item, index }) => (
            <Item
              {...{ index, item }}
              onPress={() =>
                navigation.navigate('Detail', {
                  id: item.id
                })
              }
            />
          )}
        />
      </Body>
    )
  }
}

export default ListScreen

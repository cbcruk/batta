import React from 'react'
import { VirtualizedList } from 'react-native'
import fetchData from 'plugins/fetch'
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
    const { items } = await fetchData(endpoint)

    this.setState(() => ({
      items,
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

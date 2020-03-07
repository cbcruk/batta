import React from 'react'
import { StyleSheet } from 'react-native'
import fetchData from '../plugins/fetch'
import Body from '../components/Base/Body'
import SearchBar from '../components/Base/Search/SearchBar'
import SearchResult from '../components/Base/Search/SearchResult'
import Item from '../components/Region/Item'

class RegionScreen extends React.Component {
  state = {
    status: 'idle',
    keyword: '',
    search: [],
    close: []
  }

  componentDidMount() {
    this.findAddressByGeo()
  }

  handleStatus = status => {
    this.setState({
      status
    })
  }

  getPosition = () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      )
    })

  getAddress = async params => {
    this.handleStatus('loading')

    try {
      const data = await fetchData(`address?${params}`)

      this.handleStatus('success')

      return data.items
    } catch (error) {
      this.handleStatus('failure')
    }
  }

  findAddressByGeo = async () => {
    const {
      coords: { longitude, latitude }
    } = await this.getPosition()
    const close = await this.getAddress(`x=${longitude}&y=${latitude}`)

    this.setState({
      close,
      search: ''
    })
  }

  findAddressByKeyword = async keyword => {
    const search = await this.getAddressByKeyword(`keyword=${keyword}`)

    this.setState({
      search
    })
  }

  handleNavigate = ({ region1, region2, region3 }) => {
    const { navigation } = this.props

    navigation.navigate('List', {
      title: `${region3}`,
      endpoint: `region?region1=${region1}&region2=${region2}&region3=${region3}`
    })
  }

  render() {
    const { close, search, keyword } = this.state
    const hasSearchResult = Boolean(search.length) && Boolean(keyword)
    const title = hasSearchResult ? `${keyword} 검색 결과` : '근처 동네'
    const items = hasSearchResult ? search : close

    return (
      <Body style={styles.container}>
        <SearchBar
          onChangeText={keyword => this.setState({ keyword })}
          onSubmitEditing={() => this.findAddressByKeyword(keyword)}
        />
        <SearchResult
          title={title}
          items={items}
          id="code"
          renderItem={({ item }) => (
            <Item onPress={() => this.handleNavigate(item)}>
              {item.address_name}
            </Item>
          )}
        />
      </Body>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0
  }
})

export default RegionScreen

import React from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'
import fetchData from 'plugins/fetch'
import Body from 'components/Base/Body'
import SearchBar from 'components/Base/Search/SearchBar'
import SearchResult from 'components/Base/Search/SearchResult'
import Item from 'components/Search/Item'

const KEYWORD_FIELD_KEY = 'KEYWORD_FIELD_KEY'

class SearchScreen extends React.Component {
  state = {
    keyword: '',
    keywords: [],
    searches: []
  }

  componentDidMount() {
    this.fetchKeywords()
    this.retrieveData()
  }

  storeData = async keyword => {
    try {
      const stored = await AsyncStorage.getItem(KEYWORD_FIELD_KEY)
      const merged = new Set([keyword, ...(stored ? JSON.parse(stored) : [])])
      const keywords = JSON.stringify([...merged].slice(0, 10))

      AsyncStorage.setItem(KEYWORD_FIELD_KEY, keywords)
    } catch (error) {
      console.error(error)
    }
  }

  retrieveData = async () => {
    try {
      const searches = await AsyncStorage.getItem(KEYWORD_FIELD_KEY)

      if (searches) {
        this.setState({
          searches: JSON.parse(searches)
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  handleNavigate = keyword => {
    const { navigation } = this.props

    navigation.navigate('List', {
      title: `${keyword}`,
      endpoint: `search?keyword=${keyword}`
    })

    this.storeData(keyword)
  }

  fetchKeywords = async () => {
    const { keywords } = await fetchData('top_keywords')

    this.setState(() => ({
      keywords
    }))
  }

  render() {
    const { keywords, keyword } = this.state

    return (
      <Body style={styles.container}>
        <SearchBar
          onChangeText={keyword => this.setState({ keyword })}
          onClearText={() => this.setState({ keyword: '' })}
          onSubmitEditing={() => this.handleNavigate(keyword)}
        />

        <SearchResult
          title="오늘의 인기 검색어"
          items={keywords}
          id="text"
          renderItem={({ item }) => (
            <Item item={item} onPress={() => this.handleNavigate(item.text)} />
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

export default SearchScreen

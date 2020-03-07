import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'
import Body from '../components/Base/Body'
import SearchBar from '../components/Base/Search/SearchBar'
import SearchResult from '../components/Base/Search/SearchResult'
import Item from '../components/Search/Item'
import useFetch from '../hooks/useFetch'

const KEYWORD_FIELD_KEY = 'KEYWORD_FIELD_KEY'

function useRetrieveData() {
  const [searches, setSearches] = useState([])

  useEffect(() => {
    AsyncStorage.getItem(KEYWORD_FIELD_KEY)
      .then(searches => setSearches(JSON.parse(searches)))
      .catch(e => console.error(e))
  }, [])

  return searches
}

function SearchScreen({ navigation }) {
  const [keyword, setKeyword] = useState('')
  const { data } = useFetch('top_keywords')
  const handleNavigate = useCallback(async keyword => {
    navigation.navigate('List', {
      title: `${keyword}`,
      endpoint: `search?keyword=${keyword}`
    })

    const stored = await AsyncStorage.getItem(KEYWORD_FIELD_KEY)
    const merged = new Set([keyword, ...(stored ? JSON.parse(stored) : [])])
    const keywords = JSON.stringify([...merged].slice(0, 10))

    AsyncStorage.setItem(KEYWORD_FIELD_KEY, keywords)
  }, [])

  useRetrieveData()

  return (
    <Body style={styles.container}>
      <SearchBar
        onChangeText={keyword => setKeyword(keyword)}
        onSubmitEditing={() => handleNavigate(keyword)}
      />

      <SearchResult
        title="오늘의 인기 검색어"
        items={data?.keywords ?? []}
        id="text"
        renderItem={({ item }) => (
          <Item item={item} onPress={() => handleNavigate(item.text)} />
        )}
      />
    </Body>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0
  }
})

export default SearchScreen

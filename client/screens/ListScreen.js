import React from 'react'
import { VirtualizedList } from 'react-native'
import Body from '../components/Base/Body'
import Item from '../components/Base/Item'
import Spinner from '../components/List/Spinner'
import useOptions from '../hooks/useOptions'
import useFetch from '../hooks/useFetch'

function ListScreen({ navigation, route }) {
  const { title, endpoint } = route?.params ?? {}
  const { data, status } = useFetch(endpoint)
  const items = data?.items ?? []

  useOptions({ title })

  return (
    <Body>
      {status === 'loading' && <Spinner animating />}
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

export default ListScreen

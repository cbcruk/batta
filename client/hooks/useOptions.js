import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

function useOptions({ title }) {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      title
    })
  }, [title])
}

export default useOptions

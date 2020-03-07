import { SearchScreen } from '../screens'
import StackNavigator from './StackNavigator'

function SearchStackNavigator() {
  return StackNavigator(SearchScreen, {
    header: () => null
  })
}

export default SearchStackNavigator

import { RegionScreen } from '../screens'
import StackNavigator from './StackNavigator'

function RegionStackNavigator() {
  return StackNavigator(RegionScreen, {
    header: () => null
  })
}

export default RegionStackNavigator

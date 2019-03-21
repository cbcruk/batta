import { createStackNavigator } from 'react-navigation'
import { ListScreen, DetailScreen, UserScreen, ModalScreen } from 'screens'
import TabNav from './TabNav'

const StacksOverTabs = createStackNavigator(
  {
    Root: createStackNavigator({
      Home: TabNav,
      Detail: DetailScreen,
      List: ListScreen,
      User: UserScreen
    }),
    Modal: ModalScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    },
    mode: 'modal'
  }
)

export default StacksOverTabs

import React from 'react'
import {
  createBottomTabNavigator,
  getActiveChildNavigationOptions
} from 'react-navigation'
import { HomeScreen, SearchScreen, RegionScreen } from 'screens'
import Colors from 'constants/Colors'
import Icon from 'components/Base/Icon'
import Logo from './Logo'

const TabNav = createBottomTabNavigator(
  {
    HomeTab: {
      screen: HomeScreen,
      path: '/',
      navigationOptions: {
        headerLeft: <Logo />,
        headerBackTitle: null,
        tabBarLabel: '홈',
        tabBarIcon: ({ tintColor: color }) => (
          <Icon {...{ color, size: 26, name: 'home' }} />
        )
      }
    },
    SearchTab: {
      screen: SearchScreen,
      path: '/search',
      navigationOptions: {
        title: '검색',
        tabBarLabel: '검색',
        tabBarIcon: ({ tintColor: color }) => (
          <Icon {...{ color, size: 26, name: 'search' }} />
        )
      }
    },
    RegionTab: {
      screen: RegionScreen,
      path: '/region',
      navigationOptions: {
        title: '우리 동네 찾기',
        tabBarLabel: '동네',
        tabBarIcon: ({ tintColor: color }) => (
          <Icon {...{ color, size: 26, name: 'navigate' }} />
        )
      }
    }
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected
    },
    animationEnabled: false,
    swipeEnabled: false
  }
)

TabNav.navigationOptions = ({ navigation, screenProps }) => {
  const childOptions = getActiveChildNavigationOptions(navigation, screenProps)
  return {
    ...childOptions
  }
}

export default TabNav

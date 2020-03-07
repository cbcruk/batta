import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from '../components/Base/Icon'
import Colors from '../constants/Colors'
import MainStackNavigator from './MainStackNavigator'
import SearchStackNavigator from './SearchStackNavigator'
import RegionStackNavigator from './RegionStackNavigator'

const BottomTab = createBottomTabNavigator()

function BottomTabNavigator({ navigation, route }) {
  return (
    <BottomTab.Navigator
      initialRouteName="Region"
      tabBarOptions={{
        activeTintColor: Colors.tabIconSelected
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          tabBarLabel: '홈',
          tabBarIcon({ color }) {
            return <Icon {...{ color, size: 26, name: 'home' }} />
          }
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          title: '검색',
          tabBarLabel: '검색',
          tabBarIcon({ color }) {
            return <Icon {...{ color, size: 26, name: 'search' }} />
          }
        }}
      />
      <BottomTab.Screen
        name="Region"
        component={RegionStackNavigator}
        options={{
          title: '우리 동네 찾기',
          tabBarLabel: '동네',
          tabBarIcon({ color }) {
            return <Icon {...{ color, size: 26, name: 'navigate' }} />
          }
        }}
      />
    </BottomTab.Navigator>
  )
}

export default BottomTabNavigator

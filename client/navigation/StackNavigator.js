import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ListScreen, DetailScreen, UserScreen } from '../screens'

const Stack = createStackNavigator()

function StackNavigator(HomeScreen, options) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={options} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="User" component={UserScreen} />
    </Stack.Navigator>
  )
}

export default StackNavigator

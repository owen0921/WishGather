import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelfareMatchingPage from '../../screens/Welfare/WelfareMatchingPage';
import WelfareMatchingDetails from '../../screens/Welfare/WelfareMatchingDetails';


const Stack = createNativeStackNavigator();

function WelfareMatchingStack(){
  return (
    <Stack.Navigator
        screenOptions = {{ headerShown: false }}
        initialRouteName='WelfareMatchingPage'
    >
      <Stack.Screen
        name = 'WelfareMatchingPage'
        component = { WelfareMatchingPage }
        options = {{ headerShown: false }}
      />
      <Stack.Screen 
        name="WelfareMatchingDetails" 
        component={WelfareMatchingDetails} 
        options = {{ headerShown: false }} 
      /> 
     
    </Stack.Navigator>
  )
}

export default WelfareMatchingStack;
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelfareTransportPage from '../../screens/Welfare/WelfareTransportPage';
import TransportDetail from '../../screens/Welfare/TransportDetail';



const Stack = createNativeStackNavigator();

function  WelfareTransportStack(){
  return (
    <Stack.Navigator
        screenOption = {{ headerShown: false }}
        initialRouteName='WelfareTransportPage'
    >
      <Stack.Screen
        name = 'WelfareTransportPage'
        component = { WelfareTransportPage }
        options = {{ headerShown: false }}
      />
      <Stack.Screen
        name = 'TransportDetail'
        component = { TransportDetail }
        options = {{ headerShown: false }}
      />
     
    </Stack.Navigator>
  )
}

export default WelfareTransportStack;
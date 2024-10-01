import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelfareUserPage  from '../../screens/Welfare/WelfareUserPage';
import ProfileManagement from '../../screens/Common/ProfileManagement';
import OfferingPreference from '../../screens/Welfare/OfferingPreference';

const Stack = createNativeStackNavigator();

function WelfareUserStack(){
  return (
    <Stack.Navigator
        screenOption = {{ headerShown: false }}
        initialRouteName='WelfareUserPage'
    >
       <Stack.Screen
        name = 'WelfareUserPage'
        component = { WelfareUserPage }
        options = {{ headerShown: false }}
      />
      <Stack.Screen
        name = 'ProfileManagement'
        component = { ProfileManagement }
        options = {{ headerShown: false }}
      />
      <Stack.Screen
        name = 'OfferingPreference'
        component = { OfferingPreference }
        options = {{ headerShown: false }}
      /> 
      
    </Stack.Navigator>
  )
}

export default WelfareUserStack;
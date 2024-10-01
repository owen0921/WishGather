import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserPage  from '../../screens/Common/UserPage';
import TemplesByOffering from '../../screens/Believer/TemplesByOffering';
import OrderConfirmationPage from '../../screens/Believer/OrderConfirmationPage';
import OrderSuccess from '../../screens/Believer/OrderSuccess';
import OrderHistoryPage from '../../screens/Believer/OrderHistoryPage';
import SavedTemples from '../../screens/Believer/SavedTemples';
import ProfileManagement from '../../screens/Common/ProfileManagement';


const Stack = createNativeStackNavigator();

function BelieverUserStack(){
  return (
    <Stack.Navigator
        screenOption = {{ headerShown: false }}
        initialRouteName='UserPage'
    >
       <Stack.Screen
        name = 'UserPage'
        component = { UserPage }
        options = {{ headerShown: false }}
      /> 
      <Stack.Screen
        name = 'OrderConfirmationPage'
        component = { OrderConfirmationPage }
        options = {{ headerShown: false }}
      />
      <Stack.Screen
        name = 'OrderSuccess'
        component = { OrderSuccess }
        options = {{ headerShown: false }}
      />
      <Stack.Screen
        name = 'OrderHistoryPage'
        component = { OrderHistoryPage }
        options = {{ headerShown: false }}
      />
      <Stack.Screen
        name = 'SavedTemples'
        component = { SavedTemples }
        options = {{ headerShown: false }}
      />
      <Stack.Screen
        name = 'ProfileManagement'
        component = { ProfileManagement }
        options = {{ headerShown: false }}
      />
      
    </Stack.Navigator>
  )
}

export default BelieverUserStack;
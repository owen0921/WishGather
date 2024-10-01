import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserPage  from '../../screens/Common/UserPage';
import CartPage from '../../screens/Believer/CartPage';
import OrderConfirmationPage from '../../screens/Believer/OrderConfirmationPage';
import OrderSuccess from '../../screens/Believer/OrderSuccess';
import OrderHistoryPage from '../../screens/Believer/OrderHistoryPage';
import SavedTemples from '../../screens/Believer/SavedTemples';
import ProfileManagement from '../../screens/Believer/ProfileManagement';


const Stack = createNativeStackNavigator();

function BelieverCartStack(){
  return (
    <Stack.Navigator
        screenOption = {{ headerShown: false }}
        initialRouteName='CartPage'
    >
       <Stack.Screen
        name = 'CartPage'
        component = { CartPage }
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
      
    </Stack.Navigator>
  )
}

export default BelieverCartStack;
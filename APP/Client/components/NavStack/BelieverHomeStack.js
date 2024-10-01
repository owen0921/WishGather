import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BelieverHomePage from '../../screens/Believer/BelieverHomePage';
import OfferingsByTemple from '../../screens/Believer/OfferingsByTemple';
import TemplesByOffering from '../../screens/Believer/TemplesByOffering';
import OrderConfirmationPage from '../../screens/Believer/OrderConfirmationPage';
import OrderSuccess from '../../screens/Believer/OrderSuccess';
import ProductInfoPage from '../../screens/Believer/ProductInfoPage';
import Chatbox from '../../screens/Believer/Chatbot'


const Stack = createNativeStackNavigator();

function BelieverHomeStack(){
  return (
    <Stack.Navigator
        screenOption = {{ headerShown: false }}
        initialRouteName='BelieverHomePage'
    >
      <Stack.Screen
        name = 'BelieverHomePage'
        component = { BelieverHomePage }
        options = {{ headerShown: false }}
      />
      <Stack.Screen
        name = 'TemplesByOffering'
        component = { TemplesByOffering }
        options = {{ headerShown: false }}
      />
      <Stack.Screen
        name = 'OfferingsByTemple'
        component = { OfferingsByTemple }
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
        name = 'ProductInfoPage'
        component = { ProductInfoPage }
        options = {{ headerShown: false }}
      />
            <Stack.Screen
        name = 'Chatbox'
        component = { Chatbox }
        options = {{ headerShown: false }}
      />
      
    </Stack.Navigator>
  )
}

export default BelieverHomeStack;
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelfareHomePage from '../../screens/Welfare/WelfareHomePage';
import WelfareMatchingPage from '../../screens/Welfare/WelfareMatchingPage';
import WelfareTransportPage from '../../screens/Welfare/WelfareTransportPage';
import TransportDetail from '../../screens/Welfare/TransportDetail';

const Stack = createNativeStackNavigator();

function WelfareHomeStack(){
    return (
        <Stack.Navigator
            screenOption = {{ headerShown: false }}
            initialRouteName='WelfareHomePage'
        >
            <Stack.Screen 
                name="WelfareHomePage"
                component={WelfareHomePage}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="WelfareMatchingPage"
                component={WelfareMatchingPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="WelfareTransportPage"
                component={WelfareTransportPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='TransportDetail'
                component={TransportDetail}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

export default WelfareHomeStack;
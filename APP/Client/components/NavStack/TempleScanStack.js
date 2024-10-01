import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import FoodScanningPage from '../../screens/Temple/FoodScanningPage';
import ScanResult from '../../screens/Temple/ScanResult';
import EditTempleInfoPage from '../../screens/Temple/EditTempleInfoPage';
import MatchingPage from '../../screens/Temple/MatchingPage';

import OfferingHome from '../../screens/Temple/OfferingHome';
import OfferingUpload from '../../screens/Temple/OfferingUpload';
import OfferingEditPage from '../../screens/Temple/OfferingEditPage';
import EditOfferingInfoPage from '../../screens/Temple/EditOfferingInfoPage';
import SubmissionResult from '../../screens/Temple/SubmissionResult';


const Stack = createNativeStackNavigator();

function TempleScanStack(){
    return (
        <Stack.Navigator
        screenOption = {{ headerShown: false }}
        initialRouteName='OfferingHome'
    >
            
            <Stack.Screen 
                name="OfferingHome"
                component={OfferingHome}
                options={{ headerShown: false }}
            />

            <Stack.Screen 
                name="OfferingUpload"
                component={OfferingUpload}
                options={{ headerShown: false }}
            />

            <Stack.Screen 
                name="OfferingEditPage"
                component={OfferingEditPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="EditOfferingInfoPage"
                component={EditOfferingInfoPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="FoodScanningPage"
                component={FoodScanningPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="ScanResult"
                component={ScanResult}
                options={{ headerShown: false }}
            />

            <Stack.Screen 
                name="SubmissionResult"
                component={SubmissionResult}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}

export default TempleScanStack;
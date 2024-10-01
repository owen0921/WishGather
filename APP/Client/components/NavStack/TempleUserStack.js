import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TempleUserPage  from '../../screens/Temple/TempleUserPage';
import OfferingEditPage from '../../screens/Temple/OfferingEditPage';
import EditOfferingInfoPage from '../../screens/Temple/EditOfferingInfoPage';
import OfferingUpload from '../../screens/Temple/OfferingUpload';
import ProfileManagement from '../../screens/Common/ProfileManagement';


const Stack = createNativeStackNavigator();

function TempleUserStack(){
  return (
    <Stack.Navigator
        screenOption = {{ headerShown: false }}
        initialRouteName='TempleUserPage'
    >
       <Stack.Screen
        name = 'TempleUserPage'
        component = { TempleUserPage }
        options = {{ headerShown: false }}
      />
      <Stack.Screen
        name = 'ProfileManagement'
        component = { ProfileManagement }
        options = {{ headerShown: false }}
      /> 
      <Stack.Screen
        name = 'OfferingEditPage'
        component = { OfferingEditPage }
        options = {{ headerShown: false }}
      />
      <Stack.Screen
        name = 'OfferingUpload'
        component = { OfferingUpload }
        options = {{ headerShown: false }}
      />
      <Stack.Screen
        name = 'EditOfferingInfoPage'
        component = { EditOfferingInfoPage }
        options = {{ headerShown: false }}
      />
      
      
    </Stack.Navigator>
  )
}

export default TempleUserStack;
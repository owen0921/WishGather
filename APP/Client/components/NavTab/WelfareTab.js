import React from 'react'
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import WelfareUserStack from '../NavStack/WelfareUserStack';
import WelfareHomeStack from '../NavStack/WelfareHomeStack';
import WelfareTransportStack from '../NavStack/WelfareTransportStack';

import WelfareMatchingStack from '../NavStack/WelfareMatchingStack';


const Tab = createMaterialBottomTabNavigator();
function WelfareTab(){
    return (
      <Tab.Navigator
        initialRouteName='WelfareHomeStack'
        activeColor="#FF7A00"
        inactiveColor="#CCCCCC"
        shifting={true}
        barStyle={{ backgroundColor: 'white', opacity: '0.8'}}
      >
          <Tab.Screen   
            name="主頁" 
            component={WelfareHomeStack}
            options={{
              tabBarLabel: '主頁',
              tabBarIcon: ({color}) => (<MaterialCommunityIcons name="home-variant" color={color} size={26} />)
            }}
          />
          <Tab.Screen 
            name="媒合" 
            component={WelfareMatchingStack} 
            options={{
              tabBarLabel: '媒合',
              tabBarIcon: ({color}) => (<MaterialCommunityIcons name="puzzle" color={color} size={26}/>)
            }}
          />
          <Tab.Screen 
            name="運送" 
            component={WelfareTransportStack}
            options={{
              tabBarLabel: '運送',
              tabBarIcon: ({color}) => (<MaterialCommunityIcons name="truck" color={color} size={26}/>)
            }} 
          />
         
          <Tab.Screen
            name="使用者"
            component={WelfareUserStack}
            options={{
              tabBarLabel: '使用者',
              tabBarIcon: ({color}) => (<MaterialCommunityIcons  name="account" color={color} size={26}/>)
            }}
          />

      </Tab.Navigator>
    )
}

export default WelfareTab;


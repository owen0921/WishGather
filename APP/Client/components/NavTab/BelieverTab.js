import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BelieverHomeStack from '../NavStack/BelieverHomeStack';
import BelieverOfferingStack from '../NavStack/BelieverOfferingStack';
import BelieverUserStack from '../NavStack/BelieverUserStack';
import CartPage from '../../screens/Believer/CartPage';
import UserPage from '../../screens/Common/UserPage';
import BelieverLeftoverPage from '../../screens/Believer/BelieverLeftoverPage';




const Tab = createMaterialBottomTabNavigator();
function BelieverTab(){
    return (
        <Tab.Navigator
            initialRouteName='BelieverHomeStack'
            activeColor="#FF7A00"
            inactiveColor="#CCCCCC"
            shifting={true}
            barStyle={{ backgroundColor: 'white', opacity: '0.8'}}
        >
          <Tab.Screen   
            name = "宮廟資訊" 
            component = { BelieverHomeStack }
            options = {{
              tabBarLabel: '宮廟資訊',
              tabBarIcon: ({color}) => (<MaterialCommunityIcons name="home-variant" color={color} size={26} />)
            }}
          />
           <Tab.Screen   
            name = "訂購" 
            component = { BelieverOfferingStack }
            options={{
              tabBarLabel: '訂購',
              tabBarIcon: ({color}) => (<MaterialCommunityIcons name="store-search" color={color} size={26} />)
            }}
          />
          <Tab.Screen
            name = "剩食地圖"
            component = { BelieverLeftoverPage }
            options={{
                tabBarLabel: '剩食地圖',
                tabBarIcon: ({color}) => (<MaterialCommunityIcons name="map-search" color={color} size={26} />)
              }}
          />
          <Tab.Screen
            name = "購物車"
            component = { CartPage }
            options={{
                tabBarLabel: '購物車',
                tabBarIcon: ({color}) => (<MaterialCommunityIcons name="cart" color={color} size={26} />)
              }}
          />
          <Tab.Screen
            name = "使用者"
            component = { BelieverUserStack }
            options={{
                tabBarLabel: '使用者',
                tabBarIcon: ({color}) => (<MaterialCommunityIcons name="account" color={color} size={26} />)
              }}
          />
        </Tab.Navigator>
    )
}

export default BelieverTab;
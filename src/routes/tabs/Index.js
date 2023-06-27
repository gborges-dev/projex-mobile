import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import Perfil from '../../pages/perfil';
import Dashboard from '../../pages/dashboard';

const Tab = createBottomTabNavigator();

export default function Routes () {
    return (
        <Tab.Navigator activeColor="#38a69d">
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ headerShown: false,
                           tabBarIcon: ({color, size}) => (
                           <MaterialCommunityIcons name="view-dashboard" color={color} size={size} />
                           ) 
                        }}
            />

            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{ headerShown: false, 
                           tabBarIcon: ({color, size}) => (
                           <MaterialCommunityIcons name="account" color={color} size={size} />
                           ) }}
            />
        </Tab.Navigator>
    )
}
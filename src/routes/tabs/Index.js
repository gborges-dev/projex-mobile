import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Perfil from '../../pages/perfil';
import Dashboard from '../../pages/dashboard';

const Tab = createBottomTabNavigator();

export default function Routes () {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ headerShown: false }}
            />

            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    )
}
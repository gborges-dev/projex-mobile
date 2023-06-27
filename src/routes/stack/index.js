import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../../pages/signin';
import Routes from '../tabs/Index';
import Welcome from '../../pages/welcome/index';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Welcome} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={SignIn} options={{ headerShown: false }}/>
        <Stack.Screen name="Tabs" component={Routes} options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
};

export default MyStack;
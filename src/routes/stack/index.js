import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../../pages/welcome';
import SignIn from '../../pages/signin';
import Routes from '../tabs/Index';


const Stack = createStackNavigator();

const MyStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Welcome} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={SignIn} options={{ headerShown: false }}/>
        <Stack.Screen name="Tabs" component={Routes} options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
};

export default MyStack;
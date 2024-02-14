import * as React from 'react';
import { Button, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../component/Home/Home';
import Calender from '../component/Calendar/Calender';
import Statistics from '../component/Statistics/Statistics';
import Setting from '../component/Setting/Setting';
import Login from '../component/Login/Login';

const Stack = createStackNavigator();

const AppRouter = () => {
    return (
            <Stack.Navigator
            screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Calender" component={Calender} />
                <Stack.Screen name="Statistics" component={Statistics} />
                <Stack.Screen name="Setting" component={Setting} />
            </Stack.Navigator>
    );
}
export default AppRouter;
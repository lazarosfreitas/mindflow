import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthChoiceScreen from './auth/AuthChoiceScreen';
import LoginScreen from './auth/LoginScreen';
import RegisterScreen from './auth/RegisterScreen';
import MindflowScreen from './mindflowScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthChoice" component={AuthChoiceScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Mindflow" component={MindflowScreen} />
    </Stack.Navigator>
  );
}

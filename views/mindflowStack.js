import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MindflowScreen from './mindflowScreen';
import NovaTarefa from './NovaTarefa';

const Stack = createNativeStackNavigator();

export default function MindflowStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MindflowHome" component={MindflowScreen} />
      <Stack.Screen name="NovaTarefa" component={NovaTarefa} />
    </Stack.Navigator>
  );
}
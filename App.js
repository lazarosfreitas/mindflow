import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IntroScreen from './views/introScreen/introScreen';
import AuthNavigator from './views/AuthNavigator';
import { UserProvider } from './views/context/UserConstext';
import MindflowScreen from './views/mindflowScreen';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <UserProvider>
      <View style={styles.container}>
        {loading ? (<IntroScreen/>):(
          <NavigationContainer>
            <AuthNavigator />       
          </NavigationContainer>)}
      </View>
    </UserProvider>
    // <View style={styles.container}>
    //   {loading ? (
    //     <IntroScreen /> 
    //   ):(<MindflowScreen />)}
      
    //   <Text style={{ color: 'black', fontSize: 18 }}>oi</Text>
    // </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: 'white', }, });
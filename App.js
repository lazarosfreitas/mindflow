import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { useCallback, useState, useEffect } from 'react'; 
import * as SplashScreen from 'expo-splash-screen';

import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold
} from '@expo-google-fonts/fredoka';
import IntroScreen from './views/introScreen/introScreen'; 

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold
  });

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />

      {showIntro ? (

        <IntroScreen />
      ) : (
        <View style={styles.mainContent}>
          <Text style={styles.text}>Bem vindo ao mindflow!</Text>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 20
  }
});
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IntroScreen from './views/introScreen/introScreen';
import MindflowScreen from './views/mindflowScreen';

export default function App() {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? <IntroScreen /> : <MindflowScreen />}
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: 'white', }, });
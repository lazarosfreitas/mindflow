import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import logo from '../../assets/logoBranco1.png';
import { colors } from '../../src/components/styles/colors';

const IntroScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logoImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default IntroScreen;

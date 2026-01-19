import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function AuthChoiceScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Bem Vindo ao MindFlow!</Text>
       <Image 
        source={require('../../assets/bem_vindo.jpeg')}
        style={styles.image}
       ></Image>
        <TouchableOpacity
            style={[styles.button, styles.outline]}
            onPress={() => navigation.navigate('Register')}
         >
            <Text style={styles.outlineText}>Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
        >
            <Text style={styles.buttonText}>Fazer Login</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'cursive'
  },
  title: {
    textAlign: 'center',
    fontSize: 36,
    color: '#0a8b8b',
    marginBottom: 40,
    fontFamily: 'Nunito, Varela Round, Arial Rounded MT Bold, sans-serif'

  
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 40,
  },
  button: {
    width: '70%',
    padding: 15,
    backgroundColor: '#00d8c4',
    borderRadius: 30,
    marginBottom: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: '#008077',
    fontWeight: 'bold',
  },
  outline: {
    backgroundColor: '#00d8c4',
    borderWidth: 2,
    borderColor: '#fff',
  },
  outlineText: {
    color: '#008077',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

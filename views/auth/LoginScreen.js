import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../context/UserConstext';

export default function LoginScreen({ navigation }) {
    const { loginUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const success = loginUser(email, password);

        if (success) {
            navigation.replace('Mindflow');
        } else {
            Alert.alert('Erro', 'Email ou senha inválidos');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color="#333" />
            </TouchableOpacity>

            <Image
                source={require('../../assets/tartaruga.jpeg')}
                style={styles.image}

            />

            <TextInput
                placeholder="Email"
                style={styles.input}
                autoCapitalize="none"
                onChangeText={setEmail}
            />

            <TextInput
                placeholder="Senha"
                style={styles.input}
                secureTextEntry
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
        backgroundColor: '#fff',

    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        padding: 12,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#00d8c4',
        padding: 15,
        borderRadius: 30,
        marginBottom: 200,
    },
    buttonText: { color: '#008077', textAlign: 'center', fontWeight: 'bold' },
    image: {
        resizeMode: 'center',
        width: 250,
        height: 250,
        marginTop: 50,
        marginBottom: 0,
        alignSelf: 'center',
        paddingBottom: 1,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 10,
    },
});

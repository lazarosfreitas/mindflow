import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function NovaTarefa({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      <ImageBackground
        source={require('../../assets/fonts/background.png')}
        style={styles.background}
        resizeMode="cover"
      >

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="x" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveText}>Salvar</Text>
          </TouchableOpacity>
        </View>

        {/* Conteúdo */}
        <View style={styles.content}>

          {/* Ícone */}
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="calendar-check"
              size={42}
              color="#FFFFFF"
            />
          </View>

          {/* Input */}
          <TextInput
            placeholder="Nova tarefa..."
            placeholderTextColor="#B5B5B5"
            style={styles.input}
          />

          {/* Opções */}
          <View style={styles.optionsRow}>
            <OptionButton icon="calendar" text="Hoje, 04 de novembro de 2025" />
          </View>

          <View style={styles.optionsRow}>
            <OptionButton icon="bell-off" text="Sem lembrete" />
            <OptionButton icon="droplet" text="Cor" />
          </View>

          <View style={styles.optionsRow}>
            <OptionButton icon="clock" text="4 pomodoros" />
            <OptionButton icon="star" text="Ícone" />
          </View>

        </View>

      </ImageBackground>
    </SafeAreaView>
  );
}

function OptionButton({ icon, text }) {
  return (
    <TouchableOpacity style={styles.optionButton}>
      <Feather name={icon} size={18} color="#000" />
      <Text style={styles.optionText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },

  saveButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },

  saveText: {
    fontSize: 14,
  },

  content: {
    alignItems: 'center',
    paddingTop: 32,
  },

  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#2F6DF6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  input: {
    fontSize: 22,
    color: '#000',
    marginBottom: 24,
  },

  optionsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },

  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginHorizontal: 6,
  },

  optionText: {
    marginLeft: 8,
    fontSize: 14,
  },
});
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal } from 'react-native';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function NovaTarefa({ navigation }) {
  // 🔹 BASE FUNDAMENTAL (ESTADOS)
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [iconModalVisible, setIconModalVisible] = useState(false);
  const [timeModalVisible, setTimeModalVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState('Hoje, 04 de novembro de 2025');
  const [selectedIcon, setSelectedIcon] = useState('calendar-check');
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/background.png')}
        style={{ flex: 1 }}
        resizeMode="cover"
      >

        {/* SAFE AREA APENAS NO HEADER */}
        <SafeAreaView edges={['top']} style={styles.safeHeader}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="x" size={24} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* CONTEÚDO NORMAL */}
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
            placeholderTextColor="#2a2a2a"
            style={styles.input}
          />

          {/* Opções */}
          <View style={styles.optionsRow}>
            <OptionButton
              icon="calendar"
              text={selectedDate}
              onPress={() => setDateModalVisible(true)}
            />
          </View>

          <View style={styles.optionsRow}>
            <OptionButton
            icon="bell-off"
            text="Sem lembrete"
            onPress={() => setTimeModalVisible(true)}
          />

            <OptionButton icon="droplet" text="Cor" />
          </View>

          <View style={styles.optionsRow}>
            <OptionButton icon="clock" text="4 pomodoros" />
            <OptionButton
              icon="star"
              text="Ícone"
              onPress={() => setIconModalVisible(true)}
            />
          </View>
        </View>

        
  {/* ===== MODAL DATA ===== */}
  <Modal visible={dateModalVisible} transparent animationType="slide">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Selecionar data</Text>

        <TouchableOpacity
          onPress={() => {
            setSelectedDate('05 de novembro de 2025');
            setDateModalVisible(false);
          }}
        >
          <Text>05 de novembro de 2025</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>

  {/* ===== MODAL ÍCONE ===== */}
  <Modal visible={iconModalVisible} transparent animationType="slide">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Selecionar ícone</Text>

        <View style={{ flexDirection: 'row', gap: 20 }}>
          {['heart', 'cart', 'book', 'star'].map(icon => (
            <TouchableOpacity
              key={icon}
              onPress={() => {
                setSelectedIcon(icon);
                setIconModalVisible(false);
              }}
            >
              <MaterialCommunityIcons name={icon} size={40} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  </Modal>

  {/* ===== MODAL HORA ===== */}
  <Modal visible={timeModalVisible} transparent animationType="slide">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Adicionar lembrete</Text>

        <TouchableOpacity
          onPress={() => {
            setSelectedTime('12:00');
            setTimeModalVisible(false);
          }}
        >
          <Text style={{ fontSize: 32 }}>12:00</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>

      </ImageBackground>
    </View>
  );
}

function OptionButton({ icon, text, onPress }) {
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

  safeHeader: {
  backgroundColor: '#FFFFFF',
},

header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingTop: 10,
  paddingBottom: 12,
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
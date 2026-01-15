import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Audio } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FontAwesome } from '@expo/vector-icons';


import { useFonts } from 'expo-font';


const config = {
  Pomodoro: 3,
  "Short Break": 5,
  "Long Break": 6,
};

const TOTAL_POMODOROS = 4;

const gifs = {
  dormindo: require('../assets/quelonioDormindo.gif'),
  comendo: require('../assets/quelonioComendo.gif'),
  dançando: require('../assets/quelonioDancando.gif'),
};

export default function MindflowScreen() {
  const [time, setTime] = useState(config.Pomodoro);
  const [mode, setMode] = useState("Pomodoro");
  const [isActive, setIsActive] = useState(false);
  const [cycle, setCycle] = useState(1);
  const [finished, setFinished] = useState(false);

  const [pomodoroSound, setPomodoroSound] = useState(null);
  const [breakSound, setBreakSound] = useState(null);

  const screenWidth = Dimensions.get('window').width;

  const [fontsLoaded] = useFonts({
    Fredoka: require('../assets/fonts/Fredoka-Regular.ttf'),
    FredokaExpandedLight: require('../assets/fonts/Fredoka-Expanded-Light.ttf'),
    FredokaBold: require('../assets/fonts/Fredoka-Bold.ttf'),
  });


  useEffect(() => {
    (async () => {
      const { sound: bell } = await Audio.Sound.createAsync(
        require('../assets/bell.mp3')
      );
      const { sound: churchBell } = await Audio.Sound.createAsync(
        require('../assets/church-bell.mp3')
      );

      setPomodoroSound(bell);
      setBreakSound(churchBell);
    })();

    return () => {
      pomodoroSound?.unloadAsync();
      breakSound?.unloadAsync();
    };
  }, []);

  const playPomodoroSound = async () => {
    if (pomodoroSound) {
      await pomodoroSound.replayAsync();
    }
  };

  const playBreakSound = async () => {
    if (breakSound) {
      await breakSound.replayAsync();
    }
  };

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);
    }

    if (time === 0 && isActive) {
      handleEnd();
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const reniciar = () => {
  setFinished(false);
  setCycle(1);
  setIsActive(false);
  setMode("Pomodoro");
  setTime(config.Pomodoro);
};


  const handleEnd = () => {
  setIsActive(false);

  if (mode === "Pomodoro") {
    if (cycle < TOTAL_POMODOROS) {
      // Pausa curta nos 3 primeiros ciclos
      setMode("Short Break");
      setTime(config["Short Break"]);
    } else {
      // Pausa longa no 4º ciclo
      setMode("Long Break");
      setTime(config["Long Break"]);
    }
    playBreakSound();
  } else {
    // Depois da pausa, volta para Pomodoro
    if (mode === "Long Break") {
      // terminou o ciclo completo
      setFinished(true);
    } else {
      setCycle(prev => prev + 1);
    }
    setMode("Pomodoro");
    setTime(config.Pomodoro);
    playPomodoroSound();
  }
};


  const startTimer = () => {
    setIsActive(true);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getGif = () => {
    if (finished) return gifs.dançando;
    if (!isActive) return gifs.dormindo;
    if (mode === "Pomodoro") return gifs.comendo;
    return gifs.dormindo;
  };

  const fill = finished ? 100 : (time / config[mode]) * 100;

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.container}
      resizeMode="cover"
    >

      {fontsLoaded ? (
        <SafeAreaView style={styles.container}>
        <Text style={[styles.timerText, {
          fontSize: 64,
          color: 'white',
          fontFamily: 'FredokaBold'
        }]}>
          {finished ? 'Concluído!' : formatTime(time)}
        </Text>

        <AnimatedCircularProgress
          size={screenWidth * 0.7}
          width={12}
          fill={fill}
          tintColor="#FF6347"
          backgroundColor="#ffffff30"
          rotation={0}
          lineCap="round"
        >
          {() => (
            <Image
              source={getGif()}
              style={{ width: (screenWidth * 0.7), height: (screenWidth * 0.7), borderRadius: 75 }}
            />
          )}
        </AnimatedCircularProgress>

        {/* Botão - som */}
        {!finished && (
          <TouchableOpacity
            style={[[styles.button, isActive ? styles.pause : styles.play]]}
            onPress={() => (isActive ? setIsActive(false) : startTimer())}
          >
            <Text style={[styles.buttonText, { fontFamily: "FredokaBold" }]}>
              {isActive ? 'Pausar' : 'Iniciar'}
            </Text>
          </TouchableOpacity>
        )}
      
        {finished && (
          <TouchableOpacity
            style={[[styles.button, isActive ? styles.pause : styles.play]]}
            onPress={() =>  reniciar()}
          >
            <Text style={[styles.buttonText, { fontFamily: "FredokaBold" }]}>
              Reniciar
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.fixedButton}>
          <TouchableOpacity style={styles.buttonIconContent}>
            <FontAwesome name="sticky-note" size={55} color="white" />
            <Text style={{color:"white"}}>Tarefas</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>) :
        (
          <View style={styles.container}>
            <Text>Carregando fontes...</Text>
          </View>)}


    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: "relative"
  },
  timerText: {
    color: '#fff',
    fontSize: 64,
  },
  button: {
    marginTop: 30,
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#3F3F3F',
  },
  play: {
    backgroundColor: '#4AE74F',
    color: "white"
  },
  pause: {
    backgroundColor: '#FF5050',
    color: "white"
  },
  buttonText: {
    fontSize: 20,
    color: '#3F3F3F',
    textAlign: 'center',
  },
  fixedButton: {
    position: 'absolute',
    alignItems: 'center',
    top: "95%",
  },
  buttonIconContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    backgroundColor: "#6AC7E1",
    color: '#FFF',
    padding: 12,
    borderRadius: 16

  },

});

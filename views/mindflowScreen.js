import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Audio } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';

const config = {
  Pomodoro: 15,
  "Short Break": 30,
  "Long Break": 10,
};

const TOTAL_POMODOROS = 4;

const gifs = {
  dormindo: require('../assets/quelonioDormindo.gif'),
  comendo: require('../assets/quelonioComendo.gif'),
  dançando: require('../assets/quelonioDancando.gif'),
};

export default function PomodoroScreen() {
  const [time, setTime] = useState(config.Pomodoro);
  const [mode, setMode] = useState("Pomodoro");
  const [isActive, setIsActive] = useState(false);
  const [cycle, setCycle] = useState(1);
  const [finished, setFinished] = useState(false);

  const [pomodoroSound, setPomodoroSound] = useState(null);
  const [breakSound, setBreakSound] = useState(null);

  const screenWidth = Dimensions.get('window').width;

  // 🔊 Carrega os sons
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

  // ⏱️ Timer
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

  const handleEnd = () => {
    setIsActive(false);

    // 🔚 Último Pomodoro → DANÇANDO 🎉
    if (mode === "Pomodoro" && cycle === TOTAL_POMODOROS) {
      setFinished(true);
      playBreakSound();
      return;
    }

    if (mode === "Pomodoro") {
      setMode(cycle === TOTAL_POMODOROS - 1 ? "Long Break" : "Short Break");
      setTime(
        cycle === TOTAL_POMODOROS - 1
          ? config["Long Break"]
          : config["Short Break"]
      );
      playBreakSound();
    } else {
      setMode("Pomodoro");
      setTime(config.Pomodoro);
      setCycle(prev => prev + 1);
      playPomodoroSound();
    }
  };

  const startTimer = () => {
    setIsActive(true);

    if (mode === "Pomodoro") {
      playPomodoroSound();
    } else {
      playBreakSound();
    }
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
      <SafeAreaView style={styles.container}>
        <Text style={styles.timerText}>
          {finished ? '🎉 Concluído!' : formatTime(time)}
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

        {!finished && (
          <TouchableOpacity
            style={[styles.button, isActive ? styles.pause : styles.play]}
            onPress={() => (isActive ? setIsActive(false) : startTimer())}
          >
            <Text style={styles.buttonText}>
              {isActive ? 'Pausar' : 'Iniciar'}
            </Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  timerText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

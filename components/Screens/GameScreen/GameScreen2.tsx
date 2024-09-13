import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { Gyroscope } from 'expo-sensors';

const { width, height } = Dimensions.get('window');
const ballRadius = 30;

const BalanceGame: React.FC = () => {
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [ballPosition, setBallPosition] = useState({ x: width / 2 - ballRadius, y: height / 2 - ballRadius });
  const [subscription, setSubscription] = useState<any>(null);

  const [fontsLoaded] = useFonts({
    'Minecraftia': require('../../../assets/fonts/Minecraft.ttf'),
  });

  useEffect(() => {
    if (!fontsLoaded) return; // Espera a fonte carregar
    subscribe();
    return () => unsubscribe(); // Desinscreve-se do giroscópio ao desmontar
  }, [fontsLoaded]);

  const subscribe = () => {
    setSubscription(
      Gyroscope.addListener((data) => {
        setGyroscopeData(data);
      })
    );
    Gyroscope.setUpdateInterval(16); // Atualização a cada ~60fps
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    const { x, y } = gyroscopeData;

    const ballSpeed = 5;

    setBallPosition((prevPosition) => {
      let newX = prevPosition.x - x * ballSpeed;
      let newY = prevPosition.y + y * ballSpeed;

      if (newX < 0) newX = 0;
      if (newX > width - ballRadius * 2) newX = width - ballRadius * 2;
      if (newY < 0) newY = 0;
      if (newY > height - ballRadius * 2) newY = height - ballRadius * 2;

      if (newX === 0 || newX === width - ballRadius * 2 || newY === 0 || newY === height - ballRadius * 2) {
        Alert.alert('Game Over', 'You lost your balance!');
        resetGame();
      }

      return { x: newX, y: newY };
    });
  }, [gyroscopeData]);

  const resetGame = () => {
    setBallPosition({ x: width / 2 - ballRadius, y: height / 2 - ballRadius });
  };

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.background}
      >
        <Text style={styles.title}>Game: Balance the Ball</Text>
        <Text style={styles.instructions}>Keep the ball inside the screen by gently moving your phone!</Text>
        <View style={[styles.ball, { left: ballPosition.x, top: ballPosition.y }]} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    fontFamily: 'Minecraftia',
  },
  instructions: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Minecraftia',
  },
  ball: {
    width: ballRadius * 2,
    height: ballRadius * 2,
    borderRadius: ballRadius,
    backgroundColor: '#FF4500',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#fff',
  },
});

export default BalanceGame;

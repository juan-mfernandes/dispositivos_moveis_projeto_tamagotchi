import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { Gyroscope } from 'expo-sensors';
import { router, useRouter } from "expo-router";

const { width, height } = Dimensions.get('window');
const BALL_RADIUS = 20;
const OBSTACLE_SIZE = 40;
const OBSTACLE_SPEED = 10;
const INITIAL_OBSTACLE_INTERVAL = 200;

const DodgeGame: React.FC = () => {
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [ballPosition, setBallPosition] = useState({ x: width / 2 - BALL_RADIUS, y: height - 100 });
  const [subscription, setSubscription] = useState<any>(null);
  const [obstacles, setObstacles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const obstacleId = useRef(0);
  const obstacleInterval = useRef<NodeJS.Timeout | null>(null);
  const [isGameOver, setIsGameOver] = useState(false); 

  const [fontsLoaded] = useFonts({
    'Minecraftia': require('../../../assets/fonts/Minecraft.ttf'),
  });

  useEffect(() => {
    if (!fontsLoaded) return;
    subscribeGyroscope();
    startObstacleGeneration();
    return () => {
      unsubscribeGyroscope();
      stopObstacleGeneration();
    };
  }, [fontsLoaded]);

  useEffect(() => {
    const { x, y } = gyroscopeData;
    const ballSpeed = 5;

    if (!isGameOver) { 
      setBallPosition((prevPosition) => {
        let newX = prevPosition.x + y * ballSpeed; 
        let newY = prevPosition.y + x * ballSpeed; 

      
        if (newX < 0) newX = 0;
        if (newX > width - BALL_RADIUS * 2) newX = width - BALL_RADIUS * 2;
        if (newY < 0) newY = 0;
        if (newY > height - BALL_RADIUS * 2) newY = height - BALL_RADIUS * 2;

        return { x: newX, y: newY };
      });
    }
  }, [gyroscopeData, isGameOver]);

  useEffect(() => {
    // Atualizar a posição dos obstáculos
    const interval = setInterval(() => {
      if (!isGameOver) {
        setObstacles((prevObstacles) =>
          prevObstacles
            .map((obstacle) => ({ ...obstacle, y: obstacle.y + OBSTACLE_SPEED }))
            .filter((obstacle) => obstacle.y < height)
        );
      }
    }, 16); 

    return () => clearInterval(interval);
  }, [isGameOver]);

  useEffect(() => {
    // Verificar colisões
    if (!isGameOver) {
      obstacles.forEach((obstacle) => {
        if (
          ballPosition.x < obstacle.x + OBSTACLE_SIZE &&
          ballPosition.x + BALL_RADIUS * 2 > obstacle.x &&
          ballPosition.y < obstacle.y + OBSTACLE_SIZE &&
          ballPosition.y + BALL_RADIUS * 2 > obstacle.y
        ) {
          Alert.alert('Game Over', 'Você colidiu com um obstáculo!', [
            { text: 'OK', onPress: () => resetGame() },
            { text: 'Back', onPress: () => router.push('/Inside') }
          ]);
          
          setIsGameOver(true); // Define o estado de jogo como terminado
        }
      });
    }
  }, [obstacles, ballPosition, isGameOver]);

  const subscribeGyroscope = () => {
    const sub = Gyroscope.addListener((data) => {
      setGyroscopeData(data);
    });
    Gyroscope.setUpdateInterval(16); 
    setSubscription(sub);
  };

  const unsubscribeGyroscope = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };

  const startObstacleGeneration = () => {
    obstacleInterval.current = setInterval(() => {
      const newObstacle = {
        id: obstacleId.current++,
        x: Math.random() * (width - OBSTACLE_SIZE),
        y: -OBSTACLE_SIZE,
      };
      setObstacles((prev) => [...prev, newObstacle]);
    }, INITIAL_OBSTACLE_INTERVAL);
  };

  const stopObstacleGeneration = () => {
    if (obstacleInterval.current) {
      clearInterval(obstacleInterval.current);
    }
  };

  const resetGame = () => {
    setBallPosition({ x: width / 2 - BALL_RADIUS, y: height - 100 });
    setObstacles([]);
    obstacleId.current = 0;
    setIsGameOver(false); // Resetar o estado do jogo
    stopObstacleGeneration();
    startObstacleGeneration();
  };

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.background}
      >
        <Text style={styles.title}>Jogo: Desvie dos Obstáculos</Text>
        <Text style={styles.instructions}>Use o movimento do seu celular para desviar!</Text>
        {/* Obstáculos */}
        {obstacles.map((obstacle) => (
          <View
            key={obstacle.id}
            style={[
              styles.obstacle,
              {
                left: obstacle.x,
                top: obstacle.y,
              },
            ]}
          />
        ))}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 50,
    marginLeft: 20,
    fontFamily: 'Minecraftia',
  },
  instructions: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 20,
    fontFamily: 'Minecraftia',
  },
  ball: {
    width: BALL_RADIUS * 2,
    height: BALL_RADIUS * 2,
    borderRadius: BALL_RADIUS,
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
  obstacle: {
    width: OBSTACLE_SIZE,
    height: OBSTACLE_SIZE,
    backgroundColor: '#00FF00',
    position: 'absolute',
    borderRadius: 5,
  },
});

export default DodgeGame;

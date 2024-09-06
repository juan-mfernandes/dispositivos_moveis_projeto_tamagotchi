import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from './ProgressBar';

const petData: Record<string, any> = {
  '1': require('@/assets/images/rabbitTamagotchi.png'),
  '2': require('@/assets/images/mouseTamagotchi.png'),
  '3': require('@/assets/images/monkeyTamagotchi.png'),
  '4': require('@/assets/images/catTamagochi.png'),
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'CRITICAL':
      return '#ff0000';
    case 'VERY SAD':
      return '#ff4500';
    case 'SAD':
      return '#ff8c00';
    case 'OK':
      return '#ffff00';
    case 'GOOD':
      return '#32cd32';
    case 'VERY GOOD':
      return '#00ff00';
    default:
      return '#FFFFFF';
  }
};

const PetDetailScreen = () => {
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [hunger, setHunger] = useState(100);
  const [sleep, setSleep] = useState(100);
  const [fun, setFun] = useState(100);
  const [status, setStatus] = useState('GOOD');

  useEffect(() => {
    const loadSelectedPet = async () => {
      try {
        const petId = await AsyncStorage.getItem('@selectedPet');
        if (petId) {
          setSelectedPet(petId);
        }
      } catch (error) {
        console.log('Erro ao carregar o pet:', error);
      }
    };
    loadSelectedPet();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHunger((prev) => Math.max(prev - 1, 0));
      setSleep((prev) => Math.max(prev - 1, 0));
      setFun((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const total = hunger + sleep + fun;

    if (total === 0) {
      setStatus('DEAD');
    } else if (total <= 50) {
      setStatus('CRITICAL');
    } else if (total <= 100) {
      setStatus('VERY SAD');
    } else if (total <= 150) {
      setStatus('SAD');
    } else if (total <= 200) {
      setStatus('OK');
    } else if (total <= 250) {
      setStatus('GOOD');
    } else {
      setStatus('VERY GOOD');
    }
  }, [hunger, sleep, fun]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hello, Tamagotchi</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statRow}>
          <Text style={styles.statsText}>Hunger</Text>
          <Text style={styles.percentageText}>{hunger}%</Text>
        </View>
        <ProgressBar progress={hunger / 100} color="#ff0000" />

        <View style={styles.statRow}>
          <Text style={styles.statsText}>Sleep</Text>
          <Text style={styles.percentageText}>{sleep}%</Text>
        </View>
        <ProgressBar progress={sleep / 100} color="#0000FF" />

        <View style={styles.statRow}>
          <Text style={styles.statsText}>Fun</Text>
          <Text style={styles.percentageText}>{fun}%</Text>
        </View>
        <ProgressBar progress={fun / 100} color="#00ff00" />

        <Text style={[styles.statsText, { color: getStatusColor(status) }]}>
          Status: {status}
        </Text>
      </View>

      {selectedPet && (
        <Image source={petData[selectedPet]} style={styles.petImage} />
      )}

      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton}>
          <Image source={require('@/assets/images/sleepButton.png')} style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Image source={require('@/assets/images/toPlayButton.png')} style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Image source={require('@/assets/images/toFeedButton.png')} style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E67C07',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontFamily: 'Minecraft',
    fontSize: 24,
    color: '#FFFFFF',
    marginVertical: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#E62E07',
    borderRadius: 5,
    elevation: 5,
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  statsContainer: {
    width: '90%',
    backgroundColor: '#E62E07',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 5,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  statsText: {
    color: '#FFFFFF',
    fontFamily: 'Minecraft',
    fontSize: 18,
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  percentageText: {
    color: '#FFFFFF',
    fontFamily: 'Minecraft',
    fontSize: 18,
  },
  petImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 50,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#B91D1D',
    width: '100%',
    padding: 16,
    borderRadius: 5,
    position: 'absolute',
    bottom: 0,
    elevation: 5,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default PetDetailScreen;

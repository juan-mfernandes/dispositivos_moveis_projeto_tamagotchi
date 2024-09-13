import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, Alert, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';


const petData: Record<string, any> = {
  '1': require('@/assets/images/rabbitTamagotchi.png'),
  '2': require('@/assets/images/mouseTamagotchi.png'),
  '3': require('@/assets/images/monkeyTamagotchi.png'),
  '4': require('@/assets/images/catTamagochi.png'),
};

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const router = useRouter();

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

  const confirmName = () => {
    if (name.trim() === '') {
      Alert.alert('Error', 'Please enter a name for your Tamagotchi.');
      return;
    }
    router.push('/petDetailsScreen');
  };

  const [fontsLoaded] = useFonts({
    PixelFont: require('@/assets/fonts/Minecraft.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose a name</Text>
      
      {selectedPet && (
        <Image source={petData[selectedPet]} style={styles.image} resizeMode="contain" />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
      </View>

      <KeyboardAvoidingView
        style={styles.buttonContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity style={styles.button} onPress={confirmName}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8C00',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 30,
    color: '#FFF',
    paddingHorizontal: 30,
    paddingVertical: 20,
    paddingBottom: 10,
    backgroundColor: '#FF4500',
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 3,
    textAlign: 'center',
    fontFamily: 'PixelFont',
  },
  image: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    width: '85%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    fontFamily: 'PixelFont',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FF4500',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 3,
    alignItems: 'center',
    width: '60%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 22,
    fontFamily: 'PixelFont',
  },
});

export default RegisterScreen;

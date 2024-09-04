import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

const RegisterScreen = () => {
  const [name, setName] = useState('');

  const [fontsLoaded] = useFonts({
    'PixelFont': require('@/assets/fonts/Minecraft.ttf'), 
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose a name</Text>
      <Image source={require('@/assets/images/mouseTamagotchi.gif')} style={styles.image} resizeMode="contain" />
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8C00',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 30,
    color: '#FFF',
    paddingHorizontal: 30,
    paddingVertical: 20,
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
  input: {
    width: '85%',
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
    fontWeight: 'bold',
    fontSize: 28,
    fontFamily: 'PixelFont',
  },
});

export default RegisterScreen;

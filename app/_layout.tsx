import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SQLiteProvider } from 'expo-sqlite';
import { initDatabase } from '@/dataBase/db.connection';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Minecraft: require('../assets/fonts/Minecraft.ttf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SQLiteProvider databaseName='tamagotchi.db' onInit={initDatabase}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="petDetailsScreen" options={{ headerShown: false }} />
          <Stack.Screen name="gameScreen" options={{ headerShown: false }} />
          <Stack.Screen name="gameScreen1" options={{ headerShown: false }} />
          <Stack.Screen name="gameScreen2" options={{ headerShown: false }} />
          <Stack.Screen name="chooseScreen" options={{ headerShown: false }} />
          <Stack.Screen name="registerScreen" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </SQLiteProvider>
  );
  
  
}

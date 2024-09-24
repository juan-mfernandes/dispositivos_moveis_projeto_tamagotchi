import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ProgressProvider } from '@/components/Progresso';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
      <ProgressProvider>
        <Stack>
          <Stack.Screen name="petDetailsScreen" options={{ headerShown: false }} />
          <Stack.Screen name="gameScreen" options={{ headerShown: false }} />
          <Stack.Screen name="gameScreen1" options={{ headerShown: false }} />
          <Stack.Screen name="gameScreen2" options={{ headerShown: false }} />
        </Stack>
     </ProgressProvider>
  );
  
  
}

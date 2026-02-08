import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="juridico/legal" options={{ headerShown: false }} />
        <Stack.Screen name="emergencia/sos" options={{ headerShown: false }} />
        <Stack.Screen name="educacao/educacao" options={{ headerShown: false }} />
        <Stack.Screen name="servicos/servicos" options={{ headerShown: false }} />
        <Stack.Screen name="evidencia/cofre" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

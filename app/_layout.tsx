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
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name='turismo/turismo' options={{ headerShown: false }}/>
        <Stack.Screen name='agendamento/agendar' options={{ headerShown: false }}/>
        <Stack.Screen name='transporte/transporte' options={{ headerShown: false }}/>
        <Stack.Screen name='educacao/educacao' options={{ headerShown: false }}/>
        <Stack.Screen name='saude/saude' options={{ headerShown: false }}/>
        <Stack.Screen name='assistencia/assistencia' options={{ headerShown: false }}/>
        <Stack.Screen name='tributos/tributos' options={{ headerShown: false }}/>
        <Stack.Screen name='universitario/universitario' options={{ headerShown: false }}/>
        <Stack.Screen name='juridico/juridico' options={{ headerShown: false }}/>
        <Stack.Screen name='maeatipica' options={{ headerShown: false }}/>
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

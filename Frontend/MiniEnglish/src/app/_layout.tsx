import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>// default black theme
    <ThemeProvider value={DefaultTheme}>
      <AnimatedSplashOverlay />

      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="situation/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name='section/[id]'
          options={{headerShown: false}}
        />
        <Stack.Screen name='phrase/[id]'
          options={{headerShown: false}}
        />
      </Stack>
    </ThemeProvider>
  );
}
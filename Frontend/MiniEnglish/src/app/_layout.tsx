import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { getAuthtoken } from '@/utils/authStorage';
import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router= useRouter();
  const segments= useSegments();
  const [checkingAuth, setCheckingAuth]=useState(true);


  useEffect(()=>{
    const checkAuth = async()=>{
      try{
        const token= await getAuthtoken();

        const currentGroup= segments[0];

        if(!token && currentGroup !== '(auth)'){
          router.replace('/login');
          return
        }

        if(token && currentGroup === '(auth)'){
          router.replace('/(tabs)');
        }
      }catch(error){
        console.error('Error checking auth:', error);
      }finally{
        setCheckingAuth(false)
      }
    }

    checkAuth();
  }, [segments])

  if(checkingAuth){
    return null;
  }
  // const colorScheme = useColorScheme();

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>// default black theme
    <ThemeProvider value={DefaultTheme}>
      <AnimatedSplashOverlay />

      <Stack>
        <Stack.Screen 
        name="(auth)/login"
        options={{headerShown: false}}
        />
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
        <Stack.Screen
          name="phrase-upgrade/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="voice-practice/[id]"
        options={{ headerShown: false }}
      />
      </Stack>
    </ThemeProvider>
  );
}
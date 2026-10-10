import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { use, useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { getCurrentUser } from '@/utils/authApi';
import { removeAuthToken } from '@/utils/authStorage';
import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router= useRouter();
  const segments= useSegments();
  const [checkingAuth, setCheckingAuth]=useState(true);


  useEffect(()=>{
    const checkAuth = async()=>{
      try{
        const currentGroup= segments[0];
        const user= await getCurrentUser();

        if(!user && currentGroup !== '(auth)'){
          router.replace('/login');
          return
        }

        if(user && currentGroup === '(auth)'){
          router.replace('/(tabs)');
        }
      }catch(error){
        console.error('Error checking auth:', error);
        // await removeAuthToken()
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
        name='(auth)/signup'
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
      <Stack.Screen
        name="profile/settings"
        options={{ headerShown: false }}
      />
      </Stack>
    </ThemeProvider>
  );
}
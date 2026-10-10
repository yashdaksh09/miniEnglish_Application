import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { Pressable, Text } from 'react-native';

import { useRouter } from 'expo-router';
import { removeAuthToken } from '@/utils/authStorage';

import HomeHeader from '@/components/home/HomeHeader';
import GreetingBanner from '@/components/home/GreetingBanner';
import Situations from '@/components/home/Situations';
import QuickSpokenTip from '@/components/home/QuickSpokenTip';
import HabitStreak from '@/components/home/HabitStreak';


export default function HomeScreen() {
  const router = useRouter();

async function handleLogout() {
  await removeAuthToken();
  router.replace('/login');
}
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor: '#F8F9FF' }}>

      <HomeHeader subtitle="Daily Routines" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 112,
        }}
      >
     
      <GreetingBanner />

      <Situations />
       <QuickSpokenTip />
       <HabitStreak />

       {/* <Pressable
  onPress={handleLogout}
  style={{
    marginTop: 20,
    marginBottom: 20,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#FFE0E8',
    alignItems: 'center',
  }}
>
  <Text
    style={{
      color: '#B52046',
      fontWeight: '600',
    }}
  >
    Temporary Logout
  </Text>
</Pressable> */}
      </ScrollView>
    </SafeAreaView>
  );
}
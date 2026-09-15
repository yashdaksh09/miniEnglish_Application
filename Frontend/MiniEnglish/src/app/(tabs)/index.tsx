import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

import HomeHeader from '@/components/home/HomeHeader';
import GreetingBanner from '@/components/home/GreetingBanner';
import Situations from '@/components/home/Situations';
import QuickSpokenTip from '@/components/home/QuickSpokenTip';
import HabitStreak from '@/components/home/HabitStreak';


export default function HomeScreen() {
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
      </ScrollView>
    </SafeAreaView>
  );
}
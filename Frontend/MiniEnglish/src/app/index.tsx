import * as Device from 'expo-device';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'expo-router/build/react-navigation';
import HomeHeader from '@/components/home/HomeHeader';
import Situations from '@/components/home/Situations';


export default function HomeScreen() {
  return (
    <SafeAreaView>
      
      <HomeHeader/>
      <Situations/>
      
<Text>
  Home
</Text>
    </SafeAreaView>
  )
}

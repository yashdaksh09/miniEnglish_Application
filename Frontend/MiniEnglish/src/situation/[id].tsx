import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function SituationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>Situation Screen</Text>
      <Text>ID: {id}</Text>
    </View>
  );
}
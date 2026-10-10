import { router } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type HomeHeaderProps = {
  subtitle: string;
};

export default function HomeHeader({ subtitle }: HomeHeaderProps) {
  return (
    <View style={styles.header}>
      {/* Left side */}
      <View style={styles.leftSection}>
        <View style={styles.logoPlaceholder}>
          <Text>🐰</Text>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.appName}>MiniEnglish</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      {/* Right side */}
      <View style={styles.rightSection}>
        <Text style={styles.notification}>🔔</Text>

        <View style={styles.profile}>
          <Pressable 
          accessibilityRole='button'
          accessibilityLabel='Open profile settings'
          onPress={()=> router.push('/profile/settings')}
          >
          <MaterialIcons name="person" size={22} style={{color: "white"}} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoPlaceholder: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  titleSection: {
    flexDirection: 'column',
  },

  appName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#B52046',
  },

  subtitle: {
    fontSize: 11,
    fontWeight: '500',
    color: '#594043',
  },

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  notification: {
    fontSize: 20,
  },

  profile: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE0E8',
  },

  profileText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B52046',
  },
});
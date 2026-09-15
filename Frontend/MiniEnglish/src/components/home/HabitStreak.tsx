import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function HabitStreak() {
  return (
    <View style={styles.container}>

      {/* Left Content */}
      <View style={styles.leftSection}>
        <View style={styles.iconCircle}>
          <MaterialIcons
            name="local-fire-department"
            size={22}
            color="#B52046"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            5 Days Habit Streak!
          </Text>

          <Text style={styles.subtitle}>
            Talked 15 mins yesterday
          </Text>
        </View>
      </View>


      {/* Streak Dots */}
      <View style={styles.dotsContainer}>
        <View style={styles.activeDot} />
        <View style={styles.activeDot} />
        <View style={styles.activeDot} />
        <View style={styles.activeDot} />
        <View style={styles.activeDot} />

        <View style={styles.inactiveDot} />
        <View style={styles.inactiveDot} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(222, 233, 252, 0.6)',
    padding: 16,
    borderRadius: 32,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },

  textContainer: {
    flexDirection: 'column',
  },

  title: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#121C2A',
  },

  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    color: '#594043',
  },

  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#33A968',
  },

  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9E3F6',
  },
});
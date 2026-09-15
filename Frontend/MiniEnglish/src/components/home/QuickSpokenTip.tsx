import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function QuickSpokenTip() {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <MaterialIcons
            name="bolt"
            size={20}
            color="#B52046"
          />

          <Text style={styles.title}>
            Quick Spoken Tip
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Today's Mini-Bite
          </Text>
        </View>
      </View>


      {/* Tip */}
      <View style={styles.tipContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.insteadText}>
            Instead of "Stop running"
          </Text>

          <Text
            style={styles.tipText}
            numberOfLines={1}
          >
            "Let's use gentle walking feet! ✨"
          </Text>
        </View>

        {/* Listen */}
        <Pressable
          accessibilityLabel="Listen"
          style={styles.listenButton}
        >
          <MaterialIcons
            name="volume-up"
            size={20}
            color="#FFFFFF"
          />
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 32,
    marginBottom: 20,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  title: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: '#121C2A',
  },

  badge: {
    backgroundColor: '#88F9B0',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    color: '#00522C',
  },

  tipContainer: {
    backgroundColor: '#EFF4FF',
    padding: 12,
    borderRadius: 16,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  textContainer: {
    flex: 1,
    minWidth: 0,
  },

  insteadText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    color: '#594043',
    marginBottom: 2,
  },

  tipText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#B52046',
  },

  listenButton: {
    width: 40,
    height: 40,
    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#FF5A79',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
});
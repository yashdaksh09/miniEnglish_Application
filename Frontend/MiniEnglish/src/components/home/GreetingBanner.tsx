import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function GreetingBanner() {
  return (
    <View style={styles.container}>
      {/* Left Text Section */}
      <View style={styles.textContainer}>
        <View style={styles.greetingRow}>
          <Text style={styles.greeting}>Good Morning, Mommy!</Text>
          <Text style={styles.sun}>☀️</Text>
        </View>

        <Text style={styles.description}>
          What are you doing with your child?
        </Text>
      </View>

      {/* Bunny Mommy Avatar */}
      <View style={styles.avatarWrapper}>
        <View style={styles.avatarBorder}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAadt30lMiUNHCpuTUTm4BfDCoIOPebHlooF1cMu0RL4DoatORkP04uaY03kNOkdaBkLxMV8i-f5xmJjfBWWsO16T4P4pJfunCfkD2nAniZtAUZuM7-Fd_-FYRgl4Ij_HS5aC7YhYX_S2FLqbBZavQF3vq9xF02wrZOmPoLthv0fP6lqQ2_P49OSHz2PR282mcE9VD-opMx2EZ-0U-p5tfBZfpX1LJRgi--uGlmR7AMI1UKUWMEumWL',
            }}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>

        {/* Favorite Badge */}
        <View style={styles.favoriteBadge}>
          <MaterialIcons
            name="favorite-border"
            size={13}
            color="#FFFFFF"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '#FFFFFF',
    borderRadius: 40,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  textContainer: {
    flex: 1,
    marginRight: 12,
  },

  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },

  greeting: {
    fontSize: 20,
    fontWeight: '800',
    color: '#121C2A',
    letterSpacing: -0.3,
  },

  sun: {
    fontSize: 18,
  },

  description: {
    fontSize: 14,
    fontWeight: '400',
    color: '#594043',
    lineHeight: 20,
  },

  avatarWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarBorder: {
    width: 58,
    height: 58,
    borderRadius: 29,
    padding: 3,
    backgroundColor: '#FFEBF0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 26,
  },

  favoriteBadge: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27B376',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
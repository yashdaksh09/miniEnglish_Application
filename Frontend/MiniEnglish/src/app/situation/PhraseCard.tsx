import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type PhraseCardProps = {
  english: string;
  hindi: string;
  onAudioPress: () => void;
  onFavoritePress: () => void;
};

export default function PhraseCard({
  english,
  hindi,
  onAudioPress,
  onFavoritePress,
}: PhraseCardProps) {
  return (
    <Pressable style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.englishText}>
          {english}
        </Text>

        <Text style={styles.hindiText}>
          {hindi}
        </Text>
      </View>

      <View style={styles.cardActions}>
        <Pressable
          style={styles.actionBtn}
          onPress={onAudioPress}
        >
          <MaterialIcons
            name="volume-up"
            size={19}
            color="#B52046"
          />
        </Pressable>

        <Pressable
          style={styles.actionBtn}
          onPress={onFavoritePress}
        >
          <MaterialIcons
            name="favorite-border"
            size={20}
            color="#8D7072"
          />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: 14,

    backgroundColor: '#FFFFFF',
    borderRadius: 16,

    shadowColor: '#E84A6F',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },

  textContainer: {
    flex: 1,
    minWidth: 0,
    paddingRight: 8,
  },

  englishText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#121C2A',
  },

  hindiText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    color: '#594043',
    marginTop: 2,
  },

  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },

  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,

    backgroundColor: '#E6EEFF',

    alignItems: 'center',
    justifyContent: 'center',
  },
});
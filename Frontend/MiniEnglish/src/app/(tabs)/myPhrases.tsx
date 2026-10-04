import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

import HomeHeader from '@/components/home/HomeHeader';

type SavedPhrase = {
  id: string;
  originalText: string;
  naturalEnglish: string;
  tone: string;
  category: string;
  alternatives: {
    english: string;
    description: string;
  }[];
  savedAt: string;
};

export default function MyPhrases() {
  const [savedPhrases, setSavedPhrases] = useState<SavedPhrase[]>([]);
  const [selectedCategory, setSelectedCategory]= useState('All');


  // filter logic
  const filteredPhrases =
  selectedCategory === 'All'
    ? savedPhrases
    : savedPhrases.filter(
        (phrase) => phrase.category === selectedCategory
      );

  useFocusEffect(
    useCallback(() => {
      const loadSavedPhrases = async () => {
        try {
          const data =
            await AsyncStorage.getItem('saved_phrases');

          const phrases: SavedPhrase[] =
            data ? JSON.parse(data) : [];

          setSavedPhrases(phrases);

          console.log(
            'My Phrases loaded:',
            phrases
          );
        } catch (error) {
          console.error(
            'Error loading saved phrases:',
            error
          );
        }
      };

      loadSavedPhrases();
    }, [])
  );

  async function removeSavedPhrase(phraseId: string) {
  try {
    const updatedPhrases = savedPhrases.filter(
      (phrase) => phrase.id !== phraseId
    );

    await AsyncStorage.setItem(
      'saved_phrases',
      JSON.stringify(updatedPhrases)
    );

    setSavedPhrases(updatedPhrases);
  } catch (error) {
    console.error(
      'Error removing saved phrase:',
      error
    );
  }
}

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top']}
    >
      <HomeHeader subtitle="My Phrases" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>
              My Phrases
            </Text>

            <Text style={styles.heart}>
              ❤️
            </Text>

            <View style={styles.countBadge}>
              <Text style={styles.countText}>
                {savedPhrases.length} Saved
              </Text>
            </View>
          </View>

          <Pressable style={styles.searchButton}>
            <MaterialIcons
              name="search"
              size={20}
              color="#594043"
            />
          </Pressable>
        </View>

        {/* Daily Motherhood Tip */}
        <View style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <MaterialIcons
              name="auto-stories"
              size={22}
              color="#B52046"
            />
          </View>

          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>
              Daily Motherhood Tip
            </Text>

            <Text
              style={styles.tipText}
              numberOfLines={1}
            >
              Repeat these natural phrases 3x with warm smiles!
            </Text>
          </View>
        </View>

        {/* Filters -- todo:--> will be change in future. convert to array all fileters value*/}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        >
          <Pressable style={selectedCategory=== 'All' ? styles.activeFilter : styles.filter}
          onPress={()=> setSelectedCategory('All')}
          >
            <Text style={
              selectedCategory === 'All'
              ? styles.activeFilter
              : styles.filter
            }>
              All ({savedPhrases.length})
            </Text>
          </Pressable>

          <Pressable style={
            selectedCategory=== 'Park'
            ? styles.activeFilter
            : styles.filter
          } 
            onPress={()=> setSelectedCategory('Park')}
          >
            <Text style={
              selectedCategory === 'Park'
              ? styles.activeFilterText
              : styles.filterText
            }>
              🌳Park
            </Text>
          </Pressable>

          <Pressable style={
            selectedCategory === 'Breakfast'
            ? styles.activeFilter
            : styles.filter
          }
          onPress={()=> setSelectedCategory('Breakfast')}
          >
            <Text style={
              selectedCategory === 'Breakfast'
              ? styles.activeFilterText
              : styles.filterText
            }>
              🥣 Breakfast
            </Text>
          </Pressable>

          <Pressable style={
            selectedCategory === 'Manners'
            ? styles.activeFilter
            : styles.filter
          }
          onPress={()=> setSelectedCategory('Manners')}
          >
            <Text style={
              selectedCategory === 'Manners'
              ? styles.activeFilterText
              : styles.filterText
            }>
              🧸 Manners
            </Text>
          </Pressable>

          <Pressable style={
            selectedCategory === 'Bedtime'
            ? styles.activeFilter
            : styles.filter
          }
          onPress={()=> setSelectedCategory('Bedtime')}
          >
            <Text style={
              selectedCategory === 'Bedtime'
              ? styles.activeFilterText
              : styles.filterText
            }>
              🌙 Bedtime
            </Text>
          </Pressable>
        </ScrollView>



        {/* Saved Phrase Cards */}
        <View style={styles.phrasesList}>
          {filteredPhrases.map((phrase) => (
            <View
              key={phrase.id}
              style={styles.phraseCard}
            >
              <View style={styles.phraseContent}>
                <Text
                  style={styles.phraseEnglish}
                  numberOfLines={1}
                >
                  {phrase.naturalEnglish}
                </Text>

                <View style={styles.phraseMeta}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>
                      {phrase.category}
                    </Text>
                  </View>

                  <Text
                    style={styles.originalText}
                    numberOfLines={1}
                  >
                    {phrase.originalText}
                  </Text>
                </View>
              </View>

              <View style={styles.phraseActions}>
                <Pressable
                  style={styles.audioButton}
                  onPress={() => {
                    Speech.stop()

                    Speech.speak(phrase.naturalEnglish,
                        {
                            language: 'en-USA',
                            rate: 0.85,
                            pitch: 1.0
                        }
                    )
                    console.log(
                      'Play phrase:',
                      phrase.naturalEnglish
                    );
                  }}
                >
                  <MaterialIcons
                    name="volume-up"
                    size={20}
                    color="#B52046"
                  />
                </Pressable>

                <Pressable
                  style={styles.moreButton}
                  onPress={() => {
                        Alert.alert(
                            'Remove Phrase',
                            'Are you sure you want to remove this phrase?',
                            [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {
                                text: 'Remove',
                                style: 'destructive',
                                onPress: () => {
                                removeSavedPhrase(phrase.id);
                                },
                            },
                            ]
                        );
                        }}
                >
                  <MaterialIcons
                    name="more-vert"
                    size={20}
                    color="#594043"
                  />
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        {/* Continuous Audio */}
        <View style={styles.continuousCard}>
          <View style={styles.continuousIcon}>
            <MaterialIcons
              name="headphones"
              size={26}
              color="#B52046"
            />
          </View>

          <View style={styles.continuousContent}>
            <Text style={styles.continuousTitle}>
              Continuous Audio Play
            </Text>

            <Text style={styles.continuousText}>
              Listen to all your saved phrases in the background while playing
            </Text>
          </View>

          <Pressable style={styles.playAllButton}>
            <MaterialIcons
              name="play-arrow"
              size={22}
              color="#FFFFFF"
            />
          </Pressable>
        </View>
      </ScrollView>

      {/* Add New Phrase */}
      <View style={styles.addPhraseWrapper}>
        <Pressable style={styles.addPhraseButton}>
          <MaterialIcons
            name="add"
            size={20}
            color="#FFFFFF"
          />

          <Text style={styles.addPhraseText}>
            Add New Phrase
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 150,
  },

  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    color: '#121C2A',
  },

  heart: {
    fontSize: 20,
    marginLeft: 6,
  },

  countBadge: {
    backgroundColor: '#FFD9DD',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },

  countText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#400013',
  },

  searchButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  tipIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD9DD',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tipContent: {
    flex: 1,
    marginLeft: 12,
  },

  tipTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#121C2A',
  },

  tipText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#594043',
    marginTop: 1,
  },

  filterContent: {
    gap: 8,
    paddingVertical: 12,
  },

  activeFilter: {
    backgroundColor: '#B52046',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },

  activeFilterText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  filter: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },

  filterText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#594043',
  },

  phrasesList: {
    gap: 12,
    marginTop: 4,
  },

  phraseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },

  phraseContent: {
    flex: 1,
    minWidth: 0,
  },

  phraseEnglish: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: '#121C2A',
  },

  phraseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },

  categoryBadge: {
    backgroundColor: '#FFD9DD',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },

  categoryText: {
    fontSize: 11,
    lineHeight: 15,
    color: '#630022',
  },

  originalText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: '#594043',
  },

  phraseActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  audioButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFD9DD',
    alignItems: 'center',
    justifyContent: 'center',
  },

  moreButton: {
    width: 32,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  continuousCard: {
    backgroundColor: '#EFF4FF',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  continuousIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  continuousContent: {
    flex: 1,
  },

  continuousTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#121C2A',
  },

  continuousText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#594043',
    marginTop: 2,
  },

  playAllButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#B52046',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addPhraseWrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 25
  },

  addPhraseButton: {
    height: 52,
    borderRadius: 999,
    backgroundColor: '#B52046',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  addPhraseText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
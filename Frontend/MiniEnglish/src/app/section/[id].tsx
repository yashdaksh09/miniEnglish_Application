import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomeHeader from '@/components/home/HomeHeader';
import { Phrase } from '@/types/situation';
import PhraseCard from '../situation/PhraseCard';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function SectionScreen() {
  const { id, name } = useLocalSearchParams<{
    id: string;
    name?: string;
  }>();

  const router = useRouter();

  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [loading, setLoading] = useState(true);

  const onBack = () => {
    router.back();
  };

  const onAudioPress = (phrase: Phrase) => {
    console.log('Audio press:', phrase);
  };

  const onFavoritePress = (phrase: Phrase) => {
    console.log('Favorite press:', phrase);
  };

  const onAddAllPress = () => {
    console.log('Add all press');
  };

  useEffect(() => {
    async function fetchPhrases() {
      try {
        const response = await fetch(
          `${API_URL}/api/phrases/section/${id}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch phrases');
        }

        const data: Phrase[] = await response.json();

        console.log('Phrases API data:', data);

        setPhrases(data);
      } catch (error) {
        console.error('Error fetching phrases:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPhrases();
  }, [id]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      
      {/* Existing common header */}
      <HomeHeader subtitle="My Phrases" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        
        {/* Navigation Header Row */}
        <View style={styles.navRow}>
          <Pressable
            onPress={onBack}
            style={styles.backButton}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={20}
              color="#594043"
            />

            <Text style={styles.backText}>
              Back
            </Text>
          </Pressable>

          <View style={styles.titleWrapper}>
            <Text style={styles.headerTitle}>
              {name ?? 'Section'}
            </Text>

            <MaterialIcons
              name="park"
              size={18}
              color="#B52046"
            />
          </View>

          <View style={styles.spacer} />
        </View>

        {/* Warm Sub-banner */}
        <View style={styles.subBanner}>
          <View style={styles.subBannerLeft}>
            
            <View style={styles.natureIconCircle}>
              <MaterialCommunityIcons
                name="nature-people"
                size={20}
                color="#B52046"
              />
            </View>

            <View style={styles.subBannerTexts}>
              <Text style={styles.subBannerTitle}>
                Park Routine Phrases
              </Text>

              <Text style={styles.subBannerSubtitle}>
                {phrases.length} ready phrases • Hindi transliteration
              </Text>
            </View>

          </View>

          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>
              Active
            </Text>
          </View>
        </View>

        {/* Phrase List */}
        <View style={styles.phrasesList}>
          {loading ? (
            <Text style={styles.loadingText}>
              Loading phrases...
            </Text>
          ) : (
            phrases.map((phrase) => (
              <Pressable
                key={phrase.id}
                style={styles.phraseCard}
                onPress={()=>{
                  router.push({
                    pathname: '/phrase/[id]',
                    params:{
                      id: phrase.id.toString()
                    }
                  })
                }}
              >
                <View style={styles.phraseTextContainer}>
                  
                  <Text style={styles.englishText}>
                    {phrase.better_english ?? phrase.english_text}
                  </Text>

                  <Text style={styles.hindiText}>
                    {phrase.hindi_text}
                  </Text>

                </View>

                <View style={styles.cardActions}>
                  
                  <Pressable
                    style={styles.actionBtn}
                    onPress={() => onAudioPress(phrase)}
                  >
                    <MaterialIcons
                      name="volume-up"
                      size={19}
                      color="#B52046"
                    />
                  </Pressable>

                  <Pressable
                    style={styles.actionBtn}
                    onPress={() => onFavoritePress(phrase)}
                  >
                    <MaterialIcons
                      name="favorite-border"
                      size={20}
                      color="#8D7072"
                    />
                  </Pressable>

                </View>
              </Pressable>
            ))
          )}
        </View>

        {/* Mommy Tip */}
        <View style={styles.tipContainer}>
          <MaterialIcons
            name="tips-and-updates"
            size={20}
            color="#B52046"
            style={styles.tipIcon}
          />

          <View style={styles.tipTextContainer}>
            <Text style={styles.tipTitle}>
              Mommy Tip for Park Play
            </Text>

            <Text style={styles.tipDescription}>
              Repeat phrases like "Hold my hand" while physically
              holding their hand so your toddler naturally pairs
              the touch with the English phrase.
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* Sticky Bottom CTA */}
      <View style={styles.stickyFooter}>
        <Pressable
          style={styles.addButton}
          onPress={onAddAllPress}
        >
          <MaterialIcons
            name="add"
            size={20}
            color="#FFFFFF"
          />

          <Text style={styles.addButtonText}>
            + Add to My Phrases
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
    paddingTop: 12,
    paddingBottom: 100,
  },

  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },

  backText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: '#594043',
  },

  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingRight: 24,
  },

  headerTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: '#121C2A',
  },

  spacer: {
    width: 30,
  },

  subBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EFF4FF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  subBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },

  natureIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFD9DC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  subBannerTexts: {
    flex: 1,
  },

  subBannerTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#121C2A',
  },

  subBannerSubtitle: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    color: '#594043',
  },

  activeBadge: {
    backgroundColor: '#88F9B0',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },

  activeBadgeText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    color: '#00361B',
  },

  phrasesList: {
    gap: 12,
    marginBottom: 20,
  },

  loadingText: {
    textAlign: 'center',
    color: '#594043',
    marginTop: 20,
  },

  phraseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,

    shadowColor: '#E84A6F',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },

  phraseTextContainer: {
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

  tipContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',

    backgroundColor: '#DEE9FC',
    borderRadius: 16,
    padding: 14,
    gap: 10,
    marginBottom: 16,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  tipIcon: {
    marginTop: 2,
  },

  tipTextContainer: {
    flex: 1,
  },

  tipTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#121C2A',
    marginBottom: 2,
  },

  tipDescription: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    color: '#594043',
  },

  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    backgroundColor: 'rgba(248, 249, 255, 0.9)',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },

  addButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,

    backgroundColor: '#FF5A79',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,

    shadowColor: '#FF5A79',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 4,
  },

  addButtonText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
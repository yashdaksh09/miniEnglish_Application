import { PhraseDetail } from "@/types/situation";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, ScrollView, StyleSheet, Pressable, View, Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "@/components/home/HomeHeader";
import { MaterialIcons } from "@expo/vector-icons";
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function PhraseDetailScreen(){
    const {id}= useLocalSearchParams<{id: string}>();
    const router =useRouter();

    const [phrase, setPhrase]= useState<PhraseDetail | null>(null);
    const [loading, setLoading]= useState(true);
    const [isFavorite, setIsFavorite]= useState(false);

    useEffect(()=>{
        async function  fetchPhrase() {
            try{
                const response= await fetch(`${API_URL}/api/phrases/${id}`);

                if(!response.ok){
                    throw new Error("Failed to fetch phrase");
                }

                const data: PhraseDetail= await response.json();
                console.log("Phrase Details  API Data:", data);

                setPhrase(data)
            }catch(error){
                console.error("Error Fetching Phrase: ",error);
            }finally{
                setLoading(false)
            }
        }

        fetchPhrase()
    },[id])

   useEffect(() => {
  if (!id) return;

  const loadFavorite = async () => {
    try {
      const key = `favorite_phrase_${id}`;
      const savedFavorite = await AsyncStorage.getItem(key);

      console.log('Favorite loaded:', key, savedFavorite);

      setIsFavorite(savedFavorite === 'true');
    } catch (error) {
      console.error('Error loading favorite:', error);
    }
  };

  loadFavorite();
}, [id]);
return (
  <SafeAreaView style={styles.container} edges={['top']}>
    <HomeHeader subtitle="Phrase Detail" />

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {loading ? (
        <Text style={styles.loadingText}>Loading phrase...</Text>
      ) : phrase ? (
        <View style={styles.content}>

          {/* Breadcrumb + Favorite */}
          <View style={styles.breadcrumbRow}>
            <View style={styles.breadcrumbPill}>
              <MaterialIcons
                name="nature-people"
                size={15}
                color="#B52046"
              />

              <Text style={styles.breadcrumbText}>
                Park & Outdoor Routine
              </Text>
            </View>

            <Pressable style={styles.favoriteButton}
            onPress={async()=>{
                const newFavoriteState= !isFavorite;
                setIsFavorite(newFavoriteState);
                // if phrase not availble so favriote fuctionatly not working because if not avaible phrase so favriote icon not will be show and not give error
                if(!phrase){
                  return;
                }

                if(newFavoriteState){
                  const savedPhrase= {
                    id: `phrase-${phrase.id}`,
                    originalText: phrase.hindi_text,
                    naturalEnglish: phrase.better_english ?? phrase.english_text,
                    tone: 'Gentle & Clear',
                    category: 'Park',
                    
                  }
                }
                  console.log( 'Favorite saved:', id,newFavoriteState
      );

                try{
                    await AsyncStorage.setItem(
                        `favorite_phrase_${id}`,
                        String(newFavoriteState)
                    );
                }catch(error){
                    console.error("Error saving favorite:", error);
                }
            }}
            >
              <MaterialIcons
                name={isFavorite ? "favorite": "favorite-border"}
                size={23}
                color={isFavorite ?"#B52046": "#8D7072"}
              />
            </Pressable>
          </View>

          {/* Hero Phrase Card */}
          <View style={styles.heroCard}>
            <View style={styles.heroTopRow}>
              <View style={styles.heroTextContainer}>
                <Text style={styles.label}>
                  KEY PHRASE
                </Text>

                <Text style={styles.phraseText}>
                  {phrase.better_english ?? phrase.english_text}
                </Text>

                <View style={styles.phraseMeta}>
                  <View style={styles.gentleBadge}>
                    <MaterialIcons
                      name="check-circle"
                      size={13}
                      color="#006D3C"
                    />

                    <Text style={styles.gentleBadgeText}>
                      Gentle & Clear
                    </Text>
                  </View>

                  <Text style={styles.categoryText}>
                    Toddler Safety
                  </Text>
                </View>
              </View>

              <Pressable style={styles.audioButton}
              onPress={()=>{
                Speech.stop();

                Speech.speak(
                    phrase.better_english ?? phrase.english_text,
                    {
                        language: 'en-US',//hi-IN- hindi accent
                        rate: 0.85,
                        pitch: 1.0
                    }
                )
              }}
              >
                <MaterialIcons
                  name="volume-up"
                  size={28}
                  color="#FFFFFF"
                />
              </Pressable>
            </View>
          </View>

          {/* Meaning in Hindi */}
          <View style={styles.meaningCard}>
            <View style={styles.meaningHeader}>
              <MaterialIcons
                name="translate"
                size={16}
                color="#8D7072"
              />

              <Text style={styles.meaningTitle}>
                MEANING IN HINDI
              </Text>
            </View>

            <View style={styles.meaningContent}>
              <Text style={styles.hindiText}>
                {phrase.hindi_text}
              </Text>

              <Text style={styles.romanHindiText}>
                Mere paas hi raho.
              </Text>
            </View>
          </View>

          {/* Mother's Mindset Tip */}
          {phrase.mindset_tip ? (
            <View style={styles.mindsetCard}>
              {phrase.mindset_image_url ? (
                <Image
                  source={{ uri: phrase.mindset_image_url }}
                  style={styles.mindsetImage}
                />
              ) : null}

              <View style={styles.mindsetContent}>
                <View style={styles.mindsetTitleRow}>
                  <MaterialIcons
                    name="psychology"
                    size={15}
                    color="#006D3C"
                  />

                  <Text style={styles.mindsetTitle}>
                    Mother's Mindset Tip
                  </Text>
                </View>

                <Text
                  style={styles.mindsetText}
                  numberOfLines={2}
                >
                  {phrase.mindset_tip}
                </Text>
              </View>
            </View>
          ) : null}

          {/* More Natural Alternatives */}
          <View style={styles.alternativesCard}>
            <View style={styles.alternativesHeader}>
              <View style={styles.alternativesTitleRow}>
                <MaterialIcons
                  name="cached"
                  size={18}
                  color="#B52046"
                />

                <Text style={styles.alternativesTitle}>
                  More Natural Alternatives
                </Text>
              </View>

              <Text style={styles.tapToHear}>
                Tap to hear
              </Text>
            </View>

            <View style={styles.alternativesList}>
              {(phrase.alternativeRows ?? []).map(
                (alternative, index) => (
                  <View
                    key={alternative.id}
                    style={styles.alternativeCard}
                  >
                    <View style={styles.alternativeLeft}>
                      <View
                        style={[
                          styles.alternativeDot,
                          index === 0
                            ? styles.dotPrimary
                            : index === 1
                            ? styles.dotSecondary
                            : styles.dotTertiary,
                        ]}
                      />

                      <View style={styles.alternativeContent}>
                        <Text style={styles.alternativeText}>
                          {alternative.english_text}
                        </Text>

                        {alternative.description ? (
                          <Text
                            style={styles.alternativeDescription}
                          >
                            {alternative.description}
                          </Text>
                        ) : null}
                      </View>
                    </View>

                    <Pressable
                      style={styles.alternativeAudioButton}
                      onPress={() => {
                        Speech.stop();
                        Speech.speak(alternative.english_text,{
                            language:'en-US',
                            rate: 0.85,
                            pitch: 1.0
                        })
                        console.log(
                          'Alternative audio:',
                          alternative.english_text
                        );
                      }}
                    >
                      <MaterialIcons
                        name="volume-up"
                        size={17}
                        color="#B52046"
                      />
                    </Pressable>
                  </View>
                )
              )}
            </View>
          </View>

          {/* Example in Use */}
          <View style={styles.exampleCard}>
            <View style={styles.exampleTopRow}>
              <View style={styles.exampleTitleRow}>
                <MaterialIcons
                  name="forum"
                  size={18}
                  color="#B52046"
                />

                <Text style={styles.exampleTitle}>
                  Example in Use
                </Text>
              </View>

              <View style={styles.realDialoguePill}>
                <Text style={styles.realDialogueText}>
                  Real Dialogue
                </Text>
              </View>
            </View>

            <View style={styles.dialogueBox}>
              <View style={styles.dialogueSpeakerRow}>
                <View style={styles.speakerAvatar}>
                  <Text style={styles.speakerAvatarText}>
                    M
                  </Text>
                </View>

                <Text style={styles.speakerText}>
                  Mommy to Toddler:
                </Text>
              </View>

              {phrase.example_english ? (
                <Text style={styles.exampleEnglish}>
                  “{phrase.example_english}”
                </Text>
              ) : null}

              {phrase.example_hindi ? (
                <Text style={styles.exampleHindi}>
                  {phrase.example_hindi}
                </Text>
              ) : null}
            </View>
          </View>

          {/* Practice CTA */}
          <View style={styles.practiceSection}>
            <Pressable style={styles.practiceButton}>
              <MaterialIcons
                name="mic"
                size={20}
                color="#FFFFFF"
              />

              <Text style={styles.practiceButtonText}>
                Practice This
              </Text>
            </Pressable>

            <Text style={styles.practiceSubtitle}>
              Takes only 30 seconds • Build gentle speaking confidence
            </Text>
          </View>

        </View>
      ) : (
        <Text style={styles.errorText}>
          Phrase not found.
        </Text>
      )}
    </ScrollView>
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
    paddingBottom: 32,
  },

  content: {
    width: '100%',
    gap: 16,
  },

  loadingText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 14,
    color: '#594043',
  },

  errorText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 14,
    color: '#594043',
  },

  /* Breadcrumb */

  breadcrumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  breadcrumbPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EFF4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  breadcrumbText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    color: '#B52046',
  },

  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  /* Hero */

  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },

  heroTextContainer: {
    flex: 1,
    minWidth: 0,
  },

  label: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    color: '#8D7072',
    marginBottom: 4,
    letterSpacing: 0.6,
  },

  phraseText: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    color: '#121C2A',
    letterSpacing: -0.5,
  },

  audioButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF5A79',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,

    shadowColor: '#FF5A79',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 3,
  },

  phraseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },

  gentleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: '#E6EEFF',
  },

  gentleBadgeText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    color: '#121C2A',
  },

  categoryText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    color: '#8D7072',
  },

  /* Meaning */

  meaningCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  meaningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  meaningTitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#8D7072',
    letterSpacing: 0.5,
  },

  meaningContent: {
    backgroundColor: '#EFF4FF',
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 8,
  },

  hindiText: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '600',
    color: '#121C2A',
  },

  romanHindiText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#594043',
    marginTop: 2,
  },

  /* Mindset */

  mindsetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  mindsetImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#E6EEFF',
  },

  mindsetContent: {
    flex: 1,
    marginLeft: 12,
    minWidth: 0,
  },

  mindsetTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  mindsetTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: '#006D3C',
  },

  mindsetText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#594043',
    marginTop: 2,
  },

  /* Alternatives */

  alternativesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  alternativesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  alternativesTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },

  alternativesTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: '#121C2A',
  },

  tapToHear: {
    fontSize: 11,
    lineHeight: 14,
    color: '#8D7072',
  },

  alternativesList: {
    marginTop: 12,
    gap: 8,
  },

  alternativeCard: {
    backgroundColor: '#EFF4FF',
    borderRadius: 28,
    paddingHorizontal: 14,
    paddingVertical: 12,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  alternativeLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },

  alternativeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
    flexShrink: 0,
  },

  dotPrimary: {
    backgroundColor: '#B52046',
  },

  dotSecondary: {
    backgroundColor: '#FF5C80',
  },

  dotTertiary: {
    backgroundColor: '#33A968',
  },

  alternativeContent: {
    flex: 1,
    minWidth: 0,
  },

  alternativeText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: '#121C2A',
  },

  alternativeDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: '#594043',
    marginTop: 1,
  },

  alternativeAudioButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },

  /* Example */

  exampleCard: {
    backgroundColor: '#EFF4FF',
    borderRadius: 32,
    padding: 16,
  },

  exampleTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  exampleTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  exampleTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#121C2A',
  },

  realDialoguePill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  realDialogueText: {
    fontSize: 11,
    lineHeight: 14,
    color: '#594043',
  },

  dialogueBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 14,
    marginTop: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },

  dialogueSpeakerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  speakerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFD9DC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  speakerAvatarText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#400011',
  },

  speakerText: {
    fontSize: 11,
    lineHeight: 14,
    color: '#8D7072',
    fontWeight: '500',
  },

  exampleEnglish: {
    fontSize: 16,
    lineHeight: 25,
    color: '#121C2A',
    marginTop: 10,
    paddingLeft: 30,
    fontStyle: 'italic',
  },

  exampleHindi: {
    fontSize: 14,
    lineHeight: 22,
    color: '#594043',
    marginTop: 8,
    paddingLeft: 30,
  },

  /* Practice */

  practiceSection: {
    paddingTop: 2,
    paddingBottom: 8,
  },

  practiceButton: {
    width: '100%',
    height: 52,
    borderRadius: 999,
    backgroundColor: '#FF5A79',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,

    shadowColor: '#FF5A79',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 3,
  },

  practiceButtonText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  practiceSubtitle: {
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 14,
    color: '#8D7072',
    marginTop: 8,
  },
});
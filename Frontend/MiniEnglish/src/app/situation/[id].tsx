import { Text, View, Pressable, ScrollView, Image, StyleSheet,} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Situation, Section } from '@/types/situation';
import { MaterialIcons } from '@expo/vector-icons';

import HomeHeader from '@/components/home/HomeHeader';

import { useEffect, useState } from 'react';
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function SituationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [situation, setSituation]= useState<Situation | null>(null);
  const [sections, setSections]= useState<Section[]>([])

  useEffect(()=>{
    async function fetchSituation() {
      try{
        const response= await fetch(`${API_URL}/api/situations/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch situation');
        }

        const data: Situation= await response.json();

        setSituation(data);
      }catch(error){
        console.error('Error fetching situation:', error);
      }

    }
    async function fetchSections() {
      try{
        const response= await fetch(`${API_URL}/api/situations/${id}/sections`);

        if(!response.ok){
          throw new Error("Failed to fetch sections");
        }

        const data: Section[]= await response.json();
        console.log("Sections API data:", data);
        setSections(data);
      }catch(error){
        console.error("Error Fetching Sections:", error);
      }
    }
    fetchSituation();
    fetchSections();
  }, [id])

  if(!situation){
    return( 
    <View>
      <Text>
        Loading...
      </Text>
    </View>
    )
  }
  return (
  <View style={styles.screen}>

    {/* Header */}
    <HomeHeader subtitle="Search Routines" />

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >

      {/* Back / Title / Favorite */}
      <View style={styles.topRow}>

        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MaterialIcons
            name="chevron-left"
            size={22}
            color="#B52046"
          />

          <Text style={styles.backText}>
            Back
          </Text>
        </Pressable>

        <Text style={styles.screenTitle}>
          {situation.name}
        </Text>

        <View style={styles.favoriteWrapper}>
          <Pressable style={styles.favoriteButton}>
            <MaterialIcons
              name="favorite"
              size={18}
              color="#B52046"
            />
          </Pressable>
        </View>

      </View>


      {/* Hero Card */}
      <View style={styles.heroCard}>

        <Image
          source={{
            uri: situation.image_url ?? undefined
          }}
          style={styles.heroImage}
        />

        <View style={styles.heroOverlay} />

        <View style={styles.heroInfo}>

          <View style={styles.outdoorBadge}>
            <MaterialIcons
              name="park"
              size={16}
              color="#88F9B0"
            />

            <Text style={styles.outdoorText}>
              Outdoor Routine
            </Text>
          </View>

          <View style={styles.phraseBadge}>
            <Text style={styles.phraseBadgeText}>
              28 Phrases
            </Text>
          </View>

        </View>
      </View>


      {/* Context Header */}
      <View style={styles.contextRow}>

        <View style={styles.contextLeft}>
          <Text style={styles.contextTitle}>
            Choose a Moment
          </Text>

          <Text style={styles.contextSubtitle}>
            (Hindi to Natural English)
          </Text>
        </View>

        <Text style={styles.subTopics}>
          5 sub-topics
        </Text>

      </View>


      {/* Sections */}
      <View style={styles.sectionsList}>

        {sections.map((section, index) => {

          const isActive =
            section.name === 'At the Park';

          const phraseCounts: Record<string, number> = {
            'Before Leaving': 5,
            'At the Park': 8,
            'Playing & Activities': 7,
            'Safety': 4,
            'Time to Go Home': 4,
          };

          const phraseCount =
            phraseCounts[section.name] ?? 0;

          return (
            <Pressable
              key={section.id}
              style={[
                styles.sectionCard,
                isActive && styles.activeSectionCard,
              ]}
              onPress={()=>{
                router.push({
                  pathname: '/section/[id]',
                  params: {id: section.id.toString(),
                    name: section.name
                  }
                })
              }}
            >

              {isActive && (
                <View style={styles.activeStrip} />
              )}

              <View
                style={[
                  styles.sectionLeft,
                  isActive && styles.activeSectionLeft,
                ]}
              >

                <View
                  style={[
                    styles.sectionIcon,
                    isActive && styles.activeSectionIcon,
                  ]}
                >
                  <MaterialIcons
                    name={
                      index === 0
                        ? 'door-front'
                        : index === 1
                        ? 'nature-people'
                        : index === 2
                        ? 'sports-tennis'
                        : index === 3
                        ? 'health-and-safety'
                        : 'home-pin'
                    }
                    size={20}
                    color={
                      isActive
                        ? '#FFFFFF'
                        : '#B52046'
                    }
                  />
                </View>


                <View style={styles.sectionText}>

                  <View style={styles.sectionTitleRow}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.sectionTitle,
                        isActive &&
                          styles.activeSectionTitle,
                      ]}
                    >
                      {section.name}
                    </Text>

                    {isActive && (
                      <View style={styles.activeDot} />
                    )}
                  </View>

                  <Text
                    numberOfLines={1}
                    style={[
                      styles.sectionDescription,
                      isActive &&
                        styles.activeSectionDescription,
                    ]}
                  >
                    {section.description}
                  </Text>

                </View>

              </View>


              <View style={styles.sectionRight}>

                <Text
                  style={[
                    styles.phraseCount,
                    isActive &&
                      styles.activePhraseCount,
                  ]}
                >
                  {phraseCount} phrases
                </Text>

                <MaterialIcons
                  name="chevron-right"
                  size={20}
                  color={
                    isActive
                      ? '#B52046'
                      : '#8D7072'
                  }
                />

              </View>

            </Pressable>
          );
        })}

      </View>


      {/* Mommy Tip */}
      <View style={styles.mommyTip}>

        <View style={styles.tipIcon}>
          <MaterialIcons
            name="lightbulb"
            size={18}
            color="#B52046"
          />
        </View>

        <View style={styles.tipTextContainer}>

          <Text style={styles.tipTitle}>
            Mommy Tip
          </Text>

          <Text style={styles.tipDescription}>
            Click on any section to see ready-to-use
            phrases with Hindi hints and audio
            pronunciation!
          </Text>

        </View>

      </View>


      {/* Quick Practice */}
      <View style={styles.quickPractice}>

        <View style={styles.practiceLeft}>

          <View style={styles.practiceDot} />

          <Text style={styles.practiceText}>
            Quick 2-minute oral practice available
          </Text>

        </View>

        <Pressable style={styles.practiceButton}>

          <Text style={styles.practiceButtonText}>
            Start Practice
          </Text>

          <MaterialIcons
            name="arrow-forward"
            size={16}
            color="#B52046"
          />

        </Pressable>

      </View>

    </ScrollView>
  </View>
);
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 112,
    gap: 12,
  },

  topRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  backText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#B52046',
  },

  screenTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    color: '#121C2A',
  },

  favoriteWrapper: {
    width: 40,
    alignItems: 'flex-end',
  },

  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6EEFF',
  },

  heroCard: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#E6EEFF',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,

    justifyContent: 'flex-end',
  },

  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },

  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
  },

  heroInfo: {
    width: '100%',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  outdoorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,

    paddingHorizontal: 12,
    paddingVertical: 4,

    borderRadius: 999,

    backgroundColor: 'rgba(18, 28, 42, 0.65)',
  },

  outdoorText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  phraseBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,

    borderRadius: 999,

    backgroundColor: 'rgba(255, 255, 255, 0.92)',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },

  phraseBadgeText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    color: '#B52046',
  },

  contextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },

  contextLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },

  contextTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#121C2A',
  },

  contextSubtitle: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    color: '#594043',
  },

  subTopics: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    color: '#B52046',
  },

  sectionsList: {
    flexDirection: 'column',
    gap: 10,
  },

  sectionCard: {
    minHeight: 84,
    padding: 14,

    borderRadius: 16,

    backgroundColor: '#FFFFFF',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    shadowColor: '#E84A6F',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,

    position: 'relative',
    overflow: 'hidden',
  },

  activeSectionCard: {
    backgroundColor: 'rgba(255, 217, 220, 0.4)',

    shadowColor: '#FF5A79',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 2,
  },

  activeStrip: {
    position: 'absolute',
    left: 0,
    top: 12,
    bottom: 12,
    width: 6,
    backgroundColor: '#B52046',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },

  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    minWidth: 0,
  },

  activeSectionLeft: {
    paddingLeft: 4,
  },

  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,

    backgroundColor: '#DEE9FC',

    alignItems: 'center',
    justifyContent: 'center',

    flexShrink: 0,
  },

  activeSectionIcon: {
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

  sectionText: {
    flex: 1,
    minWidth: 0,
  },

  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  sectionTitle: {
    flexShrink: 1,

    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#121C2A',
  },

  activeSectionTitle: {
    color: '#B52046',
    fontWeight: '700',
  },

  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B52046',
  },

  sectionDescription: {
    marginTop: 0,

    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    color: '#594043',
  },

  activeSectionDescription: {
    color: '#630022',
  },

  sectionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,

    marginLeft: 8,
    flexShrink: 0,
  },

  phraseCount: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    color: '#8D7072',
  },

  activePhraseCount: {
    color: '#B52046',
    fontWeight: '700',
  },

  mommyTip: {
    marginTop: 8,

    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,

    padding: 14,

    borderRadius: 32,

    backgroundColor: '#EFF4FF',
  },

  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,

    backgroundColor: '#FFD9DD',

    alignItems: 'center',
    justifyContent: 'center',

    flexShrink: 0,

    marginTop: 2,
  },

  tipTextContainer: {
    flex: 1,
  },

  tipTitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: '#B52046',
  },

  tipDescription: {
    marginTop: 2,

    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    color: '#594043',
  },

  quickPractice: {
    paddingTop: 4,
    paddingHorizontal: 4,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  practiceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,

    flex: 1,
  },

  practiceDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#33A968',
  },

  practiceText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    color: '#121C2A',
  },

  practiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  practiceButtonText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    color: '#B52046',
  },
});
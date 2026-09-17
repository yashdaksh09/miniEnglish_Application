import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

import HomeHeader from '@/components/home/HomeHeader';

export default function PhraseUpgrade() {
  const { 
    id,
    naturalEnglish,
    tone,
    evenMoreNatural,
    hindiEquivalent,
    whyBetter,
    mindsetTip

   } = useLocalSearchParams<{ 
      id: string;
      naturalEnglish: string;
      tone: string;
      evenMoreNatural: string;
      hindiEquivalent: string;
      whyBetter: string;
      mindsetTip: string;
}>();

  const phrase = id || '';

  const sayBetterPhrase = naturalEnglish || '';

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top']}
    >
      <HomeHeader subtitle="Phrase Upgrade" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Navigation */}
        <View style={styles.topRow}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialIcons
              name="chevron-left"
              size={22}
              color="#594043"
            />

            <Text style={styles.backText}>
              Back
            </Text>
          </Pressable>

          <View style={styles.upgradePill}>
            <MaterialIcons
              name="auto-fix-high"
              size={15}
              color="#B52046"
            />

            <Text style={styles.upgradePillText}>
              Phrase Upgrade
            </Text>
          </View>
        </View>

        {/* Intro / Situation Card */}
        <View style={styles.introCard}>
          <View style={styles.introIcon}>
            <MaterialIcons
              name="record-voice-over"
              size={22}
              color="#B52046"
            />
          </View>

          <View style={styles.introText}>
            <Text style={styles.routineText}>
              Daily Routine: Playtime & Attention
            </Text>

            <Text style={styles.introTitle}>
              Polite & Loving Calling
            </Text>
          </View>
        </View>

        {/* Tier 1 */}
        <View style={styles.tierCardBad}>
          <View style={styles.tierHeader}>
            <Text style={styles.badLabel}>
              YOU MIGHT SAY
            </Text>

            <View style={styles.badIcon}>
              <MaterialIcons
                name="close"
                size={14}
                color="#FFFFFF"
              />
            </View>
          </View>

          <View style={styles.phraseRow}>
            <Text style={styles.badPhrase}>
              {phrase}
            </Text>

            <Pressable
              style={styles.smallAudioButton}
              onPress={() => {
                Speech.stop();

                Speech.speak(phrase, {
                  language: 'en-US',
                  rate: 0.85,
                  pitch: 1.0,
                });
              }}
            >
              <MaterialIcons
                name="volume-up"
                size={18}
                color="#594043"
              />
            </Pressable>
          </View>

          <Text style={styles.description}>
            
          </Text>
        </View>

        {/* Arrow */}
        <View style={styles.arrowWrapper}>
          <View style={styles.arrowCircle}>
            <MaterialIcons
              name="arrow-downward"
              size={16}
              color="#594043"
            />
          </View>
        </View>

        {/* Tier 2 */}
        <View style={styles.tierCardGood}>
          <View style={styles.tierHeader}>
            <Text style={styles.goodLabel}>
              SAY IT BETTER
            </Text>

            <View style={styles.goodIcon}>
              <MaterialIcons
                name="check"
                size={16}
                color="#FFFFFF"
              />
            </View>
          </View>

          <View style={styles.phraseRow}>
            <Text style={styles.goodPhrase}>
              {sayBetterPhrase}
            </Text>

            <Pressable
              style={styles.smallAudioButton}
              onPress={() => {
                Speech.stop();

                Speech.speak(sayBetterPhrase, {
                  language: 'en-US',
                  rate: 0.85,
                  pitch: 1.0,
                });
              }}
            >
              <MaterialIcons
                name="volume-up"
                size={20}
                color="#006D3C"
              />
            </Pressable>
          </View>

          <Text style={styles.description}>
            {tone}
          </Text>
        </View>

        {/* Arrow */}
        <View style={styles.arrowWrapper}>
          <View style={styles.arrowCircle}>
            <MaterialIcons
              name="arrow-downward"
              size={16}
              color="#594043"
            />
          </View>
        </View>

        {/* Tier 3 */}
        <View style={styles.tierCardLoving}>
          <View style={styles.tierHeader}>
            <View style={styles.lovingLabelRow}>
              <MaterialIcons
                name="favorite"
                size={15}
                color="#B52046"
              />

              <Text style={styles.lovingLabel}>
                EVEN MORE NATURAL & LOVING
              </Text>
            </View>

            <View style={styles.lovingIcon}>
              <MaterialIcons
                name="favorite"
                size={14}
                color="#FFFFFF"
              />
            </View>
          </View>

          <View style={styles.phraseRow}>
            <Text style={styles.lovingPhrase}>
              {evenMoreNatural}
            </Text>

            <Pressable
              style={styles.smallAudioButton}
              onPress={() => {
                Speech.stop();

                Speech.speak(
                  'Come here, sweetheart!',
                  {
                    language: 'en-US',
                    rate: 0.85,
                    pitch: 1.0,
                  }
                );
              }}
            >
              <MaterialIcons
                name="volume-up"
                size={20}
                color="#B52046"
              />
            </Pressable>
          </View>

          <View style={styles.hindiRow}>
            <Text style={styles.hindiLabel}>
              Hindi equivalent:
            </Text>

            <Text style={styles.hindiText}>
               {hindiEquivalent}
            </Text>
          </View>
        </View>

        {/* Why this works better */}
        <View style={styles.whyCard}>
          <View style={styles.whyHeader}>
            <View style={styles.lightbulbCircle}>
              <MaterialIcons
                name="lightbulb"
                size={16}
                color="#B52046"
              />
            </View>

            <Text style={styles.whyTitle}>
              Why does this work better?
            </Text>
          </View>

          <Text style={styles.whyText}>
           {whyBetter}
          </Text>

          <View style={styles.mindsetCard}>
              <MaterialIcons
                name="psychology"
                size={20}
                color="#B52046"
              />
            <View style={styles.mindsetContent}>
              <Text style={styles.mindsetTitle}>
                Mommy Mindset
              </Text>

              <Text style={styles.mindsetText}>
                {mindsetTip}
              </Text>
            </View>
          </View>

          <View style={styles.practiceStrip}>
            <View style={styles.practiceStripLeft}>
              <MaterialIcons
                name="mic"
                size={18}
                color="#006D3C"
              />

              <Text style={styles.practiceStripText}>
                Try repeating aloud right now
              </Text>
            </View>

                <Pressable
                style={styles.recordButton}
                onPress={() => {
                router.push({
                pathname: '/voice-practice/[id]',
                params: {
                  id: phrase,
                  naturalEnglish,
                  tone,
                  evenMoreNatural,
                  hindiEquivalent,
                  whyBetter,
                  mindsetTip,
                },
                });
                }}
             >
              <Text style={styles.recordButtonText}>
                Record Voice
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>
              Moms practicing
            </Text>

            <View style={styles.statValueRow}>
              <Text style={styles.statValue}>
                2,480+
              </Text>

              <MaterialIcons
                name="trending-up"
                size={16}
                color="#006D3C"
              />
            </View>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>
              Daily confidence
            </Text>

            <View style={styles.statValueRow}>
              <Text style={styles.statValue}>
                +18%
              </Text>

              <MaterialIcons
                name="favorite"
                size={16}
                color="#B52046"
              />
            </View>
          </View>
        </View>

        {/* Bottom CTA */}
        <View style={styles.ctaArea}>
          <Pressable
            style={styles.practiceButton}
            onPress={() => {
              console.log(
                'Practice More Sentences pressed'
              );
            }}
          >
            <MaterialIcons
              name="play-circle"
              size={20}
              color="#FFFFFF"
            />

            <Text style={styles.practiceButtonText}>
              Practice More Sentences
            </Text>
          </Pressable>

          <View style={styles.ctaNote}>
            <MaterialIcons
              name="psychology"
              size={14}
              color="#594043"
            />

            <Text style={styles.ctaNoteText}>
              Takes less than 2 minutes each day
            </Text>
          </View>
        </View>
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
    paddingBottom: 40,
    gap: 12,
  },

  /* Top Navigation */

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginLeft: -8,
  },

  backText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#594043',
  },

  upgradePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFD9DC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  upgradePillText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    color: '#62001E',
  },

  /* Intro */

  introCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#EFF4FF',
    borderRadius: 16,
    padding: 12,
  },

  introIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DEE9FC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  introText: {
    flex: 1,
    minWidth: 0,
  },

  routineText: {
    fontSize: 12,
    lineHeight: 16,
    color: '#594043',
  },

  introTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: '#121C2A',
    marginTop: 1,
  },

  /* Tier Common */

  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  phraseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 8,
  },

  description: {
    fontSize: 13,
    lineHeight: 18,
    color: '#594043',
    marginTop: 7,
  },

  smallAudioButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },

  /* Tier 1 */

  tierCardBad: {
    backgroundColor: '#FFDFE3',
    borderRadius: 16,
    padding: 16,
  },

  badLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#BA1A1A',
  },

  badIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#BA1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  badPhrase: {
    flex: 1,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: '#121C2A',
    textDecorationLine: 'line-through',
    textDecorationColor: '#BA1A1A',
  },

  /* Arrow */

  arrowWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: -3,
  },

  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E6EEFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Tier 2 */

  tierCardGood: {
    backgroundColor: '#C9F7DE',
    borderRadius: 16,
    padding: 16,
  },

  goodLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#006D3C',
  },

  goodIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#006D3C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  goodPhrase: {
    flex: 1,
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '700',
    color: '#121C2A',
  },

  /* Tier 3 */

  tierCardLoving: {
    backgroundColor: '#FFD3DC',
    borderRadius: 16,
    padding: 16,
  },

  lovingLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },

  lovingLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 0.7,
    color: '#B52046',
  },

  lovingIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF5A79',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lovingPhrase: {
    flex: 1,
    fontSize: 22,
    lineHeight: 29,
    fontWeight: '700',
    color: '#B52046',
  },

  hindiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 8,
  },

  hindiLabel: {
    fontSize: 11,
    lineHeight: 15,
    color: '#594043',
  },

  hindiText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: '#121C2A',
  },

  /* Why */

  whyCard: {
    backgroundColor: '#EFF4FF',
    borderRadius: 16,
    padding: 16,
  },

  whyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  lightbulbCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFD9DD',
    alignItems: 'center',
    justifyContent: 'center',
  },

  whyTitle: {
    flex: 1,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: '#121C2A',
  },

  whyText: {
    fontSize: 14,
    lineHeight: 23,
    color: '#594043',
    marginTop: 8,
  },

  boldText: {
    fontWeight: '600',
    color: '#121C2A',
  },

  primaryBold: {
    fontWeight: '600',
    color: '#B52046',
  },

  practiceStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    marginTop: 12,
  },

  practiceStripLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  practiceStripText: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '500',
    color: '#121C2A',
  },

  recordButton: {
    backgroundColor: '#E6EEFF',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },

  recordButtonText: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '600',
    color: '#121C2A',
  },

  /* Stats */

  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
  },

  statLabel: {
    fontSize: 11,
    lineHeight: 15,
    color: '#594043',
  },

  statValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },

  statValue: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: '#121C2A',
  },

  /* CTA */

  ctaArea: {
    marginTop: 4,
    paddingTop: 4,
  },

  practiceButton: {
    height: 56,
    borderRadius: 999,
    backgroundColor: '#FF5A79',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 3,
  },

  practiceButtonText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  ctaNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 8,
  },

  ctaNoteText: {
    fontSize: 11,
    lineHeight: 15,
    color: '#594043',
  },
  mindsetCard: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: 10,
  backgroundColor: '#FFD9DD',
  borderRadius: 12,
  padding: 12,
  marginTop: 12,
},

mindsetContent: {
  flex: 1,
},

mindsetTitle: {
  fontSize: 13,
  lineHeight: 18,
  fontWeight: '700',
  color: '#B52046',
},

mindsetText: {
  fontSize: 13,
  lineHeight: 19,
  color: '#594043',
  marginTop: 3,
},
});
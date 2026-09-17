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
import { useState } from 'react';
import * as Speech from 'expo-speech';

type PracticeState = 'ready' | 'recording' | 'feedback';

export default function VoicePractice() {
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
  const practicePhrase = naturalEnglish || phrase;

  const [practiceState, setPracticeState] =
    useState<PracticeState>('ready');

  const speakPhrase = () => {
    Speech.stop();

    Speech.speak(practicePhrase, {
      language: 'en-US',
      rate: 0.85,
      pitch: 1.0,
    });
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top']}
    >
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialIcons
              name="chevron-left"
              size={28}
              color="#121C2A"
            />
          </Pressable>

          <View style={styles.logo}>
            <Text style={styles.logoText}>
              🐰
            </Text>
          </View>

          <View>
            <Text style={styles.headerTitle}>
              Voice Practice
            </Text>

            <Text style={styles.headerSubtitle}>
              Practice Studio
            </Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <Pressable style={styles.headerIcon}>
            <MaterialIcons
              name="notifications-none"
              size={25}
              color="#594043"
            />
          </Pressable>

          <View style={styles.profileCircle}>
            <MaterialIcons
              name="person-outline"
              size={21}
              color="#FFFFFF"
            />
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Context Pills */}
        <View style={styles.contextRow}>
          <View style={styles.routinePill}>
            <View style={styles.pinkDot} />

            <Text style={styles.routineText}>
              Daily Routine: Playtime & Attention
            </Text>
          </View>

          <View style={styles.sayBetterPill}>
            <Text style={styles.sparkle}>
              ✨
            </Text>

            <Text style={styles.sayBetterText}>
              Say It Better
            </Text>
          </View>
        </View>

        {/* State Switcher */}
        <View style={styles.stateSwitcher}>
          <Pressable
            style={[
              styles.stateTab,
              practiceState === 'ready' &&
                styles.activeStateTab,
            ]}
            onPress={() =>
              setPracticeState('ready')
            }
          >
            <Text
              style={[
                styles.stateTabText,
                practiceState === 'ready' &&
                  styles.activeStateTabText,
              ]}
            >
              1. Ready
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.stateTab,
              practiceState === 'recording' &&
                styles.activeStateTab,
            ]}
            onPress={() =>
              setPracticeState('recording')
            }
          >
            <Text
              style={[
                styles.stateTabText,
                practiceState === 'recording' &&
                  styles.activeStateTabText,
              ]}
            >
              2. Recording
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.stateTab,
              practiceState === 'feedback' &&
                styles.activeStateTab,
            ]}
            onPress={() =>
              setPracticeState('feedback')
            }
          >
            <Text
              style={[
                styles.stateTabText,
                practiceState === 'feedback' &&
                  styles.activeStateTabText,
              ]}
            >
              3. Feedback
            </Text>
          </Pressable>
        </View>

        {/* Target Phrase */}
        <View style={styles.targetCard}>
          <View style={styles.targetHeader}>
            <Text style={styles.sayThisLabel}>
              SAY THIS
            </Text>

            <View style={styles.naturalPill}>
              <MaterialIcons
                name="check-circle"
                size={14}
                color="#006D3C"
              />

              <Text style={styles.naturalText}>
                Natural & Inviting
              </Text>
            </View>
          </View>

          <Text style={styles.targetPhrase}>
           {practicePhrase}
          </Text>

          <View style={styles.meaningRow}>
            <Text style={styles.meaningMuted}>
              Hindi meaning:
            </Text>

            <Text style={styles.meaningBold}>
              {hindiEquivalent}
            </Text>
          </View>

          <View style={styles.audioDivider} />

          <View style={styles.listenRow}>
            <View style={styles.listenLeft}>
              <Pressable
                style={styles.listenButton}
                onPress={speakPhrase}
              >
                <MaterialIcons
                  name="volume-up"
                  size={20}
                  color="#FFFFFF"
                />
              </Pressable>

              <View>
                <Text style={styles.listenTitle}>
                  Listen first
                </Text>

                <Text style={styles.listenSubtitle}>
                  Hear gentle native mom inflection
                </Text>
              </View>
            </View>

            <View style={styles.durationPill}>
              <Text style={styles.durationText}>
                0:02
              </Text>
            </View>
          </View>
        </View>

        {/* Recording Hub */}
        <View style={styles.recordingCard}>
          {practiceState === 'ready' && (
            <View style={styles.readyView}>
              <View style={styles.micWrapper}>
                <View style={styles.micGlow} />

                <Pressable
                  style={styles.bigMicButton}
                  onPress={() =>
                    setPracticeState('recording')
                  }
                >
                  <MaterialIcons
                    name="mic"
                    size={38}
                    color="#FFFFFF"
                  />
                </Pressable>
              </View>

              <Text style={styles.tapTitle}>
                Tap to Record
              </Text>

              <Text style={styles.tapDescription}>
                Say the phrase naturally in your own loving tone.
              </Text>

              <View style={styles.perfectPill}>
                <Text style={styles.heartText}>
                  ❤️
                </Text>

                <Text style={styles.perfectText}>
                  Don't worry about being perfect
                </Text>
              </View>
            </View>
          )}

          {practiceState === 'recording' && (
            <View style={styles.readyView}>
              <View style={styles.listeningPill}>
                <View style={styles.redDot} />

                <Text style={styles.listeningText}>
                  Listening... 00:03
                </Text>
              </View>

              <View style={styles.waveContainer}>
                {[8, 18, 30, 16, 28, 14, 22].map(
                  (height, index) => (
                    <View
                      key={index}
                      style={[
                        styles.waveBar,
                        { height },
                      ]}
                    />
                  )
                )}
              </View>

              <Text style={styles.recordingPhrase}>
                "{phrase}..."
              </Text>

              <Text style={styles.speakClearly}>
                Speak clearly towards the microphone
              </Text>

              <Pressable
                style={styles.finishButton}
                onPress={() =>
                  setPracticeState('feedback')
                }
              >
                <View style={styles.stopSquare} />

                <Text style={styles.finishText}>
                  Tap to Finish
                </Text>
              </Pressable>
            </View>
          )}

          {practiceState === 'feedback' && (
            <View style={styles.feedbackView}>
              <View style={styles.feedbackHeader}>
                <View style={styles.greatJobRow}>
                  <Text style={styles.partyEmoji}>
                    🎉
                  </Text>

                  <Text style={styles.greatJob}>
                    Great job, Mommy!
                  </Text>
                </View>

                <View style={styles.reviewPill}>
                  <Text style={styles.reviewText}>
                    Ready to review
                  </Text>
                </View>
              </View>

              <View style={styles.playbackCard}>
                <Pressable
                  style={styles.playRecordingButton}
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
                    name="play-arrow"
                    size={22}
                    color="#FFFFFF"
                  />
                </Pressable>

                <View style={styles.progressArea}>
                  <View style={styles.progressTop}>
                    <Text style={styles.voiceLabel}>
                      Mommy's Voice
                    </Text>

                    <Text style={styles.voiceDuration}>
                      00:03
                    </Text>
                  </View>

                  <View style={styles.progressTrack}>
                    <View
                      style={styles.progressFill}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.reviewButtons}>
                <Pressable
                  style={styles.recordAgainButton}
                  onPress={() =>
                    setPracticeState('ready')
                  }
                >
                  <Text style={styles.recordAgainText}>
                    Record Again
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.savedPracticeButton}
                  onPress={() =>
                    setPracticeState('feedback')
                  }
                >
                  <Text style={styles.savedPracticeText}>
                    Saved to Practice
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>

        {/* Speaking Insights */}
        <View style={styles.insightsCard}>
          <View style={styles.insightsHeader}>
            <View style={styles.insightsTitleRow}>
              <View style={styles.sparkleCircle}>
                <MaterialIcons
                  name="auto-awesome"
                  size={17}
                  color="#B52046"
                />
              </View>

              <Text style={styles.insightsTitle}>
                Your Speaking Insights
              </Text>
            </View>

            <View style={styles.safePill}>
              <Text style={styles.safeText}>
                Mom-Safe & Encouraging
              </Text>
            </View>
          </View>

          {/* Naturalness */}
          <View style={styles.insightRow}>
            <View style={styles.insightLeft}>
              <View style={styles.checkCircle}>
                <MaterialIcons
                  name="check"
                  size={14}
                  color="#006D3C"
                />
              </View>

              <View>
                <Text style={styles.insightTitle}>
                  Naturalness
                </Text>

                <Text style={styles.insightDescription}>
                  Warm, conversational tone
                </Text>
              </View>
            </View>

            <Text style={styles.insightValue}>
              Gentle
            </Text>
          </View>

          {/* Word Clarity */}
          <View style={styles.insightRow}>
            <View style={styles.insightLeft}>
              <View style={styles.checkCircle}>
                <MaterialIcons
                  name="check"
                  size={14}
                  color="#006D3C"
                />
              </View>

              <View>
                <Text style={styles.insightTitle}>
                  Word Clarity
                </Text>

                <Text style={styles.insightDescription}>
                  Clear pronunciation of{' '}
                  <Text style={styles.highlightText}>
                    "Come over"
                  </Text>
                </Text>
              </View>
            </View>

            <Text style={styles.insightValue}>
              Clear
            </Text>
          </View>

          {/* Confidence */}
          <View style={styles.insightRow}>
            <View style={styles.insightLeft}>
              <View style={styles.checkCircle}>
                <MaterialIcons
                  name="check"
                  size={14}
                  color="#006D3C"
                />
              </View>

              <View>
                <Text style={styles.insightTitle}>
                  Confidence
                </Text>

                <Text style={styles.insightDescription}>
                  Calm & reassuring toddler tone
                </Text>
              </View>
            </View>

            <Text style={styles.insightValue}>
              High
            </Text>
          </View>

          {/* Mindset Tip */}
          <View style={styles.mindsetCard}>
            <Text style={styles.mindsetTitle}>
              Mom Mindset Tip:
            </Text>

            <Text style={styles.mindsetText}>
              {mindsetTip}
            </Text>
          </View>
        </View>

        {/* Bottom CTA */}
        <View style={styles.ctaArea}>
          <Pressable
            style={styles.practiceMoreButton}
            onPress={() =>
              setPracticeState('ready')
            }
          >
            <MaterialIcons
              name="autorenew"
              size={20}
              color="#FFFFFF"
            />

            <Text style={styles.practiceMoreText}>
              Practice More Sentences
            </Text>
          </Pressable>

          <View style={styles.ctaNote}>
            <Text style={styles.timerEmoji}>
              ⏱️
            </Text>

            <Text style={styles.ctaNoteText}>
              Takes less than 2 minutes each day • Build gentle
              speaking confidence
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
    paddingBottom: 32,
  },

  /* HEADER */

  header: {
    height: 68,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EFF1F5',
    backgroundColor: '#F8F9FF',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFD',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFF0F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoText: {
    fontSize: 18,
  },

  headerTitle: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: '700',
    color: '#121C2A',
  },

  headerSubtitle: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '500',
    color: '#B52046',
    marginTop: 1,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  headerIcon: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#B52046',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* CONTEXT */

  contextRow: {
    paddingHorizontal: 20,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },

  routinePill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#EFF4FF',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#DCE5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  pinkDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5A79',
  },

  routineText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#121C2A',
  },

  sayBetterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF0F3',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#FFE0E8',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  sparkle: {
    fontSize: 11,
  },

  sayBetterText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#B52046',
  },

  /* STATE TABS */

  stateSwitcher: {
    marginHorizontal: 20,
    marginTop: 12,
    backgroundColor: '#F1F4F8',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E2E7EE',
    padding: 4,
    flexDirection: 'row',
    gap: 4,
  },

  stateTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeStateTab: {
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },

  stateTabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#7E8B9B',
  },

  activeStateTabText: {
    fontWeight: '700',
    color: '#121C2A',
  },

  /* TARGET */

  targetCard: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#FFF7F8',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#FFE0E8',
    padding: 20,
    overflow: 'hidden',
  },

  targetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sayThisLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.7,
    color: '#B52046',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFC8D4',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  naturalPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EAF6EE',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  naturalText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#006D3C',
  },

  targetPhrase: {
    fontSize: 27,
    lineHeight: 34,
    fontWeight: '800',
    color: '#121C2A',
    marginTop: 12,
  },

  meaningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 4,
  },

  meaningMuted: {
    fontSize: 12,
    color: '#8D9AAA',
  },

  meaningBold: {
    fontSize: 12,
    fontWeight: '700',
    color: '#594043',
  },

  audioDivider: {
    height: 1,
    backgroundColor: '#FFE0E8',
    marginTop: 18,
  },

  listenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  listenLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  listenButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FF5A79',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  listenTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#121C2A',
  },

  listenSubtitle: {
    fontSize: 10,
    color: '#7E8B9B',
    marginTop: 1,
  },

  durationPill: {
    backgroundColor: '#FFF0F3',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  durationText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FF5A79',
  },

  /* RECORDING CARD */

  recordingCard: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#EFF4FF',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#DCE5F5',
    padding: 20,
  },

  readyView: {
    alignItems: 'center',
    paddingVertical: 10,
  },

  micWrapper: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
  },

  micGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFE4E9',
  },

  bigMicButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF5A79',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },

  tapTitle: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '700',
    color: '#121C2A',
    marginTop: 8,
  },

  tapDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: '#594043',
    textAlign: 'center',
    maxWidth: 270,
    marginTop: 3,
  },

  perfectPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFE0E8',
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 7,
    marginTop: 16,
  },

  heartText: {
    fontSize: 12,
  },

  perfectText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#B52046',
  },

  /* RECORDING STATE */

  listeningPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#FFF0F0',
    borderWidth: 1,
    borderColor: '#FFD0D0',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  redDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#EF4444',
  },

  listeningText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },

  waveContainer: {
    width: '100%',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 10,
  },

  waveBar: {
    width: 6,
    borderRadius: 4,
    backgroundColor: '#FF5A79',
  },

  recordingPhrase: {
    fontSize: 13,
    fontWeight: '600',
    color: '#121C2A',
    marginTop: 8,
  },

  speakClearly: {
    fontSize: 11,
    color: '#7E8B9B',
    marginTop: 3,
  },

  finishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#B52046',
    borderRadius: 999,
    paddingHorizontal: 22,
    paddingVertical: 11,
    marginTop: 16,
    elevation: 2,
  },

  stopSquare: {
    width: 11,
    height: 11,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },

  finishText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* FEEDBACK */

  feedbackView: {
    paddingVertical: 2,
  },

  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  greatJobRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  partyEmoji: {
    fontSize: 16,
  },

  greatJob: {
    fontSize: 14,
    fontWeight: '700',
    color: '#121C2A',
  },

  reviewPill: {
    backgroundColor: '#E6F4EA',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  reviewText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#006D3C',
  },

  playbackCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DCE5F5',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },

  playRecordingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF5A79',
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressArea: {
    flex: 1,
  },

  progressTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  voiceLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#594043',
  },

  voiceDuration: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7E8B9B',
  },

  progressTrack: {
    height: 7,
    backgroundColor: '#F0F2F5',
    borderRadius: 999,
    overflow: 'hidden',
  },

  progressFill: {
    width: '75%',
    height: '100%',
    backgroundColor: '#FF5A79',
    borderRadius: 999,
  },

  reviewButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },

  recordAgainButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D2D6DC',
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
  },

  recordAgainText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#121C2A',
  },

  savedPracticeButton: {
    flex: 1,
    backgroundColor: '#FF5A79',
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
  },

  savedPracticeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* INSIGHTS */

  insightsCard: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#EDF0F4',
    padding: 20,
    elevation: 2,
  },

  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  insightsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },

  sparkleCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFF0F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  insightsTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: '#121C2A',
  },

  safePill: {
    backgroundColor: '#F1F4F8',
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 6,
  },

  safeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#687587',
  },

  insightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  insightLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
    flex: 1,
  },

  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#D9F5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  insightTitle: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
    color: '#121C2A',
  },

  insightDescription: {
    fontSize: 11,
    lineHeight: 16,
    color: '#594043',
  },

  insightValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#006D3C',
    marginLeft: 8,
  },

  highlightText: {
    color: '#FF5A79',
    fontWeight: '600',
  },

  mindsetCard: {
    backgroundColor: '#FFF5F8',
    borderWidth: 1,
    borderColor: '#FFDDE5',
    borderRadius: 20,
    padding: 13,
    marginTop: 18,
  },

  mindsetTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#B52046',
  },

  mindsetText: {
    fontSize: 11,
    lineHeight: 18,
    color: '#594043',
    marginTop: 5,
  },

  /* CTA */

  ctaArea: {
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },

  practiceMoreButton: {
    width: '100%',
    height: 56,
    borderRadius: 999,
    backgroundColor: '#FF5A79',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 3,
  },

  practiceMoreText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  ctaNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 9,
    gap: 4,
  },

  timerEmoji: {
    fontSize: 12,
  },

  ctaNoteText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 17,
    color: '#7E8B9B',
  },
});
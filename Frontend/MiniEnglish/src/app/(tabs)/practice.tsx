import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { TranslationResult } from '@/types/situation';
import {SavedPhrase} from '@/types/situation'
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import HomeHeader from '@/components/home/HomeHeader';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function Practice() {
  const [inputText, setInputText] = useState('');
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null);
  const [isTransalting, setIsTranslating]= useState(false);
  const [translationError, setTranslationError]= useState<string | null>(null);
  const [isSaved, setIsSaved]= useState(false)

  const suggestions = [
    'haath dho lo',
    'jump mat karo',
    'toys samet lena',
  ];


  async function SavedMyPhrase() {
  try {
    if (!translationResult) {
      return;
    }

    const existingData =
      await AsyncStorage.getItem('saved_phrases');

    const existingPhrases: SavedPhrase[] =
      existingData ? JSON.parse(existingData) : [];

    // Already saved hai → remove karo
    if (isSaved) {
      const updatedPhrases = existingPhrases.filter(
        (phrase) =>
          phrase.naturalEnglish !==
          translationResult.naturalEnglish
      );

      await AsyncStorage.setItem(
        'saved_phrases',
        JSON.stringify(updatedPhrases)
      );

      setIsSaved(false);

      console.log('Removed from My Phrases');
      return;
    }

    // Saved nahi hai → save karo
    const savedPhrase: SavedPhrase = {
      id: `generated-${Date.now()}`,
      originalText: inputText.trim(),
      naturalEnglish: translationResult.naturalEnglish,
      tone: translationResult.tone,
      category: 'Hindi to English',
      alternatives: translationResult.alternatives,
      savedAt: new Date().toISOString(),
    };

    await AsyncStorage.setItem(
      'saved_phrases',
      JSON.stringify([
        ...existingPhrases,
        savedPhrase,
      ])
    );

    setIsSaved(true);

    console.log('Saved to My Phrases');
  } catch (error) {
    console.error('Error updating saved phrase:', error);
  }
}
  
  return (
  <SafeAreaView style={styles.container} edges={['top']}>
    <HomeHeader subtitle="Practice Studio" />

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Top Navigation */}
      <View style={styles.topRow}>
        <Pressable style={styles.backButton}>
          <MaterialIcons
            name="chevron-left"
            size={22}
            color="#594043"
          />

          <Text style={styles.backText}>
            Back
          </Text>
        </Pressable>

        <View style={styles.translatorPill}>
          <MaterialIcons
            name="translate"
            size={15}
            color="#B52046"
          />

          <Text style={styles.translatorText}>
            Instant Translator
          </Text>
        </View>
      </View>

      {/* Page Heading */}
      <View style={styles.headingSection}>
        <Text style={styles.heading}>
          Hindi to English
        </Text>

        <Text style={styles.description}>
          Turn everyday motherly Hinglish or Hindi into cozy, natural English.
        </Text>
      </View>

      {/* Input Card */}
      <View style={styles.inputCard}>
        <View style={styles.inputHeader}>
          <View style={styles.inputHeaderText}>
            <Text style={styles.inputTitle}>
              Type your Hindi sentence
            </Text>

            <Text style={styles.inputSubtitle}>
              (जैसा आप बोलते हैं – naturally at home)
            </Text>
          </View>

          <Text style={styles.languageText}>
            Hinglish / हिन्दी
          </Text>
        </View>

        <View style={styles.textInputWrapper}>
          <TextInput
            value={inputText}
            onChangeText={(text)=>{
              setInputText(text);
              setTranslationResult(null);
              setTranslationError(null)
            }}
            placeholder="beta apne shoes pehen lo"
            placeholderTextColor="#594043"
            multiline
            textAlignVertical="top"
            style={styles.textInput}
          />

          {inputText.length > 0 ? (
            <Pressable
              style={styles.clearButton}
              onPress={() => setInputText('')}
            >
              <MaterialIcons
                name="close"
                size={18}
                color="#594043"
              />
            </Pressable>
          ) : null}
        </View>

        {/* Suggestions */}
        <View style={styles.suggestionsRow}>
          <Text style={styles.tryText}>
            Try:
          </Text>

          {suggestions.map((suggestion) => (
            <Pressable
              key={suggestion}
              style={styles.suggestionChip}
              onPress={() => setInputText(suggestion)}
            >
              <Text style={styles.suggestionText}>
                {suggestion}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Translate */}
        <Pressable
          style={[
            styles.translateButton,
            !inputText.trim() &&
              styles.translateButtonDisabled,
          ]}
          disabled={!inputText.trim()}
          onPress={async() => {
            try{
              setIsTranslating(true);
              setTranslationError(null);
              const response= await fetch(`${API_URL}/api/translate`,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  text: inputText,
                })
              })
              if(!response.ok){
                throw new Error('Translation  request failed');
              }
              const data= await response.json();
              setTranslationResult(data);
              }catch (error) {
                console.error('Translation error:', error);
                setTranslationError(
              'Sorry, we could not translate that. Please try again.');
            }finally{
              setIsTranslating(false);
            }
          }}
        >
          <MaterialIcons
            name="auto-awesome"
            size={19}
            color="#FFFFFF"
          />

          <Text style={styles.translateButtonText}>
            {isTransalting ? 'Translating....' : 'Translate'}
          </Text>
        </Pressable>
      </View>

      {/* Bunny Mommy Note */}
      <View style={styles.noteCard}>
        <View style={styles.noteIcon}>
          <MaterialIcons
            name="pets"
            size={23}
            color="#B52046"
          />
        </View>

        <View style={styles.noteContent}>
          <Text style={styles.noteTitle}>
            Bunny Mommy Note
          </Text>

          <Text
            style={styles.noteText}
            numberOfLines={2}
          >
            We'll turn strict command English into warm, natural phrases.
          </Text>
        </View>
      </View>
      

      {translationError ? (
        <View style={styles.errorCard}>
          <MaterialIcons
            name="error-outline"
            size={20}
            color="#B52046"
          />

          <Text style={styles.errorText}>
            {translationError}
          </Text>
        </View>
      ) : null}

      {/* Translation Result */}
      {translationResult ? (
        <>
          {/* Natural English */}
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={styles.naturalBadge}>
                <MaterialIcons
                  name="check-circle"
                  size={14}
                  color="#006D3C"
                />

                <Text style={styles.naturalBadgeText}>
                  NATURAL ENGLISH
                </Text>
              </View>

              <View style={styles.toneRow}>
                <MaterialIcons
                  name="sentiment-satisfied"
                  size={16}
                  color="#594043"
                />

                <Text style={styles.toneText}>
                  {translationResult.tone}
                </Text>
              </View>
            </View>

            <View style={styles.mainResultBubble}>
              <View style={styles.resultTextContainer}>
                <Text style={styles.resultEnglish}>
                  {translationResult.naturalEnglish}
                </Text>

                <Text style={styles.resultDescription}>
                  Friendly, casual spoken tone for routine time
                </Text>
              </View>

              <Pressable
                style={styles.resultAudioButton}
                onPress={() => {
                  Speech.stop();

                  Speech.speak(
                    translationResult.naturalEnglish,
                    {
                      language: 'en-US',
                      rate: 0.85,
                      pitch: 1.0
                    }
                  )
                }}
              >
                <MaterialIcons
                  name="volume-up"
                  size={23}
                  color="#B52046"
                />
              </Pressable>
            </View>

            {/* More Natural Options */}
            <View style={styles.moreOptionsHeader}>
              <Text style={styles.moreOptionsTitle}>
                More Natural Options
              </Text>

              <Text style={styles.momApproved}>
                Mom Approved
              </Text>
            </View>

            <View style={styles.optionsList}>
                {translationResult.alternatives.map(
                  (alternative, index) => (
                    <Pressable
                      key={`${alternative.english}-${index}`}
                      style={styles.optionCard}
                    onPress={() => {
                      router.push({
                        pathname: '/phrase-upgrade/[id]',
                        params: {
                          id: alternative.english,
                          naturalEnglish: translationResult.naturalEnglish,
                          tone: translationResult.tone,
                          evenMoreNatural: translationResult.evenMoreNatural,
                          hindiEquivalent: translationResult.hindiEquivalent,
                          whyBetter: translationResult.whyBetter,
                          mindsetTip: translationResult.mindsetTip,
                  },
                });
              }}
              >
                        <View style={styles.optionLeft}>
                          <View style={styles.optionDot} />

                          <View style={styles.optionTextContainer}>
                            <Text style={styles.optionEnglish}>
                              {alternative.english}
                            </Text>

                            <Text style={styles.optionDescription}>
                              {alternative.description}
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                    )
                  )}
                </View>

            {/* Save */}
            <Pressable
              style={styles.saveButton}
              onPress={SavedMyPhrase}
            >
              <MaterialIcons
                name="favorite-border"
                size={21}
                color="#B52046"
              />

              <Text style={styles.saveButtonText}>
                Save to My Phrases
              </Text>
            </Pressable>
          </View>
        </>
      ) : null}
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
    paddingBottom: 110,
  },

  /* Top */

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingRight: 8,
    marginLeft: -6,
  },

  backText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: '#594043',
  },

  translatorPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFE0E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  translatorText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    color: '#B52046',
  },

  /* Heading */

  headingSection: {
    marginTop: 24,
  },

  heading: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    color: '#121C2A',
    letterSpacing: -0.5,
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: '#594043',
    marginTop: 4,
  },

  /* Input */

  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 20,
    marginTop: 22,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  inputHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },

  inputHeaderText: {
    flex: 1,
  },

  inputTitle: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '600',
    color: '#121C2A',
  },

  inputSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: '#594043',
    marginTop: 4,
  },

  languageText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: '#B52046',
    marginTop: 3,
  },

  textInputWrapper: {
    position: 'relative',
    marginTop: 14,
  },

  textInput: {
    minHeight: 130,
    backgroundColor: '#EFF4FF',
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingRight: 45,

    fontSize: 18,
    lineHeight: 25,
    color: '#121C2A',
  },

  clearButton: {
    position: 'absolute',
    right: 12,
    top: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DEE9FC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Suggestions */

  suggestionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: 14,
  },

  tryText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#594043',
    marginRight: 2,
  },

  suggestionChip: {
    backgroundColor: '#EFF4FF',
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },

  suggestionText: {
    fontSize: 11,
    lineHeight: 14,
    color: '#594043',
  },

  /* Translate */

  translateButton: {
    height: 52,
    borderRadius: 999,
    backgroundColor: '#FF5A79',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,

    marginTop: 20,

    shadowColor: '#FF5A79',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 3,
  },

  translateButtonDisabled: {
    opacity: 0.55,
  },

  translateButtonText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* Bunny Note */

  noteCard: {
    backgroundColor: '#EFF4FF',
    borderRadius: 28,
    padding: 12,
    marginTop: 16,

    flexDirection: 'row',
    alignItems: 'center',
  },

  noteIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  noteContent: {
    flex: 1,
    marginLeft: 12,
  },

  noteTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#B52046',
  },

  noteText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#594043',
    marginTop: 2,
  },

  /* Natural English Result */

  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 20,
    marginTop: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  naturalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#73E8A5',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 999,
  },

  naturalBadgeText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    color: '#006D3C',
  },

  toneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  toneText: {
    fontSize: 11,
    lineHeight: 14,
    color: '#594043',
  },

  mainResultBubble: {
    backgroundColor: '#EFF4FF',
    borderRadius: 32,
    padding: 18,
    marginTop: 14,

    flexDirection: 'row',
    alignItems: 'center',
  },

  resultTextContainer: {
    flex: 1,
    paddingRight: 10,
  },

  resultEnglish: {
    fontSize: 25,
    lineHeight: 32,
    fontWeight: '700',
    color: '#121C2A',
  },

  resultDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: '#594043',
    marginTop: 5,
  },

  resultAudioButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFD9DE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* More Options */

  moreOptionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 10,
  },

  moreOptionsTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: '#121C2A',
  },

  momApproved: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    color: '#B52046',
  },

  optionsList: {
    gap: 8,
  },

  optionCard: {
    backgroundColor: '#F8F9FF',
    borderRadius: 28,
    paddingHorizontal: 14,
    paddingVertical: 12,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  optionLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },

  optionDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#B52046',
    marginRight: 10,
  },

  optionTextContainer: {
    flex: 1,
    minWidth: 0,
  },

  optionEnglish: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '500',
    color: '#121C2A',
  },

  optionDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: '#594043',
    marginTop: 1,
  },

  optionAudioButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  /* Save */

  saveButton: {
    height: 52,
    borderRadius: 999,
    backgroundColor: '#EFF4FF',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,

    marginTop: 18,
  },

  saveButtonText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#B52046',
  },
  errorCard: {
  backgroundColor: '#FFE0E8',
  borderRadius: 20,
  padding: 14,
  marginTop: 16,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
},

errorText: {
  flex: 1,
  fontSize: 13,
  lineHeight: 18,
  color: '#B52046',
},
});
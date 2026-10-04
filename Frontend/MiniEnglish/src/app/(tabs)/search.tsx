import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import type { Situation } from '@/types/situation';

export default function SearchScreen() {
  const router = useRouter();

  const [situations, setSituations] = useState<Situation[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSituations = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/api/situations`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch situations');
        }

        const data: Situation[] = await response.json();

        setSituations(data);
      } catch (error) {
        console.error('Error fetching situations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSituations();
  }, []);

  const popularSituations = useMemo(() => {
    return situations.filter(
      (situation) => Boolean(situation.is_popular)
    );
  }, [situations]);

  const filteredSituations = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return situations.filter((situation) => {
      const name = situation.name.toLowerCase();

      const keywords =
        situation.search_keywords?.toLowerCase() ?? '';

      const matchesSearch =
        query.length === 0 ||
        name.includes(query) ||
        keywords.includes(query);

      const matchesFilter =
        selectedFilter === 'all' ||
        situation.slug === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [situations, searchText, selectedFilter]);

  const resetFilters = () => {
    setSearchText('');
    setSelectedFilter('all');
  };

  const openSituation = (situation: Situation) => {
    router.push(`/situation/${situation.id}`);
  };

  const renderIcon = (
    icon: string | null,
    size: number = 26
  ) => {
    if (!icon) {
      return (
        <MaterialIcons
          name="category"
          size={size}
          color="#B52046"
        />
      );
    }

    return (
      <MaterialIcons
        name={icon as keyof typeof MaterialIcons.glyphMap}
        size={size}
        color="#B52046"
      />
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoEmoji}>🐰</Text>
            </View>

            <View>
              <Text style={styles.appName}>MiniEnglish</Text>
              <Text style={styles.headerSubtitle}>
                Search Routines
              </Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <Pressable style={styles.headerIconButton}>
              <MaterialIcons
                name="notifications-none"
                size={24}
                color="#594043"
              />
            </Pressable>

            <View style={styles.profileCircle}>
              <MaterialIcons
                name="person-outline"
                size={20}
                color="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Find a Routine</Text>

            <View style={styles.topicBadge}>
              <MaterialIcons
                name="auto-stories"
                size={14}
                color="#630022"
              />

              <Text style={styles.topicBadgeText}>
                {situations.length} Topics
              </Text>
            </View>
          </View>

          <Text style={styles.subtitle}>
            Search for a situation and start speaking naturally with
            your toddler.
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <MaterialIcons
            name="search"
            size={24}
            color="#B52046"
          />

          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="What do you want to practice?"
            placeholderTextColor="#8D7072"
            style={styles.searchInput}
          />

          {searchText.length > 0 && (
            <Pressable
              onPress={() => setSearchText('')}
              style={styles.clearButton}
            >
              <MaterialIcons
                name="close"
                size={18}
                color="#594043"
              />
            </Pressable>
          )}
        </View>

        {/* Popular */}
        <View style={styles.popularSection}>
          <View style={styles.sectionHeadingRow}>
            <View style={styles.sectionTitleGroup}>
              <MaterialIcons
                name="local-fire-department"
                size={18}
                color="#B52046"
              />

              <Text style={styles.sectionTitle}>
                Popular Routines
              </Text>
            </View>

            <Text style={styles.tapToFilter}>
              Tap to filter
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsContent}
          >
            <Pressable
              onPress={() => setSelectedFilter('all')}
              style={[
                styles.chip,
                selectedFilter === 'all' && styles.activeChip,
              ]}
            >
              {selectedFilter === 'all' && (
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={13}
                  color="#FFFFFF"
                />
              )}

              <Text
                style={[
                  styles.chipText,
                  selectedFilter === 'all' &&
                    styles.activeChipText,
                ]}
              >
                All
              </Text>
            </Pressable>

            {popularSituations.map((situation) => {
              const active =
                selectedFilter === situation.slug;

              return (
                <Pressable
                  key={situation.id}
                  onPress={() =>
                    setSelectedFilter(situation.slug)
                  }
                  style={[
                    styles.chip,
                    active && styles.activeChip,
                  ]}
                >
                  {renderIcon(situation.icon, 17)}

                  <Text
                    style={[
                      styles.chipText,
                      active && styles.activeChipText,
                    ]}
                  >
                    {situation.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Parenting Reminder */}
        <View style={styles.reminderCard}>
          <View style={styles.reminderIcon}>
            <MaterialIcons
              name="favorite"
              size={20}
              color="#B52046"
            />
          </View>

          <View style={styles.reminderContent}>
            <Text style={styles.reminderTitle}>
              Gentle Parenting Reminder
            </Text>

            <Text style={styles.reminderText}>
              Repetition in everyday moments creates comforting
              bonds. Try introducing 1 new phrase today!
            </Text>
          </View>
        </View>

        {/* All Routines */}
        <View style={styles.routinesSection}>
          <View style={styles.routinesHeader}>
            <View style={styles.routinesTitleGroup}>
              <Text style={styles.sectionTitle}>
                All Routines
              </Text>

              <View style={styles.countBadge}>
                <Text style={styles.countBadgeText}>
                  {filteredSituations.length}{' '}
                  {filteredSituations.length === 1
                    ? 'situation'
                    : 'situations'}
                </Text>
              </View>
            </View>

            <Pressable onPress={resetFilters}>
              <Text style={styles.resetText}>Reset</Text>
            </Pressable>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                size="small"
                color="#B52046"
              />
            </View>
          ) : filteredSituations.length > 0 ? (
            <View style={styles.routinesList}>
              {filteredSituations.map((situation) => (
                <Pressable
                  key={situation.id}
                  onPress={() => openSituation(situation)}
                  style={({ pressed }) => [
                    styles.routineCard,
                    pressed && styles.routineCardPressed,
                  ]}
                >
                  <View style={styles.routineLeft}>
                    <View style={styles.routineIconBox}>
                      {renderIcon(situation.icon, 27)}
                    </View>

                    <View style={styles.routineTextContainer}>
                      <View style={styles.routineTitleRow}>
                        <Text
                          style={styles.routineName}
                          numberOfLines={1}
                        >
                          {situation.name}
                        </Text>

                        <View style={styles.phraseBadge}>
                          <Text style={styles.phraseBadgeText}>
                            {situation.phrase_count} phrases
                          </Text>
                        </View>
                      </View>

                      <Text
                        style={styles.routineDescription}
                        numberOfLines={1}
                      >
                        {situation.description ??
                          'Everyday English routines with your child'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.chevronCircle}>
                    <MaterialIcons
                      name="chevron-right"
                      size={21}
                      color="#8D7072"
                    />
                  </View>
                </Pressable>
              ))}
            </View>
          ) : (
            /* Empty state */
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <MaterialIcons
                  name="search-off"
                  size={44}
                  color="#B52046"
                />
              </View>

              <Text style={styles.emptyTitle}>
                No routines found
              </Text>

              <Text style={styles.emptyText}>
                Try searching for another situation like{' '}
                <Text style={styles.emptyHighlight}>
                  "park"
                </Text>
                ,{' '}
                <Text style={styles.emptyHighlight}>
                  "food"
                </Text>
                , or{' '}
                <Text style={styles.emptyHighlight}>
                  "sleep"
                </Text>
                .
              </Text>

              <Pressable
                onPress={resetFilters}
                style={styles.emptyButton}
              >
                <MaterialIcons
                  name="restart-alt"
                  size={18}
                  color="#FFFFFF"
                />

                <Text style={styles.emptyButtonText}>
                  Clear Search
                </Text>
              </Pressable>
            </View>
          )}
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

  scrollContent: {
    paddingBottom: 32,
  },

  /* Header */

  header: {
    height: 88,
    paddingHorizontal: 16,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FF',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoPlaceholder: {
    width: 32,
    height: 32,
    marginRight: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  logoEmoji: {
    fontSize: 20,
  },

  appName: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
    color: '#B52046',
  },

  headerSubtitle: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '500',
    color: '#594043',
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  headerIconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B52046',
  },

  /* Intro */

  intro: {
    paddingHorizontal: 16,
    paddingTop: 2,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: '#121C2A',
  },

  topicBadge: {
    height: 24,
    paddingHorizontal: 9,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FFD9DD',
  },

  topicBadgeText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    color: '#630022',
  },

  subtitle: {
    marginTop: 2,
    maxWidth: 350,
    fontSize: 14,
    lineHeight: 20,
    color: '#594043',
  },

  /* Search */

  searchBox: {
    height: 56,
    marginHorizontal: 16,
    marginTop: 18,
    paddingHorizontal: 16,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#FF5A79',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    marginLeft: 12,
    paddingVertical: 0,
    fontSize: 16,
    fontWeight: '500',
    color: '#121C2A',
  },

  clearButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6EEFF',
  },

  /* Popular */

  popularSection: {
    marginTop: 20,
  },

  sectionHeadingRow: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: '#121C2A',
  },

  tapToFilter: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    color: '#8D7072',
  },

  chipsContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 2,
    gap: 8,
  },

  chip: {
    minHeight: 32,
    paddingHorizontal: 14,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    shadowColor: '#121C2A',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },

  activeChip: {
    backgroundColor: '#B52046',
    shadowColor: '#B52046',
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },

  chipText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#121C2A',
  },

  activeChipText: {
    color: '#FFFFFF',
  },

  /* Reminder */

  reminderCard: {
    marginHorizontal: 16,
    marginTop: 18,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#E6EEFF',
  },

  reminderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD9DC',
  },

  reminderContent: {
    flex: 1,
  },

  reminderTitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#B52046',
  },

  reminderText: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 18,
    color: '#594043',
  },

  /* Routines */

  routinesSection: {
    marginTop: 18,
    paddingHorizontal: 16,
  },

  routinesHeader: {
    minHeight: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  routinesTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: '#E6EEFF',
  },

  countBadgeText: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '500',
    color: '#594043',
  },

  resetText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    color: '#B52046',
  },

  routinesList: {
    marginTop: 8,
    gap: 10,
  },

  routineCard: {
    minHeight: 72,
    padding: 14,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    shadowColor: '#FF5A79',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 1,
  },

  routineCardPressed: {
    transform: [{ scale: 0.99 }],
  },

  routineLeft: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  routineIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DEE9FC',
  },

  routineTextContainer: {
    flex: 1,
    minWidth: 0,
    marginLeft: 14,
  },

  routineTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    minWidth: 0,
  },

  routineName: {
    flexShrink: 1,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: '#121C2A',
  },

  phraseBadge: {
    flexShrink: 0,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: '#EFF4FF',
  },

  phraseBadgeText: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '500',
    color: '#B52046',
  },

  routineDescription: {
    marginTop: 1,
    fontSize: 13,
    lineHeight: 18,
    color: '#594043',
  },

  chevronCircle: {
    width: 30,
    height: 30,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Loading */

  loadingContainer: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Empty */

  emptyState: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 40,
    borderRadius: 24,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  emptyIcon: {
    width: 96,
    height: 96,
    marginBottom: 16,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD9DC',
  },

  emptyTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    color: '#121C2A',
  },

  emptyText: {
    maxWidth: 280,
    marginTop: 4,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    color: '#594043',
  },

  emptyHighlight: {
    fontWeight: '600',
    color: '#B52046',
  },

  emptyButton: {
    height: 44,
    paddingHorizontal: 24,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#B52046',
  },

  emptyButtonText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
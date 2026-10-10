import { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getCurrentUser } from '@/utils/authApi';
import HomeHeader from '@/components/home/HomeHeader';

const COLORS = {
  primary: '#B52046',
  secondary: '#B4204B',
  surface: '#F8F9FF',
  white: '#FFFFFF',
  text: '#121C2A',
  muted: '#594043',
  softBlue: '#EFF4FF',
  blue: '#E6EEFF',
  blueHigh: '#DEE9FC',
  pink: '#FFD9DD',
  pinkLight: '#FFF0F2',
  green: '#006D3C',
  greenLight: '#88F9B0',
  greenContainer: '#33A968',
};

type User = {
  id: number;
  name: string;
  email: string;
  avatar_url?: string | null;
};

function StatCard({
  title,
  value,
  suffix,
  subtitle,
  icon,
  iconBackground,
  iconColor,
  valueColor = COLORS.text,
  children,
}: {
  title: string;
  value: string | number;
  suffix?: string;
  subtitle: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  iconBackground: string;
  iconColor: string;
  valueColor?: string;
  children?: React.ReactNode;
}) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statTop}>
        <Text style={styles.statLabel}>{title}</Text>
        <View
          style={[
            styles.statIcon,
            { backgroundColor: iconBackground },
          ]}
        >
          <MaterialIcons name={icon} size={19} color={iconColor} />
        </View>
      </View>

      <View style={styles.statValueRow}>
        <Text style={[styles.statValue, { color: valueColor }]}>
          {value}
        </Text>
        {suffix ? <Text style={styles.statSuffix}>{suffix}</Text> : null}
      </View>

      {children}

      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </View>
  );
}

function SectionHeading({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {right}
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [celebrated, setCelebrated] = useState(false);

  useEffect(() => {
    let active = true;

    getCurrentUser()
      .then((data) => {
        if (active && data) {
          setUser(data);
        }
      })
      .catch((error) => {
        console.error('Profile user fetch error:', error);
      });

    return () => {
      active = false;
    };
  }, []);

  const displayName = user?.name || 'Parent Profile';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
         <HomeHeader subtitle="Parent Profile" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.pageHeading}>
          <View style={styles.headingCopy}>
            <Text style={styles.pageTitle}>My Progress 📈</Text>
            <Text style={styles.pageSubtitle}>
              Tracking your small wins with your toddler
            </Text>
          </View>

          <Pressable
            onPress={() => {
              setCelebrated(true);
              Alert.alert(
                'You are doing amazing! 💕',
                'Every little word counts. Keep practising together.'
              );
            }}
            style={styles.celebrateButton}
          >
            <MaterialIcons
              name={celebrated ? 'favorite' : 'celebration'}
              size={18}
              color={COLORS.primary}
            />
            <Text style={styles.celebrateText}>
              {celebrated ? 'Woohoo!' : 'Celebrate'}
            </Text>
          </Pressable>
        </View>

        <SectionHeading
          title="🔴  This Week"
          right={<Text style={styles.weekBadge}>Mon – Sun</Text>}
        />

        <View style={styles.statsGrid}>
          <StatCard
            title="Days Active"
            value="0"
            suffix="/7"
            subtitle="Days practised this week"
            icon="calendar-today"
            iconBackground={COLORS.softBlue}
            iconColor={COLORS.primary}
          >
            <View style={styles.weekDots}>
              {Array.from({ length: 7 }).map((_, index) => (
                <View key={index} style={styles.inactiveDot} />
              ))}
            </View>
          </StatCard>

          <StatCard
            title="Phrases Used"
            value="0"
            subtitle="Practice activity will appear here"
            icon="record-voice-over"
            iconBackground={COLORS.pink}
            iconColor={COLORS.secondary}
          />

          <StatCard
            title="Challenges"
            value="0"
            suffix="done"
            subtitle="5-min daily bursts"
            icon="task-alt"
            iconBackground={COLORS.greenLight}
            iconColor={COLORS.green}
          />

          <StatCard
            title="Streak 🔥"
            value="0"
            suffix="Days"
            subtitle="Your streak starts here"
            icon="local-fire-department"
            iconBackground={COLORS.pinkLight}
            iconColor={COLORS.primary}
            valueColor={COLORS.primary}
          />
        </View>

        <View style={styles.encouragement}>
          <View style={styles.clapCircle}>
            <Text style={styles.clapEmoji}>👏</Text>
          </View>
          <View style={styles.encouragementCopy}>
            <Text style={styles.encouragementTitle}>
              You are doing amazing!
            </Text>
            <Text style={styles.encouragementSubtitle}>
              Keep it up! Little ears are learning every day 💕
            </Text>
          </View>
        </View>

        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <View style={styles.levelIcon}>
              <MaterialIcons
                name="military-tech"
                size={30}
                color={COLORS.primary}
              />
            </View>

            <View style={styles.levelTitleCopy}>
              <Text style={styles.statusLabel}>STATUS • XP Points</Text>
              <Text style={styles.levelTitle}>
                Level 1 – Curious Mom
              </Text>
            </View>

            <View style={styles.trophyCircle}>
              <MaterialIcons
                name="workspace-premium"
                size={22}
                color={COLORS.green}
              />
            </View>
          </View>

          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>Progress to Level 2</Text>
            <Text style={styles.progressValue}>0 / 200 XP</Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '0%' }]} />
          </View>

          <View style={styles.levelFooter}>
            <Text style={styles.levelFooterText}>Curious Mom</Text>
            <Text style={styles.levelFooterText}>
              Next: Fluent Companion
            </Text>
          </View>
        </View>

        <SectionHeading
          title="Unlocked Milestones"
          right={<Text style={styles.milestoneCount}>0 Unlocked</Text>}
        />

        <View style={styles.milestones}>
          <Milestone
            title="Morning Pro"
            description="Complete morning routines"
            icon="wb-sunny"
            background={COLORS.pink}
            iconColor={COLORS.primary}
          />
          <Milestone
            title="Park Chat"
            description="Practise outdoor phrases"
            icon="park"
            background={COLORS.greenLight}
            iconColor={COLORS.green}
          />
          <Milestone
            title="Bedtime Tales"
            description="Practise bedtime phrases"
            icon="bedtime"
            background={COLORS.blueHigh}
            iconColor={COLORS.muted}
          />
        </View>

        <View style={styles.practiceCard}>
          <View style={styles.practiceHeader}>
            <View style={styles.practiceTitleRow}>
              <MaterialIcons
                name="insights"
                size={22}
                color={COLORS.primary}
              />
              <Text style={styles.practiceTitle}>
                Today’s Practice Log
              </Text>
            </View>

            <Text style={styles.pendingBadge}>Not started</Text>
          </View>

          <View style={styles.emptyPractice}>
            <View style={styles.emptyIcon}>
              <MaterialIcons
                name="menu-book"
                size={25}
                color={COLORS.primary}
              />
            </View>
            <View style={styles.emptyCopy}>
              <Text style={styles.emptyTitle}>
                Your practice journey starts here
              </Text>
              <Text style={styles.emptySubtitle}>
                Complete a practice session to see your activity here.
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => router.push('/practice')}
            style={styles.reviewButton}
          >
            <MaterialIcons
              name="play-circle-outline"
              size={20}
              color={COLORS.primary}
            />
            <Text style={styles.reviewButtonText}>
              Start Practising
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => router.push('/profile/settings')}
          style={styles.settingsButton}
        >
          <MaterialIcons
            name="manage-accounts"
            size={21}
            color={COLORS.primary}
          />
          <Text style={styles.settingsButtonText}>
            Parent Profile & Settings
          </Text>
          <MaterialIcons
            name="chevron-right"
            size={23}
            color={COLORS.primary}
          />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function Milestone({
  title,
  description,
  icon,
  background,
  iconColor,
}: {
  title: string;
  description: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  background: string;
  iconColor: string;
}) {
  return (
    <View style={styles.milestoneCard}>
      <View style={[styles.milestoneIcon, { backgroundColor: background }]}>
        <MaterialIcons name={icon} size={23} color={iconColor} />
      </View>
      <Text style={styles.milestoneTitle}>{title}</Text>
      <Text style={styles.milestoneDescription}>{description}</Text>
      <Text style={styles.lockedLabel}>Not yet unlocked</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  brandLogo: {
    width: 36,
    height: 36,
    backgroundColor: COLORS.white,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 21,
    fontWeight: '600',
    color: COLORS.primary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.muted,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 36,
    gap: 20,
  },
  pageHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  headingCopy: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 25,
    lineHeight: 32,
    fontWeight: '700',
    color: COLORS.text,
  },
  pageSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.muted,
    marginTop: 2,
  },
  celebrateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: COLORS.pink,
  },
  celebrateText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  weekBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    backgroundColor: COLORS.softBlue,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    flexGrow: 1,
    flexBasis: '45%',
    minHeight: 172,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 15,
    justifyContent: 'space-between',
    shadowColor: '#121C2A',
    shadowOpacity: 0.035,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  statTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 4,
  },
  statLabel: {
    flex: 1,
    fontSize: 12,
    color: COLORS.muted,
    paddingTop: 5,
  },
  statIcon: {
    width: 35,
    height: 35,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginTop: 13,
  },
  statValue: {
    fontSize: 29,
    fontWeight: '700',
  },
  statSuffix: {
    fontSize: 17,
    color: COLORS.muted,
  },
  statSubtitle: {
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.muted,
    marginTop: 12,
  },
  weekDots: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 12,
  },
  inactiveDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.blueHigh,
  },
  encouragement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 21,
    backgroundColor: COLORS.pink,
  },
  clapCircle: {
    width: 43,
    height: 43,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clapEmoji: {
    fontSize: 23,
  },
  encouragementCopy: {
    flex: 1,
  },
  encouragementTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
  },
  encouragementSubtitle: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.muted,
    marginTop: 3,
  },
  levelCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 17,
    gap: 16,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  levelIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.softBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelTitleCopy: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 3,
  },
  levelTitle: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '700',
    color: COLORS.text,
  },
  trophyCircle: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: COLORS.softBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.text,
  },
  progressValue: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
  progressTrack: {
    height: 12,
    borderRadius: 10,
    backgroundColor: COLORS.blueHigh,
    padding: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  levelFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  levelFooterText: {
    fontSize: 10,
    color: COLORS.muted,
  },
  milestoneCount: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  milestones: {
    flexDirection: 'row',
    gap: 9,
  },
  milestoneCard: {
    flex: 1,
    minWidth: 0,
    minHeight: 165,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 13,
    gap: 7,
  },
  milestoneIcon: {
    width: 43,
    height: 43,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  milestoneTitle: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.text,
  },
  milestoneDescription: {
    fontSize: 10,
    lineHeight: 14,
    textAlign: 'center',
    color: COLORS.muted,
  },
  lockedLabel: {
    fontSize: 9,
    textAlign: 'center',
    color: COLORS.muted,
  },
  practiceCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 16,
    gap: 15,
  },
  practiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  practiceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    flex: 1,
  },
  practiceTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  pendingBadge: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.muted,
    backgroundColor: COLORS.softBlue,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 20,
  },
  emptyPractice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    padding: 12,
    borderRadius: 17,
    backgroundColor: COLORS.softBlue,
  },
  emptyIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCopy: {
    flex: 1,
  },
  emptyTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
  },
  emptySubtitle: {
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.muted,
    marginTop: 4,
  },
  reviewButton: {
    minHeight: 44,
    borderRadius: 24,
    backgroundColor: COLORS.blue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  reviewButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
  },
  settingsButton: {
    minHeight: 54,
    paddingHorizontal: 14,
    borderRadius: 17,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  settingsButtonText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

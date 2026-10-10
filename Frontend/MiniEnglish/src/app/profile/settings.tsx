import { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getCurrentUser } from '@/utils/authApi';
import { removeAuthToken } from '@/utils/authStorage';
import HomeHeader from '@/components/home/HomeHeader';

const COLORS = {
  primary: '#B52046',
  surface: '#F8F9FF',
  white: '#FFFFFF',
  text: '#121C2A',
  muted: '#594043',
  blue: '#E6EEFF',
  softBlue: '#EFF4FF',
  pink: '#FFD9DD',
  pinkLight: '#FFF0F2',
  error: '#BA1A1A',
};

type User = {
  id: number;
  name: string;
  email: string;
  avatar_url?: string | null;
};

export default function ProfileSettingsScreen() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [language, setLanguage] = useState('English');
  const [voiceSpeed, setVoiceSpeed] = useState('Normal');

  useEffect(() => {
    let active = true;

    getCurrentUser()
      .then((data) => {
        if (active && data) {
          setUser(data);
        }
      })
      .catch((error) => {
        console.error('Settings user fetch error:', error);
      });

    return () => {
      active = false;
    };
  }, []);

  function chooseLanguage() {
    Alert.alert('Preferred Language', 'Choose your preferred language.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'English', onPress: () => setLanguage('English') },
      { text: 'Hindi', onPress: () => setLanguage('Hindi') },
      { text: 'Hinglish', onPress: () => setLanguage('Hinglish') },
    ]);
  }

  function chooseVoiceSpeed() {
    Alert.alert('Voice Speed', 'Choose a playback speed.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Slow', onPress: () => setVoiceSpeed('Slow') },
      { text: 'Normal', onPress: () => setVoiceSpeed('Normal') },
      { text: 'Fast', onPress: () => setVoiceSpeed('Fast') },
    ]);
  }

  async function handleLogout() {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out of MiniEnglish?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeAuthToken();
              router.replace('/login');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert(
                'Logout failed',
                'Please try again.'
              );
            }
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HomeHeader subtitle="Profile Setting" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatarRing}>
            <View style={styles.largeAvatar}>
              <MaterialIcons
                name="person"
                size={48}
                color={COLORS.primary}
              />
            </View>
          </View>

          <Text style={styles.profileName}>
            {user?.name || 'Parent Profile'} ❤️
          </Text>

          <Text style={styles.email}>
            {user?.email || 'Loading account details…'}
          </Text>

          <View style={styles.memberBadge}>
            <MaterialIcons
              name="favorite"
              size={16}
              color={COLORS.primary}
            />
            <Text style={styles.memberText}>MiniEnglish Member</Text>
          </View>

          <View style={styles.summaryRow}>
            <SummaryItem value="—" label="Phrases" />
            <SummaryItem value="—" label="Streak 🔥" />
            <SummaryItem value="1" label="Level 🏆" />
          </View>

          <Text style={styles.summaryNote}>
            Your learning statistics will appear as progress tracking
            becomes available.
          </Text>
        </View>

        <View style={styles.settingsCard}>
          <Text style={styles.groupTitle}>ROUTINE & VOICE</Text>

          <View style={styles.settingRow}>
            <SettingIcon icon="alarm" background={COLORS.pink} />

            <View style={styles.settingCopy}>
              <Text style={styles.settingTitle}>Daily Reminder</Text>
              <Text style={styles.settingSubtitle}>
                Practice notification
              </Text>
            </View>

            <Switch
              value={reminderEnabled}
              onValueChange={setReminderEnabled}
              trackColor={{
                false: '#D9E3F6',
                true: '#FF5A79',
              }}
              thumbColor={COLORS.white}
            />
          </View>

          <SettingRow
            icon="translate"
            title="Preferred Language"
            value={language}
            onPress={chooseLanguage}
          />

          <SettingRow
            icon="volume-up"
            title="Voice Speed"
            value={voiceSpeed}
            onPress={chooseVoiceSpeed}
          />
        </View>

        <View style={styles.settingsCard}>
          <Text style={styles.groupTitle}>GENERAL & SUPPORT</Text>

          <SettingRow
            icon="info-outline"
            title="About MiniEnglish"
            subtitle="Made with ❤️ for Moms"
            onPress={() =>
              Alert.alert(
                'About MiniEnglish',
                'MiniEnglish helps parents practise simple, natural English for everyday moments with their toddlers.'
              )
            }
          />

          <SettingRow
            icon="help-outline"
            title="Help & Support"
            onPress={() =>
              Alert.alert(
                'Help & Support',
                'Support contact details can be added here when they are available.'
              )
            }
          />
        </View>

        <Pressable
          onPress={handleLogout}
          style={styles.logoutCard}
        >
          <View style={styles.logoutIcon}>
            <MaterialIcons
              name="logout"
              size={22}
              color={COLORS.error}
            />
          </View>

          <Text style={styles.logoutText}>Logout</Text>

          <MaterialIcons
            name="chevron-right"
            size={23}
            color={COLORS.error}
          />
        </Pressable>

        <View style={styles.footerBanner}>
          <View style={styles.footerIcon}>
            <MaterialIcons
              name="favorite-border"
              size={24}
              color={COLORS.primary}
            />
          </View>

          <View style={styles.footerCopy}>
            <Text style={styles.footerTitle}>
              Every little word counts!
            </Text>
            <Text style={styles.footerText}>
              Your toddler learns best when hearing your warm, loving
              voice.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SummaryItem({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <View style={styles.summaryItem}>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

function SettingIcon({
  icon,
  background,
}: {
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  background: string;
}) {
  return (
    <View style={[styles.settingIcon, { backgroundColor: background }]}>
      <MaterialIcons name={icon} size={21} color={COLORS.primary} />
    </View>
  );
}

function SettingRow({
  icon,
  title,
  subtitle,
  value,
  onPress,
}: {
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  title: string;
  subtitle?: string;
  value?: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.settingRow}
      accessibilityRole="button"
    >
      <SettingIcon icon={icon} background={COLORS.blue} />

      <View style={styles.settingCopy}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle ? (
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        ) : null}
      </View>

      {value ? <Text style={styles.settingValue}>{value}</Text> : null}

      <MaterialIcons
        name="chevron-right"
        size={22}
        color={COLORS.muted}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    height: 64,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandCopy: {
    flex: 1,
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
    width: 39,
    height: 39,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 35,
    gap: 20,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    padding: 23,
    alignItems: 'center',
    shadowColor: '#121C2A',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  avatarRing: {
    width: 94,
    height: 94,
    borderRadius: 50,
    padding: 5,
    backgroundColor: COLORS.pink,
    marginBottom: 13,
  },
  largeAvatar: {
    flex: 1,
    borderRadius: 45,
    backgroundColor: COLORS.pinkLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  email: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 5,
    textAlign: 'center',
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.pink,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 25,
    marginTop: 15,
  },
  memberText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  summaryRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 22,
    paddingTop: 17,
    borderTopWidth: 1,
    borderTopColor: COLORS.softBlue,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },
  summaryLabel: {
    fontSize: 11,
    color: COLORS.muted,
    textAlign: 'center',
  },
  summaryNote: {
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 14,
  },
  settingsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 23,
    padding: 12,
    gap: 5,
    shadowColor: '#121C2A',
    shadowOpacity: 0.035,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  groupTitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    color: COLORS.muted,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 3,
  },
  settingRow: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 10,
    gap: 12,
    borderRadius: 15,
  },
  settingIcon: {
    width: 41,
    height: 41,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingCopy: {
    flex: 1,
    gap: 3,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  settingSubtitle: {
    fontSize: 11,
    lineHeight: 15,
    color: COLORS.muted,
  },
  settingValue: {
    fontSize: 12,
    color: COLORS.muted,
  },
  logoutCard: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderRadius: 22,
    backgroundColor: COLORS.white,
  },
  logoutIcon: {
    width: 41,
    height: 41,
    borderRadius: 24,
    backgroundColor: COLORS.pinkLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.error,
  },
  footerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    padding: 17,
    borderRadius: 23,
    backgroundColor: '#FCEBF0',
  },
  footerIcon: {
    width: 43,
    height: 43,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerCopy: {
    flex: 1,
  },
  footerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  footerText: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.muted,
  },
});

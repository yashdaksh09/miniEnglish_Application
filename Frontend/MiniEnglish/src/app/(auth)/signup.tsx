import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { saveAuthToken } from '@/utils/authStorage';


const API_URL = process.env.EXPO_PUBLIC_API_URL;


export default function SignupScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  async function handleSignup() {
    try{
      const response= await fetch(`${API_URL}/api/auth/signup`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })

      const data= await response.json();

      if(!response.ok){
        Alert.alert('Signup failed', data.message || 'Unable to create account');
        return;
      }

      await saveAuthToken(data.token)

      router.replace('/(tabs)');
    }catch(error){
      console.error('Signup error:', error);

      Alert.alert('Connection error', 'Unable to connect to MiniEnglish. Please try again.')
    }
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
        >
          {/* Top Header */}
          <View style={styles.topHeader}>
            <Pressable
              onPress={() => router.back()}
              style={styles.backButton}
              hitSlop={8}
            >
              <MaterialIcons
                name="arrow-back"
                size={26}
                color="#121C2A"
              />
            </Pressable>

            <View style={styles.topHeaderCenter}>
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida/AEtjO1VS3vsa5v03OtuewySj8FurOqszxKsVpCRyE1xZtHlXmtHmK5s6VsGwsDsZWuBys3XeCGtisrRpn8ZSp4MxLTvrb4Yu-7DgIUyYmBSmlnDoK4hf87Vf7JYy7X_V_bLqgbxOyk4hVwscrdPf8H5bygXTor00AzZCrt8tR-Gue2bFMJVRyAvMwLcyq8SbEYsViw3759ThmyxOaMaEdjXAEJbxXN_9IFHpKBs8xrxc1wXgbCwP',
                }}
                style={styles.topLogo}
              />

              <Text style={styles.topTitle}>Sign Up</Text>
            </View>

            <View style={styles.profileCircle}>
              <MaterialIcons
                name="person"
                size={18}
                color="#FFFFFF"
              />
            </View>
          </View>

          {/* Parent Account Creation Header */}
          <View style={styles.accountHeader}>
            <View style={styles.accountHeaderLeft}>
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida/AEtjO1VS3vsa5v03OtuewySj8FurOqszxKsVpCRyE1xZtHlXmtHmK5s6VsGwsDsZWuBys3XeCGtisrRpn8ZSp4MxLTvrb4Yu-7DgIUyYmBSmlnDoK4hf87Vf7JYy7X_V_bLqgbxOyk4hVwscrdPf8H5bygXTor00AzZCrt8tR-Gue2bFMJVRyAvMwLcyq8SbEYsViw3759ThmyxOaMaEdjXAEJbxXN_9IFHpKBs8xrxc1wXgbCwPUBwMDORrmA',
                }}
                style={styles.accountLogo}
              />

              <View>
                <Text style={styles.accountBrand}>MiniEnglish</Text>

                <Text style={styles.accountSubtitle}>
                  Parent Account Creation
                </Text>
              </View>
            </View>

            <View style={styles.stepBadge}>
              <MaterialIcons
                name="favorite"
                size={14}
                color="#B52046"
              />

              <Text style={styles.stepText}>Step 1 of 2</Text>
            </View>
          </View>

          {/* Hero */}
          <View style={styles.heroCard}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn-gZr_4sc8zNmFkKSrM0keb0ykf5gznVxxAFwmzgbH10s9Gi2DfZQ0vfVylSmCMmSpX1LBYws9ENywWaZDgmvCkOhwriD3MGKq0QEOYIq4JWheidE5FDVCG5i5YMNy6VJnPknCMx0Fuobt_xDS7BdyIJY3zAMNMR1OrX6hzj33_c1bnQBWVWXbJbfgI2dogw4T3LOoPfzXbmvQXdoVtBrX_akJ7vnyt1XzeQze7lRtE9UR1XhgHTQ',
              }}
              style={styles.heroImage}
            />

            <View style={styles.heroOverlay}>
              <View style={styles.heroBadge}>
                <MaterialIcons
                  name="nature-people"
                  size={16}
                  color="#006D3C"
                />

                <Text style={styles.heroBadgeText}>
                  Beginning your natural English journey
                </Text>
              </View>
            </View>
          </View>

          {/* Greeting */}
          <View style={styles.greeting}>
            <Text style={styles.heading}>
              Let's get started! <Text>🌷</Text>
            </Text>

            <Text style={styles.description}>
              Create your MiniEnglish account and start speaking naturally
              with your little one today.
            </Text>
          </View>

          {/* Name */}
          <View style={styles.fieldContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.fieldLabel}>
                Your Name (Mommy / Parent)
              </Text>

              <Text style={styles.fieldHint}>Required</Text>
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons
                name="person-outline"
                size={21}
                color="#8D7072"
              />

              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="e.g., Priya Sharma"
                placeholderTextColor="#8D7072"
                autoCapitalize="words"
                style={styles.input}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.fieldContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.fieldLabel}>Email Address</Text>

              <Text style={styles.fieldHint}>For phrase updates</Text>
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons
                name="mail-outline"
                size={21}
                color="#8D7072"
              />

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="priya@example.com"
                placeholderTextColor="#8D7072"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                style={styles.input}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.fieldContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.fieldLabel}>
                Password (min. 8 characters)
              </Text>

              <Text style={styles.passwordHint}>
                Safe & secure
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons
                name="lock-outline"
                size={21}
                color="#8D7072"
              />

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter a strong password"
                placeholderTextColor="#8D7072"
                secureTextEntry={!showPassword}
                autoComplete="new-password"
                style={styles.input}
              />

              <Pressable
                onPress={() => setShowPassword((previous) => !previous)}
                hitSlop={8}
              >
                <MaterialIcons
                  name={
                    showPassword
                      ? 'visibility-off'
                      : 'visibility'
                  }
                  size={20}
                  color="#8D7072"
                />
              </Pressable>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>
              Confirm Password
            </Text>

            <View style={styles.inputContainer}>
              <MaterialIcons
                name="verified-user"
                size={21}
                color="#8D7072"
              />

              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Re-enter your password"
                placeholderTextColor="#8D7072"
                secureTextEntry={!showConfirmPassword}
                autoComplete="new-password"
                style={styles.input}
              />

              <Pressable
                onPress={() =>
                  setShowConfirmPassword((previous) => !previous)
                }
                hitSlop={8}
              >
                <MaterialIcons
                  name={
                    showConfirmPassword
                      ? 'visibility-off'
                      : 'visibility'
                  }
                  size={20}
                  color="#8D7072"
                />
              </Pressable>
            </View>
          </View>

          {/* Terms */}
          <View style={styles.termsRow}>
            <View style={styles.shieldCircle}>
              <MaterialIcons
                name="shield"
                size={15}
                color="#006D3C"
              />
            </View>

            <Text style={styles.termsText}>
              By creating an account, you agree to our{' '}
              <Text style={styles.termsLink}>
                Terms of Service
              </Text>{' '}
              &{' '}
              <Text style={styles.termsLink}>
                Privacy Policy
              </Text>
              . We keep your toddler’s data completely protected.
            </Text>
          </View>

          {/* Create Account */}
          <Pressable
          onPress={handleSignup}
            style={({ pressed }) => [
              styles.createButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.createButtonText}>
              Create My Account
            </Text>

            <MaterialIcons
              name="arrow-forward"
              size={19}
              color="#FFFFFF"
            />
          </Pressable>

          {/* Login */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>
              Already have an account?
            </Text>

            <Pressable onPress={() => router.push('/login')}>
              <Text style={styles.loginLink}>Log In</Text>
            </Pressable>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />

            <View style={styles.orContainer}>
              <Text style={styles.orText}>OR</Text>
            </View>
          </View>

          {/* Google */}
          <Pressable
            style={({ pressed }) => [
              styles.googleButton,
              pressed && styles.googlePressed,
            ]}
          >
            <Text style={styles.googleIcon}>G</Text>

            <Text style={styles.googleText}>
              Continue with Google
            </Text>
          </Pressable>

          {/* Footer Value Badge */}
          <View style={styles.valueCard}>
            <View style={styles.valueIcon}>
              <MaterialIcons
                name="auto-awesome"
                size={17}
                color="#B52046"
              />
            </View>

            <Text style={styles.valueText}>
              Personalized toddler routine phrases & daily progress
              tracking unlocked immediately after sign up!
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  screen: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 28,
  },

  topHeader: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 44,
    height: 44,
    marginLeft: -8,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  topHeaderCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2,
    gap: 8,
  },

  topLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },

  topTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    color: '#121C2A',
  },

  profileCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B52046',
  },

  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginBottom: 12,
  },

  accountHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },

  accountLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  accountBrand: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    color: '#B52046',
  },

  accountSubtitle: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    color: '#594043',
  },

  stepBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#FFD9DC',
  },

  stepText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    color: '#400011',
  },

  heroCard: {
    height: 144,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: '#EFF4FF',
    marginBottom: 16,
  },

  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 12,
  },

  heroBadge: {
    alignSelf: 'flex-start',
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.88)',
  },

  heroBadgeText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    color: '#121C2A',
  },

  greeting: {
    paddingHorizontal: 4,
    marginBottom: 16,
  },

  heading: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: '#121C2A',
  },

  description: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    color: '#594043',
  },

  fieldContainer: {
    marginBottom: 14,
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  fieldLabel: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: '#121C2A',
    marginBottom: 6,
  },

  fieldHint: {
    fontSize: 11,
    lineHeight: 14,
    color: '#594043',
  },

  passwordHint: {
    fontSize: 11,
    lineHeight: 14,
    color: '#B52046',
    fontWeight: '500',
  },

  inputContainer: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    borderRadius: 0,
    backgroundColor: '#EFF4FF',
  },

  input: {
    flex: 1,
    minHeight: 52,
    fontSize: 14,
    lineHeight: 20,
    color: '#121C2A',
  },

  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: -2,
    marginBottom: 14,
    paddingHorizontal: 4,
  },

  shieldCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#88F9B0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },

  termsText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
    color: '#8D7072',
  },

  termsLink: {
    color: '#B52046',
    fontWeight: '500',
  },

  createButton: {
    height: 52,
    borderRadius: 999,
    backgroundColor: '#B52046',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#B52046',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },

  buttonPressed: {
    transform: [{ scale: 0.99 }],
  },

  createButtonText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 16,
    marginBottom: 18,
  },

  loginText: {
    fontSize: 14,
    color: '#594043',
  },

  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#B52046',
    textDecorationLine: 'underline',
  },

  dividerContainer: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#D9E3F6',
  },

  orContainer: {
    position: 'absolute',
    paddingHorizontal: 12,
    backgroundColor: '#F8F9FF',
  },

  orText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#8D7072',
  },

  googleButton: {
    height: 48,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  googlePressed: {
    backgroundColor: '#EFF4FF',
  },

  googleIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4285F4',
  },

  googleText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: '#121C2A',
  },

  valueCard: {
    width: '100%',
    minHeight: 68,
    borderRadius: 0,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#EFF4FF',
  },

  valueIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,92,128,0.20)',
  },

  valueText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500',
    color: '#594043',
  },
});
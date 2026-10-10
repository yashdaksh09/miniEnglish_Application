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
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { saveAuthToken } from '@/utils/authStorage';

const API_URL = process.env.EXPO_PUBLIC_API_URL;


export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]=useState(false);

  async function handleLogin() {
    if(!email.trim() || !password){
      Alert.alert("Missing information", 'Please enter your email and password');
      return
    }

    try{
      setLoading(true);

      const response= await fetch(`${API_URL}/api/auth/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      })

      const data= await response.json();

      if(!response.ok){
        Alert.alert('Login', data.message || "Invalid email or password");
         return
      }

        await saveAuthToken(data.token);
        router.replace('/(tabs)');
    }catch(error){
    console.error('Login error', error);

    Alert.alert("Connection error", "Unable to connect MiniEnglish. Please try again");
  }finally{
    setLoading(false)
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
          {/* Brand Header */}
          <View style={styles.brandHeader}>
            <View style={styles.brandLeft}>
              <View style={styles.logoCircle}>
                <Image
                  source={{
                    uri: 'https://lh3.googleusercontent.com/aida/AEtjO1VS3vsa5v03OtuewySj8FurOqszxKsVpCRyE1xZtHlXmtHmK5s6VsGwsDsZWuBys3XeCGtisrRpn8ZSp4MxLTvrb4Yu-7DgIUyYmBSmlnDoK4hf87Vf7JYy7X_V_bLqgbxOyk4hVwscrdPf8H5bygXTor00AzZCrt8tR-Gue2bFMJVRyAvMwLcyq8SbEYsViw3759ThmyxOaMaEdjXAEJbxXN_9IFHpKBs8xrxc1wXgbCwPUBwMDORrmA',
                  }}
                  style={styles.logo}
                />
              </View>
              
              <View>
                <Text style={styles.brandName}>MiniEnglish</Text>
                <Text style={styles.brandSubtitle}>
                  Mommy & Toddler English
                </Text>
              </View>
            </View>

            <View style={styles.easyBadge}>
              <MaterialIcons
                name="auto-awesome"
                size={15}
                color="#62001E"
              />
              <Text style={styles.easyText}>Easy & Natural</Text>
            </View>
          </View>

          {/* Hero */}
          <View style={styles.heroCard}>
            <View style={styles.heroImageContainer}>
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYxeQDiJIpNM-9F0d1LPNMp18JqbyyIqdsWG334gFQvcna4uKMb3Co7Wsn5Oy9sSmDy5i_6oaqvUmR-fDF-v41W14CmDn-Ybl_IhZq0eMxYwYNXSNnEajq416_v6keNT8fJO3yZZmhFhjl-OQJWVnFkTfKMobqHsGPzjwWJXLoDv6acIYJSlKc8V8TLCgsQhrmQlW69zAjlQeaLQRH72r53NizZjI7P495BgPzpm9M2JqT_QVKnVuk',
                }}
                style={styles.heroImage}
              />

              <View style={styles.dailyBadge}>
                <View style={styles.dailyDot} />
                <Text style={styles.dailyText}>5 mins daily routine</Text>
              </View>
            </View>
          </View>

          {/* Greeting */}
          <View style={styles.greeting}>
            <Text style={styles.heading}>
              Welcome back, Mommy! <Text>💕</Text>
            </Text>

            <Text style={styles.description}>
              Let's keep building natural English moments with your little one
              today.
            </Text>
          </View>

          {/* Email */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>

            <View style={styles.inputContainer}>
              <MaterialIcons
                name="mail-outline"
                size={22}
                color="#8D7072"
              />

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="mummy@example.com"
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
            <View style={styles.passwordLabelRow}>
              <Text style={styles.fieldLabel}>PASSWORD</Text>

              <Pressable>
                <Text style={styles.forgotPassword}>
                  Forgot Password?
                </Text>
              </Pressable>
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons
                name="lock-outline"
                size={22}
                color="#8D7072"
              />

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#8D7072"
                secureTextEntry={!showPassword}
                autoComplete="password"
                style={styles.input}
              />

              <Pressable
                onPress={() => setShowPassword((previous) => !previous)}
                hitSlop={8}
              >
                <MaterialIcons
                  name={showPassword ? 'visibility-off' : 'visibility'}
                  size={22}
                  color="#8D7072"
                />
              </Pressable>
            </View>
          </View>

          {/* Login Button */}
          <Pressable
            onPress={handleLogin}
            disabled={loading}
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.buttonPressed,
              loading && styles.loginButtonDisabled
            ]}
            
          >
            <Text style={styles.loginButtonText}>{loading ? 'Loading in....':'Log In'}</Text>

            <MaterialIcons
              name="arrow-forward"
              size={20}
              color="#FFFFFF"
            />
          </Pressable>

          {/* Signup */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>New to MiniEnglish?</Text>

            <Pressable onPress={() => router.push('/signup')}>
              <Text style={styles.signupLink}>Create an account</Text>
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
            <Text style={styles.googleText}>Continue with Google</Text>
          </Pressable>

          {/* Practice Note */}
          <View style={styles.practiceNote}>
            <View style={styles.heartCircle}>
              <MaterialIcons
                name="favorite-border"
                size={19}
                color="#B52046"
              />
            </View>

            <View style={styles.practiceTextContainer}>
              <Text style={styles.practiceTitle}>
                No complex grammar rules
              </Text>

              <Text style={styles.practiceSubtitle}>
                Just real spoken phrases for daily routines
              </Text>
            </View>
          </View>

          {/* Privacy */}
          <View style={styles.privacyRow}>
            <MaterialIcons
              name="verified-user"
              size={16}
              color="#8D7072"
            />

            <Text style={styles.privacyText}>
              Your learning journey stays private and secure.
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

  brandHeader: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },

  brandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD9DC',
    padding: 2,
    overflow: 'hidden',
  },

  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },

  brandName: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    color: '#B52046',
  },

  brandSubtitle: {
    fontSize: 11,
    lineHeight: 14,
    color: '#594043',
  },

  easyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: '#E6EEFF',
  },

  easyText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    color: '#62001E',
  },

  heroCard: {
    width: '100%',
    padding: 4,
    marginTop: 4,
    borderRadius: 16,
    backgroundColor: '#EFF4FF',
    overflow: 'hidden',
  },

  heroImageContainer: {
    height: 152,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },

  heroImage: {
    width: '100%',
    height: '100%',
  },

  dailyBadge: {
    position: 'absolute',
    left: 12,
    bottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },

  dailyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#33A968',
  },

  dailyText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    color: '#121C2A',
  },

  greeting: {
    marginTop: 20,
    marginBottom: 12,
  },

  heading: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '800',
    color: '#121C2A',
  },

  description: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    color: '#594043',
  },

  fieldContainer: {
    marginTop: 12,
  },

  fieldLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 0.7,
    color: '#594043',
    marginBottom: 6,
  },

  passwordLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  forgotPassword: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#B52046',
  },

  inputContainer: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#EFF4FF',
  },

  input: {
    flex: 1,
    minHeight: 52,
    fontSize: 14,
    color: '#121C2A',
  },

  loginButton: {
    height: 52,
    marginTop: 16,
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
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 4,
  },

  loginButtonDisabled: {
  opacity: 0.7,
},

  buttonPressed: {
    transform: [{ scale: 0.98 }],
  },

  loginButtonText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 16,
  },

  signupText: {
    fontSize: 14,
    color: '#594043',
  },

  signupLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#B52046',
  },

  dividerContainer: {
    height: 24,
    marginVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 50,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
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
    fontSize: 21,
    fontWeight: '700',
    color: '#4285F4',
  },

  googleText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#121C2A',
  },

  practiceNote: {
    marginTop: 16,
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#E6EEFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  heartCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFD9DD',
    alignItems: 'center',
    justifyContent: 'center',
  },

  practiceTextContainer: {
    flex: 1,
  },

  practiceTitle: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    color: '#121C2A',
  },

  practiceSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: '#594043',
  },

  privacyRow: {
    marginTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  privacyText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    color: '#8D7072',
  },
});
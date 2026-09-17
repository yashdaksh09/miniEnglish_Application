import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Tabs } from 'expo-router';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function AppTabs() {

  return (
    <NativeTabs
    // tab background color
      backgroundColor="#F8F9FF"
      indicatorColor="#FFD9DD"
      iconColor={{
        default: '#594043',
        selected: '#B52046'
      }}
      labelStyle={{  
      default: { color: '#594043' },
      selected: { color: '#B52046' }, }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
        md={{
          default: 'home',
          selected: 'home_filled'
        }}
          // src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
        md={{
          default: 'search',
          selected: 'search'
        }}
          // src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="practice">
        <NativeTabs.Trigger.Label>Practice</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md={{
            default: 'record_voice_over',
            selected: 'record_voice_over'
          }}
          // src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="myPhrases">
        <NativeTabs.Trigger.Label>My Phrases</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
        md={{
            default: 'favorite_border',
            selected: 'favorite',
          }}
          
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md={{
            default: 'person_outline',
            selected: 'person',
          }}
          // src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>

    
  );
}

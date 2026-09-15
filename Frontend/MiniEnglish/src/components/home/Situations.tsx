import { View, Text, Pressable, ScrollView } from "react-native"
import { StyleSheet } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, useEffect } from "react";
import { Situation } from "@/types/situation";
const API_URL = process.env.EXPO_PUBLIC_API_URL;
console.log(API_URL)

export default function Situations(){
  const [situations, setSituations]= useState<Situation[]>([]);// store situation and using fixed data structure according to db schema
  const [loading, setLoading]= useState(true);
  const [error, setError]= useState<string | null>(null);



  useEffect(()=>{
    async function fetchSituations() {
      try{
        setLoading(true)
      const response= await fetch(`${API_URL}/api/situations`);

      if(!response.ok){
        throw new Error("Failed to fetch situations")
      }

      const data: Situation[]= await response.json()

      setSituations(data);
    }catch (error){
      console.log("Failed to fetch situation: ", error);
      setError("Unable to load situations")
    } finally{
      setLoading(false);
    }
    }
    fetchSituations()
  },[]);
  
  if(loading){
    return <Text>Loading...</Text>
  }
  if(error){
    return <Text>{error}</Text>
  }
return (
  // <ScrollView 
  //   style={styles.container} 
  //   contentContainerStyle={styles.scrollContent}
  //   showsVerticalScrollIndicator={false}
  // >
  <View style={styles.container}>
    {/* Section Header */}
    <View style={styles.sectionHeader}>
      <View style={styles.titleContainer}>
        <MaterialIcons
          name="widgets"
          size={18}
          color="#B52046"
        />
        <Text style={styles.title}>Daily Situations</Text>
      </View>
      <Text style={styles.count}>12 active routines</Text>
    </View>

    {/* Situation Grid */}
    <View style={styles.grid}>
      {situations.map((situation) => (
        <Pressable
          key={situation.id}
          onPress={() => {
            router.push({
              pathname: '/situation/[id]' as any,
              params: {
                id: situation.id.toString(),
              },
            });
          }}
          style={[
            styles.card,
            situation.is_popular === 1 && styles.featuredCard,
          ]}
        >
          {situation.is_popular === 1 && (
            <Text style={styles.popular}>POPULAR</Text>
          )}

          <View
            style={[
              styles.iconCircle,
              getIconBackground(situation.background),
              situation.is_popular === 1 && styles.featuredIconCircle,
            ]}
          >
            <MaterialIcons
              name={situation.icon as any}
              size={26}
              color={situation.is_popular === 1 ? '#FFFFFF' : '#B52046'}
            />
          </View>

          <Text
            numberOfLines={1}
            style={[
              styles.name,
              situation.is_popular === 1 && styles.featuredName,
            ]}
          >
            {situation.name}
          </Text>
        </Pressable>
      ))}
    </View>
  </View>
 // </ScrollView>
);
}

function getIconBackground(background: string) {
  switch (background) {
    case 'high':
      return styles.iconHigh;

    case 'variant':
      return styles.iconVariant;

    case 'featured':
      return styles.iconFeatured;

    default:
      return styles.iconLight;
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 4,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#121C2A',
    letterSpacing: -0.1,
  },

  count: {
    fontSize: 11,
    fontWeight: '500',
    color: '#594043',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },

  card: {
    width: '31%',
    aspectRatio: 0.9,
    minHeight: 110,
    padding: 12,
    borderRadius: 36,
    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,

    position: 'relative',
    overflow: 'hidden',
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 8,
  },

  iconLight: {
    backgroundColor: '#EFF4FF',
  },

  iconHigh: {
    backgroundColor: '#DEE9FC',
  },

  iconVariant: {
    backgroundColor: '#D9E3F6',
  },

  iconFeatured: {
    backgroundColor: '#FF5A79',
  },

  name: {
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#121C2A',
  },

  featuredCard: {
    backgroundColor: '#FDE8EC',
  },

  featuredIconCircle: {
    backgroundColor: '#FF5A79',
  },

  featuredName: {
    color: '#B52046',
    fontWeight: '700',
  },

  popular: {
    position: 'absolute',
    top: 4,
    right: 8,

    fontSize: 10,
    fontWeight: '700',
    color: '#B52046',
    letterSpacing: -0.2,
  },
});
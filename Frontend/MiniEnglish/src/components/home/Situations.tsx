import { View, Text, Pressable } from "react-native"
import { StyleSheet } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, useEffect } from "react";
const API_URL = process.env.EXPO_PUBLIC_API_URL;
console.log(API_URL)

export default function Situations(){
  const [situations, setSituations]= useState([]);

  useEffect(()=>{
    async function fetchSituations() {
      try{
      const response= await fetch(`${API_URL}/api/situations`);

      const data= await response.json();

      setSituations(data);
    }catch (error){
      console.log("Failed to fetch situation: ", error)
    }
    }
    fetchSituations()
  },[]);
    return(
        <View style={styles.container}>
            {/* Section Header */}
            <View>
                <View>
                    <MaterialIcons
                        name= "widgets"
                        size= {22}
                        color= "#B52046"
                    />
                    <Text style={styles.title}>Daily Situations</Text>
                </View>
                <Text style={styles.count}>12 active routines</Text>
            </View>

             {/* Situation Grid */}
             <View style={styles.grid}>
                {situations.map((situation)=>(
                    <Pressable 
                    key={situation.id}
                    onPress={()=>{
                        router.push({
                            pathname: '/situation/[id]' as any,
                            params: {
                                id: situation.id
                            },
                        })
                    }}
                    style={[
                        styles.card,
                        situation.is_popular && styles.featuredCard
                    ]}
                    >
                        {situation.is_popular && (
                            <Text style={styles.popular}>
                                Popular
                            </Text>
                        )}

                        <View style={[
                            styles.iconCircle,
                            getIconBackground(situation.background),
                            situation.is_popular && styles.featuredIconCircle
                        ]}>

                            <MaterialIcons
                                name={situation.icon as any}
                                size={27}
                                color={situation.is_popular ? '#FFFFFF':  '#B52046'}
                            />
                        </View>
                        
                        <Text numberOfLines={1}
                        style={[
                            styles.name,
                            situation.is_popular && styles.featuredName
                        ]}>
                            {situation.name}
                        </Text>

                    </Pressable>
                ))}
             </View>
        </View>
    )
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
    fontSize: 18,
    fontWeight: '700',
    color: '#121C2A',
  },

  count: {
    fontSize: 13,
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
    width: '31.5%',
    minHeight: 152,
    padding: 12,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,

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
    fontSize: 14,
    fontWeight: '600',
    color: '#121C2A',
  },

  featuredCard: {
    backgroundColor: '#FFE1E7',
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
    top: 7,
    right: 8,

    fontSize: 10,
    fontWeight: '700',
    color: '#B52046',
  },
});
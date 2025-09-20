// home.tsx
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import Colors from '../color';

const screenWidth = Dimensions.get('window').width;

const meals = [
  {
    name: "Poha + Tea",
    category: "Breakfast",
    calories: 250,
    image: "https://images.unsplash.com/photo-1604908177524-d1a8db314ecb?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Chapati + Lauki Matar",
    category: "Lunch",
    calories: 400,
    image: "https://images.unsplash.com/photo-1604908177408-d1f8db314aba?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Fried Rice + Aloo Tamatar",
    category: "Dinner",
    calories: 500,
    image: "https://images.unsplash.com/photo-1604908177628-d1c8db314ccc?auto=format&fit=crop&w=600&q=80",
  },
];

const Home = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16, paddingTop: 24 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 8, color: Colors.primaryDark }}>
        Good Morning, Sani ! 🌞
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 16, color: Colors.textSecondary }}>
        Here are your personalized meal suggestions based on your daily intake and activity.
      </Text>

      {meals.map((meal, index) => (
        <TouchableOpacity
          key={index}
          style={{
            marginBottom: 20,
            borderRadius: 16,
            backgroundColor: Colors.cardBackground,
            overflow: 'hidden',
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Image
            source={{ uri: meal.image }}
            style={{ width: screenWidth - 32, height: 180 }} 
            resizeMode="cover"
          />
          <View style={{ padding: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.primaryDark, marginBottom: 4 }}>
              {meal.name}
            </Text>
            <Text style={{ fontSize: 14, color: Colors.textSecondary, marginBottom: 4 }}>
              Category: {meal.category}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: Colors.textSuccess }}>
              {meal.calories} kcal
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={{
          backgroundColor: Colors.primary,
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <Text style={{ color: Colors.textWhite, fontWeight: 'bold', fontSize: 16 }}>
          Generate New Meal Plan
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Home;
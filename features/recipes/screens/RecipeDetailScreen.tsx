import RecipeContentCard from '@/features/recipes/components/detail/RecipeContentCard';
import RecipeHeroSection from '@/features/recipes/components/detail/RecipeHeroSection';
import { COLORS } from '@/lib/config/theme';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Recipe } from '../types';

interface RecipeDetailScreenProps {
  recipe: Recipe;
}

const RecipeDetailScreen = ({ recipe }: RecipeDetailScreenProps) => {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar style='light' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces
        contentContainerStyle={styles.scrollContent}
      >
        <RecipeHeroSection recipe={recipe} />
        <RecipeContentCard recipe={recipe} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default RecipeDetailScreen;

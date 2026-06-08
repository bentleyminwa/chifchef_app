import RecipeContentCard from '@/features/recipes/components/detail/RecipeContentCard';
import RecipeCookModeButton from '@/features/recipes/components/detail/RecipeCookModeButton';
import RecipeDetailToolbar from '@/features/recipes/components/detail/RecipeDetailToolbar';
import RecipeHeroSection from '@/features/recipes/components/detail/RecipeHeroSection';
import { COLORS } from '@/lib/config/theme';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Recipe } from '../types';

interface RecipeDetailScreenProps {
  recipe: Recipe;
}

const COOK_MODE_BOTTOM_GAP = 16;
const COOK_MODE_SCROLL_PADDING = 112;

const RecipeDetailScreen = ({ recipe }: RecipeDetailScreenProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style='light' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + COOK_MODE_SCROLL_PADDING },
        ]}
      >
        <RecipeHeroSection recipe={recipe} />
        <RecipeContentCard recipe={recipe} />
      </ScrollView>

      <RecipeDetailToolbar />

      <View
        style={[
          styles.cookModeButtonContainer,
          { bottom: insets.bottom + COOK_MODE_BOTTOM_GAP },
        ]}
      >
        <RecipeCookModeButton onPress={() => {}} />
      </View>
    </View>
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
  cookModeButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 20,
    elevation: 20,
  },
});

export default RecipeDetailScreen;

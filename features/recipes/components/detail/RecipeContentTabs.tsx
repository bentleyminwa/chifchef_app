import { COLORS, FONTS } from '@/lib/config/theme';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Recipe } from '../../types';
import RecipeIngredientsList from './RecipeIngredientsList';
import RecipeInstructionsList from './RecipeInstructionsList';

type TabKey = 'ingredients' | 'instructions';

interface RecipeContentTabsProps {
  recipe: Recipe;
}

const RecipeContentTabs = ({ recipe }: RecipeContentTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>('ingredients');

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <Pressable
          style={[styles.tab, activeTab === 'ingredients' && styles.activeTab]}
          onPress={() => setActiveTab('ingredients')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'ingredients' && styles.activeTabText,
            ]}
          >
            Ingredients
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === 'instructions' && styles.activeTab]}
          onPress={() => setActiveTab('instructions')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'instructions' && styles.activeTabText,
            ]}
          >
            Instructions
          </Text>
        </Pressable>
      </View>

      {activeTab === 'ingredients' ? (
        <RecipeIngredientsList ingredients={recipe.ingredients} />
      ) : (
        <RecipeInstructionsList instructions={recipe.instructions} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  tabBar: {
    flexDirection: 'row',
    gap: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
    marginBottom: 4,
  },
  tab: {
    paddingBottom: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.textLight,
  },
  activeTabText: {
    color: COLORS.primary,
  },
});

export default RecipeContentTabs;

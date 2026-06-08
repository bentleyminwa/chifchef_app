import { COLORS, FONTS } from '@/lib/config/theme';
import { Feather, FontAwesome5, Octicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Recipe } from '../../types';

interface RecipeStatsRowProps {
  recipe: Recipe;
}

const RecipeStatsRow = ({ recipe }: RecipeStatsRowProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <Octicons name='clock' size={16} color={COLORS.textLight} />
        <Text style={styles.statText}>{recipe.cook_time_minutes} mins</Text>
      </View>

      <View style={styles.stat}>
        <Feather name='bar-chart-2' size={16} color={COLORS.textLight} />
        <Text style={styles.statText}>{recipe.difficulty}</Text>
      </View>

      <View style={styles.stat}>
        <FontAwesome5 name='fire' size={14} color={COLORS.textLight} />
        <Text style={styles.statText}>{recipe.calories} cal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.textLight,
  },
});

export default RecipeStatsRow;

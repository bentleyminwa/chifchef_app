import { COLORS, FONTS } from '@/lib/config/theme';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Recipe } from '../../types';

interface RecipeHeaderSectionProps {
  recipe: Recipe;
}

const RecipeHeaderSection = ({ recipe }: RecipeHeaderSectionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{recipe.title}</Text>
        <View style={styles.rating}>
          <FontAwesome name='star' size={16} color={COLORS.warning} />
          <Text style={styles.ratingText}>{recipe.rating.toFixed(1)}</Text>
        </View>
      </View>
      <Text style={styles.author}>By {recipe.author}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 26,
    fontFamily: FONTS.sandBold,
    color: COLORS.text,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 4,
  },
  ratingText: {
    fontSize: 15,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.text,
  },
  author: {
    fontSize: 14,
    fontFamily: FONTS.sandRegular,
    color: COLORS.textLight,
  },
});

export default RecipeHeaderSection;

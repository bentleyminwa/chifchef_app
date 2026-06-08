import { COLORS } from '@/lib/config/theme';
import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import type { Recipe } from '../../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_HEIGHT = SCREEN_WIDTH;

interface RecipeHeroSectionProps {
  recipe: Recipe;
}

const RecipeHeroSection = ({ recipe }: RecipeHeroSectionProps) => {
  return (
    <View style={styles.container}>
      <Image source={recipe.image_url} style={styles.image} />

      <View style={styles.dots}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: HERO_HEIGHT,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dots: {
    position: 'absolute',
    bottom: 36,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  activeDot: {
    width: 16,
    backgroundColor: COLORS.white,
  },
});

export default RecipeHeroSection;

import { COLORS, FONTS } from '@/lib/config/theme';
import LikeButton from '@/shared/components/buttons/LikeButton';
import { Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { IngredientsMatch, Recipe } from '../../types';
import DifficultyBadge from './DifficultyBadge';

interface RecipeCardProps {
  recipe: Recipe;
  ingredientsMatch?: IngredientsMatch;
  onPress?: () => void;
}

const RecipeCard = ({ recipe, ingredientsMatch, onPress }: RecipeCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <TouchableOpacity activeOpacity={0.95} onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={recipe.image_url} style={styles.image} />
          <LikeButton
            size={{ width: 28, height: 28 }}
            iconSize={20}
            style={styles.heartIcon}
            liked={isLiked}
            onPress={handleLike}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{recipe.title}</Text>
          <View style={styles.meta}>
            <View style={styles.metaItem}>
              <Octicons name='clock' size={13} color={COLORS.textLight} />
              <Text style={styles.metaText}>
                {recipe.cook_time_minutes} mins
              </Text>
            </View>
            <DifficultyBadge difficulty={recipe.difficulty} />
          </View>
          {ingredientsMatch && (
            <View style={styles.match}>
              <Text style={styles.matchFraction}>
                {ingredientsMatch.matched}/{ingredientsMatch.total}
              </Text>
              <Text style={styles.matchText}>ingredients match</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
    paddingVertical: 20,
  },
  imageContainer: {
    position: 'relative',
    width: 180,
    height: 130,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartIcon: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 10,
    elevation: 10,
  },
  infoContainer: {
    flex: 1,
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.text,
  },
  meta: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.textLight,
  },
  match: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  matchFraction: {
    fontSize: 12,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.text,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  matchText: {
    fontSize: 12,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.textLight,
  },
});

export default RecipeCard;

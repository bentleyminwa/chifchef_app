import { COLORS, FONTS } from '@/lib/config/theme';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { RecipeIngredient } from '../../types';

interface RecipeIngredientsListProps {
  ingredients: RecipeIngredient[];
}

const RecipeIngredientsList = ({ ingredients }: RecipeIngredientsListProps) => {
  return (
    <View style={styles.container}>
      {ingredients.map((ingredient, index) => (
        <View
          key={`${ingredient.name}-${index}`}
          style={[
            styles.row,
            index < ingredients.length - 1 && styles.rowBorder,
          ]}
        >
          <View style={styles.thumbnail}>
            {ingredient.image_url ? (
              <Image
                source={ingredient.image_url}
                style={styles.thumbnailImage}
              />
            ) : (
              <View style={styles.thumbnailPlaceholder} />
            )}
          </View>
          <Text style={styles.name} numberOfLines={1}>
            {ingredient.name}
          </Text>
          <Text style={styles.quantity}>{ingredient.quantity}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
  },
  thumbnail: {
    width: 44,
    height: 44,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  thumbnailPlaceholder: {
    flex: 1,
    backgroundColor: COLORS.grayLight,
  },
  name: {
    flex: 1,
    fontSize: 15,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.text,
  },
  quantity: {
    fontSize: 14,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.textLight,
  },
});

export default RecipeIngredientsList;

import { Recipe } from '@/features/recipes/types';
import DifficultyBadge from '@/features/recipes/components/ui/DifficultyBadge';
import { COLORS, FONTS } from '@/lib/config/theme';
import { Link } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface RecipeSectionProps {
  title: string;
  recipes: Recipe[];
}

const RecipeSection = ({ title, recipes }: RecipeSectionProps) => {
  if (recipes.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={recipes}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recipeList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            href={`/recipes/${item.id}`}
            asChild
          >
            <Pressable style={styles.recipeItem}>
              <Image
                source={item.image_url}
                style={styles.recipeImage}
              />
              <Text
                style={styles.recipeTitle}
                numberOfLines={1}
                ellipsizeMode='tail'
              >
                {item.title}
              </Text>
              <DifficultyBadge
                difficulty={item.difficulty}
                iconSize={11}
                style={styles.recipeDifficulty}
                textStyle={styles.recipeDifficultyText}
              />
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: FONTS.sandBold,
    fontSize: 18,
    color: COLORS.text,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  recipeList: {
    gap: 12,
    paddingHorizontal: 20,
  },
  recipeItem: {
    width: 140,
  },
  recipeImage: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    shadowColor: COLORS.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recipeTitle: {
    fontFamily: FONTS.sandBold,
    fontSize: 13,
    color: COLORS.text,
    marginTop: 8,
  },
  recipeDifficulty: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  recipeDifficultyText: {
    fontFamily: FONTS.sandMedium,
    fontSize: 11,
    color: COLORS.textLight,
  },
});

export default RecipeSection;

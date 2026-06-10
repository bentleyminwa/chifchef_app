import { RECOMMENDED_RECIPES, PANTRY_ITEMS } from '@/assets/data';
import { computeIngredientsMatch } from '@/features/recipes/utils/ingredientsMatch';
import { COLORS, FONTS } from '@/lib/config/theme';
import { Link } from 'expo-router';
import React, { useMemo } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DifficultyBadge from '@/features/recipes/components/ui/DifficultyBadge';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FeaturedRecipe = () => {
  const featuredRecipe = useMemo(() => {
    if (RECOMMENDED_RECIPES.length === 0) return null;

    // Find recipe with best ingredient match
    let bestRecipe = RECOMMENDED_RECIPES[0];
    let bestMatch = computeIngredientsMatch(bestRecipe, PANTRY_ITEMS);

    RECOMMENDED_RECIPES.forEach((recipe) => {
      const match = computeIngredientsMatch(recipe, PANTRY_ITEMS);
      // Prefer recipes where user has more ingredients
      if (match.matched > bestMatch.matched) {
        bestRecipe = recipe;
        bestMatch = match;
      }
    });

    return { recipe: bestRecipe, match: bestMatch };
  }, []);

  if (!featuredRecipe) return null;

  const { recipe, match } = featuredRecipe;
  const matchPercentage = Math.round((match.matched / match.total) * 100);
  const totalTime = recipe.prep_time_minutes + recipe.cook_time_minutes;

  return (
    <Link href={`/recipes/${recipe.id}`} asChild>
      <Pressable style={styles.container}>
        {/* Featured Banner Background */}
        <Image
          source={recipe.image_url}
          style={styles.bannerImage}
          blurRadius={3}
        />
        <View style={styles.overlay} />

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={styles.badge}>Featured Recipe</Text>
              <Text style={styles.title}>{recipe.title}</Text>
            </View>
            <Image
              source={recipe.image_url}
              style={styles.recipeImage}
            />
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={16}
                color={COLORS.white}
              />
              <Text style={styles.statText}>{totalTime} min</Text>
            </View>

            <View style={styles.stat}>
              <DifficultyBadge
                difficulty={recipe.difficulty}
                iconSize={13}
                textStyle={styles.difficultyText}
              />
            </View>

            <View style={styles.stat}>
              <MaterialCommunityIcons
                name="star"
                size={16}
                color="#FFD700"
              />
              <Text style={styles.statText}>{recipe.rating}</Text>
            </View>
          </View>

          {/* Match Indicator */}
          <View style={styles.matchSection}>
            <View style={styles.matchBar}>
              <View
                style={[
                  styles.matchFill,
                  { width: `${matchPercentage}%` },
                ]}
              />
            </View>
            <Text style={styles.matchText}>
              You have {match.matched}/{match.total} ingredients
            </Text>
          </View>

          {/* CTA Button */}
          <View style={styles.ctaButton}>
            <Text style={styles.ctaText}>Cook Now</Text>
            <MaterialCommunityIcons
              name="arrow-right"
              size={16}
              color={COLORS.white}
            />
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 20,
    overflow: 'hidden',
    minHeight: 280,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  badge: {
    fontFamily: FONTS.sandMedium,
    fontSize: 11,
    color: COLORS.primary,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 6,
  },
  title: {
    fontFamily: FONTS.sandBold,
    fontSize: 22,
    color: COLORS.white,
    marginBottom: 8,
    maxWidth: '70%',
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statText: {
    fontFamily: FONTS.sandMedium,
    fontSize: 12,
    color: COLORS.white,
  },
  difficultyText: {
    fontFamily: FONTS.sandMedium,
    fontSize: 12,
    color: COLORS.white,
  },
  matchSection: {
    gap: 6,
  },
  matchBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  matchFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  matchText: {
    fontFamily: FONTS.sandRegular,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 12,
  },
  ctaText: {
    fontFamily: FONTS.sandBold,
    fontSize: 14,
    color: COLORS.white,
  },
});

export default FeaturedRecipe;

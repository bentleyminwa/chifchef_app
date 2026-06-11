import { PANTRY_ITEMS, RECOMMENDED_RECIPES } from '@/assets/data';
import CategoryFilters from '@/features/recipes/components/ui/CategoryFilters';
import RecipeCard from '@/features/recipes/components/ui/RecipeCard';
import { computeIngredientsMatch } from '@/features/recipes/utils/ingredientsMatch';
import { CATEGORIES } from '@/lib/config/constants';
import { COLORS, FONTS } from '@/lib/config/theme';
import BackButton from '@/shared/components/buttons/BackButton';
import SearchButton from '@/shared/components/buttons/SearchButton';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CategoryScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const categoryId = Array.isArray(id) ? id[0] : id;

  const categoryData = CATEGORIES.find((c) => c.id === categoryId);

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterId, setActiveFilterId] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'time' | 'default'>(
    'default',
  );

  if (!categoryData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Category not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const categoryRecipes = RECOMMENDED_RECIPES.filter(
    (recipe) => recipe.meal_type === categoryId,
  );

  const filteredRecipesByFilter = categoryRecipes.filter((recipe) => {
    switch (activeFilterId) {
      case 'ready': {
        const match = computeIngredientsMatch(recipe, PANTRY_ITEMS);
        return match.matched === match.total;
      }
      case 'quick':
        return recipe.prep_time_minutes + recipe.cook_time_minutes <= 30;
      case 'healthy':
        return recipe.calories < 400;
      case 'easy':
        return recipe.difficulty === 'Easy';
      default:
        return true;
    }
  });

  // Apply search query filter
  const displayedRecipes = filteredRecipesByFilter.filter((recipe) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      recipe.title.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query)
    );
  });

  // Apply local sorting
  const sortedRecipes = [...displayedRecipes].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'time') {
      const aTime = a.prep_time_minutes + a.cook_time_minutes;
      const bTime = b.prep_time_minutes + b.cook_time_minutes;
      return aTime - bTime;
    }
    return 0; // default order
  });

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipes/${recipeId}`);
  };

  const handleSortPress = () => {
    // Cycle through default -> rating -> time -> default
    if (sortBy === 'default') setSortBy('rating');
    else if (sortBy === 'rating') setSortBy('time');
    else setSortBy('default');
  };

  const getHeaderInfo = () => {
    switch (activeFilterId) {
      case 'ready':
        return {
          title: 'Ready to Cook',
          subtitle: 'Ingredients matched.',
        };
      case 'quick':
        return {
          title: 'Quick & Easy',
          subtitle: '30 mins or less.',
        };
      case 'healthy':
        return {
          title: 'Healthy Choices',
          subtitle: 'Under 400 kcal.',
        };
      case 'easy':
        return {
          title: 'Simple Recipes',
          subtitle: 'Stress-free cooking.',
        };
      default: {
        const shortSubtitles: Record<string, string> = {
          breakfast: 'Start your day right.',
          lunch: 'Tasty midday meals.',
          dinner: 'Delicious dinner recipes.',
          dessert: 'Sweet treats & desserts.',
          snacks: 'Quick, tasty bites.',
          drinks: 'Refreshing beverages.',
        };
        return {
          title: `Top ${categoryData.title} Recipes`,
          subtitle: shortSubtitles[categoryId] || 'Delicious recipes for you.',
        };
      }
    }
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case 'rating':
        return 'Sort: Rating';
      case 'time':
        return 'Sort: Time';
      default:
        return 'Sort: Default';
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <SafeAreaView style={styles.container}>
      {isSearching ? (
        <View style={styles.toolbar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setIsSearching(false);
              setSearchQuery('');
            }}
            style={styles.iconButton}
          >
            <Feather name='arrow-left' size={24} color={COLORS.text} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder={`Search ${categoryData.title} recipes...`}
            placeholderTextColor={COLORS.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSearchQuery('')}
              style={styles.iconButton}
            >
              <Feather name='x' size={20} color={COLORS.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.toolbar}>
          <BackButton />
          <Text style={styles.categoryName}>{categoryData.title}</Text>
          <SearchButton onPress={() => setIsSearching(true)} />
        </View>
      )}

      <CategoryFilters
        activeFilterId={activeFilterId}
        onFilterChange={setActiveFilterId}
        textColor={categoryData.textColor}
      />

      <FlatList
        data={sortedRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerTextContainer}>
            <View style={styles.headerMainRow}>
              <View style={styles.headerTextGroup}>
                <Text style={styles.headerTitle}>{headerInfo.title}</Text>
                <Text
                  style={styles.headerSubtitle}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >
                  {headerInfo.subtitle}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.sortButton}
                activeOpacity={0.7}
                onPress={handleSortPress}
              >
                <Feather
                  name={
                    sortBy === 'default'
                      ? 'chevron-down'
                      : sortBy === 'rating'
                        ? 'star'
                        : 'clock'
                  }
                  size={12}
                  color={COLORS.primary}
                  style={styles.sortIcon}
                />
                <Text style={styles.sortText}>{getSortLabel()}</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Feather
              name='search'
              size={48}
              color={COLORS.textLight}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyStateText}>
              No recipes found matching your criteria
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Try clearing search keywords or using a different filter pill.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const match = computeIngredientsMatch(item, PANTRY_ITEMS);
          return (
            <RecipeCard
              recipe={item}
              ingredientsMatch={match}
              onPress={() => handleRecipePress(item.id)}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  categoryName: {
    fontFamily: FONTS.sandBold,
    fontSize: 20,
    color: COLORS.text,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.sandMedium,
    fontSize: 16,
    color: COLORS.text,
    paddingHorizontal: 12,
    height: 40,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTextContainer: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerMainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 12,
  },
  headerTextGroup: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: FONTS.sandBold,
    fontSize: 22,
    color: COLORS.text,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontFamily: FONTS.sandMedium,
    fontSize: 14,
    color: COLORS.textLight,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 4,
  },
  sortIcon: {
    marginRight: 2,
  },
  sortText: {
    fontFamily: FONTS.sandSemiBold,
    fontSize: 12,
    color: COLORS.primary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.6,
  },
  emptyStateText: {
    fontFamily: FONTS.sandBold,
    fontSize: 16,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginBottom: 6,
  },
  emptyStateSubtext: {
    fontFamily: FONTS.sandRegular,
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontFamily: FONTS.sandMedium,
    fontSize: 16,
    color: COLORS.textLight,
  },
});

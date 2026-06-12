import { PANTRY_ITEMS, RECOMMENDED_RECIPES } from '@/assets/data';
import RecipeCard from '@/features/recipes/components/ui/RecipeCard';
import { computeIngredientsMatch } from '@/features/recipes/utils/ingredientsMatch';
import { COLORS, FONTS } from '@/lib/config/theme';
import BackButton from '@/shared/components/buttons/BackButton';
import SearchButton from '@/shared/components/buttons/SearchButton';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavouriteRecipesScreen() {
  const router = useRouter();
  const [favoriteIds] = useState<string[]>(['1', '3', '6', '8']);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Get only the favorited recipes
  const favoriteRecipes = RECOMMENDED_RECIPES.filter((recipe) =>
    favoriteIds.includes(recipe.id),
  );

  // Apply search query filter
  const displayedRecipes = favoriteRecipes.filter((recipe) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      recipe.title.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query)
    );
  });

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipes/${recipeId}`);
  };

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
            placeholder='Search favourite recipes...'
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
          <Text style={styles.title}>Favourite Recipes</Text>
          <SearchButton onPress={() => setIsSearching(true)} />
        </View>
      )}

      <FlatList
        data={displayedRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          favoriteRecipes.length === 0 ? (
            <View style={styles.emptyState}>
              <Feather name='heart' size={48} color={COLORS.textLight} style={styles.emptyIcon} />
              <Text style={styles.emptyStateText}>
                No favourite recipes yet
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Tap the heart icon on any recipe to save it to your favourites list.
              </Text>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Feather name='search' size={48} color={COLORS.textLight} style={styles.emptyIcon} />
              <Text style={styles.emptyStateText}>
                No matching recipes found
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Try searching for a different keyword.
              </Text>
            </View>
          )
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
  title: {
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 120,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.6,
  },
  emptyStateText: {
    fontFamily: FONTS.sandBold,
    fontSize: 18,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontFamily: FONTS.sandRegular,
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
});

import { PANTRY_ITEMS, RECOMMENDED_RECIPES } from '@/assets/data';
import ItemDetailsToolbar from '@/features/pantry/components/detail/ItemDetailsToolbar';
import PantryDetailListHeader from '@/features/pantry/components/detail/PantryDetailListHeader';
import RecipeCard from '@/features/recipes/components/ui/RecipeCard';
import type { Recipe } from '@/features/recipes/types';
import { computeIngredientsMatch } from '@/features/recipes/utils/ingredientsMatch';
import { COLORS } from '@/lib/config/theme';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { PANTRYITEM } from '../types';

interface PantryItemDetailsScreenProps {
  item: PANTRYITEM;
}

const TOOLBAR_TOP_GAP = 12;
const TOOLBAR_HEIGHT = 40;
const TOOLBAR_CONTENT_GAP = 16;

const PantryItemDetailsScreen = ({ item }: PantryItemDetailsScreenProps) => {
  const insets = useSafeAreaInsets();

  const renderHeader = useCallback(
    () => <PantryDetailListHeader item={item} />,
    [item],
  );

  const renderItem = useCallback(({ item: recipe }: { item: Recipe }) => {
    const match = computeIngredientsMatch(recipe, PANTRY_ITEMS);

    return (
      <RecipeCard
        recipe={recipe}
        ingredientsMatch={match.total > 0 ? match : undefined}
        onPress={() => router.push(`/recipes/${recipe.id}`)}
      />
    );
  }, []);

  const keyExtractor = useCallback((recipe: Recipe) => recipe.id, []);

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />

      <FlatList
        data={RECOMMENDED_RECIPES}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingTop:
              insets.top + TOOLBAR_TOP_GAP + TOOLBAR_HEIGHT + TOOLBAR_CONTENT_GAP,
            paddingBottom: insets.bottom + 32,
          },
        ]}
      />

      <ItemDetailsToolbar top={insets.top + TOOLBAR_TOP_GAP} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    gap: 20,
    paddingHorizontal: 20,
  },
});

export default PantryItemDetailsScreen;

import { RECOMMENDED_RECIPES } from '@/assets/data';
import PantryDetailListHeader from '@/features/pantry/components/detail/PantryDetailListHeader';
import RecipeCard from '@/features/recipes/components/ui/RecipeCard';
import type { Recipe } from '@/features/recipes/types';
import { COLORS } from '@/lib/config/theme';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { PANTRYITEM } from '../types';

interface PantryItemDetailsScreenProps {
  item: PANTRYITEM;
}

const PantryItemDetailsScreen = ({ item }: PantryItemDetailsScreenProps) => {
  const renderHeader = useCallback(
    () => <PantryDetailListHeader item={item} />,
    [item],
  );

  const renderItem = useCallback(
    ({ item: recipe }: { item: Recipe }) => (
      <RecipeCard
        recipe={recipe}
        ingredientsMatch={{ matched: 8, total: 10 }}
        onPress={() => router.push('/recipes')}
      />
    ),
    [],
  );

  const keyExtractor = useCallback((recipe: Recipe) => recipe.id, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />

      <FlatList
        data={RECOMMENDED_RECIPES}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  listContent: {
    gap: 20,
    paddingBottom: 32,
  },
});

export default PantryItemDetailsScreen;

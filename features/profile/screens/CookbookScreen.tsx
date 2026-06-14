import { RECOMMENDED_RECIPES } from '@/assets/data';
import CookbookCard from '@/features/profile/components/cookbook/CookbookCard';
import CookbookEmptyState from '@/features/profile/components/cookbook/CookbookEmptyState';
import CookbookListHeader from '@/features/profile/components/cookbook/CookbookListHeader';
import EditNoteModal from '@/features/profile/components/cookbook/EditNoteModal';
import { INITIAL_ENTRIES } from '@/features/profile/lib/cookbook/cookbookData';
import { CookedEntry } from '@/features/profile/types/cookbook';
import { COLORS, FONTS } from '@/lib/config/theme';
import BackButton from '@/shared/components/buttons/BackButton';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CookbookScreen() {
  // Screen-level data source — mutated when user saves a note
  const [entries, setEntries] = useState<CookedEntry[]>(INITIAL_ENTRIES);

  // Controls which entry's modal is open; null = closed
  const [editingEntry, setEditingEntry] = useState<CookedEntry | null>(null);

  const getRecipe = (id: string) =>
    RECOMMENDED_RECIPES.find((r) => r.id === id);

  const handleSaveNote = (id: string, note: string) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, note } : e)));
    setEditingEntry(null);
  };

  const renderItem = ({ item }: { item: CookedEntry }) => {
    const recipe = getRecipe(item.recipeId);
    if (!recipe) return null;

    return (
      <CookbookCard
        entry={item}
        recipe={recipe}
        onEditPress={setEditingEntry}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toolbar}>
        <BackButton />
        <Text style={styles.toolbarTitle}>My CookBook</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<CookbookListHeader count={entries.length} />}
        ListEmptyComponent={<CookbookEmptyState />}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />

      <EditNoteModal
        entry={editingEntry}
        recipe={editingEntry ? getRecipe(editingEntry.recipeId) : undefined}
        onSave={handleSaveNote}
        onClose={() => setEditingEntry(null)}
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
  toolbarTitle: {
    fontFamily: FONTS.sandBold,
    fontSize: 20,
    color: COLORS.text,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 8,
  },
});

import { RECOMMENDED_RECIPES } from '@/assets/data';
import { COLORS, FONTS } from '@/lib/config/theme';
import BackButton from '@/shared/components/buttons/BackButton';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CookedEntry {
  recipeId: string;
  cookedOn: string; // ISO date string
  note: string;
}

const INITIAL_ENTRIES: CookedEntry[] = [
  {
    recipeId: '1',
    cookedOn: '2026-06-08',
    note: 'Added extra garlic — the family loved it. Next time try with less oil.',
  },
  {
    recipeId: '3',
    cookedOn: '2026-06-04',
    note: 'Shrimp was perfectly crispy. Used sweet paprika instead of smoked.',
  },
  {
    recipeId: '4',
    cookedOn: '2026-05-29',
    note: 'Quick weekday meal. Kids enjoyed it. Will double the egg next time.',
  },
  {
    recipeId: '2',
    cookedOn: '2026-05-20',
    note: '',
  },
];

const formatDate = (iso: string): string => {
  const date = new Date(iso);
  return date.toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export default function CookbookScreen() {
  const [entries, setEntries] = useState<CookedEntry[]>(INITIAL_ENTRIES);

  // Modal state
  const [editingEntry, setEditingEntry] = useState<CookedEntry | null>(null);
  const [draftNote, setDraftNote] = useState('');

  const openEditor = (entry: CookedEntry) => {
    setEditingEntry(entry);
    setDraftNote(entry.note);
  };

  const saveNote = () => {
    if (!editingEntry) return;
    setEntries((prev) =>
      prev.map((e) =>
        e.recipeId === editingEntry.recipeId ? { ...e, note: draftNote } : e,
      ),
    );
    setEditingEntry(null);
  };

  const getRecipe = (id: string) =>
    RECOMMENDED_RECIPES.find((r) => r.id === id);

  const renderItem = ({ item }: { item: CookedEntry }) => {
    const recipe = getRecipe(item.recipeId);
    if (!recipe) return null;

    return (
      <View style={styles.card}>
        {/* Thumbnail + header row */}
        <View style={styles.cardHeader}>
          <Image source={recipe.image_url} style={styles.thumbnail} />
          <View style={styles.cardMeta}>
            <Text style={styles.recipeTitle} numberOfLines={2}>
              {recipe.title}
            </Text>
            <View style={styles.dateRow}>
              <Feather name='calendar' size={12} color={COLORS.textLight} />
              <Text style={styles.dateText}>{formatDate(item.cookedOn)}</Text>
            </View>
            <View style={styles.badgeRow}>
              <View style={styles.difficultyBadge}>
                <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
              </View>
              <View style={styles.timeBadge}>
                <Feather name='clock' size={11} color={COLORS.textLight} />
                <Text style={styles.timeText}>
                  {recipe.prep_time_minutes + recipe.cook_time_minutes} min
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Note section */}
        <View style={styles.noteContainer}>
          <View style={styles.noteHeader}>
            <Feather name='message-square' size={14} color={COLORS.textLight} />
            <Text style={styles.noteLabel}>Notes</Text>
          </View>
          {item.note ? (
            <Text style={styles.noteText}>{item.note}</Text>
          ) : (
            <Text style={styles.notePlaceholder}>No notes added yet...</Text>
          )}
        </View>

        {/* Edit note action */}
        <TouchableOpacity
          style={styles.editBtn}
          activeOpacity={0.7}
          onPress={() => openEditor(item)}
        >
          <Feather name='edit-3' size={13} color={COLORS.primary} />
          <Text style={styles.editBtnText}>
            {item.note ? 'Edit Note' : 'Add Note'}
          </Text>
        </TouchableOpacity>
      </View>
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
        keyExtractor={(item) => item.recipeId}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Feather name='book-open' size={16} color={COLORS.textLight} />
            <Text style={styles.listHeaderText}>
              {entries.length} {entries.length === 1 ? 'recipe' : 'recipes'} cooked
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Feather name='book-open' size={48} color={COLORS.textLight} style={styles.emptyIcon} />
            <Text style={styles.emptyStateText}>Your cookbook is empty</Text>
            <Text style={styles.emptyStateSubtext}>
              Recipes you cook will appear here along with your notes and dates.
            </Text>
          </View>
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />

      {/* Edit Note Modal */}
      <Modal
        visible={!!editingEntry}
        animationType='slide'
        transparent
        onRequestClose={() => setEditingEntry(null)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setEditingEntry(null)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalWrapper}
          >
            <Pressable style={styles.modalSheet} onPress={() => {}}>
              {/* Sheet handle */}
              <View style={styles.sheetHandle} />

              <Text style={styles.modalTitle}>
                {editingEntry
                  ? getRecipe(editingEntry.recipeId)?.title
                  : ''}
              </Text>
              <Text style={styles.modalSubtitle}>Add your thoughts about this cook</Text>

              <TextInput
                style={styles.noteInput}
                value={draftNote}
                onChangeText={setDraftNote}
                placeholder='e.g. Loved the flavour. Next time add more garlic...'
                placeholderTextColor={COLORS.placeholder}
                multiline
                numberOfLines={5}
                textAlignVertical='top'
                autoFocus
              />

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  activeOpacity={0.7}
                  onPress={() => setEditingEntry(null)}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveBtn}
                  activeOpacity={0.8}
                  onPress={saveNote}
                >
                  <Text style={styles.saveBtnText}>Save Note</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
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
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 16,
  },
  listHeaderText: {
    fontFamily: FONTS.sandMedium,
    fontSize: 13,
    color: COLORS.textLight,
  },
  // Journal card
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 14,
    backgroundColor: COLORS.grayLight,
  },
  cardMeta: {
    flex: 1,
    justifyContent: 'center',
    gap: 6,
  },
  recipeTitle: {
    fontFamily: FONTS.sandBold,
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 22,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dateText: {
    fontFamily: FONTS.sandMedium,
    fontSize: 12,
    color: COLORS.textLight,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  difficultyBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  difficultyText: {
    fontFamily: FONTS.sandSemiBold,
    fontSize: 11,
    color: COLORS.primary,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontFamily: FONTS.sandMedium,
    fontSize: 11,
    color: COLORS.textLight,
  },
  // Notes section
  noteContainer: {
    backgroundColor: COLORS.grayLight,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    gap: 6,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  noteLabel: {
    fontFamily: FONTS.sandBold,
    fontSize: 12,
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  noteText: {
    fontFamily: FONTS.sandRegular,
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 20,
  },
  notePlaceholder: {
    fontFamily: FONTS.sandRegular,
    fontSize: 14,
    color: COLORS.placeholder,
    fontStyle: 'italic',
  },
  // Edit button
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 5,
  },
  editBtnText: {
    fontFamily: FONTS.sandSemiBold,
    fontSize: 13,
    color: COLORS.primary,
  },
  // Empty state
  emptyState: {
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
  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalWrapper: {
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.grayLight,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontFamily: FONTS.sandBold,
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 4,
  },
  modalSubtitle: {
    fontFamily: FONTS.sandMedium,
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 20,
  },
  noteInput: {
    backgroundColor: COLORS.grayLight,
    borderRadius: 16,
    padding: 16,
    fontFamily: FONTS.sandRegular,
    fontSize: 15,
    color: COLORS.text,
    minHeight: 120,
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.grayLight,
  },
  cancelBtnText: {
    fontFamily: FONTS.sandSemiBold,
    fontSize: 15,
    color: COLORS.textMuted,
  },
  saveBtn: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  saveBtnText: {
    fontFamily: FONTS.sandBold,
    fontSize: 15,
    color: COLORS.white,
  },
});

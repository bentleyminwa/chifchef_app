import { COLORS, FONTS } from "@/lib/config/theme";
import { CookedEntry } from "@/features/profile/types/cookbook";
import { formatDate } from "@/features/profile/utils/dateUtils";
import { Recipe } from "@/features/recipes/types";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CookbookCardProps {
  entry: CookedEntry;
  recipe: Recipe;
  onEditPress: (entry: CookedEntry) => void;
}

const CookbookCard = ({ entry, recipe, onEditPress }: CookbookCardProps) => (
  <View style={styles.card}>
    {/* Thumbnail + header row */}
    <View style={styles.cardHeader}>
      <Image source={recipe.image_url} style={styles.thumbnail} />
      <View style={styles.cardMeta}>
        <Text style={styles.recipeTitle} numberOfLines={2}>
          {recipe.title}
        </Text>
        <View style={styles.dateRow}>
          <Feather name="calendar" size={12} color={COLORS.textLight} />
          <Text style={styles.dateText}>{formatDate(entry.cookedOn)}</Text>
        </View>
        <View style={styles.badgeRow}>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
          </View>
          <View style={styles.timeBadge}>
            <Feather name="clock" size={11} color={COLORS.textLight} />
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
        <Feather name="message-square" size={14} color={COLORS.textLight} />
        <Text style={styles.noteLabel}>Notes</Text>
      </View>
      {entry.note ? (
        <Text style={styles.noteText}>{entry.note}</Text>
      ) : (
        <Text style={styles.notePlaceholder}>No notes added yet...</Text>
      )}
    </View>

    {/* Edit / Add note action */}
    <TouchableOpacity
      style={styles.editBtn}
      activeOpacity={0.7}
      onPress={() => onEditPress(entry)}
    >
      <Feather name="edit-3" size={13} color={COLORS.primary} />
      <Text style={styles.editBtnText}>
        {entry.note ? "Edit Note" : "Add Note"}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
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
    flexDirection: "row",
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
    justifyContent: "center",
    gap: 6,
  },
  recipeTitle: {
    fontFamily: FONTS.sandBold,
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 22,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  dateText: {
    fontFamily: FONTS.sandMedium,
    fontSize: 12,
    color: COLORS.textLight,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    fontFamily: FONTS.sandMedium,
    fontSize: 11,
    color: COLORS.textLight,
  },
  noteContainer: {
    backgroundColor: COLORS.grayLight,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    gap: 6,
  },
  noteHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  noteLabel: {
    fontFamily: FONTS.sandBold,
    fontSize: 12,
    color: COLORS.textLight,
    textTransform: "uppercase",
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
    fontStyle: "italic",
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: 5,
  },
  editBtnText: {
    fontFamily: FONTS.sandSemiBold,
    fontSize: 13,
    color: COLORS.primary,
  },
});

export default CookbookCard;

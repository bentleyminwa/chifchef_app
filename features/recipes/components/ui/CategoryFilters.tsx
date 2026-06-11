import { COLORS, FONTS } from '@/lib/config/theme';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

export interface FilterOption {
  id: string;
  label: string;
  icon: keyof typeof Feather.glyphMap;
}

export const FILTER_OPTIONS: FilterOption[] = [
  { id: 'all', label: 'All Recipes', icon: 'list' },
  { id: 'ready', label: 'Ready to Cook', icon: 'check-circle' },
  { id: 'quick', label: 'Quick & Easy', icon: 'zap' },
  { id: 'healthy', label: 'Healthy', icon: 'heart' },
  { id: 'easy', label: 'Easy', icon: 'smile' },
];

interface CategoryFiltersProps {
  activeFilterId: string;
  onFilterChange: (id: string) => void;
  textColor: string;
}

const CategoryFilters = ({
  activeFilterId,
  onFilterChange,
  textColor,
}: CategoryFiltersProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {FILTER_OPTIONS.map((filter) => {
        const isActive = activeFilterId === filter.id;
        return (
          <TouchableOpacity
            key={filter.id}
            activeOpacity={0.8}
            onPress={() => onFilterChange(filter.id)}
            style={[
              styles.pill,
              isActive
                ? { backgroundColor: textColor, borderColor: textColor }
                : styles.pillInactive,
            ]}
          >
            <Feather
              name={filter.icon}
              size={16}
              color={isActive ? COLORS.white : COLORS.textLight}
              style={styles.icon}
            />
            <Text
              style={[
                styles.pillText,
                isActive ? styles.pillTextActive : styles.pillTextInactive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 60,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillInactive: {
    backgroundColor: COLORS.grayLight,
    borderColor: COLORS.grayLight,
  },
  icon: {
    marginRight: 6,
  },
  pillText: {
    fontFamily: FONTS.sandSemiBold,
    fontSize: 14,
  },
  pillTextActive: {
    color: COLORS.white,
  },
  pillTextInactive: {
    color: COLORS.textLight,
  },
});

export default CategoryFilters;

import { STORAGE_FILTER } from '@/assets/data';
import type { STORAGEFILTER } from '@/features/pantry/types';
import { COLORS, FONTS } from '@/lib/config/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const StorageFilter = ({
  activeStorage,
  setActiveStorage,
  getStorageCount,
}: {
  activeStorage: STORAGEFILTER;
  setActiveStorage: (filter: STORAGEFILTER) => void;
  getStorageCount: (storage: string) => number;
}) => {
  return (
    // Should stick to top of screen and scroll horizontally
    <View style={styles.storageFilterContainer}>
      {STORAGE_FILTER.map((filter) => (
        <TouchableOpacity
          key={filter.value}
          style={[
            styles.storageFilter,
            activeStorage.value === filter.value && styles.activeStorage,
          ]}
          onPress={() => setActiveStorage(filter)}
        >
          <Text
            style={[
              styles.storageFilterText,
              activeStorage.value === filter.value && styles.activeStorageText,
            ]}
          >
            {filter.label}
          </Text>
          <View style={[styles.storageFilterCount]}>
            <Text
              style={[
                styles.storageFilterCountText,
                activeStorage.value === filter.value &&
                  styles.activeStorageCountText,
              ]}
            >
              {getStorageCount(filter.value)}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  storageFilterContainer: {
    flexDirection: 'row',
    gap: 30,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
    marginBottom: 24,
    backgroundColor: COLORS.background,
    width: '100%',
  },
  storageFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    gap: 6,
  },
  activeStorage: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 2,
  },
  storageFilterText: {
    fontSize: 15,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.textLight,
  },
  activeStorageText: {
    color: COLORS.primary,
  },
  storageFilterCount: {
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.grayLight,
    borderRadius: 20,
  },
  storageFilterCountText: {
    fontSize: 11,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.textLight,
  },
  activeStorageCountText: {
    color: COLORS.primary,
  },
});

export default StorageFilter;

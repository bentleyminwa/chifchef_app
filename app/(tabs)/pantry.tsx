import { PANTRY_ITEMS } from '@/assets/data';
import PantryHeader from '@/features/pantry/components/sections/PantryHeader';
import PantryItem from '@/features/pantry/components/sections/PantryItem';
import StorageFilter from '@/features/pantry/components/sections/StorageFilter';
import type { STORAGEFILTER } from '@/features/pantry/types';
import { COLORS } from '@/lib/config/theme';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PantryScreen() {
  const [activeStorage, setActiveStorage] = useState<STORAGEFILTER>({
    label: 'All',
    value: 'all',
  });

  const filteredPantryItems = PANTRY_ITEMS.filter((item) => {
    if (activeStorage.value === 'all') {
      return true;
    }
    return item.storage === activeStorage.value;
  });

  const getStorageCount = (storage: string) => {
    if (storage === 'all') {
      return PANTRY_ITEMS.length;
    }
    return PANTRY_ITEMS.filter((item) => item.storage === storage).length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />

      <FlatList
        // stickyHeaderIndices={[1]}
        ListHeaderComponent={
          <>
            <PantryHeader />
            <StorageFilter
              activeStorage={activeStorage}
              setActiveStorage={setActiveStorage}
              getStorageCount={getStorageCount}
            />
          </>
        }
        data={filteredPantryItems}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.92}
            onPress={() => router.push(`/pantry/${item.id}`)}
          >
            <PantryItem item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.pantryList}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />

      <TouchableOpacity style={styles.fab} onPress={() => {}}>
        <Feather name='plus' size={24} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  pantryList: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    elevation: 5,
  },
});

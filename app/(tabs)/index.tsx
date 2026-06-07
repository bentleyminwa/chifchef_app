import CategoriesSection from '@/features/kitchen/components/sections/CategoriesSection';
import KitchenHeader from '@/features/kitchen/components/sections/KitchenHeader';
import RecommendedSection from '@/features/kitchen/components/sections/Recommended';
import SearchBar from '@/features/kitchen/components/ui/SearchBar';
import { COLORS } from '@/lib/config/theme';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterPress = () => {
    // Filter action can be integrated later
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' backgroundColor={COLORS.background} />

      <View style={[styles.topPanel]}>
        <KitchenHeader />

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={handleFilterPress}
          style={styles.searchBar}
        />
      </View>

      <CategoriesSection />

      <RecommendedSection />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topPanel: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  searchBar: {
    marginVertical: 0,
    marginTop: 16,
  },
});

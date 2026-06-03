import KitchenHeader from '@/features/kitchen/components/sections/KitchenHeader';
import CategoriesSection from '@/features/kitchen/components/sections/CategoriesSection';
import SearchBar from '@/features/kitchen/components/ui/SearchBar';
import { COLORS } from '@/lib/config/theme';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterPress = () => {
    // Filter action can be integrated later
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <StatusBar style='dark' />

        {/* Top Panel (now light) */}
        <View style={[styles.topPanel, { paddingTop: insets.top + 16 }]}>
          <KitchenHeader />

          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={handleFilterPress}
            style={styles.searchBar}
          />
        </View>

        {/* category list */}
        <CategoriesSection />
      </View>
    </TouchableWithoutFeedback>
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

import KitchenHeader from '@/features/kitchen/components/sections/KitchenHeader';
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

export default function RecipeHomeScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterPress = () => {
    // Filter action can be integrated later
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <StatusBar style='light' backgroundColor={COLORS.backgroundDark} />

        {/* Dark Top Panel */}
        <View style={[styles.topPanel, { paddingTop: insets.top + 16 }]}>
          <KitchenHeader />

          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={handleFilterPress}
            style={styles.searchBar}
          />
        </View>
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
    backgroundColor: COLORS.backgroundDark,
    paddingHorizontal: 20,
    paddingBottom: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  searchBar: {
    marginVertical: 0,
    marginTop: 16,
  },
});

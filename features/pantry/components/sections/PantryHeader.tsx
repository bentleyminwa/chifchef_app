import { COLORS, FONTS } from '@/lib/config/theme';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PantryHeader = () => {
  return (
    <View style={styles.topPanel}>
      <View style={styles.topPanelIcons}>
        <Feather name='search' size={24} color={COLORS.textLight} />
        <Feather name='bell' size={24} color={COLORS.textLight} />
      </View>

      <View style={styles.pantryHeader}>
        <Text style={styles.pantryHeaderText}>Pantry</Text>
        <FontAwesome6 name='sliders' size={24} color={COLORS.textLight} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topPanel: {
    paddingVertical: 8,
  },
  topPanelIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  pantryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 24,
  },
  pantryHeaderText: {
    fontSize: 28,
    fontFamily: FONTS.sandBold,
    color: COLORS.text,
  },
});

export default PantryHeader;

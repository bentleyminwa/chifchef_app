import { COLORS, FONTS } from '@/lib/config/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { PANTRYITEM } from '../../types';
import ItemDetailsSummary from './ItemDetailsSummary';
import ItemDetailsToolbar from './ItemDetailsToolbar';
import PairingSection from './PairingSection';

interface PantryDetailListHeaderProps {
  item: PANTRYITEM;
}

const PantryDetailListHeader = ({ item }: PantryDetailListHeaderProps) => {
  return (
    <View>
      <ItemDetailsToolbar />
      <ItemDetailsSummary item={item} />
      <PairingSection />
      <Text style={styles.sectionTitle}>Or cook with what you have</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.textLight,
    paddingTop: 20,
  },
});

export default PantryDetailListHeader;

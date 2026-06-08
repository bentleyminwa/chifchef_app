import { PAIRING_INGREDIENTS } from '@/assets/data';
import { COLORS, FONTS } from '@/lib/config/theme';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { PANTRYITEM } from '../../types';
import PairingChip from '../ui/PairingChip';

const PairingSection = () => {
  const renderItem = ({ item }: { item: PANTRYITEM }) => (
    <PairingChip ingredient={item} onPress={() => {}} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let&apos;s cook it!</Text>
      <Text style={styles.subtitle}>Pick the best pairing</Text>

      <FlatList
        data={PAIRING_INGREDIENTS}
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.sandBold,
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.textLight,
  },
  list: {
    gap: 16,
  },
});

export default PairingSection;

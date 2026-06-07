import { COLORS, FONTS } from '@/lib/config/theme';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { PANTRYITEM } from '../../types';

interface PantryItemProps {
  item: PANTRYITEM;
}

const PantryItem = ({ item }: PantryItemProps) => {
  return (
    <View style={styles.pantryItem}>
      <View>
        <Image source={item.image_url} style={styles.pantryItemImage} />
      </View>
      <View style={styles.pantryItemCenter}>
        <Text
          style={styles.pantryItemName}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {item.name}
        </Text>
        <Text style={styles.pantryItemExpiry}>Expiring in 10 days</Text>
      </View>
      <View style={styles.pantryItemRight}>
        <Text style={styles.pantryItemQuantity}>{item.quantity}</Text>
        <Text style={styles.pantryItemCategory}>{item.category}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pantryItem: {
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 20,
    backgroundColor: COLORS.background,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 18,
  },
  pantryItemImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  pantryItemCenter: {
    flex: 1,
    gap: 4,
  },
  pantryItemName: {
    fontSize: 16,
    fontFamily: FONTS.sandBold,
    color: COLORS.textMuted,
  },
  pantryItemExpiry: {
    fontSize: 12,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.textLight,
  },
  pantryItemRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 4,
  },
  pantryItemQuantity: {
    fontSize: 12,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.textMuted,
  },
  pantryItemCategory: {
    fontSize: 10,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.textLight,
  },
});

export default PantryItem;

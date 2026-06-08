import { COLORS, FONTS } from '@/lib/config/theme';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { PANTRYITEM } from '../../types';
import {
  formatDaysLabel,
  getDaysInPantry,
  getDaysUntilExpiry,
  isExpiringSoon,
} from '../../utils/date';
import DetailStat from '../ui/DetailStat';

interface ItemDetailsSummaryProps {
  item: PANTRYITEM;
}

const ItemDetailsSummary = ({ item }: ItemDetailsSummaryProps) => {
  const daysInPantry = getDaysInPantry(item?.created_at);
  const daysUntilExpiry = getDaysUntilExpiry(item?.expiration_date);
  const quantity = item?.quantity?.trim() || '—';
  const showExpiryWarning = isExpiringSoon(daysUntilExpiry);

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.imageRow}>
          <Image source={item.image_url} style={styles.image} />
          <Text style={styles.meta}>
            {item.category} in {item.storage}
          </Text>
        </View>

        <View style={styles.stats}>
          <DetailStat
            label='In the pantry'
            value={formatDaysLabel(daysInPantry)}
          />
          <DetailStat
            label='Expiring in'
            value={formatDaysLabel(daysUntilExpiry)}
            labelColor={showExpiryWarning ? COLORS.warning : undefined}
            valueColor={showExpiryWarning ? COLORS.warning : undefined}
          />
          <DetailStat label='Quantity' value={quantity} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingVertical: 20,
    gap: 12,
  },
  container: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
    gap: 16,
  },
  name: {
    fontSize: 32,
    fontFamily: FONTS.sandBold,
    color: COLORS.text,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  image: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  meta: {
    fontSize: 15,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.textLight,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
});

export default ItemDetailsSummary;

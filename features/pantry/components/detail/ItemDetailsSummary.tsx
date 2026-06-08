import { COLORS, FONTS } from '@/lib/config/theme';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { PANTRYITEM } from '../../types';
import DetailStat from '../ui/DetailStat';

interface ItemDetailsSummaryProps {
  item: PANTRYITEM;
}

const ItemDetailsSummary = ({ item }: ItemDetailsSummaryProps) => {
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
          <DetailStat label='In the pantry' value='3 days' />
          <DetailStat
            label='Expiring in'
            value='2 days'
            labelColor={COLORS.warning}
            valueColor={COLORS.warning}
          />
          <DetailStat label='Quantity' value='500 g' />
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

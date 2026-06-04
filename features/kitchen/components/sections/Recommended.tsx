import { RECOMMENDED_RECIPES } from '@/assets/data';
import { COLORS, FONTS } from '@/lib/config/theme';
import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const RecommendedSection = () => {
  return (
    <View style={styles.recommendedSection}>
      <View style={styles.recommendedHeader}>
        <Text style={styles.recommendedTitle}>Recommended for you</Text>
        <View style={styles.recommendedViewAll}>
          <Text style={styles.recommendedViewAllText}>View All</Text>
          <Entypo name='chevron-right' size={14} color={COLORS.primary} />
        </View>
      </View>

      <FlatList
        data={RECOMMENDED_RECIPES}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recommendedList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recommendedItem}>
            <Image
              source={item.image_url}
              style={styles.recommendedItemImage}
            />
            <Text style={styles.recommendedItemTitle}>{item.title}</Text>
            <Text style={styles.recommendedItemDifficulty}>
              {item.difficulty}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recommendedSection: {
    marginTop: 16,
  },
  recommendedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 20,
  },
  recommendedTitle: {
    fontFamily: FONTS.sandBold,
    fontSize: 20,
    color: COLORS.text,
  },
  recommendedViewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendedViewAllText: {
    fontFamily: FONTS.sandMedium,
    fontSize: 14,
    color: COLORS.primary,
  },
  recommendedList: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
    paddingHorizontal: 20,
  },
  recommendedItem: {
    width: 160,
  },
  recommendedItemImage: {
    width: '100%',
    height: 200,
    borderRadius: 24,
    shadowColor: COLORS.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recommendedItemTitle: {
    fontFamily: FONTS.sandBold,
    fontSize: 15,
    color: COLORS.text,
    marginTop: 2,
  },
  recommendedItemDifficulty: {
    fontFamily: FONTS.sandMedium,
    fontSize: 13,
    color: COLORS.textLight,
  },
});

export default RecommendedSection;

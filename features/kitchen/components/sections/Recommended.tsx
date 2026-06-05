import { RECOMMENDED_RECIPES } from '@/assets/data';
import { COLORS, FONTS } from '@/lib/config/theme';
import { Entypo } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const RecommendedSection = () => {
  return (
    <View style={styles.recommendedSection}>
      <View style={styles.recommendedHeader}>
        {/* If user adds ingredients, then this section becomes "Cook from your Pantry" instead of "Recommended for you" */}
        <Text style={styles.recommendedTitle}>Recommended for you</Text>
        <View style={styles.recommendedViewAll}>
          {/* Instead of a generic "view all", we should use a relevant icon that informs user of items they have in the pantry(quick view). If the user hasn't added any ingredients, then the info should be somethinglike, "try adding ingredients to see recipes based on what you have" */}
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
            <Text
              style={styles.recommendedItemTitle}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {item.title}
            </Text>
            <View>
              <View style={styles.recommendedItemDifficulty}>
                {item.difficulty === 'Easy' ? (
                  <FontAwesome5 name='fire' size={11} color={COLORS.success} />
                ) : item.difficulty === 'Medium' ? (
                  <FontAwesome5 name='fire' size={11} color={COLORS.warning} />
                ) : (
                  <FontAwesome5 name='fire' size={11} color={COLORS.danger} />
                )}
                <Text style={styles.recommendedItemDifficultyText}>
                  {item.difficulty}
                </Text>
              </View>
            </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recommendedItemDifficultyText: {
    fontFamily: FONTS.sandMedium,
    fontSize: 13,
    color: COLORS.textLight,
  },
});

export default RecommendedSection;

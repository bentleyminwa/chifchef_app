import { CATEGORIES } from '@/lib/config/constants';
import { COLORS, FONTS } from '@/lib/config/theme';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface CategoryItemType {
  id: string;
  name: string;
  icon: any;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = (SCREEN_WIDTH - 40) / 4;
const ICON_CONTAINER_SIZE = Math.min(80, ITEM_WIDTH - 8);

const PAGES: CategoryItemType[][] = [];
for (let i = 0; i < CATEGORIES.length; i += 4) {
  PAGES.push(CATEGORIES.slice(i, i + 4));
}

const CategoriesSection = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffset / SCREEN_WIDTH);
    setCurrentPage(pageIndex);
  };

  return (
    <View style={styles.categorySection}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>Explore Meals</Text>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.categoriesScroll}
      >
        {PAGES.map((page, pageIndex) => (
          <View key={pageIndex} style={styles.pageContainer}>
            {page.map((category) => {
              return (
                <Link
                  key={category.id}
                  href={{
                    pathname: '/recipes/[category]' as any,
                    params: { category: category.id },
                  }}
                  asChild
                >
                  <Pressable style={styles.categoryItem}>
                    <View style={styles.categoryIconContainer}>
                      <Image
                        source={category.icon}
                        style={styles.categoryIcon}
                      />
                    </View>
                    <Text style={styles.categoryLabel}>{category.name}</Text>
                  </Pressable>
                </Link>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {/* Pagination slider dots */}
      {PAGES.length > 1 && (
        <View style={styles.paginationContainer}>
          {PAGES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentPage === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  categorySection: {
    marginTop: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 20,
  },
  categoryTitle: {
    fontFamily: FONTS.sandBold,
    fontSize: 20,
    color: COLORS.text,
  },
  categoriesScroll: {
    paddingVertical: 8,
  },
  pageContainer: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  categoryItem: {
    width: ITEM_WIDTH,
    alignItems: 'center',
  },
  categoryIconContainer: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    borderColor: COLORS.borderLight,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  categoryLabel: {
    marginTop: 8,
    fontSize: 13,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 16,
    backgroundColor: COLORS.primary,
  },
  inactiveDot: {
    width: 6,
    backgroundColor: COLORS.placeholder,
  },
});

export default CategoriesSection;

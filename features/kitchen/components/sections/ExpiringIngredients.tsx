import { PANTRY_ITEMS } from '@/assets/data';
import {
  getDaysUntilExpiry,
  isExpiringSoon,
  formatDaysLabel,
} from '@/features/pantry/utils/date';
import { COLORS, FONTS } from '@/lib/config/theme';
import { Link } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ExpiringItem {
  id: string;
  name: string;
  image_url: any;
  quantity: string;
  daysUntilExpiry: number | null;
  isExpired: boolean;
}

const ExpiringIngredients = () => {
  // Get items expiring in next 3 days
  const expiringItems: ExpiringItem[] = PANTRY_ITEMS.filter((item) => {
    const daysUntil = getDaysUntilExpiry(item.expiration_date);
    return daysUntil !== null && daysUntil <= 3;
  })
    .map((item) => ({
      id: item.id,
      name: item.name,
      image_url: item.image_url,
      quantity: item.quantity,
      daysUntilExpiry: getDaysUntilExpiry(item.expiration_date),
      isExpired: (getDaysUntilExpiry(item.expiration_date) ?? 0) < 0,
    }))
    .sort((a, b) => (a.daysUntilExpiry ?? 999) - (b.daysUntilExpiry ?? 999))
    .slice(0, 5);

  if (expiringItems.length === 0) return null;

  const getUrgencyColor = (daysUntil: number | null) => {
    if (daysUntil === null || daysUntil < 0) return COLORS.danger;
    if (daysUntil === 0) return COLORS.danger;
    if (daysUntil === 1) return COLORS.warning;
    return COLORS.secondary;
  };

  const getUrgencyLabel = (daysUntil: number | null) => {
    if (daysUntil === null || daysUntil < 0) return 'Expired';
    return formatDaysLabel(daysUntil);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expiring Soon</Text>
        <Link href="/(tabs)/pantry" asChild>
          <Pressable>
            <Text style={styles.viewAll}>View all</Text>
          </Pressable>
        </Link>
      </View>

      <FlatList
        data={expiringItems}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.itemsList}
        renderItem={({ item }) => {
          const urgencyColor = getUrgencyColor(item.daysUntilExpiry);
          const urgencyLabel = getUrgencyLabel(item.daysUntilExpiry);

          return (
            <Link href={`/pantry/${item.id}`} asChild>
              <Pressable style={styles.itemCard}>
                <View style={styles.imageContainer}>
                  <Image
                    source={item.image_url}
                    style={styles.itemImage}
                  />
                  <View
                    style={[
                      styles.urgencyBadge,
                      { backgroundColor: urgencyColor },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="alert"
                      size={10}
                      color={COLORS.white}
                    />
                    <Text style={styles.urgencyText}>{urgencyLabel}</Text>
                  </View>
                </View>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
              </Pressable>
            </Link>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  title: {
    fontFamily: FONTS.sandBold,
    fontSize: 18,
    color: COLORS.text,
  },
  viewAll: {
    fontFamily: FONTS.sandMedium,
    fontSize: 13,
    color: COLORS.primary,
  },
  itemsList: {
    gap: 12,
    paddingHorizontal: 20,
  },
  itemCard: {
    width: 100,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: COLORS.grayLight,
  },
  urgencyBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  urgencyText: {
    fontFamily: FONTS.sandBold,
    fontSize: 9,
    color: COLORS.white,
  },
  itemName: {
    fontFamily: FONTS.sandBold,
    fontSize: 12,
    color: COLORS.text,
    textAlign: 'center',
  },
  itemQuantity: {
    fontFamily: FONTS.sandRegular,
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
});

export default ExpiringIngredients;

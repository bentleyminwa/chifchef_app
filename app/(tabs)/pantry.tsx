import { COLORS, FONTS } from '@/lib/config/theme';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PANTRY_ITEMS, STORAGE_FILTER } from '../../assets/data';

export default function PantryScreen() {
  const [activeStorage, setActiveStorage] = useState<string>('all');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' backgroundColor={COLORS.background} />

      {/* Pantry SearchIcon and NotificationIcon */}
      <View style={[styles.topPanel]}>
        <View style={styles.topPanelIcons}>
          <Feather name='search' size={24} color={COLORS.textLight} />
          <Feather name='bell' size={24} color={COLORS.textLight} />
        </View>

        {/* Header */}
        <View style={styles.pantryHeader}>
          <Text style={styles.pantryHeaderText}>Pantry</Text>
          <FontAwesome6 name='sliders' size={24} color={COLORS.textLight} />
        </View>

        {/* Scrollable filter for storage of pantry ingredients(All, Fridge, Freezer, Dry Pantry, etc.) */}
        <View style={styles.storageFilterContainer}>
          {STORAGE_FILTER.map((filter) => (
            <TouchableOpacity
              key={filter.value}
              style={[
                styles.storageFilter,
                activeStorage === filter.value && styles.activeStorage,
              ]}
              onPress={() => setActiveStorage(filter.value)}
            >
              <Text
                style={[
                  styles.storageFilterText,
                  activeStorage === filter.value && styles.activeStorageText,
                ]}
              >
                {filter.label}
              </Text>
              <View style={[styles.storageFilterCount]}>
                <Text
                  style={[
                    styles.storageFilterCountText,
                    activeStorage === filter.value &&
                      styles.activeStorageCountText,
                  ]}
                >
                  {filter.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Scrollable list of pantry ingredients - image, name, quantity, expires in x days, storage location, date added, category*/}
      <FlatList
        data={PANTRY_ITEMS}
        renderItem={({ item }) => {
          return (
            <View style={styles.pantryItem}>
              <View style={styles.pantryItemLeft}>
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
        }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.pantryList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topPanel: {
    paddingHorizontal: 20,
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
  storageFilterContainer: {
    flexDirection: 'row',
    gap: 30,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
    marginBottom: 24,
  },
  storageFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    gap: 6,
  },
  activeStorage: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 2,
  },
  storageFilterText: {
    fontSize: 15,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.textLight,
  },
  activeStorageText: {
    color: COLORS.primary,
  },
  storageFilterCount: {
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.grayLight,
    borderRadius: 20,
  },
  storageFilterCountText: {
    fontSize: 11,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.textLight,
  },
  activeStorageCountText: {
    color: COLORS.primary,
  },
  pantryList: {
    flex: 1,
    paddingHorizontal: 20,
  },
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
  pantryItemLeft: {},
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

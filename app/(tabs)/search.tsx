import { PANTRY_ITEMS } from "@/assets/data";
import SearchBar from "@/features/kitchen/components/ui/SearchBar";
import CategoryCard from "@/features/recipes/components/CategoryCard";
import RecipeCard from "@/features/recipes/components/ui/RecipeCard";
import { useRecipesByCategory } from "@/features/recipes/hooks/useRecipesByCategory";
import { computeIngredientsMatch } from "@/features/recipes/utils/ingredientsMatch";
import { RECIPE_CATEGORIES } from "@/lib/config/recipeCategories";
import { COLORS, FONTS } from "@/lib/config/theme";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CATEGORY_COLUMNS = 2;
const CATEGORY_ITEM_WIDTH = (SCREEN_WIDTH - 40) / CATEGORY_COLUMNS;

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollOffset = useRef(new Animated.Value(0)).current;
  const { organizeRecipes } = useRecipesByCategory();

  const recipes = organizeRecipes();

  const handleFilterPress = () => {
    // Filter action can be integrated later
  };

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipes/${recipeId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' backgroundColor={COLORS.background} />

      <Animated.View
        style={[
          styles.stickySearchContainer,
          {
            transform: [
              {
                translateY: scrollOffset.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, -10],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.searchBarWrapper}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={handleFilterPress}
            placeholder='Search recipes...'
          />
        </View>
      </Animated.View>

      <Animated.ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffset } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Category Grid */}
        <View style={styles.categoriesGridContainer}>
          <FlatList
            data={RECIPE_CATEGORIES}
            numColumns={CATEGORY_COLUMNS}
            scrollEnabled={false}
            contentContainerStyle={styles.categoriesGrid}
            columnWrapperStyle={styles.columnWrapper}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Link
                href={{
                  pathname: "/recipes/[category]" as any,
                  params: { category: item.id },
                }}
                asChild
              >
                <Pressable style={{ width: CATEGORY_ITEM_WIDTH }}>
                  <CategoryCard
                    title={item.title}
                    description={item.description}
                    backgroundColor={item.backgroundColor}
                    textColor={item.textColor}
                    onPress={() => {}}
                  />
                </Pressable>
              </Link>
            )}
          />
        </View>

        {/* Recommended For You Section */}
        {recipes.breakfast.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommended For You</Text>
            <FlatList
              data={recipes.breakfast}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.recipesList}
              renderItem={({ item }) => {
                const match = computeIngredientsMatch(item, PANTRY_ITEMS);
                return (
                  <RecipeCard
                    recipe={item}
                    ingredientsMatch={match}
                    onPress={() => handleRecipePress(item.id)}
                  />
                );
              }}
            />
          </View>
        )}

        {/* Quick Meals Section */}
        {recipes.quickMeals.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Meals</Text>
            <FlatList
              data={recipes.quickMeals}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.recipesList}
              renderItem={({ item }) => {
                const match = computeIngredientsMatch(item, PANTRY_ITEMS);
                return (
                  <RecipeCard
                    recipe={item}
                    ingredientsMatch={match}
                    onPress={() => handleRecipePress(item.id)}
                  />
                );
              }}
            />
          </View>
        )}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  stickySearchContainer: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingVertical: 12,
    zIndex: 10,
  },
  searchBarWrapper: {
    marginBottom: 8,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  categoriesGridContainer: {
    marginTop: 16,
  },
  categoriesGrid: {
    paddingHorizontal: 12,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  section: {
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: FONTS.sandBold,
    fontSize: 18,
    color: COLORS.text,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  recipesList: {
    gap: 12,
    paddingHorizontal: 20,
  },
});

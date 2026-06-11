import { PANTRY_ITEMS, RECOMMENDED_RECIPES } from "@/assets/data";
import RecipeCard from "@/features/recipes/components/ui/RecipeCard";
import { computeIngredientsMatch } from "@/features/recipes/utils/ingredientsMatch";
import { CATEGORIES } from "@/lib/config/constants";
import { COLORS, FONTS } from "@/lib/config/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  console.log("Category ID:", id);
  const categoryId = Array.isArray(id) ? id[0] : id;

  const categoryData = CATEGORIES.find((c) => c.id === categoryId);
  const filteredRecipes = RECOMMENDED_RECIPES.filter(
    (recipe) => recipe.meal_type === categoryId,
  );

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipes/${recipeId}`);
  };

  if (!categoryData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Category not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image source={categoryData.icon} style={styles.categoryIcon} />
          <Text style={styles.categoryName}>{categoryData.title}</Text>
        </View>
        <Text style={styles.recipeCount}>
          {filteredRecipes.length}{" "}
          {filteredRecipes.length === 1 ? "recipe" : "recipes"}
        </Text>
      </View>

      {filteredRecipes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No recipes found in this category
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
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
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
  },
  categoryName: {
    fontFamily: FONTS.sandBold,
    fontSize: 20,
    color: COLORS.text,
  },
  recipeCount: {
    fontFamily: FONTS.sandMedium,
    fontSize: 12,
    color: COLORS.textLight,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontFamily: FONTS.sandMedium,
    fontSize: 16,
    color: COLORS.textLight,
  },
  notFound: {
    flex: 1,
    textAlignVertical: "center",
    textAlign: "center",
    fontFamily: FONTS.sandMedium,
    fontSize: 16,
    color: COLORS.textLight,
  },
});

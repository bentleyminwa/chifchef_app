import { COLORS } from "@/lib/config/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import type { Recipe } from "../../types";
import RecipeContentTabs from "./RecipeContentTabs";
import RecipeDescriptionSection from "./RecipeDescriptionSection";
import RecipeHeaderSection from "./RecipeHeaderSection";
import RecipeStatsRow from "./RecipeStatsRow";

interface RecipeContentCardProps {
  recipe: Recipe;
}

const RecipeContentCard = ({ recipe }: RecipeContentCardProps) => {
  return (
    <View style={styles.card}>
      <RecipeHeaderSection recipe={recipe} />
      <RecipeStatsRow recipe={recipe} />
      <RecipeDescriptionSection description={recipe.description} />
      <RecipeContentTabs recipe={recipe} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -24,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
});

export default RecipeContentCard;

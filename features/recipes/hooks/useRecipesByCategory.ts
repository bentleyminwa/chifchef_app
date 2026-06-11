import { RECOMMENDED_RECIPES } from "@/assets/data";
import { Recipe } from "@/features/recipes/types";

export const useRecipesByCategory = () => {
  const getRecipesByMealType = (mealType: string): Recipe[] => {
    return RECOMMENDED_RECIPES.filter(
      (recipe) => recipe.meal_type === mealType,
    );
  };

  const getCookFromPantryRecipes = (): Recipe[] => {
    // fetch recipes based on pantry items - for now, return a static list of recipes that can be cooked from pantry items
    return RECOMMENDED_RECIPES.slice(0, 3);
  };

  const getQuickMeals = (): Recipe[] => {
    return RECOMMENDED_RECIPES.filter(
      (recipe) => recipe.prep_time_minutes + recipe.cook_time_minutes <= 30,
    );
  };

  const getHealthyRecipes = (): Recipe[] => {
    // Recipes with calories < 400 or marked as healthy
    return RECOMMENDED_RECIPES.filter((recipe) => recipe.calories < 400);
  };

  const organizeRecipes = () => {
    return {
      cookFromPantry: getCookFromPantryRecipes(),
      breakfast: getRecipesByMealType("breakfast"),
      lunch: getRecipesByMealType("lunch"),
      dinner: getRecipesByMealType("dinner"),
      dessert: getRecipesByMealType("dessert"),
      quickMeals: getQuickMeals(),
      healthy: getHealthyRecipes(),
    };
  };

  return {
    getRecipesByMealType,
    getCookFromPantryRecipes,
    getQuickMeals,
    getHealthyRecipes,
    organizeRecipes,
  };
};

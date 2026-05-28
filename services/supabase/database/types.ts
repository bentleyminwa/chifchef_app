import type { Database } from 'database.types';

export type PantryItemRow = Database['public']['Tables']['pantry_items']['Row'];
export type GroceryItemRow = Database['public']['Tables']['grocery_items']['Row'];
export type MealPlanSlotRow = Database['public']['Tables']['meal_plan_slots']['Row'];
export type MealType = Database['public']['Enums']['meal_type_enum'];

export type RecipeSummary = {
  id: string;
  title: string;
  slug: string;
  image_url: string | null;
  cook_time_minutes: number | null;
  difficulty: string | null;
  meal_type: string | null;
  recipe_nutrition: { calories: number } | null;
};

export interface MealPlanSlotWithRecipe extends MealPlanSlotRow {
  recipe: RecipeSummary | null;
}

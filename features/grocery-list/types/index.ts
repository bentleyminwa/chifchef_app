import type { Database } from 'database.types';

export type GroceryUnit = Database['public']['Enums']['unit_enum'];

export type GroceryAddedFrom = 'manual' | 'meal_plan' | 'insight';

export interface GroceryNeededForRecipe {
  id: string;
  title: string;
}

export interface GroceryListItemFlat {
  id: string;
  ingredient_id: string;
  ingredient_name: string;
  ingredient_image_url: string | null;
  category_id: string | null;
  category_name: string;
  quantity: number;
  unit: GroceryUnit;
  is_completed: boolean;
  added_from: GroceryAddedFrom;
  created_at: string;
  needed_for: GroceryNeededForRecipe[];
}

export interface GroceryMissingInsight {
  ingredient_id: string;
  ingredient_name: string;
  ingredient_image_url: string | null;
  category_id: string | null;
  category_name: string;
  missing_quantity: number;
  unit: GroceryUnit;
  needed_for: GroceryNeededForRecipe[];
}

export interface IngredientOption {
  id: string;
  name: string;
  image_url: string | null;
  category_id: string | null;
  category_name: string;
}

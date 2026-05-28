import type {
  GroceryListItemFlat,
  GroceryMissingInsight,
  IngredientOption,
} from '@/features/grocery-list/types';
import { supabase } from '../client/supabase';
import {
  mapGroceryListItems,
  mapIngredientOptions,
  mapMissingInsights,
  type IngredientRowWithCategory,
  type RecipeIngredientWithRelations,
  type RecipeLinkRow,
} from './grocery-mappers';
import { getWeekMealPlanSlots } from './meal-plan';
import type { GroceryItemRow } from './types';

export async function getIngredientsWithCategories(): Promise<
  IngredientOption[]
> {
  const { data, error } = await supabase
    .from('ingredients')
    .select('id, name, image_url, category_id, ingredient_categories(id, name)')
    .order('name', { ascending: true });

  if (error) throw error;

  return mapIngredientOptions((data ?? []) as IngredientRowWithCategory[]);
}

export async function getUserGroceryItems(
  userId: string,
): Promise<GroceryListItemFlat[]> {
  const { data: groceryRows, error: groceryError } = await supabase
    .from('grocery_items')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (groceryError) throw groceryError;
  if (!groceryRows || groceryRows.length === 0) {
    return [];
  }

  const ingredientIds = Array.from(
    new Set(groceryRows.map((row) => row.ingredient_id)),
  );
  const groceryItemIds = groceryRows.map((row) => row.id);

  const { data: ingredientRows, error: ingredientError } = await supabase
    .from('ingredients')
    .select('id, name, image_url, category_id, ingredient_categories(id, name)')
    .in('id', ingredientIds);

  if (ingredientError) throw ingredientError;

  const { data: recipeLinks, error: recipeLinksError } = await supabase
    .from('grocery_item_recipes')
    .select('grocery_item_id, recipe_id, recipes(id, title)')
    .in('grocery_item_id', groceryItemIds);

  if (recipeLinksError) throw recipeLinksError;

  return mapGroceryListItems({
    groceryRows: groceryRows as GroceryItemRow[],
    ingredientRows: (ingredientRows ?? []) as IngredientRowWithCategory[],
    recipeLinks: (recipeLinks ?? []) as RecipeLinkRow[],
  });
}

export async function getMissingGroceryInsights(
  userId: string,
  weekStart: string,
  weekEnd: string,
): Promise<GroceryMissingInsight[]> {
  const slots = await getWeekMealPlanSlots(userId, weekStart, weekEnd);
  const recipeIds = Array.from(
    new Set(
      slots
        .map((slot) => slot.recipe_id)
        .filter((recipeId): recipeId is string => Boolean(recipeId)),
    ),
  );

  if (recipeIds.length === 0) {
    return [];
  }

  const { data: recipeIngredientRows, error: recipeIngredientsError } =
    await supabase
      .from('recipe_ingredients')
      .select(
        'recipe_id, ingredient_id, quantity, unit, recipes(id, title), ingredients(id, name, image_url, category_id, ingredient_categories(id, name))',
      )
      .in('recipe_id', recipeIds)
      .not('ingredient_id', 'is', null);

  if (recipeIngredientsError) throw recipeIngredientsError;
  if (!recipeIngredientRows || recipeIngredientRows.length === 0) {
    return [];
  }

  const typedRows = recipeIngredientRows as RecipeIngredientWithRelations[];
  const ingredientIds = Array.from(
    new Set(
      typedRows
        .map((row) => row.ingredient_id)
        .filter((ingredientId): ingredientId is string =>
          Boolean(ingredientId),
        ),
    ),
  );

  const { data: existingGroceryRows, error: existingError } = await supabase
    .from('grocery_items')
    .select('ingredient_id, unit')
    .eq('user_id', userId)
    .in('ingredient_id', ingredientIds);

  if (existingError) throw existingError;

  const existingKeys = new Set(
    (existingGroceryRows ?? []).map(
      (row) => `${row.ingredient_id}:${row.unit}`,
    ),
  );

  return mapMissingInsights(typedRows, existingKeys);
}

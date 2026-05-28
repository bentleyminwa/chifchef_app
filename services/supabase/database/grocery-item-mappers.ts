import type { GroceryAddedFrom, GroceryListItemFlat } from '@/features/grocery-list/types';
import { mapIngredientLookup, type IngredientRowWithCategory } from './grocery-ingredient-mappers';
import { normalizeOneRelation } from './shared';
import type { GroceryItemRow } from './types';

export type RecipeLinkRow = {
  grocery_item_id: string;
  recipe_id: string;
  recipes?:
    | { id: string; title: string }
    | { id: string; title: string }[]
    | null;
};

export function mapGroceryListItems(input: {
  groceryRows: GroceryItemRow[];
  ingredientRows: IngredientRowWithCategory[];
  recipeLinks: RecipeLinkRow[];
}): GroceryListItemFlat[] {
  const { groceryRows, ingredientRows, recipeLinks } = input;
  const ingredientMap = mapIngredientLookup(ingredientRows);

  const neededForMap = new Map<string, Array<{ id: string; title: string }>>();
  recipeLinks.forEach((link) => {
    const recipe = normalizeOneRelation(link.recipes);
    if (!recipe) {
      return;
    }

    const neededFor = neededForMap.get(link.grocery_item_id) ?? [];
    if (!neededFor.some((item) => item.id === recipe.id)) {
      neededFor.push({ id: recipe.id, title: recipe.title });
    }
    neededForMap.set(link.grocery_item_id, neededFor);
  });

  return groceryRows.map((item) => {
    const ingredient = ingredientMap.get(item.ingredient_id);
    return {
      id: item.id,
      ingredient_id: item.ingredient_id,
      ingredient_name: ingredient?.name ?? 'Unknown ingredient',
      ingredient_image_url: ingredient?.image_url ?? null,
      category_id: ingredient?.category_id ?? null,
      category_name: ingredient?.category_name ?? 'Uncategorized',
      quantity: Number(item.quantity),
      unit: item.unit,
      is_completed: item.is_completed,
      added_from: item.added_from as GroceryAddedFrom,
      created_at: item.created_at,
      needed_for: neededForMap.get(item.id) ?? [],
    };
  });
}

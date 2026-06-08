import type { PANTRYITEM } from '@/features/pantry/types';
import type { IngredientsMatch, Recipe } from '../types';

function ingredientInPantry(name: string, pantry: PANTRYITEM[]): boolean {
  const needle = name.trim().toLowerCase();
  if (!needle) return false;

  return pantry.some((item) => {
    const hay = item.name.trim().toLowerCase();
    return hay === needle || hay.startsWith(needle) || needle.startsWith(hay);
  });
}

export function computeIngredientsMatch(
  recipe: Recipe,
  pantry: PANTRYITEM[],
): IngredientsMatch {
  const required = recipe.ingredients ?? [];
  const matched = required.filter((ingredient) =>
    ingredientInPantry(ingredient.name, pantry),
  ).length;

  return { matched, total: required.length };
}

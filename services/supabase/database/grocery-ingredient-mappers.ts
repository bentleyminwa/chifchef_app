import type { IngredientOption } from '@/features/grocery-list/types';
import { normalizeOneRelation } from './shared';

export type IngredientCategory = { id: string; name: string };
export type IngredientRowWithCategory = {
  id: string;
  name: string;
  image_url: string | null;
  category_id: string | null;
  ingredient_categories?: IngredientCategory | IngredientCategory[] | null;
};

export interface IngredientSummary {
  name: string;
  image_url: string | null;
  category_id: string | null;
  category_name: string;
}

function mapIngredientSummary(ingredient: IngredientRowWithCategory): IngredientSummary {
  const category = normalizeOneRelation(ingredient.ingredient_categories);
  return {
    name: ingredient.name,
    image_url: ingredient.image_url,
    category_id: category?.id ?? null,
    category_name: category?.name ?? 'Uncategorized',
  };
}

export function mapIngredientOptions(
  rows: IngredientRowWithCategory[],
): IngredientOption[] {
  return rows.map((ingredient) => ({
    id: ingredient.id,
    ...mapIngredientSummary(ingredient),
  }));
}

export function mapIngredientLookup(rows: IngredientRowWithCategory[]) {
  const lookup = new Map<string, IngredientSummary>();
  rows.forEach((row) => {
    lookup.set(row.id, mapIngredientSummary(row));
  });
  return lookup;
}

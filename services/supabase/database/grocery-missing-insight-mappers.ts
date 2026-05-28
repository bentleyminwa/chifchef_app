import type { Database } from 'database.types';
import type {
  GroceryMissingInsight,
  GroceryUnit,
} from '@/features/grocery-list/types';
import { normalizeOneRelation } from './shared';

type RecipeRelation = { id: string; title: string };
type CategoryRelation = { id: string; name: string };
type IngredientRelation = {
  id: string;
  name: string;
  image_url: string | null;
  category_id: string | null;
  ingredient_categories?: CategoryRelation | CategoryRelation[] | null;
};

export type RecipeIngredientWithRelations = {
  recipe_id: string | null;
  ingredient_id: string | null;
  quantity: number | null;
  unit: Database['public']['Enums']['unit_enum'] | null;
  recipes?: RecipeRelation | RecipeRelation[] | null;
  ingredients?: IngredientRelation | IngredientRelation[] | null;
};

export function mapMissingInsights(
  recipeIngredientRows: RecipeIngredientWithRelations[],
  existingKeys: Set<string>,
): GroceryMissingInsight[] {
  const aggregate = new Map<
    string,
    GroceryMissingInsight & { needed_for_ids: Set<string> }
  >();

  recipeIngredientRows.forEach((row) => {
    if (!row.ingredient_id) {
      return;
    }

    const unit = (row.unit ?? 'piece') as GroceryUnit;
    const key = `${row.ingredient_id}:${unit}`;

    if (existingKeys.has(key)) {
      return;
    }

    const ingredient = normalizeOneRelation(row.ingredients);
    const recipe = normalizeOneRelation(row.recipes);
    const category = normalizeOneRelation(ingredient?.ingredient_categories);

    const current = aggregate.get(key) ?? {
      ingredient_id: row.ingredient_id,
      ingredient_name: ingredient?.name ?? 'Unknown ingredient',
      ingredient_image_url: ingredient?.image_url ?? null,
      category_id: category?.id ?? null,
      category_name: category?.name ?? 'Uncategorized',
      missing_quantity: 0,
      unit,
      needed_for: [],
      needed_for_ids: new Set<string>(),
    };

    current.missing_quantity += Number(row.quantity ?? 1);

    if (recipe && !current.needed_for_ids.has(recipe.id)) {
      current.needed_for_ids.add(recipe.id);
      current.needed_for.push({ id: recipe.id, title: recipe.title });
    }

    aggregate.set(key, current);
  });

  return Array.from(aggregate.values())
    .map((entry) => {
      const { needed_for_ids, ...item } = entry;
      void needed_for_ids;
      return item;
    })
    .sort((left, right) => {
      const categorySort = left.category_name.localeCompare(right.category_name);
      if (categorySort !== 0) {
        return categorySort;
      }
      return left.ingredient_name.localeCompare(right.ingredient_name);
    });
}

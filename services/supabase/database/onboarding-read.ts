import { supabase } from '../client/supabase';
import {
  getForbiddenCategoryNames,
  toSupabaseInFilter,
} from './onboarding-utils';

type IngredientCategoryRow = { id: string; name: string };

export async function getCuisines() {
  const { data, error } = await supabase.from('cuisines').select('*');
  if (error) throw error;
  return data ?? [];
}

export async function getDiets() {
  const { data, error } = await supabase.from('diets').select('*');
  if (error) throw error;
  return data ?? [];
}

export async function getIngredientCategories() {
  const { data, error } = await supabase
    .from('ingredient_categories')
    .select('*');
  if (error) throw error;
  return data ?? [];
}

interface RawIngredientRow {
  id: string;
  name: string;
  image_url: string | null;
  category_id: string | null;
  ingredient_categories: { name: string } | { name: string }[] | null;
}

export async function getFilteredIngredients(
  selectedDiets: string[],
  limit = 8,
) {
  const { data: categories, error: categoriesError } = await supabase
    .from('ingredient_categories')
    .select('id, name');

  if (categoriesError) throw categoriesError;

  const forbiddenNames = getForbiddenCategoryNames(selectedDiets);
  const forbiddenCategoryIds = (categories ?? [])
    .filter((category: IngredientCategoryRow) =>
      forbiddenNames.includes(category.name),
    )
    .map((category: IngredientCategoryRow) => category.id);

  let query = supabase.from('ingredients').select(`
      *,
      ingredient_categories (
        name
      )
    `);

  if (forbiddenCategoryIds.length > 0) {
    query = query.not(
      'category_id',
      'in',
      toSupabaseInFilter(forbiddenCategoryIds),
    );
  }

  const { data, error } = await query.limit(limit);
  if (error) throw error;

  const rawData = data as unknown as RawIngredientRow[];

  return (rawData ?? []).map((item) => {
    const categoryResult = item.ingredient_categories;
    const category = Array.isArray(categoryResult)
      ? categoryResult[0]
      : categoryResult;

    return {
      id: item.id,
      name: item.name,
      image_url: item.image_url,
      categoryName: category?.name,
    };
  });
}

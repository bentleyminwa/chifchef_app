import type { Database } from 'database.types';

type NamedRow = { id: string; name: string };

type UserCuisineInsert = Database['public']['Tables']['user_cuisines']['Insert'];
type UserDietInsert = Database['public']['Tables']['user_diets']['Insert'];
type PantryItemInsert = Database['public']['Tables']['pantry_items']['Insert'];

export function mapUserCuisineInserts(
  userId: string,
  cuisines: NamedRow[],
): UserCuisineInsert[] {
  return cuisines.map((cuisine) => ({
    user_id: userId,
    cuisine_id: cuisine.id,
  }));
}

export function mapUserDietInserts(
  userId: string,
  diets: NamedRow[],
): UserDietInsert[] {
  return diets.map((diet) => ({
    user_id: userId,
    diet_id: diet.id,
  }));
}

import type { PantryItemSelection } from '@/features/onboarding/types/onboarding.types';

export function mapPantryItemInserts(
  userId: string,
  selections: PantryItemSelection[],
): PantryItemInsert[] {
  return selections.map((selection) => ({
    user_id: userId,
    ingredient_id: selection.id,
    quantity: selection.quantity,
    unit: selection.unit,
  }));
}

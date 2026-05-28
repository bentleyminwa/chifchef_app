import { supabase } from '../client/supabase';
import { normalizeOneRelation } from './shared';
import type {
  MealPlanSlotRow,
  MealPlanSlotWithRecipe,
  MealType,
  RecipeSummary,
} from './types';

export async function getWeekMealPlanSlots(
  userId: string,
  weekStart: string,
  weekEnd: string,
): Promise<MealPlanSlotWithRecipe[]> {
  const { data, error } = await supabase
    .from('meal_plan_slots')
    .select(
      'id, user_id, slot_date, meal_type, recipe_id, created_at, updated_at, recipes(id, title, slug, image_url, cook_time_minutes, difficulty, meal_type, recipe_nutrition(calories))',
    )
    .eq('user_id', userId)
    .gte('slot_date', weekStart)
    .lte('slot_date', weekEnd)
    .order('slot_date', { ascending: true })
    .order('meal_type', { ascending: true });

  if (error) throw error;

  const rows = (data ?? []) as Array<
    MealPlanSlotRow & {
      recipes?: RecipeSummary | RecipeSummary[] | null;
    }
  >;

  return rows.map((slot) => ({
    ...slot,
    recipe: normalizeOneRelation(slot.recipes),
  }));
}

export async function upsertMealPlanSlot(input: {
  userId: string;
  slotDate: string;
  mealType: MealType;
  recipeId: string | null;
}) {
  const { data, error } = await supabase
    .from('meal_plan_slots')
    .upsert(
      {
        user_id: input.userId,
        slot_date: input.slotDate,
        meal_type: input.mealType,
        recipe_id: input.recipeId,
      },
      { onConflict: 'user_id,slot_date,meal_type' },
    )
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

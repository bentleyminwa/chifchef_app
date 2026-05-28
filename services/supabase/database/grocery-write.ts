import type { GroceryUnit } from '@/features/grocery-list/types';
import { supabase } from '../client/supabase';

export async function addManualGroceryItem(input: {
  userId: string;
  ingredientId: string;
  quantity: number;
  unit: GroceryUnit;
}) {
  const { data: existingRow, error: existingError } = await supabase
    .from('grocery_items')
    .select('id, quantity')
    .eq('user_id', input.userId)
    .eq('ingredient_id', input.ingredientId)
    .eq('unit', input.unit)
    .maybeSingle();

  if (existingError) throw existingError;

  if (existingRow) {
    const { data, error } = await supabase
      .from('grocery_items')
      .update({
        quantity: Number(existingRow.quantity) + input.quantity,
      })
      .eq('id', existingRow.id)
      .eq('user_id', input.userId)
      .select('*')
      .single();

    if (error) throw error;
    return data;
  }

  const { data, error } = await supabase
    .from('grocery_items')
    .insert({
      user_id: input.userId,
      ingredient_id: input.ingredientId,
      quantity: input.quantity,
      unit: input.unit,
      added_from: 'manual',
    })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function toggleGroceryItemCompletion(
  userId: string,
  groceryItemId: string,
) {
  const { data: currentRow, error: currentError } = await supabase
    .from('grocery_items')
    .select('id, is_completed')
    .eq('id', groceryItemId)
    .eq('user_id', userId)
    .single();

  if (currentError) throw currentError;

  const { data, error } = await supabase
    .from('grocery_items')
    .update({
      is_completed: !currentRow.is_completed,
    })
    .eq('id', groceryItemId)
    .eq('user_id', userId)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function clearCompletedGroceryItems(userId: string) {
  const { error } = await supabase
    .from('grocery_items')
    .delete()
    .eq('user_id', userId)
    .eq('is_completed', true);

  if (error) throw error;
}

export async function generateGroceryFromMealPlan(input: {
  weekStart: string;
  weekEnd: string;
  onlyMissing: boolean;
  source: 'meal_plan' | 'insight';
}) {
  const { error } = await supabase.rpc('generate_grocery_from_meal_plan', {
    p_start_date: input.weekStart,
    p_end_date: input.weekEnd,
    p_only_missing: input.onlyMissing,
    p_source: input.source,
  });

  if (error) throw error;
}

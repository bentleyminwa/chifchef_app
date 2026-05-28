import { supabase } from '../client/supabase';

export async function updateProfile(
  userId: string,
  updates: { full_name?: string; avatar_url?: string },
) {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  if (error) throw error;
}

export async function getUserCuisines(userId: string) {
  const { data, error } = await supabase
    .from('user_cuisines')
    .select('cuisine_id')
    .eq('user_id', userId);

  if (error) throw error;
  return data.map((item) => item.cuisine_id);
}

export async function getUserDiets(userId: string) {
  const { data, error } = await supabase
    .from('user_diets')
    .select('diet_id')
    .eq('user_id', userId);

  if (error) throw error;
  return data.map((item) => item.diet_id);
}

export async function updateUserCuisines(userId: string, cuisineIds: string[]) {
  // Simple approach: delete existing and insert new
  const { error: deleteError } = await supabase
    .from('user_cuisines')
    .delete()
    .eq('user_id', userId);

  if (deleteError) throw deleteError;

  if (cuisineIds.length === 0) return;

  const { error: insertError } = await supabase
    .from('user_cuisines')
    .insert(cuisineIds.map((id) => ({ user_id: userId, cuisine_id: id })));

  if (insertError) throw insertError;
}

export async function updateUserDiets(userId: string, dietIds: string[]) {
  // Simple approach: delete existing and insert new
  const { error: deleteError } = await supabase
    .from('user_diets')
    .delete()
    .eq('user_id', userId);

  if (deleteError) throw deleteError;

  if (dietIds.length === 0) return;

  const { error: insertError } = await supabase
    .from('user_diets')
    .insert(dietIds.map((id) => ({ user_id: userId, diet_id: id })));

  if (insertError) throw insertError;
}

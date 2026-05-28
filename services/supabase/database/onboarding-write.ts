import type { PantryItemSelection } from '@/features/onboarding/types/onboarding.types';
import { supabase } from '../client/supabase';
import {
  mapPantryItemInserts,
  mapUserCuisineInserts,
  mapUserDietInserts,
} from './onboarding-mappers';

interface OnboardingDataInput {
  cuisines: string[];
  diets: string[];
  pantryItems: PantryItemSelection[];
}

type NamedRow = { id: string; name: string };

async function getCuisinesByName(names: string[]): Promise<NamedRow[]> {
  if (names.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from('cuisines')
    .select('id, name')
    .in('name', names);

  if (error) throw error;
  return data ?? [];
}

async function getDietsByName(names: string[]): Promise<NamedRow[]> {
  if (names.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from('diets')
    .select('id, name')
    .in('name', names);

  if (error) throw error;
  return data ?? [];
}

export async function updateOnboardingStatus(
  userId: string,
  onboarded: boolean,
) {
  const { error } = await supabase
    .from('profiles')
    .update({ onboarded })
    .eq('id', userId);

  if (error) throw error;
}

export async function saveOnboardingData(
  userId: string,
  data: OnboardingDataInput,
) {
  const [cuisines, diets] = await Promise.all([
    getCuisinesByName(data.cuisines),
    getDietsByName(data.diets),
  ]);

  const userCuisineInserts = mapUserCuisineInserts(userId, cuisines);
  if (userCuisineInserts.length > 0) {
    const { error } = await supabase
      .from('user_cuisines')
      .insert(userCuisineInserts);
    if (error) throw error;
  }

  const userDietInserts = mapUserDietInserts(userId, diets);
  if (userDietInserts.length > 0) {
    const { error } = await supabase.from('user_diets').insert(userDietInserts);
    if (error) throw error;
  }

  const pantryItemInserts = mapPantryItemInserts(userId, data.pantryItems);
  if (pantryItemInserts.length > 0) {
    const { error } = await supabase
      .from('pantry_items')
      .insert(pantryItemInserts);
    if (error) throw error;
  }

  await updateOnboardingStatus(userId, true);
}

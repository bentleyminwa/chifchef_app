import type { ReactNode } from 'react';
import type { Database } from 'database.types';

export type UnitEnum = Database['public']['Enums']['unit_enum'];

export interface OnboardingIngredientOption {
  id: string;
  name: string;
  image_url: string | null;
  emoji: string | null;
  categoryName?: string;
}

export interface PantryItemSelection {
  id: string;
  name: string;
  quantity: number;
  unit: UnitEnum;
}

export interface OnboardingSelections {
  cuisines: string[];
  diets: string[];
  pantryItems: PantryItemSelection[];
}

export interface OnboardingContextType {
  step: number;
  setStep: (step: number) => void;
  selectedCuisines: string[];
  toggleCuisine: (cuisine: string) => void;
  dietaryPreferences: string[];
  toggleDietary: (diet: string) => void;
  selectedPantryItems: PantryItemSelection[];
  togglePantryItem: (item: OnboardingIngredientOption) => void;
  updatePantryItem: (id: string, updates: Partial<PantryItemSelection>) => void;
}

export interface OnboardingProviderProps {
  children: ReactNode;
}

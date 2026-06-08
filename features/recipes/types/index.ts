import { ImageSourcePropType } from 'react-native';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type MealType =
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'dessert'
  | 'snacks'
  | 'smoothie';

export interface IngredientsMatch {
  matched: number;
  total: number;
}

export interface Recipe {
  id: string;
  title: string;
  slug: string;
  description: string;
  prep_time_minutes: number;
  cook_time_minutes: number;
  servings: number;
  image_url: ImageSourcePropType;
  difficulty: Difficulty;
  meal_type: MealType;
  ingredients: string[];
}

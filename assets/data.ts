import { ImageSourcePropType } from 'react-native';
import cookbook from './icons/cookbook.png';
import refrigerator from './icons/fridge.png';
import home from './icons/home.png';
import person from './icons/user.png';

import breakfast from './images/breakfast.png';
import dessert from './images/dessert.png';
import dinner from './images/dinner.png';
import lunch from './images/lunch.png';
import smoothie from './images/smoothie.png';
import snacks from './images/snacks.png';

import food1 from '@/assets/images/recipes/food1.jpg';
import food2 from '@/assets/images/recipes/food2.jpg';
import food3 from '@/assets/images/recipes/food3.jpg';
import food4 from '@/assets/images/recipes/food4.jpg';

import bread from '@/assets/images/ingredients/bread.png';
import chicken from '@/assets/images/ingredients/chicken.png';
import eggs from '@/assets/images/ingredients/eggs.png';
import milk from '@/assets/images/ingredients/milk-bottle.png';
import rice from '@/assets/images/ingredients/rice.png';

export const TAB_ICONS = {
  home,
  refrigerator,
  cookbook,
  person,
};

export const CATEGORY_IMAGES = {
  breakfast,
  lunch,
  dinner,
  dessert,
  snacks,
  smoothie,
};

type MealType =
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'dessert'
  | 'snacks'
  | 'smoothie';

type DifficultyType = 'Easy' | 'Medium' | 'Hard';

type RecommendedRecipe = {
  id: string;
  title: string;
  slug: string;
  description: string;
  prep_time_minutes: number;
  cook_time_minutes: number;
  servings: number;
  image_url: ImageSourcePropType;
  difficulty: DifficultyType;
  meal_type: MealType;
};

export const RECOMMENDED_RECIPES: RecommendedRecipe[] = [
  {
    id: '1',
    title: 'Beef Wet Fry',
    slug: 'beef-wet-fry',
    description: 'Tender beef simmered in a rich tomato-onion gravy.',
    prep_time_minutes: 15,
    cook_time_minutes: 30,
    servings: 4,
    image_url: food1,
    difficulty: 'Hard',
    meal_type: 'dinner',
  },
  {
    id: '2',
    title: 'Chapati & Stew',
    slug: 'chapati-stew',
    description: '',
    prep_time_minutes: 20,
    cook_time_minutes: 40,
    servings: 6,
    image_url: food2,
    difficulty: 'Easy',
    meal_type: 'dinner',
  },
  {
    id: '3',
    title: 'Potato wedges and Shrimp',
    slug: '',
    description: '',
    prep_time_minutes: 25,
    cook_time_minutes: 35,
    servings: 6,
    image_url: food3,
    difficulty: 'Medium',
    meal_type: 'lunch',
  },
  {
    id: '4',
    title: 'Noodles with Egg & Sausage',
    slug: 'noodles-with-egg-sausage',
    description: 'A simple and quick noodle dish with egg and sausage.',
    prep_time_minutes: 10,
    cook_time_minutes: 10,
    servings: 2,
    image_url: food4,
    difficulty: 'Easy',
    meal_type: 'breakfast',
  },
];

// PANTRY SPECIFIC DATA
type StorageType = 'Fridge' | 'Freezer' | 'Dry Pantry';

interface STORAGEFILTER {
  label: string;
  value: StorageType | 'all';
}

export const STORAGE_FILTER: STORAGEFILTER[] = [
  { label: 'All', value: 'all' },
  { label: 'Fridge', value: 'Fridge' },
  { label: 'Freezer', value: 'Freezer' },
  { label: 'Dry Pantry', value: 'Dry Pantry' },
];

type PANTRYITEM = {
  id: string;
  name: string;
  quantity: string;
  image_url: ImageSourcePropType;
  expiration_date: string;
  storage: StorageType;
  created_at: string;
  category: string;
};

export const PANTRY_ITEMS: PANTRYITEM[] = [
  {
    id: '1',
    name: 'Milk',
    quantity: '1 L',
    image_url: milk,
    expiration_date: '2026-06-13',
    storage: 'Fridge',
    created_at: '2026-06-01',
    category: 'Dairy',
  },
  {
    id: '2',
    name: 'Eggs',
    quantity: '12',
    image_url: eggs,
    expiration_date: '2026-06-20',
    storage: 'Fridge',
    created_at: '2026-06-05',
    category: 'Dairy',
  },
  {
    id: '3',
    name: 'Bread',
    quantity: '5 slices',
    image_url: bread,
    expiration_date: '2026-06-08',
    storage: 'Dry Pantry',
    created_at: '2026-06-05',
    category: 'Bakery',
  },
  {
    id: '4',
    name: 'Chicken Breast',
    quantity: '2 kg',
    image_url: chicken,
    expiration_date: '2026-06-10',
    storage: 'Freezer',
    created_at: '2026-06-05',
    category: 'Meat',
  },
  {
    id: '5',
    name: 'Rice',
    quantity: '1 kg',
    image_url: rice,
    expiration_date: '2026-12-31',
    storage: 'Dry Pantry',
    created_at: '2026-06-05',
    category: 'Grains',
  },
];

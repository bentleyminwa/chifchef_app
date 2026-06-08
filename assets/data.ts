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
import cabbage from '@/assets/images/ingredients/cabbage.png';
import chicken from '@/assets/images/ingredients/chicken.png';
import eggs from '@/assets/images/ingredients/eggs.png';
import beef from '@/assets/images/ingredients/meat.png';
import milk from '@/assets/images/ingredients/milk-bottle.png';
import onion from '@/assets/images/ingredients/onion.png';
import rice from '@/assets/images/ingredients/rice.png';
import tomato from '@/assets/images/ingredients/tomato.png';

import beetroot from '@/assets/images/ingredients/beetroot.png';
import broccoli from '@/assets/images/ingredients/broccoli.png';
import cheese from '@/assets/images/ingredients/cheese.png';
import kale from '@/assets/images/ingredients/kale.png';
import potato from '@/assets/images/ingredients/potato.png';
import yogurt from '@/assets/images/ingredients/yogurt.png';

import type { PANTRYITEM, STORAGEFILTER } from '@/features/pantry/types';
import type { Recipe } from '@/features/recipes/types';

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

export const RECOMMENDED_RECIPES: Recipe[] = [
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
    ingredients: ['Beef', 'Tomato', 'Onion', 'Oil', 'Salt', 'Garlic', 'Ginger'],
  },
  {
    id: '2',
    title: 'Chapati & Stew',
    slug: 'chapati-stew',
    description: 'Chapati and stew served with a side of salad.',
    prep_time_minutes: 20,
    cook_time_minutes: 40,
    servings: 6,
    image_url: food2,
    difficulty: 'Easy',
    meal_type: 'dinner',
    ingredients: ['Flour', 'Onion', 'Tomato', 'Beef', 'Carrots', 'Potatoes'],
  },
  {
    id: '3',
    title: 'Potato wedges and Shrimp',
    slug: 'potato-wedges-and-shrimp',
    description: 'Potato wedges and shrimp served with a side of salad.',
    prep_time_minutes: 25,
    cook_time_minutes: 35,
    servings: 6,
    image_url: food3,
    difficulty: 'Medium',
    meal_type: 'lunch',
    ingredients: ['Potato', 'Shrimp', 'Oil', 'Paprika', 'Salt'],
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
    ingredients: ['Noodles', 'Egg', 'Sausage', 'Oil', 'Soy sauce'],
  },
];

export const STORAGE_FILTER: STORAGEFILTER[] = [
  { label: 'All', value: 'all' },
  { label: 'Fridge', value: 'fridge' },
  { label: 'Freezer', value: 'freezer' },
  { label: 'Dry Pantry', value: 'dry' },
];

export const PANTRY_ITEMS: PANTRYITEM[] = [
  {
    id: '1',
    name: 'Milk',
    quantity: '1 L',
    image_url: milk,
    expiration_date: '2026-06-13',
    storage: 'fridge',
    created_at: '2026-06-01',
    category: 'Dairy',
  },
  {
    id: '2',
    name: 'Eggs',
    quantity: '12',
    image_url: eggs,
    expiration_date: '2026-06-20',
    storage: 'fridge',
    created_at: '2026-06-05',
    category: 'Dairy',
  },
  {
    id: '3',
    name: 'Bread',
    quantity: '5 slices',
    image_url: bread,
    expiration_date: '2026-06-08',
    storage: 'dry',
    created_at: '2026-06-05',
    category: 'Bakery',
  },
  {
    id: '4',
    name: 'Chicken Breast',
    quantity: '2 kg',
    image_url: chicken,
    expiration_date: '2026-06-10',
    storage: 'freezer',
    created_at: '2026-06-05',
    category: 'Meat',
  },
  {
    id: '5',
    name: 'Rice',
    quantity: '1 kg',
    image_url: rice,
    expiration_date: '2026-12-31',
    storage: 'dry',
    created_at: '2026-06-05',
    category: 'Grains',
  },
  {
    id: '6',
    name: 'Beef',
    quantity: '500g',
    image_url: beef,
    expiration_date: '2026-06-15',
    storage: 'freezer',
    created_at: '2026-06-07',
    category: 'Meat',
  },
  {
    id: '7',
    name: 'Tomato',
    quantity: '3',
    image_url: tomato,
    expiration_date: '2026-06-10',
    storage: 'fridge',
    created_at: '2026-06-07',
    category: 'Vegetable',
  },
  {
    id: '8',
    name: 'Onion',
    quantity: '2',
    image_url: onion,
    expiration_date: '2026-06-15',
    storage: 'dry',
    created_at: '2026-06-07',
    category: 'Vegetable',
  },
  {
    id: '9',
    name: 'Cabbage',
    quantity: '1',
    image_url: cabbage,
    expiration_date: '2026-06-12',
    storage: 'fridge',
    created_at: '2026-06-07',
    category: 'Vegetable',
  },
];

export const PAIRING_INGREDIENTS: PANTRYITEM[] = [
  {
    id: 'pairing-1',
    name: 'Broccoli',
    quantity: '3 stalks',
    image_url: broccoli,
    expiration_date: '2026-06-13',
    storage: 'fridge',
    created_at: '2026-06-01',
    category: 'Vegetable',
  },
  {
    id: 'pairing-2',
    name: 'Kale',
    quantity: '1 bunch',
    image_url: kale,
    expiration_date: '2026-06-13',
    storage: 'fridge',
    created_at: '2026-06-01',
    category: 'Vegetable',
  },
  {
    id: 'pairing-3',
    name: 'Potato',
    quantity: '4 large',
    image_url: potato,
    expiration_date: '2026-06-13',
    storage: 'fridge',
    created_at: '2026-06-01',
    category: 'Vegetable',
  },
  {
    id: 'pairing-4',
    name: 'Yogurt',
    quantity: '500 ml',
    image_url: yogurt,
    expiration_date: '2026-06-13',
    storage: 'fridge',
    created_at: '2026-06-01',
    category: 'Dairy',
  },
  {
    id: 'pairing-5',
    name: 'Cheese',
    quantity: '500 g',
    image_url: cheese,
    expiration_date: '2026-06-13',
    storage: 'fridge',
    created_at: '2026-06-01',
    category: 'Dairy',
  },
  {
    id: 'pairing-6',
    name: 'Beetroot',
    quantity: '3',
    image_url: beetroot,
    expiration_date: '2026-06-13',
    storage: 'fridge',
    created_at: '2026-06-01',
    category: 'Vegetable',
  },
];

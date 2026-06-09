import cookbook from "./icons/cookbook.png";
import refrigerator from "./icons/fridge.png";
import home from "./icons/home.png";
import person from "./icons/user.png";

import breakfast from "./images/breakfast.png";
import dessert from "./images/dessert.png";
import dinner from "./images/dinner.png";
import lunch from "./images/lunch.png";
import smoothie from "./images/smoothie.png";
import snacks from "./images/snacks.png";

import food1 from "@/assets/images/recipes/food1.jpg";
import food2 from "@/assets/images/recipes/food2.jpg";
import food3 from "@/assets/images/recipes/food3.jpg";
import food4 from "@/assets/images/recipes/food4.jpg";

import bread from "@/assets/images/ingredients/bread.png";
import cabbage from "@/assets/images/ingredients/cabbage.png";
import chicken from "@/assets/images/ingredients/chicken.png";
import eggs from "@/assets/images/ingredients/eggs.png";
import beef from "@/assets/images/ingredients/meat.png";
import milk from "@/assets/images/ingredients/milk-bottle.png";
import onion from "@/assets/images/ingredients/onion.png";
import rice from "@/assets/images/ingredients/rice.png";
import tomato from "@/assets/images/ingredients/tomato.png";

import beetroot from "@/assets/images/ingredients/beetroot.png";
import broccoli from "@/assets/images/ingredients/broccoli.png";
import cheese from "@/assets/images/ingredients/cheese.png";
import kale from "@/assets/images/ingredients/kale.png";
import potato from "@/assets/images/ingredients/potato.png";
import yogurt from "@/assets/images/ingredients/yogurt.png";

import type { PANTRYITEM, STORAGEFILTER } from "@/features/pantry/types";
import type { Recipe } from "@/features/recipes/types";

import cooking from "@/assets/icons/cooking.png";

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
    id: "1",
    title: "Beef Wet Fry",
    slug: "beef-wet-fry",
    description:
      "Tender beef simmered in a rich tomato-onion gravy. A hearty Kenyan classic perfect for sharing with family.",
    prep_time_minutes: 15,
    cook_time_minutes: 30,
    servings: 4,
    image_url: food1,
    difficulty: "Hard",
    meal_type: "dinner",
    rating: 4.7,
    author: "Chef Amina",
    calories: 480,
    ingredients: [
      { name: "Beef", quantity: "500 g", image_url: beef },
      { name: "Tomato", quantity: "3 large", image_url: tomato },
      { name: "Onion", quantity: "2 medium", image_url: onion },
      { name: "Oil", quantity: "3 tbsp" },
      { name: "Salt", quantity: "1 tsp" },
      { name: "Garlic", quantity: "4 cloves" },
      { name: "Ginger", quantity: "1 inch" },
    ],
    instructions: [
      "Cut beef into bite-sized pieces and season with salt.",
      "Heat oil in a pan and brown the beef on all sides.",
      "Add diced onion, garlic, and ginger; cook until fragrant.",
      "Stir in chopped tomatoes and simmer until the gravy thickens.",
      "Adjust seasoning and serve hot with rice or chapati.",
    ],
  },
  {
    id: "2",
    title: "Chapati & Stew",
    slug: "chapati-stew",
    description:
      "Soft chapati paired with a comforting beef and vegetable stew. Ideal for a cozy dinner.",
    prep_time_minutes: 20,
    cook_time_minutes: 40,
    servings: 6,
    image_url: food2,
    difficulty: "Easy",
    meal_type: "dinner",
    rating: 4.5,
    author: "Rachel William",
    calories: 420,
    ingredients: [
      { name: "Flour", quantity: "400 g" },
      { name: "Onion", quantity: "2 medium", image_url: onion },
      { name: "Tomato", quantity: "2 large", image_url: tomato },
      { name: "Beef", quantity: "400 g", image_url: beef },
      { name: "Carrots", quantity: "2 medium" },
      { name: "Potatoes", quantity: "3 large", image_url: potato },
    ],
    instructions: [
      "Prepare chapati dough with flour, water, and a pinch of salt; rest for 20 minutes.",
      "Brown beef with onion and tomato in a stew pot.",
      "Add carrots and potatoes with enough water to cover.",
      "Simmer stew for 30 minutes until vegetables are tender.",
      "Roll and cook chapatis on a hot pan until lightly browned.",
      "Serve stew ladled over torn chapati.",
    ],
  },
  {
    id: "3",
    title: "Potato wedges and Shrimp",
    slug: "potato-wedges-and-shrimp",
    description:
      "Crispy potato wedges with seasoned shrimp. A satisfying lunch with a fresh side salad.",
    prep_time_minutes: 25,
    cook_time_minutes: 35,
    servings: 6,
    image_url: food3,
    difficulty: "Medium",
    meal_type: "lunch",
    rating: 4.3,
    author: "James Ochieng",
    calories: 390,
    ingredients: [
      { name: "Potato", quantity: "4 large", image_url: potato },
      { name: "Shrimp", quantity: "300 g" },
      { name: "Oil", quantity: "4 tbsp" },
      { name: "Paprika", quantity: "1 tsp" },
      { name: "Salt", quantity: "1 tsp" },
    ],
    instructions: [
      "Cut potatoes into wedges and toss with oil, paprika, and salt.",
      "Bake wedges at 200°C for 25 minutes, turning halfway.",
      "Season shrimp and sauté in a hot pan for 3–4 minutes per side.",
      "Plate wedges with shrimp and serve immediately.",
    ],
  },
  {
    id: "4",
    title: "Noodles with Egg & Sausage",
    slug: "noodles-with-egg-sausage",
    description:
      "A simple and quick noodle dish with egg and sausage. Perfect for a fast breakfast.",
    prep_time_minutes: 10,
    cook_time_minutes: 10,
    servings: 2,
    image_url: food4,
    difficulty: "Easy",
    meal_type: "breakfast",
    rating: 4.6,
    author: "Maria Santos",
    calories: 512,
    ingredients: [
      { name: "Noodles", quantity: "200 g" },
      { name: "Egg", quantity: "2 large", image_url: eggs },
      { name: "Sausage", quantity: "2 links" },
      { name: "Oil", quantity: "2 tbsp" },
      { name: "Soy sauce", quantity: "2 tbsp" },
    ],
    instructions: [
      "Boil noodles according to package directions; drain and set aside.",
      "Slice sausage and fry in oil until browned.",
      "Scramble eggs in the same pan.",
      "Toss noodles, sausage, and eggs with soy sauce.",
      "Serve warm straight from the pan.",
    ],
  },
];

export const STORAGE_FILTER: STORAGEFILTER[] = [
  { label: "All", value: "all" },
  { label: "Fridge", value: "fridge" },
  { label: "Freezer", value: "freezer" },
  { label: "Dry Pantry", value: "dry" },
];

export const PANTRY_ITEMS: PANTRYITEM[] = [
  {
    id: "1",
    name: "Milk",
    quantity: "1 L",
    image_url: milk,
    expiration_date: "2026-06-13",
    storage: "fridge",
    created_at: "2026-06-01",
    category: "Dairy",
  },
  {
    id: "2",
    name: "Eggs",
    quantity: "12",
    image_url: eggs,
    expiration_date: "2026-06-20",
    storage: "fridge",
    created_at: "2026-06-05",
    category: "Dairy",
  },
  {
    id: "3",
    name: "Bread",
    quantity: "5 slices",
    image_url: bread,
    expiration_date: "2026-06-08",
    storage: "dry",
    created_at: "2026-06-05",
    category: "Bakery",
  },
  {
    id: "4",
    name: "Chicken Breast",
    quantity: "2 kg",
    image_url: chicken,
    expiration_date: "2026-06-10",
    storage: "freezer",
    created_at: "2026-06-05",
    category: "Meat",
  },
  {
    id: "5",
    name: "Rice",
    quantity: "1 kg",
    image_url: rice,
    expiration_date: "2026-12-31",
    storage: "dry",
    created_at: "2026-06-05",
    category: "Grains",
  },
  {
    id: "6",
    name: "Beef",
    quantity: "500g",
    image_url: beef,
    expiration_date: "2026-06-15",
    storage: "freezer",
    created_at: "2026-06-07",
    category: "Meat",
  },
  {
    id: "7",
    name: "Tomato",
    quantity: "3",
    image_url: tomato,
    expiration_date: "2026-06-10",
    storage: "fridge",
    created_at: "2026-06-07",
    category: "Vegetable",
  },
  {
    id: "8",
    name: "Onion",
    quantity: "2",
    image_url: onion,
    expiration_date: "2026-06-15",
    storage: "dry",
    created_at: "2026-06-07",
    category: "Vegetable",
  },
  {
    id: "9",
    name: "Cabbage",
    quantity: "1",
    image_url: cabbage,
    expiration_date: "2026-06-12",
    storage: "fridge",
    created_at: "2026-06-07",
    category: "Vegetable",
  },
];

export const PAIRING_INGREDIENTS: PANTRYITEM[] = [
  {
    id: "pairing-1",
    name: "Broccoli",
    quantity: "3 stalks",
    image_url: broccoli,
    expiration_date: "2026-06-13",
    storage: "fridge",
    created_at: "2026-06-01",
    category: "Vegetable",
  },
  {
    id: "pairing-2",
    name: "Kale",
    quantity: "1 bunch",
    image_url: kale,
    expiration_date: "2026-06-13",
    storage: "fridge",
    created_at: "2026-06-01",
    category: "Vegetable",
  },
  {
    id: "pairing-3",
    name: "Potato",
    quantity: "4 large",
    image_url: potato,
    expiration_date: "2026-06-13",
    storage: "fridge",
    created_at: "2026-06-01",
    category: "Vegetable",
  },
  {
    id: "pairing-4",
    name: "Yogurt",
    quantity: "500 ml",
    image_url: yogurt,
    expiration_date: "2026-06-13",
    storage: "fridge",
    created_at: "2026-06-01",
    category: "Dairy",
  },
  {
    id: "pairing-5",
    name: "Cheese",
    quantity: "500 g",
    image_url: cheese,
    expiration_date: "2026-06-13",
    storage: "fridge",
    created_at: "2026-06-01",
    category: "Dairy",
  },
  {
    id: "pairing-6",
    name: "Beetroot",
    quantity: "3",
    image_url: beetroot,
    expiration_date: "2026-06-13",
    storage: "fridge",
    created_at: "2026-06-01",
    category: "Vegetable",
  },
];

export const ILLUSTRATION_IMAGES = {
  cooking,
};

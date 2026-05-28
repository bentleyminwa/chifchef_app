import { describe, expect, it } from 'vitest';
import { mapMissingInsights } from './grocery-missing-insight-mappers';

describe('mapMissingInsights', () => {
  it('aggregates missing quantities, deduplicates recipes, and sorts by category/name', () => {
    const result = mapMissingInsights(
      [
        {
          recipe_id: 'recipe-1',
          ingredient_id: 'ing-1',
          quantity: 2,
          unit: 'piece',
          recipes: { id: 'recipe-1', title: 'Pasta' },
          ingredients: {
            id: 'ing-1',
            name: 'Tomato',
            image_url: 'tomato.png',
            category_id: 'cat-1',
            ingredient_categories: { id: 'cat-1', name: 'Produce' },
          },
        },
        {
          recipe_id: 'recipe-2',
          ingredient_id: 'ing-1',
          quantity: 1,
          unit: 'piece',
          recipes: { id: 'recipe-2', title: 'Salad' },
          ingredients: {
            id: 'ing-1',
            name: 'Tomato',
            image_url: 'tomato.png',
            category_id: 'cat-1',
            ingredient_categories: { id: 'cat-1', name: 'Produce' },
          },
        },
        {
          recipe_id: 'recipe-3',
          ingredient_id: 'ing-2',
          quantity: null,
          unit: null,
          recipes: { id: 'recipe-3', title: 'Soup' },
          ingredients: {
            id: 'ing-2',
            name: 'Broth',
            image_url: null,
            category_id: null,
            ingredient_categories: null,
          },
        },
      ],
      new Set(['ing-2:piece']),
    );

    expect(result).toEqual([
      {
        ingredient_id: 'ing-1',
        ingredient_name: 'Tomato',
        ingredient_image_url: 'tomato.png',
        category_id: 'cat-1',
        category_name: 'Produce',
        missing_quantity: 3,
        unit: 'piece',
        needed_for: [
          { id: 'recipe-1', title: 'Pasta' },
          { id: 'recipe-2', title: 'Salad' },
        ],
      },
    ]);
  });
});

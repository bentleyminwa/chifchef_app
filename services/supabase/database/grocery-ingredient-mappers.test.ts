import { describe, expect, it } from 'vitest';
import {
  mapIngredientLookup,
  mapIngredientOptions,
} from './grocery-ingredient-mappers';

describe('grocery ingredient mappers', () => {
  const rows = [
    {
      id: 'ing-1',
      name: 'Milk',
      image_url: 'milk.png',
      category_id: 'cat-1',
      ingredient_categories: [{ id: 'cat-1', name: 'Dairy' }],
    },
    {
      id: 'ing-2',
      name: 'Salt',
      image_url: null,
      category_id: null,
      ingredient_categories: null,
    },
  ];

  it('maps ingredient rows into UI options', () => {
    expect(mapIngredientOptions(rows)).toEqual([
      {
        id: 'ing-1',
        name: 'Milk',
        image_url: 'milk.png',
        category_id: 'cat-1',
        category_name: 'Dairy',
      },
      {
        id: 'ing-2',
        name: 'Salt',
        image_url: null,
        category_id: null,
        category_name: 'Uncategorized',
      },
    ]);
  });

  it('creates a lookup map keyed by ingredient id', () => {
    const lookup = mapIngredientLookup(rows);

    expect(lookup.get('ing-1')).toEqual({
      name: 'Milk',
      image_url: 'milk.png',
      category_id: 'cat-1',
      category_name: 'Dairy',
    });
  });
});

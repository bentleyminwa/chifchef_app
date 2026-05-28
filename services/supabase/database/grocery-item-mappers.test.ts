import { describe, expect, it } from 'vitest';
import { mapGroceryListItems } from './grocery-item-mappers';

describe('mapGroceryListItems', () => {
  it('merges grocery items with ingredient details and deduplicated recipe links', () => {
    const result = mapGroceryListItems({
      groceryRows: [
        {
          id: 'item-1',
          user_id: 'user-1',
          ingredient_id: 'ing-1',
          quantity: '2',
          unit: 'piece',
          is_completed: false,
          added_from: 'manual',
          created_at: '2026-04-20',
        } as never,
      ],
      ingredientRows: [
        {
          id: 'ing-1',
          name: 'Eggs',
          image_url: 'eggs.png',
          category_id: 'cat-1',
          ingredient_categories: { id: 'cat-1', name: 'Dairy' },
        },
      ],
      recipeLinks: [
        {
          grocery_item_id: 'item-1',
          recipe_id: 'recipe-1',
          recipes: { id: 'recipe-1', title: 'Omelette' },
        },
        {
          grocery_item_id: 'item-1',
          recipe_id: 'recipe-1',
          recipes: { id: 'recipe-1', title: 'Omelette' },
        },
      ],
    });

    expect(result).toEqual([
      expect.objectContaining({
        id: 'item-1',
        ingredient_name: 'Eggs',
        category_name: 'Dairy',
        quantity: 2,
        needed_for: [{ id: 'recipe-1', title: 'Omelette' }],
      }),
    ]);
  });

  it('falls back when ingredient metadata is missing', () => {
    const [item] = mapGroceryListItems({
      groceryRows: [
        {
          id: 'item-2',
          user_id: 'user-1',
          ingredient_id: 'missing',
          quantity: 1,
          unit: 'piece',
          is_completed: true,
          added_from: 'manual',
          created_at: '2026-04-20',
        } as never,
      ],
      ingredientRows: [],
      recipeLinks: [],
    });

    expect(item.ingredient_name).toBe('Unknown ingredient');
    expect(item.category_name).toBe('Uncategorized');
  });
});

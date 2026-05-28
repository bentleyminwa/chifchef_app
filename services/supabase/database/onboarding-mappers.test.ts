import { describe, expect, it } from 'vitest';
import {
  mapPantryItemInserts,
  mapUserCuisineInserts,
  mapUserDietInserts,
} from './onboarding-mappers';

describe('onboarding mappers', () => {
  it('maps cuisines to join-table inserts', () => {
    expect(
      mapUserCuisineInserts('user-1', [{ id: 'cuisine-1', name: 'Italian' }]),
    ).toEqual([{ user_id: 'user-1', cuisine_id: 'cuisine-1' }]);
  });

  it('maps diets to join-table inserts', () => {
    expect(
      mapUserDietInserts('user-1', [{ id: 'diet-1', name: 'Vegan' }]),
    ).toEqual([{ user_id: 'user-1', diet_id: 'diet-1' }]);
  });

  it('maps pantry selections to pantry inserts', () => {
    expect(
      mapPantryItemInserts('user-1', [
        { id: 'ingredient-1', name: 'Milk', quantity: 2, unit: 'l' },
      ]),
    ).toEqual([
      {
        user_id: 'user-1',
        ingredient_id: 'ingredient-1',
        quantity: 2,
        unit: 'l',
      },
    ]);
  });
});

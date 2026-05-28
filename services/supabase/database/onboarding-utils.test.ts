import { describe, expect, it } from 'vitest';
import {
  getForbiddenCategoryNames,
  toSupabaseInFilter,
} from './onboarding-utils';

describe('onboarding utils', () => {
  it('collects unique forbidden category names across multiple diets', () => {
    expect(
      getForbiddenCategoryNames(['Vegan', 'Halal', 'Gluten Free', 'Vegan']),
    ).toEqual([
      'Meat',
      'Poultry',
      'Seafood',
      'Dairy',
      'Eggs',
      'Honey',
      'Pork',
      'Alcohol',
      'Grains',
    ]);
  });

  it('formats values for a Supabase in-filter', () => {
    expect(toSupabaseInFilter(['abc', 'def'])).toBe('("abc","def")');
  });
});

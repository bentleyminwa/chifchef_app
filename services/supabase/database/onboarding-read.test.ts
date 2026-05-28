import { afterEach, describe, expect, it, vi } from 'vitest';
import { createQueryBuilder } from '@/test/mocks/supabase';
import { getFilteredIngredients } from './onboarding-read';

const { supabaseMock } = vi.hoisted(() => ({
  supabaseMock: {
    from: vi.fn(),
    rpc: vi.fn(),
    auth: {
      getSession: vi.fn(),
      getUser: vi.fn(),
      signOut: vi.fn(),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      onAuthStateChange: vi.fn(),
    },
  },
}));

vi.mock('../client/supabase', () => ({
  supabase: supabaseMock,
}));

describe('onboarding read service', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('filters ingredients using forbidden categories and maps category names', async () => {
    const categoriesBuilder = createQueryBuilder({
      data: [
        { id: 'cat-1', name: 'Meat' },
        { id: 'cat-2', name: 'Produce' },
      ],
      error: null,
    });
    const ingredientsBuilder = createQueryBuilder({
      data: [
        {
          id: 'ing-1',
          name: 'Tomato',
          image_url: 'tomato.png',
          category_id: 'cat-2',
          ingredient_categories: { name: 'Produce' },
        },
      ],
      error: null,
    });

    supabaseMock.from
      .mockReturnValueOnce(categoriesBuilder)
      .mockReturnValueOnce(ingredientsBuilder);

    const result = await getFilteredIngredients(['Vegan'], 8);

    expect(ingredientsBuilder.not).toHaveBeenCalledWith(
      'category_id',
      'in',
      '("cat-1")',
    );
    expect(result).toEqual([
      {
        id: 'ing-1',
        name: 'Tomato',
        image_url: 'tomato.png',
        categoryName: 'Produce',
      },
    ]);
  });
});

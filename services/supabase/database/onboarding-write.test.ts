import { afterEach, describe, expect, it, vi } from 'vitest';
import { createQueryBuilder } from '@/test/mocks/supabase';
import { saveOnboardingData } from './onboarding-write';

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

describe('onboarding write service', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('saves cuisines, diets, pantry items, and onboarding status', async () => {
    const cuisinesBuilder = createQueryBuilder({
      data: [{ id: 'cuisine-1', name: 'Italian' }],
      error: null,
    });
    const dietsBuilder = createQueryBuilder({
      data: [{ id: 'diet-1', name: 'Vegan' }],
      error: null,
    });
    const userCuisinesBuilder = createQueryBuilder({ data: null, error: null });
    const userDietsBuilder = createQueryBuilder({ data: null, error: null });
    const pantryBuilder = createQueryBuilder({ data: null, error: null });
    const profileBuilder = createQueryBuilder({ data: null, error: null });

    supabaseMock.from
      .mockReturnValueOnce(cuisinesBuilder)
      .mockReturnValueOnce(dietsBuilder)
      .mockReturnValueOnce(userCuisinesBuilder)
      .mockReturnValueOnce(userDietsBuilder)
      .mockReturnValueOnce(pantryBuilder)
      .mockReturnValueOnce(profileBuilder);

    await saveOnboardingData('user-1', {
      cuisines: ['Italian'],
      diets: ['Vegan'],
      pantryItems: [{ id: 'ing-1', name: 'Tomato', quantity: 2, unit: 'piece' }],
    });

    expect(userCuisinesBuilder.insert).toHaveBeenCalledWith([
      { user_id: 'user-1', cuisine_id: 'cuisine-1' },
    ]);
    expect(userDietsBuilder.insert).toHaveBeenCalledWith([
      { user_id: 'user-1', diet_id: 'diet-1' },
    ]);
    expect(pantryBuilder.insert).toHaveBeenCalledWith([
      {
        user_id: 'user-1',
        ingredient_id: 'ing-1',
        quantity: 2,
        unit: 'piece',
      },
    ]);
    expect(profileBuilder.update).toHaveBeenCalledWith({ onboarded: true });
  });
});

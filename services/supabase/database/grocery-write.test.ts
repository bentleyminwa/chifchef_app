import { afterEach, describe, expect, it, vi } from 'vitest';
import { createQueryBuilder } from '@/test/mocks/supabase';
import {
  addManualGroceryItem,
  clearCompletedGroceryItems,
  generateGroceryFromMealPlan,
  toggleGroceryItemCompletion,
} from './grocery-write';

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

describe('grocery write service', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('updates quantity when the grocery item already exists', async () => {
    const existingBuilder = createQueryBuilder({
      data: { id: 'item-1', quantity: 2 },
      error: null,
    });
    const updateBuilder = createQueryBuilder({
      data: { id: 'item-1', quantity: 5 },
      error: null,
    });

    supabaseMock.from
      .mockReturnValueOnce(existingBuilder)
      .mockReturnValueOnce(updateBuilder);

    const result = await addManualGroceryItem({
      userId: 'user-1',
      ingredientId: 'ing-1',
      quantity: 3,
      unit: 'piece',
    });

    expect(updateBuilder.update).toHaveBeenCalledWith({ quantity: 5 });
    expect(result).toEqual({ id: 'item-1', quantity: 5 });
  });

  it('inserts a new grocery item when no existing row matches', async () => {
    const existingBuilder = createQueryBuilder({
      data: null,
      error: null,
    });
    const insertBuilder = createQueryBuilder({
      data: { id: 'item-1' },
      error: null,
    });

    supabaseMock.from
      .mockReturnValueOnce(existingBuilder)
      .mockReturnValueOnce(insertBuilder);

    await addManualGroceryItem({
      userId: 'user-1',
      ingredientId: 'ing-1',
      quantity: 1,
      unit: 'piece',
    });

    expect(insertBuilder.insert).toHaveBeenCalledWith({
      user_id: 'user-1',
      ingredient_id: 'ing-1',
      quantity: 1,
      unit: 'piece',
      added_from: 'manual',
    });
  });

  it('toggles grocery completion status', async () => {
    const currentBuilder = createQueryBuilder({
      data: { id: 'item-1', is_completed: false },
      error: null,
    });
    const updateBuilder = createQueryBuilder({
      data: { id: 'item-1', is_completed: true },
      error: null,
    });

    supabaseMock.from
      .mockReturnValueOnce(currentBuilder)
      .mockReturnValueOnce(updateBuilder);

    await toggleGroceryItemCompletion('user-1', 'item-1');

    expect(updateBuilder.update).toHaveBeenCalledWith({ is_completed: true });
  });

  it('clears completed grocery items', async () => {
    const deleteBuilder = createQueryBuilder({
      data: null,
      error: null,
    });
    supabaseMock.from.mockReturnValueOnce(deleteBuilder);

    await clearCompletedGroceryItems('user-1');

    expect(deleteBuilder.delete).toHaveBeenCalledOnce();
  });

  it('calls the meal plan grocery rpc with the correct payload', async () => {
    supabaseMock.rpc.mockResolvedValueOnce({ error: null });

    await generateGroceryFromMealPlan({
      weekStart: '2026-04-20',
      weekEnd: '2026-04-26',
      onlyMissing: true,
      source: 'insight',
    });

    expect(supabaseMock.rpc).toHaveBeenCalledWith(
      'generate_grocery_from_meal_plan',
      {
        p_start_date: '2026-04-20',
        p_end_date: '2026-04-26',
        p_only_missing: true,
        p_source: 'insight',
      },
    );
  });
});

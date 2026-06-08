import { RECOMMENDED_RECIPES } from '@/assets/data';
import { useMemo } from 'react';
import type { Recipe } from '../types';

export function useRecipe(
  id: string | string[] | undefined,
): Recipe | undefined {
  return useMemo(() => {
    const normalizedId = Array.isArray(id) ? id[0] : id;
    if (!normalizedId) return undefined;

    return RECOMMENDED_RECIPES.find(
      (recipe) => recipe.id === normalizedId || recipe.slug === normalizedId,
    );
  }, [id]);
}

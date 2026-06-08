import { PANTRY_ITEMS } from '@/assets/data';
import { useMemo } from 'react';
import type { PANTRYITEM } from '../types';

export function usePantryItem(
  id: string | string[] | undefined,
): PANTRYITEM | undefined {
  return useMemo(() => {
    const normalizedId = Array.isArray(id) ? id[0] : id;
    if (!normalizedId) return undefined;
    return PANTRY_ITEMS.find((item) => item.id === normalizedId);
  }, [id]);
}

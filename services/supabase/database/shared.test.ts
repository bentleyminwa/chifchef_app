import { describe, expect, it } from 'vitest';
import { normalizeOneRelation } from './shared';

describe('normalizeOneRelation', () => {
  it('returns the first item from relation arrays', () => {
    expect(normalizeOneRelation([{ id: 1 }, { id: 2 }])).toEqual({ id: 1 });
  });

  it('returns null for missing relations', () => {
    expect(normalizeOneRelation(null)).toBeNull();
    expect(normalizeOneRelation(undefined)).toBeNull();
  });

  it('returns objects unchanged', () => {
    expect(normalizeOneRelation({ id: 1 })).toEqual({ id: 1 });
  });
});

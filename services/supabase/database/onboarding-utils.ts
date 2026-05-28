const DIET_FORBIDDEN_CATEGORY_NAMES: Record<string, string[]> = {
  Vegan: ['Meat', 'Poultry', 'Seafood', 'Dairy', 'Eggs', 'Honey'],
  Halal: ['Pork', 'Alcohol'],
  'Dairy Free': ['Dairy'],
  Keto: ['Grains'],
  'Gluten Free': ['Grains'],
};

export function getForbiddenCategoryNames(selectedDiets: string[]): string[] {
  const names = new Set<string>();

  selectedDiets.forEach((diet) => {
    const blocked = DIET_FORBIDDEN_CATEGORY_NAMES[diet] ?? [];
    blocked.forEach((name) => names.add(name));
  });

  return Array.from(names);
}

export function toSupabaseInFilter(values: string[]): string {
  const quoted = values.map((value) => `"${value}"`);
  return `(${quoted.join(',')})`;
}

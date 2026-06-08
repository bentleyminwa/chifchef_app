import RecipeNotFound from '@/features/recipes/components/detail/RecipeNotFound';
import { useRecipe } from '@/features/recipes/hooks/useRecipe';
import RecipeDetailScreen from '@/features/recipes/screens/RecipeDetailScreen';
import { useLocalSearchParams } from 'expo-router';

export default function RecipeDetailRoute() {
  const { id } = useLocalSearchParams();
  const recipe = useRecipe(id);

  if (!recipe) return <RecipeNotFound />;
  return <RecipeDetailScreen recipe={recipe} />;
}

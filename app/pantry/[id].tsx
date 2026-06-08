import PantryItemNotFound from '@/features/pantry/components/detail/PantryItemNotFound';
import { usePantryItem } from '@/features/pantry/hooks/usePantryItem';
import PantryItemDetailsScreen from '@/features/pantry/screens/PantryItemDetailsScreen';
import { useLocalSearchParams } from 'expo-router';

export default function PantryItemDetailRoute() {
  const { id } = useLocalSearchParams();
  const item = usePantryItem(id);

  if (!item) return <PantryItemNotFound />;
  return <PantryItemDetailsScreen item={item} />;
}

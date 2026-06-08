import { RECOMMENDED_RECIPES } from '@/assets/data';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function RecipeDetailRoute() {
  const { id } = useLocalSearchParams();
  const routeId = Array.isArray(id) ? id[0] : id;
  const recipe = RECOMMENDED_RECIPES.find(
    (entry) => entry.id === routeId || entry.slug === routeId,
  );

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Recipe not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: '#ED2939',
  },
});

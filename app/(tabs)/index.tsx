import { COLORS, FONTS } from '@/lib/config/theme';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RecipeHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>RecipeHomeScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  text: {
    fontFamily: FONTS.sandBold,
    color: COLORS.text,
  },
});

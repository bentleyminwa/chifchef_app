import { StyleSheet, Text, View } from 'react-native';

export default function CookBookScreen() {
  return (
    <View style={styles.container}>
      <Text>CookBookScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

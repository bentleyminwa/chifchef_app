import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/theme";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>ChifChef</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
  },
});


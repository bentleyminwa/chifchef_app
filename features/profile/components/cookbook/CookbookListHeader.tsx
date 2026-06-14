import { COLORS, FONTS } from "@/lib/config/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface CookbookListHeaderProps {
  count: number;
}

const CookbookListHeader = ({ count }: CookbookListHeaderProps) => (
  <View style={styles.container}>
    <Feather name="book-open" size={16} color={COLORS.textLight} />
    <Text style={styles.text}>
      {count} {count === 1 ? "recipe" : "recipes"} cooked
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 16,
  },
  text: {
    fontFamily: FONTS.sandMedium,
    fontSize: 13,
    color: COLORS.textLight,
  },
});

export default CookbookListHeader;

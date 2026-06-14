import { COLORS, FONTS } from "@/lib/config/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CookbookEmptyState = () => (
  <View style={styles.container}>
    <Feather
      name="book-open"
      size={48}
      color={COLORS.textLight}
      style={styles.icon}
    />
    <Text style={styles.title}>Your cookbook is empty</Text>
    <Text style={styles.subtitle}>
      Recipes you cook will appear here along with your notes and dates.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 120,
    paddingHorizontal: 40,
  },
  icon: {
    marginBottom: 16,
    opacity: 0.6,
  },
  title: {
    fontFamily: FONTS.sandBold,
    fontSize: 18,
    color: COLORS.textMuted,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONTS.sandRegular,
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default CookbookEmptyState;

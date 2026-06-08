import { COLORS, FONTS } from '@/lib/config/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface RecipeDescriptionSectionProps {
  description: string;
}

const RecipeDescriptionSection = ({
  description,
}: RecipeDescriptionSectionProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Description</Text>
      <Text style={styles.body}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingBottom: 16,
  },
  heading: {
    fontSize: 18,
    fontFamily: FONTS.sandBold,
    color: COLORS.text,
  },
  body: {
    fontSize: 14,
    fontFamily: FONTS.sandRegular,
    color: COLORS.textLight,
    lineHeight: 22,
  },
});

export default RecipeDescriptionSection;

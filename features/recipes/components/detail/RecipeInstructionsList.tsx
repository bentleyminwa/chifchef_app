import { COLORS, FONTS } from '@/lib/config/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface RecipeInstructionsListProps {
  instructions: string[];
}

const RecipeInstructionsList = ({
  instructions,
}: RecipeInstructionsListProps) => {
  return (
    <View style={styles.container}>
      {instructions.map((step, index) => (
        <View
          key={index}
          style={[
            styles.row,
            index < instructions.length - 1 && styles.rowBorder,
          ]}
        >
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{index + 1}</Text>
          </View>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 13,
    fontFamily: FONTS.sandBold,
    color: COLORS.primary,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.sandRegular,
    color: COLORS.textMuted,
    lineHeight: 22,
    paddingTop: 4,
  },
});

export default RecipeInstructionsList;

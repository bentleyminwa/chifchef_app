import { COLORS, FONTS } from '@/lib/config/theme';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import type { Difficulty } from '../../types';
import { getDifficultyColor } from '../../utils/difficulty';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  iconSize?: number;
  style?: ViewStyle;
  textStyle?: object;
}

const DifficultyBadge = ({
  difficulty,
  iconSize = 13,
  style,
  textStyle,
}: DifficultyBadgeProps) => {
  return (
    <View style={[styles.container, style]}>
      <FontAwesome5
        name='fire'
        size={iconSize}
        color={getDifficultyColor(difficulty)}
      />
      <Text style={[styles.text, textStyle]}>{difficulty}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.textLight,
  },
});

export default DifficultyBadge;

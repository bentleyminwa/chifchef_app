import { COLORS, FONTS } from '@/lib/config/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DetailStatProps {
  label: string;
  value: string;
  labelColor?: string;
  valueColor?: string;
}

const DetailStat = ({
  label,
  value,
  labelColor = COLORS.textLight,
  valueColor = COLORS.text,
}: DetailStatProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.grayLight,
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.sandSemiBold,
  },
  value: {
    fontSize: 18,
    fontFamily: FONTS.sandBold,
  },
});

export default DetailStat;

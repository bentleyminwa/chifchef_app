import { COLORS, FONTS } from '@/lib/config/theme';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { PANTRYITEM } from '../../types';

interface PairingChipProps {
  ingredient: PANTRYITEM;
  onPress?: () => void;
}

const PairingChip = ({ ingredient, onPress }: PairingChipProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={ingredient.image_url} style={styles.image} />
      </View>
      <Text style={styles.name}>{ingredient.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    gap: 6,
    alignItems: 'center',
  },
  imageContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  image: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 13,
    fontFamily: FONTS.sandSemiBold,
    color: COLORS.textLight,
  },
});

export default PairingChip;

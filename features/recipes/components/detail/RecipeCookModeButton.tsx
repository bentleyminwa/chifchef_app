import { ILLUSTRATION_IMAGES } from '@/assets/data';
import { COLORS, FONTS } from '@/lib/config/theme';
import React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

interface RecipeCookModeButtonProps {
  onPress?: () => void;
}

const RecipeCookModeButton = ({ onPress }: RecipeCookModeButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Image source={ILLUSTRATION_IMAGES.cooking} style={styles.icon} />
      <Text style={styles.label}>Cook Mode</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '70%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 35,
    paddingVertical: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: COLORS.primary,
  },
  label: {
    fontSize: 16,
    fontFamily: FONTS.sandBold,
    color: COLORS.primary,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default RecipeCookModeButton;

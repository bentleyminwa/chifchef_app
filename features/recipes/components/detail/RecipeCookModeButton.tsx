import { COLORS, FONTS } from '@/lib/config/theme';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface RecipeCookModeButtonProps {
  onPress?: () => void;
}

const RecipeCookModeButton = ({ onPress }: RecipeCookModeButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      {/* <View style={styles.iconCircle}>
        <Feather name='play' size={18} color={COLORS.success} />
      </View> */}
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
    backgroundColor: COLORS.primary,
    borderRadius: 35,
    paddingVertical: 16,
    marginTop: 20,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontFamily: FONTS.sandBold,
    color: COLORS.white,
  },
});

export default RecipeCookModeButton;

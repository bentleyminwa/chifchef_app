import { COLORS } from '@/lib/config/theme';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, type TouchableOpacityProps } from 'react-native';

interface SearchButtonProps extends TouchableOpacityProps {
  size?: number;
  iconSize?: number;
}

const SearchButton = ({ size = 40, iconSize = 24, ...props }: SearchButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      {...props}
      style={[
        styles.searchBtn,
        { width: size, height: size, borderRadius: size / 2 },
        props.style,
      ]}
    >
      <Feather name='search' size={iconSize} color={COLORS.textMuted} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.grayLight,
  },
});

export default SearchButton;

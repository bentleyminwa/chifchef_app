import { COLORS, FONTS } from '@/lib/config/theme';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onFilterPress?: () => void;
  placeholder?: string;
  style?: ViewStyle;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onFilterPress,
  placeholder = 'e.g. beef wet fry',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Feather
        name='search'
        size={20}
        color={COLORS.placeholder}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholder}
      />
      <View style={styles.separator} />
      <Pressable onPress={onFilterPress} style={styles.filterButton}>
        <Feather name='sliders' size={20} color={COLORS.textLight} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 50,
    height: 54,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginVertical: 16,
    shadowColor: COLORS.grayLight,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: FONTS.sandRegular,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 15,
    color: COLORS.text,
    height: '100%',
    padding: 0,
  },
  separator: {
    width: 1,
    height: 22,
    backgroundColor: COLORS.border,
    marginHorizontal: 12,
  },
  filterButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;

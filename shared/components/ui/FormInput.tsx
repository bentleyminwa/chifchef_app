import { COLORS, FONTS } from '@/lib/config/theme';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, type TextInputProps, View } from 'react-native';

interface FormInputProps extends TextInputProps {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  error?: string;
}

const FormInput = ({ label, icon, error, style, ...props }: FormInputProps) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <Feather name={icon} size={18} color={COLORS.textLight} style={styles.inputIcon} />
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={COLORS.placeholder}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    gap: 8,
  },
  label: {
    fontFamily: FONTS.sandBold,
    fontSize: 13,
    color: COLORS.textLight,
    paddingLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.grayLight,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    paddingHorizontal: 16,
    height: 52,
  },
  inputError: {
    borderColor: COLORS.danger,
    backgroundColor: '#FFF5F5',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: FONTS.sandSemiBold,
    fontSize: 15,
    color: COLORS.text,
    height: '100%',
  },
  errorText: {
    fontFamily: FONTS.sandMedium,
    fontSize: 12,
    color: COLORS.danger,
    paddingLeft: 4,
  },
});

export default FormInput;

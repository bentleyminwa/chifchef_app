import { COLORS, FONTS } from '@/lib/config/theme';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PantryItemNotFound = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.errorText}>Item not found.</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: FONTS.sandRegular,
    color: COLORS.danger,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default PantryItemNotFound;

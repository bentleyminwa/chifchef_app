import { COLORS } from '@/lib/config/theme';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const BackButton = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.backBtn}
      onPress={() => router.back()}
    >
      <Feather name='chevron-left' size={24} color={COLORS.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.grayLight,
  },
});

export default BackButton;

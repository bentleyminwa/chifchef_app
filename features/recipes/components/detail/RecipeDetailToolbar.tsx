import { COLORS } from '@/lib/config/theme';
import { Feather, Fontisto } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RecipeDetailToolbar = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.toolbar, { top: insets.top + 8 }]}>
      <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
        <Feather name='chevron-left' size={24} color={COLORS.text} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconBtn}>
        <Fontisto name='heart-alt' size={20} color={COLORS.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
});

export default RecipeDetailToolbar;

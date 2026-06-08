import { COLORS } from '@/lib/config/theme';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const ItemDetailsToolbar = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Feather name='chevron-left' size={24} color={COLORS.text} />
      </TouchableOpacity>

      <View style={styles.actionBtns}>
        <TouchableOpacity>
          <Feather name='trash-2' size={24} color={COLORS.danger} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name='edit' size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    width: '100%',
  },
  actionBtns: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.grayLight,
  },
});

export default ItemDetailsToolbar;

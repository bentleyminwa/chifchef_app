import { COLORS } from '@/lib/config/theme';
import BackButton from '@/shared/components/buttons/BackButton';
import LikeButton from '@/shared/components/buttons/LikeButton';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RecipeDetailToolbar = () => {
  const insets = useSafeAreaInsets();
  const [isLiked, setIsLiked] = useState(false);

  const handleLikePress = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={[styles.toolbar, { top: insets.top + 8 }]}>
      <BackButton />

      <LikeButton
        size={{ width: 40, height: 40 }}
        iconSize={28}
        onPress={handleLikePress}
        liked={isLiked}
      />
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

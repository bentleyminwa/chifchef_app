import { COLORS, FONTS } from '@/lib/config/theme';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, type ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface EditableAvatarProps {
  source: ImageSourcePropType;
  onPressChange?: () => void;
}

const EditableAvatar = ({ source, onPressChange }: EditableAvatarProps) => {
  return (
    <View style={styles.avatarSection}>
      <View style={styles.avatarWrapper}>
        <Image source={source} style={styles.avatar} />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.changeBtn}
        onPress={onPressChange}
      >
        <Feather name="camera" size={14} color={COLORS.primary} />
        <Text style={styles.changeText}>Change Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarWrapper: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.avatarBorder,
    marginBottom: 12,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  changeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  changeText: {
    fontFamily: FONTS.sandBold,
    fontSize: 12,
    color: COLORS.primary,
  },
});

export default EditableAvatar;

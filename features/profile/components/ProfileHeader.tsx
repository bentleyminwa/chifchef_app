import { COLORS, FONTS } from '@/lib/config/theme';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const profileImg = require('@/assets/images/profile/profile.jpg');

interface ProfileHeaderProps {
  name: string;
  email: string;
}

const ProfileHeader = ({ name, email }: ProfileHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image source={profileImg} style={styles.avatar} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarWrapper: {
    borderRadius: 60,
    borderWidth: 4,
    borderColor: COLORS.avatarBorder,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 16,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  name: {
    fontFamily: FONTS.sandBold,
    fontSize: 22,
    color: COLORS.text,
    marginBottom: 4,
  },
  email: {
    fontFamily: FONTS.sandMedium,
    fontSize: 14,
    color: COLORS.textLight,
  },
});

export default ProfileHeader;

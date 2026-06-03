import { COLORS, FONTS } from '@/lib/config/theme';
import { Image, StyleSheet, Text, View } from 'react-native';

const KitchenHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>Hello, Chef</Text>
        <Text style={styles.title}>What would you like to cook today?</Text>
      </View>
      <View style={styles.avatarContainer}>
        <Image
          source={require('@/assets/images/chef.png')}
          style={styles.avatar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  greeting: {
    fontFamily: FONTS.sandMedium,
    fontSize: 15,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  title: {
    fontFamily: FONTS.sandBold,
    fontSize: 26,
    lineHeight: 32,
    color: COLORS.textMuted,
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.avatarBorder,
  },
  avatar: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
});

export default KitchenHeader;

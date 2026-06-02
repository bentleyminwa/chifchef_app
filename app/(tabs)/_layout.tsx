import { TABS_CONFIG } from '@/lib/config/tabs';
import { COLORS, FONTS } from '@/lib/config/theme';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  // Calculate bottom position based on safe area insets
  const bottomPosition =
    Platform.OS === 'ios' ? Math.max(insets.bottom, 16) : 0;

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.tabBarContainer, { bottom: bottomPosition }]}
    >
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const tabConfig = TABS_CONFIG.find((t) => t.name === route.name);
          if (!tabConfig) return null;

          const iconColor = isFocused ? COLORS.primary : COLORS.primaryLight;
          const textColor = isFocused ? COLORS.primary : COLORS.primaryLight;

          return (
            <Pressable
              key={route.key}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={({ pressed }) => [
                styles.tabItem,
                pressed && { transform: [{ scale: 0.94 }] },
              ]}
            >
              <View style={[styles.iconContainer]}>
                <Image
                  source={tabConfig.icon}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: iconColor,
                  }}
                />
              </View>
              <Text
                style={[
                  styles.label,
                  {
                    color: textColor,
                    fontFamily: isFocused ? FONTS.sandBold : FONTS.sandSemiBold,
                  },
                ]}
              >
                {tabConfig.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const TabsLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {TABS_CONFIG.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
          }}
        />
      ))}
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    elevation: 8,
    zIndex: 1000,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 10,
    width: '85%',
    maxWidth: 420,
    height: 72,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        transition: 'background-color 0.2s ease, transform 0.1s ease',
      } as any,
    }),
  },
  label: {
    fontSize: 11,
    ...Platform.select({
      web: {
        transition: 'color 0.2s ease',
      } as any,
    }),
  },
});

export default TabsLayout;

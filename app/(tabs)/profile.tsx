import ProfileHeader from "@/features/profile/components/ProfileHeader";
import ProfileSection, {
  type ProfileItem,
} from "@/features/profile/components/ProfileSection";
import { COLORS } from "@/lib/config/theme";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const generalItems: ProfileItem[] = [
    {
      id: "account",
      icon: "user",
      label: "My Account",
      onPress: () => console.log("My Account pressed"),
    },
    {
      id: "favorites",
      icon: "heart",
      label: "Favourite Recipes",
      onPress: () => console.log("Favourite Recipes pressed"),
    },
    {
      id: "cookbook",
      icon: "book-open",
      label: "CookBook",
      onPress: () => console.log("CookBook pressed"),
    },
  ];

  const foodPrefItems: ProfileItem[] = [
    {
      id: "dietary",
      icon: "activity",
      label: "Dietary Goals",
      onPress: () => console.log("Dietary Goals pressed"),
    },
    {
      id: "cuisine",
      icon: "globe",
      label: "Cuisine Preference",
      onPress: () => console.log("Cuisine Preference pressed"),
    },
    {
      id: "cooking-level",
      icon: "zap",
      label: "Cooking Level",
      value: "Intermediate",
      onPress: () => console.log("Cooking Level pressed"),
    },
  ];

  const settingsItems: ProfileItem[] = [
    {
      id: "notifications",
      icon: "bell",
      label: "Notifications",
      onPress: () => console.log("Notifications pressed"),
    },
    {
      id: "theme",
      icon: "moon",
      label: "App Theme",
      value: "Light",
      onPress: () => console.log("App Theme pressed"),
    },
    {
      id: "support",
      icon: "help-circle",
      label: "Help & Support",
      onPress: () => console.log("Help & Support pressed"),
    },
  ];

  const logoutItems: ProfileItem[] = [
    {
      id: "logout",
      icon: "log-out",
      label: "Logout",
      isDestructive: true,
      onPress: () => console.log("Logout pressed"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' backgroundColor={COLORS.background} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProfileHeader name='Minwa Bentley' email='minwa@chifchef.app' />

        <ProfileSection title='General' items={generalItems} />
        <ProfileSection title='Food Preferences' items={foodPrefItems} />
        <ProfileSection title='Settings' items={settingsItems} />
        <ProfileSection title='Session' items={logoutItems} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
});

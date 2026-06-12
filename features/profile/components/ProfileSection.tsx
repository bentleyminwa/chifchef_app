import { COLORS, FONTS } from "@/lib/config/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface ProfileItem {
  id: string;
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value?: string;
  isDestructive?: boolean;
  onPress: () => void;
}

interface ProfileSectionProps {
  title: string;
  items: ProfileItem[];
}

const ProfileSection = ({ title, items }: ProfileSectionProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
      <View style={styles.card}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={item.onPress}
              style={[styles.row, !isLast && styles.rowBorder]}
            >
              <View style={styles.rowLeft}>
                <View style={styles.icon}>
                  <Feather
                    name={item.icon}
                    size={16}
                    color={
                      item.isDestructive ? COLORS.danger : COLORS.textMuted
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.label,
                    item.isDestructive && styles.destructiveLabel,
                  ]}
                >
                  {item.label}
                </Text>
              </View>
              <View style={styles.rowRight}>
                {item.value ? (
                  <Text style={styles.value}>{item.value}</Text>
                ) : null}
                <Feather
                  name='chevron-right'
                  size={18}
                  color={COLORS.textLight}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: FONTS.sandBold,
    fontSize: 12,
    color: COLORS.textLight,
    paddingHorizontal: 20,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 4,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    overflow: "hidden",
    shadowColor: COLORS.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    // backgroundColor: COLORS.card,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  label: {
    fontFamily: FONTS.sandSemiBold,
    fontSize: 15,
    color: COLORS.textMuted,
  },
  destructiveLabel: {
    color: COLORS.danger,
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  value: {
    fontFamily: FONTS.sandMedium,
    fontSize: 14,
    color: COLORS.textLight,
  },
});

export default ProfileSection;

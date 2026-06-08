import { COLORS } from "@/lib/config/theme";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ItemDetailsToolbarProps {
  top?: number;
}

const ItemDetailsToolbar = ({ top = 0 }: ItemDetailsToolbarProps) => {
  return (
    <View style={[styles.header, { top }]}>
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
    position: "absolute",
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
    elevation: 10,
  },
  actionBtns: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.grayLight,
  },
});

export default ItemDetailsToolbar;

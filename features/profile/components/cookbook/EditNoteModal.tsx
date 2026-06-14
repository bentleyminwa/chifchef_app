import { COLORS, FONTS } from "@/lib/config/theme";
import { CookedEntry } from "@/features/profile/types/cookbook";
import { Recipe } from "@/features/recipes/types";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface EditNoteModalProps {
  entry: CookedEntry | null;
  recipe: Recipe | undefined;
  onSave: (id: string, note: string) => void;
  onClose: () => void;
}

const EditNoteModal = ({
  entry,
  recipe,
  onSave,
  onClose,
}: EditNoteModalProps) => {
  // draftNote lives here — it only matters while the modal is open
  const [draftNote, setDraftNote] = useState("");

  // Sync draft whenever a new entry is opened
  useEffect(() => {
    if (entry) setDraftNote(entry.note);
  }, [entry]);

  const handleSave = () => {
    if (!entry) return;
    onSave(entry.id, draftNote);
  };

  return (
    <Modal
      visible={!!entry}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.wrapper}
        >
          <Pressable style={styles.sheet} onPress={() => {}}>
            {/* Sheet handle */}
            <View style={styles.handle} />

            <Text style={styles.title}>{recipe?.title ?? ""}</Text>
            <Text style={styles.subtitle}>Add your thoughts about this cook</Text>

            <TextInput
              style={styles.input}
              value={draftNote}
              onChangeText={setDraftNote}
              placeholder="e.g. Loved the flavour. Next time add more garlic..."
              placeholderTextColor={COLORS.placeholder}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              autoFocus
            />

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                activeOpacity={0.7}
                onPress={onClose}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveBtn}
                activeOpacity={0.8}
                onPress={handleSave}
              >
                <Feather name="check" size={15} color={COLORS.white} />
                <Text style={styles.saveBtnText}>Save Note</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  wrapper: {
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.grayLight,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 24,
  },
  title: {
    fontFamily: FONTS.sandBold,
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: FONTS.sandMedium,
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 20,
  },
  input: {
    backgroundColor: COLORS.grayLight,
    borderRadius: 16,
    padding: 16,
    fontFamily: FONTS.sandRegular,
    fontSize: 15,
    color: COLORS.text,
    minHeight: 120,
    marginBottom: 24,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.grayLight,
  },
  cancelBtnText: {
    fontFamily: FONTS.sandSemiBold,
    fontSize: 15,
    color: COLORS.textMuted,
  },
  saveBtn: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  saveBtnText: {
    fontFamily: FONTS.sandBold,
    fontSize: 15,
    color: COLORS.white,
  },
});

export default EditNoteModal;

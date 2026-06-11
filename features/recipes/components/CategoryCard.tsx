import { FONTS } from "@/lib/config/theme";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

interface CategoryCardProps {
  title: string;
  description: string;
  backgroundColor: string;
  textColor: string;
  icon: ImageSourcePropType;
  onPress: () => void;
}

const CategoryCard = ({
  title,
  description,
  backgroundColor,
  textColor,
  icon,
  onPress,
}: CategoryCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor },
        pressed && styles.pressed,
      ]}
    >
      <Image source={icon} style={styles.icon} />
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      <Text style={[styles.description, { color: textColor, opacity: 0.7 }]}>
        {description}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 120,
    borderRadius: 16,
    padding: 16,
    justifyContent: "flex-end",
    marginHorizontal: 8,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  title: {
    fontFamily: FONTS.sandBold,
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontFamily: FONTS.sandRegular,
    fontSize: 12,
  },
  icon: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
});

export default CategoryCard;

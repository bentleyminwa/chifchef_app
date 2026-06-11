import { COLORS } from '@/lib/config/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';

type Size = {
  width: number;
  height: number;
};

interface LikeButtonProps {
  liked?: boolean;
  size: Size;
  iconSize?: number;
}

const LikeButton = ({
  liked,
  size,
  iconSize,
  ...props
}: LikeButtonProps & TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.85}
      style={[
        styles.button,
        size,
        { borderRadius: size.width / 2 },
        props.style,
      ]}
    >
      <Ionicons
        name={liked ? 'heart' : 'heart-outline'}
        size={iconSize || size.height / 2}
        color={liked ? COLORS.primary : COLORS.textMuted}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.grayLight,
  },
});

export default LikeButton;

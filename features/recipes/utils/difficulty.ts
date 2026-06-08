import { COLORS } from '@/lib/config/theme';
import type { Difficulty } from '../types';

export function getDifficultyColor(difficulty: Difficulty): string {
  switch (difficulty) {
    case 'Easy':
      return COLORS.success;
    case 'Medium':
      return COLORS.warning;
    case 'Hard':
      return COLORS.danger;
  }
}

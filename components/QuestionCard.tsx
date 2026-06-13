import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, FontSize, FontWeight, Radius, Elevation, Spacing } from "../constants/theme";

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: string[];
  selectedAnswer?: string | null;
  correctAnswer?: string;
  locked?: boolean;
  onSelect: (option: string) => void;
}

export default function QuestionCard({
  questionNumber,
  totalQuestions,
  question,
  options,
  selectedAnswer = null,
  correctAnswer,
  locked = false,
  onSelect,
}: QuestionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.stepPill}>
          <Text style={styles.count}>
            {questionNumber}/{totalQuestions}
          </Text>
        </View>
        <Text style={styles.badge}>One choice only</Text>
      </View>

      <Text style={styles.question}>{question}</Text>

      <View style={styles.options}>
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = selectedAnswer !== null && option === correctAnswer;
          const isWrong = selectedAnswer !== null && isSelected && option !== correctAnswer;

          return (
            <Pressable
              key={`${option}-${index}`}
              disabled={locked}
              onPress={() => onSelect(option)}
              style={({ pressed }) => [
                styles.option,
                isSelected && styles.optionSelected,
                isCorrect && styles.optionCorrect,
                isWrong && styles.optionWrong,
                pressed && !locked && styles.optionPressed,
                locked && styles.optionLocked,
              ]}
            >
              <View
                style={[
                  styles.optionDot,
                  isSelected && styles.optionDotSelected,
                  isCorrect && styles.optionDotCorrect,
                  isWrong && styles.optionDotWrong,
                ]}
              />
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                  isCorrect && styles.optionTextCorrect,
                  isWrong && styles.optionTextWrong,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xxl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Elevation.md,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
  stepPill: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  count: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.5,
    color: Colors.primary,
  },
  badge: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.semiBold,
    color: Colors.textSecondary,
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  question: {
    fontSize: FontSize.title3,
    lineHeight: 30,
    color: Colors.textPrimary,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.xl,
  },
  options: {
    gap: Spacing.sm,
  },
  option: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    borderRadius: Radius.xl,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
  },
  optionPressed: {
    transform: [{ scale: 0.99 }],
  },
  optionLocked: {
    opacity: 0.92,
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surfaceSecondary,
  },
  optionCorrect: {
    borderColor: Colors.success,
    backgroundColor: Colors.successBg,
  },
  optionWrong: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorBg,
  },
  optionDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    flexShrink: 0,
  },
  optionDotSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  optionDotCorrect: {
    borderColor: Colors.success,
    backgroundColor: Colors.success,
  },
  optionDotWrong: {
    borderColor: Colors.error,
    backgroundColor: Colors.error,
  },
  optionText: {
    flex: 1,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
    lineHeight: 22,
  },
  optionTextSelected: {
    color: Colors.primary,
  },
  optionTextCorrect: {
    color: Colors.successText,
    fontWeight: FontWeight.semiBold,
  },
  optionTextWrong: {
    color: Colors.errorText,
    fontWeight: FontWeight.semiBold,
  },
});

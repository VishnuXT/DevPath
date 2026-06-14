import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors, FontSize, FontWeight, Spacing, Radius, Elevation } from "../constants/theme";

interface LessonCardProps {
  index: number;
  title: string;
  preview: string;
  completed: boolean;
  onPress: () => void;
}

export default function LessonCard({
  index,
  title,
  preview,
  completed,
  onPress,
}: LessonCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        completed && styles.cardCompleted,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Lesson ${index}: ${title}${completed ? ", completed" : ""}`}
    >
      <View style={[styles.numCircle, completed && styles.numCircleCompleted]}>
        <Text style={[styles.numText, completed && styles.numTextCompleted]}>
          {completed ? "✓" : String(index)}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.preview} numberOfLines={2}>
          {preview}
        </Text>
      </View>

      <View style={[styles.chip, completed && styles.chipCompleted]}>
        <Text style={[styles.chipText, completed && styles.chipTextCompleted]}>
          {completed ? "Done" : "Start"}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Elevation.sm,
  },
  cardCompleted: {
    borderColor: Colors.success + "50",
    backgroundColor: Colors.successBg,
  },
  cardPressed: {
    backgroundColor: Colors.surfaceSecondary,
  },
  numCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  numCircleCompleted: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  numText: {
    fontSize: FontSize.bodySmall,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
  },
  numTextCompleted: {
    color: Colors.textInverse,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  preview: {
    fontSize: FontSize.caption,
    color: Colors.textMuted,
    lineHeight: 16,
  },
  chip: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.pill,
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipCompleted: {
    backgroundColor: Colors.successBg,
    borderColor: Colors.success + "40",
  },
  chipText: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  chipTextCompleted: {
    color: Colors.successText,
  },
});

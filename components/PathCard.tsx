import { Pressable, Text, View, StyleSheet } from "react-native";
import {
  Colors,
  FontSize,
  FontWeight,
  Spacing,
  Radius,
  Elevation,
} from "../constants/theme";

interface PathCardProps {
  emoji: string;
  title: string;
  description: string;
  topicCount: number;
  progress?: number;
  onPress: () => void;
}

export default function PathCard({
  emoji,
  title,
  description,
  topicCount,
  progress = 0,
  onPress,
}: PathCardProps) {
  const ctaLabel = progress > 0 ? "Continue" : "Start learning";
  const progressBadge = progress > 0 ? (
    <View style={[styles.topicBadge, styles.progressBadge]}>
      <Text style={[styles.topicBadgeText, styles.progressBadgeText]}>
        {progress}% completed
      </Text>
    </View>
  ) : null;

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>

      <View style={styles.textContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.topicBadge}>
            <Text style={styles.topicBadgeText}>{topicCount} topics</Text>
          </View>
          {progressBadge}
        </View>

        <Text style={styles.cta}>{ctaLabel}</Text>
      </View>

      <Text style={styles.chevron}>Next</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.surface,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    marginBottom: Spacing.md,
    gap: Spacing.md,
    ...Elevation.md,
  },
  cardPressed: {
    backgroundColor: Colors.surfaceSecondary,
    transform: [{ scale: 0.985 }],
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    backgroundColor: Colors.butter,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.butterDark,
  },
  emoji: {
    fontSize: 28,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.title2,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: FontSize.body,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    flexWrap: "wrap",
  },
  topicBadge: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.pill,
    paddingVertical: 5,
    paddingHorizontal: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  topicBadgeText: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.semiBold,
    color: Colors.textSecondary,
  },
  chevron: {
    fontSize: 24,
    color: Colors.textMuted,
    fontWeight: FontWeight.regular,
    marginTop: 6,
  },
  progressBadge: {
    backgroundColor: Colors.successBg,
    borderColor: Colors.success + "20",
  },
  progressBadgeText: {
    color: Colors.success,
    fontWeight: FontWeight.bold,
  },
  cta: {
    marginTop: Spacing.sm,
    fontSize: FontSize.bodySmall,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
});

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
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      {/* Icon Container */}
      <View style={styles.iconContainer}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>

      {/* Text Content */}
      <View style={styles.textContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        {/* Meta Row */}
        <View style={styles.metaRow}>
          <View style={styles.topicBadge}>
            <Text style={styles.topicBadgeText}>{topicCount} topics</Text>
          </View>
          {progress > 0 && (
            <View style={[styles.topicBadge, styles.progressBadge]}>
              <Text style={[styles.topicBadgeText, styles.progressBadgeText]}>
                {progress}% completed
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Chevron */}
      <Text style={styles.chevron}>›</Text>
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
    padding: Spacing.xl,
    marginBottom: Spacing.md,
    ...Elevation.sm,
  },
  cardPressed: {
    backgroundColor: Colors.surfaceSecondary,
    transform: [{ scale: 0.99 }],
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  emoji: {
    fontSize: 26,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.title3,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: FontSize.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  topicBadge: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.pill,
    paddingVertical: 3,
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
    marginLeft: Spacing.sm,
  },
  progressBadge: {
    backgroundColor: Colors.successBg,
    borderColor: Colors.success + "20",
  },
  progressBadgeText: {
    color: Colors.success,
    fontWeight: FontWeight.bold,
  },
});
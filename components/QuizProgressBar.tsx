import { View, StyleSheet, Text } from "react-native";
import { Colors, FontSize, FontWeight, Radius, Spacing } from "../constants/theme";

interface QuizProgressBarProps {
  current: number;
  total: number;
}

export default function QuizProgressBar({ current, total }: QuizProgressBarProps) {
  const safeTotal = Math.max(total, 1);
  const percent = Math.max(0, Math.min(100, (current / safeTotal) * 100));

  return (
    <View style={styles.wrapper}>
      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>
          Question {Math.min(current + 1, safeTotal)} of {safeTotal}
        </Text>
        <Text style={styles.metaValue}>{Math.round(percent)}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.xs,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaLabel: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.semiBold,
    color: Colors.textPrimary,
  },
  metaValue: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  track: {
    height: 12,
    borderRadius: Radius.pill,
    backgroundColor: Colors.border,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: Radius.pill,
    backgroundColor: Colors.primary,
  },
});

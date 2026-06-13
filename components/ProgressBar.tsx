import { View, Text, StyleSheet } from "react-native";
import { Colors, Radius } from "../constants/theme";

interface ProgressBarProps {
  progress: number; // 0-100
  height?: number;
  color?: string;
  backgroundColor?: string;
  showLabel?: boolean;
}

export default function ProgressBar({
  progress,
  height = 8,
  color = Colors.primary,
  backgroundColor = Colors.border,
  showLabel = false,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, progress));

  return (
    <View style={styles.container}>
      <View style={[styles.track, { height, backgroundColor }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${clamped}%`,
              height,
              backgroundColor: color,
            },
          ]}
        />
      </View>
      {showLabel && <Text style={styles.label}>{clamped}% complete</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  track: {
    width: "100%",
    borderRadius: Radius.pill,
    overflow: "hidden",
  },
  fill: {
    borderRadius: Radius.pill,
  },
  label: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: "600",
  },
});

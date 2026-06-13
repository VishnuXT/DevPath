import { View, Text, StyleSheet } from "react-native";
import { Colors, Radius } from "../constants/theme";

interface ProgressBarProps {
  progress: number; // 0–100
  height?: number;
  color?: string;
  backgroundColor?: string;
  showLabel?: boolean;
}

export default function ProgressBar({
  progress,
  height = 8,
  color = Colors.primary,
  backgroundColor = Colors.surfaceTertiary,
  showLabel = false,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, progress));

  return (
    <View>
      <View
        style={[
          styles.track,
          { height, backgroundColor },
        ]}
      >
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
      {showLabel && (
        <Text style={styles.label}>{clamped}% complete</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    borderRadius: Radius.pill,
    overflow: "hidden",
  },
  fill: {
    borderRadius: Radius.pill,
  },
  label: {
    marginTop: 5,
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: "600",
  },
});

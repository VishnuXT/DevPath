import { View, StyleSheet } from "react-native";

interface ProgressBarProps {
  progress: number; // 0 to 100
  height?: number;
  color?: string;
  backgroundColor?: string;
}

export default function ProgressBar({
  progress,
  height = 10,
  color = "#2563EB",
  backgroundColor = "#E2E8F0",
}: ProgressBarProps) {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View style={[styles.container, { height, backgroundColor }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clampedProgress}%`,
            backgroundColor: color,
            height,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 5,
    overflow: "hidden",
  },
  fill: {
    borderRadius: 5,
  },
});

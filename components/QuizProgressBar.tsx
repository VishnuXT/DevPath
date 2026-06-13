import { View, StyleSheet } from "react-native";
import { Colors, Radius } from "../constants/theme";

interface QuizProgressBarProps {
  current: number;
  total: number;
}

export default function QuizProgressBar({ current, total }: QuizProgressBarProps) {
  const safeTotal = Math.max(total, 1);
  const percent = Math.max(0, Math.min(100, (current / safeTotal) * 100));

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${percent}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 10,
    borderRadius: Radius.pill,
    backgroundColor: "rgba(1, 62, 55, 0.12)",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: Radius.pill,
    backgroundColor: Colors.primary,
  },
});

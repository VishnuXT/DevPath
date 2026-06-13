import { View, Text, StyleSheet, Pressable } from "react-native";
import {
  Colors,
  FontSize,
  FontWeight,
  Spacing,
  Radius,
  Elevation,
} from "../constants/theme";

type NodeState = "completed" | "active" | "locked";

interface RoadmapItemProps {
  number: number;
  title: string;
  description: string;
  state: NodeState;
  isLast?: boolean;
  onPress: () => void;
}

export default function RoadmapItem({
  number,
  title,
  description,
  state,
  isLast = false,
  onPress,
}: RoadmapItemProps) {
  const nodeStyle = nodeStyles[state];

  return (
    <View style={styles.row}>
      {/* ── Timeline column ── */}
      <View style={styles.timelineCol}>
        {/* Node */}
        <View style={[styles.node, nodeStyle.node]}>
          {state === "completed" ? (
            <Text style={styles.checkmark}>✓</Text>
          ) : (
            <Text style={[styles.nodeNumber, nodeStyle.nodeText]}>
              {number}
            </Text>
          )}
        </View>

        {/* Connector line */}
        {!isLast && (
          <View
            style={[
              styles.line,
              state === "completed" ? styles.lineCompleted : styles.linePending,
            ]}
          />
        )}
      </View>

      {/* ── Card ── */}
      <Pressable
        style={({ pressed }) => [
          styles.card,
          nodeStyle.card,
          pressed && styles.cardPressed,
          isLast && styles.cardLast,
        ]}
        onPress={onPress}
        disabled={state === "locked"}
      >
        {/* Status chip */}
        <View style={[styles.chip, nodeStyle.chip]}>
          <Text style={[styles.chipText, nodeStyle.chipText]}>
            {state === "completed"
              ? "Completed"
              : state === "active"
              ? "Up Next"
              : "Locked"}
          </Text>
        </View>

        <Text style={[styles.cardTitle, state === "locked" && styles.lockedTitle]}>
          {title}
        </Text>
        <Text
          style={[styles.cardDesc, state === "locked" && styles.lockedDesc]}
          numberOfLines={2}
        >
          {description}
        </Text>

        {state !== "locked" && (
          <Text style={[styles.cta, { color: Colors.primary }]}>
            {state === "completed" ? "Review →" : "Start →"}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

// ── Per-state style maps ──────────────────────────────────────────────────────

const nodeStyles: Record<NodeState, any> = {
  completed: {
    node: {
      backgroundColor: Colors.primary,
      borderColor: Colors.primary,
      borderWidth: 2,
    },
    nodeText: { color: Colors.textInverse },
    card: {
      borderColor: Colors.border,
    },
    chip: { backgroundColor: Colors.successBg },
    chipText: { color: Colors.success },
  },
  active: {
    node: {
      backgroundColor: Colors.butter,
      borderColor: Colors.primary,
      borderWidth: 3,
    },
    nodeText: { color: Colors.primary },
    card: {
      borderColor: Colors.primary,
      borderWidth: 1.5,
    },
    chip: { backgroundColor: Colors.butter },
    chipText: { color: Colors.primary },
  },
  locked: {
    node: {
      backgroundColor: Colors.surfaceSecondary,
      borderColor: Colors.border,
      borderWidth: 2,
    },
    nodeText: { color: Colors.textMuted },
    card: {
      borderColor: Colors.borderLight,
      opacity: 0.65,
    },
    chip: { backgroundColor: Colors.surfaceSecondary },
    chipText: { color: Colors.textMuted },
  },
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  timelineCol: {
    alignItems: "center",
    width: 44,
    paddingTop: 2,
  },
  node: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  checkmark: {
    color: Colors.textInverse,
    fontSize: 16,
    fontWeight: FontWeight.bold,
  },
  nodeNumber: {
    fontSize: 14,
    fontWeight: FontWeight.bold,
  },
  line: {
    width: 2,
    flex: 1,
    marginTop: 2,
    marginBottom: 2,
    borderRadius: 1,
  },
  lineCompleted: {
    backgroundColor: Colors.primaryLight,
  },
  linePending: {
    backgroundColor: Colors.border,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Elevation.sm,
  },
  cardLast: {
    marginBottom: Spacing.xxxl,
  },
  cardPressed: {
    backgroundColor: Colors.surfaceSecondary,
  },
  chip: {
    alignSelf: "flex-start",
    paddingVertical: 3,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.pill,
    marginBottom: Spacing.sm,
  },
  chipText: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  lockedTitle: {
    color: Colors.textMuted,
  },
  cardDesc: {
    fontSize: FontSize.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  lockedDesc: {
    color: Colors.textMuted,
  },
  cta: {
    fontSize: FontSize.bodySmall,
    fontWeight: FontWeight.semiBold,
    marginTop: Spacing.xs,
  },
});

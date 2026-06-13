import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { careerPaths } from "../data";
import RoadmapItem from "../components/RoadmapItem";
import ProgressBar from "../components/ProgressBar";
import AppHeader from "../components/AppHeader";
import { useProgress } from "../context/ProgressContext";
import {
  Colors,
  FontSize,
  FontWeight,
  Spacing,
  Radius,
  Elevation,
  LabelChip,
} from "../constants/theme";

export default function RoadmapScreen() {
  const { path: pathId = "backend" } = useLocalSearchParams<{ path: string }>();
  const data = careerPaths[pathId] ?? careerPaths.backend;

  const { getCompletedCount, getPathProgress, resetPathProgress } = useProgress();

  const completedCount = getCompletedCount(pathId);
  const totalCount = data.roadmap.length;
  const progressPercent = getPathProgress(pathId);

  function getState(index: number): "completed" | "active" | "locked" {
    if (index < completedCount) return "completed";
    if (index === completedCount) return "active";
    return "locked";
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title={`${data.title} Roadmap`} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.progressCard}>
          <View style={styles.pathLabelRow}>
            <Text style={styles.pathEmoji}>{data.emoji}</Text>
            <Text style={styles.pathLabel}>{data.title}</Text>
          </View>

          <View style={styles.progressMetaRow}>
            <View>
              <Text style={styles.progressHeading}>Your Progress</Text>
              <Text style={styles.progressSub}>
                {completedCount} of {totalCount} topics completed
              </Text>
            </View>
            <View style={styles.progressPctBadge}>
              <Text style={styles.progressPctText}>{progressPercent}%</Text>
            </View>
          </View>

          <ProgressBar progress={progressPercent} height={10} color={Colors.primary} />

          <View style={styles.timelineRow}>
            <Text style={styles.timelineText}>Timeline: {data.learningTimeline}</Text>
          </View>
        </View>

        <View style={styles.headingRow}>
          <Text style={styles.headingLabel}>ROADMAP</Text>
          <Text style={styles.headingTitle}>Your Learning Path</Text>
        </View>

        <View style={styles.timeline}>
          {data.roadmap.map((item, index) => (
            <RoadmapItem
              key={item.id}
              number={index + 1}
              title={item.title}
              description={item.description}
              state={getState(index)}
              isLast={index === data.roadmap.length - 1}
              onPress={() =>
                router.push({
                  pathname: "/roadmap/[id]",
                  params: { id: item.id, path: pathId },
                })
              }
            />
          ))}
        </View>

        {completedCount > 0 && (
          <Pressable
            style={({ pressed }) => [styles.resetBtn, pressed && styles.resetBtnPressed]}
            onPress={() =>
              Alert.alert(
                "Restart Course",
                `Are you sure you want to restart the ${data.title} course? All your progress will be lost.`,
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Restart",
                    style: "destructive",
                    onPress: () => resetPathProgress(pathId),
                  },
                ]
              )
            }
          >
            <Text style={styles.resetBtnText}>🔄 Restart Course</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    padding: Spacing.xl,
    paddingBottom: Spacing.hero,
  },
  progressCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Elevation.md,
  },
  pathLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  pathEmoji: {
    fontSize: 18,
  },
  pathLabel: {
    fontSize: FontSize.bodySmall,
    fontWeight: FontWeight.semiBold,
    color: Colors.textSecondary,
  },
  progressMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
  },
  progressHeading: {
    fontSize: FontSize.title3,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  progressSub: {
    fontSize: FontSize.bodySmall,
    color: Colors.textMuted,
  },
  progressPctBadge: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  progressPctText: {
    fontSize: FontSize.title3,
    fontWeight: FontWeight.black,
    color: Colors.primary,
  },
  timelineRow: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderColor: Colors.border,
  },
  timelineText: {
    fontSize: FontSize.bodySmall,
    color: Colors.textMuted,
    fontWeight: FontWeight.medium,
  },
  headingRow: {
    marginBottom: Spacing.lg,
  },
  headingLabel: {
    ...LabelChip,
    color: Colors.textMuted,
    marginBottom: Spacing.xs,
  },
  headingTitle: {
    fontSize: FontSize.title3,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  timeline: {
    paddingLeft: Spacing.xs,
  },
  resetBtn: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.error,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  resetBtnPressed: {
    backgroundColor: Colors.errorBg,
  },
  resetBtnText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.errorText,
  },
});

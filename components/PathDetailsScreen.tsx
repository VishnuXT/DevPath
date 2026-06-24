import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { CareerPath } from "../data/types";
import ProgressBar from "./ProgressBar";
import AppHeader from "./AppHeader";
import RoadmapItem from "./RoadmapItem";
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

interface PathDetailsScreenProps {
  data: CareerPath;
  pathId: string;
  progress?: number;
}

export default function PathDetailsScreen({
  data,
  pathId,
  progress = 0,
}: PathDetailsScreenProps) {
  const { resetPathProgress, getCompletedCount } = useProgress();
  const completedCount = getCompletedCount(pathId);
  const [showOverview, setShowOverview] = useState(false);

  function getTopicState(index: number): "completed" | "active" | "locked" {
    if (index < completedCount) return "completed";
    if (index === completedCount) return "active";
    return "locked";
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title={data.title} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Course Hero Banner */}
        <View style={styles.hero}>
          <View style={styles.heroIconRing}>
            <Text style={styles.heroEmoji}>{data.emoji}</Text>
          </View>
          <Text style={styles.heroTitle}>{data.title}</Text>
          <Text style={styles.heroSubtitle}>{data.description}</Text>

          <View style={styles.timelineBadge}>
            <Text style={styles.timelineBadgeText}>Timeline: {data.learningTimeline}</Text>
          </View>
        </View>

        {/* Stats strip */}
        <View style={styles.statsStrip}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{data.roadmap.length}</Text>
            <Text style={styles.statLabel}>Topics</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{data.technologies.length}</Text>
            <Text style={styles.statLabel}>Technologies</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{data.skills.length}</Text>
            <Text style={styles.statLabel}>Skills</Text>
          </View>
        </View>

        {/* Progress Strip */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Progress</Text>
            <Text style={styles.sectionMeta}>
              {completedCount} / {data.roadmap.length} topics
            </Text>
          </View>
          <View style={styles.card}>
            <ProgressBar progress={progress} color={Colors.primary} height={10} />
            <Text style={styles.progressHint}>
              {progress === 0
                ? "You haven't started yet - let's go!"
                : `You're ${progress}% of the way there. Keep going!`}
            </Text>
          </View>
        </View>

        {/* Collapsible Overview Section */}
        <Pressable
          style={({ pressed }) => [
            styles.overviewToggleBtn,
            pressed && styles.overviewToggleBtnPressed,
          ]}
          onPress={() => setShowOverview(!showOverview)}
        >
          <Text style={styles.overviewToggleText}>
            {showOverview ? "Hide Course Details" : "Show Course Details (Skills & Technologies)"}
          </Text>
          <Feather
            name={showOverview ? "chevron-up" : "chevron-down"}
            size={16}
            color={Colors.primary}
          />
        </Pressable>

        {showOverview && (
          <View style={styles.expandedOverview}>
            {/* Technologies Grid */}
            <View style={styles.subOverviewSection}>
              <Text style={styles.subOverviewTitle}>Technologies</Text>
              <View style={styles.techGrid}>
                {data.technologies.map((tech, i) => (
                  <View key={i} style={styles.techChip}>
                    <Text style={styles.techEmoji}>{tech.emoji}</Text>
                    <Text style={styles.techName}>{tech.name}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Skills Gain Card */}
            <View style={styles.subOverviewSection}>
              <Text style={styles.subOverviewTitle}>Skills You'll Gain</Text>
              <View style={styles.card}>
                {data.skills.map((skill, i) => (
                  <View key={i} style={styles.skillRow}>
                    <View style={styles.skillDot} />
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Career Roles pills */}
            <View style={styles.subOverviewSection}>
              <Text style={styles.subOverviewTitle}>Career Roles</Text>
              <View style={styles.rolesGrid}>
                {data.careerOpportunities.map((role, i) => (
                  <View key={i} style={styles.rolePill}>
                    <Text style={styles.rolePillText}>{role}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Interactive Subway Timeline Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionLabel}>ROADMAP</Text>
              <Text style={styles.sectionTitle}>Your Learning Path</Text>
            </View>
          </View>

          <View style={styles.sequentialHint}>
            <Text style={styles.sequentialHintIcon}>🔒</Text>
            <Text style={styles.sequentialHintText}>
              Complete topics in order to unlock the next one
            </Text>
          </View>

          <View style={styles.timelineContainer}>
            {data.roadmap.map((item, index) => (
              <RoadmapItem
                key={item.id}
                number={index + 1}
                title={item.title}
                description={item.description}
                state={getTopicState(index)}
                isLast={index === data.roadmap.length - 1}
                onPress={() => {
                  const state = getTopicState(index);
                  if (state === "locked") {
                    Alert.alert(
                      "Topic Locked 🔒",
                      `Please complete the previous topics first to unlock "${item.title}".`
                    );
                  } else {
                    router.push({
                      pathname: "/roadmap/[id]",
                      params: { id: item.id, path: pathId },
                    });
                  }
                }}
              />
            ))}
          </View>
        </View>

        {/* Reset Progress Button */}
        {progress > 0 && (
          <Pressable
            style={({ pressed }) => [styles.resetBtn, pressed && styles.resetBtnPressed]}
            onPress={() => {
              Alert.alert(
                "Reset Path Progress",
                `Are you sure you want to restart the ${data.title} course? All completed lessons and projects for this path will be reset.`,
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Restart Course",
                    style: "destructive",
                    onPress: () => resetPathProgress(pathId),
                  },
                ]
              );
            }}
          >
            <Text style={styles.resetBtnText}>Restart Course 🔄</Text>
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
  hero: {
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: Radius.xxl,
    padding: Spacing.xxxl,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Elevation.md,
  },
  heroIconRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  heroEmoji: {
    fontSize: 36,
  },
  heroTitle: {
    fontSize: FontSize.title1,
    fontWeight: FontWeight.black,
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  heroSubtitle: {
    fontSize: FontSize.bodySmall,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  timelineBadge: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timelineBadgeText: {
    fontSize: FontSize.label,
    fontWeight: FontWeight.semiBold,
    color: Colors.primary,
  },
  statsStrip: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    alignItems: "center",
    justifyContent: "space-around",
    ...Elevation.sm,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: FontSize.title2,
    fontWeight: FontWeight.black,
    color: Colors.primary,
  },
  statLabel: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.semiBold,
    color: Colors.textMuted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.border,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.title3,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  sectionLabel: {
    ...LabelChip,
    color: Colors.textMuted,
    marginBottom: Spacing.xs,
  },
  sectionMeta: {
    fontSize: FontSize.bodySmall,
    fontWeight: FontWeight.semiBold,
    color: Colors.textMuted,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    ...Elevation.sm,
  },
  progressHint: {
    marginTop: Spacing.sm,
    fontSize: FontSize.bodySmall,
    color: Colors.textSecondary,
  },
  techGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  techChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
    ...Elevation.sm,
  },
  techEmoji: {
    fontSize: 18,
  },
  techName: {
    fontSize: FontSize.bodySmall,
    fontWeight: FontWeight.semiBold,
    color: Colors.textPrimary,
  },
  skillRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  skillDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginRight: Spacing.md,
  },
  skillText: {
    fontSize: FontSize.body,
    color: Colors.textSecondary,
    flex: 1,
  },
  rolesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  rolePill: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rolePillText: {
    fontSize: FontSize.bodySmall,
    fontWeight: FontWeight.semiBold,
    color: Colors.textSecondary,
  },
  overviewToggleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
    ...Elevation.sm,
  },
  overviewToggleBtnPressed: {
    backgroundColor: Colors.surfaceSecondary,
  },
  overviewToggleText: {
    fontSize: FontSize.bodySmall,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  expandedOverview: {
    backgroundColor: Colors.surfaceSecondary,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  subOverviewSection: {
    gap: Spacing.xs,
  },
  subOverviewTitle: {
    fontSize: FontSize.bodySmall,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  timelineContainer: {
    marginTop: Spacing.md,
  },
  sequentialHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sequentialHintIcon: {
    fontSize: 14,
  },
  sequentialHintText: {
    flex: 1,
    fontSize: FontSize.caption,
    color: Colors.textMuted,
    lineHeight: 18,
  },
  resetBtn: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
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

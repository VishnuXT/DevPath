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
import { CareerPath } from "../data/types";
import ProgressBar from "./ProgressBar";
import AppHeader from "./AppHeader";
import { useProgress } from "../context/ProgressContext";
import {
  Colors,
  FontSize,
  FontWeight,
  Spacing,
  Radius,
  Elevation,
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title={data.title} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
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
                ? "You haven&apos;t started yet - let&apos;s go!"
                : `You're ${progress}% of the way there. Keep going!`}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technologies</Text>
          <View style={styles.techGrid}>
            {data.technologies.map((tech, i) => (
              <View key={i} style={styles.techChip}>
                <Text style={styles.techEmoji}>{tech.emoji}</Text>
                <Text style={styles.techName}>{tech.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills You&apos;ll Gain</Text>
          <View style={styles.card}>
            {data.skills.map((skill, i) => (
              <View key={i} style={styles.skillRow}>
                <View style={styles.skillDot} />
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Career Roles</Text>
          <View style={styles.rolesGrid}>
            {data.careerOpportunities.map((role, i) => (
              <View key={i} style={styles.rolePill}>
                <Text style={styles.rolePillText}>{role}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Roadmap Preview</Text>
          </View>
          <View style={styles.card}>
            {data.roadmap.map((item, i) => {
              const isCompleted = i < completedCount;
              const isActive = i === completedCount;
              return (
                <View key={item.id} style={styles.previewRow}>
                  <View
                    style={[
                      styles.previewDot,
                      isCompleted && styles.previewDotCompleted,
                      isActive && styles.previewDotActive,
                    ]}
                  />
                  <Text
                    style={[
                      styles.previewText,
                      (isCompleted || isActive) && styles.previewTextActive,
                    ]}
                  >
                    {i + 1}. {item.title}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [styles.ctaBtn, pressed && styles.ctaBtnPressed]}
          onPress={() =>
            router.push({ pathname: "/roadmap", params: { path: pathId } })
          }
        >
          <Text style={styles.ctaBtnText}>Open Full Roadmap</Text>
          <Text style={styles.ctaBtnArrow}>→</Text>
        </Pressable>

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
  previewRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  previewDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginRight: Spacing.md,
  },
  previewDotActive: {
    backgroundColor: Colors.primary,
  },
  previewDotCompleted: {
    backgroundColor: Colors.success,
  },
  previewText: {
    fontSize: FontSize.bodySmall,
    color: Colors.textMuted,
  },
  previewTextActive: {
    color: Colors.textPrimary,
    fontWeight: FontWeight.semiBold,
  },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.sm,
    ...Elevation.md,
  },
  ctaBtnPressed: {
    backgroundColor: Colors.primaryDark,
  },
  ctaBtnText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
  },
  ctaBtnArrow: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
  },
  resetBtn: {
    marginTop: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.error,
    borderRadius: Radius.md,
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

import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { careerPaths } from "../../data";
import AppHeader from "../../components/AppHeader";
import { useProgress } from "../../context/ProgressContext";
import {
  Colors,
  FontSize,
  FontWeight,
  Spacing,
  Radius,
  Elevation,
  LabelChip,
} from "../../constants/theme";

export default function ProjectScreen() {
  const {
    id: projectId,
    topicId,
    path: pathId = "backend",
  } = useLocalSearchParams<{ id: string; topicId: string; path: string }>();

  const { completeProject, isProjectCompleted } = useProgress();

  const pathData = careerPaths[pathId] ?? careerPaths.backend;
  const topicData = pathData.roadmap.find((t) => t.id === topicId);
  const projectData = topicData?.projects?.find((p) => p.id === projectId);

  if (!projectData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader title="Project" />
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🔍</Text>
          <Text style={styles.emptyTitle}>Project not found</Text>
          <Pressable style={styles.emptyBtn} onPress={() => router.back()}>
            <Text style={styles.emptyBtnText}>← Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title={projectData.title} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.heroIconBox}>
              <Text style={styles.heroIcon}>🛠️</Text>
            </View>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>Practice Project</Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>{projectData.title}</Text>
          <Text style={styles.heroDesc}>{projectData.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>REQUIREMENTS</Text>
          <Text style={styles.sectionTitle}>What to build</Text>
          <View style={styles.card}>
            {projectData.requirements.map((req, i) => (
              <View key={i} style={styles.reqRow}>
                <View style={styles.reqBullet}>
                  <Text style={styles.reqBulletText}>{i + 1}</Text>
                </View>
                <Text style={styles.reqText}>{req}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>FOLDER STRUCTURE</Text>
          <Text style={styles.sectionTitle}>Project layout</Text>
          <View style={styles.folderSection}>
            <View style={styles.folderHeader}>
              <View style={styles.codeDot} />
              <View style={[styles.codeDot, { backgroundColor: "#F7D774" }]} />
              <View style={[styles.codeDot, { backgroundColor: "#10B981" }]} />
              <Text style={styles.folderHeaderLabel}>Terminal</Text>
            </View>
            <View style={styles.folderBody}>
              <Text style={styles.folderText}>{projectData.folderStructure}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>IMPLEMENTATION GUIDE</Text>
          <Text style={styles.sectionTitle}>Step-by-step approach</Text>
          <View style={styles.card}>
            <Text style={styles.guideText}>{projectData.guide}</Text>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.ctaBtn,
            isProjectCompleted(projectData.id) && { backgroundColor: Colors.success },
            pressed && { opacity: 0.85 },
          ]}
          onPress={async () => {
            await completeProject(projectData.id);
            router.back();
          }}
        >
          <Text style={styles.ctaBtnText}>
            {isProjectCompleted(projectData.id) ? "Completed" : "Mark Complete"}
          </Text>
          <Text style={styles.ctaBtnArrow}>✓</Text>
        </Pressable>
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
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
  },
  emptyEmoji: { fontSize: 48 },
  emptyTitle: {
    fontSize: FontSize.title3,
    fontWeight: FontWeight.bold,
    color: Colors.textMuted,
  },
  emptyBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
  },
  emptyBtnText: {
    color: Colors.textInverse,
    fontWeight: FontWeight.semiBold,
  },
  heroCard: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xxl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Elevation.md,
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  heroIconBox: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.butter,
    alignItems: "center",
    justifyContent: "center",
  },
  heroIcon: {
    fontSize: 24,
  },
  heroBadge: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: Radius.pill,
    paddingVertical: 4,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.20)",
  },
  heroBadgeText: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.bold,
    color: Colors.butter,
  },
  heroTitle: {
    fontSize: FontSize.title1,
    fontWeight: FontWeight.black,
    color: Colors.textInverse,
    marginBottom: Spacing.sm,
  },
  heroDesc: {
    fontSize: FontSize.body,
    color: "rgba(255,255,255,0.70)",
    lineHeight: 22,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionLabel: {
    ...LabelChip,
    color: Colors.textMuted,
    marginBottom: Spacing.xs,
  },
  sectionTitle: {
    fontSize: FontSize.title3,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    ...Elevation.sm,
  },
  reqRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  reqBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  reqBulletText: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
  },
  reqText: {
    flex: 1,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  folderSection: {
    borderRadius: Radius.xl,
    overflow: "hidden",
    ...Elevation.sm,
  },
  folderHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#011F1A",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
  },
  codeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EF4444",
  },
  folderHeaderLabel: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.semiBold,
    color: "rgba(255,255,255,0.4)",
    marginLeft: Spacing.sm,
    letterSpacing: 0.5,
  },
  folderBody: {
    backgroundColor: Colors.primaryDark,
    padding: Spacing.xl,
  },
  folderText: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#A3D9A5",
    lineHeight: 22,
  },
  guideText: {
    fontSize: FontSize.body,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.lg,
    gap: Spacing.sm,
    ...Elevation.md,
  },
  ctaBtnText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
  },
  ctaBtnArrow: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.butter,
  },
});

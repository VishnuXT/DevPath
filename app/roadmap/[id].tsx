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

export default function RoadmapItemDetailScreen() {
  const { id: topicId, path: pathId = "backend" } =
    useLocalSearchParams<{ id: string; path: string }>();

  const { isLessonCompleted, isProjectCompleted } = useProgress();

  const pathData = careerPaths[pathId] ?? careerPaths.backend;
  const topicData = pathData.roadmap.find((item) => item.id === topicId);

  if (!topicData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader title="Topic" />
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🔍</Text>
          <Text style={styles.emptyTitle}>Topic not found</Text>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backBtnText}>← Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title={topicData.title} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewLabel}>TOPIC OVERVIEW</Text>
          <Text style={styles.overviewTitle}>{topicData.title}</Text>
          <Text style={styles.overviewDesc}>{topicData.description}</Text>

          <View style={styles.overviewMeta}>
            <View style={styles.metaBadge}>
              <Text style={styles.metaBadgeText}>📖 {topicData.lessons.length} lessons</Text>
            </View>
            {topicData.projects && topicData.projects.length > 0 && (
              <View style={styles.metaBadge}>
                <Text style={styles.metaBadgeText}>
                  🛠️ {topicData.projects.length} project
                  {topicData.projects.length > 1 ? "s" : ""}
                </Text>
              </View>
            )}
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [styles.quizBtn, pressed && styles.quizBtnPressed]}
          onPress={() =>
            router.push({
              pathname: "/quiz/[path]/[module]",
              params: { path: pathId, module: topicId },
            })
          }
        >
          <Text style={styles.quizBtnText}>Take Module Quiz</Text>
          <Text style={styles.quizBtnArrow}>→</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.demoQuizBtn, pressed && styles.demoQuizBtnPressed]}
          onPress={() => router.push("/quiz")}
        >
          <Text style={styles.demoQuizBtnText}>Try Demo Quiz Instead</Text>
          <Text style={styles.demoQuizBtnArrow}>→</Text>
        </Pressable>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>LESSONS</Text>
          <Text style={styles.sectionTitle}>What you&apos;ll learn</Text>

          <View style={styles.lessonsList}>
            {topicData.lessons.map((lesson, idx) => (
              <Pressable
                key={lesson.id}
                style={({ pressed }) => [
                  styles.lessonCard,
                  pressed && styles.lessonCardPressed,
                ]}
                onPress={() =>
                  router.push({
                    pathname: "/lessons/[id]",
                    params: { id: lesson.id, path: pathId, topicId },
                  })
                }
              >
                <View style={styles.lessonNum}>
                  <Text style={styles.lessonNumText}>{idx + 1}</Text>
                </View>

                <View style={styles.lessonContent}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonPreview} numberOfLines={2}>
                    {lesson.explanation}
                  </Text>
                </View>

                <View
                  style={[
                    styles.startChip,
                    isLessonCompleted(lesson.id) && styles.completedChip,
                  ]}
                >
                  <Text
                    style={[
                      styles.startChipText,
                      isLessonCompleted(lesson.id) && styles.completedChipText,
                    ]}
                  >
                    {isLessonCompleted(lesson.id) ? "Completed ✓" : "Start"}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {topicData.projects && topicData.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>MINI PROJECT</Text>
            <Text style={styles.sectionTitle}>Build to practise</Text>

            {topicData.projects.map((project) => (
              <Pressable
                key={project.id}
                style={({ pressed }) => [
                  styles.projectCard,
                  pressed && styles.projectCardPressed,
                ]}
                onPress={() =>
                  router.push({
                    pathname: "/projects/[id]",
                    params: { id: project.id, path: pathId, topicId },
                  })
                }
              >
                <View style={styles.projectHeader}>
                  <View style={styles.projectIconBox}>
                    <Text style={styles.projectIcon}>🛠️</Text>
                  </View>
                  <View style={styles.projectMeta}>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    <View
                      style={[
                        styles.projectBadge,
                        isProjectCompleted(project.id) && styles.completedChip,
                      ]}
                    >
                      <Text
                        style={[
                          styles.projectBadgeText,
                          isProjectCompleted(project.id) && styles.completedChipText,
                        ]}
                      >
                        {isProjectCompleted(project.id) ? "Completed ✓" : "Practice Project"}
                      </Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.projectDesc}>{project.description}</Text>

                <View style={styles.reqPreview}>
                  <Text style={styles.reqPreviewLabel}>Requirements</Text>
                  {project.requirements.slice(0, 2).map((req, i) => (
                    <Text key={i} style={styles.reqPreviewItem} numberOfLines={1}>
                      • {req}
                    </Text>
                  ))}
                  {project.requirements.length > 2 && (
                    <Text style={styles.reqMore}>
                      + {project.requirements.length - 2} more
                    </Text>
                  )}
                </View>

                <View
                  style={[
                    styles.viewGuideBtn,
                    isProjectCompleted(project.id) && { backgroundColor: Colors.success },
                  ]}
                >
                  <Text style={styles.viewGuideBtnText}>
                    {isProjectCompleted(project.id)
                      ? "Completed ✓ Review Guide"
                      : "View Project Guide →"}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
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
  backBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
  },
  backBtnText: {
    color: Colors.textInverse,
    fontWeight: FontWeight.semiBold,
  },
  overviewCard: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xxl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Elevation.md,
  },
  overviewLabel: {
    ...LabelChip,
    color: Colors.butter,
    marginBottom: Spacing.sm,
  },
  overviewTitle: {
    fontSize: FontSize.title1,
    fontWeight: FontWeight.black,
    color: Colors.textInverse,
    marginBottom: Spacing.sm,
  },
  overviewDesc: {
    fontSize: FontSize.body,
    color: "rgba(255,255,255,0.70)",
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  overviewMeta: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  metaBadge: {
    backgroundColor: Colors.butter,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
  },
  metaBadgeText: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.semiBold,
    color: Colors.primary,
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
  quizBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.butter,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.butterDark,
  },
  quizBtnPressed: {
    backgroundColor: Colors.butterMid,
  },
  quizBtnText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  quizBtnArrow: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.primaryDark,
  },
  demoQuizBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  demoQuizBtnPressed: {
    backgroundColor: Colors.surfaceSecondary,
  },
  demoQuizBtnText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  demoQuizBtnArrow: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.textMuted,
  },
  lessonsList: {
    gap: Spacing.sm,
  },
  lessonCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Elevation.sm,
  },
  lessonCardPressed: {
    backgroundColor: Colors.surfaceSecondary,
  },
  lessonNum: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonNumText: {
    fontSize: FontSize.bodySmall,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  lessonPreview: {
    fontSize: FontSize.caption,
    color: Colors.textMuted,
    lineHeight: 16,
  },
  startChip: {
    backgroundColor: Colors.butter,
    borderRadius: Radius.pill,
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
  },
  startChipText: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  projectCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1.5,
    borderColor: Colors.primaryLight + "40",
    padding: Spacing.xl,
    ...Elevation.md,
  },
  projectCardPressed: {
    backgroundColor: Colors.surfaceSecondary,
  },
  projectHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  projectIconBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  projectIcon: {
    fontSize: 22,
  },
  projectMeta: {
    flex: 1,
  },
  projectTitle: {
    fontSize: FontSize.title3,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  projectBadge: {
    alignSelf: "flex-start",
    backgroundColor: Colors.butter,
    borderRadius: Radius.pill,
    paddingVertical: 2,
    paddingHorizontal: Spacing.sm,
  },
  projectBadgeText: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  projectDesc: {
    fontSize: FontSize.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  reqPreview: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    gap: 4,
  },
  reqPreviewLabel: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.bold,
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  reqPreviewItem: {
    fontSize: FontSize.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  reqMore: {
    fontSize: FontSize.caption,
    color: Colors.textMuted,
    fontStyle: "italic",
  },
  viewGuideBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  viewGuideBtnText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
  },
  completedChip: {
    backgroundColor: Colors.successBg,
    borderColor: Colors.success + "30",
  },
  completedChipText: {
    color: Colors.success,
  },
});

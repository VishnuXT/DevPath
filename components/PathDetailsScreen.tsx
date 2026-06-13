import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { CareerPath } from "../data/types";
import ProgressBar from "./ProgressBar";
import AppHeader from "./AppHeader";
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
  const completedCount = Math.round((progress / 100) * data.roadmap.length);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title={data.title} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero Banner ──────────────────────────── */}
        <View style={styles.hero}>
          <View style={styles.heroIconRing}>
            <Text style={styles.heroEmoji}>{data.emoji}</Text>
          </View>
          <Text style={styles.heroTitle}>{data.title}</Text>
          <Text style={styles.heroSubtitle}>{data.description}</Text>

          {/* Timeline badge */}
          <View style={styles.timelineBadge}>
            <Text style={styles.timelineBadgeText}>
              ⏱ {data.learningTimeline} to job-ready
            </Text>
          </View>
        </View>

        {/* ── Stats Strip ──────────────────────────── */}
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

        {/* ── Progress ─────────────────────────────── */}
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
                ? "You haven't started yet — let's go! 🚀"
                : `You're ${progress}% of the way there. Keep going!`}
            </Text>
          </View>
        </View>

        {/* ── Technologies ─────────────────────────── */}
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

        {/* ── Skills ───────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills You'll Gain</Text>
          <View style={styles.card}>
            {data.skills.map((skill, i) => (
              <View key={i} style={styles.skillRow}>
                <View style={styles.skillDot} />
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Career Opportunities ─────────────────── */}
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

        {/* ── Roadmap Preview ──────────────────────── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Roadmap Preview</Text>
          </View>
          <View style={styles.card}>
            {data.roadmap.map((item, i) => (
              <View key={item.id} style={styles.previewRow}>
                <View style={[styles.previewDot, i === 0 && styles.previewDotActive]} />
                <Text
                  style={[
                    styles.previewText,
                    i === 0 && styles.previewTextActive,
                  ]}
                >
                  {i + 1}. {item.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── CTA ──────────────────────────────────── */}
        <Pressable
          style={({ pressed }) => [styles.ctaBtn, pressed && styles.ctaBtnPressed]}
          onPress={() =>
            router.push({ pathname: "/roadmap", params: { path: pathId } })
          }
        >
          <Text style={styles.ctaBtnText}>Open Full Roadmap</Text>
          <Text style={styles.ctaBtnArrow}>→</Text>
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

  // Hero
  hero: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    padding: Spacing.xxxl,
    marginBottom: Spacing.xl,
    ...Elevation.md,
  },
  heroIconRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.butter,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  heroEmoji: {
    fontSize: 36,
  },
  heroTitle: {
    fontSize: FontSize.title1,
    fontWeight: FontWeight.black,
    color: Colors.textInverse,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  heroSubtitle: {
    fontSize: FontSize.bodySmall,
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  timelineBadge: {
    backgroundColor: Colors.butter,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
  },
  timelineBadgeText: {
    fontSize: FontSize.label,
    fontWeight: FontWeight.semiBold,
    color: Colors.primary,
  },

  // Stats Strip
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

  // Section
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

  // Generic Card
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

  // Technology chips
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

  // Skills list
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

  // Career roles
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

  // Roadmap Preview
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
  previewText: {
    fontSize: FontSize.bodySmall,
    color: Colors.textMuted,
  },
  previewTextActive: {
    color: Colors.textPrimary,
    fontWeight: FontWeight.semiBold,
  },

  // CTA button
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
    color: Colors.butter,
  },
});

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import PathCard from "../components/PathCard";
import ProgressBar from "../components/ProgressBar";
import { careerPaths } from "../data";
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

const PATHS = [
  {
    id: "web",
    emoji: "🌐",
    description: "Build responsive websites and web apps using HTML, CSS, JavaScript, and React.",
    route: "/web" as const,
  },
  {
    id: "mobile",
    emoji: "📱",
    description: "Create cross-platform iOS and Android apps with React Native and Expo.",
    route: "/mobile" as const,
  },
  {
    id: "backend",
    emoji: "⚙️",
    description: "Design APIs, manage databases, and build server-side systems with Python and FastAPI.",
    route: "/backend" as const,
  },
];

export default function HomeScreen() {
  const { getOverallProgress, getPathProgress } = useProgress();
  const overallProgress = getOverallProgress();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Top Bar ─────────────────────────────── */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Good to see you 👋</Text>
            <Text style={styles.topBarTitle}>DevPath</Text>
          </View>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>D</Text>
          </View>
        </View>

        {/* ── Hero Banner ──────────────────────────── */}
        <View style={styles.heroBanner}>
          <View style={styles.heroBannerLeft}>
            <Text style={styles.heroBannerLabel}>YOUR JOURNEY</Text>
            <Text style={styles.heroBannerTitle}>
              Choose a career path to begin
            </Text>
            <Text style={styles.heroBannerSub}>
              Guided roadmaps, real lessons, and hands-on projects.
            </Text>

            {/* Progress teaser */}
            <View style={styles.heroBannerProgress}>
              <View style={styles.heroBannerProgressRow}>
                <Text style={styles.heroBannerProgressLabel}>Overall Progress</Text>
                <Text style={styles.heroBannerProgressPct}>{overallProgress}%</Text>
              </View>
              <ProgressBar
                progress={overallProgress}
                color={Colors.butter}
                backgroundColor="rgba(255,255,255,0.2)"
                height={6}
              />
            </View>
          </View>

          {/* Decorative illustration placeholder */}
          <View style={styles.heroBannerIcon}>
            <Text style={styles.heroBannerEmoji}>🎯</Text>
          </View>
        </View>

        {/* ── Stats Row ───────────────────────────── */}
        <View style={styles.statsRow}>
          {[
            { label: "Career Paths", value: "3" },
            { label: "Total Topics", value: `${Object.values(careerPaths).reduce((a, p) => a + p.roadmap.length, 0)}` },
            { label: "Projects", value: `${Object.values(careerPaths).reduce((a, p) => a + p.roadmap.reduce((b, r) => b + (r.projects?.length ?? 0), 0), 0)}` },
          ].map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statCardNumber}>{stat.value}</Text>
              <Text style={styles.statCardLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* ── Path Selection ───────────────────────── */}
        <View style={styles.pathSection}>
          <Text style={styles.sectionLabel}>PICK YOUR PATH</Text>
          <Text style={styles.sectionTitle}>Where do you want to go?</Text>
        </View>

        {PATHS.map((p) => {
          const pathData = careerPaths[p.id];
          return (
            <PathCard
              key={p.id}
              emoji={p.emoji}
              title={pathData.title}
              description={p.description}
              topicCount={pathData.roadmap.length}
              progress={getPathProgress(p.id)}
              onPress={() => router.push(p.route)}
            />
          );
        })}
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

  // Top bar
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xl,
    marginTop: Spacing.sm,
  },
  greeting: {
    fontSize: FontSize.bodySmall,
    color: Colors.textMuted,
    fontWeight: FontWeight.medium,
  },
  topBarTitle: {
    fontSize: FontSize.title1,
    fontWeight: FontWeight.black,
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.butter,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },

  // Hero banner
  heroBanner: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    ...Elevation.md,
  },
  heroBannerLeft: {
    flex: 1,
    paddingRight: Spacing.lg,
  },
  heroBannerLabel: {
    ...LabelChip,
    color: Colors.butter,
    marginBottom: Spacing.sm,
  },
  heroBannerTitle: {
    fontSize: FontSize.title2,
    fontWeight: FontWeight.black,
    color: Colors.textInverse,
    lineHeight: 30,
    marginBottom: Spacing.sm,
  },
  heroBannerSub: {
    fontSize: FontSize.bodySmall,
    color: "rgba(255,255,255,0.65)",
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  heroBannerProgress: {
    gap: Spacing.xs,
  },
  heroBannerProgressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroBannerProgressLabel: {
    fontSize: FontSize.caption,
    color: "rgba(255,255,255,0.6)",
    fontWeight: FontWeight.semiBold,
  },
  heroBannerProgressPct: {
    fontSize: FontSize.caption,
    color: Colors.butter,
    fontWeight: FontWeight.bold,
  },
  heroBannerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.butter,
    alignItems: "center",
    justifyContent: "center",
  },
  heroBannerEmoji: {
    fontSize: 32,
  },

  // Stats row
  statsRow: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    ...Elevation.sm,
  },
  statCardNumber: {
    fontSize: FontSize.title2,
    fontWeight: FontWeight.black,
    color: Colors.primary,
  },
  statCardLabel: {
    fontSize: FontSize.caption,
    color: Colors.textMuted,
    fontWeight: FontWeight.semiBold,
    marginTop: 2,
    textAlign: "center",
  },

  // Path section heading
  pathSection: {
    marginBottom: Spacing.lg,
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
  },
});
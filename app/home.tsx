import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Pressable,
  Modal,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const INTRO_SEEN_KEY = "devroot_intro_seen";

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
  const { getOverallProgress, getPathProgress, loading } = useProgress();
  const overallProgress = getOverallProgress();
  const [showIntro, setShowIntro] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    async function checkIntro() {
      try {
        const seen = await AsyncStorage.getItem(INTRO_SEEN_KEY);
        if (!seen) {
          setShowIntro(true);
        } else {
          setShowReminder(true);
        }
      } catch {
        setShowIntro(true);
      }
    }
    checkIntro();
  }, []);



  async function dismissIntro() {
    setShowIntro(false);
    try {
      await AsyncStorage.setItem(INTRO_SEEN_KEY, "true");
    } catch (e) {
      console.warn("Error saving intro seen state", e);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* First-time Onboarding Modal */}
      <Modal
        visible={showIntro}
        transparent
        animationType="fade"
        onRequestClose={() => setShowIntro(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalEmoji}>🌱</Text>
            <Text style={styles.modalTitle}>Before You Start...</Text>

            <View style={styles.modalCard}>
              <View style={styles.modalItem}>
                <Text style={styles.modalItemTitle}>💡 Not Just Theory</Text>
                <Text style={styles.modalItemText}>
                  We guide you through the basics, but view this app as your mentor and helper. To get the best results, use external modules, packages, and tutorials to expand your learning!
                </Text>
              </View>

              <View style={styles.modalItem}>
                <Text style={styles.modalItemTitle}>💻 Practice on Code</Text>
                <Text style={styles.modalItemText}>
                  A pen and paper won&apos;t write programs. Always use your laptop or development machine to practice hands-on while going through the lessons.
                </Text>
              </View>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.modalBtn,
                pressed && styles.modalBtnPressed
              ]}
              onPress={dismissIntro}
            >
              <Text style={styles.modalBtnText}>Got it, let&apos;s code! 🚀</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Subsequent Laptop Reminder Modal */}
      <Modal
        visible={showReminder}
        transparent
        animationType="fade"
        onRequestClose={() => setShowReminder(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.reminderContent}>
            <Text style={styles.reminderEmoji}>💻</Text>
            <Text style={styles.reminderTitle}>Ready to Code?</Text>
            <Text style={styles.reminderText}>
              Make sure your laptop or development machine is set up next to you. Practice is the key to mastering code!
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.modalBtn,
                pressed && styles.modalBtnPressed
              ]}
              onPress={() => setShowReminder(false)}
            >
              <Text style={styles.modalBtnText}>Laptops Ready! 🚀</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <ScrollView ref={scrollRef} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Good to see you 👋</Text>
            <Text style={styles.topBarTitle}>DevRoot</Text>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.avatarPlaceholder,
              styles.discordAvatar,
              pressed && styles.discordAvatarPressed,
            ]}
            onPress={() => {
              Linking.openURL("https://discord.gg/FHwREGyN").catch((err) =>
                console.warn("Failed to open Discord link", err)
              );
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="logo-discord" size={22} color="#FFFFFF" />
          </Pressable>
        </View>



        <View style={styles.heroBanner}>
          <View style={styles.heroBannerLeft}>
            <Text style={styles.heroBannerLabel}>LEARN FROM THE ROOTS</Text>
            <Text style={styles.heroBannerTitle}>
              Learn development one step at a time
            </Text>
            <Text style={styles.heroBannerSub}>
              Lessons, quizzes, and projects designed for complete beginners.
            </Text>

            <View style={styles.heroBannerProgress}>
              <View style={styles.heroBannerProgressRow}>
                <Text style={styles.heroBannerProgressLabel}>Overall Progress</Text>
                <Text style={styles.heroBannerProgressPct}>
                  {loading ? "..." : `${overallProgress}%`}
                </Text>
              </View>
              {loading ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator color={Colors.primary} />
                  <Text style={styles.loadingText}>Loading progress</Text>
                </View>
              ) : (
                <ProgressBar
                  progress={overallProgress}
                  color={Colors.primary}
                  backgroundColor={Colors.border}
                  height={6}
                />
              )}
            </View>
          </View>

          <View style={styles.heroBannerIcon}>
            <Text style={styles.heroBannerEmoji}>🎯</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          {[
            { label: "Career Paths", value: "3" },
            {
              label: "Total Topics",
              value: `${Object.values(careerPaths).reduce((a, p) => a + p.roadmap.length, 0)}`,
            },
            {
              label: "Projects",
              value: `${Object.values(careerPaths).reduce(
                (a, p) => a + p.roadmap.reduce((b, r) => b + (r.projects?.length ?? 0), 0),
                0
              )}`,
            },
          ].map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statCardNumber}>{stat.value}</Text>
              <Text style={styles.statCardLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.pathSection}>
          <Text style={styles.sectionLabel}>PICK YOUR PATH</Text>
          <Text style={styles.sectionTitle}>Start where you feel ready</Text>
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


        <Pressable
          style={({ pressed }) => [styles.aboutBtn, pressed && styles.aboutBtnPressed]}
          onPress={() => router.push("/about")}
        >
          <Text style={styles.aboutBtnLabel}>About DevRoot</Text>
          <Text style={styles.aboutBtnText}>
            Learn more about DevRoot, our mission, and the team behind the platform.
          </Text>
          <Text style={styles.aboutBtnCta}>View About Page →</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.discordBtn, pressed && styles.discordBtnPressed]}
          onPress={() => {
            Linking.openURL("https://discord.gg/FHwREGyN").catch((err) =>
              console.warn("Failed to open Discord link", err)
            );
          }}
        >
          <Text style={styles.discordBtnLabel}>COMMUNITY</Text>
          <Text style={styles.discordBtnText}>
            Join our Discord server to chat with other learners, ask questions, and share projects!
          </Text>
          <Text style={styles.discordBtnCta}>Join Discord Server 💬 →</Text>
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
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  discordAvatar: {
    backgroundColor: "#5865F2",
    borderWidth: 1,
    borderColor: "#4752C4",
    ...Elevation.sm,
  },
  discordAvatarPressed: {
    backgroundColor: "#4752C4",
  },
  avatarText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  heroBanner: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xxl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
    ...Elevation.md,
  },
  heroBannerLeft: {
    flex: 1,
    paddingRight: Spacing.lg,
  },
  heroBannerLabel: {
    ...LabelChip,
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  heroBannerTitle: {
    fontSize: FontSize.title2,
    fontWeight: FontWeight.black,
    color: Colors.textPrimary,
    lineHeight: 30,
    marginBottom: Spacing.sm,
  },
  heroBannerSub: {
    fontSize: FontSize.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  heroBannerProgress: {
    gap: Spacing.xs,
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    minHeight: 20,
  },
  loadingText: {
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  heroBannerProgressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroBannerProgressLabel: {
    fontSize: FontSize.caption,
    color: Colors.textMuted,
    fontWeight: FontWeight.semiBold,
  },
  heroBannerProgressPct: {
    fontSize: FontSize.caption,
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  heroBannerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  heroBannerEmoji: {
    fontSize: 32,
  },
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
  aboutBtn: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: Radius.xxl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Elevation.md,
  },
  aboutBtnPressed: {
    backgroundColor: Colors.surfaceSecondary,
  },
  aboutBtnLabel: {
    ...LabelChip,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  aboutBtnText: {
    fontSize: FontSize.body,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  aboutBtnCta: {
    fontSize: FontSize.bodySmall,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xxl,
    padding: Spacing.xl,
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    ...Elevation.lg,
  },
  modalEmoji: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  modalTitle: {
    fontSize: FontSize.title2,
    fontWeight: FontWeight.black,
    color: Colors.primary,
    marginBottom: Spacing.lg,
    textAlign: "center",
  },
  modalCard: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
    width: "100%",
  },
  modalItem: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalItemTitle: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  modalItemText: {
    fontSize: FontSize.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  modalBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    ...Elevation.md,
  },
  modalBtnPressed: {
    backgroundColor: Colors.primaryDark,
  },
  modalBtnText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
  },
  reminderContent: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xxl,
    padding: Spacing.xl,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    ...Elevation.lg,
  },
  reminderEmoji: {
    fontSize: 44,
    marginBottom: Spacing.sm,
  },
  reminderTitle: {
    fontSize: FontSize.title3,
    fontWeight: FontWeight.black,
    color: Colors.primary,
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  reminderText: {
    fontSize: FontSize.bodySmall,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  discordBtn: {
    marginTop: Spacing.lg,
    backgroundColor: "#5865F2",
    borderRadius: Radius.xxl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: "#4752C4",
    ...Elevation.md,
  },
  discordBtnPressed: {
    backgroundColor: "#4752C4",
  },
  discordBtnLabel: {
    ...LabelChip,
    color: "#FFFFFF",
    opacity: 0.9,
    marginBottom: Spacing.xs,
  },
  discordBtnText: {
    fontSize: FontSize.body,
    lineHeight: 22,
    color: "#FFFFFF",
    marginBottom: Spacing.sm,
    fontWeight: FontWeight.medium,
  },
  discordBtnCta: {
    fontSize: FontSize.bodySmall,
    fontWeight: FontWeight.bold,
    color: "#FFFFFF",
  },

});

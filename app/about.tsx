import { ScrollView, StyleSheet, Text, View, Pressable, StatusBar, Linking } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/AppHeader";
import { Colors, Elevation, FontSize, FontWeight, Radius, Spacing, LabelChip } from "../constants/theme";

const HOW_IT_WORKS = [
  {
    icon: "📖",
    title: "Learn",
    description: "Read beginner-friendly lessons.",
  },
  {
    icon: "📝",
    title: "Quiz",
    description: "Pass quizzes and test your understanding.",
  },
  {
    icon: "🚀",
    title: "Build",
    description: "Create projects using your new skills.",
  },
  {
    icon: "🏆",
    title: "Progress",
    description: "Unlock new modules and track your growth.",
  },
];

const LEARNING_PATHS = [
  {
    icon: "🌐",
    title: "Web Fundamentals",
    description: "Build responsive websites using HTML, CSS, and JavaScript.",
  },
  {
    icon: "⚙️",
    title: "Backend Fundamentals",
    description: "Create APIs, databases, and backend applications.",
  },
  {
    icon: "📱",
    title: "Mobile App Fundamentals",
    description: "Build mobile applications using React Native.",
  },
];

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <AppHeader title="About DevRoot" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>🌱 DevRoot</Text>
          </View>
          <Text style={styles.heroTitle}>Learn Development from the Roots.</Text>
          <Text style={styles.heroText}>
            DevRoot is a beginner-friendly learning platform designed to help students
            learn development through lessons, quizzes, and real projects.
          </Text>
          <Text style={styles.heroText}>
            Whether you&apos;re starting with Web Development, Backend Development, or
            Mobile App Development, DevRoot guides you step by step from the fundamentals
            to building your own projects.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>MISSION</Text>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              We believe learning development should be simple, practical, and accessible.
            </Text>
            <Text style={styles.cardText}>
              DevRoot focuses on helping learners build real projects while learning core
              development skills.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>HOW IT WORKS</Text>
          <Text style={styles.sectionTitle}>Learn by doing</Text>
          <View style={styles.grid}>
            {HOW_IT_WORKS.map((item) => (
              <View key={item.title} style={styles.featureCard}>
                <Text style={styles.featureIcon}>{item.icon}</Text>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureText}>{item.description}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>LEARNING PATHS</Text>
          <Text style={styles.sectionTitle}>What DevRoot offers</Text>
          <View style={styles.pathList}>
            {LEARNING_PATHS.map((path) => (
              <View key={path.title} style={styles.pathCard}>
                <View style={styles.pathIconWrap}>
                  <Text style={styles.pathIcon}>{path.icon}</Text>
                </View>
                <View style={styles.pathContent}>
                  <Text style={styles.pathTitle}>{path.title}</Text>
                  <Text style={styles.pathText}>{path.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ABOUT THE TEAM</Text>
          <Text style={styles.sectionTitle}>About The Team</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              DevRoot is developed by Vishnu V and built under AVLRVisions.
            </Text>
            <Text style={styles.cardText}>
              Our goal is to create educational tools that make technology learning
              practical, accessible, and enjoyable for beginners.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>VISION</Text>
          <Text style={styles.sectionTitle}>Our Vision</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              To help beginners confidently learn development and build real-world
              projects from the ground up.
            </Text>
            <Text style={styles.visionLine}>Learn.</Text>
            <Text style={styles.visionLine}>Build.</Text>
            <Text style={styles.visionLine}>Grow.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>COMMUNITY</Text>
          <Text style={styles.sectionTitle}>Join the Discussion</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              Need help with a lesson, want to showcase a project, or chat with other beginners? Join our official community!
            </Text>
            <Pressable
              style={({ pressed }) => [styles.discordLinkBtn, pressed && styles.discordLinkBtnPressed]}
              onPress={() => {
                Linking.openURL("https://discord.gg/RHJpEkWggS").catch((err) =>
                  console.warn("Failed to open Discord link", err)
                );
              }}
            >
              <Text style={styles.discordLinkBtnText}>Join our Discord Server 💬</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>DevRoot v1.0</Text>
          <Text style={styles.footerText}>Developed by Vishnu V</Text>
          <Text style={styles.footerText}>AVLRVisions</Text>
          <Text style={styles.footerNote}>Learn Development from the Roots.</Text>
          <Pressable
            style={({ pressed }) => [styles.footerBtn, pressed && styles.footerBtnPressed]}
            onPress={() => router.back()}
          >
            <Text style={styles.footerBtnText}>Go Back</Text>
          </Pressable>
        </View>
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
  heroCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xxl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Elevation.md,
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  heroBadgeText: {
    ...LabelChip,
    color: Colors.primary,
  },
  heroTitle: {
    fontSize: FontSize.title1,
    lineHeight: 34,
    fontWeight: FontWeight.black,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  heroText: {
    fontSize: FontSize.body,
    lineHeight: 24,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
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
    borderRadius: Radius.xxl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Elevation.sm,
  },
  cardText: {
    fontSize: FontSize.body,
    lineHeight: 24,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  grid: {
    gap: Spacing.sm,
  },
  featureCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    ...Elevation.sm,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: Spacing.sm,
  },
  featureTitle: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  featureText: {
    fontSize: FontSize.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  pathList: {
    gap: Spacing.sm,
  },
  pathCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    gap: Spacing.md,
    ...Elevation.sm,
  },
  pathIconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pathIcon: {
    fontSize: 22,
  },
  pathContent: {
    flex: 1,
  },
  pathTitle: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  pathText: {
    fontSize: FontSize.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  visionLine: {
    fontSize: FontSize.title3,
    fontWeight: FontWeight.black,
    color: Colors.primary,
    marginTop: 2,
  },
  footerCard: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xxl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.primaryDark,
    gap: 6,
    ...Elevation.md,
  },
  footerTitle: {
    fontSize: FontSize.title3,
    fontWeight: FontWeight.black,
    color: Colors.textInverse,
  },
  footerText: {
    fontSize: FontSize.bodySmall,
    color: "rgba(255,255,255,0.9)",
    fontWeight: FontWeight.medium,
  },
  footerNote: {
    fontSize: FontSize.caption,
    color: "rgba(255,255,255,0.8)",
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  footerBtn: {
    alignSelf: "flex-start",
    backgroundColor: Colors.surface,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  footerBtnPressed: {
    backgroundColor: Colors.surfaceSecondary,
  },
  footerBtnText: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  discordLinkBtn: {
    backgroundColor: "#5865F2",
    borderRadius: Radius.pill,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.sm,
    ...Elevation.sm,
  },
  discordLinkBtnPressed: {
    backgroundColor: "#4752C4",
  },
  discordLinkBtnText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: "#FFFFFF",
  },
});

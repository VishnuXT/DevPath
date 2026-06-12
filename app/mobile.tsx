import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { mobilePath } from "../data/mobile";
import ProgressBar from "../components/ProgressBar";

export default function MobileScreen() {
  const data = mobilePath;
  const progress = 0; // Dynamic in Phase 4

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>{data.emoji}</Text>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>⏱️ {data.learningTimeline}</Text>
          </View>
          <Text style={styles.description}>{data.description}</Text>
        </View>

        {/* Technologies Stack */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technologies You'll Learn</Text>
          <View style={styles.techContainer}>
            {data.technologies.map((tech, idx) => (
              <View key={idx} style={styles.techBadge}>
                <Text style={styles.techEmoji}>{tech.emoji}</Text>
                <Text style={styles.techName}>{tech.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Skills Acquired</Text>
          <View style={styles.card}>
            {data.skills.map((skill, idx) => (
              <View key={idx} style={styles.skillRow}>
                <Text style={styles.checkIcon}>✓</Text>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Career Opportunities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Career Opportunities</Text>
          <View style={styles.opportunitiesContainer}>
            {data.careerOpportunities.map((role, idx) => (
              <View key={idx} style={styles.roleBadge}>
                <Text style={styles.roleText}>{role}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Learning Roadmap Preview / Progress */}
        <View style={styles.roadmapCard}>
          <Text style={styles.roadmapTitle}>Your Learning Journey</Text>
          
          <View style={styles.progressSection}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>Path Progress</Text>
              <Text style={styles.progressPercent}>{progress}%</Text>
            </View>
            <ProgressBar progress={progress} color="#8B5CF6" />
          </View>

          <View style={styles.divider} />

          <Text style={styles.roadmapSubtitle}>Roadmap Topics Preview:</Text>
          {data.roadmap.slice(0, 4).map((item, idx) => (
            <Text key={idx} style={styles.roadmapPreviewItem}>
              {idx + 1}. {item.title}
            </Text>
          ))}
          {data.roadmap.length > 4 && (
            <Text style={styles.roadmapPreviewMore}>
              + {data.roadmap.length - 4} more topics
            </Text>
          )}

          <Pressable
            style={styles.button}
            onPress={() => router.push({ pathname: "/roadmap", params: { path: "mobile" } })}
          >
            <Text style={styles.buttonText}>Open Interactive Roadmap</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 25,
    marginTop: 20,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
  },
  badge: {
    backgroundColor: "#F5F3FF",
    borderWidth: 1,
    borderColor: "#DDD6FE",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 8,
    marginBottom: 15,
  },
  badgeText: {
    color: "#6D28D9",
    fontSize: 14,
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },
  techContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  techBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  techEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  techName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  skillRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkIcon: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7C3AED",
    marginRight: 10,
    width: 20,
  },
  skillText: {
    fontSize: 15,
    color: "#334155",
    fontWeight: "500",
  },
  opportunitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  roleBadge: {
    backgroundColor: "#F1F5F9",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  roleText: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "600",
  },
  roadmapCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 4,
    marginTop: 10,
  },
  roadmapTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 15,
  },
  progressSection: {
    marginBottom: 15,
  },
  progressLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8B5CF6",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 15,
  },
  roadmapSubtitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 8,
  },
  roadmapPreviewItem: {
    fontSize: 15,
    color: "#334155",
    marginBottom: 6,
    paddingLeft: 5,
  },
  roadmapPreviewMore: {
    fontSize: 13,
    color: "#94A3B8",
    fontStyle: "italic",
    marginTop: 2,
    marginBottom: 15,
    paddingLeft: 5,
  },
  button: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});

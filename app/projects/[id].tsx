import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { careerPaths } from "../../data";

export default function ProjectScreen() {
  const params = useLocalSearchParams();
  const projectId = params.id as string;
  const topicId = params.topicId as string;
  const pathId = (params.path as string) || "backend";

  // Retrieve project details
  const pathData = careerPaths[pathId] || careerPaths.backend;
  const topicData = pathData.roadmap.find((t) => t.id === topicId);
  const projectData = topicData?.projects?.find((p) => p.id === projectId);

  // Path specific theme color
  let themeColor = "#2563EB"; // Backend default
  if (pathId === "web") themeColor = "#0EA5E9";
  if (pathId === "mobile") themeColor = "#8B5CF6";

  if (!projectData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Project guide not found.</Text>
          <Pressable style={[styles.button, { backgroundColor: themeColor }]} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerBar}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={[styles.backText, { color: themeColor }]}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Project: {projectData.title}
        </Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Intro */}
        <View style={styles.introCard}>
          <Text style={styles.sectionLabel}>MINI PROJECT GUIDE</Text>
          <Text style={styles.projectTitle}>{projectData.title}</Text>
          <Text style={styles.projectDescription}>{projectData.description}</Text>
        </View>

        {/* Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Requirements</Text>
          <View style={styles.card}>
            {projectData.requirements.map((req, idx) => (
              <View key={idx} style={styles.bulletRow}>
                <Text style={[styles.bulletDot, { color: themeColor }]}>•</Text>
                <Text style={styles.bulletText}>{req}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Folder Structure */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📂 Recommended Folder Structure</Text>
          <View style={styles.folderBlock}>
            <Text style={styles.folderText}>{projectData.folderStructure}</Text>
          </View>
        </View>

        {/* Guide */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Implementation Guide</Text>
          <View style={styles.card}>
            <Text style={styles.guideText}>{projectData.guide}</Text>
          </View>
        </View>

        {/* Complete Project Button */}
        <Pressable
          style={[styles.completeButton, { backgroundColor: themeColor }]}
          onPress={() => router.back()}
        >
          <Text style={styles.completeButtonText}>Complete Project</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
  },
  backButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  backText: {
    fontSize: 16,
    fontWeight: "700",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    flex: 1,
    textAlign: "center",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#64748B",
    marginBottom: 20,
  },
  introCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 1,
    marginBottom: 5,
  },
  projectTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 10,
  },
  projectDescription: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  bulletDot: {
    fontSize: 18,
    marginRight: 10,
    lineHeight: 18,
  },
  bulletText: {
    fontSize: 14,
    color: "#334155",
    flex: 1,
    lineHeight: 20,
  },
  folderBlock: {
    backgroundColor: "#0F172A",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  folderText: {
    fontFamily: "monospace",
    color: "#E2E8F0",
    fontSize: 14,
    lineHeight: 20,
  },
  guideText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
  },
  completeButton: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  completeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
});

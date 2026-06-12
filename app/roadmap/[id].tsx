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

export default function RoadmapItemDetailScreen() {
  const params = useLocalSearchParams();
  const topicId = params.id as string;
  const pathId = (params.path as string) || "backend";

  // Retrieve track data and specific topic
  const pathData = careerPaths[pathId] || careerPaths.backend;
  const topicData = pathData.roadmap.find((item) => item.id === topicId);

  // Path specific theme color
  let themeColor = "#2563EB"; // Backend default
  if (pathId === "web") themeColor = "#0EA5E9";
  if (pathId === "mobile") themeColor = "#8B5CF6";

  if (!topicData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Topic not found.</Text>
          <Pressable style={[styles.button, { backgroundColor: themeColor }]} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const handleLessonPress = (lessonId: string) => {
    router.push({
      pathname: `/lessons/${lessonId}`,
      params: { path: pathId, topicId: topicId }
    });
  };

  const handleProjectPress = (projectId: string) => {
    router.push({
      pathname: `/projects/${projectId}`,
      params: { path: pathId, topicId: topicId }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerBar}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={[styles.backText, { color: themeColor }]}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {topicData.title}
        </Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Intro Section */}
        <View style={styles.introCard}>
          <Text style={styles.introLabel}>TOPIC OVERVIEW</Text>
          <Text style={styles.topicTitle}>{topicData.title}</Text>
          <Text style={styles.topicDescription}>{topicData.description}</Text>
        </View>

        {/* Lessons List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📖 Lessons ({topicData.lessons.length})</Text>
          
          {topicData.lessons.map((lesson, idx) => {
            // First lesson is completed, others are start/active for demo
            const isLessonCompleted = idx === 0 && topicId === "python-basics";

            return (
              <Pressable
                key={lesson.id}
                style={styles.itemCard}
                onPress={() => handleLessonPress(lesson.id)}
              >
                <View style={styles.itemInfo}>
                  <Text style={styles.itemNumber}>{idx + 1}</Text>
                  <View style={styles.itemTextContainer}>
                    <Text style={styles.itemTitle}>{lesson.title}</Text>
                    <Text style={styles.itemSubtitle} numberOfLines={1}>
                      {lesson.explanation}
                    </Text>
                  </View>
                </View>

                {/* Status Indicator */}
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: isLessonCompleted
                        ? "#ECFDF5"
                        : `${themeColor}10`,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: isLessonCompleted ? "#059669" : themeColor },
                    ]}
                  >
                    {isLessonCompleted ? "Completed" : "Start"}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Projects Section */}
        {topicData.projects && topicData.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🛠️ Mini Projects ({topicData.projects.length})</Text>
            {topicData.projects.map((project) => (
              <Pressable
                key={project.id}
                style={[styles.projectCard, { borderColor: `${themeColor}30` }]}
                onPress={() => handleProjectPress(project.id)}
              >
                <View style={styles.projectHeader}>
                  <Text style={styles.projectEmoji}>🚀</Text>
                  <View style={styles.projectTitleContainer}>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    <Text style={styles.projectSubtitle}>Build to practice</Text>
                  </View>
                </View>
                <Text style={styles.projectDesc}>{project.description}</Text>
                <View style={[styles.projectAction, { backgroundColor: themeColor }]}>
                  <Text style={styles.projectActionText}>View Project Guide</Text>
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
    fontSize: 18,
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
    marginBottom: 25,
  },
  introLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 1,
    marginBottom: 5,
  },
  topicTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 10,
  },
  topicDescription: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
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
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 12,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  itemInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  itemNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
    color: "#475569",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    textAlignVertical: "center",
    marginRight: 12,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 13,
    color: "#64748B",
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  projectCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  projectHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  projectEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  projectTitleContainer: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  projectSubtitle: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  projectDesc: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    marginBottom: 15,
  },
  projectAction: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  projectActionText: {
    color: "white",
    fontSize: 14,
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

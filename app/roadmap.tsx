import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { careerPaths } from "../data";
import RoadmapItem from "../components/RoadmapItem";
import ProgressBar from "../components/ProgressBar";

export default function RoadmapScreen() {
  const params = useLocalSearchParams();
  const pathId = (params.path as string) || "backend";
  
  // Retrieve target path data, fallback to backend if invalid
  const data = careerPaths[pathId] || careerPaths.backend;

  // Determine path specific theme color
  let themeColor = "#2563EB"; // Backend default
  if (pathId === "web") themeColor = "#0EA5E9";
  if (pathId === "mobile") themeColor = "#8B5CF6";

  // Mock progress state (will be connected to AsyncStorage in Phase 4)
  const mockCompletedCount = 1; 
  const totalTopicsCount = data.roadmap.length;
  const progressPercent = Math.round((mockCompletedCount / totalTopicsCount) * 100);

  const handleItemPress = (itemId: string) => {
    router.push({
      pathname: `/roadmap/${itemId}`,
      params: { path: pathId }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={[styles.backText, { color: themeColor }]}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{data.title} Roadmap</Text>
        <View style={{ width: 60 }} /> {/* balance back button */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Progress Card */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Your Roadmap Progress</Text>
          <View style={styles.progressRow}>
            <Text style={styles.progressRatio}>
              {mockCompletedCount} of {totalTopicsCount} topics completed
            </Text>
            <Text style={[styles.progressPercent, { color: themeColor }]}>
              {progressPercent}%
            </Text>
          </View>
          <ProgressBar progress={progressPercent} color={themeColor} />
        </View>

        <Text style={styles.roadmapHeading}>Roadmap Timeline</Text>

        {/* Timeline Items */}
        <View style={styles.timelineContainer}>
          {data.roadmap.map((item, index) => {
            // Simple mock logic:
            // First item is completed (index === 0)
            // Second item is active (index === 1)
            // Other items are locked (index > 1)
            const isCompleted = index < mockCompletedCount;
            const isActive = index === mockCompletedCount;
            const isLast = index === data.roadmap.length - 1;

            return (
              <RoadmapItem
                key={item.id}
                number={index + 1}
                title={item.title}
                description={item.description}
                isCompleted={isCompleted}
                isActive={isActive}
                isLast={isLast}
                themeColor={themeColor}
                onPress={() => handleItemPress(item.id)}
              />
            );
          })}
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
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  progressCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 25,
  },
  progressTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 10,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressRatio: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: "800",
  },
  roadmapHeading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 15,
  },
  timelineContainer: {
    paddingLeft: 5,
  },
});
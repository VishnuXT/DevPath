import { useState } from "react";
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

export default function LessonScreen() {
  const params = useLocalSearchParams();
  const lessonId = params.id as string;
  const topicId = params.topicId as string;
  const pathId = (params.path as string) || "backend";

  // Retrieve lesson details
  const pathData = careerPaths[pathId] || careerPaths.backend;
  const topicData = pathData.roadmap.find((t) => t.id === topicId);
  const lessonData = topicData?.lessons.find((l) => l.id === lessonId);

  // Path specific theme color
  let themeColor = "#2563EB"; // Backend default
  if (pathId === "web") themeColor = "#0EA5E9";
  if (pathId === "mobile") themeColor = "#8B5CF6";

  // Quiz interactive state
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!lessonData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Lesson not found.</Text>
          <Pressable style={[styles.button, { backgroundColor: themeColor }]} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const handleOptionSelect = (idx: number) => {
    if (isSubmitted) return; // locked after submission
    setSelectedIdx(idx);
  };

  const handleQuizSubmit = () => {
    if (selectedIdx === null) return;
    setIsSubmitted(true);
  };

  const isCorrect = selectedIdx === lessonData.quiz.answerIndex;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerBar}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={[styles.backText, { color: themeColor }]}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Lesson: {lessonData.title}
        </Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Explanation Card */}
        <View style={styles.explanationCard}>
          <Text style={styles.sectionLabel}>CONCEPT</Text>
          <Text style={styles.lessonTitle}>{lessonData.title}</Text>
          <Text style={styles.explanationText}>{lessonData.explanation}</Text>
        </View>

        {/* Code Example */}
        {lessonData.codeExample && (
          <View style={styles.codeContainer}>
            <Text style={styles.codeLabel}>💻 CODE EXAMPLE</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>{lessonData.codeExample}</Text>
            </View>
          </View>
        )}

        {/* Quiz Section */}
        <View style={styles.quizCard}>
          <Text style={styles.quizHeaderLabel}>⚡ MINI QUIZ</Text>
          <Text style={styles.quizQuestion}>{lessonData.quiz.question}</Text>

          <View style={styles.optionsContainer}>
            {lessonData.quiz.options.map((option, idx) => {
              const isSelected = selectedIdx === idx;
              let optionStyle = styles.optionButton;
              let textStyle = styles.optionText;

              if (isSelected) {
                optionStyle = [styles.optionButton, styles.selectedOption, { borderColor: themeColor }];
                textStyle = [styles.optionText, styles.selectedOptionText, { color: themeColor }];
              }

              if (isSubmitted) {
                if (idx === lessonData.quiz.answerIndex) {
                  optionStyle = [styles.optionButton, styles.correctOption];
                  textStyle = [styles.optionText, styles.correctOptionText];
                } else if (isSelected && !isCorrect) {
                  optionStyle = [styles.optionButton, styles.incorrectOption];
                  textStyle = [styles.optionText, styles.incorrectOptionText];
                } else {
                  optionStyle = [styles.optionButton, styles.disabledOption];
                  textStyle = [styles.optionText, styles.disabledOptionText];
                }
              }

              return (
                <Pressable
                  key={idx}
                  style={optionStyle}
                  onPress={() => handleOptionSelect(idx)}
                  disabled={isSubmitted}
                >
                  <Text style={textStyle}>{option}</Text>
                </Pressable>
              );
            })}
          </View>

          {/* Feedback & Actions */}
          {!isSubmitted ? (
            <Pressable
              style={[
                styles.submitButton,
                { backgroundColor: selectedIdx !== null ? themeColor : "#CBD5E1" },
              ]}
              disabled={selectedIdx === null}
              onPress={handleQuizSubmit}
            >
              <Text style={styles.submitButtonText}>Check Answer</Text>
            </Pressable>
          ) : (
            <View style={styles.feedbackContainer}>
              <View
                style={[
                  styles.feedbackBox,
                  { backgroundColor: isCorrect ? "#ECFDF5" : "#FEF2F2" },
                ]}
              >
                <Text
                  style={[
                    styles.feedbackText,
                    { color: isCorrect ? "#059669" : "#DC2626" },
                  ]}
                >
                  {isCorrect
                    ? "🎉 Correct! You've mastered this concept!"
                    : "❌ Oops! That's incorrect. Try reviewing the lesson details above."}
                </Text>
              </View>

              <Pressable
                style={[styles.nextButton, { backgroundColor: themeColor }]}
                onPress={() => router.back()}
              >
                <Text style={styles.nextButtonText}>Continue Roadmap</Text>
              </Pressable>
            </View>
          )}
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
  explanationCard: {
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
  lessonTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 12,
  },
  explanationText: {
    fontSize: 15,
    color: "#334155",
    lineHeight: 24,
  },
  codeContainer: {
    marginBottom: 20,
  },
  codeLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 1,
    marginBottom: 8,
    paddingLeft: 4,
  },
  codeBlock: {
    backgroundColor: "#0F172A",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  codeText: {
    fontFamily: "monospace",
    color: "#38BDF8",
    fontSize: 14,
    lineHeight: 20,
  },
  quizCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  quizHeaderLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 1,
    marginBottom: 8,
  },
  quizQuestion: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    lineHeight: 22,
    marginBottom: 15,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    marginBottom: 10,
  },
  optionText: {
    fontSize: 15,
    color: "#475569",
    fontWeight: "600",
  },
  selectedOption: {
    backgroundColor: "white",
  },
  selectedOptionText: {
    fontWeight: "700",
  },
  correctOption: {
    backgroundColor: "#ECFDF5",
    borderColor: "#10B981",
  },
  correctOptionText: {
    color: "#065F46",
    fontWeight: "700",
  },
  incorrectOption: {
    backgroundColor: "#FEF2F2",
    borderColor: "#EF4444",
  },
  incorrectOptionText: {
    color: "#991B1B",
    fontWeight: "700",
  },
  disabledOption: {
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
  },
  disabledOptionText: {
    color: "#94A3B8",
  },
  submitButton: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  feedbackContainer: {
    marginTop: 5,
  },
  feedbackBox: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  feedbackText: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  nextButton: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
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

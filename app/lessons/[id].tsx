import { useState } from "react";
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
function HighlightCode({ code }: { code: string }) {
  const tokenRegex = /(<!--[\s\S]*?-->|\/\*[\s\S]*?\*\/|\/\/.*|#.*|"(?:\\.|[^\\"])*"|'(?:\\.|[^\\'])*'|`(?:\\.|[^\\`])*`|\b(?:const|let|var|function|return|import|from|def|class|if|else|await|async|for|while|try|except|in|as|is|and|or|not)\b|\b[a-zA-Z_][a-zA-Z0-9_]*\b(?=\s*\()|<\/?[a-zA-Z0-9_:-]+>?|<\/?>|\b\d+\b)/g;

  const parts = code.split(tokenRegex);

  return (
    <Text style={styles.codeLineText}>
      {parts.map((part, index) => {
        if (!part) return null;

        let color = "#ABB2BF"; // default font color (off-white)
        let fontWeight: "400" | "bold" = "400";

        if (part.startsWith("//") || part.startsWith("/*") || part.startsWith("#") || part.startsWith("<!--")) {
          color = "#5C6370"; // comment (slate gray)
        } else if (part.startsWith('"') || part.startsWith("'") || part.startsWith("`")) {
          color = "#98C379"; // string (emerald/sage green)
        } else if (part.startsWith("<") || part.endsWith(">")) {
          color = "#E06C75"; // tag/HTML element (coral pink)
        } else if (/^(?:const|let|var|function|return|import|from|def|class|if|else|await|async|for|while|try|except|in|as|is|and|or|not)$/.test(part)) {
          color = "#C678DD"; // keyword (purple)
          fontWeight = "bold";
        } else if (/^\d+$/.test(part)) {
          color = "#D19A66"; // number (orange)
        } else if (/\b[a-zA-Z_][a-zA-Z0-9_]*\b(?=\s*\()/.test(part)) {
          color = "#61AFEF"; // function (sky blue)
        }

        return (
          <Text key={index} style={{ color, fontWeight }}>
            {part}
          </Text>
        );
      })}
    </Text>
  );
}

export default function LessonScreen() {
  const {
    id: lessonId,
    topicId,
    path: pathId = "backend",
  } = useLocalSearchParams<{ id: string; topicId: string; path: string }>();

  const { completeLesson } = useProgress();

  const pathData = careerPaths[pathId] ?? careerPaths.backend;
  const topicData = pathData.roadmap.find((t) => t.id === topicId);
  const lessonData = topicData?.lessons.find((l) => l.id === lessonId);

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!lessonData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader title="Lesson" />
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🔍</Text>
          <Text style={styles.emptyTitle}>Lesson not found</Text>
          <Pressable style={styles.emptyBtn} onPress={() => router.back()}>
            <Text style={styles.emptyBtnText}>← Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const quiz = lessonData.quiz;
  const isCorrect = submitted && selectedIdx === quiz.answerIndex;

  function handleSubmit() {
    if (selectedIdx === null) return;
    setSubmitted(true);
    if (selectedIdx === quiz.answerIndex) {
      completeLesson(lessonId);
    }
  }

  function handleTryAgain() {
    setSelectedIdx(null);
    setSubmitted(false);
  }

  function getOptionStyle(idx: number) {
    if (!submitted) {
      return [styles.option, selectedIdx === idx && styles.optionSelected];
    }
    if (idx === quiz.answerIndex) return [styles.option, styles.optionCorrect];
    if (idx === selectedIdx) return [styles.option, styles.optionWrong];
    return [styles.option, styles.optionDisabled];
  }

  function getOptionTextStyle(idx: number) {
    if (!submitted) {
      return [styles.optionText, selectedIdx === idx && styles.optionTextSelected];
    }
    if (idx === quiz.answerIndex) return [styles.optionText, styles.optionTextCorrect];
    if (idx === selectedIdx) return [styles.optionText, styles.optionTextWrong];
    return [styles.optionText, styles.optionTextDisabled];
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title={lessonData.title} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.conceptCard}>
          <Text style={styles.conceptLabel}>CONCEPT</Text>
          <Text style={styles.conceptTitle}>{lessonData.title}</Text>
          <Text style={styles.conceptBody}>{lessonData.explanation}</Text>
        </View>

        {lessonData.codeExample && (
          <View style={styles.codeSection}>
            <View style={styles.codeHeader}>
              <View style={[styles.codeDot, { backgroundColor: "#FF5F56" }]} />
              <View style={[styles.codeDot, { backgroundColor: "#FFBD2E" }]} />
              <View style={[styles.codeDot, { backgroundColor: "#27C93F" }]} />
              <Text style={styles.codeHeaderLabel}>example.code</Text>
            </View>
            <ScrollView style={styles.codeBlock} horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ minWidth: "100%" }}>
                {lessonData.codeExample
                  .trim()
                  .split("\n")
                  .map((line, idx) => (
                    <View key={idx} style={styles.codeLineRow}>
                      <Text style={styles.lineNumber}>{idx + 1}</Text>
                      <HighlightCode code={line} />
                    </View>
                  ))}
              </View>
            </ScrollView>
          </View>
        )}

        <View style={styles.quizSection}>
          <Text style={styles.quizLabel}>MINI QUIZ</Text>
          <Text style={styles.quizQuestion}>{quiz.question}</Text>

          <View style={styles.options}>
            {quiz.options.map((opt, idx) => (
              <Pressable
                key={idx}
                style={getOptionStyle(idx)}
                onPress={() => !submitted && setSelectedIdx(idx)}
                disabled={submitted}
              >
                <View
                  style={[
                    styles.optionLetter,
                    submitted && idx === quiz.answerIndex && styles.optionLetterCorrect,
                    submitted && idx === selectedIdx && !isCorrect && styles.optionLetterWrong,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionLetterText,
                      submitted && idx === quiz.answerIndex && styles.optionLetterTextCorrect,
                    ]}
                  >
                    {String.fromCharCode(65 + idx)}
                  </Text>
                </View>
                <Text style={getOptionTextStyle(idx)}>{opt}</Text>
              </Pressable>
            ))}
          </View>

          {!submitted ? (
            <Pressable
              style={[styles.submitBtn, selectedIdx === null && styles.submitBtnDisabled]}
              onPress={handleSubmit}
              disabled={selectedIdx === null}
            >
              <Text style={styles.submitBtnText}>Check Answer</Text>
            </Pressable>
          ) : (
            <View style={styles.feedbackArea}>
              <View
                style={[
                  styles.feedbackCard,
                  isCorrect ? styles.feedbackCorrect : styles.feedbackWrong,
                ]}
              >
                <Text style={styles.feedbackIcon}>{isCorrect ? "🎉" : "💡"}</Text>
                <Text
                  style={[
                    styles.feedbackText,
                    isCorrect ? styles.feedbackTextCorrect : styles.feedbackTextWrong,
                  ]}
                >
                  {isCorrect
                    ? "Correct! You've got this concept down."
                    : "Not quite - review the explanation above and try again!"}
                </Text>
              </View>

              {isCorrect ? (
                <Pressable
                  style={({ pressed }) => [
                    styles.continueBtn,
                    pressed && { opacity: 0.85 },
                  ]}
                  onPress={() => router.back()}
                >
                  <Text style={styles.continueBtnText}>Continue Roadmap</Text>
                  <Text style={styles.continueBtnArrow}>→</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={({ pressed }) => [
                    styles.tryAgainBtn,
                    pressed && { opacity: 0.85 },
                  ]}
                  onPress={handleTryAgain}
                >
                  <Text style={styles.tryAgainBtnText}>Try Again</Text>
                </Pressable>
              )}
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
  emptyBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
  },
  emptyBtnText: {
    color: Colors.textInverse,
    fontWeight: FontWeight.semiBold,
  },
  conceptCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Elevation.sm,
  },
  conceptLabel: {
    ...LabelChip,
    color: Colors.primaryLight,
    marginBottom: Spacing.sm,
  },
  conceptTitle: {
    fontSize: FontSize.title2,
    fontWeight: FontWeight.black,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    lineHeight: 30,
  },
  conceptBody: {
    fontSize: FontSize.body,
    color: Colors.textSecondary,
    lineHeight: 25,
  },
  codeSection: {
    marginBottom: Spacing.xl,
    borderRadius: Radius.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1E293B",
    ...Elevation.sm,
  },
  codeHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B0F17",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
    borderBottomWidth: 1,
    borderColor: "#1E293B",
  },
  codeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  codeHeaderLabel: {
    fontFamily: "monospace",
    fontSize: 12,
    fontWeight: FontWeight.medium,
    color: "#64748B",
    marginLeft: Spacing.sm,
  },
  codeBlock: {
    backgroundColor: "#0E131F",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  codeLineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  lineNumber: {
    fontFamily: "monospace",
    fontSize: 13,
    color: "#475569",
    width: 24,
    marginRight: 12,
    textAlign: "right",
  },
  codeLineText: {
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 18,
    color: "#ABB2BF",
  },
  quizSection: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    ...Elevation.sm,
  },
  quizLabel: {
    ...LabelChip,
    color: Colors.primaryLight,
    marginBottom: Spacing.sm,
  },
  quizQuestion: {
    fontSize: FontSize.title3,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    lineHeight: 26,
    marginBottom: Spacing.xl,
  },
  options: {
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryAlpha08,
  },
  optionCorrect: {
    borderColor: Colors.success,
    backgroundColor: Colors.successBg,
  },
  optionWrong: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorBg,
  },
  optionDisabled: {
    opacity: 0.45,
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  optionLetterCorrect: {
    backgroundColor: Colors.success,
  },
  optionLetterWrong: {
    backgroundColor: Colors.error,
  },
  optionLetterText: {
    fontSize: FontSize.bodySmall,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
  },
  optionLetterTextCorrect: {
    color: Colors.textInverse,
  },
  optionText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
    flex: 1,
  },
  optionTextSelected: {
    color: Colors.primary,
    fontWeight: FontWeight.semiBold,
  },
  optionTextCorrect: {
    color: Colors.successText,
    fontWeight: FontWeight.semiBold,
  },
  optionTextWrong: {
    color: Colors.errorText,
    fontWeight: FontWeight.semiBold,
  },
  optionTextDisabled: {
    color: Colors.textMuted,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  submitBtnDisabled: {
    backgroundColor: Colors.border,
  },
  submitBtnText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
  },
  feedbackArea: {
    gap: Spacing.md,
  },
  feedbackCard: {
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.md,
  },
  feedbackCorrect: {
    backgroundColor: Colors.successBg,
    borderWidth: 1,
    borderColor: Colors.success + "50",
  },
  feedbackWrong: {
    backgroundColor: Colors.errorBg,
    borderWidth: 1,
    borderColor: Colors.error + "40",
  },
  feedbackIcon: {
    fontSize: 22,
  },
  feedbackText: {
    flex: 1,
    fontSize: FontSize.body,
    fontWeight: FontWeight.medium,
    lineHeight: 22,
  },
  feedbackTextCorrect: {
    color: Colors.successText,
  },
  feedbackTextWrong: {
    color: Colors.errorText,
  },
  continueBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  continueBtnText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
  },
  continueBtnArrow: {
    fontSize: FontSize.body,
    color: Colors.textInverse,
    fontWeight: FontWeight.bold,
  },
  tryAgainBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.error,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
  },
  tryAgainBtnText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
  },
});

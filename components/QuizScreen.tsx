import { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, FontSize, FontWeight, Radius, Spacing, Elevation } from "../constants/theme";
import AppHeader from "./AppHeader";
import QuestionCard from "./QuestionCard";
import QuizProgressBar from "./QuizProgressBar";
import { calculateQuizResult, selectRandomQuestions } from "../quiz/utils";
import {
  QuizQuestion,
  QuizResult,
  QuizScreenProps,
  ShuffledQuizQuestion,
} from "../quiz/types";

interface SelectedAnswerState {
  questionId: string | number;
  selectedAnswer: string;
  isCorrect: boolean;
}

function buildAttempt(
  questionBank: QuizQuestion[],
  questionsPerAttempt: number
): ShuffledQuizQuestion[] {
  return selectRandomQuestions(questionBank, questionsPerAttempt);
}

export default function QuizScreen({
  moduleName,
  questionBank,
  onComplete,
  questionsPerAttempt = 5,
  passScore = 3,
  subtitle,
  onExit,
}: QuizScreenProps) {
  const [attemptQuestions, setAttemptQuestions] = useState<ShuffledQuizQuestion[]>(() =>
    buildAttempt(questionBank, questionsPerAttempt)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswerState[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalQuestions = questionsPerAttempt;
  const currentQuestion = attemptQuestions[currentIndex];

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [currentIndex, fadeAnim]);

  const handleSelect = (answer: string) => {
    if (!currentQuestion || locked) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    const updatedAnswers = [
      ...selectedAnswers,
      {
        questionId: currentQuestion.id,
        selectedAnswer: answer,
        isCorrect,
      },
    ];

    setSelectedAnswers(updatedAnswers);
    setSelectedAnswer(answer);
    setLocked(true);
    setFeedback(isCorrect ? "correct" : "wrong");

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      if (currentIndex + 1 >= totalQuestions) {
        const finalScore = updatedAnswers.filter((item) => item.isCorrect).length;
        const quizResult = calculateQuizResult(finalScore, totalQuestions, passScore);
        setResult(quizResult);
        onComplete(quizResult);
        return;
      }

      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setLocked(false);
      setFeedback(null);
    }, 700);
  };

  const handleRestart = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setAttemptQuestions(buildAttempt(questionBank, questionsPerAttempt));
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setSelectedAnswer(null);
    setLocked(false);
    setResult(null);
    setFeedback(null);
  };

  const handleExit = () => {
    if (onExit) {
      onExit();
      return;
    }
    router.back();
  };

  if (result) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <AppHeader title={moduleName} />

        <View style={styles.resultWrap}>
          <View style={styles.resultCard}>
            <View style={styles.resultBadge}>
              <Text style={styles.resultBadgeText}>
                {result.passed ? "PASS" : "FAIL"}
              </Text>
            </View>

            <Text style={styles.resultTitle}>
              {result.passed ? "Nice work!" : "Keep going"}
            </Text>
            <Text style={styles.resultText}>
              You got {result.correctAnswers} out of {result.totalQuestions} correct.
            </Text>

            <View style={styles.resultMeta}>
              <View style={styles.resultMetaItem}>
                <Text style={styles.resultMetaLabel}>Score</Text>
                <Text style={styles.resultMetaValue}>{result.score}</Text>
              </View>
              <View style={styles.resultMetaItem}>
                <Text style={styles.resultMetaLabel}>Pass mark</Text>
                <Text style={styles.resultMetaValue}>{passScore}</Text>
              </View>
            </View>

            <View style={styles.resultActions}>
              <Pressable style={styles.primaryBtn} onPress={handleRestart}>
                <Text style={styles.primaryBtnText}>Retry Quiz</Text>
              </Pressable>
              <Pressable style={styles.secondaryBtn} onPress={handleExit}>
                <Text style={styles.secondaryBtnText}>Go Back</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <AppHeader title={moduleName} showBack={false} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroTop}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>QUIZ MODE</Text>
            </View>
            <Pressable onPress={handleExit} hitSlop={10}>
              <Text style={styles.exitText}>Exit</Text>
            </Pressable>
          </View>

          <Text style={styles.title}>{subtitle ?? "Answer 5 questions to pass."}</Text>
          <Text style={styles.subtitle}>
            You need {passScore} correct answers or more to pass this module.
          </Text>

          <QuizProgressBar current={currentIndex} total={totalQuestions} />
        </View>

        <Animated.View
          style={[
            styles.cardWrap,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [12, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {currentQuestion ? (
            <>
              <QuestionCard
                questionNumber={currentIndex + 1}
                totalQuestions={totalQuestions}
                question={currentQuestion.question}
                options={currentQuestion.options}
                selectedAnswer={selectedAnswer}
                correctAnswer={currentQuestion.correctAnswer}
                locked={locked}
                onSelect={handleSelect}
              />

              {feedback && (
                <View style={styles.feedbackCard}>
                  <Text
                    style={[
                      styles.feedbackText,
                      feedback === "correct" ? styles.feedbackCorrect : styles.feedbackWrong,
                    ]}
                  >
                    {feedback === "correct"
                      ? "Correct! Nice job."
                      : `Correct answer: ${currentQuestion.correctAnswer}`}
                  </Text>
                </View>
              )}

              <Text style={styles.helpText}>
                {locked ? "Moving to the next question..." : "Pick one answer to continue."}
              </Text>
            </>
          ) : null}
        </Animated.View>

        <View style={styles.footerNote}>
          <Text style={styles.footerText}>
            This quiz uses a random set of 5 questions from your 10-question bank.
          </Text>
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
  hero: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xxl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.primaryDark,
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  heroBadge: {
    backgroundColor: Colors.butter,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  heroBadgeText: {
    color: Colors.primary,
    fontSize: FontSize.caption,
    fontWeight: FontWeight.bold,
    letterSpacing: 1,
  },
  exitText: {
    color: Colors.butter,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.bodySmall,
  },
  title: {
    fontSize: FontSize.title2,
    lineHeight: 30,
    color: Colors.textInverse,
    fontWeight: FontWeight.black,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    color: "rgba(255,255,255,0.75)",
    fontSize: FontSize.bodySmall,
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  cardWrap: {
    gap: Spacing.md,
  },
  feedbackCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  feedbackText: {
    fontSize: FontSize.bodySmall,
    fontWeight: FontWeight.semiBold,
  },
  feedbackCorrect: {
    color: Colors.success,
  },
  feedbackWrong: {
    color: Colors.errorText,
  },
  helpText: {
    textAlign: "center",
    color: Colors.textMuted,
    fontSize: FontSize.caption,
    marginTop: Spacing.sm,
  },
  footerNote: {
    marginTop: Spacing.xl,
  },
  footerText: {
    textAlign: "center",
    color: Colors.textMuted,
    fontSize: FontSize.caption,
    lineHeight: 18,
  },
  resultWrap: {
    flex: 1,
    padding: Spacing.xl,
    justifyContent: "center",
  },
  resultCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xxl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
    ...Elevation.md,
  },
  resultBadge: {
    alignSelf: "flex-start",
    backgroundColor: Colors.butter,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  resultBadgeText: {
    color: Colors.primary,
    fontSize: FontSize.caption,
    fontWeight: FontWeight.bold,
    letterSpacing: 1,
  },
  resultTitle: {
    fontSize: FontSize.title1,
    color: Colors.textPrimary,
    fontWeight: FontWeight.black,
  },
  resultText: {
    fontSize: FontSize.body,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  resultMeta: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  resultMetaItem: {
    flex: 1,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  resultMetaLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.caption,
    fontWeight: FontWeight.semiBold,
    marginBottom: 4,
  },
  resultMetaValue: {
    color: Colors.primary,
    fontSize: FontSize.title2,
    fontWeight: FontWeight.black,
  },
  resultActions: {
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  primaryBtnText: {
    color: Colors.textInverse,
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
  },
  secondaryBtn: {
    backgroundColor: Colors.butter,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  secondaryBtnText: {
    color: Colors.primary,
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
  },
});

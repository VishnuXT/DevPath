import { QuizQuestion, QuizResult, ShuffledQuizQuestion } from "./types";

function randomIndex(maxExclusive: number) {
  return Math.floor(Math.random() * maxExclusive);
}

export function shuffleArray<T>(items: T[]): T[] {
  const output = [...items];
  for (let i = output.length - 1; i > 0; i -= 1) {
    const j = randomIndex(i + 1);
    [output[i], output[j]] = [output[j], output[i]];
  }
  return output;
}

export function selectRandomQuestions(
  questionBank: QuizQuestion[],
  count = 5
): ShuffledQuizQuestion[] {
  const selected = shuffleArray(questionBank).slice(0, count);

  return selected.map((question) => ({
    ...question,
    options: shuffleArray(question.options),
  }));
}

export function calculateQuizResult(
  correctAnswers: number,
  totalQuestions = 5,
  passScore = 3
): QuizResult {
  return {
    score: correctAnswers,
    passed: correctAnswers >= passScore,
    correctAnswers,
    totalQuestions,
  };
}

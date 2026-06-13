export interface QuizQuestion {
  id: string | number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ShuffledQuizQuestion extends Omit<QuizQuestion, "options"> {
  options: string[];
}

export interface QuizResult {
  score: number;
  passed: boolean;
  correctAnswers: number;
  totalQuestions: number;
}

export interface QuizScreenProps {
  moduleName: string;
  questionBank: QuizQuestion[];
  onComplete: (result: QuizResult) => void;
  questionsPerAttempt?: number;
  passScore?: number;
  subtitle?: string;
  onExit?: () => void;
}

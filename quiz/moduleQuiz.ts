import { CareerPath, RoadmapItem } from "../data";
import { QuizQuestion } from "./types";

/**
 * Converts a lesson's built-in quiz (Quiz type from data/types.ts) into the
 * QuizQuestion format used by the QuizScreen component.
 */
function lessonQuizToQuestion(
  id: number,
  lesson: { title: string; explanation: string; quiz: { question: string; options: string[]; answerIndex: number } },
  moduleTitle: string
): QuizQuestion {
  return {
    id,
    question: lesson.quiz.question,
    options: [...lesson.quiz.options],
    correctAnswer: lesson.quiz.options[lesson.quiz.answerIndex],
    explanation: `From the "${lesson.title}" lesson in the ${moduleTitle} module.`,
  };
}

/**
 * Collects all real quiz questions from a module's lessons.
 */
function getModuleQuestions(module: RoadmapItem): Array<{
  title: string;
  explanation: string;
  quiz: { question: string; options: string[]; answerIndex: number };
}> {
  return module.lessons.filter((l) => l.quiz != null);
}

/**
 * Builds a 10-question bank for a module quiz by:
 *   1. Using the real quiz questions from the module's own lessons first.
 *   2. Padding with questions from other modules in the same path.
 *
 * This ensures every question actually tests knowledge from the curriculum
 * rather than asking trivial structural questions about the module itself.
 */
export function buildModuleQuizBank(pathData: CareerPath, module: RoadmapItem): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  let nextId = 1;

  // ── Step 1: Add real questions from this module's lessons ──
  for (const lesson of getModuleQuestions(module)) {
    questions.push(lessonQuizToQuestion(nextId++, lesson, module.title));
  }

  // ── Step 2: Pad with questions from other modules in the path ──
  if (questions.length < 10) {
    for (const otherModule of pathData.roadmap) {
      if (otherModule.id === module.id) continue; // skip current module

      for (const lesson of getModuleQuestions(otherModule)) {
        if (questions.length >= 10) break;

        // Avoid exact duplicate questions (same question text)
        const alreadyAdded = questions.some(
          (q) => q.question === lesson.quiz.question
        );
        if (!alreadyAdded) {
          questions.push(lessonQuizToQuestion(nextId++, lesson, otherModule.title));
        }
      }

      if (questions.length >= 10) break;
    }
  }

  // ── Step 3: Final safety pad (rare edge case if path has very few lessons) ──
  while (questions.length < 5) {
    questions.push({
      id: nextId++,
      question: `What is the main topic of the "${module.title}" module?`,
      options: [
        module.title,
        ...pathData.roadmap
          .filter((m) => m.id !== module.id)
          .slice(0, 3)
          .map((m) => m.title),
      ].slice(0, 4),
      correctAnswer: module.title,
      explanation: `This module is titled "${module.title}".`,
    });
  }

  return questions.slice(0, 10);
}

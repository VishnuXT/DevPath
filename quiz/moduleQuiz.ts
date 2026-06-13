import { CareerPath, RoadmapItem } from "../data";
import { QuizQuestion } from "./types";

function unique(items: string[]) {
  return [...new Set(items.filter(Boolean))];
}

function takeDifferent(options: string[], exclude: string, count: number) {
  return unique(options.filter((item) => item !== exclude)).slice(0, count);
}

function buildOptions(correct: string, distractors: string[]): string[] {
  return unique([correct, ...distractors]).slice(0, 4);
}

function buildCountOptions(correct: number): string[] {
  const candidates = unique([
    String(correct),
    String(Math.max(0, correct - 1)),
    String(correct + 1),
    String(correct + 2),
  ]);
  while (candidates.length < 4) {
    candidates.push(String(candidates.length + 2));
  }
  return candidates.slice(0, 4);
}

function padQuestions(questions: QuizQuestion[], moduleTitle: string): QuizQuestion[] {
  const output = [...questions];
  let nextId = output.length + 1;
  while (output.length < 10) {
    output.push({
      id: nextId,
      question: `What is one focus of ${moduleTitle}?`,
      options: [
        moduleTitle,
        "A different module",
        "A database backup",
        "A design template",
      ],
      correctAnswer: moduleTitle,
      explanation: "This question reviews the module title.",
    });
    nextId += 1;
  }
  return output.slice(0, 10);
}

export function buildModuleQuizBank(pathData: CareerPath, module: RoadmapItem): QuizQuestion[] {
  const lessonTitles = module.lessons.map((lesson) => lesson.title);
  const allLessonTitles = pathData.roadmap.flatMap((item) => item.lessons.map((lesson) => lesson.title));
  const allModuleTitles = pathData.roadmap.map((item) => item.title);
  const projectTitles = pathData.roadmap.flatMap((item) => item.projects?.map((project) => project.title) ?? []);
  const correctProjectTitle = module.projects?.[0]?.title ?? "";
  const lessonCount = module.lessons.length;
  const projectCount = module.projects?.length ?? 0;

  const q1 = {
    id: 1,
    question: "What is the title of this module?",
    options: buildOptions(
      module.title,
      takeDifferent(allModuleTitles, module.title, 3)
    ),
    correctAnswer: module.title,
    explanation: "The title names the module.",
  };

  const q2 = {
    id: 2,
    question: "What does this module focus on?",
    options: buildOptions(
      module.description,
      takeDifferent(pathData.roadmap.map((item) => item.description), module.description, 3)
    ),
    correctAnswer: module.description,
    explanation: "The description explains the focus.",
  };

  const q3 = {
    id: 3,
    question: "Which lesson is part of this module?",
    options: buildOptions(
      lessonTitles[0] ?? module.title,
      takeDifferent(allLessonTitles, lessonTitles[0] ?? module.title, 3)
    ),
    correctAnswer: lessonTitles[0] ?? module.title,
    explanation: "This lesson belongs to the module.",
  };

  const q4 = {
    id: 4,
    question: "Which other lesson is part of this module?",
    options: buildOptions(
      lessonTitles[1] ?? lessonTitles[0] ?? module.title,
      takeDifferent(allLessonTitles, lessonTitles[1] ?? lessonTitles[0] ?? module.title, 3)
    ),
    correctAnswer: lessonTitles[1] ?? lessonTitles[0] ?? module.title,
    explanation: "This is another lesson in the module.",
  };

  const q5 = {
    id: 5,
    question: "How many lessons are in this module?",
    options: buildCountOptions(lessonCount),
    correctAnswer: String(lessonCount),
    explanation: "This count comes from the module lessons.",
  };

  const q6 = {
    id: 6,
    question: "How many projects are in this module?",
    options: buildCountOptions(projectCount),
    correctAnswer: String(projectCount),
    explanation: "This count comes from the module projects.",
  };

  const q7 = {
    id: 7,
    question: "Which project belongs to this module?",
    options: buildOptions(
      correctProjectTitle || module.title,
      takeDifferent(projectTitles, correctProjectTitle, 3)
    ),
    correctAnswer: correctProjectTitle || module.title,
    explanation: "The project belongs to this module.",
  };

  const q8 = {
    id: 8,
    question: "Which lesson title appears in this module?",
    options: buildOptions(
      lessonTitles[lessonTitles.length - 1] ?? module.title,
      takeDifferent(allLessonTitles, lessonTitles[lessonTitles.length - 1] ?? module.title, 3)
    ),
    correctAnswer: lessonTitles[lessonTitles.length - 1] ?? module.title,
    explanation: "This lesson is listed in the module.",
  };

  const q9 = {
    id: 9,
    question: "Which number matches the lesson count?",
    options: buildCountOptions(lessonCount),
    correctAnswer: String(lessonCount),
    explanation: "This number matches the lessons.",
  };

  const q10 = {
    id: 10,
    question: "Which title matches this module best?",
    options: buildOptions(
      module.title,
      takeDifferent(allModuleTitles, module.title, 3)
    ),
    correctAnswer: module.title,
    explanation: "The module title is the correct match.",
  };

  return padQuestions([q1, q2, q3, q4, q5, q6, q7, q8, q9, q10], module.title);
}

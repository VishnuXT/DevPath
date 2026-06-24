export interface Quiz {
  question: string;
  options: string[];
  answerIndex: number;
}

export interface CommonMistake {
  mistake: string;
  fix: string;
}

export interface Lesson {
  id: string;
  title: string;
  explanation: string;
  codeExample?: string;
  commonMistakes?: CommonMistake[];
  quiz: Quiz;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  folderStructure: string;
  guide: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  projects?: Project[];
}

export interface Technology {
  name: string;
  emoji: string;
}

export interface CareerPath {
  id: string;
  title: string;
  emoji: string;
  description: string;
  skills: string[];
  technologies: Technology[];
  learningTimeline: string;
  careerOpportunities: string[];
  roadmap: RoadmapItem[];
}

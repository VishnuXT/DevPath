import React, { createContext, useContext, useState, useEffect } from "react";
import { loadProgress, saveProgress, UserProgress } from "../storage/progress";
import { careerPaths } from "../data";
import { RoadmapItem } from "../data/types";

interface ProgressContextType {
  completedLessons: string[];
  completedProjects: string[];
  loading: boolean;
  completeLesson: (lessonId: string) => Promise<void>;
  completeProject: (projectId: string) => Promise<void>;
  isLessonCompleted: (lessonId: string) => boolean;
  isProjectCompleted: (projectId: string) => boolean;
  isTopicCompleted: (topic: RoadmapItem) => boolean;
  getCompletedCount: (pathId: string) => number;
  getPathProgress: (pathId: string) => number;
  getOverallProgress: () => number;
  resetProgress: () => Promise<void>;
  resetPathProgress: (pathId: string) => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgressState] = useState<UserProgress>({
    completedLessons: [],
    completedProjects: [],
  });
  const [loading, setLoading] = useState(true);

  const persistProgress = (updater: (current: UserProgress) => UserProgress) => {
    setProgressState((current) => {
      const updated = updater(current);
      void saveProgress(updated);
      return updated;
    });
  };

  useEffect(() => {
    async function init() {
      const stored = await loadProgress();
      setProgressState(stored);
      setLoading(false);
    }
    init();
  }, []);

  const completeLesson = async (lessonId: string) => {
    if (progress.completedLessons.includes(lessonId)) return;
    persistProgress((current) => ({
      ...current,
      completedLessons: [...current.completedLessons, lessonId],
    }));
  };

  const completeProject = async (projectId: string) => {
    if (progress.completedProjects.includes(projectId)) return;
    persistProgress((current) => ({
      ...current,
      completedProjects: [...current.completedProjects, projectId],
    }));
  };

  const isLessonCompleted = (lessonId: string) => {
    return progress.completedLessons.includes(lessonId);
  };

  const isProjectCompleted = (projectId: string) => {
    return progress.completedProjects.includes(projectId);
  };

  const isTopicCompleted = (topic: RoadmapItem) => {
    if (!topic.lessons || topic.lessons.length === 0) return false;
    const allLessons = topic.lessons.every((l) =>
      progress.completedLessons.includes(l.id)
    );
    const allProjects =
      !topic.projects ||
      topic.projects.length === 0 ||
      topic.projects.every((p) => progress.completedProjects.includes(p.id));
    return allLessons && allProjects;
  };

  const getCompletedCount = (pathId: string) => {
    const pathData = careerPaths[pathId];
    if (!pathData) return 0;
    // Count how many topics are completed in a consecutive chain from the start
    let count = 0;
    for (let i = 0; i < pathData.roadmap.length; i++) {
      if (isTopicCompleted(pathData.roadmap[i])) {
        count++;
      } else {
        break; // stop at first incomplete — sequential progression
      }
    }
    return count;
  };

  const getPathProgress = (pathId: string) => {
    const pathData = careerPaths[pathId];
    if (!pathData) return 0;
    const completedCount = getCompletedCount(pathId);
    return Math.round((completedCount / pathData.roadmap.length) * 100);
  };

  const getOverallProgress = () => {
    let totalCompleted = 0;
    let totalTopics = 0;
    Object.keys(careerPaths).forEach((pathId) => {
      totalCompleted += getCompletedCount(pathId);
      totalTopics += careerPaths[pathId].roadmap.length;
    });
    return totalTopics > 0 ? Math.round((totalCompleted / totalTopics) * 100) : 0;
  };

  const resetProgress = async () => {
    const empty = { completedLessons: [], completedProjects: [] };
    persistProgress(() => empty);
  };

  const resetPathProgress = async (pathId: string) => {
    const pathData = careerPaths[pathId];
    if (!pathData) return;
    const pathLessonIds = pathData.roadmap.flatMap((t) => t.lessons.map((l) => l.id));
    const pathProjectIds = pathData.roadmap.flatMap((t) => t.projects?.map((p) => p.id) || []);

    persistProgress((current) => ({
      completedLessons: current.completedLessons.filter((id) => !pathLessonIds.includes(id)),
      completedProjects: current.completedProjects.filter((id) => !pathProjectIds.includes(id)),
    }));
  };

  return (
    <ProgressContext.Provider
      value={{
        completedLessons: progress.completedLessons,
        completedProjects: progress.completedProjects,
        loading,
        completeLesson,
        completeProject,
        isLessonCompleted,
        isProjectCompleted,
        isTopicCompleted,
        getCompletedCount,
        getPathProgress,
        getOverallProgress,
        resetProgress,
        resetPathProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}

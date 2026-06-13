import AsyncStorage from "@react-native-async-storage/async-storage";

const PROGRESS_KEY = "devpath_user_progress";

export interface UserProgress {
  completedLessons: string[];
  completedProjects: string[];
}

export async function loadProgress(): Promise<UserProgress> {
  try {
    const data = await AsyncStorage.getItem(PROGRESS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading progress:", error);
  }
  return { completedLessons: [], completedProjects: [] };
}

export async function saveProgress(progress: UserProgress): Promise<void> {
  try {
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Error saving progress:", error);
  }
}

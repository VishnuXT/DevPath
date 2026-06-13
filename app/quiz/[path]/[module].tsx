import { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import QuizScreen from "../../../components/QuizScreen";
import { careerPaths } from "../../../data";
import { buildModuleQuizBank } from "../../../quiz/moduleQuiz";

export default function ModuleQuizRoute() {
  const { path: pathId = "web", module: moduleId = "" } = useLocalSearchParams<{
    path: string;
    module: string;
  }>();

  const pathData = careerPaths[pathId] ?? careerPaths.web;
  const moduleData = pathData.roadmap.find((item) => item.id === moduleId) ?? pathData.roadmap[0];

  const questionBank = useMemo(
    () => buildModuleQuizBank(pathData, moduleData),
    [pathData, moduleData]
  );

  return (
    <QuizScreen
      moduleName={`${pathData.title} - ${moduleData.title}`}
      subtitle={moduleData.description}
      questionBank={questionBank}
      onComplete={() => {
        // Result is shown by the reusable screen.
      }}
    />
  );
}

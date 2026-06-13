import PathDetailsScreen from "../components/PathDetailsScreen";
import { webPath } from "../data/web";
import { useProgress } from "../context/ProgressContext";

export default function WebScreen() {
  const { getPathProgress } = useProgress();
  return <PathDetailsScreen data={webPath} pathId="web" progress={getPathProgress("web")} />;
}

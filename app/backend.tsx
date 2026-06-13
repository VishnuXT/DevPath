import PathDetailsScreen from "../components/PathDetailsScreen";
import { backendPath } from "../data/backend";
import { useProgress } from "../context/ProgressContext";

export default function BackendScreen() {
  const { getPathProgress } = useProgress();
  return <PathDetailsScreen data={backendPath} pathId="backend" progress={getPathProgress("backend")} />;
}
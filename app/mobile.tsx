import PathDetailsScreen from "../components/PathDetailsScreen";
import { mobilePath } from "../data/mobile";
import { useProgress } from "../context/ProgressContext";

export default function MobileScreen() {
  const { getPathProgress } = useProgress();
  return <PathDetailsScreen data={mobilePath} pathId="mobile" progress={getPathProgress("mobile")} />;
}

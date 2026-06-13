import PathDetailsScreen from "../components/PathDetailsScreen";
import { webPath } from "../data/web";

export default function WebScreen() {
  return <PathDetailsScreen data={webPath} pathId="web" progress={0} />;
}

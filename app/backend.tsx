import PathDetailsScreen from "../components/PathDetailsScreen";
import { backendPath } from "../data/backend";

export default function BackendScreen() {
  return <PathDetailsScreen data={backendPath} pathId="backend" progress={0} />;
}
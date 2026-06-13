import PathDetailsScreen from "../components/PathDetailsScreen";
import { mobilePath } from "../data/mobile";

export default function MobileScreen() {
  return <PathDetailsScreen data={mobilePath} pathId="mobile" progress={0} />;
}

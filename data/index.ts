import { backendPath } from "./backend";
import { webPath } from "./web";
import { mobilePath } from "./mobile";
import { CareerPath } from "./types";

export const careerPaths: Record<string, CareerPath> = {
  web: webPath,
  mobile: mobilePath,
  backend: backendPath,
};

export * from "./types";

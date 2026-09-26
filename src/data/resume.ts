import { resumeData as en } from "./resume.en";
import { resumeData as pl } from "./resume.pl";
import type { ResumeData } from "./resume.types";

export type Lang = "en" | "pl";

export * from "./resume.types";

export function getResumeData(lang: Lang): ResumeData {
  return lang === "pl" ? pl : en;
}

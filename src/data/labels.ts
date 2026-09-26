import type { Lang } from "./resume";

export interface Labels {
  summary: string;
  experience: string;
  personalProjects: string;
  stack: string;
  education: string;
  certificates: string;
  languages: string;
  frameworks: string;
  selectedWork: string;
  downloadPdf: string;
  switchToEnglish: string;
  switchToPolish: string;
}

export const labels: Record<Lang, Labels> = {
  en: {
    summary: "Summary",
    experience: "Experience",
    personalProjects: "Personal Projects",
    stack: "Stack",
    education: "Education",
    certificates: "Certificates",
    languages: "Languages",
    frameworks: "Frameworks",
    selectedWork: "Selected Work",
    downloadPdf: "Download PDF",
    switchToEnglish: "Switch to English",
    switchToPolish: "Switch to Polish",
  },
  pl: {
    summary: "Podsumowanie",
    experience: "Doświadczenie",
    personalProjects: "Projekty osobiste",
    stack: "Technologie",
    education: "Wykształcenie",
    certificates: "Certyfikaty",
    languages: "Języki",
    frameworks: "Frameworki",
    selectedWork: "Wybrane projekty",
    downloadPdf: "Pobierz PDF",
    switchToEnglish: "Przełącz na angielski",
    switchToPolish: "Przełącz na polski",
  },
};

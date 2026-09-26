import type { ProjectGroup } from "../components/EntryBody.astro";

export interface Job {
  title: string;
  company: string;
  companyHref: string;
  location: string;
  startDate: string;
  endDate: string;
  achievements?: string[];
  projects?: ProjectGroup[];
  stack: string[];
}

export interface PersonalProject {
  title: string;
  href: string;
  achievements: string[];
  stack: string[];
}

export interface SkillGroup {
  caption?: string;
  items: { label: string; years?: number; href?: string }[];
  secondary?: { caption: string; items: string[] };
}

export interface EducationEntry {
  degree: string;
  institution: string;
  institutionHref: string;
  startDate: string;
  endDate: string;
}

export interface SelectedWorkItem {
  company: string;
  project: string;
  href: string;
}

export interface HeaderLink {
  label: string;
  href: string;
  icon: "email" | "linkedin" | "github" | "booking";
}

export interface ResumeData {
  name: string;
  subtitle: string;
  headerLinks: HeaderLink[];
  summary: string;
  jobs: Job[];
  personalProjects: PersonalProject[];
  sidebar: {
    certificates: SkillGroup;
    education: EducationEntry[];
    languages: SkillGroup;
    frameworks: SkillGroup;
    selectedWork: SelectedWorkItem[];
  };
}

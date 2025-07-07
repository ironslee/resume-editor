export type SectionType =
  | "experience"
  | "education"
  | "skills"
  | "certificates"
  | "about";

export type ExperienceData = {
  position: string;
  company: string;
  period: string;
  description: string;
};

export type EducationData = {
  school: string;
  degree: string;
  period: string;
};

export type SkillsData = {
  list: string;
};

export type CertificatesData = {
  title: string;
  issuer: string;
  date: string;
};

export type AboutData = {
  text: string;
};

export type SectionData =
  | ExperienceData
  | EducationData
  | SkillsData
  | CertificatesData
  | AboutData;

export interface Section {
  id: string;
  type: SectionType;
  data: SectionData;
}

export interface Header {
  name: string;
  position: string;
  email: string;
  phone: string;
  location: string;
}

type FontFamily = "serif" | "sans-serif" | "monospace";
type FontSize = "small" | "medium" | "large";

export interface ThemeSettings {
  fontFamily: FontFamily;
  fontSize: FontSize;
}

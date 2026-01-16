export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  portfolio: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  techStack: string;
  url?: string;
}

export interface Education {
  institution: string;
  program: string;
  period: string;
  details?: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experiences: WorkExperience[];
  projects: Project[];
  skills: Record<string, string[]>; // category -> skills array
  education: Education[];
  languages: Language[];
}

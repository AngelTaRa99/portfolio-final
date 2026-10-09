export interface Profile {
  name: string;
  brand: string;
  tagline: string;
  role: string;
  location: string;
  available: boolean;
  email: string;
  bio: string;
  socials: {
    github: string;
    linkedin: string;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  status: "live" | "wip" | "archived";
  url?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  period: string;
  description: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

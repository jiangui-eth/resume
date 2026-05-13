export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  /** "github" | "live" | "case-study" | "demo" */
  type: "github" | "live" | "case-study" | "demo";
}

export interface ProjectImage {
  /** Relative path under public/images/projects/ */
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  name: string;
  /** Short tagline shown on preview card */
  tagline: string;
  /** Domain / category tags, e.g. ["Web3", "DeFi"] */
  domainTags: string[];
  /** 2-3 sentence background / problem statement */
  background: string;
  /** Bullet list of technical decisions and architecture choices */
  technicalDecisions: string[];
  /** Quantifiable outcomes */
  metrics: ProjectMetric[];
  /** Cover image and optional gallery */
  images: ProjectImage[];
  /** External links */
  links: ProjectLink[];
  /** Tech stack used */
  techTags: string[];
  /** Whether to feature on the home page */
  featured: boolean;
  /** Display order (lower = higher priority) */
  order: number;
}

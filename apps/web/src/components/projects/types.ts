export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectLink {
  type: "github" | "demo" | "case-study";
  url: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

export type PanelType = "grid" | "progress" | "outcome" | "viz";

export interface ProjectBlockData {
  id: string;
  name: string;
  tagline: string;
  domainTags: string[];
  domainBadge?: string;
  icon?: string;
  panelType?: PanelType;
  metricsLabel?: string;
  quote?: string;
  background: string;
  technicalDecisions: import("./TechnicalDecisions").TechnicalDecision[];
  metrics: ProjectMetric[];
  images: ProjectImage[];
  links: ProjectLink[];
  techTags: string[];
  featured: boolean;
  order: number;
}

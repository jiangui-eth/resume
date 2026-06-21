export interface Highlight {
  value: string;
  label: string;
}

export interface Capability {
  icon: string;
  title: string;
  bullets: string[];
}

export interface ProfileStats {
  /** Number of projects shipped, e.g. 14 */
  projectsShipped: number;
  /** Average response latency highlight, e.g. "1.8s" */
  avgLatency: string;
  /** Core Web Vitals / performance score, e.g. 80 (percentage) */
  performanceScore: number;
  /** Years of professional experience */
  yearsExperience: number;
}

export interface SocialLink {
  platform: "github" | "linkedin" | "twitter" | "wechat" | "email";
  url: string;
  handle?: string;
}

export interface Profile {
  /** Full display name */
  name: string;
  /** ENS / Web3 handle */
  ens?: string;
  /** Short role headline shown in hero */
  headline: string;
  /** One-paragraph professional summary */
  summary: string;
  /** Relative path to avatar image under public/ */
  avatarUrl: string;
  /** Location string, e.g. "Shanghai, China" */
  location: string;
  /** Key metrics shown in bio/stats strip */
  stats: ProfileStats;
  /** Display-formatted key metrics for the about strip */
  highlights: Highlight[];
  /** Technical capability cards for the capability section */
  capabilities: Capability[];
  /** Social / contact links */
  socials: SocialLink[];
}

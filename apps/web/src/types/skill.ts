/** One axis of the radar chart */
export interface RadarDimension {
  /** Axis label, e.g. "Frontend" */
  label: string;
  /** Score 0-100 */
  score: number;
  /** Optional tooltip description */
  description?: string;
}

/** Individual technology within a stack category */
export interface Technology {
  name: string;
  /** Relative path to icon, or icon identifier */
  icon?: string;
  /** Proficiency level */
  level: "expert" | "proficient" | "familiar";
}

/** A grouping of related technologies */
export interface TechCategory {
  /** Category name, e.g. "Frameworks", "Engineering", "AI & Data", "Graphics" */
  category: string;
  technologies: Technology[];
}

/** A "Battle-Tested Expertise" card shown at the bottom of the skills page */
export interface BattleTestedCard {
  id: string;
  title: string;
  description: string;
  /** Icon identifier or emoji */
  icon: string;
  tags: string[];
}

export interface SkillsData {
  /** Data for the radar chart */
  radarDimensions: RadarDimension[];
  /** Tech stack categories */
  techCategories: TechCategory[];
  /** Battle-tested expertise cards */
  battleTestedCards: BattleTestedCard[];
}

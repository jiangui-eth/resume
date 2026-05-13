export interface ExperiencePeriod {
  /** ISO date string, e.g. "2021-06" */
  start: string;
  /** ISO date string or "present" */
  end: string | "present";
}

export interface Experience {
  id: string;
  company: string;
  /** Company website URL */
  companyUrl?: string;
  /** Job title / role */
  title: string;
  /** Employment type */
  type: "full-time" | "part-time" | "contract" | "internship";
  period: ExperiencePeriod;
  /** Short location string, e.g. "Shanghai · Remote" */
  location: string;
  /** 3-6 bullet points describing key responsibilities and achievements */
  responsibilities: string[];
  /** Technology tags shown on the card */
  techTags: string[];
  /** Optional: highlight metric shown prominently on the card */
  highlight?: string;
}

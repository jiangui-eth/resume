export interface ContactInfo {
  email: string;
  /** WeChat ID — keep empty string if not public */
  wechat: string;
  /** Phone number — keep empty string if not public */
  phone: string;
  github: string;
  linkedin: string;
  twitter: string;
  /** Calendar booking link, e.g. Calendly */
  calendarUrl?: string;
}

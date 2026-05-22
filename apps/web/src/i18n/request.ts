import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

// Re-export for backward compatibility with any existing imports
export const SUPPORTED_LOCALES = routing.locales;
export const DEFAULT_LOCALE: Locale = routing.defaultLocale;
export type { Locale };

import { track as vaTrack } from "@vercel/analytics/react";

export function track(
  event: string,
  props?: Record<string, string | number | boolean>,
): void {
  vaTrack(event, props);
}

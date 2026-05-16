const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatDate(ym: string): string {
  const [year, month] = ym.split("-");
  const m = parseInt(month, 10);
  return `${MONTH_NAMES[m - 1]} ${year}`;
}

export function formatPeriod(start: string, end: string): string {
  const endLabel = isPresent(end) ? "Present" : formatDate(end);
  return `${formatDate(start)} – ${endLabel}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isPresent(end: string): boolean {
  return end.toLowerCase() === "present";
}

import { cn } from "@jiangui-resume/ui/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  /** Heading element level. Defaults to h2. */
  level?: 1 | 2 | 3;
  centered?: boolean;
  /** Extra classes on the heading element, e.g. "mb-10" to override default mb-4. */
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  level = 2,
  centered = false,
  className,
}: SectionHeaderProps) {
  const Heading = `h${level}` as "h1" | "h2" | "h3";
  return (
    <div className={centered ? "text-center" : undefined}>
      <Heading
        className={cn("mb-4 text-headline-large", className)}
        style={{ color: "var(--ds-fg)" }}
      >
        {title}
      </Heading>
      {subtitle && (
        <p className="text-ds-muted text-base leading-[1.6]">{subtitle}</p>
      )}
    </div>
  );
}

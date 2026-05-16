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
        className={[
          "text-[32px] font-bold leading-[1.2] tracking-[-0.02em] text-[#e3e2e2] mb-4",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {title}
      </Heading>
      {subtitle && (
        <p className="text-base leading-[1.6] text-[#8e9192]">{subtitle}</p>
      )}
    </div>
  );
}

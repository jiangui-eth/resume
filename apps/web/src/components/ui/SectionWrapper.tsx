import { cn } from "@jiangui-resume/ui/lib/utils";

type AllowedTag = "section" | "div" | "main" | "article";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  as?: AllowedTag;
  id?: string;
  "aria-label"?: string;
}

export default function SectionWrapper({
  children,
  className,
  as: Tag = "section",
  id,
  "aria-label": ariaLabel,
}: SectionWrapperProps) {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={cn("max-w-300 mx-auto px-6", className)}
    >
      {children}
    </Tag>
  );
}

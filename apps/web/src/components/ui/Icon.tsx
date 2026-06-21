import { cn } from "@jiangui-resume/ui/lib/utils";

interface IconProps {
  name: string;
  className?: string;
  /** Renders the filled variant of the icon. */
  fill?: boolean;
}

export default function Icon({ name, className, fill }: IconProps) {
  return (
    <span
      className={cn("material-symbols-outlined", className)}
      style={fill ? { fontVariationSettings: "'FILL' 1" } : undefined}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

interface TechTagProps {
  label: string;
}

export default function TechTag({ label }: TechTagProps) {
  return (
    <span className="text-ds-accent rounded bg-white/5 px-2 py-0.5 text-xs">
      {label}
    </span>
  );
}

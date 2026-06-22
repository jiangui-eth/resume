interface MetricBadgeProps {
  value: string;
  label: string;
}

export default function MetricBadge({ value, label }: MetricBadgeProps) {
  return (
    <div className="border-ds-accent border-l-2 pl-4">
      <span className="block text-[32px] leading-none font-bold text-white">
        {value}
      </span>
      <span className="text-ds-muted text-sm font-medium tracking-wider">
        {label}
      </span>
    </div>
  );
}

interface MetricBadgeProps {
  value: string;
  label: string;
}

export default function MetricBadge({ value, label }: MetricBadgeProps) {
  return (
    <div>
      <div className="text-xl font-bold text-[#aec6ff]">{value}</div>
      <div className="mt-0.5 text-xs uppercase tracking-wider text-[#8e9192]">{label}</div>
    </div>
  );
}

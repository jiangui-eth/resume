interface MetricBadgeProps {
  value: string;
  label: string;
}

export default function MetricBadge({ value, label }: MetricBadgeProps) {
  return (
    <div className="border-l-2 border-[#aec6ff] pl-4">
      <span className="block text-[32px] leading-none font-bold text-white">
        {value}
      </span>
      <span className="text-sm font-medium tracking-wider text-[#8e9192]">
        {label}
      </span>
    </div>
  );
}

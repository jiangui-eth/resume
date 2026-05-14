interface MetricBadgeProps {
  value: string;
  label: string;
}

export default function MetricBadge({ value, label }: MetricBadgeProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
      <div className="text-lg font-semibold text-white sm:text-xl">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">{label}</div>
    </div>
  );
}

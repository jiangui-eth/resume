export interface TechnicalDecision {
  title: string;
  explanation: string;
}

interface TechnicalDecisionsProps {
  decisions: TechnicalDecision[];
}

export default function TechnicalDecisions({ decisions }: TechnicalDecisionsProps) {
  if (decisions.length === 0) return null;

  return (
    <div className="glass-card p-6 rounded-xl">
      <h3 className="text-2xl font-semibold tracking-[-0.01em] text-white mb-2">
        Technical Decisions
      </h3>
      <ul className="space-y-1 list-disc pl-4 text-[#8e9192]">
        {decisions.map((decision) => (
          <li key={decision.title}>
            <span className="text-[#aec6ff]">{decision.title}</span>{" "}
            {decision.explanation}
          </li>
        ))}
      </ul>
    </div>
  );
}

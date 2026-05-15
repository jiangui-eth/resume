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
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[#8e9192]">
        Technical Decisions
      </p>
      <div>
        {decisions.map((decision, index) => (
          <div
            key={decision.title}
            className={`py-4 ${index > 0 ? "border-t border-[#333333]/30" : ""}`}
          >
            <h3 className="text-sm font-semibold text-white">{decision.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#8e9192]">
              {decision.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

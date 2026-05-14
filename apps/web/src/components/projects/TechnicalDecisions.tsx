export interface TechnicalDecision {
  title: string;
  explanation: string;
}

interface TechnicalDecisionsProps {
  decisions: TechnicalDecision[];
}

export default function TechnicalDecisions({ decisions }: TechnicalDecisionsProps) {
  return (
    <div className="grid gap-3">
      {decisions.map((decision) => (
        <article
          key={decision.title}
          className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
        >
          <h3 className="text-sm font-semibold text-white">{decision.title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/55">{decision.explanation}</p>
        </article>
      ))}
    </div>
  );
}

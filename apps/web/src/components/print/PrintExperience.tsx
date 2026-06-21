import { PRINT_EXPERIENCE } from '@/data/print-experience'

export default function PrintExperience() {
  return (
    <section>
      <h2 className="mb-4 border-b border-gray-200 pb-1 text-base font-bold text-gray-900">
        Professional Experience
      </h2>
      <div className="space-y-5">
        {PRINT_EXPERIENCE.map(exp => (
          <div key={exp.company} className="print-entry">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-semibold text-gray-900">
                {exp.title}
              </h3>
              <span className="ml-2 shrink-0 text-[11px] text-gray-500">
                {exp.period}
              </span>
            </div>
            <p className="mb-1 text-[11px] text-blue-700">{exp.company}</p>
            <ul className="list-inside list-disc space-y-0.5">
              {exp.bullets.map(b => (
                <li key={b} className="text-[11px] leading-snug text-gray-700">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

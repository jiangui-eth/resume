import { PRINT_PROJECTS } from "@/data/print-projects";

export default function PrintProjects() {
  return (
    <section>
      <h2 className="mb-4 border-b border-gray-200 pb-1 text-base font-bold text-gray-900">
        Key Projects
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {PRINT_PROJECTS.map((proj) => (
          <div
            key={proj.name}
            className="print-entry rounded border border-gray-200 p-3"
          >
            <h3 className="mb-0.5 text-[11px] font-semibold text-gray-900">
              {proj.name}
            </h3>
            <p className="mb-1.5 text-[10px] leading-snug text-gray-600">
              {proj.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {proj.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-gray-200 px-1 py-0.5 text-[9px] text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

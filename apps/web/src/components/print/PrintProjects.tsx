import { PRINT_PROJECTS } from "@/data/print-projects";

export default function PrintProjects() {
  return (
    <section>
      <h2 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-1 mb-4">
        Key Projects
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {PRINT_PROJECTS.map((proj) => (
          <div
            key={proj.name}
            className="print-entry rounded border border-gray-200 p-3"
          >
            <h3 className="text-[11px] font-semibold text-gray-900 mb-0.5">{proj.name}</h3>
            <p className="text-[10px] text-gray-600 leading-snug mb-1.5">{proj.description}</p>
            <div className="flex flex-wrap gap-1">
              {proj.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] border border-gray-200 rounded px-1 py-0.5 text-gray-600"
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

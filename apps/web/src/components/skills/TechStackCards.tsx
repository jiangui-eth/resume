import skillsData from "@/data/skills.json";

type Tech = { name: string; level: string };
type Category = { category: string; technologies: Tech[] };

const categories: Category[] = skillsData.techCategories;

export default function TechStackCards() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="mb-10 text-2xl font-bold tracking-tight text-white/90">
        Technology Stack
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <div key={cat.category}>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-blue-400">
              {cat.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.technologies.map((tech) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 transition-colors hover:border-blue-500/40 hover:text-white/90"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import skillsData from "@/data/skills.json";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";

type Tech = { name: string; featured: boolean };
type Category = { category: string; icon: string; technologies: Tech[] };

const categories = skillsData.techCategories as Category[];

export default function TechStackCards() {
  return (
    <SectionWrapper className="pb-20">
      <SectionHeader title="技术栈" centered className="mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat.category} className="glass-card p-6 rounded-xl flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#aec6ff]">{cat.icon}</span>
              <h3 className="text-2xl font-semibold tracking-[-0.01em] text-white">
                {cat.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.technologies.map((tech) => (
                <span
                  key={tech.name}
                  className={
                    tech.featured
                      ? "font-mono text-xs px-2 py-0.5 bg-[#1f2020] rounded border border-[#aec6ff]/50 text-[#aec6ff]"
                      : "font-mono text-xs px-2 py-0.5 bg-[#1f2020] rounded border border-[#444748]/30 text-[#8e9192]"
                  }
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

import skillsData from "@/data/skills.json";

type ExpertiseCard = { id: string; title: string; icon: string; description: string };

const cards = skillsData.expertiseCards as ExpertiseCard[];

export default function ExpertiseCards() {
  return (
    <section className="max-w-300 mx-auto px-6 pb-20">
      <div className="bg-[#1b1c1c] border border-[#444748]/30 rounded-2xl p-10">
        <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.02em] text-white mb-10">
          Battle-Tested Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((card) => (
            <div key={card.id} className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#aec6ff]/10 border border-[#aec6ff]/30 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[#aec6ff]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {card.icon}
                </span>
              </div>
              <h4 className="text-2xl font-semibold tracking-[-0.01em] text-white">
                {card.title}
              </h4>
              <p className="text-base text-[#8e9192] leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

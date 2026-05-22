"use client";

import { track } from "@/lib/analytics";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";

export default function SkillsCTA() {
  return (
    <SectionWrapper className="pb-20">
      <div className="glass-card rounded-xl overflow-hidden relative min-h-75 flex items-center p-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgVG9u5X8oO_yikgePgL6n5JS4Luxeot5xhFtOuelsoqMAQ7gtLAbf7OHejdlYkwLutrtO_znns_LGW3M3UkP8mvz_KOprrTlM84cMh-itZeXiEdC-m247hM7LGc3d6TOVk7ep0uH0dDn7Oo5BL2xSSgEbZX5NEJtV-4vvS5ldFPUaz5xQh83R5FMGktbN1ABJkM3Q9ednZS666MtFtQTdDTWQn-KGLd4zol12mdOJiQz994VxTlHvY9_sWhCh0NCp9HaoSt85sQ"
          alt="Cybersecurity grid"
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        />
        <div className="relative z-10 max-w-2xl">
          <SectionHeader
            title="期待下一个架构挑战。"
            subtitle="擅长将复杂技术需求转化为高性能用户体验，无论是 3D 数据可视化还是大规模 Monorepo 迁移，每一行代码都倾注经验。"
          />
          <a
            href="mailto:jiangui.eth@gmail.com"
            onClick={() => track("click_get_in_touch", { source: "skills_cta" })}
            className="inline-flex items-center gap-2 bg-[#508eff] text-[#00275e] px-6 py-3 rounded-lg font-mono text-sm font-bold transition-all hover:shadow-[0_0_30px_rgba(80,142,255,0.4)]"
          >
            联系我
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}

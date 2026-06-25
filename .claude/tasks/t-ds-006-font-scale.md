Task: T-DS-006 字体规格替换（全局）

- 需求描述: 将 apps/web 中所有硬编码的 text-[Npx] + leading + font-* + tracking-* 组合替换为 MD3 Type Scale Token
- 分支: feature/ds-font-scale
- 开发人: Claude
- 测试状态: 通过（418/418）
- PR 链接: 待生成
- 变更文件:
    apps/web/src/components/home/HeroSection.tsx （修改：h1 text-[64px] → text-display-large，color → style）
    apps/web/src/components/home/AboutSection.tsx （修改：stat text-[32px] → text-headline-large，color → style）
    apps/web/src/components/home/CapabilitySection.tsx （修改：h3 text-[64px] → text-display-large；icon text-[28px] → text-headline-medium）
    apps/web/src/components/home/ContactSection.tsx （修改：h3 text-[32px] → text-headline-large，color → style）
    apps/web/src/components/home/ProjectsSection.tsx （修改：h4 text-[32px] → text-headline-large，color → style）
    apps/web/src/components/ui/SectionHeader.tsx （修改：heading text-[32px] → text-headline-large，color → style）
    apps/web/src/components/projects/ProjectBlock.tsx （修改：h2 text-[32px] → text-headline-large；body text-[18px] → text-body-large，color → style）
    apps/web/src/components/projects/MetricBadge.tsx （修改：value text-[32px] → text-headline-large）
    apps/web/src/components/projects/ProjectsCTA.tsx （修改：h2 text-[32px] → text-headline-large）
    apps/web/src/components/skills/SkillsHero.tsx （修改：h1 text-[64px] → text-display-large）
    apps/web/src/components/projects/panels/OutcomePanel.tsx （修改：metric text-[64px] → text-display-large）
    apps/web/src/components/projects/panels/VizPanel.tsx （修改：icon text-[60px] → text-display-large，color → style）
    apps/web/src/components/layout/LanguageSwitcher.tsx （修改：icon text-[20px] → text-xl）
- 回滚方法:
    1. git checkout dev
    2. git revert <commit-id>
- 备注: 依赖 T-DS-002（typography.css 中 --text-display-large 等已定义）；text-ds-* 颜色类与 text-* scale 类冲突时，颜色移至 style prop

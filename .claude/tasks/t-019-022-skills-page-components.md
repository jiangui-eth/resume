Task: T-019–T-022 Skills Page Components

- 需求描述: radar chart, tech stack cards, expertise cards, and bottom CTA for the /skills page
- 分支: feature/t-019-022-skills-page-components
- 开发人: Claude
- 测试状态: 待测试
- PR 链接: 待生成
- 变更文件:
    - apps/web/src/data/skills.json（新建）
    - apps/web/src/components/skills/RadarChart.tsx（新建：SVG pentagon radar, prefers-reduced-motion, noscript fallback）
    - apps/web/src/components/skills/TechStackCards.tsx（新建：4-column tech pill grid）
    - apps/web/src/components/skills/ExpertiseCards.tsx（新建：3 expertise cards with Lucide icons）
    - apps/web/src/components/skills/SkillsCTA.tsx（新建：bottom CTA with Get in Touch）
    - apps/web/src/components/skills/__tests__/RadarChart.test.tsx（新建）
    - apps/web/src/components/skills/__tests__/TechStackCards.test.tsx（新建）
    - apps/web/src/components/skills/__tests__/ExpertiseCards.test.tsx（新建）
    - apps/web/src/components/skills/__tests__/SkillsCTA.test.tsx（新建）
    - apps/web/src/app/skills/page.tsx（修改：render all components）
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: T-019 uses pure SVG (no Recharts). T-021 uses lucide-react (already installed). No new packages.

Task: V2-T-004 Skills Page Redesign

- 需求描述: Redesign /skills page to match V2 Figma — grid-pattern hero, radar chart with V2 colors and domain list, 4-col tech stack cards with glass cards and icons, 3-col expertise cards with Material Symbols, CTA with background image
- 分支: feature/v2-t-004-skills-page-redesign
- 开发人: Claude
- 测试状态: 通过
- PR 链接: 待生成
- 变更文件:
    apps/web/src/app/skills/page.tsx （修改: V2 hero with grid-pattern, Core Competencies badge, stat badges, section wiring）
    apps/web/src/components/skills/RadarChart.tsx （修改: 2-col Core Domains section, V2 colors #aec6ff stroke/fill）
    apps/web/src/components/skills/TechStackCards.tsx （修改: 4-col glass cards with Material Symbols icons and featured chips）
    apps/web/src/components/skills/ExpertiseCards.tsx （修改: 3-col grid in surface-container-low wrapper, Material Symbols icons）
    apps/web/src/components/skills/SkillsCTA.tsx （修改: glass-card with background image, glow CTA button）
    apps/web/src/data/skills.json （修改: updated techCategories with featured flags and icons, added expertiseCards array）
    apps/web/src/components/skills/__tests__/ExpertiseCards.test.tsx （修改: updated for 3-card h4 layout）
- 回滚方法:
    1. git checkout dev_v2
    2. git revert <commit-id>
- 备注: Figma reference at docs/figma/个人简历 - 技能图谱/code.html. Tab bar omitted (not present in Figma HTML). Radar chart keeps data-driven SVG from skills.json radarDimensions, updated to 5 axes matching Figma labels.

Task: V2-T-003 Projects Page Redesign

- 需求描述: Redesign /projects page to V2 — "Architecture & Implementation." heading, 12-col project blocks with screenshot+metrics left and details+decisions right, V2 CTA with electric-blue glow button.
- 分支: feature/v2-t-003-projects-page-redesign
- 开发人: Claude
- 测试状态: 未测试
- PR 链接: 待生成
- 变更文件:
    apps/web/src/app/projects/page.tsx （修改: V2 header, bg-[#121414], badge V2 colors）
    apps/web/src/components/projects/ProjectBlock.tsx （修改: 12-col grid, screenshot+metrics in left 7 cols, details+decisions in right 5 cols）
    apps/web/src/components/projects/TechnicalDecisions.tsx （修改: "Technical Decisions" label, border-t separators between items）
    apps/web/src/components/projects/MetricBadge.tsx （修改: text-[#aec6ff] value, text-[#8e9192] label）
    apps/web/src/components/projects/ProjectsCTA.tsx （修改: bg-[#508eff] button, hover:shadow glow）
    .claude/tasks/v2-t-003-projects-page-redesign.md （新建）
- 回滚方法:
    1. git checkout dev_v2
    2. git revert <commit-id>
- 备注: ProjectBlock remains "use client" for image error state. page.tsx stays RSC (no framer-motion, no use client).

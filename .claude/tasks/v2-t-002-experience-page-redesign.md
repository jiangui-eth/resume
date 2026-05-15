Task: V2-T-002 Experience Page Redesign

- 需求描述: Redesign /experience page to V2 — "Career Chronicle" heading, centered alternating timeline with gradient spine, glassmorphism job cards, and 3 bottom metric cards with left blue accent border.
- 分支: feature/v2-t-002-experience-page-redesign
- 开发人: Claude
- 测试状态: 未测试
- PR 链接: 待生成
- 变更文件:
    apps/web/src/app/experience/page.tsx （修改: V2 header layout, bg-[#121414] surface）
    apps/web/src/components/experience/Timeline.tsx （修改: centered gradient spine, alternating left/right layout）
    apps/web/src/components/experience/TimelineCard.tsx （修改: V2 glass-card, date/company panel, Material Symbols bullet icons）
    apps/web/src/components/experience/TechTag.tsx （修改: bg-white/5 text-[#aec6ff] style）
    apps/web/src/components/experience/MetricsBar.tsx （修改: 3-col grid, border-l-4 border-l-[#508eff] accent cards）
    apps/web/src/index.css （修改: add .timeline-line gradient utility）
    apps/web/src/components/experience/__tests__/TimelineCard.test.tsx （新建）
    apps/web/src/components/experience/__tests__/MetricsBar.test.tsx （修改: add border-l-4 test）
    apps/web/src/components/experience/__tests__/Timeline.test.tsx （修改: update getByText to getAllByText for V2 dual-panel DOM）
- 回滚方法:
    1. git checkout dev_v2
    2. git revert <commit-id>
- 备注: TimelineCard renders company+date in both desktop side panel and mobile card header — Timeline.test.tsx updated to use getAllByText accordingly.

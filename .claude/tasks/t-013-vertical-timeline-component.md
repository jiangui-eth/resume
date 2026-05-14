Task: T-013 Vertical Timeline Component

- 需求描述: Implement centered vertical timeline with alternating left/right experience cards (desktop), single-column mobile layout, Framer Motion scroll-triggered animations. Components: Timeline.tsx, TimelineCard.tsx, TechTag.tsx.
- 分支: feature/t-013-vertical-timeline-component
- 开发人: Codex
- 测试状态: 失败（T-013 相关 Vitest 通过；全量 `pnpm test --run` 与 `pnpm tsc --noEmit` 被现有非本任务范围错误阻塞）
- PR 链接: https://github.com/jiangui-eth/resume/pull/13
- 变更文件:
    - apps/web/src/components/experience/Timeline.tsx（新建）
    - apps/web/src/components/experience/TimelineCard.tsx（新建）
    - apps/web/src/components/experience/TechTag.tsx（新建）
    - apps/web/src/components/experience/__tests__/Timeline.test.tsx（新建）
    - apps/web/src/app/experience/page.tsx（修改：替换 timeline-placeholder）
    - apps/web/package.json（framer-motion 依赖）
    - pnpm-lock.yaml
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: T-013 depends on T-012 (experience page route). Framer Motion added as new dep.

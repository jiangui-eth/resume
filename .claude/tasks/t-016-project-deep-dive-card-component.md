Task: T-016 Project Deep Dive Card Component

- 需求描述: build deep-dive project blocks with metrics, technical decisions, optional image fallback, and conditional external links
- 分支: feature/t-016-project-deep-dive-card-component
- 开发人: Codex
- 测试状态: 失败
- PR 链接: [fill after gh pr create]
- 变更文件:
    - apps/web/src/components/projects/ProjectBlock.tsx（新建）
    - apps/web/src/components/projects/MetricBadge.tsx（新建）
    - apps/web/src/components/projects/TechnicalDecisions.tsx（新建）
    - apps/web/src/data/projects.json（修改：补齐 4 个项目数据并调整结构）
    - apps/web/src/app/projects/page.tsx（修改：从 projects.json 渲染 deep-dive 列表）
    - apps/web/src/components/projects/__tests__/ProjectBlock.test.tsx（新建）
    - apps/web/src/components/projects/__tests__/MetricBadge.test.tsx（新建）
    - apps/web/src/components/projects/__tests__/TechnicalDecisions.test.tsx（新建）
    - .claude/tasks/t-016-project-deep-dive-card-component.md（新建）
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: No new packages added. `projects.json` already existed on `main`, so this task updates it in place. Task-related tests pass: `pnpm test --run src/components/projects/__tests__/ProjectBlock.test.tsx src/app/projects/__tests__/page.test.tsx` = 10/10. Full `apps/web` suite is blocked by 6 pre-existing `src/components/layout/__tests__/Navbar.test.tsx` failures. Root `pnpm tsc --noEmit` is also blocked by existing workspace-wide TypeScript/JSX configuration issues on the current branch baseline.

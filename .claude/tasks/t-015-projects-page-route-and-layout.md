Task: T-015 Projects Page Route and Layout

- 需求描述: create /projects route with a large title, subtitle, and SEO metadata
- 分支: feature/t-015-projects-page-route-and-layout
- 开发人: Codex
- 测试状态: 失败
- PR 链接: https://github.com/jiangui-eth/resume/pull/15
- 变更文件:
    - apps/web/src/app/projects/page.tsx（新建）
    - apps/web/src/app/projects/__tests__/page.test.tsx（新建）
    - .claude/tasks/t-015-projects-page-route-and-layout.md（新建）
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: No new packages. RSC page, no framer-motion. `pnpm test --run src/app/projects/__tests__/page.test.tsx` passes (6/6). Full `pnpm test --run` is blocked by pre-existing Navbar test failures outside this task. `pnpm tsc --noEmit` is blocked by existing workspace typecheck/config issues on `origin/main`.

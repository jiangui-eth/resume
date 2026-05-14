Task: T-012 Experience Page Route and Layout

- 需求描述: Create /experience route. "Career Chronicle" large title + subtitle. generateMetadata for SEO (title, description).
- 分支: feature/t-012-experience-page-route-and-layout
- 开发人: Codex
- 测试状态: 通过（6/6 ExperiencePage 单元测试通过）
- PR 链接: 待生成
- 变更文件:
    - apps/web/src/app/experience/page.tsx（新建）
    - apps/web/src/app/experience/__tests__/page.test.tsx（新建）
    - .claude/tasks/t-012-experience-page-route-and-layout.md
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: RSC page; root layout provides Navbar+Footer. Timeline content added in T-013.

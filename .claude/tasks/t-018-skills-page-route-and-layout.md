Task: T-018 Skills Page Route and Layout

- 需求描述: create /skills route with 'Technical Proficiency' large title, intro text, and SEO meta
- 分支: feature/t-018-skills-page-route-and-layout
- 开发人: Claude
- 测试状态: 待测试
- PR 链接: 待生成
- 变更文件:
    - apps/web/src/app/skills/page.tsx（新建）
    - apps/web/src/app/skills/__tests__/page.test.tsx（新建）
    - .claude/tasks/t-018-skills-page-route-and-layout.md（新建）
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: Depends on T-005, T-006. No new packages. Pure RSC, no framer-motion.

Task: T-017 'Interested in the Technical Depth?' — Projects Page CTA

- 需求描述: bottom conversion module on /projects with title + Schedule Technical Interview + View GitHub buttons
- 分支: feature/t-017-interested-in-the-technical-depth-projects-page-cta
- 开发人: Codex / Claude
- 测试状态: 待测试
- PR 链接: 待生成
- 变更文件:
    - apps/web/src/components/projects/ProjectsCTA.tsx（新建）
    - apps/web/src/components/projects/__tests__/ProjectsCTA.test.tsx（新建）
    - apps/web/src/app/projects/page.tsx（修改：render ProjectsCTA at bottom）
    - .claude/tasks/t-017-interested-in-the-technical-depth-projects-page-cta.md（新建）
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: Depends on T-015 (/projects route). No new packages. RSC — no framer-motion, no "use client".

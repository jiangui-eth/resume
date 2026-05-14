Task: T-010 Selected Works — Project Preview Cards

- 需求描述: Homepage project showcase: section header + "See all projects" link; 3 project preview cards (large image with hover zoom + domain tags + name + tagline + tech tags + "Case Study →" link). Dark placeholder on image load failure.
- 分支: feature/t-010-selected-works-project-preview-cards
- 开发人: Claude (Codex fallback — model version mismatch prevented Codex invocation)
- 测试状态: 通过（9/9 ProjectsSection 单元测试通过）
- PR 链接: https://github.com/jiangui-eth/resume/pull/10
- 变更文件:
    - apps/web/src/components/home/ProjectsSection.tsx（新建）
    - apps/web/src/components/home/__tests__/ProjectsSection.test.tsx（新建）
    - apps/web/src/app/page.tsx（添加 ProjectsSection）
    - .claude/tasks/t-010-selected-works-project-preview-cards.md
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: Data from projects.json (featured:true, sorted by order). ProjectImage is a "use client" sub-component for onError fallback. Rest of ProjectsSection is RSC.

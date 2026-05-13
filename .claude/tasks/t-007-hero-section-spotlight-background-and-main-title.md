Task: Hero Section Spotlight Background and Main Title

- 需求描述: 为首页实现 Hero Section，增加 Spotlight 背景效果并展示主标题。
- 分支: feature/t-007-hero-section-spotlight-background-and-main-title
- 开发人: Claude
- 测试状态: 失败（`pnpm --filter web test`，现有 Navbar 测试与本次改动无关地失败）
- PR 链接: 待生成
- 变更文件:
    1. apps/web/src/app/page.tsx
    2. .claude/tasks/t-007-hero-section-spotlight-background-and-main-title.md
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: 主标题数据来自 `apps/web/src/data/profile.json`。

Task: V2-T-006 Home Page Copy Update

- 需求描述: Replace all remaining English placeholder text in the Home page components with Chinese text derived from docs/Front-end Engineer Resume.md. Also update tests that assert on the old English strings.
- 分支: feature/v2-t-006-home-copy-update
- 开发人: Codex (via Claude)
- 测试状态: 未测试
- PR 链接: 待生成
- 变更文件: 待生成
- 回滚方法:
    1. git checkout dev_v2
    2. git revert <commit-id>
- 备注: Only touches the Home page (page.tsx + its sub-components and their tests). Other pages (Experience, Projects, Skills) will be handled in separate tasks after this one is confirmed.

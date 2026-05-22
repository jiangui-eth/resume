Task: V2-T-007 Experience / Projects / Skills Pages Copy Update

- 需求描述: Replace all remaining English placeholder text in the Experience, Projects, and Skills page components with Chinese text derived from docs/Front-end Engineer Resume.md. Update corresponding unit tests. Single PR covering all three pages.
- 分支: feature/v2-t-007-copy-update-exp-proj-skills
- 开发人: Codex (via Claude)
- 测试状态: 未测试
- PR 链接: 待生成
- 变更文件: 待生成
- 回滚方法:
    1. git checkout dev_v2
    2. git revert <commit-id>
- 备注: Pre-existing test failures in ExpertiseCards.test.tsx (querySelectorAll "p") and TechStackCards.test.tsx (querySelectorAll "span") are unrelated to copy changes — leave those bugs as-is.

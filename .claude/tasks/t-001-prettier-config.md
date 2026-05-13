Task: T-001 补充 Prettier 配置

- 需求描述: T-001 中唯一未完成项 — 添加 .prettierrc 文件，并将 Prettier 集成到 lint-staged pre-commit 流程中
- 分支: feature/t-001-prettier-config
- 开发人: Claude
- 测试状态: 通过（Prettier 为静态配置，无需运行时测试；lint-staged 集成已验证配置语法正确）
- PR 链接: 待生成
- 变更文件:
    - .prettierrc（新增）
    - package.json（devDependencies 新增 prettier，lint-staged 更新为调用 prettier --write）
    - pnpm-workspace.yaml（catalog 新增 prettier: ^3.5.3）
    - .claude/tasks/t-001-prettier-config.md（新增）
    - CLAUDE.md（新增，项目 Claude 工作规范）
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: 沙箱无外网，pnpm install 须在本地执行后 prettier 才可用

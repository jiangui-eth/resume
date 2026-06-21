Task: Fix E2E — local webServer configuration

- 需求描述: `pnpm --filter web e2e` 本地运行时所有27个测试失败，报 ERR_CONNECTION_REFUSED。原因：`playwright.config.ts` 的 `webServer` 仅在 `CI=true` 时激活，本地无服务器启动，而 baseURL 指向 localhost:3000（开发服务器跑在 3001）
- 分支: feature/fix-e2e-local-webserver
- 开发人: Claude
- 测试状态: 未测试
- PR 链接: 待生成
- 变更文件:
    - apps/web/playwright.config.ts
- 回滚方法:
    1. git checkout dev_v2
    2. git revert <commit-id>
- 备注: 本地用 pnpm dev (port 3001) + reuseExistingServer: true；CI 用 pnpm build && pnpm start (port 3000)

Task: T-032 GitHub Actions — PR Check Pipeline

- 需求描述: Unified CI workflow running ESLint, Prettier, tsc, Vitest, next build, Lighthouse, Playwright, link check on every PR
- 分支: feature/t-032-github-actions-pr-check-pipeline
- 开发人: Claude
- 测试状态: 通过 (32 files, 195 tests)
- PR 链接: [#27](https://github.com/jiangui-eth/resume/pull/27)
- 变更文件:
    - .github/workflows/ci.yml（新建：consolidated PR check pipeline — 9 steps from ESLint to link check）
    - apps/web/src/__tests__/ci-workflow.test.ts（新建：Vitest content validation for ci.yml）
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: ESLint via `next lint` (no .eslintrc — Next.js default). Prettier is root devDep (run from repo root). Playwright webServer rebuilds app in CI (can't avoid without changing playwright.config.ts). Existing specialized workflows (playwright.yml, lighthouse.yml, link-check.yml) kept alongside ci.yml.

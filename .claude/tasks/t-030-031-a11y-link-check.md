Task: T-030 / T-031 — Accessibility Testing + Link Validity Check

- 需求描述: axe-core a11y checks on key pages via Playwright; link validity script for external URLs in CI
- 分支: feature/t-030-031-a11y-link-check
- 开发人: Claude
- 测试状态: 待测试
- PR 链接: 待生成
- 变更文件:
    - apps/web/tests/visual/a11y.spec.ts（新建：@axe-core/playwright WCAG 2.1 AA page scans for 4 pages）
    - apps/web/src/__tests__/a11y-data.test.ts（新建：Vitest data-level a11y checks — alt text, labels）
    - apps/web/scripts/check-links.mjs（新建：Node.js fetch script checking GitHub/LinkedIn/Twitter links + PDF）
    - .github/workflows/link-check.yml（新建：CI workflow — runs check-links.mjs on PRs to main）
    - apps/web/src/__tests__/check-links.test.ts（新建：Vitest unit tests for URL structure in data files）
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: T-030 uses @axe-core/playwright (Playwright integration tests). No jest-axe — axe-core ships no types compatible with pnpm/moduleResolution:bundler; data-level Vitest test used instead. T-031 uses Node built-in fetch.

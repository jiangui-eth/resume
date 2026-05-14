Task: T-029 Performance Testing — Lighthouse CI

- 需求描述: Integrate Lighthouse CI into GitHub Actions; score homepage + projects page; thresholds: Perf ≥ 90, LCP ≤ 2.5s, A11y ≥ 85; block PRs on failure
- 分支: feature/t-029-performance-testing-lighthouse-ci
- 开发人: Claude
- 测试状态: 待测试
- PR 链接: 待生成
- 变更文件:
    - apps/web/.lighthouserc.json（新建：LHCI thresholds config）
    - .github/workflows/lighthouse.yml（新建：GitHub Actions LHCI workflow）
    - apps/web/src/__tests__/lighthouse-config.test.ts（新建：schema validation for .lighthouserc.json）
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: @lhci/cli installed in CI via npm — not added to project devDependencies. T-028 dependency satisfied.

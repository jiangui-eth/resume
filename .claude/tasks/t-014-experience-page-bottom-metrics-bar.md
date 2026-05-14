Task: T-014 Experience Page Bottom Metrics Bar

- 需求描述: 3-item metrics bar below timeline (14x SEO Traffic Growth, 80% Build Speed Increase, 1.8s LCP Optimisation)
- 分支: feature/t-014-experience-page-bottom-metrics-bar
- 开发人: Codex
- 测试状态: 失败
- PR 链接: https://github.com/jiangui-eth/resume/pull/14
- 变更文件:
    - apps/web/src/components/experience/MetricsBar.tsx（新建）
    - apps/web/src/components/experience/__tests__/MetricsBar.test.tsx（新建）
    - apps/web/src/app/experience/page.tsx（修改：add MetricsBar below Timeline section）
    - .claude/tasks/t-014-experience-page-bottom-metrics-bar.md（新建）
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: Depends on T-013 (Timeline). RSC component, no new packages.

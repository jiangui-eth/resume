Task: T-025 Analytics and Event Tracking Integration

- 需求描述: Vercel Analytics + custom event tracking for CTAs, download links, and scroll depth
- 分支: feature/t-025-analytics-and-event-tracking-integration
- 开发人: Claude
- 测试状态: 待测试
- PR 链接: 待生成
- 变更文件:
    - apps/web/src/app/layout.tsx（修改：add Analytics and ScrollDepthTracker）
    - apps/web/src/lib/analytics.ts（新建：track() wrapper）
    - apps/web/src/components/home/ScrollDepthTracker.tsx（新建："use client" IntersectionObserver 25/50/75/100%）
    - apps/web/src/components/layout/Navbar.tsx（修改：track click_download_pdf）
    - apps/web/src/components/skills/SkillsCTA.tsx（修改："use client", track click_get_in_touch）
    - apps/web/src/components/projects/ProjectsCTA.tsx（修改："use client", track click_get_in_touch, click_social_link）
    - apps/web/src/lib/__tests__/analytics.test.ts（新建）
    - apps/web/src/components/home/__tests__/ScrollDepthTracker.test.tsx（新建）
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: Depends on T-007, T-011, T-016. New package: @vercel/analytics.

Task: T-008 Personal Bio Card — 'Precision in Every Pixel'

- 需求描述: Homepage mid-section bio module: left text intro + three quantified stats (14x SEO growth, 1.8s LCP, 80% build speed boost); right personal photo area (rounded card, dark background). Desktop two-column layout, mobile text-first single column.
- 分支: feature/t-008-personal-bio-card
- 开发人: Claude
- 测试状态: 通过（8/8 AboutSection 单元测试通过）
- PR 链接: https://github.com/jiangui-eth/resume/pull/new/feature/t-008-personal-bio-card
- 变更文件:
    - apps/web/src/components/home/AboutSection.tsx（新建）
    - apps/web/src/app/page.tsx（替换占位内容，挂载 HeroSection + AboutSection）
    - apps/web/src/components/home/HeroSection.tsx（T-007 遗留，随本分支一并提交）
    - .claude/tasks/t-008-personal-bio-card.md
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: 三项 Stats 为业务数字（14x SEO / 1.8s LCP / 80% build speed），与 HeroSection 中的 profile.json stats 不同。avatar 通过 next/image + profile.json.avatarUrl 加载。

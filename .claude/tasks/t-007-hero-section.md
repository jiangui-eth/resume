Task: T-007 Hero Section — Spotlight Background and Main Title

- 需求描述: Full-screen Hero: dark background (#0a0a0f) + center radial-gradient spotlight (blue/purple glow). Small top label, gradient title "jiangui.eth — Architecting Performance", subtitle from profile.json, stats row, CTA buttons (View Projects / Get in Touch), scroll indicator. Staggered animate-in entrance via tw-animate-css.
- 分支: feature/t-007-hero-section
- 开发人: Claude
- 测试状态: 待测试
- PR 链接: 待生成
- 变更文件:
    - apps/web/src/components/home/HeroSection.tsx（新建）
    - apps/web/src/app/page.tsx（替换占位内容）
    - .claude/tasks/t-007-hero-section.md
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: 无 Framer Motion（未安装），动画采用 tw-animate-css animate-in/fade-in/slide-in-from-bottom + Tailwind delay-*。radial-gradient spotlight 以 inline style 实现（Tailwind 4 不支持任意 radial-gradient 语法）。CTA "View Projects" 链接到 /projects，"Get in Touch" 锚点 #contact（T-011 实现后生效）。

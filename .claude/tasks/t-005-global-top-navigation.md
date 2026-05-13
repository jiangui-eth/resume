Task: T-005 Global Top Navigation Component

- 需求描述: Sticky top navbar — left logo (jiangui.eth), center nav links (Home / Experience / Projects / Skills), right "Download PDF" CTA. Active link underline via usePathname. Scroll triggers backdrop-blur frosted glass. Mobile hamburger collapses to full-width slide-down drawer.
- 分支: feature/t-005-global-top-navigation
- 开发人: Claude
- 测试状态: 通过（Vercel Preview 验证）
- PR 链接: 待生成
- 变更文件: apps/web/src/components/layout/Navbar.tsx（新建）, apps/web/src/app/layout.tsx（Header→Navbar）, .claude/tasks/t-005-global-top-navigation.md
- 回滚方法:
    1. git checkout main
    2. git revert c8e1c44
- 备注: 无 Framer Motion，动画改用 Tailwind transition + CSS transform；lucide-react 提供 Menu/X 图标。

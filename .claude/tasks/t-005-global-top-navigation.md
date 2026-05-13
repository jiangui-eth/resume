Task: T-005 Global Top Navigation Component

- 需求描述: Sticky top navbar — left logo (jiangui.eth), center nav links (Home / Experience / Projects / Skills), right "Download PDF" CTA. Active link underline via usePathname. Scroll triggers backdrop-blur frosted glass. Mobile hamburger collapses to full-width slide-down drawer.
- 分支: feature/t-005-global-top-navigation
- 开发人: Claude
- 测试状态: 单元测试已补充（Navbar.test.tsx，Vitest + Testing Library）
- PR 链接: https://github.com/jiangui-eth/jiangui-resume/pull/5（已合并）
- 变更文件:
    - apps/web/src/components/layout/Navbar.tsx（新建）
    - apps/web/src/app/layout.tsx（Header → Navbar，flex min-h-svh 布局）
    - .claude/tasks/t-005-global-top-navigation.md
- 回滚方法:
    1. git checkout main
    2. git revert 648e96d
- 备注: Route 类型从 "next" 导入，兼容 typedRoutes: true。无 Framer Motion，动画采用 Tailwind transition + CSS transform；lucide-react 提供 Menu/X/FileDown 图标。aria-current / role="dialog" 无障碍支持。

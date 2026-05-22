Task: V2-T-009 Path-Based Locale Routing

- 需求描述: 将 i18n 从 cookie 模式切换为路径模式：/ = zh-CN（默认），/en = English，/tw = Traditional Chinese；切换语言时 URL 同步更新
- 分支: feature/v2-t-009-path-routing
- 开发人: Claude
- 测试状态: 未测试
- PR 链接: 待生成
- 变更文件:
    - apps/web/src/i18n/routing.ts (新增)
    - apps/web/src/i18n/navigation.ts (新增)
    - apps/web/src/middleware.ts (新增)
    - apps/web/src/i18n/request.ts (修改 — 改用 requestLocale)
    - apps/web/src/app/layout.tsx (修改 — 精简为根布局)
    - apps/web/src/app/[locale]/layout.tsx (新增 — 含 NextIntlClientProvider)
    - apps/web/src/app/[locale]/page.tsx (新增 — 首页迁移)
    - apps/web/src/app/[locale]/experience/page.tsx (新增)
    - apps/web/src/app/[locale]/projects/page.tsx (新增)
    - apps/web/src/app/[locale]/skills/page.tsx (新增)
    - apps/web/src/hooks/useNavbar.ts (修改 — 用 @/i18n/navigation usePathname)
    - apps/web/src/components/layout/Navbar.tsx (修改 — 用 locale-aware Link)
    - apps/web/src/components/layout/LanguageSwitcher.tsx (修改 — router.replace)
    - apps/web/src/app/sitemap.ts (修改 — 增加多语言 URL)
    - 测试文件同步更新
    - 旧 app/page.tsx 等移除
- 回滚方法:
    1. git checkout dev_v2
    2. git revert <commit-id>
- 备注: localePrefix as-needed；zh-CN 无前缀；/en → en；/tw → zh-TW

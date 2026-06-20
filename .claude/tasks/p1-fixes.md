Task: p1-fixes

- 需求描述: 修复审计报告 P1 问题（3项）
- 分支: feature/p1-fixes
- 开发人: Claude
- 测试状态: 通过（288/288，tsc 零错误）
- PR 链接: 待生成
- 变更文件:
  - apps/web/src/app/api/faq-bot/route.ts（错误信息不再泄露给客户端）
  - apps/web/src/components/skills/SkillsCTA.tsx（<img> → <Image fill>）
  - apps/web/src/app/[locale]/page.tsx（+generateStaticParams）
  - apps/web/src/app/[locale]/experience/page.tsx（+generateStaticParams）
  - apps/web/src/app/[locale]/projects/page.tsx（+generateStaticParams）
  - apps/web/src/app/[locale]/skills/page.tsx（+generateStaticParams）
- 回滚方法:
  1. git checkout dev_v2
  2. git revert <commit-id>
- 备注: generateStaticParams 覆盖 3 个 locale（zh-CN、en、zh-TW），构建时预生成所有路由

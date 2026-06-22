Task: fix-i18n-homepage-skills

- 需求描述: 修复中文路由下首页、技能页、经历页的英文内容未翻译问题（Bug #2）
- 分支: feature/fix-i18n-homepage-skills
- 开发人: Claude
- 测试状态: 通过（309 tests）
- PR 链接: 待生成
- 变更文件:
    - apps/web/messages/en.json（新增 contactLabels）
    - apps/web/messages/zh-CN.json（新增 profileHighlights / capabilitiesContent / homepageProjectsContent / contactLabels / techCategoryNames / expertiseCardTitles）
    - apps/web/messages/zh-TW.json（同上，繁体中文）
    - apps/web/src/components/home/AboutSection.tsx（highlights label 本地化）
    - apps/web/src/components/home/CapabilitySection.tsx（能力卡片 title / bullets 本地化）
    - apps/web/src/components/home/ProjectsSection.tsx（精选项目 name / tagline / domainTag 本地化）
    - apps/web/src/components/home/ContactSection.tsx（联系方式标签 getTranslations("contactLabels")）
    - apps/web/src/components/experience/TimelineCard.tsx（日期改用 Intl.DateTimeFormat(locale)）
    - apps/web/src/components/skills/TechStackCards.tsx（接收可选 categories prop）
    - apps/web/src/components/skills/ExpertiseCards.tsx（接收可选 cards prop）
    - apps/web/src/app/[locale]/skills/page.tsx（async，getMessages 后传 locale 数据给子组件）
    - apps/web/src/test/next-intl-server-mock.ts（double cast 修复 TS 错误）
    - apps/web/src/components/home/__tests__/AboutSection.test.tsx（更新期望值为中文）
    - apps/web/src/components/home/__tests__/CapabilitySection.test.tsx（同上）
    - apps/web/src/components/home/__tests__/ProjectsSection.test.tsx（同上）
    - apps/web/src/components/home/__tests__/ContactSection.test.tsx（更新 aria-label 期望值）
    - apps/web/src/components/experience/__tests__/Timeline.test.tsx（日期改为 2024年3月）
    - apps/web/src/components/experience/__tests__/TimelineCard.test.tsx（日期改为 2022年1月）
    - apps/web/src/app/[locale]/skills/__tests__/page.test.tsx（async 组件测试模式）
- 回滚方法:
    1. git checkout dev
    2. git revert <commit-id>
- 备注:
    - VizPanel 的硬编码字符串 "AntV/X6 Orchestration Graph • 60fps" 暂不翻译，建议待 PR #64（fix-i18n-content-translation）合并后一并处理
    - homepageProjectsContent 与 PR #64 的 projectsContent 无冲突（不同 key）
    - ProjectsSection 页面项目内容（/projects 路由）的完整翻译由 PR #64 负责

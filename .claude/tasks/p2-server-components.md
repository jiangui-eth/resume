Task: p2-server-components

- 需求描述: P2 优化 Server Component — 将首页各 Section 从 Client Component 转为 Server Component，减少客户端 JS bundle 体积，消除不必要的 hydration
- 分支: feature/p2-server-components
- 开发人: Claude
- 测试状态: 通过（288/288 tests · tsc 0 errors）
- PR 链接: 待生成
- 变更文件:
  - apps/web/src/components/home/HeroSection.tsx（去除 "use client"，改用 async getTranslations）
  - apps/web/src/components/home/AboutSection.tsx（同上）
  - apps/web/src/components/home/CapabilitySection.tsx（同上）
  - apps/web/src/components/home/ProjectsSection.tsx（同上）
  - apps/web/src/components/home/ContactSection.tsx（同上）
  - apps/web/src/components/home/ProjectImageClient.tsx（新增，Client Component，处理 onError + useState）
  - apps/web/src/components/home/ContactCard.tsx（新增，Client Component，处理 reveal toggle useState）
  - apps/web/src/components/home/**tests**/HeroSection.test.tsx（改为 async 测试模式）
  - apps/web/src/components/home/**tests**/AboutSection.test.tsx（同上）
  - apps/web/src/components/home/**tests**/CapabilitySection.test.tsx（同上）
  - apps/web/src/components/home/**tests**/ProjectsSection.test.tsx（同上）
  - apps/web/src/components/home/**tests**/ContactSection.test.tsx（同上）
  - apps/web/src/app/[locale]/**tests**/page.test.tsx（mock 所有异步子组件）
- 回滚方法:
  1. git checkout dev_v2
  2. git revert 69cc533
- 备注: |
  Client Component 边界明确：
  - ProjectImageClient — onError 图片降级 + useState
  - ContactCard — reveal/hide toggle 交互
    两者均不使用 next-intl/server，不影响 SSR 翻译链路

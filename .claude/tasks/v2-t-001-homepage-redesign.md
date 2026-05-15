Task: V2-T-001-Homepage-Redesign

- 需求描述: Redesign the homepage (/) to match the V2 design system — grid-background hero, bento bio card with photo, 4-column capability cards with glassmorphism, alternating featured project rows, and a 3-card contact CTA section.
- 分支: feature/v2-t-001-homepage-redesign
- 开发人: Claude
- 测试状态: 未测试
- PR 链接: 待生成
- 变更文件:
  - apps/web/src/index.css
  - apps/web/src/app/layout.tsx
  - apps/web/src/components/layout/Navbar.tsx
  - apps/web/src/components/layout/Footer.tsx
  - apps/web/src/components/home/HeroSection.tsx
  - apps/web/src/components/home/AboutSection.tsx
  - apps/web/src/components/home/CapabilitySection.tsx
  - apps/web/src/components/home/ProjectsSection.tsx
  - apps/web/src/components/home/ContactSection.tsx
  - apps/web/src/components/layout/__tests__/Navbar.test.tsx
  - apps/web/src/components/home/__tests__/AboutSection.test.tsx
  - apps/web/src/components/home/__tests__/CapabilitySection.test.tsx
  - apps/web/src/components/home/__tests__/ProjectsSection.test.tsx
  - apps/web/src/components/home/__tests__/ContactSection.test.tsx
- 回滚方法:
    1. git checkout dev_v2
    2. git revert <commit-id>
- 备注: Icon library changes from Lucide React → Material Symbols Outlined. Material Symbols font added via Google Fonts link in layout.tsx head.

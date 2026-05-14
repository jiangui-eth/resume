Task: T-023 Print Resume Page

- 需求描述: /print route — A4 two-column resume layout with print media query, Print button, and Navbar Download PDF link
- 分支: feature/t-023-print-resume-page
- 开发人: Claude
- 测试状态: 待测试
- PR 链接: 待生成
- 变更文件:
    - apps/web/src/app/print/page.tsx（新建）
    - apps/web/src/components/print/PrintLayout.tsx（新建：two-column A4 layout）
    - apps/web/src/components/print/PrintButton.tsx（新建："use client", window.print()）
    - apps/web/src/components/print/PrintExperience.tsx（新建：4 experience entries）
    - apps/web/src/components/print/PrintProjects.tsx（新建：2×2 key projects grid）
    - apps/web/src/styles/print.css（新建：@page margins, @media print rules）
    - apps/web/src/app/globals.css（修改：@media print hide nav/footer/print button）
    - apps/web/public/resume.pdf（新建：placeholder PDF）
    - apps/web/src/components/layout/Navbar.tsx（修改：Download PDF link href="/resume.pdf"）
    - apps/web/src/components/print/__tests__/PrintLayout.test.tsx（新建）
    - apps/web/src/components/print/__tests__/PrintExperience.test.tsx（新建）
    - apps/web/src/components/print/__tests__/PrintProjects.test.tsx（新建）
    - apps/web/src/components/print/__tests__/PrintButton.test.tsx（新建）
    - apps/web/src/app/print/__tests__/page.test.tsx（新建）
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: T-004, T-005 are dependencies. No new packages. PrintButton is "use client"; all other print components are RSC.

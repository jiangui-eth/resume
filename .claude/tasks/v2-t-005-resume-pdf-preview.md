Task: V2-T-005 Resume PDF Preview Page

- 需求描述: 新增"Resume PDF Preview"预览页（基于 docs/resume-review-pdf.html 开发），并将导航栏"Download PDF"按钮改为在新标签页中打开该预览页，而非直接下载 PDF。
- 分支: feature/v2-t-005-resume-pdf-preview
- 开发人: Claude
- 测试状态: 通过（241/241）
- PR 链接: 待生成
- 变更文件:
    - apps/web/src/app/resume-preview/page.tsx (新增)
    - apps/web/src/app/resume-preview/layout.tsx (新增)
    - apps/web/src/app/resume-preview/resume-preview.css (新增)
    - apps/web/src/app/resume-preview/PrintButton.tsx (新增)
    - apps/web/src/app/resume-preview/__tests__/page.test.tsx (新增)
    - apps/web/src/components/layout/Navbar.tsx (修改 DownloadPdfButton)
    - apps/web/src/components/layout/__tests__/Navbar.test.tsx (更新测试)
- 回滚方法:
    1. git checkout dev_v2
    2. git revert <commit-id>
- 备注: 预览页使用独立 CSS 文件（从 docs/resume-review-pdf.html 提取），包含 A4 双页简历与打印工具栏。

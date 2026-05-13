Task: T-003 Static Asset Management and Image Optimization

- 需求描述: Manage all image assets: avatar, project images (Wind Power, Gate SEO, Chaos platform), background images, Open Graph preview image, favicon, and site logo. Establish naming conventions and directory structure under `apps/web/public/`. Configure `next.config.ts` with image format optimization (AVIF/WebP). Compress large images (target < 200KB).
- 分支: feature/t-003-static-asset-management
- 开发人: Claude
- 测试状态: 通过（构建验证）
- PR 链接: https://github.com/jiangui-eth/resume/pull/3
- 变更文件:
    - apps/web/next.config.ts（新增 images.formats + remotePatterns）
    - apps/web/public/apple-touch-icon.png（35KB）
    - apps/web/public/og-image.jpg（37KB）
    - apps/web/public/images/avatar/avatar.jpg（8KB）
    - apps/web/public/images/og/og-image.jpg（37KB）
    - apps/web/public/images/icons/logo.svg
    - apps/web/public/images/projects/wind-power.jpg（33KB）
    - apps/web/public/images/projects/gate-seo.jpg（33KB）
    - apps/web/public/images/projects/chaos-platform.jpg（36KB）
    - .claude/tasks/t-003-static-asset-management.md
- 回滚方法:
    1. git checkout main
    2. git revert 37476a3
- 备注: 项目图片（Wind Power、Gate SEO、Chaos platform）为占位图，待 Figma 导出后按相同路径/命名替换即可。commit: 37476a3。push 需在本机终端执行（sandbox 网络限制）。

Task: T-003 Static Asset Management and Image Optimization

- 需求描述: Manage all image assets: avatar, project images (Wind Power, Gate SEO, Chaos platform), background images, Open Graph preview image, favicon, and site logo. Establish naming conventions and directory structure under `apps/web/public/`. Configure `next.config.ts` with image format optimization (AVIF/WebP). Compress large images (target < 200KB).
- 分支: feature/t-003-static-asset-management
- 开发人: Claude
- 测试状态: 未测试
- PR 链接: 待生成
- 变更文件: apps/web/next.config.ts, apps/web/public/images/avatar/avatar.jpg, apps/web/public/images/projects/wind-power.jpg, apps/web/public/images/projects/gate-seo.jpg, apps/web/public/images/projects/chaos-platform.jpg, apps/web/public/images/og/og-image.jpg, apps/web/public/images/icons/logo.svg, apps/web/public/og-image.jpg, apps/web/public/apple-touch-icon.png, .claude/tasks/t-003-static-asset-management.md
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: 项目图片（Wind Power、Gate SEO、Chaos platform）暂以占位图替代，待 Figma 导出后按命名规范替换至对应目录即可。

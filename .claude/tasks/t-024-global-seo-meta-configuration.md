Task: T-024 Global SEO Meta Configuration

- 需求描述: Add OG tags, Twitter card, keywords, sitemap.ts, and robots.txt across all pages
- 分支: feature/t-024-global-seo-meta-configuration
- 开发人: Claude
- 测试状态: 待测试
- PR 链接: 待生成
- 变更文件:
    - apps/web/src/app/layout.tsx（修改：metadataBase, OG, Twitter card site-wide）
    - apps/web/src/app/page.tsx（修改：add generateMetadata with OG fields）
    - apps/web/src/app/experience/page.tsx（修改：add OG/Twitter/keywords to generateMetadata）
    - apps/web/src/app/projects/page.tsx（修改：add OG/Twitter/keywords to generateMetadata）
    - apps/web/src/app/skills/page.tsx（修改：add OG/Twitter/keywords to generateMetadata）
    - apps/web/src/app/print/page.tsx（修改：add robots noindex）
    - apps/web/src/app/sitemap.ts（新建：MetadataRoute.Sitemap for /, /experience, /projects, /skills）
    - apps/web/public/robots.txt（新建：allow all, disallow /print, reference sitemap）
    - apps/web/src/app/__tests__/sitemap.test.ts（新建）
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: T-024 depends on T-007, T-012, T-015, T-018, T-023. No new packages. Uses Next.js built-in Metadata API and MetadataRoute.Sitemap.

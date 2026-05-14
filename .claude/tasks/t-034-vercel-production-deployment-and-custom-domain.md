Task: T-034 Vercel Production Deployment and Custom Domain

- 需求描述: Production deployment from main branch with security headers, HSTS, and documented production env vars; custom domain binding via Vercel dashboard
- 分支: feature/t-034-vercel-production-deployment-and-custom-domain
- 开发人: Claude
- 测试状态: 待测试
- PR 链接: 待生成
- 变更文件:
    - apps/web/vercel.json（修改：add production security headers — HSTS, X-Frame-Options, CSP, Referrer-Policy, Permissions-Policy）
    - apps/web/.env.example（修改：add NEXT_PUBLIC_VERCEL_URL note for preview deployments）
    - apps/web/src/__tests__/vercel-config.test.ts（修改：add assertions for security headers presence）
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: Custom domain DNS binding and Vercel Analytics activation are dashboard operations (no code). HSTS preload requires domain to be submitted to hstspreload.org after DNS is configured.

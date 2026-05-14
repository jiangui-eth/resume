Task: T-033 Vercel Project Configuration and Preview Deployment

- 需求描述: vercel.json for monorepo build config; .env.example documenting NEXT_PUBLIC_ENV and other vars; each PR auto-generates a Vercel Preview URL
- 分支: feature/t-033-vercel-project-configuration-and-preview-deployment
- 开发人: Claude
- 测试状态: 通过 (33 files, 200 tests)
- PR 链接: [#28](https://github.com/jiangui-eth/resume/pull/28)
- 变更文件:
    - apps/web/vercel.json（新建：Vercel project config — framework nextjs, monorepo install cmd, build cmd, output dir）
    - apps/web/.env.example（新建：documents NEXT_PUBLIC_ENV, NEXT_PUBLIC_SITE_URL, CORS_ORIGIN）
    - apps/web/src/__tests__/vercel-config.test.ts（新建：Vitest schema validation for vercel.json）
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: Root Directory must be set to "apps/web" in Vercel dashboard. installCommand runs from monorepo root ("cd ../.. && pnpm install --frozen-lockfile") to resolve workspace packages. NEXT_PUBLIC_ENV=preview must be set in Vercel dashboard under Preview environment.

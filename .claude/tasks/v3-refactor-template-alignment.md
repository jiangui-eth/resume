Task: v3-refactor-template-alignment

- 需求描述: 基于 https://github.com/jiangui-eth/front-end-template 重构简历项目，对齐工具链、迁移 Cloudflare Workers、引入 Sentry、Storybook 10、.claude 文档体系
- 分支: dev_v3
- 开发人: Claude
- 测试状态: 未测试
- PR 链接: 待生成
- 变更文件: 待生成
- 回滚方法:
  1. git checkout dev_v2
  2. git revert <commit-id>
- 备注:
  - 部署平台: Vercel → Cloudflare Workers (opennextjs-cloudflare)
  - FAQ Bot: 保留 Supabase pgvector，移除 runtime="nodejs" 声明，添加 nodejs_compat CF flag
  - Drizzle DB 迁移、Better Auth、R2 文件上传留作后续独立 Task

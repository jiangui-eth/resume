Task: faq-bot-rate-limit-zod

- 需求描述: 修复 P0 安全问题 — 给 /api/faq-bot 添加 IP 限流（10次/分钟）和 Zod 请求体校验
- 分支: feature/faq-bot-rate-limit-zod
- 开发人: Claude
- 测试状态: 未测试
- PR 链接: 待生成
- 变更文件:
    - apps/web/src/app/api/faq-bot/route.ts
    - apps/web/src/app/api/faq-bot/__tests__/route.test.ts（新建）
- 回滚方法:
    1. git checkout dev_v2
    2. git revert <commit-id>
- 备注: 使用模块级 Map 实现固定窗口限流（适合 Cloudflare Workers isolate 场景），Zod 已在项目 catalog 中

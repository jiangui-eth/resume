# ADR 001 — 技术栈选型

**日期**：2026-06-20
**状态**：已采纳（dev_v3 重构，对齐 front-end-template）

## 背景

简历项目 v2 使用 Vercel 部署，随着 front-end-template 模板成型，决定对齐其技术栈以统一开发体验与工具链。

## 决策

| 关注点    | 选型                                        | 理由                                        |
| --------- | ------------------------------------------- | ------------------------------------------- |
| 全栈框架  | Next.js 16 App Router                       | React 19 + Server Components 减少客户端 JS  |
| API 层    | tRPC 11                                     | 端到端类型安全，无需手写 API schema         |
| 状态/缓存 | TanStack Query 5                            | 与 tRPC 官方集成，服务端状态管理成熟        |
| 样式      | Tailwind CSS v4                             | 实用优先，v4 性能更好                       |
| 组件      | shadcn/ui（Base UI 基础）                   | 可复制修改的组件，非黑箱依赖                |
| 运行时    | Cloudflare Workers（opennextjs-cloudflare） | 边缘部署，全球低延迟                        |
| IaC       | Alchemy                                     | 专为 Cloudflare 设计，替代 Terraform/Vercel |
| Monorepo  | pnpm + Turborepo                            | 构建缓存、依赖共享                          |
| Linting   | @antfu/eslint-config（ESLint 10）           | 比 next lint 更严格，统一代码风格           |
| 提交规范  | Commitlint（Conventional Commits）          | 结构化 commit，便于 changelog 自动化        |
| 错误监控  | Sentry @sentry/nextjs v10                   | 生产错误追踪                                |
| 组件文档  | Storybook 10（react-vite）                  | 组件隔离开发与 a11y 审计                    |

## 后果

- **保留 Supabase pgvector**：FAQ Bot RAG 管道继续使用 Supabase（HTTP-based，CF Workers 兼容），Cloudflare Vectorize 迁移留作后续 Task
- **nodejs_compat**：CF Workers 启用 nodejs_compat 以支持 OpenAI / Cohere / Supabase SDK
- **不引入**：Better Auth（简历无需认证）、Drizzle D1（Supabase 已满足需求）、R2（无文件上传需求）

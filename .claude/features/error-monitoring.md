# Feature: 错误监控（Sentry）

**状态**：已实现（v3 引入）

## 配置文件

| 文件                                     | 说明                                                 |
| ---------------------------------------- | ---------------------------------------------------- |
| `apps/web/sentry.server.config.ts`       | 服务端 Sentry 初始化                                 |
| `apps/web/src/instrumentation.ts`        | Next.js instrumentation hook，条件导入 server config |
| `apps/web/src/instrumentation-client.ts` | 客户端 Sentry 初始化                                 |
| `apps/web/src/app/global-error.tsx`      | 全局错误边界，自动上报 Sentry                        |

## 环境变量

| 变量                     | 说明                   |
| ------------------------ | ---------------------- |
| `NEXT_PUBLIC_SENTRY_DSN` | DSN（有值才启用）      |
| `SENTRY_ORG`             | 构建时 source map 上传 |
| `SENTRY_PROJECT`         | 构建时 source map 上传 |
| `SENTRY_AUTH_TOKEN`      | 构建时 source map 上传 |

## next.config.ts 集成

`withSentryConfig` 包裹 `withNextIntl(nextConfig)`，启用 source map 上传和 client file upload。

## 注意

- 无 `NEXT_PUBLIC_SENTRY_DSN` 时自动 no-op，不影响开发体验
- tRPC onError 只上报 `INTERNAL_SERVER_ERROR` 以减少噪音

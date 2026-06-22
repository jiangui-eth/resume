# Feature: E2E 测试（Playwright）

**状态**：已实现

## 配置

- 配置文件：`apps/web/playwright.config.ts`
- 测试目录：`apps/web/tests/visual/`
- 三个设备：Desktop (1440×900)、Tablet (iPad Mini)、Mobile (iPhone SE)

## 运行

```bash
pnpm --filter web e2e          # 所有 E2E 测试
pnpm --filter web e2e:ui       # Playwright UI 模式
```

## 测试覆盖

| 文件                            | 内容               |
| ------------------------------- | ------------------ |
| `tests/visual/homepage.spec.ts` | 首页渲染           |
| `tests/visual/a11y.spec.ts`     | 无障碍（axe-core） |

## CI

E2E 在 `.github/workflows/ci.yml` 的 `e2e` job 中运行，构建后启动 dev server 测试。

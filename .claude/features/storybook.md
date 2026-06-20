# Feature: Storybook 10 组件文档

**状态**：已实现（v3 引入）

## 配置

- 应用位置：`apps/storybook/`
- 框架：`@storybook/react-vite`（Vite 7 + Tailwind CSS v4）
- 端口：`:6006`

## 运行

```bash
pnpm storybook           # 启动（:6006）
pnpm --filter storybook-app build-storybook   # 构建静态站
```

## 组件覆盖（packages/ui）

| Story                  | 组件                                                      |
| ---------------------- | --------------------------------------------------------- |
| `Button.stories.tsx`   | Button（6 variants + disabled）                           |
| `Card.stories.tsx`     | Card + CardHeader/Title/Description/Action/Content/Footer |
| `Input.stories.tsx`    | Input（default/disabled/with-value）                      |
| `Skeleton.stories.tsx` | Skeleton（inline / card placeholder）                     |

## 约定

- Story 文件放在 `apps/storybook/src/stories/`
- 组件从 `@jiangui-resume/ui/components/*` 导入
- CSS 由 `@jiangui-resume/ui/globals.css` 通过 preview.tsx 加载
- a11y addon 自动运行无障碍检查

## 扩展

新增 packages/ui 组件时，在 `apps/storybook/src/stories/` 对应新增 story 文件。

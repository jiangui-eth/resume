Task: T-DS-005 Storybook 组件文档

- 需求描述: 为 6 个 DS 基础组件及所有 Token 编写 Storybook 交互文档，并配置 Light/Dark 主题切换
- 分支: feature/ds-storybook-docs
- 开发人: Claude
- 测试状态: 待测试
- PR 链接: 待生成
- 变更文件:
    apps/storybook/.storybook/preview.tsx （修改：添加 addon-themes Light/Dark 配置）
    apps/storybook/src/stories/DSButton.stories.tsx （新建）
    apps/storybook/src/stories/DSInput.stories.tsx （新建）
    apps/storybook/src/stories/DSCard.stories.tsx （新建）
    apps/storybook/src/stories/DSChip.stories.tsx （新建）
    apps/storybook/src/stories/DSDialog.stories.tsx （新建）
    apps/storybook/src/stories/DSSnackbar.stories.tsx （新建）
    apps/storybook/src/stories/tokens/ColorTokens.stories.tsx （新建）
    apps/storybook/src/stories/tokens/TypeScale.stories.tsx （新建）
    apps/storybook/src/stories/tokens/ShapeScale.stories.tsx （新建）
    apps/storybook/src/stories/tokens/Elevation.stories.tsx （新建）
    apps/storybook/src/stories/tokens/MotionTokens.stories.tsx （新建）
    apps/web/src/lib/__tests__/ds-storybook-stories.test.ts （新建）
- 回滚方法:
    1. git checkout dev
    2. git revert <commit-id>
- 备注: 依赖 T-DS-004。Storybook 已在 apps/storybook/ 配置，使用 react-vite 框架。

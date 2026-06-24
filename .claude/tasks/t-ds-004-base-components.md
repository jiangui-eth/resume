Task: T-DS-004 Base Component Library

- 需求描述: 基于 DS Token 体系实现 6 个 MD3 规范基础组件：Button、Input、Card、Chip、Dialog、Snackbar
- 分支: feature/ds-base-components
- 开发人: Claude
- 测试状态: 待测试
- PR 链接: 待生成
- 变更文件:
    packages/ui/src/components/Button/Button.tsx （新建）
    packages/ui/src/components/Input/Input.tsx （新建）
    packages/ui/src/components/Card/Card.tsx （新建）
    packages/ui/src/components/Chip/Chip.tsx （新建）
    packages/ui/src/components/Dialog/Dialog.tsx （新建）
    packages/ui/src/components/Snackbar/Snackbar.tsx （新建）
    packages/ui/src/index.ts （新建：barrel 导出全部 6 个组件）
    apps/web/src/components/ds/__tests__/Button.test.tsx （新建）
    apps/web/src/components/ds/__tests__/Input.test.tsx （新建）
    apps/web/src/components/ds/__tests__/Card.test.tsx （新建）
    apps/web/src/components/ds/__tests__/Chip.test.tsx （新建）
    apps/web/src/components/ds/__tests__/Dialog.test.tsx （新建）
    apps/web/src/components/ds/__tests__/Snackbar.test.tsx （新建）
- 回滚方法:
    1. git checkout dev
    2. git revert <commit-id>
- 备注: 依赖 T-DS-001/002/003。组件纯 CSS，无 framer-motion（packages/ui 未安装）。测试在 apps/web 中运行。

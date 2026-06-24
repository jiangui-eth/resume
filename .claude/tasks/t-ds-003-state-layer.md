Task: T-DS-003 State Layer System

- 需求描述: 实现 MD3 交互状态层 CSS utility（hover/focus/active/disabled），纯 CSS 伪元素方案
- 分支: feature/ds-state-layer
- 开发人: Claude
- 测试状态: 通过（17/17）
- PR 链接: https://github.com/jiangui-eth/resume/pull/70
- 变更文件:
    packages/ui/src/tokens/state.css （新建）
    packages/ui/src/tokens/index.css （修改：追加 @import "./state.css"）
    apps/web/src/lib/__tests__/ds-state-layer-tokens.test.ts （新建）
- 回滚方法:
    1. git checkout dev
    2. git revert <commit-id>
- 备注: 依赖 T-DS-001（颜色系统）和 T-DS-002（motion token --ds-duration-short-2, --ds-easing-standard）

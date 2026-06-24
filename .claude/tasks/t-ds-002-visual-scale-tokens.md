Task: T-DS-002 Visual Scale Tokens

- 需求描述: 定义所有比例型 Design Token：字体、形状、海拔、动效四类固定值 CSS vars
- 分支: feature/ds-visual-scale-tokens
- 开发人: Claude
- 测试状态: 通过（18/18）
- PR 链接: 待生成
- 变更文件:
    packages/ui/src/tokens/typography.css （新建）
    packages/ui/src/tokens/shape.css （新建）
    packages/ui/src/tokens/elevation.css （新建）
    packages/ui/src/tokens/motion.css （新建）
    packages/ui/src/tokens/index.css （修改：追加四个新文件的 @import）
    apps/web/src/lib/__tests__/ds-visual-scale-tokens.test.ts （新建）
- 回滚方法:
    1. git checkout dev
    2. git revert <commit-id>
- 备注: 依赖 T-DS-001（颜色系统），shape-full 使用 9999px 而非 50%，emphasized easing 需 JS 实现

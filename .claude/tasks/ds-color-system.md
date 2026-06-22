Task: ds-color-system

- 需求描述: 实现 MD3 Color System（源色 #6750A4 M3 Baseline）— 78 个 Reference Token + 36 个 System Role Token（Light/Dark 双主题）+ Tailwind 工具类注册 + Theme 工具函数
- 分支: feature/ds-color-system
- 开发人: Claude
- 测试状态: 通过（9 tests）
- PR 链接: 待生成
- 变更文件:
    - packages/ui/src/tokens/colors-reference.css — 78 个 MD3 调色板原子色（6 族 × 13 Tone）
    - packages/ui/src/tokens/colors-light.css — 36 个系统语义角色（Light :root）
    - packages/ui/src/tokens/colors-dark.css — 36 个系统语义角色（Dark .dark）
    - packages/ui/src/tokens/index.css — 3 个文件的入口 @import
    - packages/ui/src/styles/globals.css — 追加 @import tokens/index.css + @theme inline 注册 36 个 --color-ds-* Tailwind 工具类
    - packages/ui/src/utils/theme.ts — getSystemTheme() 工具函数 + useTheme re-export
    - packages/ui/package.json — 新增 ./tokens/index.css 和 ./utils/* 导出
    - apps/web/src/lib/__tests__/ds-color-tokens.test.ts — 9 个 Token 可用性测试
- 回滚方法:
    1. git checkout dev
    2. git revert <commit-id>
- 备注:
    - 参考调色板值来自 Material Theme Builder 官方输出（source: #6750A4）
    - 与 shadcn Token 完全隔离：DS 用 --ds-ref-*/--ds-color-* 命名空间，Tailwind 工具类前缀 ds-*（bg-ds-primary 等）
    - 主题切换通过 next-themes（.dark class）— 与现有 providers.tsx 配置一致，无需额外 JS 逻辑
    - 存量 --ds-bg/--ds-accent 等旧 Token 保留在 apps/web/src/index.css，待 T-DS-004 组件重构时迁移

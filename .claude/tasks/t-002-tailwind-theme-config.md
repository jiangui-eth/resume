Task: T-002 Tailwind CSS 主题配置（暗色设计系统）

- 需求描述: 配置 Tailwind CSS v4 + shadcn/ui 设计系统，CSS 自定义属性使用 OKLCH 色彩空间，暗色主题默认开启，next-themes 管理主题切换
- 分支: feature/t-002-tailwind-theme-config
- 开发人: Claude
- 测试状态: 通过（静态配置变更，TypeScript 编译通过，无运行时测试需要）
- PR 链接: 待生成
- 变更文件:
    - apps/web/src/components/providers.tsx（defaultTheme 从 "system" 改为 "dark"）
    - .claude/tasks/t-002-tailwind-theme-config.md（新增）
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: 其余子任务（globals.css、@custom-variant dark、@theme inline、layout.tsx 字体加载）已在 main 分支完成；本次仅补充最后一项 — 暗色主题默认值

Task: T-009 Technical Arsenal — Capability Cards

- 需求描述: 4 capability cards (Next.js/React, Performance, AI & RAG, Engineering). Each card: Lucide icon + title + bullet list. Dark bg + thin border + hover glow. Desktop 4-col, tablet 2-col, mobile 1-col.
- 分支: feature/t-009-capability-cards
- 开发人: Claude
- 测试状态: 通过（6/6 CapabilitySection 单元测试通过）
- PR 链接: 待生成
- 变更文件:
    - apps/web/src/components/home/CapabilitySection.tsx（新建）
    - apps/web/src/components/home/__tests__/CapabilitySection.test.tsx（新建）
    - apps/web/src/app/page.tsx（添加 CapabilitySection）
    - .claude/tasks/t-009-capability-cards.md
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: 卡片数据定义为组件常量（不依赖外部 JSON），Lucide 图标 LucideIcon 类型。Hover glow 用 group-hover + shadow/border color transition 实现。

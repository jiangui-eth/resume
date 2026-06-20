Task: p2-file-split

- 需求描述: P2 大文件拆分 — resume-preview/page.tsx (507行) 与 ProjectBlock.tsx (293行) 超出单文件维护阈值，影响可读性与 CR 效率
- 分支: feature/p2-file-split
- 开发人: Claude
- 测试状态: 通过（288/288 tests · tsc 0 errors）
- PR 链接: 待生成
- 变更文件:
  - apps/web/src/app/resume-preview/page.tsx（507 → 37 行）
  - apps/web/src/app/resume-preview/ResumePage1.tsx（新增，216 行）
  - apps/web/src/app/resume-preview/ResumePage2.tsx（新增，222 行）
  - apps/web/src/components/projects/ProjectBlock.tsx（293 → 109 行）
  - apps/web/src/components/projects/types.ts（新增，36 行）
  - apps/web/src/components/projects/panels/GridPanel.tsx（新增，56 行）
  - apps/web/src/components/projects/panels/ProgressPanel.tsx（新增，43 行）
  - apps/web/src/components/projects/panels/OutcomePanel.tsx（新增，44 行）
  - apps/web/src/components/projects/panels/VizPanel.tsx（新增，44 行）
- 回滚方法:
  1. git checkout dev_v2
  2. git revert 3467fd3
- 备注: ProjectBlock.tsx 保留类型 re-export，保证现有导入方不需改动

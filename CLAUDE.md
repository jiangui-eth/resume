# Claude 工作规范

> 本文件定义了 Claude 在此项目中的行动准则。**每次接收到新需求，必须严格按照以下规范执行。**

---

## 项目结构速查

- Web 应用：`apps/web/`（Next.js 15 App Router）
- 共享包：`packages/ui/`、`packages/api/`、`packages/env/`、`packages/config/`
- Task 文档：`.claude/tasks/<task-name>.md`
- 任务列表参考：`docs/task/`

---

## 接收需求后的完整行动流程

### 1. 需求分析

- 理解需求内容和目标
- 确认涉及的技术栈和模块
- 将需求拆分成一个或多个独立 Task，每个 Task 负责一个具体功能点
- 评估优先级和复杂度

### 2. 创建 Task 分支 + Task 文档（必须同步）

**分支命名：** `feature/<task-name>`（task-name 用短横线连接）

**Task 文档**存放于 `.claude/tasks/<task-name>.md`，格式如下：

```
Task: <任务名称>

- 需求描述: <需求文本>
- 分支: feature/<task-name>
- 开发人: Claude
- 测试状态: 未测试
- PR 链接: 待生成
- 变更文件: 待生成
- 回滚方法:
    1. git checkout dev_v2
    2. git revert <commit-id>
- 备注: <特殊说明>
```

### 3. 开发

- 只在 Task 分支上写代码，只修改与需求相关的模块
- 遵循现有代码风格和模板
- 生成对应单元测试（Vitest / Jest / Playwright）
- 记录所有修改的文件路径，更新 Task 文档 `变更文件` 字段
- Commit 消息格式：`feat(Task): <任务名称> - <简短描述>`
- Push 到远程 Task 分支

### 4. 测试

- 自动运行所有单元/集成测试
- 测试失败 → 更新 Task 文档 `测试状态: 失败`，标注失败用例
- 测试通过 → 更新 Task 文档 `测试状态: 通过`

### 5. 创建 PR

- source：Task 分支 → target：**`dev_v2`**
- PR title：`Task: <任务名称> - 自动 PR`
- PR body：**严格按照 `.github/pull_request_template.md` 格式填写**，各节说明如下：
  - **Description**：一句话说明本 PR 的改动内容和原因
  - **Task**：填写 Task ID（如 V2-T-001）和 Task 文档路径 `.claude/tasks/<slug>.md`
  - **Change type**：勾选 Feature / Bug fix / Refactor / Docs / Test
  - **Self-check**：逐项核查并勾选（lint、tsc、build、test、responsive、images、no hardcoded data、no console.log）
  - **Preview URL**：CI 部署后填写 Vercel 预览链接
  - **Screenshots / recordings**：UI 变更需提供前后对比截图
  - **Code Review checklist**：留给 reviewer，不需要 Claude 勾选
- PR 创建后更新 Task 文档 `PR 链接` 字段

### 6. 部署

- PR 合并后触发部署，自动生成预览环境
- 部署成功 → 更新 Task 文档，记录部署状态和 URL
- 部署失败 → 标记 `部署失败`，提供 rollback 方法

### 7. 回滚（如需）

```bash
git checkout dev_v2
git revert <Task Commit ID>
```

更新 Task 文档，记录 rollback 时间和原因。

---

## 注意事项

- **不要修改与当前需求无关的模块代码**，除非必须
- 所有 commit、PR、Task 文档必须同步更新，保持一致
- 每个 Task 完成都必须生成单元测试
- 每个 Task 完成都必须生成文档，便于 CR 和自动化部署审计

---

## Testing Conventions

- **Unit tests:** Co-located in `__tests__/` next to the source file.
  - Components: `src/components/<area>/__tests__/<ComponentName>.test.tsx`
  - Hooks: `src/hooks/__tests__/<hookName>.test.ts`
  - Utilities: `src/lib/__tests__/<file>.test.ts`
  - Pages: `src/app/<route>/__tests__/page.test.tsx`
- **E2E / visual tests:** `tests/visual/` (Playwright)
- **Required mocks for every test file:**
  - Always mock `next/image`, `next/link`, `next/navigation` as needed
  - Always mock `framer-motion` for animated components (see `Timeline.test.tsx` for the pattern)
  - Always mock `@/lib/analytics` to prevent real event firing
- **No snapshot tests.** Use specific role/text assertions (`getByRole`, `getByText`).
- **Real JSON data.** Import directly from `@/data/*.json` — do not duplicate fixture data in test files.
- **Client components** (`"use client"`) that use browser APIs (IntersectionObserver, `window.scrollY`) require additional global mocks in the test file.
- **Test runner:** Vitest 3.x (API-compatible with Jest — `vi.mock` replaces `jest.mock`).

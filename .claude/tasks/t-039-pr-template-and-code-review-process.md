Task: T-039 PR Template and Code Review Process

- 需求描述: GitHub PR template with task ID, change type, self-check list, Preview URL, screenshots; Code Review checklist embedded
- 分支: feature/t-039-pr-template-and-code-review-process
- 开发人: Claude
- 测试状态: 待测试
- PR 链接: 待生成
- 变更文件:
    - .github/pull_request_template.md（新建：PR template with change description, task ID, type, self-check, CR checklist, Preview URL, screenshots）
    - apps/web/src/__tests__/pr-template.test.ts（新建：Vitest content validation for template sections）
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: Branch protection rules (require PR + CI pass before merge) must be configured in GitHub Settings → Branches → main → Branch protection rules. Cannot be done via code.

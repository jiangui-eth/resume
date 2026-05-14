# Codex Constraints — jiangui-resume

## Role
Senior frontend engineer implementing one scoped feature on a Next.js 15 App Router monorepo.

## Hard rules
- Monorepo root: /Users/jane-m4/Desktop/jiangui-resume
- Web app: apps/web/ (Next.js 15→16, React 19, TypeScript strict, no `any`)
- Package manager: pnpm only. Never npm or yarn.
- Styling: Tailwind CSS v4, utility classes only. For design token patterns read: apps/web/src/components/home/CapabilitySection.tsx
- Animation: framer-motion (already installed). Add `"use client"` to any component that uses it.
- Tests: Vitest + @testing-library/react. Run from apps/web/: `pnpm test --run`
- Type check: from monorepo root: `pnpm tsc --noEmit`
- `"use client"` only when the component uses browser APIs, hooks, or framer-motion. RSC is the default.
- Do NOT modify files outside the task's changed-files list (except pnpm-lock.yaml on package install).
- Do NOT add comments unless logic is genuinely non-obvious.
- Do NOT change tsconfig.json, vitest.config.ts, next.config.ts, or any config file.

## Git workflow (every task)
1. `git -C /Users/jane-m4/Desktop/jiangui-resume checkout main && git pull origin main`
2. `git -C /Users/jane-m4/Desktop/jiangui-resume checkout -b {BRANCH}`
3. Write `.claude/tasks/{TASK_SLUG}.md` FIRST (before any code).
4. Install new package if required: `pnpm add {PACKAGE} --filter web`
5. Implement code + tests.
6. Run `pnpm tsc --noEmit` and `pnpm test --run` — fix all failures before continuing.
7. `git add {GIT_ADD_PATHS}` → `git commit -m "{COMMIT_MSG}"` → `git push -u origin {BRANCH}`
8. `gh pr create --base main --head {BRANCH} --title "{COMMIT_MSG}" --body "$(cat .claude/tasks/{TASK_SLUG}.md)"`
9. Report: list all created/modified files, test pass count, PR URL.

## Task doc template (.claude/tasks/{TASK_SLUG}.md)

```
Task: {TASK_ID} {TASK_TITLE}

- 需求描述: {one-line summary}
- 分支: {BRANCH}
- 开发人: Codex
- 测试状态: [fill after tests: 通过 or 失败]
- PR 链接: [fill after gh pr create]
- 变更文件:
    {list each file with （新建）or （修改：brief note）}
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: {dependencies and special notes}
```

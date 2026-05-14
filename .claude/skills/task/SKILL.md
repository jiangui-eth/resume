---
name: task
description: >
  Triggered by "/task T-NNN" or "Task: T-NNN".
  Reads the task spec, generates a lean Codex prompt, invokes Codex via MCP,
  then runs a lean post-PR review (automated checks first, file reads only on failure).
allowed-tools: Read, Bash(find *), Bash(cat *), Bash(git *), Bash(pnpm test *), Bash(pnpm tsc *), Bash(gh pr *), mcp__codex__codex
---

# /task Skill

## Step 1 — Read the spec (1 file only)

Resolve and read the task spec:
```bash
find /Users/jane-m4/Desktop/jiangui-resume/docs/task -name "T-NNN-*"
```
Replace `T-NNN` with the actual task ID from the user's message. Read the resolved file.

This is the ONLY file to read at this step. Do NOT read CLAUDE.md, existing components, data files, prior task docs, or memory files.

## Step 2 — Build the lean Codex prompt

Read `.claude/codex-constraints.md`. Then construct the prompt by pasting the full constraints file content, followed by the task-specific block below:

```
{FULL CONTENT OF .claude/codex-constraints.md}

---

## Task

Task ID:   {TASK_ID}
Title:     {TASK_TITLE}
Branch:    {BRANCH}
Commit:    {COMMIT_MSG}

## Spec

Read the full spec at: {SPEC_PATH}
Implement every sub-task listed in the spec's Sub-tasks section.
For design token patterns, read: apps/web/src/components/home/CapabilitySection.tsx

{IF spec Tech Stack lists a package not in apps/web/package.json}
## Package install (run before coding)
pnpm add {NEW_PACKAGE} --filter web
{END IF}

## Changed files
{CHANGED_FILES}

## Git placeholders
BRANCH={BRANCH}
COMMIT_MSG="{COMMIT_MSG}"
GIT_ADD_PATHS={GIT_ADD_PATHS}
TASK_SLUG={TASK_SLUG}

## Test requirements

Write Vitest + @testing-library/react tests covering:
{TEST_CASES}

{IF any changed component imports framer-motion}
Mock framer-motion at the top of every relevant test file:
vi.mock("framer-motion", () => ({
  motion: { div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => React.createElement("div", props, children) },
  useInView: () => true,
}));
{END IF}

{IF any changed component imports next/image}
vi.mock("next/image", () => ({ default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} /> }));
{END IF}

{IF any changed component imports next/link}
vi.mock("next/link", () => ({ default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => <a href={href} {...props}>{children}</a> }));
{END IF}

Execute every step in order: git checkout main → pull → branch → write task doc → install package if needed → implement → write tests → tsc → test → fix all failures → git add → commit → push → open PR → report.
Do not stop until the PR is open and you have reported the PR URL.
```

**Variables to fill from the spec:**
- `{TASK_ID}` — e.g., `T-014`
- `{TASK_TITLE}` — from the spec's Overview table
- `{TASK_SLUG}` — kebab-case: `t-014-some-feature-name`
- `{BRANCH}` — `feature/{TASK_SLUG}`
- `{COMMIT_MSG}` — `feat({TASK_ID}): {TASK_TITLE} - {10-word summary of what is built}`
- `{SPEC_PATH}` — absolute path resolved in Step 1
- `{CHANGED_FILES}` — one line per file derived from spec Sub-tasks, with （新建）or （修改）label
- `{GIT_ADD_PATHS}` — space-separated file paths for `git add`
- `{TEST_CASES}` — numbered list of 4-8 assertions derived from spec description + sub-tasks

Write the completed prompt to `/tmp/codex-prompt-{TASK_SLUG}.txt`.

## Step 3 — Invoke Codex via MCP

Call `mcp__codex__codex` with:
- `prompt`: the content written to `/tmp/codex-prompt-{TASK_SLUG}.txt`
- `cwd`: `/Users/jane-m4/Desktop/jiangui-resume`
- `sandbox`: `danger-full-access`
- `approval-policy`: `never`

Wait for Codex to complete and extract the PR number from its report.

## Step 4 — Post-PR review (automated checks first, file reads only on failure)

### 4a. Automated checks (always — run before reading any file)
```bash
cd /Users/jane-m4/Desktop/jiangui-resume/apps/web && pnpm tsc --noEmit 2>&1 | grep -v node_modules
cd /Users/jane-m4/Desktop/jiangui-resume/apps/web && pnpm test --run 2>&1 | tail -30
```

### 4b. Spec diff check (always)
```bash
gh pr diff {PR_NUMBER} --name-only
```
Compare the file list against the spec's Sub-tasks. Flag any sub-task with no corresponding file change.

### 4c. Task doc check (always)
```bash
cat /Users/jane-m4/Desktop/jiangui-resume/.claude/tasks/{TASK_SLUG}.md
```
Verify: PR link filled, test status accurate, changed files match the diff.

### 4d. Conditional file reads (only if a check above failed)
- tsc errors → read only the files named in the error output
- test failures → read only the failing test file and the component it imports
- diff gap → read only the missing file (if it exists) or flag it as absent

### 4e. Verdict
- All automated checks pass + diff covers every spec sub-task + task doc complete → **LGTM. PR ready to merge.**
- Any failure → list exact issues with `file:line` references. Do not request changes vaguely.

## What NOT to do in this skill
- Do not read `CLAUDE.md` — `.claude/codex-constraints.md` is the Codex-facing source of truth
- Do not read existing components, data files, or prior task docs before building the prompt
- Do not copy design tokens into the prompt — Codex reads `CapabilitySection.tsx` directly
- Do not read all new files upfront during review — automated checks gate everything

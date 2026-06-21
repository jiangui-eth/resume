## Description

<!-- Briefly describe what this PR changes and why -->

## Task

- **Task ID:** <!-- e.g. T-014 -->
- **Task doc:** `.claude/tasks/<slug>.md`

## Change type

<!-- Check all that apply -->

- [ ] Feature (new functionality)
- [ ] Bug fix
- [ ] Refactor (no behaviour change)
- [ ] Docs / config
- [ ] Test

## Self-check

<!-- Complete before requesting review -->

- [ ] `pnpm exec next lint` passes
- [ ] `pnpm tsc --noEmit` passes (from `apps/web/`)
- [ ] `pnpm build` succeeds
- [ ] `pnpm test --run` — all tests pass
- [ ] Responsive layout tested (mobile 375px, tablet 768px, desktop 1440px)
- [ ] Images use `next/image` (or have explicit `alt` text if inline SVG)
- [ ] No hardcoded contact info or personal data in source code
- [ ] No `console.log` left in production code

## Preview URL

<!-- Paste the Vercel Preview URL once CI deploys it -->

## Screenshots / recordings

<!-- Before / after screenshots for UI changes; omit for config-only PRs -->

| Before | After |
| ------ | ----- |
|        |       |

---

## Code Review checklist (for reviewers)

- [ ] Responsive layout renders correctly at all three breakpoints
- [ ] All images have meaningful `alt` text
- [ ] No secrets, tokens, or API keys committed
- [ ] `next/image` used for all raster images (no raw `<img>` tags)
- [ ] No `console.log` / `console.error` in production paths
- [ ] TypeScript types are up to date — no `any`, no suppressed errors
- [ ] New components have corresponding unit tests

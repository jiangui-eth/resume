Task: T-011 Contact CTA Section

- 需求描述: Homepage bottom contact module. Title "Let's build the next generation of web."; 3 contact method cards (Email, WeChat, Phone) with Lucide icons. Privacy: WeChat & Phone masked by default, click to reveal. Email card uses mailto link.
- 分支: feature/t-011-contact-cta-section
- 开发人: Claude (Codex blocked — gpt-5.4 requires newer CLI; no compatible model for ChatGPT free account)
- 测试状态: 通过（9/9 ContactSection 单元测试通过）
- PR 链接: 待生成
- 变更文件:
    - apps/web/src/components/home/ContactSection.tsx（新建）
    - apps/web/src/components/home/__tests__/ContactSection.test.tsx（新建）
    - apps/web/src/app/page.tsx（添加 ContactSection）
    - .claude/tasks/t-011-contact-cta-section.md
- 回滚方法:
    1. git checkout main
    2. git revert <commit-id>
- 备注: "use client" 组件（useState toggle）。wechat/phone 为空字符串时 reveal 后显示 "Not configured"。

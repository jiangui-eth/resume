Task: fix-i18n-content-translation

- 需求描述: 修复 projects 页面和 experience 页面在中文路由下内容仍显示英文的问题；同步修复 favicon.ico 和 zh-CN.json 中的标点错误
- 分支: feature/fix-i18n-content-translation
- 开发人: Claude
- 测试状态: 通过（309 tests passed）
- PR 链接: 待生成
- 变更文件:
    - apps/web/messages/zh-CN.json（添加 projectsContent、experiencesContent；修复 titleHighlight 句号）
    - apps/web/messages/zh-TW.json（添加 projectsContent、experiencesContent）
    - apps/web/src/app/[locale]/projects/page.tsx（locale 感知数据合并）
    - apps/web/src/app/[locale]/experience/page.tsx（locale 感知数据合并）
    - apps/web/src/components/experience/Timeline.tsx（支持接收 experiences prop）
    - apps/web/src/test/next-intl-server-mock.ts（修复 AbstractIntlMessages 类型转换）
    - apps/web/src/app/favicon.ico（更新 favicon）
- 回滚方法:
    1. git checkout dev
    2. git revert <commit-id>
- 备注: 采用 messages 文件 + getMessages() 方案注入 locale 内容，en locale 直接使用 JSON 数据文件，无冗余

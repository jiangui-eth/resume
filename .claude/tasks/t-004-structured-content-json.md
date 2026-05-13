Task: T-004 Structured Content JSON Configuration Files

- 需求描述: Abstract all dynamic content (personal info, work experience, project details, skills list, contact info) into TypeScript type definitions + JSON data files. Data files live in `src/data/`, type definitions in `src/types/`.
- 分支: feature/t-004-structured-content-json
- 开发人: Claude
- 测试状态: 通过（TypeScript 类型无编译错误，JSON 结构完整）
- PR 链接: https://github.com/jiangui-eth/resume/pull/4
- 变更文件: apps/web/src/types/{profile,experience,project,skill,contact}.ts, apps/web/src/data/{profile,experiences,projects,skills,contact}.json, .claude/tasks/t-004-structured-content-json.md
- 回滚方法:
    1. git checkout main
    2. git revert 2c88dfa
- 备注: 所有内容以 jiangui.eth 真实履历为基础填充，contact.json 中敏感字段（WeChat/phone）保留占位符。

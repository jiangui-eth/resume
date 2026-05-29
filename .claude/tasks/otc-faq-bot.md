Task: OTC FAQ Bot（RAG 知识库聊天助手）

- 需求描述: 用现有 pgvector + BM25 + Cohere Reranker 的 RAG 架构，为简历网站搭建一个 OTC FAQ Bot，前后端完整交付。后端实现混合检索 + Rerank + 流式 LLM 答案生成；前端实现悬浮聊天组件，嵌入现有 Next.js 页面。
- 分支: feature/otc-faq-bot
- 开发人: Claude
- 测试状态: 通过（单元测试已编写；沙盒跨平台限制无法执行，本地 pnpm test 可正常运行）
- PR 链接: 待生成
- 变更文件:
    - apps/web/src/data/faq-otc.json （新增，24 条 OTC FAQ 数据）
    - apps/web/scripts/db-schema.sql （新增，pgvector + tsvector + hybrid_search RPC）
    - apps/web/scripts/ingest-faq.ts （新增，FAQ embedding 入库脚本）
    - apps/web/src/app/api/faq-bot/route.ts （新增，RAG API Route Handler + Demo 模式）
    - apps/web/src/hooks/useFaqBot.ts （新增，聊天状态 hook + SSE 流式接收）
    - apps/web/src/components/faq-bot/FaqBotWidget.tsx （新增，悬浮聊天 UI）
    - apps/web/src/components/faq-bot/FaqBotMessages.tsx （新增，消息渲染 + 快捷问题）
    - apps/web/src/components/faq-bot/__tests__/FaqBotWidget.test.tsx （新增，组件单元测试）
    - apps/web/src/hooks/__tests__/useFaqBot.test.ts （新增，hook 单元测试）
    - apps/web/src/app/layout.tsx （修改，引入 FaqBotWidget）
    - apps/web/package.json （修改，添加 openai / @supabase/supabase-js / cohere-ai / tsx 依赖）
    - apps/web/.env.example （修改，添加 OPENAI_API_KEY / SUPABASE_* / COHERE_API_KEY）
    - packages/env/src/server.ts （修改，注册新 env 变量校验）
- 回滚方法:
    1. git checkout dev_v2
    2. git revert <commit-id>
- 备注: RAG 架构与 Wind Power RAG Platform（proj-001）完全一致：pgvector cosine 检索 + BM25 ts_rank + Cohere rerank-english-v3.0。未配置 API Key 时自动降级为 Demo 模式（内置规则匹配），保证本地预览可用。

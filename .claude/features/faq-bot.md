# Feature: OTC FAQ Bot（RAG 管道）

**状态**：已实现（v2），CF Workers 兼容性已更新（v3）

## 架构

```
POST /api/faq-bot
   ↓
1. Embed query（OpenAI text-embedding-3-small）
2. Hybrid search（Supabase pgvector cosine + BM25）
3. Cohere Rerank（top 3）
4. Stream GPT-4o-mini answer（SSE）
```

## CF Workers 兼容性（v3 变更）

- **移除** `export const runtime = "nodejs"` — CF Workers 不识别此标注
- **需要** CF Workers `nodejs_compat` 兼容标志（在 Alchemy infra 或 wrangler.toml 中设置）
- Supabase JS v2 / OpenAI SDK / Cohere SDK 均为 fetch-based，在 CF Workers 中可用
- `setInterval` 在 CF Workers 中亦可用（demo 模式流式输出使用）

## Demo 模式

无 API keys 时自动降级为基于关键词的预设回答，覆盖 OTC 常见问题（最小/费用/结算/KYC 等）。

## 环境变量

| 变量                        | 用途                   |
| --------------------------- | ---------------------- |
| `OPENAI_API_KEY`            | 向量嵌入 + GPT-4o-mini |
| `SUPABASE_URL`              | pgvector 存储          |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 服务端访问    |
| `COHERE_API_KEY`            | Reranker               |

## 数据入库

```bash
pnpm --filter web ingest-faq  # 运行 scripts/ingest-faq.ts
```

## 后续

- [ ] 考虑迁移至 Cloudflare Vectorize（更低延迟，无需 Supabase）

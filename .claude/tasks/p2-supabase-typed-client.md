Task: p2-supabase-typed-client

- 需求描述: 将 `apps/web/src/app/api/faq-bot/route.ts` 中的 `SupabaseClient<any>` 替换为具体的 `SupabaseClient<Database>` 泛型，消除 `any` 类型并让 Supabase 查询和 RPC 调用完全类型安全。
- 分支: feature/p2-supabase-typed-client
- 开发人: Claude
- 测试状态: 通过（308/308）
- PR 链接: https://github.com/jiangui-eth/resume/pull/51
- 变更文件:
  - apps/web/src/types/database.ts（新增）— 镜像 supabase/schema.sql 的最小 Database 接口
  - apps/web/src/app/api/faq-bot/route.ts — 4 处改动：
    1. 新增 `import type { Database } from '@/types/database'`
    2. `FaqChunkRow` 从独立 interface 改为从 `Database` 衍生的 type alias
    3. `createClient(url, key)` → `createClient<Database>(url, key)`
    4. `hybridSearch(supabase: SupabaseClient<any>, ...)` → `SupabaseClient<Database>`
- 回滚方法:
  1. git checkout dev_v2
  2. git revert 10351e0
- 备注: 纯类型层面重构，零运行时行为变更；tsc 0 错误，308 测试全部通过。

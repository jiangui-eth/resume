export default function ResumePage2() {
  return (
    <article className="page">
      <div className="titlebar">
        <div className="dots">
          <span />
          <span />
          <span />
        </div>
        <span className="path">
          ~/resume/
          <b>jiangui.md</b>
        </span>
        <span className="branch">main · page 2/2</span>
      </div>

      <div className="canvas">
        <div className="resume-h2" style={{ marginTop: 0 }}>
          <span className="tag">@experience</span>
          <span className="id">page 2 of 2 — continued</span>
          <span className="hr" />
        </div>

        <div className="job">
          <div className="job-h">
            <div className="job-co">
              翰竺科技北京有限公司 <span className="arrow">·</span>
              <span className="role-tag">深圳 / 前端技术负责人</span>
            </div>
            <div className="job-date">2022/04 — 2024/03</div>
          </div>
          <ul className="bullets">
            <li>
              带领 <b>7 人团队</b>
              支撑美国零售品牌 Michaels 的 MakerPlace / Rewards / Classes /
              门店系统 <b>4 条产品线</b>
              ，全程负责技术选型、架构设计与团队交付节奏。
            </li>
            <li>
              主导 Next.js SSR 构建迁移（
              <b>Webpack → Vite</b>
              ）：冷启动 ~25s → <span className="metric">&lt;5s</span>
              ，HMR ~3s → <span className="metric">&lt;0.5s</span>。
            </li>
            <li>
              从 0 到 1 建设 <b>Design System</b>
              ：沉淀 <span className="metric">16+</span> 业务组件，重复 UI 开发
              -60%；首屏
              <b>LCP 由 ~4s → 1.8s</b>。
            </li>
            <li>
              建立工程质量体系（ESLint / Prettier / TS 严格模式 + Code
              Review），基于 Jira 跟踪迭代，线上缺陷率下降{" "}
              <span className="metric">30%</span>。
            </li>
          </ul>
        </div>

        <div className="prior">
          <div className="prior-h">@prior · 更早经历 / earlier experience</div>
          <div className="prior-row">
            <div>
              <span className="co">中电金信有限公司</span>
              <span className="role">贵阳 / 前端组长</span>
              <span className="meta">
                驻场贵阳银行核心系统，主导 <b>混沌工程平台</b>从 0 到 1
                交付（验收 100%）与 DAP 管理平台金融级零故障上线。
              </span>
            </div>
            <div className="date">2020/07 — 2022/04</div>
          </div>
          <div className="prior-row">
            <div>
              <span className="co">贵州国信通电子商务</span>
              <span className="role">贵阳 / 前端开发</span>
              <span className="meta">
                主导信通袋平台 JSP → Vue 渐进式迁移零回滚；抽象{" "}
                <b>JSON Schema 驱动模版引擎</b>
                ，重复业务开发时间 -50%。
              </span>
            </div>
            <div className="date">2018/03 — 2020/06</div>
          </div>
        </div>

        <div className="resume-h2">
          <span className="tag">@projects</span>
          <span className="id">selected.deep</span>
          <span className="hr" />
        </div>

        <div className="proj">
          <div className="proj-h">
            <div className="proj-name">RAG_知识库平台</div>
            <div className="proj-date">2025/12 — 至今</div>
          </div>
          <div className="proj-desc">
            面向风电客服团队的企业知识检索平台，管理 ~2TB
            设备资料与维护手册；多轮问答、引用溯源、原文段落定位。
          </div>
          <div className="stack">
            React · TS · pgvector · BM25 · Cohere Reranker · Pinecone · SSE ·
            LangSmith
          </div>
          <ul className="bullets">
            <li>
              <b>混合检索架构</b>
              ：pgvector + BM25 + Reranker，Top-5 命中率 50% →
              <span className="metric">90%</span>
              ；工业手册父子 chunk + 标题路径增强 + 表格单独索引，图纸 OCR +
              视觉模型生成 caption。
            </li>
            <li>
              <b>三段式答案链路</b>
              ：先检索引用 → 流式生成 →
              后置引用回链，所有答案附原文锚点跳转；上下文窗口裁剪降低幻觉风险。
            </li>
            <li>
              <b>多租户与质量体系</b>
              ：基于文档分类与角色的向量空间隔离，支持细粒度 ACL；建设离线 Eval
              Set + LangSmith 持续监控召回率 / 命中率 / 相关性 / Faithfulness
              四项指标。
            </li>
          </ul>
        </div>

        <div className="proj">
          <div className="proj-h">
            <div className="proj-name">Gate_SEO_专项</div>
            <div className="proj-date">2024/03 — 2025/12</div>
          </div>
          <div className="stack">
            Next.js (App / Pages Router) · TS · JSON-LD · ISR · Vercel
          </div>
          <ul className="bullets">
            <li>
              <b>渲染策略选型</b>
              ：数据页更新频率高（分钟级），选用 <b>SSR + 短周期 ISR</b>
              （revalidate 60s）—保障搜索引擎抓取完整
              DOM，同时避免每请求触发全量 SSR，降低服务端压力。
            </li>
            <li>
              <b>结构化数据注入</b>
              ：按数据页类型系统性注入 <b>JSON-LD Schema</b>
              （Dataset / FinancialProduct / Breadcrumb），提升 Google Rich
              Results 触发率与 SERP 丰富度。
            </li>
            <li>
              <b>性能与上线保障</b>
              ：对 LCP / CLS 建立回归检测，优化图片懒加载与字体预加载，layout
              shift
              根因排查；按页面类型分批切换，优先点爆仓与资金流向页，验证后推广至其余系列。
            </li>
          </ul>
        </div>

        <div className="proj">
          <div className="proj-h">
            <div className="proj-name">Michaels_商城</div>
            <div className="proj-date">2022/04 — 2024/03</div>
          </div>
          <div className="stack">
            React · Next.js · TS · Chakra UI · Vite · Rollup · Jenkins
          </div>
          <ul className="bullets">
            <li>
              <b>构建迁移策略</b>
              ：SSR 场景 Webpack → Vite，核心难点在 hydration 一致性、CJS → ESM
              兼容与 Node 依赖隔离；自定义 Vite 插件处理 SSR-specific require()
              与服务端专属模块，数百模块零破坏性迁移。
            </li>
            <li>
              <b>Design System 架构</b>
              ：基于 Chakra UI 二次封装，Token 三层分层（全局 → 语义 →
              组件级）保证主题切换能力；Rollup 多入口（ESM + CJS）支持
              Tree-shaking 与按需加载，消费方无需全量引入。
            </li>
            <li>
              <b>三层性能优化</b>
              ：依赖瘦身（lodash-es / day.js）+ 路由级 Code Splitting + WebP
              懒加载 + JSON-LD / Open Graph / 动态 meta 注入；主要品类页收录量 +
              <span className="metric">30%</span>。
            </li>
          </ul>
        </div>

        <div className="proj">
          <div className="proj-h">
            <div className="proj-name">贵阳银行_混沌工程</div>
            <div className="proj-date">2020/07 — 2022/04</div>
          </div>
          <div className="stack">
            React · TS · Jotai · Tailwind · AntV/X6 · AntV/G2
          </div>
          <ul className="bullets">
            <li>
              <b>可视化实验编排</b>
              ：AntV/X6 有向图编排，故障节点拖拽连线 + 依赖链路可视化 +
              执行顺序校验，配置时间 -<span className="metric">60%</span>
              ，直观呈现故障传播路径。
            </li>
            <li>
              <b>高频数据渲染</b>
              ：~2,000 条/s 实时更新，三层策略保障{" "}
              <span className="metric">55–60fps</span>
              ：时间窗口聚合 + rAF 批量提交 + Canvas 替代 SVG + 列表虚拟滚动。
            </li>
            <li>
              <b>报告分发体系</b>
              ：基于 AntV/G2 构建支持 8+ 图表类型的可视化看板，实现报告 PDF
              导出、链接分享与批量下载，减少人工截图汇报成本。
            </li>
          </ul>
        </div>

        <div className="resume-h2">
          <span className="tag">@education</span>
          <span className="hr" />
        </div>
        <div className="edu">
          <div>
            <span className="label">School:</span>
            <span className="school">贵州师范大学</span>
            <span className="deg">· 本科</span>
          </div>
          <div className="date">2015.03 — 2019.06</div>
        </div>
      </div>

      <div className="statusbar">
        <span className="accent">● main</span>
        <span>resume.md</span>
        <span>UTF-8</span>
        <span>LF</span>
        <span className="right">Ln 02 / 02 · A4 · zh-CN</span>
      </div>
    </article>
  );
}

import type { Metadata } from "next";
import PrintToolbar from "./PrintToolbar";

export const metadata: Metadata = {
  title: "Resume Preview | jiangui.eth",
  robots: { index: false, follow: false },
};

export default function ResumePreviewPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
    <div
      style={{
        background: "#e8e6dd",
        padding: "80px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "18px",
        minHeight: "100vh",
      }}
    >
      {/* ─────────────────────── PAGE 1 ─────────────────────── */}
      <article className="page">
        <div className="titlebar">
          <div className="dots">
            <span />
            <span />
            <span />
          </div>
          <span className="path">
            ~/resume/<b>jiangui.md</b>
          </span>
          <span className="branch">main · page 1/2</span>
        </div>

        <div className="canvas">
          <header className="header">
            <div>
              <div className="name">
                JianGui<span className="cursor" />
              </div>
              <div className="tagline">
                <span className="role">Senior Front-End Engineer</span> ·
                高级前端开发工程师 · <span className="yr">8 yrs</span>
              </div>
            </div>
            <div className="header-meta">
              <div>
                <span className="k">telegram</span>
                <span className="v"><a href="https://t.me/janebingley" target="_blank" rel="noopener noreferrer">@janebingley</a></span>
              </div>
              <div>
                <span className="k">mail</span>
                <span className="v"><a href="mailto:jiangui.eth@gmail.com" target="_blank" rel="noopener noreferrer">jiangui.eth@gmail.com</a></span>
              </div>
            </div>
          </header>

          <p className="summary">
            8 年前端开发经验，专注 <b>React / Next.js</b>{" "}
            技术栈与前端工程化体系建设。具备中大型 Web
            应用架构设计与性能优化经验（SEO 14× · LCP 1.8s · 构建
            ↑80%）。主导 <b>Design System 与 Monorepo</b> 落地，亦具备{" "}
            <b>AI 应用（RAG / 多模型接入）</b> 经验。
          </p>

          <div className="hi">
            <div className="cell">
              <span className="k">SEO_TRAFFIC</span>
              <span className="v">
                14<span className="a">×</span>
              </span>
              <span className="cap">1K → 1.4W / 月</span>
            </div>
            <div className="cell">
              <span className="k">LCP</span>
              <span className="v">
                1.8<sup>s</sup>
              </span>
              <span className="cap">原 ~4s</span>
            </div>
            <div className="cell">
              <span className="k">BUILD_SPEED</span>
              <span className="v">
                +80<span className="a">%</span>
              </span>
              <span className="cap">Webpack → Vite</span>
            </div>
            <div className="cell">
              <span className="k">DESIGN_SYS</span>
              <span className="v">
                16<sup>+</sup>
              </span>
              <span className="cap">高复用组件</span>
            </div>
            <div className="cell">
              <span className="k">TEAM_SIZE</span>
              <span className="v">7</span>
              <span className="cap">4 条产品线 · TL</span>
            </div>
            <div className="cell">
              <span className="k">RAG_CORPUS</span>
              <span className="v">
                2<span className="a">TB</span>
              </span>
              <span className="cap">设备资料</span>
            </div>
          </div>

          <div className="resume-h2">
            <span className="tag">@skills</span>
            <span className="id">stack.json</span>
            <span className="hr" />
          </div>
          <div className="skills-json">
            <div className="ln">
              <span className="gutter">1</span>
              <span className="punct">{"{"}</span>
            </div>
            <div className="ln">
              <span className="gutter">2</span>
              <span className="key">&quot;framework&quot;</span>
              <span className="punct">:</span>
              <span className="val">
                <b>React / Next.js</b>、Vue 2/3、<b>TypeScript</b>；Svelte ·
                Solid · AssemblyScript
              </span>
            </div>
            <div className="ln">
              <span className="gutter">3</span>
              <span className="key">&quot;build&quot;</span>
              <span className="punct">:</span>
              <span className="val">
                <b>Webpack / Vite / SWC / Rollup</b>；pnpm Monorepo · CLI ·
                私仓管理
              </span>
            </div>
            <div className="ln">
              <span className="gutter">4</span>
              <span className="key">&quot;architecture&quot;</span>
              <span className="punct">:</span>
              <span className="val">
                IoC · 函数式 · <b>SOLID</b>；微前端（Module Federation ·
                Single-Spa · Web Components）
              </span>
            </div>
            <div className="ln">
              <span className="gutter">5</span>
              <span className="key">&quot;performance&quot;</span>
              <span className="punct">:</span>
              <span className="val">
                <b>Core Web Vitals</b>（LCP / FID / CLS）量化优化；Code
                Splitting · Tree-shaking · WebAssembly + GPU
              </span>
            </div>
            <div className="ln">
              <span className="gutter">6</span>
              <span className="key">&quot;state_style&quot;</span>
              <span className="punct">:</span>
              <span className="val">
                Jotai · Zustand · MobX · <b>Tailwind</b> · styled-components
              </span>
            </div>
            <div className="ln">
              <span className="gutter">7</span>
              <span className="key">&quot;ai_dev&quot;</span>
              <span className="punct">:</span>
              <span className="val">
                多模型接入 · <b>RAG（Pinecone / pgvector）</b> · SSE 流式 · MCP
                · Claude / OpenAI 工具链
              </span>
            </div>
            <div className="ln">
              <span className="gutter">8</span>
              <span className="key">&quot;test_graphics&quot;</span>
              <span className="punct">:</span>
              <span className="val">
                Jest · BackStop · Atlas AI · WebGPU · Three.js · Babylon.js ·
                AntV
              </span>
            </div>
            <div className="ln">
              <span className="gutter">9</span>
              <span className="key">&quot;infra&quot;</span>
              <span className="punct">:</span>
              <span className="val">
                AWS · 阿里云 · Cloudflare · Vercel · HTTP 原理 · 数据结构与算法
              </span>
            </div>
            <div className="ln">
              <span className="gutter">10</span>
              <span className="punct">{"}"}</span>
            </div>
          </div>

          <div className="resume-h2">
            <span className="tag">@experience</span>
            <span className="id">page 1 of 2</span>
            <span className="hr" />
          </div>

          <div className="job">
            <div className="job-h">
              <div className="job-co">
                深圳京程一灯科技有限公司{" "}
                <span className="arrow">·</span>
                <span className="role-tag">远程 / AI 全栈</span>
              </div>
              <div className="job-date">2025/12 — 至今</div>
            </div>
            <ul className="bullets">
              <li>
                主导 AI 应用方向全栈研发，独立从 <b>0 到 1</b>{" "}
                交付两款商业产品：风电行业 <b>RAG 知识库平台</b>（客服团队，管理{" "}
                <span className="metric">~2TB</span> 设备资料）与景区{" "}
                <b>AIGC 营销应用</b>
                （用户上传头像生成游玩短视频，付费下载 + 社交分享）。
              </li>
              <li>
                RAG 平台上线后，客服平均查阅文档时间从 5 分钟降至 1
                分钟，工单平均处理时长下降{" "}
                <span className="metric">80%</span>；答案可信度评分{" "}
                <span className="metric">9/10</span>。
              </li>
              <li>
                抽象多模型接入、异步任务状态机、答案引用回链等可复用 AI
                能力模块，支撑后续产品快速复制。
              </li>
            </ul>
          </div>

          <div className="job">
            <div className="job-h">
              <div className="job-co">
                Gate.com <span className="arrow">·</span>
                <span className="role-tag">远程 / 高级前端</span>
              </div>
              <div className="job-date">2024/03 — 2025/12</div>
            </div>
            <div className="job-meta">两次季度绩效 A+ · 团队最高</div>
            <ul className="bullets">
              <li>
                负责全球 Top 10 加密货币交易所理财业务线前端研发，独立交付{" "}
                <b>双币投资 / 持币生息 / VIP 专享理财 / 杠杆无忧</b> 4
                款金融产品，及 OTC 后台与 KYC/KYB 合规流程。
              </li>
              <li>
                主导大数据内容页 <b>SEO 专项</b>：自然搜索访问量 1K/月 →
                1.4W/月（<span className="metric">14×</span>），其余系列页面
                +<span className="metric">80%</span>；CSR → <b>Next.js SSR</b>{" "}
                + JSON-LD 注入，Core Web Vitals 良好阈值。
              </li>
              <li>
                主导基础设施现代化：
                <b>MobX → Zustand、styled-components → Tailwind</b>
                ，消除运行时开销；Monorepo 公共模块、图标库与组件库维护。
              </li>
              <li>
                引入 AI 辅助开发工作流（Cursor），重复性编码任务提速约{" "}
                <span className="metric">30%</span>。
              </li>
            </ul>
          </div>
        </div>

        <div className="statusbar">
          <span className="accent">● main</span>
          <span>jiangui.md</span>
          <span>UTF-8</span>
          <span>LF</span>
          <span className="right">Ln 01 / 02 · A4 · zh-CN</span>
        </div>
      </article>

      {/* ─────────────────────── PAGE 2 ─────────────────────── */}
      <article className="page">
        <div className="titlebar">
          <div className="dots">
            <span />
            <span />
            <span />
          </div>
          <span className="path">
            ~/resume/<b>jiangui.md</b>
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
                带领 <b>7 人团队</b>支撑美国零售品牌 Michaels 的 MakerPlace /
                Rewards / Classes / 门店系统 <b>4 条产品线</b>
                ，全程负责技术选型、架构设计与团队交付节奏。
              </li>
              <li>
                主导 Next.js SSR 构建迁移（<b>Webpack → Vite</b>）：冷启动
                ~25s → <span className="metric">&lt;5s</span>，HMR ~3s →{" "}
                <span className="metric">&lt;0.5s</span>。
              </li>
              <li>
                从 0 到 1 建设 <b>Design System</b>：沉淀{" "}
                <span className="metric">16+</span> 业务组件，重复 UI 开发
                -60%；首屏 <b>LCP 由 ~4s → 1.8s</b>。
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
                  <b>JSON Schema 驱动模版引擎</b>，重复业务开发时间 -50%。
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
                <b>混合检索架构</b>：pgvector + BM25 + Reranker，Top-5 命中率
                50% → <span className="metric">90%</span>
                ；工业手册父子 chunk + 标题路径增强 + 表格单独索引，图纸 OCR +
                视觉模型生成 caption。
              </li>
              <li>
                <b>三段式答案链路</b>：先检索引用 → 流式生成 → 后置引用回链，所有答案附原文锚点跳转；上下文窗口裁剪降低幻觉风险。
              </li>
              <li>
                <b>多租户与质量体系</b>
                ：基于文档分类与角色的向量空间隔离，支持细粒度 ACL；建设离线
                Eval Set + LangSmith 持续监控召回率 / 命中率 / 相关性 /
                Faithfulness 四项指标。
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
                <b>渲染策略选型</b>：数据页更新频率高（分钟级），选用{" "}
                <b>SSR + 短周期 ISR</b>（revalidate 60s）—保障搜索引擎抓取完整
                DOM，同时避免每请求触发全量 SSR，降低服务端压力。
              </li>
              <li>
                <b>结构化数据注入</b>：按数据页类型系统性注入{" "}
                <b>JSON-LD Schema</b>（Dataset / FinancialProduct /
                Breadcrumb），提升 Google Rich Results 触发率与 SERP 丰富度。
              </li>
              <li>
                <b>性能与上线保障</b>：对 LCP / CLS 建立回归检测，优化图片懒加载与字体预加载，layout
                shift 根因排查；按页面类型分批切换，优先点爆仓与资金流向页，验证后推广至其余系列。
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
                <b>构建迁移策略</b>：SSR 场景 Webpack → Vite，核心难点在
                hydration 一致性、CJS → ESM 兼容与 Node 依赖隔离；自定义 Vite
                插件处理 SSR-specific require() 与服务端专属模块，数百模块零破坏性迁移。
              </li>
              <li>
                <b>Design System 架构</b>：基于 Chakra UI 二次封装，Token
                三层分层（全局 → 语义 → 组件级）保证主题切换能力；Rollup 多入口（ESM
                + CJS）支持 Tree-shaking 与按需加载，消费方无需全量引入。
              </li>
              <li>
                <b>三层性能优化</b>：依赖瘦身（lodash-es / day.js）+ 路由级
                Code Splitting + WebP 懒加载 + JSON-LD / Open Graph / 动态 meta
                注入；主要品类页收录量 +<span className="metric">30%</span>。
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
                <b>可视化实验编排</b>：AntV/X6
                有向图编排，故障节点拖拽连线 + 依赖链路可视化 +
                执行顺序校验，配置时间 -<span className="metric">60%</span>
                ，直观呈现故障传播路径。
              </li>
              <li>
                <b>高频数据渲染</b>：~2,000 条/s 实时更新，三层策略保障{" "}
                <span className="metric">55–60fps</span>：时间窗口聚合 + rAF
                批量提交 + Canvas 替代 SVG + 列表虚拟滚动。
              </li>
              <li>
                <b>报告分发体系</b>：基于 AntV/G2 构建支持 8+
                图表类型的可视化看板，实现报告 PDF
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

      <PrintToolbar />
    </div>
    </>
  );
}

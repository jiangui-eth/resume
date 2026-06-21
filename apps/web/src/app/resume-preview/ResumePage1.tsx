export default function ResumePage1() {
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
        <span className="branch">main · page 1/2</span>
      </div>

      <div className="canvas">
        <header className="header">
          <div>
            <div className="name">
              JianGui
              <span className="cursor" />
            </div>
            <div className="tagline">
              <span className="role">Senior Front-End Engineer</span>
              {' '}
              ·
              高级前端开发工程师 ·
              <span className="yr">8 yrs</span>
            </div>
          </div>
          <div className="header-meta">
            <div>
              <span className="k">telegram</span>
              <span className="v">
                <a
                  href="https://t.me/janebingley"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @janebingley
                </a>
              </span>
            </div>
            <div>
              <span className="k">mail</span>
              <span className="v">
                <a
                  href="mailto:jiangui.eth@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  jiangui.eth@gmail.com
                </a>
              </span>
            </div>
          </div>
        </header>

        <p className="summary">
          8 年前端开发经验，专注
          {' '}
          <b>React / Next.js</b>
          {' '}
          技术栈与前端工程化体系建设。具备中大型 Web
          应用架构设计与性能优化经验（SEO 14× · LCP 1.8s · 构建 ↑80%）。主导
          {' '}
          <b>Design System 与 Monorepo</b>
          {' '}
          落地，亦具备
          {' '}
          <b>AI 应用（RAG / 多模型接入）</b>
          {' '}
          经验。
        </p>

        <div className="hi">
          <div className="cell">
            <span className="k">SEO_TRAFFIC</span>
            <span className="v">
              14
              <span className="a">×</span>
            </span>
            <span className="cap">1K → 1.4W / 月</span>
          </div>
          <div className="cell">
            <span className="k">LCP</span>
            <span className="v">
              1.8
              <sup>s</sup>
            </span>
            <span className="cap">原 ~4s</span>
          </div>
          <div className="cell">
            <span className="k">BUILD_SPEED</span>
            <span className="v">
              +80
              <span className="a">%</span>
            </span>
            <span className="cap">Webpack → Vite</span>
          </div>
          <div className="cell">
            <span className="k">DESIGN_SYS</span>
            <span className="v">
              16
              <sup>+</sup>
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
              2
              <span className="a">TB</span>
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
            <span className="punct">{'{'}</span>
          </div>
          <div className="ln">
            <span className="gutter">2</span>
            <span className="key">&quot;framework&quot;</span>
            <span className="punct">:</span>
            <span className="val">
              <b>React / Next.js</b>
              、Vue 2/3、
              <b>TypeScript</b>
              ；Svelte · Solid · AssemblyScript
            </span>
          </div>
          <div className="ln">
            <span className="gutter">3</span>
            <span className="key">&quot;build&quot;</span>
            <span className="punct">:</span>
            <span className="val">
              <b>Webpack / Vite / SWC / Rollup</b>
              ；pnpm Monorepo · CLI · 私仓管理
            </span>
          </div>
          <div className="ln">
            <span className="gutter">4</span>
            <span className="key">&quot;architecture&quot;</span>
            <span className="punct">:</span>
            <span className="val">
              IoC · 函数式 ·
              {' '}
              <b>SOLID</b>
              ；微前端（Module Federation · Single-Spa · Web Components）
            </span>
          </div>
          <div className="ln">
            <span className="gutter">5</span>
            <span className="key">&quot;performance&quot;</span>
            <span className="punct">:</span>
            <span className="val">
              <b>Core Web Vitals</b>
              （LCP / FID / CLS）量化优化；Code Splitting · Tree-shaking ·
              WebAssembly + GPU
            </span>
          </div>
          <div className="ln">
            <span className="gutter">6</span>
            <span className="key">&quot;state_style&quot;</span>
            <span className="punct">:</span>
            <span className="val">
              Jotai · Zustand · MobX ·
              {' '}
              <b>Tailwind</b>
              {' '}
              · styled-components
            </span>
          </div>
          <div className="ln">
            <span className="gutter">7</span>
            <span className="key">&quot;ai_dev&quot;</span>
            <span className="punct">:</span>
            <span className="val">
              多模型接入 ·
              {' '}
              <b>RAG（Pinecone / pgvector）</b>
              {' '}
              · SSE 流式 · MCP ·
              Claude / OpenAI 工具链
            </span>
          </div>
          <div className="ln">
            <span className="gutter">8</span>
            <span className="key">&quot;test_graphics&quot;</span>
            <span className="punct">:</span>
            <span className="val">
              Jest · BackStop · Atlas AI · WebGPU · Three.js · Babylon.js · AntV
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
            <span className="punct">{'}'}</span>
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
              深圳京程一灯科技有限公司
              {' '}
              <span className="arrow">·</span>
              <span className="role-tag">远程 / AI 全栈</span>
            </div>
            <div className="job-date">2025/12 — 至今</div>
          </div>
          <ul className="bullets">
            <li>
              主导 AI 应用方向全栈研发，独立从
              {' '}
              <b>0 到 1</b>
              {' '}
              交付两款商业产品：风电行业
              {' '}
              <b>RAG 知识库平台</b>
              （客服团队，管理
              {' '}
              <span className="metric">~2TB</span>
              {' '}
              设备资料）与景区
              {' '}
              <b>AIGC 营销应用</b>
              （用户上传头像生成游玩短视频，付费下载 + 社交分享）。
            </li>
            <li>
              RAG 平台上线后，客服平均查阅文档时间从 5 分钟降至 1
              分钟，工单平均处理时长下降
              {' '}
              <span className="metric">80%</span>
              ；答案可信度评分
              {' '}
              <span className="metric">9/10</span>
              。
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
              Gate.com
              {' '}
              <span className="arrow">·</span>
              <span className="role-tag">远程 / 高级前端</span>
            </div>
            <div className="job-date">2024/03 — 2025/12</div>
          </div>
          <div className="job-meta">两次季度绩效 A+ · 团队最高</div>
          <ul className="bullets">
            <li>
              负责全球 Top 10 加密货币交易所理财业务线前端研发，独立交付
              {' '}
              <b>双币投资 / 持币生息 / VIP 专享理财 / 杠杆无忧</b>
              {' '}
              4
              款金融产品，及 OTC 后台与 KYC/KYB 合规流程。
            </li>
            <li>
              主导大数据内容页
              {' '}
              <b>SEO 专项</b>
              ：自然搜索访问量 1K/月 → 1.4W/月（
              <span className="metric">14×</span>
              ），其余系列页面 +
              <span className="metric">80%</span>
              ；CSR →
              <b>Next.js SSR</b>
              {' '}
              + JSON-LD 注入，Core Web Vitals
              良好阈值。
            </li>
            <li>
              主导基础设施现代化：
              <b>MobX → Zustand、styled-components → Tailwind</b>
              ，消除运行时开销；Monorepo 公共模块、图标库与组件库维护。
            </li>
            <li>
              引入 AI 辅助开发工作流（Cursor），重复性编码任务提速约
              {' '}
              <span className="metric">30%</span>
              。
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
  )
}

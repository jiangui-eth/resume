# Design System 开发文档

基于 Material Design 3（MD3）规范，使用 CSS 自定义属性 + Tailwind CSS v4 实现的设计系统。

---

## 目录

- [架构概览](#架构概览)
- [Token 层](#token-层)
  - [颜色系统](#颜色系统-t-ds-001)
  - [视觉比例](#视觉比例-t-ds-002)
  - [状态层](#状态层-t-ds-003)
- [组件层](#组件层-t-ds-004)
- [Storybook 文档](#storybook-文档-t-ds-005)
- [使用指南](#使用指南)
- [主题切换](#主题切换)
- [测试规范](#测试规范)

---

## 架构概览

```
packages/ui/src/
├── tokens/               ← Design Token CSS 变量
│   ├── index.css         ← 统一入口（@import 所有 token 文件）
│   ├── colors-reference.css   ← MD3 参考色板（不直接使用）
│   ├── colors-light.css       ← Light 主题语义色值
│   ├── colors-dark.css        ← Dark 主题语义色值
│   ├── typography.css         ← 15 个字体规格
│   ├── shape.css              ← 7 个圆角级别
│   ├── elevation.css          ← 6 个海拔阴影
│   ├── motion.css             ← 16 Duration + 5 Easing
│   └── state.css              ← 交互状态透明度 + .state-layer utility
├── components/           ← 基础组件（基于 Token 实现）
│   ├── Button/Button.tsx
│   ├── Input/Input.tsx
│   ├── Card/Card.tsx
│   ├── Chip/Chip.tsx
│   ├── Dialog/Dialog.tsx
│   └── Snackbar/Snackbar.tsx
├── styles/globals.css    ← Tailwind 入口，@import tokens/index.css
└── index.ts              ← 组件 barrel 导出

apps/storybook/src/stories/
├── DSButton.stories.tsx  ← 组件交互文档
├── DSInput.stories.tsx
├── DSCard.stories.tsx
├── DSChip.stories.tsx
├── DSDialog.stories.tsx
├── DSSnackbar.stories.tsx
└── tokens/               ← Token 总览可视化
    ├── ColorTokens.stories.tsx
    ├── TypeScale.stories.tsx
    ├── ShapeScale.stories.tsx
    ├── Elevation.stories.tsx
    └── MotionTokens.stories.tsx
```

---

## Token 层

所有 Token 以 CSS 自定义属性形式定义，遵循 `--ds-<category>-<name>` 命名规范。通过 `@theme inline` 注册为 Tailwind 工具类，前缀统一加 `ds-`。

### 颜色系统（T-DS-001）

**Source color：** `#6750A4`（MD3 Baseline Purple）

#### CSS 变量命名

```
--ds-color-<role>          例：--ds-color-primary
```

#### Tailwind 工具类

```
bg-ds-<role>               例：bg-ds-primary
text-ds-<role>             例：text-ds-on-primary
border-ds-<role>           例：border-ds-outline
```

#### 全部颜色角色

| 角色                                             | 说明                             |
| ------------------------------------------------ | -------------------------------- |
| `primary` / `on-primary`                         | 主色 / 主色上的文字              |
| `primary-container` / `on-primary-container`     | 主色容器 / 容器文字              |
| `secondary` / `on-secondary`                     | 辅助色                           |
| `secondary-container` / `on-secondary-container` | 辅助色容器                       |
| `tertiary` / `on-tertiary`                       | 第三色                           |
| `tertiary-container` / `on-tertiary-container`   | 第三色容器                       |
| `error` / `on-error`                             | 错误色                           |
| `error-container` / `on-error-container`         | 错误容器                         |
| `surface` / `on-surface`                         | 表面色                           |
| `surface-variant` / `on-surface-variant`         | 表面变体                         |
| `surface-container-*`                            | 容器表面（5 级）                 |
| `inverse-surface` / `inverse-on-surface`         | 反转表面（用于 Snackbar）        |
| `inverse-primary`                                | 反转主色（用于 Snackbar Action） |
| `outline` / `outline-variant`                    | 边框 / 边框变体                  |
| `scrim`                                          | 遮罩（Dialog 背景）              |

#### 主题切换机制

- **Light 模式**：`[data-theme="light"]` 选择器（默认）
- **Dark 模式**：`[data-theme="dark"]` 选择器
- 在根元素设置 `data-theme` 属性即可切换：

```ts
// packages/ui/src/utils/theme.ts
setTheme("dark"); // document.documentElement.setAttribute('data-theme', 'dark')
setTheme("light"); // document.documentElement.setAttribute('data-theme', 'light')
toggleTheme();
```

---

### 视觉比例（T-DS-002）

#### 字体规格（Type Scale）

15 个规格，每条包含 size / line-height / weight / letter-spacing。

| 类别     | 规格                   | Tailwind 类              |
| -------- | ---------------------- | ------------------------ |
| Display  | Large / Medium / Small | `text-display-large` 等  |
| Headline | Large / Medium / Small | `text-headline-large` 等 |
| Title    | Large / Medium / Small | `text-title-large` 等    |
| Body     | Large / Medium / Small | `text-body-large` 等     |
| Label    | Large / Medium / Small | `text-label-large` 等    |

```tsx
// 用法示例
<h1 className="text-display-large">Display Large</h1>
<p className="text-body-medium">Body text</p>
```

> **注意**：Tailwind Merge 会将 `text-ds-<color>` 和 `text-<scale>` 识别为同类而互相覆盖。颜色请改用 `style={{ color: 'var(--ds-color-primary)' }}`。

#### 形状（Shape Scale）

| Token                    | 值     | Tailwind 类       |
| ------------------------ | ------ | ----------------- |
| `--ds-shape-none`        | 0px    | `rounded-ds-none` |
| `--ds-shape-extra-small` | 4px    | `rounded-ds-xs`   |
| `--ds-shape-small`       | 8px    | `rounded-ds-sm`   |
| `--ds-shape-medium`      | 12px   | `rounded-ds-md`   |
| `--ds-shape-large`       | 16px   | `rounded-ds-lg`   |
| `--ds-shape-extra-large` | 28px   | `rounded-ds-xl`   |
| `--ds-shape-full`        | 9999px | `rounded-ds-full` |

> `shape-full` 使用 `9999px` 而非 `50%`，确保非正方形元素不变形为椭圆。

#### 海拔（Elevation）

```tsx
// CSS utility class 直接使用
<div className="elevation-1">Level 1 card</div>
<div className="elevation-3">Level 3 dialog</div>
```

Dark 模式下叠加 surface-tint：

```css
background: color-mix(
  in srgb,
  var(--ds-color-primary) var(--ds-tint-level-1),
  var(--ds-color-surface)
);
```

#### 动效（Motion）

```css
/* Duration: --ds-duration-{short|medium|long|extra-long}-{1-4} */
transition: opacity var(--ds-duration-short-2) var(--ds-easing-standard);

/* Easing curves */
--ds-easing-standard               /* 通用 */
--ds-easing-emphasized-decelerate  /* 进入动画 */
--ds-easing-emphasized-accelerate  /* 离开动画 */
--ds-easing-standard-decelerate
--ds-easing-standard-accelerate
```

> `emphasized` 缓动为三段路径，CSS `cubic-bezier` 无法精确表达，需通过 Web Animations API 或 Framer Motion `useAnimation` 实现。

---

### 状态层（T-DS-003）

MD3 所有交互反馈通过 `::before` 伪元素叠加半透明颜色实现，**纯 CSS，无 JavaScript**。

#### 透明度变量

| 状态               | 变量                            | 值          |
| ------------------ | ------------------------------- | ----------- |
| Hover              | `--ds-state-hover`              | 0.08（8%）  |
| Focus              | `--ds-state-focused`            | 0.10（10%） |
| Active             | `--ds-state-pressed`            | 0.12（12%） |
| Dragged            | `--ds-state-dragged`            | 0.16（16%） |
| Disabled Container | `--ds-state-disabled-container` | 0.12        |
| Disabled Content   | `--ds-state-disabled-content`   | 0.38        |

#### 使用方式

```tsx
// 1. 在元素上添加 state-layer 类
// 2. 通过 CSS 变量指定叠加颜色
<button
  className="state-layer rounded-ds-md bg-ds-primary px-6 py-2.5"
  style={
    {
      "--state-layer-color": "var(--ds-color-on-primary)",
    } as React.CSSProperties
  }
>
  Filled Button
</button>
```

`.state-layer` 自动处理：

- `hover` → 8% 透明叠加
- `focus` → 10% 透明叠加
- `active` → 12% 透明叠加
- `disabled` → 容器 12% 不透明 + 内容 38% 不透明（分层）

---

## 组件层（T-DS-004）

所有组件从 `@jiangui-resume/ui` 导出，路径引用：

```ts
import {
  Button,
  Input,
  Card,
  Chip,
  Dialog,
  Snackbar,
} from "@jiangui-resume/ui";
// 或直接引用
import { Button } from "@jiangui-resume/ui/components/Button/Button";
```

### Button

```tsx
<Button variant="filled">Label</Button>
<Button variant="outlined" size="lg">Label</Button>
<Button variant="fab">+</Button>
<Button variant="filled" loading>Saving...</Button>
<Button variant="text" disabled>Disabled</Button>
```

| Prop       | 类型                                | 默认     |
| ---------- | ----------------------------------- | -------- |
| `variant`  | `filled \| outlined \| text \| fab` | `filled` |
| `size`     | `sm \| md \| lg`                    | `md`     |
| `disabled` | `boolean`                           | —        |
| `loading`  | `boolean`                           | —        |
| `icon`     | `ReactNode`                         | —        |

### Input / TextField

```tsx
<Input
  variant="outlined"
  label="Email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
  onChange={(value) => setEmail(value)}
/>
<Input variant="filled" label="Name" error errorText="Required" />
```

| Prop                           | 类型                      | 默认       |
| ------------------------------ | ------------------------- | ---------- |
| `variant`                      | `filled \| outlined`      | `outlined` |
| `label`                        | `string`                  | 必填       |
| `error`                        | `boolean`                 | —          |
| `errorText`                    | `string`                  | —          |
| `helperText`                   | `string`                  | —          |
| `leadingIcon` / `trailingIcon` | `ReactNode`               | —          |
| `onChange`                     | `(value: string) => void` | —          |

### Card

```tsx
<Card variant="elevated">
  <div className="p-6">Content</div>
</Card>

<Card variant="outlined" clickable onClick={() => router.push('/detail')}>
  <div className="p-6">Clickable card</div>
</Card>
```

| Prop        | 类型                             | 默认       |
| ----------- | -------------------------------- | ---------- |
| `variant`   | `elevated \| filled \| outlined` | `elevated` |
| `clickable` | `boolean`                        | `false`    |

### Chip

```tsx
<Chip variant="filter" label="Dark mode" selected={isDark} onClick={toggle} />
<Chip variant="input" label="Design System" onRemove={() => removeTag()} />
```

| Prop       | 类型                                      | 默认     |
| ---------- | ----------------------------------------- | -------- |
| `variant`  | `assist \| filter \| input \| suggestion` | `assist` |
| `selected` | `boolean`                                 | `false`  |
| `onRemove` | `() => void`                              | —        |

### Dialog

```tsx
const [open, setOpen] = useState(false)

<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm delete"
  description="This action cannot be undone."
  actions={
    <>
      <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="filled" onClick={handleDelete}>Delete</Button>
    </>
  }
/>
```

- 自动焦点陷阱（focus trap），键盘 `Tab` 在对话框内循环
- `Esc` 键触发 `onClose`
- 点击 scrim 遮罩触发 `onClose`
- `aria-modal="true"` 满足无障碍要求

### Snackbar

```tsx
<Snackbar
  open={showSnack}
  message="Changes saved"
  action={{ label: "Undo", onClick: handleUndo }}
  duration={4000}
  onClose={() => setShowSnack(false)}
/>
```

- `duration` 后自动触发 `onClose`（默认 4000ms）
- 背景使用 `inverse-surface`，文字 `inverse-on-surface`，action 用 `inverse-primary`

---

## Storybook 文档（T-DS-005）

```bash
# 启动 Storybook（端口 6006）
cd apps/storybook
pnpm storybook
```

Storybook 组织结构：

```
DS / Base /
  Button      ← 所有变体 + 状态 + Controls 面板
  Input
  Card
  Chip
  Dialog      ← 交互式 open/close 演示
  Snackbar    ← 自动关闭演示

DS / Tokens /
  Color       ← 颜色角色色板（Light/Dark 可切换）
  Type Scale  ← 15 个字体规格对照
  Shape Scale ← 7 个圆角示例
  Elevation   ← 6 个阴影 Level
  Motion      ← Duration 播放动画 + Easing 曲线
```

Toolbar 中可切换 **Light / Dark** 主题，实时预览 Token 变化。

---

## 使用指南

### 在 apps/web 中使用

CSS 已通过 `globals.css → tokens/index.css` 全局引入，无需额外 import。

```tsx
// apps/web/src/app/layout.tsx 已有
import "@jiangui-resume/ui/globals.css";
```

### 颜色使用原则

```tsx
// ✅ 正确：使用 DS Token
<div className="bg-ds-primary-container text-ds-on-primary-container" />
<div style={{ color: 'var(--ds-color-primary)' }} />

// ❌ 错误：硬编码色值
<div className="bg-[#6750A4]" />
<div style={{ color: '#21005D' }} />
```

### 形状使用原则

```tsx
// ✅ 正确
<div className="rounded-ds-md" />   // 12px

// ❌ 错误（绕过 Token）
<div className="rounded-xl" />      // 不受 DS 控制
```

### 动效使用原则

```tsx
// ✅ 正确：引用 Token 变量
style={{ transition: `opacity var(--ds-duration-short-2) var(--ds-easing-standard)` }}

// ✅ 正确：Tailwind arbitrary value 引用变量
className="transition-[opacity] duration-[var(--ds-duration-medium-2)]"
```

---

## 主题切换

```ts
import { setTheme, toggleTheme } from "@jiangui-resume/ui/utils/theme";

// 设置主题
setTheme("dark");
setTheme("light");

// 切换
toggleTheme();

// 获取当前主题
import { getTheme } from "@jiangui-resume/ui/utils/theme";
const current = getTheme(); // 'light' | 'dark'
```

---

## 测试规范

Token 文件和组件的测试位于 `apps/web/src/`（通过 Vitest 在 jsdom 环境运行）：

| 测试文件                                           | 覆盖内容                       |
| -------------------------------------------------- | ------------------------------ |
| `src/lib/__tests__/ds-color-tokens.test.ts`        | 颜色 CSS 变量存在性            |
| `src/lib/__tests__/ds-visual-scale-tokens.test.ts` | 字体/形状/海拔/动效变量        |
| `src/lib/__tests__/ds-state-layer-tokens.test.ts`  | 状态层变量 + `.state-layer` 类 |
| `src/lib/__tests__/ds-storybook-stories.test.ts`   | Story 文件存在性               |
| `src/components/ds/__tests__/Button.test.tsx`      | Button 渲染 + 交互             |
| `src/components/ds/__tests__/Input.test.tsx`       | Input 渲染 + 表单行为          |
| `src/components/ds/__tests__/Card.test.tsx`        | Card 变体 + 可点击模式         |
| `src/components/ds/__tests__/Chip.test.tsx`        | Chip 状态 + 移除               |
| `src/components/ds/__tests__/Dialog.test.tsx`      | Dialog 焦点陷阱 + Esc          |
| `src/components/ds/__tests__/Snackbar.test.tsx`    | Snackbar 计时器 + Action       |

```bash
# 运行所有测试
cd apps/web && pnpm test --run

# 只运行 DS 相关测试
pnpm test --run src/lib/__tests__/ds-
pnpm test --run src/components/ds/
```

---

## 任务历史

| Task     | Phase          | PR  | 状态      |
| -------- | -------------- | --- | --------- |
| T-DS-001 | 颜色系统       | #69 | ✅ Merged |
| T-DS-002 | 视觉比例 Token | #70 | ✅ Merged |
| T-DS-003 | 状态层系统     | —   | ✅ Merged |
| T-DS-004 | 基础组件库     | #71 | ✅ Merged |
| T-DS-005 | Storybook 文档 | #72 | ✅ Merged |

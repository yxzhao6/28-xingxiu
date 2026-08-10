<!-- Generated entirely by the agent -->

# feat(28-xingxiu): 新增二十八星宿可点击 web prototype

## Summary

本次改动落地了「唤宿」可点击 Web prototype，产品方向为「宿命图鉴 × 每日值宿 × 轻问事」。用户可输入公历生日揭示本命宿、查看中国黄历今日值宿、进行单宿问事，并浏览全部二十八宿图鉴。本命与今日均走中国传统 28 宿黄历推算，抽宿明确标注为现代互动玩法。

## What changed

- **Scaffold / tooling：** 在 `web/` 下创建 Vite + React + TypeScript 应用；配置 Vitest、jsdom、Testing Library、oxlint；字体通过 `@fontsource` 本地打包。
- **Domain / data：** 新增 `Mansion` 类型与完整 28 宿数据（含四象、七曜、禽星与原型解读文案）；禽星用字采用通书形式（胃土雉、壁水貐）。
- **Calendar adapter：** `getMansionForSolarDate` / `formatLocalDate` 基于 `lunar-typescript` 的 `Lunar.getXiu()`；覆盖 anchor、sequence、weekday、full-coverage 等 invariants。
- **Routing / persistence：** React Router 五条路由、`ProtectedRoute`、`localStorage` profile（`xingxiu.profile.v1`）。
- **Screens：** Onboarding、Today、Draw、Gallery、Detail；星宿印苏醒动效；底部导航。
- **Visual system：** 「新中式夜游庙会 × 星宿苏醒」色板与 CSS tokens；`prefers-reduced-motion` 支持。
- **Docs：** 更新根 `README.md` 的启动方式、文化边界与 prototype 局限。

## How to run

```bash
cd web
npm install
npm run dev
```

路由：`/onboarding`、`/today`、`/draw`、`/gallery`、`/gallery/:mansionId`

## Verification

实际命令结果（2026-08-10）：

```text
npm run lint      # oxlint — exit 0
npm run test:run  # Test Files 10 passed (10); Tests 28 passed (28)
npm run build     # tsc -b && vite build — exit 0
```

手动浏览器冒烟（`http://127.0.0.1:5173`）：

- 清空 localStorage 后进入 onboarding，展示品牌「唤宿」
- 提交 `1986-05-29`，揭示 `斗木獬`，含「按出生当日值宿」
- 进入 Today，显示当日值宿与本命条
- Draw 结果含「现代互动玩法」与免责声明
- Gallery 共 28 宿；青龙筛选为 7；详情页可打开（如 `心月狐`）
- 图鉴可见 `壁水貐`、`斗木獬`、`井木犴`、`觜火猴`

文化 grep：`宿曜|二十七|业胎|安坏|合牛入女|Foto` 与 `28-xingxiu` 在 `web/src` 中无匹配。

## Cultural and algorithmic decisions

- 本命与今日均通过中国黄历 28 宿 `getXiu()` 解析。
- 本命宿 = 出生当日值宿，界面标注「按出生当日值宿」。
- 抽宿为现代互动玩法，不代表传统占法。
- 排除 27 宿 / 日本宿曜 / 合牛入女。
- 胃土雉、壁水貐为通书展示用字，不与库的 `getAnimal()` 异体对齐。

## Out of scope

三宿阵、分享卡导出、完整「我的」页、账号/后端、关系配对、AI 解读、PWA/上架。

## Review focus

1. `lib/calendar28.ts` 的日期解析与时区安全
2. 28 宿解读文案语气（避免恐吓与绝对预言）
3. 四象筛选 tabs 的无障碍（`aria-pressed`、键盘）

## Known limitations

- 解读文案为 prototype 级，未经民俗顾问审核
- 产品名「唤宿」为暂定工作名（`src/domain/brand.ts`）
- 仅 localStorage，无服务端持久化
- production bundle 因完整中文字体较大（构建有 chunk size 警告）

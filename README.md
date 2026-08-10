# 唤宿

中国二十八星宿可点击 Web prototype：宿命图鉴 × 每日值宿 × 轻问事。

> 工作展示名「唤宿」定义在 `web/src/domain/brand.ts`，便于整体替换。

## 快速开始

```bash
cd web
npm install
npm run dev
```

## 常用命令

```bash
cd web
npm run test:run   # Vitest
npm run lint       # oxlint
npm run build      # TypeScript + Vite production build
```

## 路由

| 路径 | 说明 |
|------|------|
| `/onboarding` | 输入公历生日，揭示本命宿（按出生当日值宿） |
| `/today` | 中国黄历 · 今日值宿 |
| `/draw` | 单宿问事（现代互动玩法） |
| `/gallery` | 二十八宿图鉴 |
| `/gallery/:mansionId` | 宿详情 |

## 算法与文化边界

- **本命**与**今日值宿**均通过 `lunar-typescript` 的中国黄历 `Lunar.getXiu()` 解析二十八宿。
- **本命宿**在本原型中定义为「出生当日的黄历值宿」，界面标注「按出生当日值宿」。
- **抽宿**明确标注为「现代互动玩法」，用于灵感与自我觉察，不代表传统占法。
- 不采用日本宿曜、二十七宿或「合牛入女」体系。
- 禽星用字采用通行通书：**胃土雉**、**壁水貐**（历法库返回的异体字不作展示依据）。

## Prototype 局限

- 解读文案为原型级自撰，未经民俗顾问审核。
- 仅浏览器 `localStorage` 持久化，无账号与后端。
- 不含三宿阵、分享卡导出、关系配对。
- 图鉴角色卡支持晋城府城玉皇庙彩塑照片背景；请将已获授权的图片放入 `web/public/yuhuangmiao/`（命名见该目录 README）。缺图时显示占位。

文物苏醒灵感参见仓库根目录原始备注。

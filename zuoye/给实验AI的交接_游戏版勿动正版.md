# 强制每日作业（zuoye）· 给实验 AI 的交接

> **硬约束**：正版目录 `tools/fuxi/zuoye/`（`index.html` / `wrong.html` / `data.js`）**禁止改坏**。  
> 做游戏版时：**整目录复制**成实验目录（建议名 `zuoye-game/` 或 `zuoye-lab/`），只在副本里改。  
> 远程正版：`https://lvbaoguo.github.io/fuxi/zuoye/`（仓库 `lvbaoguo/fuxi`）。本地：`file://.../tools/fuxi/zuoye/index.html`。

---

## 1. 这是什么

给自考前背题用的**本地优先**网页（无后端）：

| 入口 | 文件 | 作用 |
|:---|:---|:---|
| 每日作业 | `index.html` + `data.js` | 每日选择题 + 简答精简背诵 |
| 错题本 | `wrong.html` | 选择/简答错题；连对 3 次移出 |
| 题库数据 | `data.js` → `window.ZUOYE_BANK` | 全部题目与精简清单 |

进度存在浏览器 **localStorage**（键前缀类似 `pansan2-zuoye-forced-progress`；错题另有键）。  
跨设备：页顶 **导出**（文本复制 JSON / 下载 JSON 文件）→ 另一端 **导入**粘贴合并。

考试相关（写在 data 里）：考期约 **2026-10-24/25**，目标分 **60**，去年参考 history≈53 / xi≈54。

---

## 2. 当前内容规模（正版精简包）

| 模块 | 数量 | 说明 |
|:---|:---|:---|
| 近代史简答精简 | **30** | `shortKeep.history` |
| 习思想简答精简 | **36** | `shortKeep.xi`，**18 章 × 每章 2 道母题** |
| 简答全库（含未精简） | shortById ≈ **114** | 网页精简入口只背 keep 清单 |
| 选择题 | 近代史约 402 + 习思想约 445 | 按章挂在 `mc.history` / `mc.xi`；每日排期在 `schedule` |
| `shortScheduleV` | **6** | 升版本会刷新钉死的简答日清单 |

采分点口径（已定）：**简述核**——可默写短句，不照抄老师长文；禁止车轱辘复读题干、禁止「对照教材…」占位。  
网页真正读答案用 **`BANK.shortById[id]`**（改 points 必须同步 `short` 与 `shortById`）。

---

## 3. 正版已有功能（游戏版可复用，勿删正版）

### 入口
- **每日选择**：按日期做选择题（过关逻辑严格）
- **简答背诵**：近代史 / 习思想 Tab，走精简 30+36，不按「每日简答条」卡时间（简答独立入口）

### 选择题
- 点选选项、提交判定、解析
- 答对可连跳；乱序/点答等开关（状态进导出）
- 错题进错题本

### 简答
- 默写框 + **提交**判分（关键词采分点命中）
- **答案 / 收起**：偷看采分点
- **提示**：分步少泄题——先句首 4 字，再点才出 ≤4 字线索
- **背题**：默认展开采分点，上下题保持
- **上题 / 下题 / 重来**（重来清全部简答文稿+过关，不清选择题）
- 背景（可折叠大白话/why）
- 采分点**纯黑无黄标**（展示）；判分仍用关键词抽取

### 其它
- 日导航、今日、进度条、过关锁提示
- 导出：弹出「导出文本」|「导出 JSON 文件」
- 导入：粘贴进度 JSON 合并
- 手机：`viewport` 禁双击放大 + `touch-action: manipulation`
- 远程推送习惯：改 zuoye 正版后用户常要求直接 `push-pages` 上 GitHub Pages

---

## 4. 关键数据结构（实验版复制时别拆乱）

```text
ZUOYE_BANK
  examDates / mustReadyBy / goal / lastYear / names
  mc: { history: {章: [题...]}, xi: {...} }
  short: { history: {章: [题...]}, xi: {...} }   // 章节列表
  shortById: { id: 题对象 }                        // 运行时主键
  shortKeep: { history: [id...], xi: [id...] }     // 精简必背
  schedule: [ { date, ... } ]                      // 每日排期
  shortScheduleV: number
```

简答题对象常见字段：`id, course, ch, text, points[], plain[], summary, lead, why, source`。  
进度导出 `type: "fuxi-zuoye-forced-progress"`，`v: 7`（含 mcOk / shortOk / shortDraft / wrong* / pinnedPlans 等）。

---

## 5. 对话里已定的产品决策（摘要）

1. 简答从全量砍到及格精简：近代史 30；习思想 48→40→**36（每章 2 母题）**。  
2. 提示不要一次甩半句答案；采分点不要黄标干扰背诵。  
3. 「不会」已改成 **背题模式**。  
4. 采分点质量：补过占位/过短（中国梦本质、中华文明五特性、法治原则等）；压成简述核，不堆老师全文。  
5. 正版稳定背题优先；**游戏化另起实验目录**，通过后再考虑是否合并。

---

## 6. 给 DeepSeek 的实验任务建议（可直接贴）

```text
目标：在「强制每日作业」网页上做游戏化实验版，提高背题动力。

约束：
1. 禁止修改正版目录 tools/fuxi/zuoye/ 里正在用的 index.html / wrong.html / data.js。
2. 先复制整目录为 tools/fuxi/zuoye-game/（或 zuoye-lab/），所有改动只在副本。
3. 题库与精简清单复用同一份 data.js（可复制，勿改坏正版文件）。
4. 保留：导出/导入进度、错题本思路、简答默写+采分点判分、近代史30+习思想36 精简包。
5. 技术：纯静态 HTML/CSS/JS，可 file:// 打开，可部署 GitHub Pages 子路径。
6. 游戏化方向任选但要可落地：例如答题得分/连击/关卡地图/体力、简答过关解锁下一关、错题挑战 BOSS；不要做成花哨幻灯，核心仍是「会背会写」。
7. 先出：目录复制方案 + 最小可玩一关（选择题或简答其一）原型，再扩展。

正版路径：/Users/admin/Downloads/daima/zidonghua1/tools/fuxi/zuoye/
远程：https://lvbaoguo.github.io/fuxi/zuoye/
```

---

## 7. 建议你怎么开场和新 AI 聊

1. 把**本文件全文**贴给它（或 `@` 本文件）。  
2. 明确一句：**只许在副本 zuoye-game 动刀**。  
3. 说明你要的动力机制（例如：过关升级、每日任务像游戏日课、错题副本）。  
4. 让它先列「游戏循环」再写代码，避免一上来大改 UI 把背题流程弄没。

---

*整理日期：2026-10-20 · 正版最近相关提交含导出二选一、采分点简述核等（以本地 git 为准）。*

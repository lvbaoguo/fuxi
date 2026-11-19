# 小学英语（yingyu）

和近代史 / 作业页分开。自己的文件夹：`tools/fuxi/yingyu/`。入口只有这一个网页，不要从 fuxi 首页中转。

本地：打开 `index.html`  
线上：`/yingyu/`（**等你说推再推**）

顶上自选（顺序：笔记 → 词库 → 主题 → 音标库）：

- **笔记版**：自己收集的单词 / 语句
- **词库**：按词性浏览；本地 = `lexicon.js` + `lexicon-extra.js` + `lexicon-cet4.js` + `lexicon-gaokao.js`；美音 `lexicon-audio.js`（脚本 `scripts/probe_lexicon_audio.py`）
- **年级阶梯（levelNote）**：小学高频 → 初中常见 → 高中常见 → **大学四级** → 大学六级 → 考研英语 → 雅思常见（再往上可选托福/GRE）
- **查词音标**：本地优先；外网词典常空 phonetics 时用 Datamuse 发音兜底
- **主题**：默认 / 雾灰 + 字号
- **音标库**：长短元音 / 双元音 / 辅音表；喇叭播例词美音（`ipa.js`）

查中译：先本地词库 → 在线翻译兜底。本地没有且网络/接口失败时会显示「未填」，可点字段手改。

## 音标库
按类浏览音标，点喇叭听例词（跟笔记同一套快速/慢速/超慢）。

## 笔记版
- **单词**：点「查询」→ 查词后弹出标签选择（已有 / 自定义）再收藏。
- **标签**：横滑「全部 + 自定义标签」，默认收起；点标签展开查看。标签名可自建。
- **语句**：问句 + 回答 + 中译，同样按标签存放。
- **喇叭**：真人词典 mp3（候选 URL 短超时轮询）。键：`fuxi-yingyu-notes-v1`、`fuxi-yingyu-note-tags-v1`。
- **同步（抄作业页）**：导出文本 / 导出 JSON / **上传** → 仓库 `yingyu/notes-latest.json`；另一端导入合并或「从云端覆盖」。本机空笔记时自动拉云端；有 `syncVer` 对账。
- **文案要短**：中译 / 课本只到「中·三年级上」（不要 Unit 名）；不展示「来源」；少啰嗦标签。

## 结构
- `ipa.js` — 音标库数据
- `lexicon.js` / `lexicon-extra.js` / `lexicon-cet4.js` / `lexicon-gaokao.js` / `lexicon-audio.js` — 词库与美音
- `data.js` — 课本年级词表（词库课本标注仍用）
- `index.html` — 笔记 / 词库 / 音标库

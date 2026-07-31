# 星际裂变 · 合成路线

分端两套页面（独立 URL，互不影响）：

| 端 | 目录 | 链接 |
|:---|:---|:---|
| 手机 | `m/` | https://lvbaoguo.github.io/fuxi/xingjiliebian/m/ |
| 电脑 | `pc/` | https://lvbaoguo.github.io/fuxi/xingjiliebian/pc/ |

根目录 `index.html` 会按 UA 自动跳到对应端；加 `?stay=1` 可停在选择页。

```
xingjiliebian/
  index.html   # 入口 / 自动分流
  m/index.html # 手机：简洁搜索 + 路线
  pc/index.html# 电脑：搜索 + 复位等
```

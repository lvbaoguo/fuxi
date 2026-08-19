/**
 * 科目一题库 500 题（难～最难）
 * 依据：公安部令第163号 + 道路交通安全法常见考点
 * 题型：single 四选一 / multi 多选 / tf 正确错误 / 含图题
 * 改题前必读：.cursor/rules/jiakao-163-scoring.mdc
 */
const QUESTIONS = 
[
  {
    "family": "score",
    "type": "single",
    "text": "普通路逆行，一次记多少分？",
    "options": [
      "6分",
      "3分",
      "9分",
      "1分"
    ],
    "answer": 1,
    "explain": "普通路逆行记3分；高速/快速路逆行才是12分。",
    "id": 1
  },
  {
    "family": "speed",
    "type": "single",
    "text": "驾驶普通小型汽车在一般道路上超过规定时速未达20%，一次记多少分？",
    "options": [
      "不记分",
      "3分",
      "6分",
      "1分"
    ],
    "answer": 0,
    "explain": "普通小车+普通路+未达20%：163号令无记分项。",
    "id": 2
  },
  {
    "family": "m-fine",
    "type": "multi",
    "text": "下列罚款档正确的有：",
    "options": [
      "普通违章20～200",
      "无证200～2000",
      "酒驾20～200",
      "酒驾1000～2000"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explain": "酒驾不是20～200。",
    "id": 3
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶小型汽车在一般道路超过规定时速20%以上未达50%」记分，正确的是：",
    "options": [
      "只罚款不记分",
      "一律12分",
      "一律不记分",
      "3分"
    ],
    "answer": 3,
    "explain": "应记3分。",
    "id": 4
  },
  {
    "family": "score",
    "type": "single",
    "text": "准驾车型不符，一次记多少分？",
    "options": [
      "1分",
      "6分",
      "9分",
      "3分"
    ],
    "answer": 2,
    "explain": "第九条第五项：准驾不符记9分。",
    "id": 5
  },
  {
    "family": "m9",
    "type": "multi",
    "text": "下列一次记9分的有：",
    "options": [
      "闯红灯",
      "准驾不符",
      "故意污损号牌",
      "未悬挂号牌"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "闯红灯6分。",
    "id": 6
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示：",
    "options": [
      "禁止停车",
      "禁止驶入",
      "解除限制",
      "禁止向左转弯"
    ],
    "answer": 3,
    "explain": "禁止左转。",
    "image": "assets/sign-no-left.svg",
    "imageAlt": "禁止向左转弯",
    "id": 7
  },
  {
    "family": "misc-tf",
    "type": "tf",
    "text": "普通小车高速超速未达20%记6分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "未达20%不记分。",
    "id": 8
  },
  {
    "family": "sign-x-tf",
    "type": "tf",
    "text": "图中标志（情形）的含义是：夜间照明不良应开远光。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "夜间照明。",
    "id": 9
  },
  {
    "family": "sign-x-tf",
    "type": "tf",
    "text": "图中标志（情形）的含义是：这是警告标志。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "警告类标志。",
    "id": 10
  },
  {
    "family": "right-tf",
    "type": "tf",
    "text": "驾驶机动车可以在人行横道上超车。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "人行横道、路口等禁超车。",
    "id": 11
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "普通小客车连续驾驶超4小时未休息，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为不记分。163号令未列普通小客车疲劳记分。",
    "id": 12
  },
  {
    "family": "cmp",
    "type": "single",
    "text": "下列记分对应正确的是：",
    "options": [
      "两者都记不记分（刑事）",
      "酒驾不记分（刑事），醉驾12分",
      "两者都记12分",
      "酒驾12分，醉驾不记分（刑事）"
    ],
    "answer": 3,
    "explain": "酒驾→12分；醉驾→不记分（刑事）。",
    "id": 13
  },
  {
    "family": "right-m",
    "type": "multi",
    "text": "下列地点不得超车：",
    "options": [
      "单向两车道畅通路段",
      "窄桥",
      "弯道",
      "铁路道口"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "特定危险地点禁超车。",
    "id": 14
  },
  {
    "family": "drink-tf",
    "type": "tf",
    "text": "醉酒驾驶机动车，一次记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错。醉驾不记分，直接刑事+吊销。",
    "id": 15
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "快速路逆行，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为12分。第八条第六项。",
    "id": 16
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "高速倒车，一次记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第八条第六项。",
    "id": 17
  },
  {
    "family": "crime",
    "type": "single",
    "text": "造成交通事故后逃逸，尚不构成犯罪的，一次记：",
    "options": [
      "6分或12分（看伤情）",
      "9分",
      "3分",
      "不记分"
    ],
    "answer": 0,
    "explain": "轻微伤/财产损失逃逸6分；轻伤以上逃逸12分。",
    "id": 18
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶危险物品运输车辆在一般道路上超过规定时速50%以上，一次记9分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "危化品普通路超50%记9分。",
    "id": 19
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在高速公路超过规定时速50%以上」，正确的有：",
    "options": [
      "可能并处罚款",
      "记12分",
      "一定吊销驾驶证",
      "属于超速违法"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explain": "记12分；是否吊销看情节，不是一律。",
    "id": 20
  },
  {
    "family": "fine-tf",
    "type": "tf",
    "text": "伪造变造或使用伪造变造号牌，罚款档为：200元以上2000元以下。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "伪造比遮挡重：200～2000，可拘留，记12分。",
    "id": 21
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "故意污损号牌，一次记9分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "遮挡、污损都是9分。",
    "id": 22
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "高速或快速路违法停车，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为9分。第九条第三项。",
    "id": 23
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶校车在一般道路上超过规定时速10%以上未达20%，一次记6分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错。正确应为1分。第十二条：中型以上/校车/危化品普通路超10%～20%记1分。",
    "id": 24
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "故意遮挡号牌，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为9分。第九条第四项：遮挡污损记9分。",
    "id": 25
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "闯红灯（不按信号灯指示通行），一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为6分。第十条第八项：闯红灯记6分。",
    "id": 26
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶公路客运汽车在一般道路超过规定时速50%以上，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "应为9分。",
    "id": 27
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶小型汽车在城市快速路超过规定时速50%以上」记分，正确的是：",
    "options": [
      "12分",
      "只罚款不记分",
      "一律12分",
      "一律不记分"
    ],
    "answer": 0,
    "explain": "应记12分。",
    "id": 28
  },
  {
    "family": "m12",
    "type": "multi",
    "text": "下列属于一次记12分的有：",
    "options": [
      "伪造号牌",
      "禁令标志",
      "酒驾",
      "高速倒车"
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explain": "禁令标志1分。",
    "id": 29
  },
  {
    "family": "cmp-tf",
    "type": "tf",
    "text": "高速逆行记3分，普通路逆行记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "记反了。正确：高速逆行12分，普通路逆行3分。",
    "id": 30
  },
  {
    "family": "right",
    "type": "single",
    "text": "车辆通过有灯光信号的路口，遇放行信号时：",
    "options": [
      "鸣喇叭强制通行",
      "可加速抢过",
      "先让先被放行的车辆行驶",
      "可变更车道穿插"
    ],
    "answer": 2,
    "explain": "放行信号下仍应让已在路口内车辆。",
    "id": 31
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "拨打接听手持电话，一次记3分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第十一条第六项：手持电话记3分。",
    "id": 32
  },
  {
    "family": "speed",
    "type": "single",
    "text": "驾驶普通小型汽车在城市快速路上超过规定时速50%以上，一次记多少分？",
    "options": [
      "12分",
      "3分",
      "不记分",
      "6分"
    ],
    "answer": 0,
    "explain": "第八条：快速路超50%记12分。",
    "id": 33
  },
  {
    "family": "score",
    "type": "single",
    "text": "占用应急车道行驶，一次记多少分？",
    "options": [
      "6分",
      "9分",
      "3分",
      "1分"
    ],
    "answer": 0,
    "explain": "第十条第十一项。",
    "id": 34
  },
  {
    "family": "fine-tf",
    "type": "tf",
    "text": "驾驶报废机动车上路，罚款档为：200元以上2000元以下并吊销。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "报废车同拼装车。",
    "id": 35
  },
  {
    "family": "pax",
    "type": "single",
    "text": "校车载人超过核定人数20%以上，一次记多少分？",
    "options": [
      "12分",
      "6分",
      "1分",
      "3分"
    ],
    "answer": 0,
    "explain": "第八条第四项。",
    "id": 36
  },
  {
    "family": "misc-tf",
    "type": "tf",
    "text": "雨天路面湿滑，应降低车速。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "安全驾驶基本原则。",
    "id": 37
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "普通小客车连续驾驶超4小时未休息，一次记不记分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "163号令未列普通小客车疲劳记分。",
    "id": 38
  },
  {
    "family": "sign-x",
    "type": "single",
    "text": "图中所示表示：",
    "options": [
      "这是旅游标志",
      "这是禁令标志",
      "这是警告标志",
      "这是指示标志"
    ],
    "answer": 1,
    "explain": "禁令类标志。",
    "image": "assets/sign-no-entry.svg",
    "imageAlt": "禁令类标志",
    "id": 39
  },
  {
    "family": "fine-tf",
    "type": "tf",
    "text": "一般道路通行违法，罚款档为：20元以上200元以下。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "普通违章口袋档：警告或20～200。",
    "id": 40
  },
  {
    "family": "sign-x",
    "type": "single",
    "text": "图中所示表示：",
    "options": [
      "最低速度",
      "限制速度",
      "解除限速",
      "建议速度"
    ],
    "answer": 1,
    "explain": "限制速度。",
    "image": "assets/sign-speed-40.svg",
    "imageAlt": "限制速度",
    "id": 41
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在高速公路超过规定时速50%以上，一次记：",
    "options": [
      "3分",
      "1分",
      "12分",
      "6分"
    ],
    "answer": 2,
    "explain": "驾驶小型汽车+高速公路+超过规定时速50%以上→12分。",
    "id": 42
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示：",
    "options": [
      "黄灯亮时，已越过停止线的车辆可以继续通行",
      "解除限制",
      "禁止停车",
      "禁止驶入"
    ],
    "answer": 0,
    "explain": "黄灯：已过线可继续，未过线应停。",
    "image": "assets/light-yellow.svg",
    "imageAlt": "黄灯亮时，已越过停止线的车辆可以继续通行",
    "id": 43
  },
  {
    "family": "hard",
    "type": "single",
    "text": "驾驶机动车在道路上行驶时，机动车驾驶人未按规定系安全带，一次记：",
    "options": [
      "3分",
      "6分",
      "不记分",
      "1分"
    ],
    "answer": 3,
    "explain": "2022改革后安全带1分。",
    "id": 44
  },
  {
    "family": "cargo",
    "type": "single",
    "text": "驾驶机动车载运爆炸物品等危险物品，未按指定时间路线速度行驶，记：",
    "options": [
      "12分",
      "3分",
      "6分",
      "9分"
    ],
    "answer": 2,
    "explain": "第十条第五项：6分。",
    "id": 45
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶校车在高速公路上超过规定时速20%以上，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错。正确应为12分。校车高速超20%记12分。",
    "id": 46
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "载货汽车连续驾驶超4小时未休息，一次记3分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第十一条第十四项。",
    "id": 47
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶危险物品运输车辆在高速公路上超过规定时速20%以上，一次记12分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "危化品高速超20%记12分。",
    "id": 48
  },
  {
    "family": "score",
    "type": "single",
    "text": "城市快速路不按规定车道行驶，一次记多少分？",
    "options": [
      "6分",
      "1分",
      "9分",
      "3分"
    ],
    "answer": 3,
    "explain": "同高速，记3分。",
    "id": 49
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "高速公路不按规定车道行驶，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为3分。第十一条第三项。",
    "id": 50
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶小型汽车在一般道路超过规定时速50%以上，一次记6分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "正确。",
    "id": 51
  },
  {
    "family": "sign-x",
    "type": "single",
    "text": "图中所示表示：",
    "options": [
      "注意行人",
      "禁止行人",
      "人行天桥",
      "人行横道"
    ],
    "answer": 3,
    "explain": "人行横道。",
    "image": "assets/sign-crosswalk.svg",
    "imageAlt": "人行横道",
    "id": 52
  },
  {
    "family": "misc-tf",
    "type": "tf",
    "text": "通过铁路道口时，应减速或停车瞭望。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "确认安全后方可通过。",
    "id": 53
  },
  {
    "family": "right",
    "type": "single",
    "text": "在交叉路口直行遇对面车辆左转，一般应：",
    "options": [
      "左转车让直行车先行",
      "右转车优先",
      "互相抢行",
      "加速抢行"
    ],
    "answer": 0,
    "explain": "转弯车让直行车。",
    "id": 54
  },
  {
    "family": "sign-x-tf",
    "type": "tf",
    "text": "图中标志（情形）的含义是：最低速度。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为「限制速度」。",
    "id": 55
  },
  {
    "family": "score",
    "type": "single",
    "text": "载货汽车连续驾驶超4小时未休息，一次记多少分？",
    "options": [
      "3分",
      "1分",
      "6分",
      "9分"
    ],
    "answer": 0,
    "explain": "第十一条第十四项。",
    "id": 56
  },
  {
    "family": "sign-x-tf",
    "type": "tf",
    "text": "图中标志（情形）的含义是：禁止向右转弯。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为「禁止向左转弯」。",
    "id": 57
  },
  {
    "family": "sign-x-tf",
    "type": "tf",
    "text": "图中标志（情形）的含义是：红灯禁止通行。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "红灯，禁止通行。",
    "id": 58
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶公路客运汽车在一般道路超过规定时速50%以上，一次记：",
    "options": [
      "9分",
      "6分",
      "3分",
      "1分"
    ],
    "answer": 0,
    "explain": "驾驶公路客运汽车+一般道路+超过规定时速50%以上→9分。",
    "id": 59
  },
  {
    "family": "cargo-tf",
    "type": "tf",
    "text": "货车载物超过最大允许总质量100%以上记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错。163号令超载50%以上记6分，无12分超载档。",
    "id": 60
  },
  {
    "family": "score",
    "type": "single",
    "text": "危险物品运输车辆连续驾驶超4小时未休息，一次记多少分？",
    "options": [
      "3分",
      "9分",
      "1分",
      "6分"
    ],
    "answer": 1,
    "explain": "危化品疲劳记9分。",
    "id": 61
  },
  {
    "family": "hard",
    "type": "single",
    "text": "不按规定安装机动车号牌，一次记：",
    "options": [
      "12分",
      "9分",
      "1分",
      "3分"
    ],
    "answer": 3,
    "explain": "安装不当3分；遮挡/未悬挂9分。",
    "id": 62
  },
  {
    "family": "lic",
    "type": "single",
    "text": "科目一考试有多少道题？",
    "options": [
      "120",
      "100",
      "50",
      "80"
    ],
    "answer": 1,
    "explain": "科目一100题。",
    "id": 63
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶中型客车在高速公路超过规定时速20%以上，一次记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "正确。",
    "id": 64
  },
  {
    "family": "drink-m",
    "type": "multi",
    "text": "酒驾可能同时出现的后果有：",
    "options": [
      "直接判处拘役",
      "暂扣驾驶证6个月",
      "罚款1000～2000元",
      "记12分"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "酒驾行政处罚+记分；拘役是醉驾。",
    "id": 65
  },
  {
    "family": "m3",
    "type": "multi",
    "text": "下列属于一次记3分的有：",
    "options": [
      "手持电话",
      "不避让校车",
      "不让行人",
      "遮挡号牌"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "遮挡9分。",
    "id": 66
  },
  {
    "family": "score",
    "type": "single",
    "text": "违反禁令标志指示，一次记多少分？",
    "options": [
      "6分",
      "3分",
      "1分",
      "9分"
    ],
    "answer": 2,
    "explain": "第十二条第四项：禁令标志记1分。",
    "id": 67
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶小型汽车在一般道路超过规定时速50%以上」记分，正确的是：",
    "options": [
      "一律12分",
      "一律不记分",
      "6分",
      "只罚款不记分"
    ],
    "answer": 2,
    "explain": "应记6分。",
    "id": 68
  },
  {
    "family": "m-escape",
    "type": "multi",
    "text": "逃逸记分正确的有：",
    "options": [
      "轻伤以上逃逸记12分",
      "财产损失逃逸记6分",
      "一律记12分",
      "轻微伤逃逸记6分"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explain": "不是一律12分。",
    "id": 69
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶中型客车在高速公路超过规定时速20%以上」，正确的有：",
    "options": [
      "记12分",
      "属于超速违法",
      "一定吊销驾驶证",
      "可能并处罚款"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explain": "记12分；是否吊销看情节，不是一律。",
    "id": 70
  },
  {
    "family": "hwy",
    "type": "single",
    "text": "高速公路上最高时速不得超过：",
    "options": [
      "110公里",
      "100公里",
      "130公里",
      "120公里"
    ],
    "answer": 3,
    "explain": "高速最高120（标志另有规定除外）。",
    "id": 71
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在高速公路超过规定时速20%以上未达50%，一次记：",
    "options": [
      "1分",
      "6分",
      "9分",
      "3分"
    ],
    "answer": 1,
    "explain": "驾驶小型汽车+高速公路+超过规定时速20%以上未达50%→6分。",
    "id": 72
  },
  {
    "family": "m-fog",
    "type": "multi",
    "text": "雾天高速正确做法有：",
    "options": [
      "开远光高速行驶",
      "开启雾灯",
      "开启危险报警闪光灯",
      "能见度<50米尽快驶离"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "雾天不用远光硬开。",
    "id": 73
  },
  {
    "family": "score",
    "type": "single",
    "text": "不按规定安装号牌，一次记多少分？",
    "options": [
      "1分",
      "6分",
      "9分",
      "3分"
    ],
    "answer": 3,
    "explain": "第十一条第十项：安装不当记3分，不是9分。",
    "id": 74
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶小型汽车在高速公路超过规定时速50%以上，一次记12分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "正确。",
    "id": 75
  },
  {
    "family": "cmp-tf",
    "type": "tf",
    "text": "手持电话记1分，未系安全带记3分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "记反了。正确：手持电话3分，未系安全带1分。",
    "id": 76
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "高速公路低于规定最低时速，一次记3分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第十一条第十五项。",
    "id": 77
  },
  {
    "family": "m-speed",
    "type": "multi",
    "text": "普通小车超速记分正确的有：",
    "options": [
      "普通路50%以上记6分",
      "高速50%以上记12分",
      "高速20%～50%记12分",
      "普通路20%～50%记3分"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explain": "高速20%～50%是6分。",
    "id": 78
  },
  {
    "family": "hard-tf",
    "type": "tf",
    "text": "中型货车在普通道路超速50%以上，记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，记9分。",
    "id": 79
  },
  {
    "family": "sign-tf",
    "type": "tf",
    "text": "图中标志（或情形）表示：禁止通行。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "表示禁止一切车辆和行人通行。",
    "id": 80
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "造成致人轻伤以上交通事故后逃逸（尚不构成犯罪），一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为12分。第八条第二项。",
    "id": 81
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "危险物品运输车辆连续驾驶超4小时未休息，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为9分。危化品疲劳记9分。",
    "id": 82
  },
  {
    "family": "sign-x-tf",
    "type": "tf",
    "text": "图中标志（情形）的含义是：停车让行。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为「减速让行」。",
    "id": 83
  },
  {
    "family": "light-tf",
    "type": "tf",
    "text": "驾驶机动车不按规定使用灯光，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第十二条第三项。",
    "id": 84
  },
  {
    "family": "m6b",
    "type": "multi",
    "text": "下列一次记6分的还有：",
    "options": [
      "禁令标志",
      "轻微伤逃逸",
      "暂扣期间驾车",
      "普通小车高速超20%～50%"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "禁令1分。",
    "id": 85
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在城市快速路超过规定时速50%以上，一次记：",
    "options": [
      "3分",
      "12分",
      "1分",
      "6分"
    ],
    "answer": 1,
    "explain": "驾驶小型汽车+城市快速路+超过规定时速50%以上→12分。",
    "id": 86
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶中型客车在高速公路超过规定时速20%以上，一次记：",
    "options": [
      "12分",
      "1分",
      "6分",
      "3分"
    ],
    "answer": 0,
    "explain": "驾驶中型客车+高速公路+超过规定时速20%以上→12分。",
    "id": 87
  },
  {
    "family": "drink",
    "type": "single",
    "text": "醉酒驾驶营运机动车，多少年内不得重新取得驾驶证？",
    "options": [
      "终生",
      "2年",
      "10年",
      "5年"
    ],
    "answer": 2,
    "explain": "醉驾营运车：吊销，10年内不得重新取得；再醉驾营运则终生禁驾。",
    "id": 88
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在一般道路超过规定时速50%以上，一次记：",
    "options": [
      "3分",
      "1分",
      "9分",
      "6分"
    ],
    "answer": 3,
    "explain": "驾驶小型汽车+一般道路+超过规定时速50%以上→6分。",
    "id": 89
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶小型汽车在高速公路超过规定时速50%以上，一次记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "正确。",
    "id": 90
  },
  {
    "family": "lic",
    "type": "single",
    "text": "驾驶证遗失、损毁，应向哪里申请补发？",
    "options": [
      "保险公司",
      "派出所",
      "车辆管理所",
      "任意交警队路边"
    ],
    "answer": 2,
    "explain": "向核发地车辆管理所申请补发。",
    "id": 91
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶普通小型汽车在一般道路上超过规定时速20%以上未达50%，一次记3分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第十一条：普通小车普通路超20%～50%记3分。",
    "id": 92
  },
  {
    "family": "fine",
    "type": "single",
    "text": "未取得机动车驾驶证驾驶机动车，处：",
    "options": [
      "200元以上2000元以下",
      "20元以上200元以下",
      "1000元以上2000元以下",
      "5000元"
    ],
    "answer": 0,
    "explain": "无证驾驶200～2000。",
    "id": 93
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在一般道路超过规定时速20%以上未达50%，一次记：",
    "options": [
      "6分",
      "3分",
      "9分",
      "1分"
    ],
    "answer": 1,
    "explain": "驾驶小型汽车+一般道路+超过规定时速20%以上未达50%→3分。",
    "id": 94
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "违反禁止标线指示，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "禁止标线与禁令标志同为1分。",
    "id": 95
  },
  {
    "family": "score",
    "type": "single",
    "text": "造成致人轻伤以上交通事故后逃逸（尚不构成犯罪），一次记多少分？",
    "options": [
      "3分",
      "12分",
      "6分",
      "1分"
    ],
    "answer": 1,
    "explain": "第八条第二项。",
    "id": 96
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在一般道路超过规定时速50%以上，一次记：",
    "options": [
      "6分",
      "9分",
      "1分",
      "3分"
    ],
    "answer": 0,
    "explain": "驾驶小型汽车+一般道路+超过规定时速50%以上→6分。",
    "id": 97
  },
  {
    "family": "hard",
    "type": "single",
    "text": "关于号牌记分，下列对应正确的是：",
    "options": [
      "伪造9分、遮挡12分、安装不当3分",
      "伪造12分、遮挡9分、安装不当3分",
      "全部12分",
      "全部9分"
    ],
    "answer": 1,
    "explain": "三分法：伪造12 / 遮挡污损未悬挂9 / 安装不当3。",
    "id": 98
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶小型汽车在高速公路超过规定时速20%以上未达50%」记分，正确的是：",
    "options": [
      "6分",
      "只罚款不记分",
      "一律12分",
      "一律不记分"
    ],
    "answer": 0,
    "explain": "应记6分。",
    "id": 99
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在一般道路超过规定时速20%以上未达50%，一次记：",
    "options": [
      "1分",
      "3分",
      "9分",
      "6分"
    ],
    "answer": 1,
    "explain": "驾驶小型汽车+一般道路+超过规定时速20%以上未达50%→3分。",
    "id": 100
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶中型客车在高速公路超过规定时速20%以上，一次记：",
    "options": [
      "12分",
      "6分",
      "1分",
      "3分"
    ],
    "answer": 0,
    "explain": "驾驶中型客车+高速公路+超过规定时速20%以上→12分。",
    "id": 101
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶公路客运汽车在一般道路超过规定时速50%以上」记分，正确的是：",
    "options": [
      "9分",
      "只罚款不记分",
      "一律不记分",
      "一律12分"
    ],
    "answer": 0,
    "explain": "应记9分。",
    "id": 102
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶中型客车在高速公路超过规定时速20%以上，一次记：",
    "options": [
      "3分",
      "6分",
      "1分",
      "12分"
    ],
    "answer": 3,
    "explain": "驾驶中型客车+高速公路+超过规定时速20%以上→12分。",
    "id": 103
  },
  {
    "family": "sign-x-tf",
    "type": "tf",
    "text": "图中标志（情形）的含义是：限制高度。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "限制高度。",
    "id": 104
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "代替他人接受处罚记分牟利，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为12分。第八条第七项。",
    "id": 105
  },
  {
    "family": "score",
    "type": "single",
    "text": "快速路逆行，一次记多少分？",
    "options": [
      "12分",
      "6分",
      "3分",
      "1分"
    ],
    "answer": 0,
    "explain": "第八条第六项。",
    "id": 106
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "准驾车型不符，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为9分。第九条第五项：准驾不符记9分。",
    "id": 107
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在高速公路超过规定时速50%以上，一次记：",
    "options": [
      "3分",
      "1分",
      "6分",
      "12分"
    ],
    "answer": 3,
    "explain": "驾驶小型汽车+高速公路+超过规定时速50%以上→12分。",
    "id": 108
  },
  {
    "family": "drink-tf",
    "type": "tf",
    "text": "饮酒后驾驶营运机动车，处十五日拘留。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "酒驾营运：暂扣驾照+罚更高；醉驾营运才拘留等。",
    "id": 109
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在城市快速路超过规定时速50%以上」，正确的有：",
    "options": [
      "一定吊销驾驶证",
      "记12分",
      "可能并处罚款",
      "属于超速违法"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "记12分；是否吊销看情节，不是一律。",
    "id": 110
  },
  {
    "family": "accident",
    "type": "single",
    "text": "发生交通事故，当事人应立即：",
    "options": [
      "先找证人再停车",
      "先离开现场报警",
      "先把车开到路边再报警",
      "停车、保护现场、抢救伤员并报警"
    ],
    "answer": 3,
    "explain": "停车、保护现场、抢救、报警是法定义务。",
    "id": 111
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "城市快速路不按规定车道行驶，一次记3分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "同高速，记3分。",
    "id": 112
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "危险物品运输车辆连续驾驶超4小时未休息，一次记9分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "危化品疲劳记9分。",
    "id": 113
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶中型货车在高速公路上超过规定时速20%以上，一次记12分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第八条：中型以上高速超20%即12分。",
    "id": 114
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "高速公路低于规定最低时速，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为3分。第十一条第十五项。",
    "id": 115
  },
  {
    "family": "sign-tf",
    "type": "tf",
    "text": "图中标志（或情形）表示：注意儿童。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "注意儿童/学校区域。",
    "id": 116
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "使用变造驾驶证，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为12分。伪造变造牌证记12分。",
    "id": 117
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "高速穿越中央分隔带掉头，一次记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第八条第六项。",
    "id": 118
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "饮酒后驾驶机动车，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为12分。第八条第一项。",
    "id": 119
  },
  {
    "family": "hard-tf",
    "type": "tf",
    "text": "普通小车在普通道路超速未达20%，记3分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，此项不记分。",
    "id": 120
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示什么？",
    "options": [
      "学生通道",
      "禁止行人",
      "注意儿童",
      "人行横道"
    ],
    "answer": 2,
    "explain": "注意儿童",
    "image": "assets/sign-school.svg",
    "imageAlt": "注意儿童",
    "id": 121
  },
  {
    "family": "fine-tf",
    "type": "tf",
    "text": "驾驶拼装机动车上路，罚款档为：200元以上2000元以下并吊销。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "拼装车：200～2000并吊销。",
    "id": 122
  },
  {
    "family": "pax",
    "type": "single",
    "text": "校车载人超过核定人数未达20%，一次记多少分？",
    "options": [
      "1分",
      "9分",
      "3分",
      "6分"
    ],
    "answer": 3,
    "explain": "第十条第一项。",
    "id": 123
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶中型货车在高速公路上超过规定时速20%以上，一次记3分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错。正确应为12分。第八条：中型以上高速超20%即12分。",
    "id": 124
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶公路客运汽车在一般道路超过规定时速50%以上」，正确的有：",
    "options": [
      "记9分",
      "可能并处罚款",
      "一定吊销驾驶证",
      "属于超速违法"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explain": "记9分；是否吊销看情节，不是一律。",
    "id": 125
  },
  {
    "family": "light-m",
    "type": "multi",
    "text": "下列应开启危险报警闪光灯的情形有：",
    "options": [
      "正常高速行驶",
      "道路上发生交通事故",
      "牵引故障机动车",
      "道路上发生故障难以移动"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "正常行驶不开双闪。",
    "id": 126
  },
  {
    "family": "fault",
    "type": "single",
    "text": "普通道路故障，警告标志应设在车后方约：",
    "options": [
      "150米外",
      "20米外",
      "50米外",
      "100米外"
    ],
    "answer": 2,
    "explain": "普通路约50米；高速150米。",
    "id": 127
  },
  {
    "family": "speed",
    "type": "single",
    "text": "驾驶危险物品运输车辆在一般道路上超过规定时速50%以上，一次记多少分？",
    "options": [
      "9分",
      "6分",
      "3分",
      "不记分"
    ],
    "answer": 0,
    "explain": "危化品普通路超50%记9分。",
    "id": 128
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示：",
    "options": [
      "人行横道",
      "禁止驶入",
      "禁止停车",
      "解除限制"
    ],
    "answer": 0,
    "explain": "注意行人。",
    "image": "assets/sign-crosswalk.svg",
    "imageAlt": "人行横道",
    "id": 129
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶小型汽车在一般道路超过规定时速20%以上未达50%，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "应为3分。",
    "id": 130
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶公路客运汽车在一般道路超过规定时速50%以上」，正确的有：",
    "options": [
      "一定吊销驾驶证",
      "属于超速违法",
      "可能并处罚款",
      "记9分"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "记9分；是否吊销看情节，不是一律。",
    "id": 131
  },
  {
    "family": "score",
    "type": "single",
    "text": "驾驶人未按规定系安全带，一次记多少分？",
    "options": [
      "9分",
      "3分",
      "6分",
      "1分"
    ],
    "answer": 3,
    "explain": "第十二条第九项：安全带记1分。",
    "id": 132
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在城市快速路超过规定时速50%以上，一次记：",
    "options": [
      "6分",
      "3分",
      "12分",
      "1分"
    ],
    "answer": 2,
    "explain": "驾驶小型汽车+城市快速路+超过规定时速50%以上→12分。",
    "id": 133
  },
  {
    "family": "lic-m",
    "type": "multi",
    "text": "下列哪些一次记1分？",
    "options": [
      "手持电话",
      "违反禁令标志",
      "未系安全带",
      "闯红灯"
    ],
    "answer": [
      1,
      2
    ],
    "explain": "闯红灯6分，手持电话3分。",
    "id": 134
  },
  {
    "family": "cmp-tf",
    "type": "tf",
    "text": "酒驾记不记分（刑事），醉驾记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "记反了。正确：酒驾12分，醉驾不记分（刑事）。",
    "id": 135
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在城市快速路超过规定时速50%以上，一次记：",
    "options": [
      "1分",
      "6分",
      "3分",
      "12分"
    ],
    "answer": 3,
    "explain": "驾驶小型汽车+城市快速路+超过规定时速50%以上→12分。",
    "id": 136
  },
  {
    "family": "sign-x-tf",
    "type": "tf",
    "text": "图中标志（情形）的含义是：限制宽度。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为「限制高度」。",
    "id": 137
  },
  {
    "family": "m-drink",
    "type": "multi",
    "text": "酒驾的法定后果包括：",
    "options": [
      "直接拘役",
      "罚款1000～2000",
      "暂扣驾驶证6个月",
      "记12分"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "拘役针对醉驾。",
    "id": 138
  },
  {
    "family": "lic-m",
    "type": "multi",
    "text": "下列哪些一次记3分？",
    "options": [
      "斑马线不让行人",
      "不避让校车",
      "故意遮挡号牌",
      "手持电话"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explain": "遮挡号牌9分。",
    "id": 139
  },
  {
    "family": "score",
    "type": "single",
    "text": "高速公路不按规定车道行驶，一次记多少分？",
    "options": [
      "6分",
      "1分",
      "9分",
      "3分"
    ],
    "answer": 3,
    "explain": "第十一条第三项。",
    "id": 140
  },
  {
    "family": "sign-x",
    "type": "single",
    "text": "图中所示表示：",
    "options": [
      "黄灯已过停止线可继续",
      "黄灯等同绿灯",
      "黄灯可加速抢行",
      "黄灯必须倒车"
    ],
    "answer": 0,
    "explain": "黄灯提示。",
    "image": "assets/light-yellow.svg",
    "imageAlt": "黄灯提示",
    "id": 141
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "不按规定超车，一次记3分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第十一条第四项。",
    "id": 142
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶小型汽车在城市快速路超过规定时速50%以上，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "应为12分。",
    "id": 143
  },
  {
    "family": "fault-tf",
    "type": "tf",
    "text": "机动车在高速公路上发生故障时，车上人员应迅速转移到右侧路肩或应急车道内。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "高速故障人员转移。",
    "id": 144
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶中型客车在高速公路超过规定时速20%以上」记分，正确的是：",
    "options": [
      "一律不记分",
      "12分",
      "一律12分",
      "只罚款不记分"
    ],
    "answer": 1,
    "explain": "应记12分。",
    "id": 145
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶普通小型汽车在一般道路上超过规定时速20%以上未达50%，一次记6分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错。正确应为3分。第十一条：普通小车普通路超20%～50%记3分。",
    "id": 146
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "快速路逆行，一次记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第八条第六项。",
    "id": 147
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在一般道路超过规定时速20%以上未达50%」，正确的有：",
    "options": [
      "一定吊销驾驶证",
      "可能并处罚款",
      "属于超速违法",
      "记3分"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "记3分；是否吊销看情节，不是一律。",
    "id": 148
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在高速公路超过规定时速20%以上未达50%，一次记：",
    "options": [
      "3分",
      "6分",
      "9分",
      "1分"
    ],
    "answer": 1,
    "explain": "驾驶小型汽车+高速公路+超过规定时速20%以上未达50%→6分。",
    "id": 149
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶危险物品运输车辆在一般道路上超过规定时速50%以上，一次记6分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错。正确应为9分。危化品普通路超50%记9分。",
    "id": 150
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在高速公路超过规定时速20%以上未达50%」，正确的有：",
    "options": [
      "可能并处罚款",
      "记6分",
      "一定吊销驾驶证",
      "属于超速违法"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explain": "记6分；是否吊销看情节，不是一律。",
    "id": 151
  },
  {
    "family": "misc-tf",
    "type": "tf",
    "text": "右侧车道车辆可以向左变道强行超车逼近。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "不得妨碍其他车辆。",
    "id": 152
  },
  {
    "family": "m-intern",
    "type": "multi",
    "text": "关于实习期驾驶人，正确的有：",
    "options": [
      "可驾驶机动车",
      "可独自开牵引车",
      "上高速须有三年以上驾龄陪同",
      "粘贴实习标志"
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explain": "牵引车等有限制。",
    "id": 153
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "违反禁令标志指示，一次记3分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为1分。第十二条第四项：禁令标志记1分。",
    "id": 154
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "违反禁令标志指示，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第十二条第四项：禁令标志记1分。",
    "id": 155
  },
  {
    "family": "right-tf",
    "type": "tf",
    "text": "机动车行经人行横道时，应当减速行驶；遇行人正在通过，应当停车让行。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "道交法明确要求。",
    "id": 156
  },
  {
    "family": "score",
    "type": "single",
    "text": "不按规定让行，一次记多少分？",
    "options": [
      "1分",
      "6分",
      "3分",
      "9分"
    ],
    "answer": 2,
    "explain": "第十一条第四项。",
    "id": 157
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶普通小型汽车在高速公路上超过规定时速50%以上，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错。正确应为12分。第八条：普通小车高速超50%记12分。",
    "id": 158
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示：",
    "options": [
      "禁止停车",
      "停车让行",
      "解除限制",
      "禁止驶入"
    ],
    "answer": 1,
    "explain": "停车让行：必须停车瞭望确认安全。",
    "image": "assets/sign-stop.svg",
    "imageAlt": "停车让行",
    "id": 159
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "不按规定让行，一次记3分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第十一条第四项。",
    "id": 160
  },
  {
    "family": "score",
    "type": "single",
    "text": "普通小客车连续驾驶超4小时未休息，一次记多少分？",
    "options": [
      "6分",
      "1分",
      "3分",
      "不记分"
    ],
    "answer": 3,
    "explain": "163号令未列普通小客车疲劳记分。",
    "id": 161
  },
  {
    "family": "fine",
    "type": "single",
    "text": "驾驶报废机动车上路，处：",
    "options": [
      "1000元以上2000元以下不吊销",
      "只记12分",
      "200元以上2000元以下并吊销",
      "20元以上200元以下"
    ],
    "answer": 2,
    "explain": "报废车同拼装车。",
    "id": 162
  },
  {
    "family": "hwy-m",
    "type": "multi",
    "text": "高速公路上禁止的行为包括：",
    "options": [
      "按规定在服务区停车休息",
      "倒车",
      "穿越中央分隔带掉头",
      "逆行"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "服务区停车休息合法。",
    "id": 163
  },
  {
    "family": "fine-tf",
    "type": "tf",
    "text": "把机动车交给无证人驾驶，罚款档为：200元以上2000元以下。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "借给无证人开：200～2000，可并处吊销。",
    "id": 164
  },
  {
    "family": "lic",
    "type": "single",
    "text": "科目一考试成绩多少分合格？",
    "options": [
      "85分",
      "95分",
      "90分",
      "80分"
    ],
    "answer": 2,
    "explain": "科目一满分100，90合格。",
    "id": 165
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "造成致人轻伤以上交通事故后逃逸（尚不构成犯罪），一次记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第八条第二项。",
    "id": 166
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶公路客运汽车在一般道路超过规定时速50%以上」，正确的有：",
    "options": [
      "属于超速违法",
      "记9分",
      "一定吊销驾驶证",
      "可能并处罚款"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explain": "记9分；是否吊销看情节，不是一律。",
    "id": 167
  },
  {
    "family": "sign-x",
    "type": "single",
    "text": "图中所示表示：",
    "options": [
      "夜间照明不良应开远光",
      "夜间禁止开车灯",
      "夜间会车继续开远光",
      "夜间只能开雾灯"
    ],
    "answer": 0,
    "explain": "夜间照明。",
    "image": "assets/night-road-lights.svg",
    "imageAlt": "夜间照明",
    "id": 168
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶普通小型汽车在一般道路上超过规定时速未达20%，一次记不记分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "普通小车+普通路+未达20%：163号令无记分项。",
    "id": 169
  },
  {
    "family": "score",
    "type": "single",
    "text": "高速倒车，一次记多少分？",
    "options": [
      "12分",
      "3分",
      "1分",
      "6分"
    ],
    "answer": 0,
    "explain": "第八条第六项。",
    "id": 170
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "中型以上载客汽车连续驾驶超4小时休息不足20分钟，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为9分。第九条第七项。",
    "id": 171
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶中型客车在高速公路超过规定时速20%以上，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "应为12分。",
    "id": 172
  },
  {
    "family": "sign-tf",
    "type": "tf",
    "text": "图中标志（或情形）表示：红灯亮时，准许车辆通行。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错。红灯禁止通行。",
    "id": 173
  },
  {
    "family": "hard-tf",
    "type": "tf",
    "text": "过斑马线不避让行人，一次记6分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，163号令是3分。",
    "id": 174
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶校车在一般道路上超过规定时速10%以上未达20%，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第十二条：中型以上/校车/危化品普通路超10%～20%记1分。",
    "id": 175
  },
  {
    "family": "fine",
    "type": "single",
    "text": "故意遮挡污损或不按规定安装号牌，处：",
    "options": [
      "1000元以上2000元以下",
      "200元以上500元以下",
      "警告或20元以上200元以下",
      "只记分"
    ],
    "answer": 2,
    "explain": "号牌违法罚款轻；记分遮挡9分、安装不当3分。",
    "id": 176
  },
  {
    "family": "m6",
    "type": "multi",
    "text": "下列属于一次记6分的有：",
    "options": [
      "占应急车道",
      "未系安全带",
      "普通小车普通路超50%",
      "闯红灯"
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explain": "安全带1分。",
    "id": 177
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在一般道路超过规定时速20%以上未达50%，一次记：",
    "options": [
      "3分",
      "9分",
      "6分",
      "1分"
    ],
    "answer": 0,
    "explain": "驾驶小型汽车+一般道路+超过规定时速20%以上未达50%→3分。",
    "id": 178
  },
  {
    "family": "speed",
    "type": "single",
    "text": "驾驶校车在高速公路上超过规定时速20%以上，一次记多少分？",
    "options": [
      "12分",
      "9分",
      "不记分",
      "1分"
    ],
    "answer": 0,
    "explain": "校车高速超20%记12分。",
    "id": 179
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示什么？",
    "options": [
      "解除禁止鸣喇叭",
      "禁止鸣喇叭",
      "注意危险",
      "鸣喇叭路段"
    ],
    "answer": 1,
    "explain": "禁止鸣喇叭",
    "image": "assets/sign-no-horn.svg",
    "imageAlt": "禁止鸣喇叭",
    "id": 180
  },
  {
    "family": "m-ot",
    "type": "multi",
    "text": "下列不得超车的地点有：",
    "options": [
      "畅通直路",
      "窄桥",
      "铁路道口",
      "弯道"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "危险地点禁超。",
    "id": 181
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶普通小型汽车在高速公路上超过规定时速未达20%，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错。正确应为不记分。普通小车高速未达20%不记分。",
    "id": 182
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在高速公路超过规定时速20%以上未达50%，一次记：",
    "options": [
      "3分",
      "1分",
      "9分",
      "6分"
    ],
    "answer": 3,
    "explain": "驾驶小型汽车+高速公路+超过规定时速20%以上未达50%→6分。",
    "id": 183
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在高速公路超过规定时速20%以上未达50%」，正确的有：",
    "options": [
      "一定吊销驾驶证",
      "属于超速违法",
      "记6分",
      "可能并处罚款"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "记6分；是否吊销看情节，不是一律。",
    "id": 184
  },
  {
    "family": "speed-trap",
    "type": "single",
    "text": "下列关于普通小车超速记分，说法错误的是：",
    "options": [
      "普通路超20%～50%记3分",
      "高速超20%～50%记12分",
      "普通路超50%记6分",
      "高速超50%记12分"
    ],
    "answer": 1,
    "explain": "高速20%～50%是6分不是12分；只有超50%才12分。",
    "id": 185
  },
  {
    "family": "speed",
    "type": "single",
    "text": "驾驶普通小型汽车在一般道路上超过规定时速20%以上未达50%，一次记多少分？",
    "options": [
      "12分",
      "3分",
      "6分",
      "9分"
    ],
    "answer": 1,
    "explain": "第十一条：普通小车普通路超20%～50%记3分。",
    "id": 186
  },
  {
    "family": "pax",
    "type": "single",
    "text": "其他载客汽车超员20%以上未达50%，一次记多少分？",
    "options": [
      "1分",
      "9分",
      "3分",
      "6分"
    ],
    "answer": 2,
    "explain": "第十一条第一项。",
    "id": 187
  },
  {
    "family": "sign-x-tf",
    "type": "tf",
    "text": "图中标志（情形）的含义是：人行横道。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "人行横道。",
    "id": 188
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在高速公路超过规定时速50%以上」，正确的有：",
    "options": [
      "记12分",
      "一定吊销驾驶证",
      "属于超速违法",
      "可能并处罚款"
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explain": "记12分；是否吊销看情节，不是一律。",
    "id": 189
  },
  {
    "family": "speed",
    "type": "single",
    "text": "驾驶普通小型汽车在高速公路上超过规定时速50%以上，一次记多少分？",
    "options": [
      "不记分",
      "12分",
      "1分",
      "6分"
    ],
    "answer": 1,
    "explain": "第八条：普通小车高速超50%记12分。",
    "id": 190
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "占用应急车道行驶，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为6分。第十条第十一项。",
    "id": 191
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "行经人行横道不按规定避让行人，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为3分。第十一条第七项：不让行人记3分。",
    "id": 192
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶小型汽车在城市快速路超过规定时速50%以上」记分，正确的是：",
    "options": [
      "一律不记分",
      "12分",
      "只罚款不记分",
      "一律12分"
    ],
    "answer": 1,
    "explain": "应记12分。",
    "id": 193
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "代替他人接受处罚记分牟利，一次记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第八条第七项。",
    "id": 194
  },
  {
    "family": "sign-x-tf",
    "type": "tf",
    "text": "图中标志（情形）的含义是：限制速度。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "限制速度。",
    "id": 195
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在城市快速路超过规定时速50%以上，一次记：",
    "options": [
      "12分",
      "6分",
      "1分",
      "3分"
    ],
    "answer": 0,
    "explain": "驾驶小型汽车+城市快速路+超过规定时速50%以上→12分。",
    "id": 196
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶普通小型汽车在一般道路上超过规定时速50%以上，一次记6分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第十条：普通小车普通路超50%记6分，不是12。",
    "id": 197
  },
  {
    "family": "score",
    "type": "single",
    "text": "使用伪造号牌，一次记多少分？",
    "options": [
      "6分",
      "3分",
      "12分",
      "1分"
    ],
    "answer": 2,
    "explain": "第八条第三项。",
    "id": 198
  },
  {
    "family": "pax",
    "type": "single",
    "text": "其他载客汽车超员100%以上，一次记多少分？",
    "options": [
      "12分",
      "3分",
      "6分",
      "1分"
    ],
    "answer": 0,
    "explain": "第八条第四项。",
    "id": 199
  },
  {
    "family": "crime",
    "type": "single",
    "text": "交通肇事致一人以上重伤，负事故全部或主要责任，并具有下列哪种行为，构成交通肇事罪？",
    "options": [
      "未报警",
      "明知安全装置不全或机件失灵而驾驶",
      "未抢救受伤人员",
      "未带驾驶证"
    ],
    "answer": 1,
    "explain": "司法解释：无证、酒药驾、严重超载、逃逸、驾驶有安全隐患车辆等可入罪。",
    "id": 200
  },
  {
    "family": "misc-tf",
    "type": "tf",
    "text": "在快速路上违法停车记6分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "高速/快速路违法停车记9分。",
    "id": 201
  },
  {
    "family": "light-tf",
    "type": "tf",
    "text": "夜间通过没有交通信号的路口，应交替使用远近光灯示意。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "无信号路口夜间交替远近光示意。",
    "id": 202
  },
  {
    "family": "speed",
    "type": "single",
    "text": "驾驶校车在一般道路上超过规定时速50%以上，一次记多少分？",
    "options": [
      "12分",
      "6分",
      "3分",
      "9分"
    ],
    "answer": 3,
    "explain": "校车普通路超50%记9分。",
    "id": 203
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶小型汽车在一般道路超过规定时速20%以上未达50%」记分，正确的是：",
    "options": [
      "3分",
      "一律不记分",
      "只罚款不记分",
      "一律12分"
    ],
    "answer": 0,
    "explain": "应记3分。",
    "id": 204
  },
  {
    "family": "light",
    "type": "single",
    "text": "雾天行驶应开启：",
    "options": [
      "远光灯",
      "仅近光灯",
      "仅示廓灯",
      "雾灯和危险报警闪光灯"
    ],
    "answer": 3,
    "explain": "雾天：雾灯+危险报警闪光灯。",
    "id": 205
  },
  {
    "family": "sign-x",
    "type": "single",
    "text": "图中所示表示：",
    "options": [
      "限制宽度",
      "限制速度",
      "限制高度",
      "限制质量"
    ],
    "answer": 2,
    "explain": "限制高度。",
    "image": "assets/sign-height.svg",
    "imageAlt": "限制高度",
    "id": 206
  },
  {
    "family": "sign-tf",
    "type": "tf",
    "text": "图中标志（或情形）表示：限制速度40公里/小时。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "最高时速不得超过40。",
    "id": 207
  },
  {
    "family": "fine",
    "type": "single",
    "text": "一般道路通行违法，处：",
    "options": [
      "200元以上500元以下",
      "1000元以上2000元以下",
      "5元以上50元以下",
      "20元以上200元以下"
    ],
    "answer": 3,
    "explain": "普通违章口袋档：警告或20～200。",
    "id": 208
  },
  {
    "family": "score",
    "type": "single",
    "text": "故意污损号牌，一次记多少分？",
    "options": [
      "3分",
      "1分",
      "9分",
      "6分"
    ],
    "answer": 2,
    "explain": "遮挡、污损都是9分。",
    "id": 209
  },
  {
    "family": "cmp-tf",
    "type": "tf",
    "text": "闯红灯记6分，违反禁令标志记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "对比记忆。",
    "id": 210
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "普通路逆行，一次记3分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "普通路逆行记3分；高速/快速路逆行才是12分。",
    "id": 211
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶普通小型汽车在城市快速路上超过规定时速20%以上未达50%，一次记6分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "城市快速路与高速同档。",
    "id": 212
  },
  {
    "family": "cmp",
    "type": "single",
    "text": "下列记分对应正确的是：",
    "options": [
      "两者都记3分",
      "遮挡号牌3分，不按规定安装号牌9分",
      "遮挡号牌9分，不按规定安装号牌3分",
      "两者都记9分"
    ],
    "answer": 2,
    "explain": "遮挡号牌→9分；不按规定安装号牌→3分。",
    "id": 213
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "高速或快速路违法停车，一次记9分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第九条第三项。",
    "id": 214
  },
  {
    "family": "sign-x",
    "type": "single",
    "text": "图中所示表示：",
    "options": [
      "停车让行",
      "禁止通行",
      "减速让行",
      "禁止驶入"
    ],
    "answer": 1,
    "explain": "禁止通行。",
    "image": "assets/sign-no-entry.svg",
    "imageAlt": "禁止通行",
    "id": 215
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "高速穿越中央分隔带掉头，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为12分。第八条第六项。",
    "id": 216
  },
  {
    "family": "score",
    "type": "single",
    "text": "不按规定避让校车，一次记多少分？",
    "options": [
      "3分",
      "9分",
      "1分",
      "6分"
    ],
    "answer": 0,
    "explain": "第十一条第八项：不避让校车记3分。",
    "id": 217
  },
  {
    "family": "cmp",
    "type": "single",
    "text": "下列记分对应正确的是：",
    "options": [
      "普通路超50%（小车）6分，高速超50%（小车）12分",
      "两者都记12分",
      "普通路超50%（小车）12分，高速超50%（小车）6分",
      "两者都记6分"
    ],
    "answer": 0,
    "explain": "普通路超50%（小车）→6分；高速超50%（小车）→12分。",
    "id": 218
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶小型汽车在一般道路超过规定时速50%以上」记分，正确的是：",
    "options": [
      "6分",
      "一律12分",
      "只罚款不记分",
      "一律不记分"
    ],
    "answer": 0,
    "explain": "应记6分。",
    "id": 219
  },
  {
    "family": "sign-x-tf",
    "type": "tf",
    "text": "图中标志（情形）的含义是：鸣喇叭路段。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为「禁止鸣喇叭」。",
    "id": 220
  },
  {
    "family": "misc-tf",
    "type": "tf",
    "text": "科目一考试可以携带资料进入考场。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "严禁作弊带资料。",
    "id": 221
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "故意遮挡号牌，一次记9分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第九条第四项：遮挡污损记9分。",
    "id": 222
  },
  {
    "family": "crime-tf",
    "type": "tf",
    "text": "造成交通事故后逃逸的，一律记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错。要看伤情档：轻微伤/财产损失是6分。",
    "id": 223
  },
  {
    "family": "lic",
    "type": "single",
    "text": "一个记分周期内累积记分满分是：",
    "options": [
      "24分",
      "12分",
      "9分",
      "6分"
    ],
    "answer": 1,
    "explain": "满分12分。",
    "id": 224
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶危险物品运输车辆在高速公路上超过规定时速20%以上，一次记3分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错。正确应为12分。危化品高速超20%记12分。",
    "id": 225
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "驾驶证被暂扣期间驾驶机动车，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为6分。第十条第九项。",
    "id": 226
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶中型客车在高速公路超过规定时速20%以上」，正确的有：",
    "options": [
      "属于超速违法",
      "可能并处罚款",
      "一定吊销驾驶证",
      "记12分"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explain": "记12分；是否吊销看情节，不是一律。",
    "id": 227
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶普通小型汽车在城市快速路上超过规定时速20%以上未达50%，一次记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错。正确应为6分。城市快速路与高速同档。",
    "id": 228
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在高速公路超过规定时速50%以上，一次记：",
    "options": [
      "6分",
      "12分",
      "1分",
      "3分"
    ],
    "answer": 1,
    "explain": "驾驶小型汽车+高速公路+超过规定时速50%以上→12分。",
    "id": 229
  },
  {
    "family": "fault-m",
    "type": "multi",
    "text": "道路上车辆故障难以移动时，应：",
    "options": [
      "开危险报警闪光灯",
      "坐在车内等待救援",
      "夜间还开示廓灯/后位灯",
      "设警告标志"
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explain": "人员应转移安全地点。",
    "id": 230
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶小型汽车在一般道路超过规定时速50%以上」记分，正确的是：",
    "options": [
      "一律12分",
      "一律不记分",
      "只罚款不记分",
      "6分"
    ],
    "answer": 3,
    "explain": "应记6分。",
    "id": 231
  },
  {
    "family": "score",
    "type": "single",
    "text": "拨打接听手持电话，一次记多少分？",
    "options": [
      "9分",
      "3分",
      "1分",
      "6分"
    ],
    "answer": 1,
    "explain": "第十一条第六项：手持电话记3分。",
    "id": 232
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "驾驶人未按规定系安全带，一次记3分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为1分。第十二条第九项：安全带记1分。",
    "id": 233
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶普通小型汽车在高速公路上超过规定时速20%以上未达50%，一次记6分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第十条：普通小车高速超20%～50%记6分。",
    "id": 234
  },
  {
    "family": "speed",
    "type": "single",
    "text": "驾驶中型货车在一般道路上超过规定时速50%以上，一次记多少分？",
    "options": [
      "3分",
      "1分",
      "不记分",
      "9分"
    ],
    "answer": 3,
    "explain": "第九条：中型以上普通路超50%记9分。",
    "id": 235
  },
  {
    "family": "sign-x-tf",
    "type": "tf",
    "text": "图中标志（情形）的含义是：注意行人。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为「人行横道」。",
    "id": 236
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示什么？",
    "options": [
      "禁止掉头",
      "禁止向左转弯",
      "禁止向右转弯",
      "靠左行驶"
    ],
    "answer": 1,
    "explain": "禁止向左转弯",
    "image": "assets/sign-no-left.svg",
    "imageAlt": "禁止向左转弯",
    "id": 237
  },
  {
    "family": "hard",
    "type": "single",
    "text": "机动车驾驶证被扣留期间驾驶机动车，一次记：",
    "options": [
      "12分",
      "3分",
      "9分",
      "6分"
    ],
    "answer": 3,
    "explain": "第十条第九项：6分。",
    "id": 238
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在高速公路超过规定时速20%以上未达50%，一次记：",
    "options": [
      "9分",
      "6分",
      "1分",
      "3分"
    ],
    "answer": 1,
    "explain": "驾驶小型汽车+高速公路+超过规定时速20%以上未达50%→6分。",
    "id": 239
  },
  {
    "family": "lic-tf",
    "type": "tf",
    "text": "学法减分一个记分周期内最多可减6分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "163号令：累计扣减不超过6分。",
    "id": 240
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "违反禁止标线指示，一次记3分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为1分。禁止标线与禁令标志同为1分。",
    "id": 241
  },
  {
    "family": "sign-tf",
    "type": "tf",
    "text": "图中标志（或情形）表示：禁止向左转弯。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "禁止左转。",
    "id": 242
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "中型以上载客汽车连续驾驶超4小时休息不足20分钟，一次记9分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第九条第七项。",
    "id": 243
  },
  {
    "family": "score",
    "type": "single",
    "text": "高速穿越中央分隔带掉头，一次记多少分？",
    "options": [
      "12分",
      "6分",
      "3分",
      "1分"
    ],
    "answer": 0,
    "explain": "第八条第六项。",
    "id": 244
  },
  {
    "family": "pax",
    "type": "single",
    "text": "公路客运汽车超员未达20%，一次记多少分？",
    "options": [
      "9分",
      "3分",
      "6分",
      "1分"
    ],
    "answer": 2,
    "explain": "营运客车超员未达20%记6分。",
    "id": 245
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶危险物品运输车辆在高速公路上超过规定时速未达20%，一次记9分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错。正确应为6分。第十条：中型以上/危化品高速超速未达20%记6分。",
    "id": 246
  },
  {
    "family": "cmp-tf",
    "type": "tf",
    "text": "疲劳（载货）记9分，疲劳（危化品）记3分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "记反了。正确：疲劳（载货）3分，疲劳（危化品）9分。",
    "id": 247
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示：",
    "options": [
      "解除限制",
      "禁止驶入",
      "禁止停车",
      "限制速度40公里/小时"
    ],
    "answer": 3,
    "explain": "最高时速不得超过40。",
    "image": "assets/sign-speed-40.svg",
    "imageAlt": "限制速度40公里/小时",
    "id": 248
  },
  {
    "family": "m-cmp",
    "type": "multi",
    "text": "下列记分对比正确的有：",
    "options": [
      "安装号牌3分遮挡9分",
      "禁令1分闯红灯6分",
      "普通路逆行12分",
      "安全带1分电话3分"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explain": "普通路逆行3分。",
    "id": 249
  },
  {
    "family": "fine",
    "type": "single",
    "text": "饮酒后驾驶机动车，处：",
    "options": [
      "200元以上2000元以下",
      "20元以上200元以下",
      "2000元以上5000元以下",
      "1000元以上2000元以下"
    ],
    "answer": 3,
    "explain": "酒驾罚1000～2000，记12分，暂扣6个月。",
    "id": 250
  },
  {
    "family": "m-lic",
    "type": "multi",
    "text": "关于准驾与号牌，正确的有：",
    "options": [
      "遮挡号牌记9分",
      "准驾不符记12分",
      "伪造号牌记12分",
      "准驾不符记9分"
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explain": "准驾不符是9分。",
    "id": 251
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "使用伪造号牌，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为12分。第八条第三项。",
    "id": 252
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶小型汽车在一般道路超过规定时速50%以上，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "应为6分。",
    "id": 253
  },
  {
    "family": "m-plate",
    "type": "multi",
    "text": "号牌相关记分正确的有：",
    "options": [
      "未悬挂记12分",
      "故意遮挡记9分",
      "不按规定安装记3分",
      "伪造变造记12分"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "未悬挂是9分不是12分。",
    "id": 254
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶公路客运汽车在一般道路超过规定时速50%以上」记分，正确的是：",
    "options": [
      "一律12分",
      "只罚款不记分",
      "9分",
      "一律不记分"
    ],
    "answer": 2,
    "explain": "应记9分。",
    "id": 255
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶小型汽车在城市快速路超过规定时速50%以上」记分，正确的是：",
    "options": [
      "只罚款不记分",
      "一律12分",
      "一律不记分",
      "12分"
    ],
    "answer": 3,
    "explain": "应记12分。",
    "id": 256
  },
  {
    "family": "m-fault",
    "type": "multi",
    "text": "车辆故障时正确做法有：",
    "options": [
      "开启危险报警闪光灯",
      "设置警告标志",
      "坐在驾驶室打电话等救援",
      "高速故障人员转移至路肩"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explain": "人要转移到安全地点。",
    "id": 257
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在一般道路超过规定时速50%以上」，正确的有：",
    "options": [
      "属于超速违法",
      "记6分",
      "可能并处罚款",
      "一定吊销驾驶证"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "记6分；是否吊销看情节，不是一律。",
    "id": 258
  },
  {
    "family": "sign-tf",
    "type": "tf",
    "text": "图中标志（或情形）表示：黄灯亮时，已越过停止线的车辆可以继续通行。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "黄灯：已过线可继续，未过线应停。",
    "id": 259
  },
  {
    "family": "fine-tf",
    "type": "tf",
    "text": "故意遮挡污损或不按规定安装号牌，罚款档为：警告或20元以上200元以下。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "号牌违法罚款轻；记分遮挡9分、安装不当3分。",
    "id": 260
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "城市快速路不按规定车道行驶，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为3分。同高速，记3分。",
    "id": 261
  },
  {
    "family": "hard-tf",
    "type": "tf",
    "text": "未悬挂机动车号牌上路，记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，163号令记9分。",
    "id": 262
  },
  {
    "family": "misc-tf",
    "type": "tf",
    "text": "城市快速路上低于最低时速记3分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "与高速相同。",
    "id": 263
  },
  {
    "family": "hwy",
    "type": "single",
    "text": "实习期驾驶人可以驾驶机动车在高速公路上行驶吗？",
    "options": [
      "不可以",
      "可以，但须有三年以上驾龄驾驶人陪同",
      "可以独自上高速",
      "只可白天上高速"
    ],
    "answer": 1,
    "explain": "实习期上高速须陪同。",
    "id": 264
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "载货汽车连续驾驶超4小时未休息，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为3分。第十一条第十四项。",
    "id": 265
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在一般道路超过规定时速50%以上，一次记：",
    "options": [
      "1分",
      "6分",
      "9分",
      "3分"
    ],
    "answer": 1,
    "explain": "驾驶小型汽车+一般道路+超过规定时速50%以上→6分。",
    "id": 266
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "不按规定安装号牌，一次记3分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第十一条第十项：安装不当记3分，不是9分。",
    "id": 267
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "故意污损号牌，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为9分。遮挡、污损都是9分。",
    "id": 268
  },
  {
    "family": "overtake",
    "type": "single",
    "text": "同车道后车欲超车，前车应：",
    "options": [
      "向左变道",
      "加速不让",
      "紧急制动",
      "在条件许可时减速靠右让路"
    ],
    "answer": 3,
    "explain": "前车应减速靠右让行。",
    "id": 269
  },
  {
    "family": "misc-tf",
    "type": "tf",
    "text": "代替他人记分牟利记9分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "记12分。",
    "id": 270
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "未悬挂号牌上路，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为9分。第九条第四项：未悬挂记9分。",
    "id": 271
  },
  {
    "family": "sign-x-tf",
    "type": "tf",
    "text": "图中标志（情形）的含义是：禁止鸣喇叭。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "禁止鸣喇叭。",
    "id": 272
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶小型汽车在高速公路超过规定时速50%以上，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "应为12分。",
    "id": 273
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶小型汽车在一般道路超过规定时速20%以上未达50%，一次记3分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "正确。",
    "id": 274
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示什么？",
    "options": [
      "禁止驶入",
      "停车让行",
      "减速让行",
      "禁止通行"
    ],
    "answer": 3,
    "explain": "禁止一切车辆和行人通行",
    "image": "assets/sign-no-entry.svg",
    "imageAlt": "禁止一切车辆和行人通行",
    "id": 275
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "使用变造驾驶证，一次记12分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "伪造变造牌证记12分。",
    "id": 276
  },
  {
    "family": "misc-tf",
    "type": "tf",
    "text": "机动车行驶时驾驶人可以不系安全带，只要副驾系了即可。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "驾驶人必须系。",
    "id": 277
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶普通小型汽车在高速公路上超过规定时速50%以上，一次记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第八条：普通小车高速超50%记12分。",
    "id": 278
  },
  {
    "family": "exam-m",
    "type": "multi",
    "text": "科目一常考的合格相关说法正确的有：",
    "options": [
      "共100题",
      "满分100分",
      "80分合格",
      "90分合格"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explain": "合格线90不是80。",
    "id": 279
  },
  {
    "family": "score",
    "type": "single",
    "text": "不按规定超车，一次记多少分？",
    "options": [
      "1分",
      "6分",
      "3分",
      "9分"
    ],
    "answer": 2,
    "explain": "第十一条第四项。",
    "id": 280
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在高速公路超过规定时速50%以上，一次记：",
    "options": [
      "3分",
      "12分",
      "1分",
      "6分"
    ],
    "answer": 1,
    "explain": "驾驶小型汽车+高速公路+超过规定时速50%以上→12分。",
    "id": 281
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "准驾车型不符，一次记9分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第九条第五项：准驾不符记9分。",
    "id": 282
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "行经人行横道不按规定避让行人，一次记3分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第十一条第七项：不让行人记3分。",
    "id": 283
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "高速倒车，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为12分。第八条第六项。",
    "id": 284
  },
  {
    "family": "sign-x-tf",
    "type": "tf",
    "text": "图中标志（情形）的含义是：减速让行。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为「停车让行」。",
    "id": 285
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示什么？",
    "options": [
      "减速让行",
      "停车让行",
      "禁止停车",
      "禁止通行"
    ],
    "answer": 1,
    "explain": "车辆必须停车让行",
    "image": "assets/sign-stop.svg",
    "imageAlt": "车辆必须停车让行",
    "id": 286
  },
  {
    "family": "score",
    "type": "single",
    "text": "高速公路低于规定最低时速，一次记多少分？",
    "options": [
      "9分",
      "1分",
      "3分",
      "6分"
    ],
    "answer": 2,
    "explain": "第十一条第十五项。",
    "id": 287
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在一般道路超过规定时速20%以上未达50%」，正确的有：",
    "options": [
      "记3分",
      "一定吊销驾驶证",
      "可能并处罚款",
      "属于超速违法"
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explain": "记3分；是否吊销看情节，不是一律。",
    "id": 288
  },
  {
    "family": "speed",
    "type": "single",
    "text": "驾驶中型货车在高速公路上超过规定时速20%以上，一次记多少分？",
    "options": [
      "3分",
      "不记分",
      "12分",
      "6分"
    ],
    "answer": 2,
    "explain": "第八条：中型以上高速超20%即12分。",
    "id": 289
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶中型货车在一般道路上超过规定时速50%以上，一次记9分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第九条：中型以上普通路超50%记9分。",
    "id": 290
  },
  {
    "family": "speed",
    "type": "single",
    "text": "驾驶中型货车在一般道路上超过规定时速20%以上未达50%，一次记多少分？",
    "options": [
      "12分",
      "3分",
      "不记分",
      "6分"
    ],
    "answer": 3,
    "explain": "第十条：中型以上普通路超20%～50%记6分。",
    "id": 291
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶公路客运汽车在一般道路超过规定时速50%以上，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "应为9分。",
    "id": 292
  },
  {
    "family": "sign-tf",
    "type": "tf",
    "text": "图中标志（或情形）表示：减速让行。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "倒三角：减速让行。",
    "id": 293
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶公路客运汽车在一般道路超过规定时速50%以上」记分，正确的是：",
    "options": [
      "只罚款不记分",
      "一律12分",
      "一律不记分",
      "9分"
    ],
    "answer": 3,
    "explain": "应记9分。",
    "id": 294
  },
  {
    "family": "sign-x",
    "type": "single",
    "text": "图中所示表示：",
    "options": [
      "这是辅助标志",
      "这是禁令标志",
      "这是警告标志",
      "这是指示标志"
    ],
    "answer": 2,
    "explain": "警告类标志。",
    "image": "assets/sign-school.svg",
    "imageAlt": "警告类标志",
    "id": 295
  },
  {
    "family": "m12b",
    "type": "multi",
    "text": "下列属于一次记12分的还有：",
    "options": [
      "不让校车",
      "快速路逆行",
      "使用伪造行驶证",
      "代替他人记分牟利"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "不让校车3分。",
    "id": 296
  },
  {
    "family": "fine-tf",
    "type": "tf",
    "text": "饮酒后驾驶机动车，罚款档为：1000元以上2000元以下。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "酒驾罚1000～2000，记12分，暂扣6个月。",
    "id": 297
  },
  {
    "family": "hwy-tf",
    "type": "tf",
    "text": "在高速公路上倒车、逆行、穿越中央分隔带掉头，一次记12分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第八条第六项。",
    "id": 298
  },
  {
    "family": "sign-x",
    "type": "single",
    "text": "图中所示表示：",
    "options": [
      "靠左行驶",
      "禁止向左转弯",
      "禁止掉头",
      "禁止向右转弯"
    ],
    "answer": 1,
    "explain": "禁止向左转弯。",
    "image": "assets/sign-no-left.svg",
    "imageAlt": "禁止向左转弯",
    "id": 299
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在城市快速路超过规定时速50%以上」，正确的有：",
    "options": [
      "属于超速违法",
      "可能并处罚款",
      "记12分",
      "一定吊销驾驶证"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "记12分；是否吊销看情节，不是一律。",
    "id": 300
  },
  {
    "family": "misc-tf",
    "type": "tf",
    "text": "未取得校车驾驶资格驾驶校车记9分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第九条第六项。",
    "id": 301
  },
  {
    "family": "hwy",
    "type": "single",
    "text": "高速公路上车辆发生故障，应在车后方多少米外设置警告标志？",
    "options": [
      "100米",
      "50米",
      "150米",
      "200米"
    ],
    "answer": 2,
    "explain": "高速故障：150米外设警告标志。",
    "id": 302
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "造成轻微伤或财产损失事故后逃逸（尚不构成犯罪），一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为6分。第十条第十项：轻微伤/财产损失逃逸记6分。",
    "id": 303
  },
  {
    "family": "speed",
    "type": "single",
    "text": "驾驶危险物品运输车辆在高速公路上超过规定时速未达20%，一次记多少分？",
    "options": [
      "9分",
      "6分",
      "不记分",
      "1分"
    ],
    "answer": 1,
    "explain": "第十条：中型以上/危化品高速超速未达20%记6分。",
    "id": 304
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "占用应急车道行驶，一次记6分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第十条第十一项。",
    "id": 305
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶中型货车在一般道路上超过规定时速50%以上，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错。正确应为9分。第九条：中型以上普通路超50%记9分。",
    "id": 306
  },
  {
    "family": "cargo-m",
    "type": "multi",
    "text": "关于货车超载记分，正确的有：",
    "options": [
      "30%～50%记3分",
      "100%以上记12分",
      "50%以上记6分",
      "未达30%记1分"
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explain": "没有超载12分档。",
    "id": 307
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶小型汽车在高速公路超过规定时速50%以上」记分，正确的是：",
    "options": [
      "只罚款不记分",
      "一律12分",
      "一律不记分",
      "12分"
    ],
    "answer": 3,
    "explain": "应记12分。",
    "id": 308
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在城市快速路超过规定时速50%以上」，正确的有：",
    "options": [
      "属于超速违法",
      "记12分",
      "可能并处罚款",
      "一定吊销驾驶证"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "记12分；是否吊销看情节，不是一律。",
    "id": 309
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示什么？",
    "options": [
      "限制速度",
      "限制质量",
      "限制高度",
      "限制宽度"
    ],
    "answer": 2,
    "explain": "限制高度",
    "image": "assets/sign-height.svg",
    "imageAlt": "限制高度",
    "id": 310
  },
  {
    "family": "fine-tf",
    "type": "tf",
    "text": "未取得机动车驾驶证驾驶机动车，罚款档为：200元以上2000元以下。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "无证驾驶200～2000。",
    "id": 311
  },
  {
    "family": "sign-x",
    "type": "single",
    "text": "图中所示表示：",
    "options": [
      "禁止停车",
      "停车让行",
      "减速让行",
      "禁止通行"
    ],
    "answer": 1,
    "explain": "停车让行。",
    "image": "assets/sign-stop.svg",
    "imageAlt": "停车让行",
    "id": 312
  },
  {
    "family": "speed",
    "type": "single",
    "text": "驾驶危险物品运输车辆在高速公路上超过规定时速20%以上，一次记多少分？",
    "options": [
      "9分",
      "6分",
      "3分",
      "12分"
    ],
    "answer": 3,
    "explain": "危化品高速超20%记12分。",
    "id": 313
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在一般道路超过规定时速20%以上未达50%」，正确的有：",
    "options": [
      "一定吊销驾驶证",
      "记3分",
      "可能并处罚款",
      "属于超速违法"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "记3分；是否吊销看情节，不是一律。",
    "id": 314
  },
  {
    "family": "fault",
    "type": "single",
    "text": "车辆在道路上发生故障，应：",
    "options": [
      "停在路中间等人帮",
      "开启危险报警闪光灯并在车后设警告标志",
      "迅速报警后离开",
      "继续行驶到目的地"
    ],
    "answer": 1,
    "explain": "双闪+警告标志，人员撤离。",
    "id": 315
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶公路客运汽车在一般道路超过规定时速50%以上」，正确的有：",
    "options": [
      "记9分",
      "一定吊销驾驶证",
      "属于超速违法",
      "可能并处罚款"
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explain": "记9分；是否吊销看情节，不是一律。",
    "id": 316
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在一般道路超过规定时速50%以上」，正确的有：",
    "options": [
      "一定吊销驾驶证",
      "记6分",
      "属于超速违法",
      "可能并处罚款"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "记6分；是否吊销看情节，不是一律。",
    "id": 317
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示：",
    "options": [
      "禁止驶入",
      "解除限制",
      "禁止停车",
      "禁止通行"
    ],
    "answer": 3,
    "explain": "表示禁止一切车辆和行人通行。",
    "image": "assets/sign-no-entry.svg",
    "imageAlt": "禁止通行",
    "id": 318
  },
  {
    "family": "sign-x",
    "type": "single",
    "text": "图中所示表示：",
    "options": [
      "解除禁鸣",
      "禁止鸣喇叭",
      "鸣喇叭路段",
      "注意危险"
    ],
    "answer": 1,
    "explain": "禁止鸣喇叭。",
    "image": "assets/sign-no-horn.svg",
    "imageAlt": "禁止鸣喇叭",
    "id": 319
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶小型汽车在一般道路超过规定时速50%以上」记分，正确的是：",
    "options": [
      "一律不记分",
      "只罚款不记分",
      "6分",
      "一律12分"
    ],
    "answer": 2,
    "explain": "应记6分。",
    "id": 320
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "不按规定安装号牌，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为3分。第十一条第十项：安装不当记3分，不是9分。",
    "id": 321
  },
  {
    "family": "m-fatigue",
    "type": "multi",
    "text": "疲劳驾驶记分正确的有：",
    "options": [
      "载货汽车记3分",
      "普通小客车记6分",
      "中型以上载客记9分",
      "危化品车记9分"
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explain": "普通小客车163号令不记分。",
    "id": 322
  },
  {
    "family": "hard",
    "type": "single",
    "text": "驾驶机动车不按交通信号灯指示通行，一次记：",
    "options": [
      "6分",
      "3分",
      "12分",
      "1分"
    ],
    "answer": 0,
    "explain": "闯红灯6分。",
    "id": 323
  },
  {
    "family": "drink",
    "type": "single",
    "text": "饮酒后驾驶机动车，除罚款外还要：",
    "options": [
      "只警告",
      "记6分",
      "吊销且终身禁驾",
      "记12分并暂扣驾驶证6个月"
    ],
    "answer": 3,
    "explain": "酒驾：记12分+暂扣6个月+罚1000～2000。",
    "id": 324
  },
  {
    "family": "score",
    "type": "single",
    "text": "代替他人接受处罚记分牟利，一次记多少分？",
    "options": [
      "3分",
      "12分",
      "1分",
      "6分"
    ],
    "answer": 1,
    "explain": "第八条第七项。",
    "id": 325
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶危险物品运输车辆在高速公路上超过规定时速未达20%，一次记6分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第十条：中型以上/危化品高速超速未达20%记6分。",
    "id": 326
  },
  {
    "family": "speed",
    "type": "single",
    "text": "驾驶普通小型汽车在城市快速路上超过规定时速20%以上未达50%，一次记多少分？",
    "options": [
      "6分",
      "12分",
      "9分",
      "不记分"
    ],
    "answer": 0,
    "explain": "城市快速路与高速同档。",
    "id": 327
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶中型客车在高速公路超过规定时速20%以上，一次记12分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "正确。",
    "id": 328
  },
  {
    "family": "m-sys",
    "type": "multi",
    "text": "考试与记分制度正确的有：",
    "options": [
      "满分后交钱即自动清零可开",
      "周期满12分要满分教育",
      "科目一100题",
      "学法减分周期内最多减6分"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "须参加学习考试。",
    "id": 329
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶公路客运汽车在一般道路超过规定时速50%以上」记分，正确的是：",
    "options": [
      "只罚款不记分",
      "9分",
      "一律不记分",
      "一律12分"
    ],
    "answer": 1,
    "explain": "应记9分。",
    "id": 330
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶小型汽车在一般道路超过规定时速50%以上」记分，正确的是：",
    "options": [
      "只罚款不记分",
      "一律不记分",
      "一律12分",
      "6分"
    ],
    "answer": 3,
    "explain": "应记6分。",
    "id": 331
  },
  {
    "family": "sign-tf",
    "type": "tf",
    "text": "图中标志（或情形）表示：禁止鸣喇叭。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "禁止鸣喇叭。",
    "id": 332
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在城市快速路超过规定时速50%以上」，正确的有：",
    "options": [
      "属于超速违法",
      "一定吊销驾驶证",
      "可能并处罚款",
      "记12分"
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explain": "记12分；是否吊销看情节，不是一律。",
    "id": 333
  },
  {
    "family": "hwy",
    "type": "single",
    "text": "高速公路上行驶，最低时速不得低于：",
    "options": [
      "90公里",
      "70公里",
      "60公里",
      "80公里"
    ],
    "answer": 2,
    "explain": "高速最低时速60（另有规定除外）。",
    "id": 334
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在高速公路超过规定时速20%以上未达50%，一次记：",
    "options": [
      "1分",
      "6分",
      "3分",
      "9分"
    ],
    "answer": 1,
    "explain": "驾驶小型汽车+高速公路+超过规定时速20%以上未达50%→6分。",
    "id": 335
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶小型汽车在城市快速路超过规定时速50%以上」记分，正确的是：",
    "options": [
      "一律不记分",
      "只罚款不记分",
      "12分",
      "一律12分"
    ],
    "answer": 2,
    "explain": "应记12分。",
    "id": 336
  },
  {
    "family": "speed-trap",
    "type": "single",
    "text": "驾驶校车、中型以上载客载货汽车、危险物品运输车辆以外的机动车，在高速公路、城市快速路以外的道路上超过规定时速百分之五十以上，一次记：",
    "options": [
      "9分",
      "6分",
      "3分",
      "12分"
    ],
    "answer": 1,
    "explain": "两个「以外」=普通车+普通路，超50%记6分。",
    "id": 337
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示：",
    "options": [
      "解除限制",
      "禁止鸣喇叭",
      "禁止停车",
      "禁止驶入"
    ],
    "answer": 1,
    "explain": "禁止鸣喇叭。",
    "image": "assets/sign-no-horn.svg",
    "imageAlt": "禁止鸣喇叭",
    "id": 338
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在一般道路超过规定时速50%以上，一次记：",
    "options": [
      "9分",
      "3分",
      "6分",
      "1分"
    ],
    "answer": 2,
    "explain": "驾驶小型汽车+一般道路+超过规定时速50%以上→6分。",
    "id": 339
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶普通小型汽车在城市快速路上超过规定时速50%以上，一次记6分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错。正确应为12分。第八条：快速路超50%记12分。",
    "id": 340
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示：",
    "options": [
      "禁止掉头",
      "禁止停车",
      "解除限制",
      "禁止驶入"
    ],
    "answer": 0,
    "explain": "禁止掉头标志。",
    "image": "assets/sign-no-u-turn.svg",
    "imageAlt": "禁止掉头",
    "id": 341
  },
  {
    "family": "score",
    "type": "single",
    "text": "造成轻微伤或财产损失事故后逃逸（尚不构成犯罪），一次记多少分？",
    "options": [
      "9分",
      "3分",
      "6分",
      "1分"
    ],
    "answer": 2,
    "explain": "第十条第十项：轻微伤/财产损失逃逸记6分。",
    "id": 342
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "不按规定避让校车，一次记3分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第十一条第八项：不避让校车记3分。",
    "id": 343
  },
  {
    "family": "hwy",
    "type": "single",
    "text": "高速公路上可以停车上下人吗？",
    "options": [
      "晚上可以",
      "可以，靠边即可",
      "不可以",
      "应急车道可以"
    ],
    "answer": 2,
    "explain": "高速禁止停车上下人员、装卸货物。",
    "id": 344
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶普通小型汽车在高速公路上超过规定时速20%以上未达50%，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错。正确应为6分。第十条：普通小车高速超20%～50%记6分。",
    "id": 345
  },
  {
    "family": "cmp-tf",
    "type": "tf",
    "text": "普通路超50%（小车）记6分，高速超50%（小车）记12分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "对比记忆。",
    "id": 346
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶中型客车在高速公路超过规定时速20%以上」记分，正确的是：",
    "options": [
      "12分",
      "一律12分",
      "一律不记分",
      "只罚款不记分"
    ],
    "answer": 0,
    "explain": "应记12分。",
    "id": 347
  },
  {
    "family": "sign-tf",
    "type": "tf",
    "text": "图中标志（或情形）表示：人行横道。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "注意行人。",
    "id": 348
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示什么？",
    "options": [
      "禁止通行",
      "停车让行",
      "减速让行",
      "会车让行"
    ],
    "answer": 2,
    "explain": "减速让行",
    "image": "assets/sign-yield.svg",
    "imageAlt": "减速让行",
    "id": 349
  },
  {
    "family": "lic-m",
    "type": "multi",
    "text": "下列哪些一次记9分？",
    "options": [
      "故意遮挡号牌",
      "闯红灯",
      "准驾不符",
      "高速违法停车"
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explain": "闯红灯6分。",
    "id": 350
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶校车在一般道路上超过规定时速50%以上，一次记9分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "校车普通路超50%记9分。",
    "id": 351
  },
  {
    "family": "cmp",
    "type": "single",
    "text": "下列记分对应正确的是：",
    "options": [
      "两者都记1分",
      "两者都记6分",
      "闯红灯1分，违反禁令标志6分",
      "闯红灯6分，违反禁令标志1分"
    ],
    "answer": 3,
    "explain": "闯红灯→6分；违反禁令标志→1分。",
    "id": 352
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "普通路逆行，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为3分。普通路逆行记3分；高速/快速路逆行才是12分。",
    "id": 353
  },
  {
    "family": "fine",
    "type": "single",
    "text": "伪造变造或使用伪造变造号牌，处：",
    "options": [
      "20元以上200元以下",
      "只拘留",
      "5000元以上",
      "200元以上2000元以下"
    ],
    "answer": 3,
    "explain": "伪造比遮挡重：200～2000，可拘留，记12分。",
    "id": 354
  },
  {
    "family": "speed",
    "type": "single",
    "text": "驾驶普通小型汽车在高速公路上超过规定时速未达20%，一次记多少分？",
    "options": [
      "不记分",
      "9分",
      "3分",
      "1分"
    ],
    "answer": 0,
    "explain": "普通小车高速未达20%不记分。",
    "id": 355
  },
  {
    "family": "misc-tf",
    "type": "tf",
    "text": "借道超车可以占用对面车道不顾对向来车。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "违法，记3分。",
    "id": 356
  },
  {
    "family": "score",
    "type": "single",
    "text": "中型以上载客汽车连续驾驶超4小时休息不足20分钟，一次记多少分？",
    "options": [
      "9分",
      "1分",
      "3分",
      "6分"
    ],
    "answer": 0,
    "explain": "第九条第七项。",
    "id": 357
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶公路客运汽车在一般道路超过规定时速50%以上，一次记：",
    "options": [
      "3分",
      "6分",
      "1分",
      "9分"
    ],
    "answer": 3,
    "explain": "驾驶公路客运汽车+一般道路+超过规定时速50%以上→9分。",
    "id": 358
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶中型客车在高速公路超过规定时速20%以上，一次记：",
    "options": [
      "6分",
      "1分",
      "12分",
      "3分"
    ],
    "answer": 2,
    "explain": "驾驶中型客车+高速公路+超过规定时速20%以上→12分。",
    "id": 359
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶小型汽车在城市快速路超过规定时速50%以上，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "应为12分。",
    "id": 360
  },
  {
    "family": "score",
    "type": "single",
    "text": "饮酒后驾驶机动车，一次记多少分？",
    "options": [
      "3分",
      "6分",
      "12分",
      "1分"
    ],
    "answer": 2,
    "explain": "第八条第一项。",
    "id": 361
  },
  {
    "family": "speed",
    "type": "single",
    "text": "驾驶普通小型汽车在一般道路上超过规定时速50%以上，一次记多少分？",
    "options": [
      "3分",
      "6分",
      "1分",
      "12分"
    ],
    "answer": 1,
    "explain": "第十条：普通小车普通路超50%记6分，不是12。",
    "id": 362
  },
  {
    "family": "cmp-tf",
    "type": "tf",
    "text": "闯红灯记1分，违反禁令标志记6分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "记反了。正确：闯红灯6分，违反禁令标志1分。",
    "id": 363
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "拨打接听手持电话，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为3分。第十一条第六项：手持电话记3分。",
    "id": 364
  },
  {
    "family": "hard-tf",
    "type": "tf",
    "text": "危险物品运输车辆疲劳驾驶超4小时，记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，记9分。",
    "id": 365
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶小型汽车在高速公路超过规定时速50%以上」记分，正确的是：",
    "options": [
      "一律不记分",
      "只罚款不记分",
      "12分",
      "一律12分"
    ],
    "answer": 2,
    "explain": "应记12分。",
    "id": 366
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶公路客运汽车在一般道路超过规定时速50%以上，一次记：",
    "options": [
      "3分",
      "6分",
      "9分",
      "1分"
    ],
    "answer": 2,
    "explain": "驾驶公路客运汽车+一般道路+超过规定时速50%以上→9分。",
    "id": 367
  },
  {
    "family": "crime-m",
    "type": "multi",
    "text": "下列哪些情形，交通肇事致一人以上重伤且负主责/全责可构成交通肇事罪？",
    "options": [
      "无驾驶资格驾驶",
      "严重超载驾驶",
      "酒后、吸食毒品后驾驶",
      "仅未系安全带"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "未系安全带本身不单独构成此项入罪情节。",
    "id": 368
  },
  {
    "family": "cmp",
    "type": "single",
    "text": "下列记分对应正确的是：",
    "options": [
      "轻微伤逃逸6分，轻伤以上逃逸12分",
      "两者都记12分",
      "两者都记6分",
      "轻微伤逃逸12分，轻伤以上逃逸6分"
    ],
    "answer": 0,
    "explain": "轻微伤逃逸→6分；轻伤以上逃逸→12分。",
    "id": 369
  },
  {
    "family": "sign-x-tf",
    "type": "tf",
    "text": "图中标志（情形）的含义是：禁止通行。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "禁止通行。",
    "id": 370
  },
  {
    "family": "pax",
    "type": "single",
    "text": "其他载客汽车超员50%以上未达100%，一次记多少分？",
    "options": [
      "3分",
      "9分",
      "1分",
      "6分"
    ],
    "answer": 3,
    "explain": "第十条第一项。",
    "id": 371
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶普通小型汽车在高速公路上超过规定时速未达20%，一次记不记分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "普通小车高速未达20%不记分。",
    "id": 372
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶小型汽车在高速公路超过规定时速50%以上」记分，正确的是：",
    "options": [
      "一律不记分",
      "只罚款不记分",
      "一律12分",
      "12分"
    ],
    "answer": 3,
    "explain": "应记12分。",
    "id": 373
  },
  {
    "family": "cmp-tf",
    "type": "tf",
    "text": "轻微伤逃逸记12分，轻伤以上逃逸记6分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "记反了。正确：轻微伤逃逸6分，轻伤以上逃逸12分。",
    "id": 374
  },
  {
    "family": "sign-x",
    "type": "single",
    "text": "图中所示表示：",
    "options": [
      "禁止掉头",
      "允许掉头",
      "禁止右转",
      "禁止左转"
    ],
    "answer": 0,
    "explain": "禁止掉头。",
    "image": "assets/sign-no-u-turn.svg",
    "imageAlt": "禁止掉头",
    "id": 375
  },
  {
    "family": "cmp-tf",
    "type": "tf",
    "text": "轻微伤逃逸记6分，轻伤以上逃逸记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "对比记忆。",
    "id": 376
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "饮酒后驾驶机动车，一次记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第八条第一项。",
    "id": 377
  },
  {
    "family": "pax",
    "type": "single",
    "text": "货车载物超过最大允许总质量50%以上，一次记多少分？",
    "options": [
      "6分",
      "1分",
      "3分",
      "9分"
    ],
    "answer": 0,
    "explain": "第十条第四项；163号令无超载12分档。",
    "id": 378
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶小型汽车在高速公路超过规定时速20%以上未达50%」记分，正确的是：",
    "options": [
      "只罚款不记分",
      "6分",
      "一律不记分",
      "一律12分"
    ],
    "answer": 1,
    "explain": "应记6分。",
    "id": 379
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示什么？",
    "options": [
      "人行横道",
      "人行天桥",
      "注意行人",
      "禁止行人通行"
    ],
    "answer": 0,
    "explain": "人行横道",
    "image": "assets/sign-crosswalk.svg",
    "imageAlt": "人行横道",
    "id": 380
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶普通小型汽车在一般道路上超过规定时速50%以上，一次记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错。正确应为6分。第十条：普通小车普通路超50%记6分，不是12。",
    "id": 381
  },
  {
    "family": "hard",
    "type": "single",
    "text": "驾驶机动车运载超限不可解体物品，未按指定时间路线行驶，记：",
    "options": [
      "6分",
      "3分",
      "12分",
      "9分"
    ],
    "answer": 0,
    "explain": "第十条第六项：6分。",
    "id": 382
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶中型货车在一般道路上超过规定时速20%以上未达50%，一次记6分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第十条：中型以上普通路超20%～50%记6分。",
    "id": 383
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "未悬挂号牌上路，一次记9分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第九条第四项：未悬挂记9分。",
    "id": 384
  },
  {
    "family": "m1",
    "type": "multi",
    "text": "下列一次记1分的有：",
    "options": [
      "违反禁令标志",
      "未系安全带",
      "违反禁止标线",
      "手持电话"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "手持电话3分。",
    "id": 385
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶校车在高速公路上超过规定时速20%以上，一次记12分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "校车高速超20%记12分。",
    "id": 386
  },
  {
    "family": "misc-tf",
    "type": "tf",
    "text": "占用应急车道行驶记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "记6分。",
    "id": 387
  },
  {
    "family": "m-base",
    "type": "multi",
    "text": "下列说法正确的有：",
    "options": [
      "安全带仍记3分",
      "满分12分",
      "科目一90分合格",
      "记分周期12个月"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "安全带已改为1分。",
    "id": 388
  },
  {
    "family": "right",
    "type": "single",
    "text": "通过没有交通信号的交叉路口时，应：",
    "options": [
      "鸣喇叭直接过",
      "加速抢行",
      "让右方道路来车先行",
      "谁快谁先"
    ],
    "answer": 2,
    "explain": "无信号路口：让右方来车先行等规则。",
    "id": 389
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶中型货车在一般道路上超过规定时速20%以上未达50%，一次记3分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错。正确应为6分。第十条：中型以上普通路超20%～50%记6分。",
    "id": 390
  },
  {
    "family": "sign-x",
    "type": "single",
    "text": "图中所示表示：",
    "options": [
      "红灯仅禁直行",
      "红灯减速慢行",
      "红灯可以通行",
      "红灯禁止通行"
    ],
    "answer": 3,
    "explain": "红灯，禁止通行。",
    "image": "assets/light-red.svg",
    "imageAlt": "红灯，禁止通行",
    "id": 391
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在高速公路超过规定时速50%以上」，正确的有：",
    "options": [
      "属于超速违法",
      "记12分",
      "一定吊销驾驶证",
      "可能并处罚款"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explain": "记12分；是否吊销看情节，不是一律。",
    "id": 392
  },
  {
    "family": "hwy",
    "type": "single",
    "text": "雾天高速能见度小于50米时，应：",
    "options": [
      "照常行驶",
      "停在应急车道等待",
      "打开远光灯继续开",
      "时速不超过40，从最近出口尽快驶离"
    ],
    "answer": 3,
    "explain": "能见度<50m：车速≤40，尽快驶离高速。",
    "id": 393
  },
  {
    "family": "sign-x",
    "type": "single",
    "text": "图中所示表示：",
    "options": [
      "会车让行",
      "停车让行",
      "减速让行",
      "禁止通行"
    ],
    "answer": 2,
    "explain": "减速让行。",
    "image": "assets/sign-yield.svg",
    "imageAlt": "减速让行",
    "id": 394
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "造成轻微伤或财产损失事故后逃逸（尚不构成犯罪），一次记6分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第十条第十项：轻微伤/财产损失逃逸记6分。",
    "id": 395
  },
  {
    "family": "speed",
    "type": "single",
    "text": "驾驶普通小型汽车在高速公路上超过规定时速20%以上未达50%，一次记多少分？",
    "options": [
      "1分",
      "不记分",
      "6分",
      "12分"
    ],
    "answer": 2,
    "explain": "第十条：普通小车高速超20%～50%记6分。",
    "id": 396
  },
  {
    "family": "score",
    "type": "single",
    "text": "闯红灯（不按信号灯指示通行），一次记多少分？",
    "options": [
      "6分",
      "3分",
      "9分",
      "1分"
    ],
    "answer": 0,
    "explain": "第十条第八项：闯红灯记6分。",
    "id": 397
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶中型客车在高速公路超过规定时速20%以上」记分，正确的是：",
    "options": [
      "一律不记分",
      "12分",
      "只罚款不记分",
      "一律12分"
    ],
    "answer": 1,
    "explain": "应记12分。",
    "id": 398
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶小型汽车在一般道路超过规定时速20%以上未达50%，一次记3分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "正确。",
    "id": 399
  },
  {
    "family": "m-warn",
    "type": "multi",
    "text": "高速故障警告标志设置，正确的有：",
    "options": [
      "开启危险报警闪光灯",
      "标志放在车头即可",
      "车后150米外",
      "夜间开启示廓灯等"
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explain": "应在车后方。",
    "id": 400
  },
  {
    "family": "score",
    "type": "single",
    "text": "未悬挂号牌上路，一次记多少分？",
    "options": [
      "6分",
      "3分",
      "9分",
      "1分"
    ],
    "answer": 2,
    "explain": "第九条第四项：未悬挂记9分。",
    "id": 401
  },
  {
    "family": "m-ped",
    "type": "multi",
    "text": "行人保护相关正确的有：",
    "options": [
      "过斑马线应减速",
      "可在人行横道上超车",
      "不按规定避让行人记3分",
      "行人正在通过应停车让行"
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explain": "人行横道禁超车。",
    "id": 402
  },
  {
    "family": "cmp",
    "type": "single",
    "text": "下列记分对应正确的是：",
    "options": [
      "两者都记3分",
      "两者都记1分",
      "手持电话1分，未系安全带3分",
      "手持电话3分，未系安全带1分"
    ],
    "answer": 3,
    "explain": "手持电话→3分；未系安全带→1分。",
    "id": 403
  },
  {
    "family": "fine",
    "type": "single",
    "text": "把机动车交给无证人驾驶，处：",
    "options": [
      "20元以上200元以下",
      "200元以上2000元以下",
      "只吊销",
      "警告"
    ],
    "answer": 1,
    "explain": "借给无证人开：200～2000，可并处吊销。",
    "id": 404
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示什么？",
    "options": [
      "建议速度",
      "限制速度",
      "最低速度",
      "解除限速"
    ],
    "answer": 1,
    "explain": "最高时速不得超过40公里",
    "image": "assets/sign-speed-40.svg",
    "imageAlt": "最高时速不得超过40公里",
    "id": 405
  },
  {
    "family": "score",
    "type": "single",
    "text": "驾驶证被暂扣期间驾驶机动车，一次记多少分？",
    "options": [
      "1分",
      "9分",
      "6分",
      "3分"
    ],
    "answer": 2,
    "explain": "第十条第九项。",
    "id": 406
  },
  {
    "family": "sign-x-tf",
    "type": "tf",
    "text": "图中标志（情形）的含义是：黄灯可加速抢行。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为「黄灯已过停止线可继续」。",
    "id": 407
  },
  {
    "family": "sign-x-tf",
    "type": "tf",
    "text": "图中标志（情形）的含义是：黄灯已过停止线可继续。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "黄灯提示。",
    "id": 408
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在一般道路超过规定时速50%以上，一次记：",
    "options": [
      "1分",
      "9分",
      "6分",
      "3分"
    ],
    "answer": 2,
    "explain": "驾驶小型汽车+一般道路+超过规定时速50%以上→6分。",
    "id": 409
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶小型汽车在高速公路超过规定时速50%以上，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "应为12分。",
    "id": 410
  },
  {
    "family": "score",
    "type": "single",
    "text": "故意遮挡号牌，一次记多少分？",
    "options": [
      "3分",
      "1分",
      "9分",
      "6分"
    ],
    "answer": 2,
    "explain": "第九条第四项：遮挡污损记9分。",
    "id": 411
  },
  {
    "family": "cargo",
    "type": "single",
    "text": "驾驶机动车运输危险化学品，未经批准进入限制通行区域，记：",
    "options": [
      "3分",
      "9分",
      "12分",
      "6分"
    ],
    "answer": 3,
    "explain": "第十条第七项：6分。",
    "id": 412
  },
  {
    "family": "m-lane",
    "type": "multi",
    "text": "变更车道应注意：",
    "options": [
      "不影响相关车道车辆",
      "开启转向灯",
      "强行别车变道",
      "确认安全后变道"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explain": "禁止强行变道。",
    "id": 413
  },
  {
    "family": "hwy-tf",
    "type": "tf",
    "text": "高速公路上可以骑、轧车行道分界线行驶。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "禁止骑轧分界线。",
    "id": 414
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在城市快速路超过规定时速50%以上」，正确的有：",
    "options": [
      "记12分",
      "属于超速违法",
      "可能并处罚款",
      "一定吊销驾驶证"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "记12分；是否吊销看情节，不是一律。",
    "id": 415
  },
  {
    "family": "lic-m",
    "type": "multi",
    "text": "下列哪些一次记12分？",
    "options": [
      "高速倒车",
      "未系安全带",
      "伪造号牌",
      "饮酒后驾驶"
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explain": "安全带是1分。",
    "id": 416
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "驾驶证被暂扣期间驾驶机动车，一次记6分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第十条第九项。",
    "id": 417
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "不按规定让行，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为3分。第十一条第四项。",
    "id": 418
  },
  {
    "family": "light-m",
    "type": "multi",
    "text": "夜间驾驶正确的做法有：",
    "options": [
      "照明不良用远光",
      "通过路口可交替远近光",
      "会车改近光",
      "会车一直用远光"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "会车禁用远光晃对方。",
    "id": 419
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶公路客运汽车在一般道路超过规定时速50%以上，一次记：",
    "options": [
      "6分",
      "9分",
      "3分",
      "1分"
    ],
    "answer": 1,
    "explain": "驾驶公路客运汽车+一般道路+超过规定时速50%以上→9分。",
    "id": 420
  },
  {
    "family": "cmp",
    "type": "single",
    "text": "下列记分对应正确的是：",
    "options": [
      "高速逆行3分，普通路逆行12分",
      "两者都记3分",
      "两者都记12分",
      "高速逆行12分，普通路逆行3分"
    ],
    "answer": 3,
    "explain": "高速逆行→12分；普通路逆行→3分。",
    "id": 421
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在一般道路超过规定时速20%以上未达50%」，正确的有：",
    "options": [
      "一定吊销驾驶证",
      "可能并处罚款",
      "记3分",
      "属于超速违法"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "记3分；是否吊销看情节，不是一律。",
    "id": 422
  },
  {
    "family": "sign-x-tf",
    "type": "tf",
    "text": "图中标志（情形）的含义是：红灯可以通行。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，应为「红灯禁止通行」。",
    "id": 423
  },
  {
    "family": "m-dui",
    "type": "multi",
    "text": "下列属于危险驾驶相关考点正确的有：",
    "options": [
      "醉驾吊销驾照",
      "酒驾记12分",
      "醉驾记12分",
      "醉驾五年内不得再考（一般情形）"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explain": "醉驾不记分。",
    "id": 424
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "高速公路不按规定车道行驶，一次记3分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第十一条第三项。",
    "id": 425
  },
  {
    "family": "cmp-tf",
    "type": "tf",
    "text": "遮挡号牌记9分，不按规定安装号牌记3分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "对比记忆。",
    "id": 426
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示：",
    "options": [
      "解除限制",
      "减速让行",
      "禁止停车",
      "禁止驶入"
    ],
    "answer": 1,
    "explain": "倒三角：减速让行。",
    "image": "assets/sign-yield.svg",
    "imageAlt": "减速让行",
    "id": 427
  },
  {
    "family": "misc-tf",
    "type": "tf",
    "text": "连续驾驶中型以上载客汽车超4小时休息不足20分钟记9分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第九条第七项。",
    "id": 428
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶小型汽车在一般道路超过规定时速50%以上，一次记6分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "正确。",
    "id": 429
  },
  {
    "family": "cmp-tf",
    "type": "tf",
    "text": "高速逆行记12分，普通路逆行记3分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "对比记忆。",
    "id": 430
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "使用伪造号牌，一次记12分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第八条第三项。",
    "id": 431
  },
  {
    "family": "misc-tf",
    "type": "tf",
    "text": "遇前方车辆排队时可以穿插等候车辆。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "禁止穿插，记3分。",
    "id": 432
  },
  {
    "family": "cmp-tf",
    "type": "tf",
    "text": "酒驾记12分，醉驾记不记分（刑事）。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "对比记忆。",
    "id": 433
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶小型汽车在一般道路超过规定时速20%以上未达50%，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "应为3分。",
    "id": 434
  },
  {
    "family": "sign-tf",
    "type": "tf",
    "text": "图中标志（或情形）表示：夜间照明不良路段应开启近光灯。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错。应开启远光灯（会车时改近光）。",
    "id": 435
  },
  {
    "family": "hard-tf",
    "type": "tf",
    "text": "驾驶机动车违反禁令标志指示，一次记3分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，是1分。",
    "id": 436
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在高速公路超过规定时速50%以上，一次记：",
    "options": [
      "6分",
      "3分",
      "1分",
      "12分"
    ],
    "answer": 3,
    "explain": "驾驶小型汽车+高速公路+超过规定时速50%以上→12分。",
    "id": 437
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶小型汽车在城市快速路超过规定时速50%以上，一次记12分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "正确。",
    "id": 438
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示：",
    "options": [
      "解除限制",
      "注意儿童",
      "禁止驶入",
      "禁止停车"
    ],
    "answer": 1,
    "explain": "注意儿童/学校区域。",
    "image": "assets/sign-school.svg",
    "imageAlt": "注意儿童",
    "id": 439
  },
  {
    "family": "cmp",
    "type": "single",
    "text": "下列记分对应正确的是：",
    "options": [
      "两者都记9分",
      "疲劳（载货）3分，疲劳（危化品）9分",
      "疲劳（载货）9分，疲劳（危化品）3分",
      "两者都记3分"
    ],
    "answer": 1,
    "explain": "疲劳（载货）→3分；疲劳（危化品）→9分。",
    "id": 440
  },
  {
    "family": "light",
    "type": "single",
    "text": "夜间没有路灯、照明不良时，应使用：",
    "options": [
      "雾灯",
      "近光灯",
      "远光灯",
      "危险报警闪光灯"
    ],
    "answer": 2,
    "explain": "无路灯照明不良用远光；会车时改近光。",
    "id": 441
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶公路客运汽车在一般道路超过规定时速50%以上，一次记9分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "正确。",
    "id": 442
  },
  {
    "family": "score",
    "type": "single",
    "text": "使用变造驾驶证，一次记多少分？",
    "options": [
      "6分",
      "12分",
      "3分",
      "1分"
    ],
    "answer": 1,
    "explain": "伪造变造牌证记12分。",
    "id": 443
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "闯红灯（不按信号灯指示通行），一次记6分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第十条第八项：闯红灯记6分。",
    "id": 444
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶小型汽车在高速公路超过规定时速20%以上未达50%，一次记6分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "正确。",
    "id": 445
  },
  {
    "family": "misc-tf",
    "type": "tf",
    "text": "驾驶机动车行经人行横道可以不减速。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "应当减速；遇行人须停车让行。",
    "id": 446
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "驾驶人未按规定系安全带，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第十二条第九项：安全带记1分。",
    "id": 447
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶中型客车在高速公路超过规定时速20%以上」记分，正确的是：",
    "options": [
      "一律12分",
      "12分",
      "一律不记分",
      "只罚款不记分"
    ],
    "answer": 1,
    "explain": "应记12分。",
    "id": 448
  },
  {
    "family": "sign-tf",
    "type": "tf",
    "text": "图中标志（或情形）表示：停车让行。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错。这是禁止通行（禁令）标志。",
    "id": 449
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "不按规定超车，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为3分。第十一条第四项。",
    "id": 450
  },
  {
    "family": "sign-x",
    "type": "single",
    "text": "图中所示表示：",
    "options": [
      "人行横道",
      "禁止行人",
      "注意儿童",
      "学生通道"
    ],
    "answer": 2,
    "explain": "注意儿童。",
    "image": "assets/sign-school.svg",
    "imageAlt": "注意儿童",
    "id": 451
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶中型客车在高速公路超过规定时速20%以上，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "应为12分。",
    "id": 452
  },
  {
    "family": "drink",
    "type": "single",
    "text": "关于醉酒驾驶机动车，下列说法错误的是：",
    "options": [
      "记12分",
      "吊销机动车驾驶证",
      "处拘役，并处罚金",
      "五年内不得重新取得驾驶证"
    ],
    "answer": 0,
    "explain": "醉酒驾车是刑事责任，不走记分；酒驾才记12分。",
    "id": 453
  },
  {
    "family": "lic-tf",
    "type": "tf",
    "text": "记分周期自初次领取驾驶证之日起连续计算。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "第三条。",
    "id": 454
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶公路客运汽车在一般道路超过规定时速50%以上」，正确的有：",
    "options": [
      "属于超速违法",
      "可能并处罚款",
      "记9分",
      "一定吊销驾驶证"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "记9分；是否吊销看情节，不是一律。",
    "id": 455
  },
  {
    "family": "cmp-tf",
    "type": "tf",
    "text": "疲劳（载货）记3分，疲劳（危化品）记9分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "对比记忆。",
    "id": 456
  },
  {
    "family": "lic",
    "type": "single",
    "text": "记分周期为：",
    "options": [
      "6个月",
      "24个月",
      "12个月",
      "一个自然年"
    ],
    "answer": 2,
    "explain": "记分周期12个月。",
    "id": 457
  },
  {
    "family": "score-tf",
    "type": "tf",
    "text": "不按规定避让校车，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错，应为3分。第十一条第八项：不避让校车记3分。",
    "id": 458
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶普通小型汽车在一般道路上超过规定时速未达20%，一次记3分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "错。正确应为不记分。普通小车+普通路+未达20%：163号令无记分项。",
    "id": 459
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示什么？",
    "options": [
      "允许掉头",
      "禁止右转",
      "禁止左转",
      "禁止掉头"
    ],
    "answer": 3,
    "explain": "禁止掉头",
    "image": "assets/sign-no-u-turn.svg",
    "imageAlt": "禁止掉头",
    "id": 460
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在高速公路超过规定时速50%以上」，正确的有：",
    "options": [
      "一定吊销驾驶证",
      "记12分",
      "属于超速违法",
      "可能并处罚款"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "记12分；是否吊销看情节，不是一律。",
    "id": 461
  },
  {
    "family": "m-hwy",
    "type": "multi",
    "text": "高速公路上禁止的行为有：",
    "options": [
      "倒车",
      "在服务区停车",
      "逆行",
      "穿越中央分隔带掉头"
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explain": "服务区停车合法。",
    "id": 462
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶中型客车在高速公路超过规定时速20%以上」，正确的有：",
    "options": [
      "记12分",
      "可能并处罚款",
      "属于超速违法",
      "一定吊销驾驶证"
    ],
    "answer": [
      0,
      1,
      2
    ],
    "explain": "记12分；是否吊销看情节，不是一律。",
    "id": 463
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶中型客车在高速公路超过规定时速20%以上」，正确的有：",
    "options": [
      "一定吊销驾驶证",
      "属于超速违法",
      "记12分",
      "可能并处罚款"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "记12分；是否吊销看情节，不是一律。",
    "id": 464
  },
  {
    "family": "hard-tf",
    "type": "tf",
    "text": "准驾车型不符，记12分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错，记9分。",
    "id": 465
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在一般道路超过规定时速50%以上」，正确的有：",
    "options": [
      "一定吊销驾驶证",
      "属于超速违法",
      "记6分",
      "可能并处罚款"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "记6分；是否吊销看情节，不是一律。",
    "id": 466
  },
  {
    "family": "m-load",
    "type": "multi",
    "text": "载货超载记分正确的有：",
    "options": [
      "超100%记12分",
      "50%以上记6分",
      "30%～50%记3分",
      "未达30%记1分"
    ],
    "answer": [
      1,
      2,
      3
    ],
    "explain": "无超载12分档。",
    "id": 467
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶小型汽车在一般道路超过规定时速20%以上未达50%」记分，正确的是：",
    "options": [
      "一律不记分",
      "一律12分",
      "3分",
      "只罚款不记分"
    ],
    "answer": 2,
    "explain": "应记3分。",
    "id": 468
  },
  {
    "family": "sign",
    "type": "single",
    "text": "图中标志表示：",
    "options": [
      "解除限制",
      "限制高度",
      "禁止停车",
      "禁止驶入"
    ],
    "answer": 1,
    "explain": "限制高度标志。",
    "image": "assets/sign-height.svg",
    "imageAlt": "限制高度",
    "id": 469
  },
  {
    "family": "sign-tf",
    "type": "tf",
    "text": "图中标志（或情形）表示：禁止掉头。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "禁止掉头标志。",
    "id": 470
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶中型客车在高速公路超过规定时速20%以上」记分，正确的是：",
    "options": [
      "一律不记分",
      "一律12分",
      "12分",
      "只罚款不记分"
    ],
    "answer": 2,
    "explain": "应记12分。",
    "id": 471
  },
  {
    "family": "pax",
    "type": "single",
    "text": "7座以上载客汽车超员50%以上未达100%，一次记多少分？",
    "options": [
      "1分",
      "6分",
      "9分",
      "3分"
    ],
    "answer": 2,
    "explain": "第九条第一项。",
    "id": 472
  },
  {
    "family": "pax",
    "type": "single",
    "text": "货车载物超过最大允许总质量未达30%，一次记多少分？",
    "options": [
      "9分",
      "1分",
      "6分",
      "3分"
    ],
    "answer": 1,
    "explain": "第十二条第六项。",
    "id": 473
  },
  {
    "family": "pax",
    "type": "single",
    "text": "货车载物超过最大允许总质量30%以上未达50%，一次记多少分？",
    "options": [
      "1分",
      "9分",
      "3分",
      "6分"
    ],
    "answer": 2,
    "explain": "第十一条第九项。",
    "id": 474
  },
  {
    "family": "sign-x-tf",
    "type": "tf",
    "text": "图中标志（情形）的含义是：禁止掉头。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 0,
    "explain": "禁止掉头。",
    "id": 475
  },
  {
    "family": "hard",
    "type": "single",
    "text": "造成致人轻微伤的交通事故后逃逸，尚不构成犯罪，记：",
    "options": [
      "9分",
      "6分",
      "3分",
      "12分"
    ],
    "answer": 1,
    "explain": "轻微伤逃逸6分。",
    "id": 476
  },
  {
    "family": "pax",
    "type": "single",
    "text": "公路客运汽车超员20%以上，一次记多少分？",
    "options": [
      "3分",
      "6分",
      "12分",
      "1分"
    ],
    "answer": 2,
    "explain": "营运客车超员20%以上记12分。",
    "id": 477
  },
  {
    "family": "score",
    "type": "single",
    "text": "高速或快速路违法停车，一次记多少分？",
    "options": [
      "9分",
      "3分",
      "6分",
      "1分"
    ],
    "answer": 0,
    "explain": "第九条第三项。",
    "id": 478
  },
  {
    "family": "fine",
    "type": "single",
    "text": "驾驶拼装机动车上路，处：",
    "options": [
      "1000元以上5000元以下",
      "20元以上200元以下",
      "200元以上2000元以下并吊销",
      "只警告"
    ],
    "answer": 2,
    "explain": "拼装车：200～2000并吊销。",
    "id": 479
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶小型汽车在高速公路超过规定时速20%以上未达50%」记分，正确的是：",
    "options": [
      "一律12分",
      "一律不记分",
      "只罚款不记分",
      "6分"
    ],
    "answer": 3,
    "explain": "应记6分。",
    "id": 480
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶校车在一般道路上超过规定时速50%以上，一次记6分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "错。正确应为9分。校车普通路超50%记9分。",
    "id": 481
  },
  {
    "family": "hard",
    "type": "single",
    "text": "下列说法正确的是：",
    "options": [
      "普通小车普通路超50%记12分",
      "普通小车普通路超50%记6分",
      "普通小车高速超20%记12分",
      "禁令标志记3分"
    ],
    "answer": 1,
    "explain": "普通路超50%→6分；禁令1分；高速超20%～50%→6分。",
    "id": 482
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在一般道路超过规定时速20%以上未达50%」，正确的有：",
    "options": [
      "属于超速违法",
      "一定吊销驾驶证",
      "记3分",
      "可能并处罚款"
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explain": "记3分；是否吊销看情节，不是一律。",
    "id": 483
  },
  {
    "family": "light",
    "type": "single",
    "text": "夜间会车，应在距对面来车多少米以外改用近光灯？",
    "options": [
      "100米",
      "50米",
      "200米",
      "150米"
    ],
    "answer": 3,
    "explain": "夜间会车150米外改近光。",
    "id": 484
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "下列关于「驾驶小型汽车在一般道路超过规定时速20%以上未达50%」记分，正确的是：",
    "options": [
      "只罚款不记分",
      "3分",
      "一律12分",
      "一律不记分"
    ],
    "answer": 1,
    "explain": "应记3分。",
    "id": 485
  },
  {
    "family": "score",
    "type": "single",
    "text": "行经人行横道不按规定避让行人，一次记多少分？",
    "options": [
      "9分",
      "6分",
      "1分",
      "3分"
    ],
    "answer": 3,
    "explain": "第十一条第七项：不让行人记3分。",
    "id": 486
  },
  {
    "family": "speed",
    "type": "single",
    "text": "驾驶校车在一般道路上超过规定时速10%以上未达20%，一次记多少分？",
    "options": [
      "不记分",
      "6分",
      "12分",
      "1分"
    ],
    "answer": 3,
    "explain": "第十二条：中型以上/校车/危化品普通路超10%～20%记1分。",
    "id": 487
  },
  {
    "family": "hwy",
    "type": "single",
    "text": "进入高速公路行驶的机动车时速低于多少不得驶入？",
    "options": [
      "80公里",
      "50公里",
      "60公里",
      "70公里"
    ],
    "answer": 3,
    "explain": "最高设计时速低于70的机动车不得进入高速。",
    "id": 488
  },
  {
    "family": "fill-s",
    "type": "single",
    "text": "驾驶小型汽车在一般道路超过规定时速20%以上未达50%，一次记：",
    "options": [
      "1分",
      "9分",
      "3分",
      "6分"
    ],
    "answer": 2,
    "explain": "驾驶小型汽车+一般道路+超过规定时速20%以上未达50%→3分。",
    "id": 489
  },
  {
    "family": "cmp-tf",
    "type": "tf",
    "text": "手持电话记3分，未系安全带记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "对比记忆。",
    "id": 490
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶小型汽车在高速公路超过规定时速20%以上未达50%，一次记1分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 0,
    "explain": "应为6分。",
    "id": 491
  },
  {
    "family": "fill-m",
    "type": "multi",
    "text": "关于「驾驶小型汽车在高速公路超过规定时速20%以上未达50%」，正确的有：",
    "options": [
      "属于超速违法",
      "一定吊销驾驶证",
      "记6分",
      "可能并处罚款"
    ],
    "answer": [
      0,
      2,
      3
    ],
    "explain": "记6分；是否吊销看情节，不是一律。",
    "id": 492
  },
  {
    "family": "cmp-tf",
    "type": "tf",
    "text": "普通路超50%（小车）记12分，高速超50%（小车）记6分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "记反了。正确：普通路超50%（小车）6分，高速超50%（小车）12分。",
    "id": 493
  },
  {
    "family": "cmp-tf",
    "type": "tf",
    "text": "遮挡号牌记3分，不按规定安装号牌记9分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "记反了。正确：遮挡号牌9分，不按规定安装号牌3分。",
    "id": 494
  },
  {
    "family": "score",
    "type": "single",
    "text": "违反禁止标线指示，一次记多少分？",
    "options": [
      "6分",
      "1分",
      "3分",
      "9分"
    ],
    "answer": 1,
    "explain": "禁止标线与禁令标志同为1分。",
    "id": 495
  },
  {
    "family": "speed-tf",
    "type": "tf",
    "text": "驾驶普通小型汽车在城市快速路上超过规定时速50%以上，一次记12分。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "第八条：快速路超50%记12分。",
    "id": 496
  },
  {
    "family": "m-light",
    "type": "multi",
    "text": "信号灯相关正确说法有：",
    "options": [
      "黄灯已过线可继续",
      "红灯禁止通行",
      "红灯可右转不受限",
      "绿灯谨慎通行"
    ],
    "answer": [
      0,
      1,
      3
    ],
    "explain": "右转仍受标志标线约束。",
    "id": 497
  },
  {
    "family": "sign-tf",
    "type": "tf",
    "text": "图中标志（或情形）表示：限制高度。",
    "options": [
      "错误",
      "正确"
    ],
    "answer": 1,
    "explain": "限制高度标志。",
    "id": 498
  },
  {
    "family": "lic",
    "type": "single",
    "text": "机动车驾驶人在一个记分周期内累积记分满12分，应：",
    "options": [
      "直接吊销",
      "参加满分学习、考试",
      "自动清零",
      "交罚款即可继续开"
    ],
    "answer": 1,
    "explain": "满分须参加满分教育与考试。",
    "id": 499
  },
  {
    "family": "fill-tf",
    "type": "tf",
    "text": "驾驶小型汽车在高速公路超过规定时速20%以上未达50%，一次记1分。",
    "options": [
      "正确",
      "错误"
    ],
    "answer": 1,
    "explain": "应为6分。",
    "id": 500
  }
];

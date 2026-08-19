/**
 * 科目一专项：全是 ABCD 单选，拆开问，答案打散。
 * 记分唯一依据：公安部令第163号《道路交通安全违法行为记分管理办法》（2022.4.1 起，现行有效）。
 * 改题前必读：.cursor/rules/jiakao-163-scoring.mdc
 *
 * 普通小车超速（易错）：
 *   普通路：未达20%→不记分；20%～50%→3分；50%+→6分
 *   高速/快速：未达20%→不记分；20%～50%→6分；50%+→12分
 */
const QUESTIONS = [
  /* —— 1分 —— */
  {
    id: 7, family: "s1-belt", type: "single",
    text: "驾驶人开车未按规定使用安全带，一次记多少分？",
    options: ["不记分只罚款", "6分", "3分", "1分"], answer: 3,
    explain: "163号令第十二条第九项：未系安全带记 1 分（2022 改革后从 3 分降为 1 分）。"
  },
  {
    id: 8, family: "s1-belt", type: "single",
    text: "未按规定使用安全带，一次记：",
    options: ["9分", "12分", "6分", "1分"], answer: 3,
    explain: "安全带这项是 1 分，别记成改革前的 3 分。"
  },
  {
    id: 9, family: "s1-sign", type: "single",
    text: "违反禁令标志指示行驶，一次记多少分？",
    options: ["6分", "1分", "9分", "12分"], answer: 1,
    explain: "禁令标志、禁止标线记 1 分（第十二条第四项）。闯红灯才是 6 分。"
  },
  {
    id: 10, family: "s1-sign", type: "single",
    text: "驾驶机动车违反禁止标线指示，一次记：",
    options: ["12分", "6分", "1分", "3分"], answer: 2,
    explain: "禁止标线和禁令标志一样，记 1 分。"
  },

  /* —— 3分 —— */
  {
    id: 1, family: "s3-lane", type: "single",
    text: "驾驶机动车在高速公路上不按规定车道行驶，一次记多少分？",
    options: ["9分", "1分", "6分", "3分"], answer: 3,
    explain: "高速 / 城市快速路不按规定车道行驶，记 3 分。"
  },
  {
    id: 2, family: "s3-lane", type: "single",
    text: "在城市快速路上不按规定车道行驶，一次记：",
    options: ["12分", "3分", "6分", "9分"], answer: 1,
    explain: "和高速公路一样，不按规定车道行驶记 3 分。"
  },
  {
    id: 3, family: "s3-minspeed", type: "single",
    text: "在高速公路上低于规定最低速度行驶，一次记多少分？",
    options: ["3分", "6分", "9分", "12分"], answer: 0,
    explain: "低于最低时速是 3 分，别和超速搞混。"
  },
  {
    id: 4, family: "s3-minspeed", type: "single",
    text: "城市快速路上行驶低于规定最低时速，一次记：",
    options: ["6分", "12分", "3分", "9分"], answer: 2,
    explain: "高速、城市快速路低于最低时速都记 3 分。"
  },
  {
    id: 5, family: "s3-phone", type: "single",
    text: "开车时拨打、接听手持电话，一次记多少分？",
    options: ["1分", "6分", "3分", "12分"], answer: 2,
    explain: "手持电话开车记 3 分。蓝牙免提一般不按这项。"
  },
  {
    id: 6, family: "s3-phone", type: "single",
    text: "驾驶机动车时接打手持电话，一次记：",
    options: ["12分", "3分", "9分", "不记分"], answer: 1,
    explain: "手持电话记 3 分，不是 12 分。"
  },
  {
    id: 11, family: "s3-overtake", type: "single",
    text: "不按规定超车，一次记多少分？",
    options: ["3分", "6分", "9分", "12分"], answer: 0,
    explain: "不按规定超车、让行记 3 分。"
  },
  {
    id: 12, family: "s3-overtake", type: "single",
    text: "驾驶机动车不按规定让行，一次记：",
    options: ["12分", "9分", "6分", "3分"], answer: 3,
    explain: "不按规定让行也是 3 分。"
  },
  {
    id: 15, family: "s3-ped", type: "single",
    text: "行经人行横道不按规定减速、停车、避让行人，一次记多少分？",
    options: ["6分", "3分", "12分", "9分"], answer: 1,
    explain: "不按规定避让行人记 3 分（第十一条第七项），不是 6 分。"
  },
  {
    id: 16, family: "s3-ped", type: "single",
    text: "过斑马线不避让正在通过的行人，一次记：",
    options: ["1分", "12分", "3分", "6分"], answer: 2,
    explain: "斑马线不让行人，3 分。"
  },
  {
    id: 19, family: "s3-school", type: "single",
    text: "不按规定避让校车，一次记多少分？",
    options: ["吊销驾驶证", "12分", "3分", "6分"], answer: 2,
    explain: "不避让校车记 3 分（第十一条第八项），不是直接吊销。"
  },
  {
    id: 20, family: "s3-school", type: "single",
    text: "驾驶机动车不按规定避让校车，一次记：",
    options: ["6分", "9分", "12分", "3分"], answer: 3,
    explain: "避让校车这项是 3 分。"
  },
  {
    id: 21, family: "s3-plate", type: "single",
    text: "不按规定安装机动车号牌，一次记多少分？",
    options: ["12分", "6分", "9分", "3分"], answer: 3,
    explain: "不按规定安装号牌记 3 分。遮挡 / 污损 / 未悬挂才是 9 分。"
  },
  {
    id: 22, family: "s3-plate", type: "single",
    text: "号牌安装位置、方式不符合规定，一次记：",
    options: ["3分", "9分", "12分", "6分"], answer: 0,
    explain: "装法不对 = 3 分，别和遮挡污损的 9 分搞混。"
  },
  {
    id: 17, family: "s3-fatigue", type: "single",
    text: "载货汽车连续驾驶超过4小时未停车休息，一次记多少分？",
    options: ["12分", "6分", "3分", "9分"], answer: 2,
    explain: "载货汽车疲劳 4 小时记 3 分（第十一条第十四项）。普通小客车不在记分范围。"
  },
  {
    id: 18, family: "s3-fatigue-trap", type: "single",
    text: "普通小客车连续驾驶超过4小时未停车休息，一次记多少分？",
    options: ["3分", "9分", "6分", "不记分"], answer: 3,
    explain: "坑：163 号令只对载货、中型以上载客、危化品有疲劳记分；普通小客车这项不记分。"
  },

  /* —— 6分 —— */
  {
    id: 13, family: "s6-red", type: "single",
    text: "驾驶机动车不按交通信号灯指示通行（闯红灯），一次记多少分？",
    options: ["3分", "9分", "6分", "12分"], answer: 2,
    explain: "闯红灯记 6 分（第十条第八项），不是禁令标志那种 1 分。"
  },
  {
    id: 14, family: "s6-red", type: "single",
    text: "闯红灯一次记12分。实际应记：",
    options: ["12分", "9分", "3分", "6分"], answer: 3,
    explain: "坑：闯红灯是 6 分，不是 12 分。"
  },
  {
    id: 27, family: "s6-escape", type: "single",
    text: "造成致人轻微伤或者财产损失的交通事故后逃逸，尚不构成犯罪，一次记多少分？",
    options: ["6分", "12分", "9分", "只罚款"], answer: 0,
    explain: "轻微伤或财产损失逃逸记 6 分（第十条第十项）。轻伤以上逃逸才是 12 分。"
  },
  {
    id: 28, family: "s6-escape", type: "single",
    text: "事故后逃逸（尚不构成犯罪、仅轻微伤或财产损失），一次记：",
    options: ["3分", "9分", "12分", "6分"], answer: 3,
    explain: "看清题干：轻微伤 / 财产损失档是 6 分。"
  },

  /* —— 9分 —— */
  {
    id: 23, family: "s9-cover", type: "single",
    text: "故意遮挡机动车号牌，一次记多少分？",
    options: ["12分", "9分", "6分", "3分"], answer: 1,
    explain: "163 号令：故意遮挡、污损号牌记 9 分（第九条第四项）。"
  },
  {
    id: 24, family: "s9-cover", type: "single",
    text: "故意污损机动车号牌，一次记：",
    options: ["6分", "12分", "吊销驾驶证", "9分"], answer: 3,
    explain: "遮挡、污损都是 9 分。伪造变造才是 12 分。"
  },
  {
    id: 31, family: "s9-type", type: "single",
    text: "驾驶与准驾车型不符的机动车，一次记多少分？",
    options: ["6分", "12分", "9分", "只警告"], answer: 2,
    explain: "准驾不符记 9 分（第九条第五项），不是 12 分。"
  },
  {
    id: 32, family: "s9-type", type: "single",
    text: "C1 驾驶证驾驶须持 A 证的客车，一次记：",
    options: ["3分", "6分", "9分", "12分"], answer: 2,
    explain: "准驾车型不符，9 分。"
  },
  {
    id: 35, family: "s9-noplate", type: "single",
    text: "上道路行驶未悬挂机动车号牌，一次记多少分？",
    options: ["9分", "6分", "3分", "12分"], answer: 0,
    explain: "未悬挂 = 9 分（第九条第四项）。不是 12 分，也不是安装不当的 3 分。"
  },
  {
    id: 36, family: "s9-noplate", type: "single",
    text: "机动车上路未悬挂号牌，一次记：",
    options: ["6分", "12分", "9分", "3分"], answer: 2,
    explain: "未悬挂是 9 分，别记成 12 分，也别和安装不当的 3 分搞混。"
  },
  {
    id: 37, family: "s9-fatigue", type: "single",
    text: "危险物品运输车辆连续驾驶超过4小时未休息，一次记多少分？",
    options: ["6分", "3分", "12分", "9分"], answer: 3,
    explain: "危化品、中型以上载客汽车疲劳驾驶记 9 分（第九条第七项）。"
  },
  {
    id: 38, family: "s9-fatigue", type: "single",
    text: "中型以上载客汽车连续驾驶超过4小时，休息不足20分钟，一次记：",
    options: ["12分", "6分", "9分", "3分"], answer: 2,
    explain: "中型以上载客 / 危化品疲劳记 9 分，不是 12 分也不是 6 分。"
  },

  /* —— 12分 —— */
  {
    id: 25, family: "s12-drink", type: "single",
    text: "饮酒后驾驶机动车，一次记多少分？",
    options: ["6分", "9分", "3分", "12分"], answer: 3,
    explain: "酒驾记 12 分，并暂扣驾驶证 6 个月、罚 1000～2000 元。"
  },
  {
    id: 26, family: "s12-drink", type: "single",
    text: "酒驾除罚款外，记分是：",
    options: ["12分", "6分", "不记分", "9分"], answer: 0,
    explain: "酒驾记满 12 分。醉驾走刑事，不是记分能了事。"
  },
  {
    id: 29, family: "s12-fake", type: "single",
    text: "使用伪造的机动车号牌上路，一次记多少分？",
    options: ["9分", "6分", "12分", "3分"], answer: 2,
    explain: "伪造、变造号牌记 12 分。只是遮挡污损才是 9 分。"
  },
  {
    id: 30, family: "s12-fake", type: "single",
    text: "使用变造的行驶证、驾驶证，一次记：",
    options: ["12分", "9分", "6分", "3分"], answer: 0,
    explain: "伪造变造号牌 / 行驶证 / 驾驶证，都是 12 分。"
  },
  {
    id: 33, family: "s12-reverse", type: "single",
    text: "在高速公路上倒车，一次记多少分？",
    options: ["3分", "6分", "12分", "9分"], answer: 2,
    explain: "高速 / 城市快速路倒车、逆行、穿越中央分隔带掉头，都是 12 分。"
  },
  {
    id: 34, family: "s12-reverse", type: "single",
    text: "城市快速路上逆行，一次记：",
    options: ["12分", "6分", "3分", "9分"], answer: 0,
    explain: "快速路逆行和高速倒车同一档：12 分。"
  },

  /* —— 超速区间（163号令，拆开问） —— */
  {
    id: 39, family: "r-speed-n", type: "single",
    text: "普通小型汽车在一般道路上超过规定时速未达20%，一次记多少分？",
    options: ["6分", "3分", "1分", "不记分"], answer: 3,
    explain: "普通小车 + 普通路 + 未达 20%：163 号令无对应记分项，不记分（仍可罚款）。"
  },
  {
    id: 40, family: "r-speed-n", type: "single",
    text: "普通小车在普通道路超速 20% 以上、未达 50%，一次记：",
    options: ["12分", "3分", "9分", "6分"], answer: 1,
    explain: "普通路 20%～不足 50%：3 分（第十一条第二项）。"
  },
  {
    id: 41, family: "r-speed-n", type: "single",
    text: "驾驶小型汽车在高速公路、城市快速路以外的道路上超过规定时速50%以上，一次记多少分？",
    options: ["12分", "9分", "6分", "3分"], answer: 2,
    explain: "普通小车 + 普通路 + 超 50% 记 6 分（第十条第三项）。12 分是高速超 50%；9 分是中型以上普通路超 50%。"
  },
  {
    id: 42, family: "r-speed-h", type: "single",
    text: "驾驶小型汽车在高速公路上超过规定时速20%以上未达50%，一次记多少分？",
    options: ["9分", "1分", "6分", "3分"], answer: 2,
    explain: "普通小车高速超速 20%～50% 记 6 分。中型以上在高速超 20% 才是 12 分。"
  },
  {
    id: 43, family: "r-speed-h", type: "single",
    text: "普通小车在城市快速路上超过规定时速未达20%，一次记：",
    options: ["3分", "6分", "12分", "不记分"], answer: 3,
    explain: "坑：未达 20% 不记分；20%～50% 才记 6 分；50% 以上记 12 分。"
  },
  {
    id: 44, family: "r-speed-h", type: "single",
    text: "普通小型汽车在高速公路上超过规定时速50%以上，一次记多少分？",
    options: ["6分", "9分", "3分", "12分"], answer: 3,
    explain: "普通小车在高速 / 快速路上超 50% 记 12 分（第八条第五项）。"
  },
  {
    id: 45, family: "r-speed-trap", type: "single",
    text: "驾驶校车、中型以上载客载货汽车、危险物品运输车辆以外的机动车，在高速公路、城市快速路以外的道路上超过规定时速百分之五十以上，一次记9分。应记：",
    options: ["9分", "12分", "6分", "3分"], answer: 2,
    explain: "两个「以外」= 普通车 + 普通路。超 50% 记 6 分，不是题干里的 9 分。"
  },
  {
    id: 46, family: "r-speed-hv", type: "single",
    text: "危险物品运输车辆在高速公路上超过规定时速20%以上，一次记多少分？",
    options: ["6分", "3分", "9分", "12分"], answer: 3,
    explain: "危化品 / 中型以上：高速超 20% 以上就是 12 分。"
  },
  {
    id: 47, family: "r-speed-hv", type: "single",
    text: "中型货车在普通道路上超过规定时速50%以上，一次记：",
    options: ["6分", "12分", "9分", "3分"], answer: 2,
    explain: "中型以上在普通路超 50% 记 9 分（第九条第二项）。普通小车同样情况才是 6 分。"
  },

  /* —— 超员 / 超载 —— */
  {
    id: 48, family: "r-pax", type: "single",
    text: "校车载人超过核定人数未达20%，一次记多少分？",
    options: ["3分", "12分", "6分", "9分"], answer: 2,
    explain: "营运客车 / 校车超员不到 20%：6 分。"
  },
  {
    id: 49, family: "r-pax", type: "single",
    text: "校车载人超过核定人数20%以上，一次记：",
    options: ["6分", "9分", "吊销驾驶证", "12分"], answer: 3,
    explain: "超员 20% 以上记 12 分。"
  },
  {
    id: 50, family: "r-load", type: "single",
    text: "货车载物超过最大允许总质量30%以上未达50%，一次记多少分？",
    options: ["12分", "6分", "3分", "9分"], answer: 2,
    explain: "超载 30%～不足 50%：3 分（第十一条第九项）。"
  },
  {
    id: 51, family: "r-load", type: "single",
    text: "货车载物超过最大允许总质量50%以上，一次记：",
    options: ["6分", "9分", "12分", "3分"], answer: 0,
    explain: "超载 50% 及以上：6 分（第十条第四项）。163 号令无超载 12 分档。"
  },

  /* —— 罚款 —— */
  {
    id: 52, family: "f-drink", type: "single",
    text: "饮酒后驾驶机动车，并处多少罚款？",
    options: ["200元以上500元以下", "500元以上1000元以下", "1000元以上2000元以下", "2000元以上5000元以下"], answer: 2,
    explain: "酒驾罚款 1000～2000 元，同时记 12 分、暂扣 6 个月。"
  },
  {
    id: 53, family: "f-drink", type: "single",
    text: "酒驾的罚款区间是：",
    options: ["20～200元", "200～2000元", "1000～2000元", "只记分不罚款"], answer: 2,
    explain: "记住：酒驾 1000～2000；无证是 200～2000。"
  },
  {
    id: 54, family: "f-nodrive", type: "single",
    text: "未取得机动车驾驶证驾驶机动车，处多少罚款？",
    options: ["20元以上200元以下", "200元以上2000元以下", "1000元以上2000元以下", "5000元"], answer: 1,
    explain: "无证驾驶：200～2000 元。"
  },
  {
    id: 55, family: "f-nodrive", type: "single",
    text: "没有驾驶证开车，罚款档是：",
    options: ["1000～2000元", "20～200元", "200～2000元", "只拘留"], answer: 2,
    explain: "无证 200～2000，别和酒驾的 1000～2000 记反。"
  },
  {
    id: 56, family: "f-lend", type: "single",
    text: "把机动车交给没有驾驶证的人驾驶，处：",
    options: ["警告", "20元以上200元以下罚款", "200元以上2000元以下罚款", "只吊销不罚款"], answer: 2,
    explain: "借给没证人开，罚款 200～2000，可并处吊销。"
  },
  {
    id: 57, family: "f-lend", type: "single",
    text: "将机动车交由未取得驾驶证的人驾驶，罚款是：",
    options: ["200～2000元", "20～200元", "1000～2000元", "5～50元"], answer: 0,
    explain: "和无证驾驶同一档：200～2000。"
  },
  {
    id: 58, family: "f-plate", type: "single",
    text: "故意遮挡、污损或不按规定安装号牌，处：",
    options: ["200元以上500元以下罚款", "警告或者20元以上200元以下罚款", "1000元以上2000元以下罚款", "只记分不罚款"], answer: 1,
    explain: "号牌违法罚款：警告或 20～200 元。记分：遮挡污损 9 分，安装不当 3 分。"
  },
  {
    id: 59, family: "f-plate", type: "single",
    text: "不按规定安装号牌的罚款是：",
    options: ["1000～2000元", "200～2000元", "警告或20～200元", "5000元"], answer: 2,
    explain: "装牌违法罚款 20～200；记分 3 分（不是 9 分）。"
  },
  {
    id: 60, family: "f-fake", type: "single",
    text: "伪造、变造或者使用伪造、变造机动车号牌，处：",
    options: ["20元以上200元以下罚款", "200元以上2000元以下罚款", "5000元以上罚款", "只拘留不罚款"], answer: 1,
    explain: "伪造变造号牌：200～2000 元，可并处 15 日以下拘留，记 12 分。"
  },
  {
    id: 61, family: "f-fake", type: "single",
    text: "使用伪造号牌的罚款档是：",
    options: ["20～200元", "200～2000元", "1000～2000元", "只记分"], answer: 1,
    explain: "伪造比遮挡重一档：200～2000，不是 20～200。"
  },
  {
    id: 62, family: "f-assemble", type: "single",
    text: "驾驶拼装的机动车上道路行驶，处多少罚款并吊销驾驶证？",
    options: ["20元以上200元以下", "200元以上2000元以下", "1000元以上5000元以下", "只警告"], answer: 1,
    explain: "拼装车、报废车上路：200～2000 元 + 吊销。"
  },
  {
    id: 63, family: "f-assemble", type: "single",
    text: "驾驶已达报废标准的机动车上路，罚款是：",
    options: ["200～2000元并吊销", "20～200元", "只记12分", "1000～2000元不吊销"], answer: 0,
    explain: "报废车上路和拼装车一样：200～2000 并吊销。"
  },
  {
    id: 64, family: "f-general", type: "single",
    text: "违反道路交通安全法律、法规关于道路通行规定的，处警告或者多少罚款？",
    options: ["5元以上50元以下", "200元以上500元以下", "20元以上200元以下", "1000元以上2000元以下"], answer: 2,
    explain: "普通违章口袋档：警告或 20～200 元。"
  },
  {
    id: 65, family: "f-general", type: "single",
    text: "一般道路通行违法的罚款档是：",
    options: ["20～200元", "200～2000元", "1000～2000元", "只警告"], answer: 0,
    explain: "口诀：普通违章 20～200；无证 / 借车给没证人 / 伪造号牌 / 拼装车 200～2000；酒驾 1000～2000。"
  }
];

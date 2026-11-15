/* 音标库：小学/初中常见国际音标 + 例词（例词走美音真人） */
window.EN_IPA_CHART = [
  {
    id: "long",
    name: "长元音",
    items: [
      { ipa: "iː", tip: "拉长的「衣」", examples: ["see", "tea", "me"] },
      { ipa: "ɑː", tip: "张大嘴拉长「阿」", examples: ["car", "father", "ask"] },
      { ipa: "ɔː", tip: "圆唇拉长「哦」", examples: ["door", "ball", "walk"] },
      { ipa: "uː", tip: "圆唇拉长「乌」", examples: ["too", "food", "blue"] },
      { ipa: "ɜː", tip: "舌头居中拉长", examples: ["bird", "her", "nurse"] }
    ]
  },
  {
    id: "short",
    name: "短元音",
    items: [
      { ipa: "ɪ", tip: "短促的「衣」", examples: ["sit", "big", "fish"] },
      { ipa: "e", tip: "扁嘴短「诶」", examples: ["bed", "red", "pen"] },
      { ipa: "æ", tip: "扁嘴开大「哎」", examples: ["cat", "apple", "bag"] },
      { ipa: "ɒ", tip: "短促圆唇「奥」", examples: ["hot", "box", "dog"] },
      { ipa: "ʊ", tip: "短促「乌」", examples: ["book", "good", "put"] },
      { ipa: "ʌ", tip: "短促「阿」偏中", examples: ["cup", "bus", "sun"] },
      { ipa: "ə", tip: "最松的轻音", examples: ["about", "banana", "teacher"] }
    ]
  },
  {
    id: "diph",
    name: "双元音",
    items: [
      { ipa: "eɪ", tip: "诶→衣", examples: ["day", "name", "play"] },
      { ipa: "aɪ", tip: "阿→衣", examples: ["my", "bike", "time"] },
      { ipa: "ɔɪ", tip: "哦→衣", examples: ["boy", "toy", "point"] },
      { ipa: "əʊ", tip: "呃→乌", examples: ["go", "home", "no"] },
      { ipa: "aʊ", tip: "阿→乌", examples: ["now", "house", "out"] },
      { ipa: "ɪə", tip: "衣→呃", examples: ["here", "near", "ear"] },
      { ipa: "eə", tip: "诶→呃", examples: ["hair", "where", "care"] },
      { ipa: "ʊə", tip: "乌→呃", examples: ["poor", "tour", "sure"] }
    ]
  },
  {
    id: "stop",
    name: "爆破音",
    items: [
      { ipa: "p", tip: "清音，送气", examples: ["pen", "apple", "map"] },
      { ipa: "b", tip: "浊音，振动", examples: ["book", "baby", "job"] },
      { ipa: "t", tip: "清音，舌尖", examples: ["tea", "cat", "water"] },
      { ipa: "d", tip: "浊音，舌尖", examples: ["dog", "bed", "red"] },
      { ipa: "k", tip: "清音，后舌", examples: ["cat", "school", "back"] },
      { ipa: "g", tip: "浊音，后舌", examples: ["go", "bag", "good"] }
    ]
  },
  {
    id: "fric",
    name: "摩擦音",
    items: [
      { ipa: "f", tip: "清，齿唇", examples: ["fish", "coffee", "life"] },
      { ipa: "v", tip: "浊，齿唇", examples: ["very", "have", "five"] },
      { ipa: "θ", tip: "清，咬舌", examples: ["think", "three", "bath"] },
      { ipa: "ð", tip: "浊，咬舌", examples: ["this", "that", "mother"] },
      { ipa: "s", tip: "清，丝音", examples: ["see", "bus", "school"] },
      { ipa: "z", tip: "浊，丝音", examples: ["zoo", "busy", "has"] },
      { ipa: "ʃ", tip: "清，「须」", examples: ["she", "fish", "wash"] },
      { ipa: "ʒ", tip: "浊，「日」软", examples: ["television", "usually", "measure"] },
      { ipa: "h", tip: "呼气音", examples: ["he", "house", "hello"] }
    ]
  },
  {
    id: "affric",
    name: "破擦音",
    items: [
      { ipa: "tʃ", tip: "清，「吃」", examples: ["chair", "teacher", "watch"] },
      { ipa: "dʒ", tip: "浊，「直」", examples: ["job", "orange", "bridge"] }
    ]
  },
  {
    id: "nasal",
    name: "鼻音 / 边音 / 近音",
    items: [
      { ipa: "m", tip: "双唇鼻音", examples: ["me", "home", "swim"] },
      { ipa: "n", tip: "舌尖鼻音", examples: ["no", "pen", "sun"] },
      { ipa: "ŋ", tip: "后舌鼻音", examples: ["sing", "long", "think"] },
      { ipa: "l", tip: "边音", examples: ["like", "ball", "school"] },
      { ipa: "r", tip: "美音卷舌", examples: ["red", "car", "brother"] },
      { ipa: "j", tip: "半元音「衣」", examples: ["yes", "you", "yellow"] },
      { ipa: "w", tip: "半元音「乌」", examples: ["we", "water", "swim"] }
    ]
  }
];

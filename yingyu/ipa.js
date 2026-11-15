/* 音标库：国际音标 + 例词；say=音标音保底朗读文本（无真人文件时用） */
window.EN_IPA_CHART = [
  {
    id: "long",
    name: "长元音",
    items: [
      { ipa: "iː", tip: "拉长的「衣」", say: "ee", examples: ["see", "tea", "me"] },
      { ipa: "ɑː", tip: "张大嘴拉长「阿」", say: "ah", examples: ["car", "father", "ask"] },
      { ipa: "ɔː", tip: "圆唇拉长「哦」", say: "aw", examples: ["door", "ball", "walk"] },
      { ipa: "uː", tip: "圆唇拉长「乌」", say: "oo", examples: ["too", "food", "blue"] },
      { ipa: "ɜː", tip: "舌头居中拉长", say: "ur", examples: ["bird", "her", "nurse"] }
    ]
  },
  {
    id: "short",
    name: "短元音",
    items: [
      { ipa: "ɪ", tip: "短促的「衣」", say: "ih", examples: ["sit", "big", "fish"] },
      { ipa: "e", tip: "扁嘴短「诶」", say: "eh", examples: ["bed", "red", "pen"] },
      { ipa: "æ", tip: "扁嘴开大「哎」", say: "a", examples: ["cat", "apple", "bag"] },
      { ipa: "ɒ", tip: "短促圆唇「奥」", say: "o", examples: ["hot", "box", "dog"] },
      { ipa: "ʊ", tip: "短促「乌」", say: "u", examples: ["book", "good", "put"] },
      { ipa: "ʌ", tip: "短促「阿」偏中", say: "uh", examples: ["cup", "bus", "sun"] },
      { ipa: "ə", tip: "最松的轻音", say: "uh", examples: ["about", "banana", "teacher"] }
    ]
  },
  {
    id: "diph",
    name: "双元音",
    items: [
      { ipa: "eɪ", tip: "诶→衣", say: "ay", examples: ["day", "name", "play"] },
      { ipa: "aɪ", tip: "阿→衣", say: "eye", examples: ["my", "bike", "time"] },
      { ipa: "ɔɪ", tip: "哦→衣", say: "oy", examples: ["boy", "toy", "point"] },
      { ipa: "əʊ", tip: "呃→乌", say: "oh", examples: ["go", "home", "no"] },
      { ipa: "aʊ", tip: "阿→乌", say: "ow", examples: ["now", "house", "out"] },
      { ipa: "ɪə", tip: "衣→呃", say: "ear", examples: ["here", "near", "ear"] },
      { ipa: "eə", tip: "诶→呃", say: "air", examples: ["hair", "where", "care"] },
      { ipa: "ʊə", tip: "乌→呃", say: "oor", examples: ["poor", "tour", "sure"] }
    ]
  },
  {
    id: "stop",
    name: "爆破音",
    items: [
      { ipa: "p", tip: "清音，送气", say: "p", examples: ["pen", "apple", "map"] },
      { ipa: "b", tip: "浊音，振动", say: "b", examples: ["book", "baby", "job"] },
      { ipa: "t", tip: "清音，舌尖", say: "t", examples: ["tea", "cat", "water"] },
      { ipa: "d", tip: "浊音，舌尖", say: "d", examples: ["dog", "bed", "red"] },
      { ipa: "k", tip: "清音，后舌", say: "k", examples: ["cat", "school", "back"] },
      { ipa: "g", tip: "浊音，后舌", say: "g", examples: ["go", "bag", "good"] }
    ]
  },
  {
    id: "fric",
    name: "摩擦音",
    items: [
      { ipa: "f", tip: "清，齿唇", say: "f", examples: ["fish", "coffee", "life"] },
      { ipa: "v", tip: "浊，齿唇", say: "v", examples: ["very", "have", "five"] },
      { ipa: "θ", tip: "清，咬舌", say: "th", examples: ["think", "three", "bath"] },
      { ipa: "ð", tip: "浊，咬舌", say: "the", examples: ["this", "that", "mother"] },
      { ipa: "s", tip: "清，丝音", say: "s", examples: ["see", "bus", "school"] },
      { ipa: "z", tip: "浊，丝音", say: "z", examples: ["zoo", "busy", "has"] },
      { ipa: "ʃ", tip: "清，「须」", say: "sh", examples: ["she", "fish", "wash"] },
      { ipa: "ʒ", tip: "浊，「日」软", say: "zh", examples: ["television", "usually", "measure"] },
      { ipa: "h", tip: "呼气音", say: "h", examples: ["he", "house", "hello"] }
    ]
  },
  {
    id: "affric",
    name: "破擦音",
    items: [
      { ipa: "tʃ", tip: "清，「吃」", say: "ch", examples: ["chair", "teacher", "watch"] },
      { ipa: "dʒ", tip: "浊，「直」", say: "j", examples: ["job", "orange", "bridge"] }
    ]
  },
  {
    id: "nasal",
    name: "鼻音 / 边音 / 近音",
    items: [
      { ipa: "m", tip: "双唇鼻音", say: "m", examples: ["me", "home", "swim"] },
      { ipa: "n", tip: "舌尖鼻音", say: "n", examples: ["no", "pen", "sun"] },
      { ipa: "ŋ", tip: "后舌鼻音", say: "ng", examples: ["sing", "long", "think"] },
      { ipa: "l", tip: "边音", say: "l", examples: ["like", "ball", "school"] },
      { ipa: "r", tip: "美音卷舌", say: "r", examples: ["red", "car", "brother"] },
      { ipa: "j", tip: "半元音「衣」", say: "y", examples: ["yes", "you", "yellow"] },
      { ipa: "w", tip: "半元音「乌」", say: "w", examples: ["we", "water", "swim"] }
    ]
  }
];

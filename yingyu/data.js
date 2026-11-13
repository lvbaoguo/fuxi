/* 小学英语词库 + 训练题 · 人教 PEP 向（简化自用）
 * 年级：三年级上 → 六年级下
 * 题型：fill 语句填空 | patch 书写补全 | dialogue 短篇对话选择 | mc 语句选择 | zh2en 见中文写英语
 */
(function () {
  function w(en, zh, tip) {
    return { en: en, zh: zh, tip: tip || "" };
  }
  function fill(id, prompt, answer, options, explain) {
    return { id: id, prompt: prompt, answer: answer, options: options || [], explain: explain || "" };
  }
  function patch(id, prompt, answer, hint) {
    return { id: id, prompt: prompt, answer: answer, hint: hint || "" };
  }
  function dialogue(id, lines, q, options, answer, explain) {
    return { id: id, lines: lines, q: q, options: options, answer: answer, explain: explain || "" };
  }
  function mc(id, stem, options, answer, explain) {
    return { id: id, stem: stem, options: options, answer: answer, explain: explain || "" };
  }
  function zh2en(id, zh, answer, accept) {
    return { id: id, zh: zh, answer: answer, accept: accept || [answer] };
  }

  const g3a = {
    id: "g3a",
    name: "三年级上",
    theme: "见面·颜色·身体·动物·食物·生日",
    units: [
      {
        id: "g3a-u1",
        title: "Unit 1 Hello",
        words: [
          w("hello", "你好"),
          w("hi", "嗨"),
          w("goodbye", "再见"),
          w("bye", "拜拜"),
          w("I", "我"),
          w("am", "是（我是）"),
          w("you", "你"),
          w("are", "是（你是）"),
          w("name", "名字"),
          w("what", "什么"),
          w("my", "我的"),
          w("friend", "朋友"),
        ],
        drills: {
          fill: [
            fill("g3a-u1-f1", "_____! My name is Tom.", "Hello", ["Hello", "Bye", "What", "Name"], "打招呼用 Hello / Hi。"),
            fill("g3a-u1-f2", "_____ are you? — I'm fine.", "How", ["How", "What", "Who", "Where"], "How are you? 你好吗？"),
            fill("g3a-u1-f3", "Nice to _____ you.", "meet", ["meet", "meat", "met", "me"], "Nice to meet you."),
          ],
          patch: [
            patch("g3a-u1-p1", "Hello! I _____ Tom.", "am", "be 动词：I am"),
            patch("g3a-u1-p2", "_____ name is Lily.", "My", "我的名字"),
            patch("g3a-u1-p3", "Good_____!", "bye", "再见 Goodbye / Bye"),
          ],
          dialogue: [
            dialogue(
              "g3a-u1-d1",
              ["A: Hello!", "B: Hi! What's your name?", "A: _____"],
              "A 该怎么接？",
              ["My name is Amy.", "Goodbye.", "I am fine.", "Thank you."],
              "My name is Amy.",
              "问名字 → 答 My name is …"
            ),
            dialogue(
              "g3a-u1-d2",
              ["A: How are you?", "B: _____"],
              "B 礼貌回答：",
              ["I'm fine, thank you.", "I am Amy.", "Goodbye.", "What's your name?"],
              "I'm fine, thank you.",
              "How are you → I'm fine."
            ),
          ],
          mc: [
            mc("g3a-u1-m1", "见面打招呼，最合适的是：", ["Hello!", "Good night!", "Happy birthday!", "Sit down!"], "Hello!"),
            mc("g3a-u1-m2", "“再见”可以说：", ["Goodbye.", "Hello.", "Thank you.", "Sorry."], "Goodbye."),
            mc("g3a-u1-m3", "“我叫 Mike”：", ["My name is Mike.", "I name Mike.", "Me is Mike.", "Name Mike."], "My name is Mike."),
          ],
          zh2en: [
            zh2en("g3a-u1-z1", "你好！", "Hello!", ["Hello!", "Hello", "Hi!", "Hi"]),
            zh2en("g3a-u1-z2", "我叫 Tom。", "My name is Tom.", ["My name is Tom.", "My name is Tom", "I'm Tom.", "I am Tom."]),
            zh2en("g3a-u1-z3", "再见！", "Goodbye!", ["Goodbye!", "Goodbye", "Bye!", "Bye"]),
          ],
        },
      },
      {
        id: "g3a-u2",
        title: "Unit 2 Colours",
        words: [
          w("red", "红色"),
          w("yellow", "黄色"),
          w("blue", "蓝色"),
          w("green", "绿色"),
          w("black", "黑色"),
          w("white", "白色"),
          w("orange", "橙色；橘子"),
          w("brown", "棕色"),
          w("colour", "颜色（英式）"),
          w("color", "颜色（美式）"),
        ],
        drills: {
          fill: [
            fill("g3a-u2-f1", "The apple is _____.", "red", ["red", "blue", "black", "white"]),
            fill("g3a-u2-f2", "_____ is the sky? — Blue.", "What colour", ["What colour", "How many", "Who", "Where"]),
            fill("g3a-u2-f3", "I like _____ bananas.", "yellow", ["yellow", "blue", "black", "white"]),
          ],
          patch: [
            patch("g3a-u2-p1", "It is _____. (绿色)", "green"),
            patch("g3a-u2-p2", "What _____ is it?", "colour", "问颜色 What colour"),
            patch("g3a-u2-p3", "The snow is _____.", "white"),
          ],
          dialogue: [
            dialogue(
              "g3a-u2-d1",
              ["A: What colour is it?", "B: _____"],
              "B 回答「它是红色」：",
              ["It's red.", "It's a book.", "I like it.", "Thank you."],
              "It's red."
            ),
          ],
          mc: [
            mc("g3a-u2-m1", "草一般是什么颜色？", ["green", "blue", "black", "white"], "green"),
            mc("g3a-u2-m2", "“What colour is it?” 意思是：", ["它是什么颜色？", "它是什么？", "你好吗？", "再见。"], "它是什么颜色？"),
          ],
          zh2en: [
            zh2en("g3a-u2-z1", "红色", "red", ["red", "Red"]),
            zh2en("g3a-u2-z2", "它是蓝色的。", "It is blue.", ["It is blue.", "It's blue.", "It is blue", "It's blue"]),
            zh2en("g3a-u2-z3", "我喜欢黄色。", "I like yellow.", ["I like yellow.", "I like yellow"]),
          ],
        },
      },
      {
        id: "g3a-u3",
        title: "Unit 3 Look at me!",
        words: [
          w("face", "脸"),
          w("eye", "眼睛"),
          w("ear", "耳朵"),
          w("nose", "鼻子"),
          w("mouth", "嘴巴"),
          w("arm", "胳膊"),
          w("hand", "手"),
          w("leg", "腿"),
          w("foot", "脚"),
          w("body", "身体"),
        ],
        drills: {
          fill: [
            fill("g3a-u3-f1", "I have two _____.", "eyes", ["eyes", "eye", "nose", "mouth"]),
            fill("g3a-u3-f2", "This is my _____.", "hand", ["hand", "red", "hello", "bye"]),
            fill("g3a-u3-f3", "Touch your _____.", "nose", ["nose", "book", "apple", "colour"]),
          ],
          patch: [
            patch("g3a-u3-p1", "Look at _____!", "me", "看我 Look at me"),
            patch("g3a-u3-p2", "I have one _____.", "mouth"),
            patch("g3a-u3-p3", "Clap your _____.", "hands", "拍手 clap your hands"),
          ],
          dialogue: [
            dialogue(
              "g3a-u3-d1",
              ["A: Look at me!", "B: Wow! You have big _____."],
              "空里最合适：",
              ["eyes", "books", "colours", "apples"],
              "eyes"
            ),
          ],
          mc: [
            mc("g3a-u3-m1", "用来闻味道的是：", ["nose", "ear", "hand", "leg"], "nose"),
            mc("g3a-u3-m2", "“I have two ears.” 意思是：", ["我有两只耳朵。", "我有两只眼睛。", "我有一张嘴。", "我有一只手。"], "我有两只耳朵。"),
          ],
          zh2en: [
            zh2en("g3a-u3-z1", "眼睛", "eye", ["eye", "Eye", "eyes", "Eyes"]),
            zh2en("g3a-u3-z2", "这是我的手。", "This is my hand.", ["This is my hand.", "This is my hand"]),
            zh2en("g3a-u3-z3", "看我！", "Look at me!", ["Look at me!", "Look at me"]),
          ],
        },
      },
      {
        id: "g3a-u4",
        title: "Unit 4 We love animals",
        words: [
          w("cat", "猫"),
          w("dog", "狗"),
          w("bird", "鸟"),
          w("tiger", "老虎"),
          w("monkey", "猴子"),
          w("panda", "熊猫"),
          w("animal", "动物"),
          w("big", "大的"),
          w("small", "小的"),
          w("love", "爱；喜欢"),
        ],
        drills: {
          fill: [
            fill("g3a-u4-f1", "I love _____.", "dogs", ["dogs", "red", "hello", "hand"]),
            fill("g3a-u4-f2", "The panda is _____.", "black and white", ["black and white", "blue", "yellow only", "green"]),
            fill("g3a-u4-f3", "It is a _____ tiger.", "big", ["big", "bye", "my", "am"]),
          ],
          patch: [
            patch("g3a-u4-p1", "We love _____.", "animals"),
            patch("g3a-u4-p2", "A _____ can fly.", "bird"),
            patch("g3a-u4-p3", "The cat is _____. (小的)", "small"),
          ],
          dialogue: [
            dialogue(
              "g3a-u4-d1",
              ["A: What's this?", "B: It's a _____."],
              "看图是熊猫时：",
              ["panda", "pen", "apple", "nose"],
              "panda"
            ),
          ],
          mc: [
            mc("g3a-u4-m1", "中国国宝动物常说：", ["panda", "tiger", "dog", "bird"], "panda"),
            mc("g3a-u4-m2", "“I love cats.”：", ["我喜欢猫。", "我怕猫。", "我有猫。", "猫很大。"], "我喜欢猫。"),
          ],
          zh2en: [
            zh2en("g3a-u4-z1", "狗", "dog", ["dog", "Dog", "dogs", "Dogs"]),
            zh2en("g3a-u4-z2", "我喜欢熊猫。", "I love pandas.", ["I love pandas.", "I love pandas", "I like pandas.", "I like pandas"]),
            zh2en("g3a-u4-z3", "它很大。", "It is big.", ["It is big.", "It's big.", "It is big", "It's big"]),
          ],
        },
      },
      {
        id: "g3a-u5",
        title: "Unit 5 Let's eat!",
        words: [
          w("rice", "米饭"),
          w("noodles", "面条"),
          w("bread", "面包"),
          w("egg", "鸡蛋"),
          w("milk", "牛奶"),
          w("water", "水"),
          w("juice", "果汁"),
          w("hungry", "饿的"),
          w("eat", "吃"),
          w("drink", "喝"),
        ],
        drills: {
          fill: [
            fill("g3a-u5-f1", "I'd like some _____.", "rice", ["rice", "red", "run", "read"]),
            fill("g3a-u5-f2", "Have some _____, please.", "milk", ["milk", "mouth", "monkey", "me"]),
            fill("g3a-u5-f3", "I'm _____.", "hungry", ["hungry", "hello", "hand", "happy"]),
          ],
          patch: [
            patch("g3a-u5-p1", "Let's _____!", "eat"),
            patch("g3a-u5-p2", "I'd like some _____. (水)", "water"),
            patch("g3a-u5-p3", "_____ some juice.", "Drink", "喝 Drink"),
          ],
          dialogue: [
            dialogue(
              "g3a-u5-d1",
              ["A: Can I have some bread?", "B: _____"],
              "礼貌同意：",
              ["Sure. Here you are.", "Goodbye.", "It's red.", "I am Tom."],
              "Sure. Here you are."
            ),
          ],
          mc: [
            mc("g3a-u5-m1", "早餐常喝的白色饮品：", ["milk", "juice", "water only", "noodles"], "milk"),
            mc("g3a-u5-m2", "“I'm hungry.”：", ["我饿了。", "我渴了。", "我累了。", "我很好。"], "我饿了。"),
          ],
          zh2en: [
            zh2en("g3a-u5-z1", "面包", "bread", ["bread", "Bread"]),
            zh2en("g3a-u5-z2", "我想要一些牛奶。", "I'd like some milk.", ["I'd like some milk.", "I would like some milk.", "I'd like some milk"]),
            zh2en("g3a-u5-z3", "我们吃吧！", "Let's eat!", ["Let's eat!", "Lets eat!", "Let's eat"]),
          ],
        },
      },
      {
        id: "g3a-u6",
        title: "Unit 6 Happy birthday!",
        words: [
          w("birthday", "生日"),
          w("cake", "蛋糕"),
          w("candle", "蜡烛"),
          w("gift", "礼物"),
          w("happy", "开心的"),
          w("year", "年；岁"),
          w("old", "年老的；…岁"),
          w("how old", "多大年纪"),
          w("party", "聚会"),
          w("sing", "唱"),
        ],
        drills: {
          fill: [
            fill("g3a-u6-f1", "Happy _____!", "birthday", ["birthday", "hello", "colour", "animal"]),
            fill("g3a-u6-f2", "How _____ are you?", "old", ["old", "are", "many", "much"]),
            fill("g3a-u6-f3", "I am eight _____ old.", "years", ["years", "year", "yellow", "yes"]),
          ],
          patch: [
            patch("g3a-u6-p1", "_____ birthday!", "Happy"),
            patch("g3a-u6-p2", "Blow out the _____.", "candles"),
            patch("g3a-u6-p3", "This _____ is for you.", "gift"),
          ],
          dialogue: [
            dialogue(
              "g3a-u6-d1",
              ["A: How old are you?", "B: _____"],
              "B 说自己 9 岁：",
              ["I'm nine years old.", "I'm fine.", "It's a cake.", "Thank you."],
              "I'm nine years old."
            ),
          ],
          mc: [
            mc("g3a-u6-m1", "过生日常说：", ["Happy birthday!", "Good morning!", "How are you?", "Sit down!"], "Happy birthday!"),
            mc("g3a-u6-m2", "“How old are you?”：", ["你几岁？", "你好吗？", "你叫什么？", "再见。"], "你几岁？"),
          ],
          zh2en: [
            zh2en("g3a-u6-z1", "生日快乐！", "Happy birthday!", ["Happy birthday!", "Happy birthday"]),
            zh2en("g3a-u6-z2", "我九岁了。", "I am nine years old.", ["I am nine years old.", "I'm nine years old.", "I am nine years old", "I'm nine years old"]),
            zh2en("g3a-u6-z3", "蛋糕", "cake", ["cake", "Cake"]),
          ],
        },
      },
    ],
  };

  /** 后续年级：先给词库骨架，题型可逐步补 */
  function stubGrade(id, name, theme, unitSpecs) {
    return {
      id: id,
      name: name,
      theme: theme,
      units: unitSpecs.map((u, i) => ({
        id: id + "-u" + (i + 1),
        title: u.title,
        words: u.words,
        drills: u.drills || { fill: [], patch: [], dialogue: [], mc: [], zh2en: [] },
      })),
    };
  }

  const g3b = stubGrade("g3b", "三年级下", "学校·家人·数字·天气·衣服", [
    {
      title: "Unit 1 Welcome back!",
      words: [w("school", "学校"), w("classroom", "教室"), w("teacher", "老师"), w("student", "学生"), w("desk", "课桌"), w("chair", "椅子")],
      drills: {
        mc: [mc("g3b-u1-m1", "“老师”用英语说：", ["teacher", "student", "desk", "school"], "teacher")],
        zh2en: [zh2en("g3b-u1-z1", "学校", "school", ["school", "School"])],
      },
    },
    {
      title: "Unit 2 My family",
      words: [w("father", "爸爸"), w("mother", "妈妈"), w("brother", "哥哥/弟弟"), w("sister", "姐姐/妹妹"), w("family", "家庭"), w("baby", "宝宝")],
      drills: {
        zh2en: [zh2en("g3b-u2-z1", "妈妈", "mother", ["mother", "Mother", "mum", "mom"])],
      },
    },
    {
      title: "Unit 3 Numbers",
      words: [w("one", "一"), w("two", "二"), w("three", "三"), w("four", "四"), w("five", "五"), w("six", "六"), w("seven", "七"), w("eight", "八"), w("nine", "九"), w("ten", "十")],
      drills: {
        fill: [fill("g3b-u3-f1", "I have _____ pencils. (三支)", "three", ["three", "tree", "free", "they"])],
        zh2en: [zh2en("g3b-u3-z1", "五", "five", ["five", "Five"])],
      },
    },
    {
      title: "Unit 4 Weather & clothes（骨架）",
      words: [w("sunny", "晴朗的"), w("rainy", "下雨的"), w("coat", "外套"), w("shirt", "衬衫"), w("skirt", "裙子"), w("shoes", "鞋子")],
    },
  ]);

  const g4a = stubGrade("g4a", "四年级上", "教室·课程·时间·周末·食物扩展", [
    {
      title: "Unit 1 My classroom",
      words: [w("window", "窗户"), w("door", "门"), w("picture", "图画"), w("light", "灯"), w("blackboard", "黑板"), w("computer", "电脑")],
      drills: {
        zh2en: [zh2en("g4a-u1-z1", "窗户", "window", ["window", "Window"])],
      },
    },
    {
      title: "Unit 2 My schoolbag",
      words: [w("schoolbag", "书包"), w("maths", "数学"), w("English", "英语"), w("book", "书"), w("pen", "钢笔"), w("pencil", "铅笔"), w("ruler", "尺子"), w("eraser", "橡皮")],
    },
    {
      title: "Unit 3 My friends",
      words: [w("tall", "高的"), w("short", "矮的；短的"), w("strong", "强壮的"), w("friendly", "友好的"), w("quiet", "安静的"), w("hair", "头发")],
    },
    {
      title: "Unit 4 My home",
      words: [w("bedroom", "卧室"), w("living room", "客厅"), w("kitchen", "厨房"), w("bathroom", "卫生间"), w("bed", "床"), w("sofa", "沙发"), w("table", "桌子")],
    },
  ]);

  const g4b = stubGrade("g4b", "四年级下", "农场·自然·购物·时间表达", [
    {
      title: "Unit 1 My school",
      words: [w("first floor", "一楼"), w("second floor", "二楼"), w("teachers' office", "教师办公室"), w("library", "图书馆"), w("playground", "操场"), w("garden", "花园")],
    },
    {
      title: "Unit 2 What time is it?",
      words: [w("o'clock", "整点"), w("kid", "小孩"), w("breakfast", "早餐"), w("lunch", "午餐"), w("dinner", "晚餐"), w("hurry", "赶快")],
      drills: {
        zh2en: [zh2en("g4b-u2-z1", "现在几点了？", "What time is it?", ["What time is it?", "What time is it"])],
      },
    },
    {
      title: "Unit 3 Weather",
      words: [w("cold", "冷的"), w("cool", "凉爽的"), w("warm", "温暖的"), w("hot", "热的"), w("cloudy", "多云的"), w("windy", "有风的")],
    },
  ]);

  const g5a = stubGrade("g5a", "五年级上", "日常作息·季节·食物偏好·兴趣", [
    {
      title: "Unit 1 What's he like?",
      words: [w("polite", "有礼貌的"), w("clever", "聪明的"), w("shy", "害羞的"), w("helpful", "乐于助人的"), w("hard-working", "勤奋的")],
    },
    {
      title: "Unit 2 My week",
      words: [w("Monday", "星期一"), w("Tuesday", "星期二"), w("Wednesday", "星期三"), w("Thursday", "星期四"), w("Friday", "星期五"), w("Saturday", "星期六"), w("Sunday", "星期日"), w("weekend", "周末")],
      drills: {
        zh2en: [zh2en("g5a-u2-z1", "星期一", "Monday", ["Monday", "monday"])],
      },
    },
    {
      title: "Unit 3 What would you like?",
      words: [w("sandwich", "三明治"), w("salad", "沙拉"), w("hamburger", "汉堡"), w("ice cream", "冰淇淋"), w("tea", "茶"), w("coffee", "咖啡")],
    },
  ]);

  const g5b = stubGrade("g5b", "五年级下", "工作·季节活动·旅行·自然", [
    {
      title: "Unit 1 My day",
      words: [w("usually", "通常"), w("often", "经常"), w("sometimes", "有时"), w("always", "总是"), w("never", "从不"), w("get up", "起床"), w("go to bed", "上床睡觉")],
    },
    {
      title: "Unit 2 Seasons",
      words: [w("spring", "春天"), w("summer", "夏天"), w("autumn", "秋天"), w("winter", "冬天"), w("season", "季节"), w("picnic", "野餐")],
      drills: {
        zh2en: [zh2en("g5b-u2-z1", "春天", "spring", ["spring", "Spring"])],
      },
    },
  ]);

  const g6a = stubGrade("g6a", "六年级上", "出行·假期·爱好·未来志向", [
    {
      title: "Unit 1 How can I get there?",
      words: [w("science museum", "科学博物馆"), w("post office", "邮局"), w("bookstore", "书店"), w("crossing", "十字路口"), w("turn left", "左转"), w("turn right", "右转"), w("straight", "笔直地")],
    },
    {
      title: "Unit 2 Ways to go to school",
      words: [w("on foot", "步行"), w("by bus", "乘公交"), w("by bike", "骑自行车"), w("by subway", "乘地铁"), w("by plane", "乘飞机"), w("by train", "乘火车")],
      drills: {
        zh2en: [zh2en("g6a-u2-z1", "步行", "on foot", ["on foot", "On foot"])],
      },
    },
  ]);

  const g6b = stubGrade("g6b", "六年级下", "过去经历·暑期计划·毕业寄语", [
    {
      title: "Unit 1 How tall are you?",
      words: [w("younger", "更年轻的"), w("older", "更年长的"), w("taller", "更高的"), w("shorter", "更矮的"), w("than", "比"), w("metre", "米")],
    },
    {
      title: "Unit 2 Last weekend",
      words: [w("cleaned", "打扫了"), w("washed", "洗了"), w("watched", "看了"), w("stayed", "待着"), w("yesterday", "昨天"), w("last weekend", "上周末")],
      drills: {
        zh2en: [zh2en("g6b-u2-z1", "昨天", "yesterday", ["yesterday", "Yesterday"])],
      },
    },
  ]);

  const MODE_META = [
    { id: "fill", name: "语句填空", short: "填", desc: "选词/写词补全句子" },
    { id: "patch", name: "书写补全", short: "补", desc: "看提示把句子写完整" },
    { id: "dialogue", name: "短篇对话", short: "话", desc: "读小对话再选择题" },
    { id: "mc", name: "语句选择", short: "选", desc: "情景/意思选择题" },
    { id: "zh2en", name: "中译英书写", short: "写", desc: "给中文，自己写出英语" },
    { id: "words", name: "单词表", short: "词", desc: "本章单词过一眼（不算闯关）" },
  ];

  window.EN_BANK = {
    v: 1,
    title: "小学英语 · 分级训练",
    modes: MODE_META,
    grades: [g3a, g3b, g4a, g4b, g5a, g5b, g6a, g6b],
  };
})();

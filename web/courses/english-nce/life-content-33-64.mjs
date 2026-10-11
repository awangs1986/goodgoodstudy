export const lessons = [
  {
    "sourceLesson": 33,
    "title": "把路线说清楚",
    "scene": "校园开放日指路",
    "goal": "用方向介词说明移动路线，并区分穿过与走向。",
    "grammar": {
      "title": "移动方向与路径",
      "explanation": "to 表示到达的方向或目的地，from 表示起点；into/out of 强调进入或离开内部。across 是从表面的一边到另一边，through 是从内部穿过；towards 只说明朝向，不保证到达。leave for 表示动身去某地，throw at 强调投向目标。",
      "examples": [
        {
          "en": "Walk through the gate and turn left.",
          "zh": "穿过大门，然后左转。"
        },
        {
          "en": "We left the classroom and walked towards the garden.",
          "zh": "我们离开教室，朝花园走去。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "darkness",
        "meaning": "n. 黑暗",
        "example": "The phone screen glowed in the darkness.",
        "exampleZh": "手机屏幕在黑暗中发着光。"
      },
      {
        "word": "explain",
        "meaning": "v. 解释；说明",
        "example": "Could you explain this bus map to me?",
        "exampleZh": "你能给我讲讲这张公交线路图吗？"
      },
      {
        "word": "coast",
        "meaning": "n. 海岸；沿海地区",
        "example": "My aunt lives near the coast.",
        "exampleZh": "我姨妈住在海岸附近。"
      },
      {
        "word": "storm",
        "meaning": "n. 暴风雨",
        "example": "The outdoor concert stopped because of the storm.",
        "exampleZh": "室外音乐会因暴风雨而停止了。"
      },
      {
        "word": "towards",
        "meaning": "prep. 朝；向",
        "example": "The new student walked towards the library.",
        "exampleZh": "新同学朝图书馆走去。"
      },
      {
        "word": "rock",
        "meaning": "n. 岩石；大石块",
        "example": "We took a photo beside a large rock.",
        "exampleZh": "我们在一块大岩石旁拍了张照片。"
      },
      {
        "word": "shore",
        "meaning": "n. 岸；滨",
        "example": "Please stay on the path beside the lake shore.",
        "exampleZh": "请沿湖岸边的小路走。"
      },
      {
        "word": "light",
        "meaning": "n. 灯光；光",
        "example": "A small light above the door showed us the entrance.",
        "exampleZh": "门上方的一盏小灯照出了入口。"
      },
      {
        "word": "ahead",
        "meaning": "adv. 在前面；向前",
        "example": "There is a water station just ahead.",
        "exampleZh": "前面不远有个饮水点。"
      },
      {
        "word": "cliff",
        "meaning": "n. 悬崖；峭壁",
        "example": "Visitors must stay behind the fence near the cliff.",
        "exampleZh": "游客在悬崖附近必须待在围栏后面。"
      },
      {
        "word": "struggle",
        "meaning": "v. 奋力做；艰难地进行",
        "example": "I struggled to carry the heavy shopping bag upstairs.",
        "exampleZh": "我费力地把沉重的购物袋提上楼。"
      },
      {
        "word": "hospital",
        "meaning": "n. 医院",
        "example": "The number eight bus stops outside the hospital.",
        "exampleZh": "八路公交车在医院外停靠。"
      }
    ],
    "passage": {
      "en": "On our school open day, I helped visitors find the art room. A father showed me a map on his phone, but the screen was too dark. I explained the route slowly: go across the playground, walk through the glass doors, and turn towards the stairs. His daughter asked about the blue line on the floor. It led from the entrance to the lift, so they followed it instead.",
      "zh": "学校开放日那天，我帮助访客寻找美术教室。一位父亲给我看手机上的地图，但屏幕太暗了。我慢慢说明路线：穿过操场，穿过玻璃门，再朝楼梯转弯。他的女儿问起地上的蓝线。那条线从入口一直通向电梯，于是他们改为沿着蓝线走。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "选择表示“从操场一边走到另一边”的介词：Walk ___ the playground.",
        "options": [
          "across",
          "into",
          "towards"
        ],
        "answers": [
          "across"
        ],
        "explanation": "across 强调从表面的一边走到另一边。towards 只表示朝向。"
      },
      {
        "type": "choice",
        "prompt": "选择正确表达：The bus leaves ___ the museum at nine.（公交车九点出发去博物馆。）",
        "options": [
          "at",
          "through",
          "for"
        ],
        "answers": [
          "for"
        ],
        "explanation": "leave for + 地点，表示动身前往该地。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：The room was in complete ___, so I used a torch.",
        "options": [
          "shore",
          "darkness",
          "coast"
        ],
        "answers": [
          "darkness"
        ],
        "explanation": "需要手电筒，说明房间处于黑暗中。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：父女最终怎样找到电梯？",
        "options": [
          "They followed the blue line.",
          "They crossed a bridge.",
          "They used the stairs."
        ],
        "answers": [
          "They followed the blue line."
        ],
        "explanation": "短文说蓝线从入口通向电梯，父女沿着它走。"
      },
      {
        "type": "text",
        "prompt": "按“主语 + walked + through...”写一句：她穿过了大门。使用 She、walked、through、the gate。",
        "answers": [
          "She walked through the gate."
        ],
        "explanation": "through 表示从门所形成的空间中穿过。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“我们朝公交车站走去”。 以 We 开头。",
        "tokens": [
          "We",
          "walked",
          "towards",
          "the",
          "bus",
          "stop."
        ],
        "answers": [
          "We walked towards the bus stop."
        ],
        "explanation": "towards 后接目的地方向 the bus stop。"
      }
    ],
    "sourcePages": [
      157,
      158
    ]
  },
  {
    "sourceLesson": 34,
    "title": "收到志愿者安排",
    "scene": "社区活动通知",
    "goal": "用被动语态转述收到的要求、告知和邀请。",
    "grammar": {
      "title": "被动语态与不定式",
      "explanation": "不知道或不必强调谁发出要求时，可用 be asked/told/invited to do。be 随主语和时间变化；否定要求用 be told not to do。动作接受者成为主语，不定式说明被要求做什么。",
      "examples": [
        {
          "en": "We were invited to join the book sale.",
          "zh": "我们受邀参加图书义卖。"
        },
        {
          "en": "Lina was told not to move the chairs.",
          "zh": "莉娜被告知不要移动椅子。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "station",
        "meaning": "n. 警察局；此处指 police station",
        "example": "The visitor asked where the nearest police station was.",
        "exampleZh": "那位访客询问最近的警察局在哪里。"
      },
      {
        "word": "most",
        "meaning": "adv. 极其；非常（较正式，不是最高级用法）",
        "example": "Your advice was most helpful.",
        "exampleZh": "你的建议非常有帮助。"
      }
    ],
    "passage": {
      "en": "Our class volunteered at a community book sale. We were asked to arrive at half past eight and were told to bring our own water bottles. At the gate, each student was given a name badge. I was invited to help at the information desk because I knew the building well. Before visitors arrived, we were reminded not to leave bags in the walkway. These simple instructions made the morning much easier.",
      "zh": "我们班在社区图书义卖中做志愿者。我们被要求八点半到，并被告知自带水瓶。到了门口，每位同学都领到了一张姓名牌。因为我熟悉这栋楼，所以受邀到咨询台帮忙。访客到来前，我们被提醒不要把包放在通道上。这些简单的安排让上午的工作轻松了许多。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "选择正确结构：The volunteers were asked ___ near the entrance.",
        "options": [
          "wait",
          "waiting",
          "to wait"
        ],
        "answers": [
          "to wait"
        ],
        "explanation": "被要求做某事用 were asked to do。"
      },
      {
        "type": "choice",
        "prompt": "选择正确的否定要求：We were told ___ the side door.",
        "options": [
          "not use",
          "not to use",
          "to not using"
        ],
        "answers": [
          "not to use"
        ],
        "explanation": "told 后的不定式否定结构是 not to do。"
      },
      {
        "type": "choice",
        "prompt": "通知写着“Your help was most valuable.”，most 在这里是什么意思？",
        "options": [
          "非常",
          "大多数",
          "最晚"
        ],
        "answers": [
          "非常"
        ],
        "explanation": "most 在这个较正式的表达中是程度副词，表示非常。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：为什么叙述者去咨询台帮忙？",
        "options": [
          "The narrator had no water bottle.",
          "The narrator arrived after the visitors.",
          "The narrator knew the building well."
        ],
        "answers": [
          "The narrator knew the building well."
        ],
        "explanation": "短文明确给出原因：because I knew the building well。"
      },
      {
        "type": "text",
        "prompt": "把 They asked Ben to carry the box. 改成以 Ben 开头的过去时被动句。 省略动作发出者，不写 by them。",
        "answers": [
          "Ben was asked to carry the box."
        ],
        "explanation": "宾语 Ben 成为主语，asked 改为 was asked，保留 to carry the box。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“我们被告知早点到”。 以 We 开头，把 early 放在句末。",
        "tokens": [
          "We",
          "were",
          "told",
          "to",
          "arrive",
          "early."
        ],
        "answers": [
          "We were told to arrive early."
        ],
        "explanation": "were told 后接 to arrive，early 表示到达时间早。"
      }
    ],
    "sourcePages": [
      161,
      162
    ]
  },
  {
    "sourceLesson": 35,
    "title": "修理社的第一次接待",
    "scene": "校园修理社",
    "goal": "在叙述社团变化时正确切换过去、现在和完成时。",
    "grammar": {
      "title": "时态与结构综合复习",
      "explanation": "一般现在时讲习惯，现在进行时讲正在发生的事；一般过去时配合已结束的过去时间。现在完成时说明过去行动与现在的联系。used to do 表示过去经常或曾经的状态；was asked to do 表示过去被要求做某事。先看时间和语义，再选形式。",
      "examples": [
        {
          "en": "Our club meets on Fridays, but today we are meeting on Thursday.",
          "zh": "我们社团通常周五活动，但今天改在周四活动。"
        },
        {
          "en": "I used to throw old bags away, but I have repaired three this term.",
          "zh": "我过去常把旧包扔掉，但这学期已经修好了三个。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "while",
        "meaning": "n. 一段时间；常用于 for a while",
        "example": "Please sit here for a while.",
        "exampleZh": "请在这里坐一会儿。"
      },
      {
        "word": "regret",
        "meaning": "v. 后悔；遗憾",
        "example": "I regret deleting the only copy of the photo.",
        "exampleZh": "我后悔删掉了那张照片的唯一副本。"
      },
      {
        "word": "far",
        "meaning": "adv. 很大程度地；远（可加强比较级）",
        "example": "This backpack is far lighter than my old one.",
        "exampleZh": "这个背包比我的旧背包轻得多。"
      },
      {
        "word": "rush",
        "meaning": "v. 匆忙行进；猛冲",
        "example": "Do not rush down the crowded stairs.",
        "exampleZh": "不要在拥挤的楼梯上往下冲。"
      },
      {
        "word": "act",
        "meaning": "v. 行动；采取措施",
        "example": "We must act quickly if the tap will not turn off.",
        "exampleZh": "如果水龙头关不上，我们必须迅速采取措施。"
      },
      {
        "word": "straight",
        "meaning": "adv. 径直；笔直地",
        "example": "Go straight home after the club meeting.",
        "exampleZh": "社团会议后直接回家。"
      },
      {
        "word": "fright",
        "meaning": "n. 惊吓",
        "example": "The sudden alarm gave me a fright.",
        "exampleZh": "突如其来的警报吓了我一跳。"
      },
      {
        "word": "battered",
        "meaning": "adj. 破旧的；撞坏的",
        "example": "My battered pencil case still closes properly.",
        "exampleZh": "我那破旧的笔袋仍能正常合上。"
      },
      {
        "word": "shortly",
        "meaning": "adv. 不久；马上",
        "example": "The repair desk will open shortly.",
        "exampleZh": "维修服务台马上就要开放。"
      },
      {
        "word": "afterwards",
        "meaning": "adv. 后来；随后",
        "example": "We cleaned the tools and washed our hands afterwards.",
        "exampleZh": "我们清洁了工具，随后洗了手。"
      }
    ],
    "passage": {
      "en": "I used to feel nervous when people watched me work. Last month, I joined our school repair club. Yesterday, I was asked to welcome visitors while the older students checked their broken bags. A boy brought a battered pencil case and waited for a while. I explained what we could repair. Now I am learning to replace zips, and I have already helped two classmates. I no longer rush through every explanation.",
      "zh": "过去别人看我做事时，我常感到紧张。上个月，我加入了学校修理社。昨天，高年级同学检查访客的坏包时，我被安排接待访客。一个男孩拿来一个破旧笔袋，等了一会儿。我说明了我们能修哪些部分。现在我正在学习换拉链，而且已经帮助了两位同学。我不再每次都急急忙忙地解释了。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "根据明确的过去时间选形式：I ___ the club last month.",
        "options": [
          "am joining",
          "joined",
          "have joined"
        ],
        "answers": [
          "joined"
        ],
        "explanation": "last month 是已经结束的时间，用一般过去时。"
      },
      {
        "type": "choice",
        "prompt": "选择正确结构：Mia ___ be shy, but now she leads the group.",
        "options": [
          "used to",
          "was used",
          "has used"
        ],
        "answers": [
          "used to"
        ],
        "explanation": "used to be 描述过去的状态，现在情况已有变化。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：The old bag was ___, with several torn corners.",
        "options": [
          "straight",
          "shortly",
          "battered"
        ],
        "answers": [
          "battered"
        ],
        "explanation": "几个角都撕破了，说明包破旧了。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：叙述者现在正在学什么？",
        "options": [
          "How to print photographs.",
          "How to replace zips.",
          "How to sell new bags."
        ],
        "answers": [
          "How to replace zips."
        ],
        "explanation": "短文中的 Now I am learning to replace zips 直接给出答案。"
      },
      {
        "type": "text",
        "prompt": "用现在完成时补全完整句子：I / already / help / two classmates。将 already 放在 have 后。",
        "answers": [
          "I have already helped two classmates."
        ],
        "explanation": "have already helped 表示到目前为止已经完成的帮助。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“昨天我被要求等候”。 以 I 开头，把 yesterday 放在句末。",
        "tokens": [
          "I",
          "was",
          "asked",
          "to",
          "wait",
          "yesterday."
        ],
        "answers": [
          "I was asked to wait yesterday."
        ],
        "explanation": "yesterday 对应过去时，was asked to wait 是被动要求。"
      }
    ],
    "sourcePages": [
      165,
      166
    ]
  },
  {
    "sourceLesson": 36,
    "title": "运动周之前",
    "scene": "班级体能活动",
    "goal": "区分事先的计划与说话当下作出的决定。",
    "grammar": {
      "title": "be going to 与 will",
      "explanation": "be going to + 动词原形常表示已有意图或有迹象的预测；will + 动词原形常用于当场决定、承诺和一般预测。两者有时都可谈未来，不能只凭 tomorrow 判断。疑问句 Shall I/we...? 可以提出帮助或建议。",
      "examples": [
        {
          "en": "I have booked a court; I am going to practise on Saturday.",
          "zh": "我已订好场地，打算周六练习。"
        },
        {
          "en": "Your bag looks heavy. I will carry it for you.",
          "zh": "你的包看起来很重。我帮你提吧。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "record",
        "meaning": "n. 纪录；最佳成绩",
        "example": "Our class hopes to break its skipping record.",
        "exampleZh": "我们班希望打破自己的跳绳纪录。"
      },
      {
        "word": "strong",
        "meaning": "adj. 强壮的；强健的",
        "example": "Regular practice has made her legs stronger.",
        "exampleZh": "经常练习使她的双腿更强健了。"
      },
      {
        "word": "swimmer",
        "meaning": "n. 游泳者",
        "example": "Every young swimmer must follow the pool rules.",
        "exampleZh": "每位小游泳者都必须遵守泳池规则。"
      },
      {
        "word": "succeed",
        "meaning": "v. 成功；做到",
        "example": "If the first plan fails, we can still succeed another way.",
        "exampleZh": "如果第一个计划失败，我们仍可以用另一种方式成功。"
      },
      {
        "word": "train",
        "meaning": "v. 训练；锻炼",
        "example": "The school team trains twice a week.",
        "exampleZh": "校队每周训练两次。"
      },
      {
        "word": "anxiously",
        "meaning": "adv. 焦急地；担心地",
        "example": "He waited anxiously for the team list.",
        "exampleZh": "他焦急地等待队伍名单。"
      },
      {
        "word": "intend",
        "meaning": "v. 打算；计划",
        "example": "I intend to walk more during the holidays.",
        "exampleZh": "我打算假期里多走路。"
      },
      {
        "word": "solid",
        "meaning": "adj. 固体的；结实的",
        "example": "Ice is water in a solid form.",
        "exampleZh": "冰是水的固态形式。"
      }
    ],
    "passage": {
      "en": "Our class is planning a fitness week. We are going to train in small groups, and nobody has to break a record. I intend to practise skipping because I enjoy it more than running. During our meeting, Tao noticed that the equipment list was missing. “I will make a new one,” he said. Our teacher suggested short practice sessions and regular breaks. We want everyone to feel stronger, including classmates who do not usually play sport.",
      "zh": "我们班正在筹划一个体能活动周。我们打算分小组训练，谁也不必打破纪录。我打算练跳绳，因为我更喜欢跳绳而不是跑步。开会时，涛发现器材清单不见了。“我来做一份新的。”他说。老师建议每次短时间练习，并定时休息。我们希望每个人都觉得身体更强健，包括平时不太运动的同学。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "按提示表达事先计划：We have made a plan. We ___ train after school.",
        "options": [
          "are going to",
          "going to",
          "are go to"
        ],
        "answers": [
          "are going to"
        ],
        "explanation": "be going to 后接动词原形；主语 We 对应 are。"
      },
      {
        "type": "choice",
        "prompt": "选择合乎语法的主动帮忙表达：Shall I ___ the cones?",
        "options": [
          "to carry",
          "carrying",
          "carry"
        ],
        "answers": [
          "carry"
        ],
        "explanation": "情态动词 shall 后用动词原形。Shall I...? 可以主动提出帮助。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：The school ___ swam twenty lengths today.",
        "options": [
          "solid",
          "swimmer",
          "record"
        ],
        "answers": [
          "swimmer"
        ],
        "explanation": "能游二十个泳池长度的是 swimmer，即游泳者。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：为什么叙述者选择跳绳？",
        "options": [
          "The narrator enjoys it more than running.",
          "The teacher banned running.",
          "The class has no skipping ropes."
        ],
        "answers": [
          "The narrator enjoys it more than running."
        ],
        "explanation": "短文给出的原因是更喜欢跳绳。"
      },
      {
        "type": "text",
        "prompt": "用 be going to 表达计划，写成完整句子：They / train / tomorrow。",
        "answers": [
          "They are going to train tomorrow."
        ],
        "explanation": "They 后用 are，going to 后用原形 train。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“我打算参加这个团队”。 以 I 开头。",
        "tokens": [
          "I",
          "intend",
          "to",
          "join",
          "the",
          "team."
        ],
        "answers": [
          "I intend to join the team."
        ],
        "explanation": "intend 后可以接 to 不定式。"
      }
    ],
    "sourcePages": [
      169,
      170
    ]
  },
  {
    "sourceLesson": 37,
    "title": "周五之前准备好",
    "scene": "校园城市模型展",
    "goal": "用将来完成时说明截止时间前会完成的工作。",
    "grammar": {
      "title": "将来完成时与将来进行时",
      "explanation": "will have + 过去分词强调在未来某个时间之前完成，常与 by Friday、by the time...搭配。will be + 动词-ing 强调未来某时正在进行。by the time 引导未来时间从句时通常用一般现在时，而不是 will。",
      "examples": [
        {
          "en": "By noon, we will have printed all the labels.",
          "zh": "到中午时，我们将已印好所有标签。"
        },
        {
          "en": "At noon, we will be arranging the models.",
          "zh": "中午时，我们将正在摆放模型。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "Olympic",
        "meaning": "adj. 奥林匹克运动会的",
        "example": "We discussed an Olympic poster in art class.",
        "exampleZh": "我们在美术课上讨论了一张奥运海报。"
      },
      {
        "word": "hold",
        "meaning": "v. 举行；举办",
        "example": "Our school will hold a design exhibition in May.",
        "exampleZh": "学校将于五月举办设计展。"
      },
      {
        "word": "government",
        "meaning": "n. 政府",
        "example": "Our project explains how local government works.",
        "exampleZh": "我们的课题介绍地方政府如何运作。"
      },
      {
        "word": "immense",
        "meaning": "adj. 巨大的",
        "example": "An immense map covered one wall of the classroom.",
        "exampleZh": "一张巨大的地图覆盖了教室的一面墙。"
      },
      {
        "word": "stadium",
        "meaning": "n. 体育场",
        "example": "The bus stop is opposite the stadium.",
        "exampleZh": "公交站在体育场对面。"
      },
      {
        "word": "standard",
        "meaning": "n. 标准",
        "example": "Every model must meet the same safety standard.",
        "exampleZh": "每个模型都必须达到同样的安全标准。"
      },
      {
        "word": "capital",
        "meaning": "n. 首都；首府",
        "example": "The quiz asked us to name the capital of France.",
        "exampleZh": "测验要求我们说出法国的首都。"
      },
      {
        "word": "fantastic",
        "meaning": "adj. 极大的；惊人的（程度或数量）；也常指极好的",
        "example": "Organising the exhibition took a fantastic amount of work.",
        "exampleZh": "筹办这次展览需要极大的工作量。"
      },
      {
        "word": "design",
        "meaning": "v. 设计",
        "example": "We will design a quiet reading area for the model town.",
        "exampleZh": "我们将为模型小镇设计一个安静的阅读区。"
      }
    ],
    "passage": {
      "en": "Our group is designing a model town for Friday’s exhibition. It includes a library, a stadium and an immense park. By Thursday evening, we will have finished the buildings. On Friday morning, we will be checking the lights while another group arranges the tables. Our teacher says every model must meet the same safety standard. By the time visitors arrive, we will have tested all the switches and put the tools away.",
      "zh": "我们小组正在为周五的展览设计一个模型小镇。镇里有图书馆、体育场和一座很大的公园。到周四晚上，我们将完成所有建筑。周五早上，另一个小组摆桌子时，我们将检查灯光。老师说，每个模型都必须符合相同的安全标准。等访客到来时，我们将已测试过所有开关，并把工具收好。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "强调截止时间前完成：By six, we ___ all the signs.",
        "options": [
          "will making",
          "have make",
          "will have made"
        ],
        "answers": [
          "will have made"
        ],
        "explanation": "will have made 是将来完成时，强调六点前完成。"
      },
      {
        "type": "choice",
        "prompt": "选择时间从句中的正确形式：By the time the doors ___, we will have cleaned the room.",
        "options": [
          "opening",
          "open",
          "will open"
        ],
        "answers": [
          "open"
        ],
        "explanation": "by the time 引导的未来时间从句用一般现在时。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：The model must meet the school’s safety ___.",
        "options": [
          "standard",
          "capital",
          "stadium"
        ],
        "answers": [
          "standard"
        ],
        "explanation": "meet a standard 表示达到某项标准。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：周五早上另一组将做什么？",
        "options": [
          "Build the library.",
          "Sell the tools.",
          "Arrange the tables."
        ],
        "answers": [
          "Arrange the tables."
        ],
        "explanation": "短文说另一个小组在摆放桌子。"
      },
      {
        "type": "text",
        "prompt": "用将来完成时写一句，顺序为 We / finish the map / by Friday。",
        "answers": [
          "We will have finished the map by Friday."
        ],
        "explanation": "will have finished 强调周五之前完成地图。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“到那时我们将已测试过灯光”。 以 We 开头，把 by then 放在句末。",
        "tokens": [
          "We",
          "will",
          "have",
          "tested",
          "the",
          "lights",
          "by",
          "then."
        ],
        "answers": [
          "We will have tested the lights by then."
        ],
        "explanation": "将来完成时为 will have tested，by then 给出截止点。"
      }
    ],
    "sourcePages": [
      173,
      174
    ]
  },
  {
    "sourceLesson": 38,
    "title": "消息读完再判断",
    "scene": "班级群里的误会",
    "goal": "用过去完成时交代过去事件之前发生的事情。",
    "grammar": {
      "title": "过去完成时与过去视角",
      "explanation": "had + 过去分词表示在某个过去时间之前已经发生的动作；一般过去时推进主要事件。比较 I arrived 与 the meeting had started，就能看出先后。as if + 过去完成时可描写仿佛早已发生的情况，语境可能暗示它并不真实。",
      "examples": [
        {
          "en": "When I opened the file, someone had already corrected the date.",
          "zh": "我打开文件时，已经有人改好了日期。"
        },
        {
          "en": "He explained the route as if he had walked it many times.",
          "zh": "他讲解那条路线时，就像已经走过很多次一样。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "except",
        "meaning": "prep. 除……之外（排除在外）",
        "example": "Everyone except Leo brought a notebook.",
        "exampleZh": "除了利奥，大家都带了笔记本。"
      },
      {
        "word": "Mediterranean",
        "meaning": "n./adj. 地中海；地中海的",
        "example": "We found the Mediterranean on the classroom map.",
        "exampleZh": "我们在教室的地图上找到了地中海。"
      },
      {
        "word": "complain",
        "meaning": "v. 抱怨",
        "example": "Please explain the problem instead of only complaining.",
        "exampleZh": "请说明问题，不要只顾抱怨。"
      },
      {
        "word": "continually",
        "meaning": "adv. 反复地；频繁地",
        "example": "My phone continually interrupted me with alerts.",
        "exampleZh": "手机频繁发出提醒，打断我。"
      },
      {
        "word": "bitterly",
        "meaning": "adv. 强烈地；愤愤地（也可形容极度寒冷）",
        "example": "She complained bitterly about the unfair rule.",
        "exampleZh": "她愤愤地抱怨那条不公平的规定。"
      },
      {
        "word": "sunshine",
        "meaning": "n. 阳光",
        "example": "We moved the reading chairs into the sunshine.",
        "exampleZh": "我们把阅读椅搬到了阳光下。"
      }
    ],
    "passage": {
      "en": "When Jia checked the class group at lunchtime, several students had already complained about a changed meeting time. She nearly joined them, but first she read the earlier messages. The teacher had explained that the hall was needed for an exam. Everyone except Jia seemed to know the new room number. One student wrote as if he had checked every detail, although he had missed the same message. Jia shared the notice again, and the argument stopped.",
      "zh": "佳午饭时查看班级群，几位同学已经在抱怨集合时间被改了。她差点也加入抱怨，但先读了前面的消息。老师早已说明，礼堂要用来考试。除了佳，大家似乎都知道新教室的号码。一位同学发言时仿佛核对过每个细节，尽管他也漏看了同一条消息。佳把通知再次发出，争论就停止了。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "表示抱怨发生在查看群消息之前：When Jia checked the group, students ___ already ___.",
        "options": [
          "did; complained",
          "had; complained",
          "have; complain"
        ],
        "answers": [
          "had; complained"
        ],
        "explanation": "过去查看消息之前已经发生，用 had complained。"
      },
      {
        "type": "choice",
        "prompt": "选择正确形式：He spoke as if he ___ the report before, but it was new to him.",
        "options": [
          "had read",
          "has reading",
          "had readed"
        ],
        "answers": [
          "had read"
        ],
        "explanation": "as if 后用 had read 表示仿佛以前读过，read 的过去分词仍写作 read。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：Everyone ___ Min had a ticket; Min still needed one.",
        "options": [
          "continually",
          "bitterly",
          "except"
        ],
        "answers": [
          "except"
        ],
        "explanation": "Min 没有票，被排除在 Everyone 的范围外，因此用 except。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：礼堂为什么不能用于原来的会议？",
        "options": [
          "It was too sunny.",
          "It was needed for an exam.",
          "It had no chairs."
        ],
        "answers": [
          "It was needed for an exam."
        ],
        "explanation": "老师已说明礼堂要用来考试。"
      },
      {
        "type": "text",
        "prompt": "用过去完成时补全完整句子，把 already 放在 had 后：They / already / leave / when I arrived。",
        "answers": [
          "They had already left when I arrived."
        ],
        "explanation": "离开发生在到达之前，因此用 had already left。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“我在回复前已经读过通知”。 以 I had read 开头。",
        "tokens": [
          "I",
          "had",
          "read",
          "the",
          "notice",
          "before",
          "I",
          "replied."
        ],
        "answers": [
          "I had read the notice before I replied."
        ],
        "explanation": "had read 交代先发生的阅读，replied 说明后发生的回复。"
      }
    ],
    "sourcePages": [
      177,
      178
    ]
  },
  {
    "sourceLesson": 39,
    "title": "替社团转述咨询",
    "scene": "校园服务信息",
    "goal": "转述陈述、一般疑问句和特殊疑问句。",
    "grammar": {
      "title": "间接引语中的陈述与疑问",
      "explanation": "said that 可引出转述内容；asked if/whether 转述一般疑问句，asked + 疑问词转述特殊疑问句。从句用陈述语序，即主语在动词前，不保留 do/does/did 的疑问结构。过去语境中时态常后移，人称和时间词也随转述视角改变。",
      "examples": [
        {
          "en": "Sara said that the desk was open.",
          "zh": "萨拉说服务台开着。"
        },
        {
          "en": "He asked where the meeting would take place.",
          "zh": "他问会议将在哪里举行。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "operation",
        "meaning": "n. 手术",
        "example": "The nurse explained what would happen before the operation.",
        "exampleZh": "护士解释了手术前会有哪些步骤。"
      },
      {
        "word": "successful",
        "meaning": "adj. 成功的",
        "example": "Our first book exchange was successful.",
        "exampleZh": "我们的第一次图书交换活动很成功。"
      },
      {
        "word": "following",
        "meaning": "adj. 接下来的；随后的",
        "example": "We agreed to meet the following afternoon.",
        "exampleZh": "我们约好第二天下午见面。"
      },
      {
        "word": "patient",
        "meaning": "n. 病人",
        "example": "Each patient received a clear appointment time.",
        "exampleZh": "每位病人都拿到了明确的预约时间。"
      },
      {
        "word": "alone",
        "meaning": "adv./adj. 独自；单独的",
        "example": "I did not want to walk home alone in the dark.",
        "exampleZh": "我不想在天黑时独自步行回家。"
      },
      {
        "word": "exchange",
        "meaning": "n. 电话交换台；电话局（传统电话系统用语）",
        "example": "The museum displayed equipment from an old telephone exchange.",
        "exampleZh": "博物馆展出了旧电话交换台的设备。"
      },
      {
        "word": "inquire",
        "meaning": "v. 询问；打听（较正式）",
        "example": "Dad called to inquire about the opening hours.",
        "exampleZh": "爸爸打电话询问开放时间。"
      },
      {
        "word": "certain",
        "meaning": "adj. 某个；某一位（未具体指明）",
        "example": "A certain student had left a bag at reception.",
        "exampleZh": "有一位学生把包落在了接待处。"
      },
      {
        "word": "caller",
        "meaning": "n. 打电话的人；来电者",
        "example": "The caller asked for the school office.",
        "exampleZh": "来电者要求接通学校办公室。"
      },
      {
        "word": "relative",
        "meaning": "n. 亲属",
        "example": "One of my relatives teaches music.",
        "exampleZh": "我的一位亲属教音乐。"
      }
    ],
    "passage": {
      "en": "I helped at the school information desk during lunch. A caller wanted to inquire about our weekend science club. She said that her younger brother was interested and asked whether beginners could join. I explained that everyone was welcome. She then asked what time the session started and whether a relative could wait inside. I wrote down her questions for the teacher and promised to pass on the answers the following day.",
      "zh": "午饭时间，我在学校咨询台帮忙。一位来电者想咨询我们的周末科学社。她说弟弟很感兴趣，并问初学者能否加入。我解释说欢迎所有人参加。她接着问活动几点开始，以及亲属能否在里面等候。我记下问题交给老师，并答应第二天转告答复。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "转述“Can beginners join?”：She asked ___ beginners could join.",
        "options": [
          "whether",
          "that",
          "what"
        ],
        "answers": [
          "whether"
        ],
        "explanation": "一般疑问句转述时用 if 或 whether。"
      },
      {
        "type": "choice",
        "prompt": "选择间接疑问句的正确语序：He asked ___.",
        "options": [
          "where was the desk",
          "where did the desk be",
          "where the desk was"
        ],
        "answers": [
          "where the desk was"
        ],
        "explanation": "间接疑问句用陈述语序：where + 主语 + 动词。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：The ___ on the phone asked to speak to a teacher.",
        "options": [
          "exchange",
          "caller",
          "operation"
        ],
        "answers": [
          "caller"
        ],
        "explanation": "caller 指打电话的人。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：来电者主要替谁咨询？",
        "options": [
          "Her younger brother.",
          "Her science teacher.",
          "The narrator’s relative."
        ],
        "answers": [
          "Her younger brother."
        ],
        "explanation": "她说自己的弟弟对科学社感兴趣。"
      },
      {
        "type": "text",
        "prompt": "把 “The room is ready,” Dan said. 改成 Dan said that 开头的间接引语，并把 is 后移为 was。",
        "answers": [
          "Dan said that the room was ready."
        ],
        "explanation": "报告动词为过去时，按题目要求将 is 后移为 was。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“她问活动何时开始”。 以 She 开头。",
        "tokens": [
          "She",
          "asked",
          "when",
          "the",
          "session",
          "started."
        ],
        "answers": [
          "She asked when the session started."
        ],
        "explanation": "when 从句使用 the session started 的陈述语序。"
      }
    ],
    "sourcePages": [
      181,
      182
    ]
  },
  {
    "sourceLesson": 40,
    "title": "小房间的大计划",
    "scene": "班级休息角提案",
    "goal": "用与现在事实不符的假设提出可讨论的方案。",
    "grammar": {
      "title": "现在或未来的虚拟条件句",
      "explanation": "if + 一般过去时，主句用 would/could + 动词原形，表达假想情况，不是单纯叙述过去。would 常表示假设的结果，could 强调可能或能力。较正式的假设中，be 可用 were，尤其是 If I were you。",
      "examples": [
        {
          "en": "If our room were larger, we would add a sofa.",
          "zh": "如果房间更大，我们会添一张沙发。"
        },
        {
          "en": "If I knew the answer, I could explain it to you.",
          "zh": "如果我知道答案，就能给你解释了。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "hostess",
        "meaning": "n. 女主人；女主持人（现代也常用不分性别的 host）",
        "example": "The hostess welcomed us to her home for dinner.",
        "exampleZh": "女主人欢迎我们到她家吃晚饭。"
      },
      {
        "word": "unsmiling",
        "meaning": "adj. 不笑的；表情严肃的",
        "example": "The unsmiling referee checked the equipment carefully.",
        "exampleZh": "表情严肃的裁判仔细检查了器材。"
      },
      {
        "word": "tight",
        "meaning": "adj. 紧的；紧身的",
        "example": "These gloves are too tight for my hands.",
        "exampleZh": "这副手套对我的手来说太紧了。"
      },
      {
        "word": "fix",
        "meaning": "v. 凝视；把目光集中在（常接 eyes/gaze on）",
        "example": "Fix your eyes on the small dot in the centre.",
        "exampleZh": "把目光集中在中央的小点上。"
      },
      {
        "word": "globe",
        "meaning": "n. 地球；地球仪",
        "example": "We marked our pen pals’ cities on a globe.",
        "exampleZh": "我们在地球仪上标出了笔友所在的城市。"
      },
      {
        "word": "despair",
        "meaning": "n. 绝望；失去希望",
        "example": "Do not give up in despair after one poor result.",
        "exampleZh": "不要因一次成绩不好就绝望地放弃。"
      }
    ],
    "passage": {
      "en": "Our class wants a quiet corner for reading, but the spare room is tiny. During a meeting, Jun said, “If we had more space, we would put a sofa beside the window.” Mei pointed at a globe on an unused desk. “If we moved this desk, we could fit two chairs here.” Our teacher looked serious at first, but she liked Mei’s practical idea. We cannot change the room’s size, yet we can change how we use it.",
      "zh": "我们班想要一个安静的阅读角，但空余房间很小。开会时，俊说：“如果空间大些，我们就会在窗边放张沙发。”美指着一张闲置书桌上的地球仪说：“如果把这张桌子搬走，这里就能放下两把椅子。”老师起初神情严肃，但她很喜欢美这个切实可行的想法。我们不能改变房间的大小，却能改变使用它的方式。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "选择虚拟条件句的正确形式：If I ___ more time, I would join the art club.",
        "options": [
          "have",
          "will have",
          "had"
        ],
        "answers": [
          "had"
        ],
        "explanation": "主句为 would join，表示假设，if 从句用过去式 had。"
      },
      {
        "type": "choice",
        "prompt": "选择正确的假设结果：If the shelf were lower, we ___ the books.",
        "options": [
          "could reached",
          "could reach",
          "can reached"
        ],
        "answers": [
          "could reach"
        ],
        "explanation": "could 后必须接动词原形 reach。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：The jacket was so ___ that I could hardly move my arms.",
        "options": [
          "tight",
          "unsmiling",
          "globe"
        ],
        "answers": [
          "tight"
        ],
        "explanation": "衣服限制手臂活动，说明它太紧。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：美建议怎样腾出椅子的位置？",
        "options": [
          "Remove the window.",
          "Build a larger room.",
          "Move an unused desk."
        ],
        "answers": [
          "Move an unused desk."
        ],
        "explanation": "美提出搬走那张闲置书桌。"
      },
      {
        "type": "text",
        "prompt": "用虚拟条件句翻译，固定开头 If I were you，使用 ask for help：如果我是你，我会寻求帮助。",
        "answers": [
          "If I were you, I would ask for help."
        ],
        "explanation": "If I were you 常用来提出建议，主句用 would + 动词原形。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“如果我们有空间，就会添些椅子”。 以 If 开头，条件从句放在前面。",
        "tokens": [
          "If",
          "we",
          "had",
          "space,",
          "we",
          "would",
          "add",
          "chairs."
        ],
        "answers": [
          "If we had space, we would add chairs."
        ],
        "explanation": "if 从句用 had，主句用 would add。"
      }
    ],
    "sourcePages": [
      185,
      186
    ]
  },
  {
    "sourceLesson": 41,
    "title": "活动室的使用规则",
    "scene": "共享活动室",
    "goal": "区分禁止、不必和过去本不必做却做了的事。",
    "grammar": {
      "title": "must、have to 与 need",
      "explanation": "must 和 have to 都可表达必须，have to 更常用于外部要求，也有 had to 等时态形式。must not 表示禁止，need not/do not have to 表示不必。need not have + 过去分词表示事情已经做了，但其实没必要；did not need to 本身不说明到底做没做。",
      "examples": [
        {
          "en": "You must not block the fire exit.",
          "zh": "你绝不能堵住消防出口。"
        },
        {
          "en": "We need not have printed the form; an online copy was enough.",
          "zh": "我们本不必打印表格，电子版就够了。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "rude",
        "meaning": "adj. 无礼的；粗鲁的",
        "example": "It is rude to interrupt someone who is speaking.",
        "exampleZh": "打断正在说话的人是不礼貌的。"
      },
      {
        "word": "mirror",
        "meaning": "n. 镜子",
        "example": "Please check the mirror before the drama rehearsal.",
        "exampleZh": "戏剧排练前请照照镜子。"
      },
      {
        "word": "hole",
        "meaning": "n. 洞；孔",
        "example": "There is a small hole in the pocket of my coat.",
        "exampleZh": "我的外套口袋上有个小洞。"
      },
      {
        "word": "remark",
        "meaning": "v. 评论；说起",
        "example": "Our teacher remarked that the room looked brighter.",
        "exampleZh": "老师说这个房间看起来更明亮了。"
      },
      {
        "word": "remind",
        "meaning": "v. 提醒",
        "example": "Please remind me to return the key tomorrow.",
        "exampleZh": "请提醒我明天归还钥匙。"
      },
      {
        "word": "lighthouse",
        "meaning": "n. 灯塔",
        "example": "The model lighthouse flashes a small white light.",
        "exampleZh": "模型灯塔闪着一束小小的白光。"
      }
    ],
    "passage": {
      "en": "Our drama club has a new shared room. We have to return the key before five, and we must not cover the mirror with posters. We do not have to bring chairs because the room already has enough. Yesterday, I carried six chairs upstairs before reading the notice. I need not have brought them at all. Our teacher reminded us to check the rules first, then asked two students to help me carry the chairs back.",
      "zh": "我们戏剧社有了一间新的共用活动室。我们必须五点前还钥匙，而且不能用海报挡住镜子。我们不必自带椅子，因为房间里已经有足够的椅子。昨天，我先把六把椅子搬上楼，才去读通知。其实我根本没必要带它们来。老师提醒我们先查看规则，然后请两位同学帮我把椅子搬回去。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "门上写着“禁止入内”。选正确表达：You ___ enter.",
        "options": [
          "do not have to",
          "must not",
          "need not"
        ],
        "answers": [
          "must not"
        ],
        "explanation": "must not 表示禁止；另两个选项只表示不必。"
      },
      {
        "type": "choice",
        "prompt": "你已经打印了不需要的地图。选择准确表达：I ___ the map.",
        "options": [
          "need not have printed",
          "need not printed",
          "must not printing"
        ],
        "answers": [
          "need not have printed"
        ],
        "explanation": "need not have printed 表示已经打印，但没有必要。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：Could you ___ me to bring the key? I often forget.",
        "options": [
          "remark",
          "mirror",
          "remind"
        ],
        "answers": [
          "remind"
        ],
        "explanation": "remind someone to do something 表示提醒某人做某事。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：叙述者为什么不必带椅子？",
        "options": [
          "The students were not allowed to sit.",
          "The room already had enough chairs.",
          "The club would meet outside."
        ],
        "answers": [
          "The room already had enough chairs."
        ],
        "explanation": "房间里原本已有足够的椅子。"
      },
      {
        "type": "text",
        "prompt": "用 do not have to 翻译，主语用 We：我们不必买票。 “票”使用复数 tickets。",
        "answers": [
          "We do not have to buy tickets.",
          "We don’t have to buy tickets.",
          "We don't have to buy tickets."
        ],
        "explanation": "do not have to 表示不必，不表示禁止买票。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“你绝不能堵住门”。 以 You 开头。",
        "tokens": [
          "You",
          "must",
          "not",
          "block",
          "the",
          "door."
        ],
        "answers": [
          "You must not block the door."
        ],
        "explanation": "must not + 动词原形表达禁止。"
      }
    ],
    "sourcePages": [
      189,
      190
    ]
  },
  {
    "sourceLesson": 42,
    "title": "午休音乐小站",
    "scene": "校园音乐角",
    "goal": "区分表示拥有的 have 与表示活动的 have。",
    "grammar": {
      "title": "have 的拥有与活动用法",
      "explanation": "表示拥有时，have 与 have got 都可使用：Do you have...? / Have you got...?。have got 的否定是 have not got。表示活动的 have a lesson、have a break 等不能直接改成 have got，也可用进行时强调正在进行。描述固定拥有关系时，通常不用进行时。",
      "examples": [
        {
          "en": "Have you got a spare pair of headphones?",
          "zh": "你有一副备用耳机吗？"
        },
        {
          "en": "We are having a short break before rehearsal.",
          "zh": "排练前我们正在短暂休息。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "musical",
        "meaning": "adj. 音乐的；有音乐天赋的",
        "example": "She comes from a musical family.",
        "exampleZh": "她来自一个有音乐传统的家庭。"
      },
      {
        "word": "market",
        "meaning": "n. 市场；集市",
        "example": "We bought second-hand records at the weekend market.",
        "exampleZh": "我们在周末集市买了二手唱片。"
      },
      {
        "word": "snake charmer",
        "meaning": "n. 弄蛇人；耍蛇者（传统表演者）",
        "example": "The museum label described a snake charmer in an old painting.",
        "exampleZh": "博物馆的说明牌介绍了一幅古画中的耍蛇者。"
      },
      {
        "word": "pipe",
        "meaning": "n. 管乐器；笛类乐器",
        "example": "The guide showed us a wooden pipe in the instrument case.",
        "exampleZh": "讲解员给我们看了乐器展示柜里的一支木制笛子。"
      },
      {
        "word": "tune",
        "meaning": "n. 曲调；旋律",
        "example": "I know the tune, but I cannot remember the words.",
        "exampleZh": "我知道旋律，却记不起歌词了。"
      },
      {
        "word": "glimpse",
        "meaning": "n. 一瞥；短暂看到",
        "example": "I caught a glimpse of the drummer through the open door.",
        "exampleZh": "我从敞开的门口瞥见了鼓手。"
      },
      {
        "word": "snake",
        "meaning": "n. 蛇",
        "example": "The science poster shows how a snake moves.",
        "exampleZh": "科学海报展示了蛇如何移动。"
      },
      {
        "word": "movement",
        "meaning": "n. 动作；移动",
        "example": "The camera follows the dancer’s movements.",
        "exampleZh": "摄像机跟随着舞者的动作。"
      },
      {
        "word": "continue",
        "meaning": "v. 继续",
        "example": "We will continue the rehearsal after lunch.",
        "exampleZh": "我们午饭后将继续排练。"
      },
      {
        "word": "dance",
        "meaning": "v. 跳舞",
        "example": "My grandparents like to dance together.",
        "exampleZh": "我的祖父母喜欢一起跳舞。"
      },
      {
        "word": "obviously",
        "meaning": "adv. 显然；明显地",
        "example": "The speaker was obviously broken because no sound came out.",
        "exampleZh": "音箱显然坏了，因为一点声音都没有。"
      },
      {
        "word": "difference",
        "meaning": "n. 差别；区别",
        "example": "Can you hear the difference between these two notes?",
        "exampleZh": "你能听出这两个音的区别吗？"
      },
      {
        "word": "Indian",
        "meaning": "adj./n. 印度的；印度人",
        "example": "Our Indian music teacher introduced a new rhythm.",
        "exampleZh": "我们的印度音乐老师介绍了一种新节奏。"
      }
    ],
    "passage": {
      "en": "Our music corner opens at lunchtime on Wednesdays. We have a small speaker and several pairs of headphones, but we have not got a microphone yet. Today, two students are having a lesson on rhythm while the rest of us listen to short tunes. I cannot hear the difference between the first two recordings. My partner suggests tapping the desk gently. When I try this, the pattern becomes clearer, and we continue listening together.",
      "zh": "我们的音乐角每周三午休时开放。我们有一个小音箱和几副耳机，但还没有麦克风。今天，两位同学正在上一节节奏课，其余同学则听一些简短的曲调。我听不出前两段录音的区别。同伴建议我轻轻敲桌子。我试了一下，节奏模式变得更清晰了，于是我们继续一起听。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "选择 have got 的正确疑问形式：___ a spare cable?",
        "options": [
          "Have you got",
          "Do you got",
          "Are you have got"
        ],
        "answers": [
          "Have you got"
        ],
        "explanation": "have got 的疑问句把 Have 放到主语前。"
      },
      {
        "type": "choice",
        "prompt": "此刻正在休息，选择正确形式：We ___ a break right now.",
        "options": [
          "have got",
          "are have",
          "are having"
        ],
        "answers": [
          "are having"
        ],
        "explanation": "have a break 是活动，可以用现在进行时 are having。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：I can sing the ___, but I have forgotten the lyrics.",
        "options": [
          "market",
          "tune",
          "movement"
        ],
        "answers": [
          "tune"
        ],
        "explanation": "能唱出来而与歌词相对的是旋律 tune。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：同伴建议如何辨认节奏？",
        "options": [
          "Tap the desk gently.",
          "Buy a microphone.",
          "Close the music corner."
        ],
        "answers": [
          "Tap the desk gently."
        ],
        "explanation": "同伴建议轻轻敲桌子来感受节奏。"
      },
      {
        "type": "text",
        "prompt": "用 have not got 写完整句子：We / a microphone yet。",
        "answers": [
          "We have not got a microphone yet.",
          "We haven’t got a microphone yet.",
          "We haven't got a microphone yet."
        ],
        "explanation": "have not got 表示尚未拥有，yet 放句末。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“他们正在上一节音乐课”。 以 They 开头。",
        "tokens": [
          "They",
          "are",
          "having",
          "a",
          "music",
          "lesson."
        ],
        "answers": [
          "They are having a music lesson."
        ],
        "explanation": "have a lesson 表示上课，正在进行用 are having。"
      }
    ],
    "sourcePages": [
      193,
      194
    ]
  },
  {
    "sourceLesson": 43,
    "title": "把演示救回来",
    "scene": "课堂展示的技术问题",
    "goal": "用 can/could 谈能力，用 was able to 表达一次成功完成的事。",
    "grammar": {
      "title": "能力与一次性成功",
      "explanation": "can 表示现在的能力，could 常说过去的一般能力。谈过去某次确实克服困难做成了的事，通常用 was/were able to 或 managed to；否定形式 could not 和 was/were not able to 都可表达没能做到。未来能力可用 will be able to。",
      "examples": [
        {
          "en": "I could read simple maps when I was eight.",
          "zh": "我八岁时就能看简单的地图。"
        },
        {
          "en": "After two attempts, we were able to open the file.",
          "zh": "尝试两次后，我们终于打开了文件。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "pole",
        "meaning": "n. 地球的极；南极或北极",
        "example": "We marked the North Pole on our map.",
        "exampleZh": "我们在地图上标出了北极。"
      },
      {
        "word": "flight",
        "meaning": "n. 飞行；航班",
        "example": "Our project compares the cost of a flight and a train journey.",
        "exampleZh": "我们的课题比较乘飞机和乘火车的费用。"
      },
      {
        "word": "explorer",
        "meaning": "n. 探险家",
        "example": "The library has a new biography of an explorer.",
        "exampleZh": "图书馆有一本新到的探险家传记。"
      },
      {
        "word": "lie",
        "meaning": "v. 位于；坐落在",
        "example": "The sports centre lies to the east of our school.",
        "exampleZh": "体育中心位于我们学校东面。"
      },
      {
        "word": "serious",
        "meaning": "adj. 严重的；认真的",
        "example": "The broken lock is a serious safety problem.",
        "exampleZh": "坏掉的锁是个严重的安全问题。"
      },
      {
        "word": "point",
        "meaning": "n. 地点；位置",
        "example": "This point on the map marks the main entrance.",
        "exampleZh": "地图上的这个点标示正门的位置。"
      },
      {
        "word": "seem",
        "meaning": "v. 似乎；好像",
        "example": "The instructions seem easier with pictures.",
        "exampleZh": "配上图片后，说明似乎更容易懂了。"
      },
      {
        "word": "crash",
        "meaning": "v. 坠毁；猛烈撞击",
        "example": "In the simulation, the model aircraft crashed into a hill.",
        "exampleZh": "在模拟程序中，模型飞机撞上了山丘。"
      },
      {
        "word": "sack",
        "meaning": "n. 大袋；麻袋",
        "example": "We collected the empty bottles in a large sack.",
        "exampleZh": "我们把空瓶收进了一个大袋子。"
      },
      {
        "word": "clear",
        "meaning": "v. 越过；从……上方通过",
        "example": "The paper plane just cleared the top of the chair.",
        "exampleZh": "纸飞机刚好从椅背顶端上方飞过。"
      },
      {
        "word": "aircraft",
        "meaning": "n. 飞机；航空器（单复数同形）",
        "example": "The museum has three small aircraft on display.",
        "exampleZh": "博物馆展出了三架小型飞机。"
      },
      {
        "word": "endless",
        "meaning": "adj. 无尽的；似乎没有尽头的",
        "example": "The queue seemed endless, but it moved quickly.",
        "exampleZh": "队伍似乎没有尽头，但移动得很快。"
      },
      {
        "word": "plain",
        "meaning": "n. 平原；广阔平地",
        "example": "The geography model shows a river crossing a plain.",
        "exampleZh": "地理模型展示了一条流经平原的河流。"
      }
    ],
    "passage": {
      "en": "Our group had prepared a presentation about travel maps, but the classroom screen would not connect to my laptop. I could use the software well, yet I had never changed the display settings. A classmate found a printed guide in the desk. By following its steps, we were able to connect the screen before our turn. We also saved a copy on another device. Next time, we will be able to begin even if one laptop fails.",
      "zh": "我们小组准备了一个关于旅行地图的展示，但教室的屏幕无法连接我的笔记本电脑。我熟练掌握软件，却从没改过显示设置。一位同学在桌子里找到了一份纸质指南。按着步骤操作后，我们终于在轮到我们之前连接好了屏幕。我们还在另一台设备上存了副本。下次即使一台电脑故障，我们也能开始展示。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "用指定结构强调一次成功：After trying several cables, we ___ connect the screen.",
        "options": [
          "were able",
          "can to",
          "were able to"
        ],
        "answers": [
          "were able to"
        ],
        "explanation": "一次成功完成的过去事件可用 were able to + 原形。"
      },
      {
        "type": "choice",
        "prompt": "选择正确的未来能力表达：After the course, I ___ edit short videos.",
        "options": [
          "will able to",
          "will be able to",
          "will can"
        ],
        "answers": [
          "will be able to"
        ],
        "explanation": "can 没有 will can 这种形式，未来能力用 will be able to。"
      },
      {
        "type": "choice",
        "prompt": "模型飞机“cleared the fence”表示什么？",
        "options": [
          "从围栏上方飞了过去",
          "把围栏擦干净了",
          "在围栏前停住了"
        ],
        "answers": [
          "从围栏上方飞了过去"
        ],
        "explanation": "clear 在此为动词，表示越过障碍物。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：哪一样东西帮助小组解决了连接问题？",
        "options": [
          "A new map.",
          "A flight ticket.",
          "A printed guide."
        ],
        "answers": [
          "A printed guide."
        ],
        "explanation": "同学找到了纸质指南，大家按步骤解决了问题。"
      },
      {
        "type": "text",
        "prompt": "使用 was able to 表示一次成功，写完整句子：I / open the file / at last。",
        "answers": [
          "I was able to open the file at last."
        ],
        "explanation": "I 对应 was；was able to open 强调这次终于打开了。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“她十岁时就会游泳”。 以 She 开头，when 从句放在后面。",
        "tokens": [
          "She",
          "could",
          "swim",
          "when",
          "she",
          "was",
          "ten."
        ],
        "answers": [
          "She could swim when she was ten."
        ],
        "explanation": "could swim 表示过去的一般能力。"
      }
    ],
    "sourcePages": [
      197,
      198
    ]
  },
  {
    "sourceLesson": 44,
    "title": "旧物还可以再用",
    "scene": "校园旧物修补角",
    "goal": "使用动名词作宾语，并区分 used to 与 be used to。",
    "grammar": {
      "title": "动名词、不定式与固定搭配",
      "explanation": "enjoy、avoid、risk 等词后接动词-ing；decide、hope 等词后接 to 不定式。be used to + 名词/动词-ing 表示习惯于，其中 to 是介词；used to + 动词原形说过去的习惯。物作主语时，need + 动词-ing 可表示需要被做，也可换成 need to be done。 be accustomed to doing 与 be used to doing 都表示习惯于。物作主语时，want doing 也可表示需要被做，如 The gate wants painting；此用法偏英式，日常也可说 needs painting 或 needs to be painted。",
      "examples": [
        {
          "en": "I enjoy repairing old bags.",
          "zh": "我喜欢修补旧包。"
        },
        {
          "en": "This strap needs mending.",
          "zh": "这条背带需要修补。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "forest",
        "meaning": "n. 森林",
        "example": "The poster asks visitors to keep the forest clean.",
        "exampleZh": "海报请游客保持森林清洁。"
      },
      {
        "word": "risk",
        "meaning": "v. 冒……的风险",
        "example": "Do not risk losing your work by forgetting to save it.",
        "exampleZh": "别因为忘记保存而冒丢失作业的风险。"
      },
      {
        "word": "picnic",
        "meaning": "n. 野餐",
        "example": "We used reusable cups at our class picnic.",
        "exampleZh": "班级野餐时，我们用了可重复使用的杯子。"
      },
      {
        "word": "edge",
        "meaning": "n. 边缘",
        "example": "Keep the scissors away from the edge of the table.",
        "exampleZh": "把剪刀放在远离桌边的地方。"
      },
      {
        "word": "strap",
        "meaning": "n. 带子；背带",
        "example": "The strap on my schoolbag has come loose.",
        "exampleZh": "我的书包背带松了。"
      },
      {
        "word": "possession",
        "meaning": "n. 所有物；财产",
        "example": "My sketchbook is my favourite possession.",
        "exampleZh": "我的素描本是我最珍爱的物品。"
      },
      {
        "word": "breath",
        "meaning": "n. 呼吸；一口气",
        "example": "Take a slow breath before you begin speaking.",
        "exampleZh": "开始说话前缓缓吸一口气。"
      },
      {
        "word": "contents",
        "meaning": "n. 内容物；里面装的东西（复数）",
        "example": "Please empty the contents of the bag onto the table.",
        "exampleZh": "请把袋里的东西全部倒到桌上。"
      },
      {
        "word": "mend",
        "meaning": "v. 修补",
        "example": "Grandpa taught me to mend a small hole in a sock.",
        "exampleZh": "爷爷教我补袜子上的小洞。"
      }
    ],
    "passage": {
      "en": "At our reuse corner, students bring things that need repairing. I enjoy sorting buttons, but I am not used to sewing yet. Today, a friend brought a bag with a broken strap. We decided to empty its contents before starting. Our teacher showed us how to hold the fabric safely and reminded us to avoid leaving needles on the table. The repair took time, but my friend was pleased to keep her favourite possession.",
      "zh": "在我们的旧物再用角，同学们会带来需要修理的东西。我喜欢给纽扣分类，但还不习惯缝纫。今天，一位朋友带来了一个背带坏了的包。我们决定先把里面的东西倒空再开始。老师示范了怎样安全地拿住布料，并提醒我们避免把针留在桌上。修补花了些时间，但朋友很开心，能继续使用她最喜欢的物品。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "选择正确形式：Please avoid ___ needles on the floor.",
        "options": [
          "leave",
          "leaving",
          "to leave"
        ],
        "answers": [
          "leaving"
        ],
        "explanation": "avoid 后接动名词 leaving。"
      },
      {
        "type": "choice",
        "prompt": "选择表示“已经习惯”的形式：I am used to ___ careful notes.",
        "options": [
          "taking",
          "take",
          "took"
        ],
        "answers": [
          "taking"
        ],
        "explanation": "be used to 中的 to 是介词，后接 taking。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：The shoulder ___ on my bag is broken.",
        "options": [
          "breath",
          "forest",
          "strap"
        ],
        "answers": [
          "strap"
        ],
        "explanation": "包的肩带叫 strap。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：大家开始修包之前先做了什么？",
        "options": [
          "Put needles on the floor.",
          "Emptied the bag.",
          "Bought a new bag."
        ],
        "answers": [
          "Emptied the bag."
        ],
        "explanation": "短文说先倒空包里的东西再开始修理。"
      },
      {
        "type": "text",
        "prompt": "用 need + 动词-ing 写一句：这扇窗需要清洁。主语用 This window，动词用 clean。",
        "answers": [
          "This window needs cleaning."
        ],
        "explanation": "window 是第三人称单数，needs cleaning 表示需要被清洁。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“我们决定修补这只包”。 以 We 开头。",
        "tokens": [
          "We",
          "decided",
          "to",
          "mend",
          "the",
          "bag."
        ],
        "answers": [
          "We decided to mend the bag."
        ],
        "explanation": "decide 后接 to 不定式，表示决定做某事。"
      }
    ],
    "sourcePages": [
      201,
      202
    ]
  },
  {
    "sourceLesson": 45,
    "title": "作品发表前的检查",
    "scene": "班级电子作品集",
    "goal": "使用完成时被动和情态动词被动说明审核流程。",
    "grammar": {
      "title": "被动语态的多种形式",
      "explanation": "被动语态的核心是 be + 过去分词。现在完成时被动用 has/have been done；情态动词被动用 must/can/should be done；被动不定式用 to be done。根据主语是动作执行者还是接受者判断主动或被动，再确定时态。",
      "examples": [
        {
          "en": "The photographs have been checked.",
          "zh": "照片已经检查过了。"
        },
        {
          "en": "Every name must be spelt correctly.",
          "zh": "每个人的名字都必须拼写正确。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "clear",
        "meaning": "adj. 无愧的；问心无愧的",
        "example": "I have a clear conscience because I told the truth.",
        "exampleZh": "因为我说了实话，所以问心无愧。"
      },
      {
        "word": "conscience",
        "meaning": "n. 良心；是非感",
        "example": "My conscience would not let me take credit for her work.",
        "exampleZh": "我的良心不允许我把她的成果说成自己的。"
      },
      {
        "word": "wallet",
        "meaning": "n. 钱包",
        "example": "I keep my travel card in my wallet.",
        "exampleZh": "我把交通卡放在钱包里。"
      },
      {
        "word": "savings",
        "meaning": "n. 储蓄；积蓄（复数）",
        "example": "She used part of her savings to buy a bicycle.",
        "exampleZh": "她用部分积蓄买了一辆自行车。"
      },
      {
        "word": "villager",
        "meaning": "n. 村民",
        "example": "A villager showed our class around the old school.",
        "exampleZh": "一位村民带我们班参观了那所旧学校。"
      },
      {
        "word": "per cent",
        "meaning": "n./adv. 百分之……（英式写法）",
        "example": "Thirty per cent of the survey group walked to school.",
        "exampleZh": "受访者中有百分之三十步行上学。"
      }
    ],
    "passage": {
      "en": "Our class is making a digital collection of student artwork. The pictures have been photographed, but some names still need to be checked. No work can be published without the artist’s permission. Our teacher also says that borrowed images must be clearly labelled. We want every contributor to feel fairly treated. By checking credits carefully, we can share the collection with a clear conscience and explain exactly who created each piece.",
      "zh": "我们班正在制作学生美术作品的电子合集。作品已经拍好照片，但有些姓名还需要核对。未经作者许可，作品不能发表。老师还说，借用的图片必须清楚标注。我们希望每位投稿者都受到公平对待。仔细核对署名后，我们就能问心无愧地分享合集，并准确说明每件作品是谁创作的。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "选择现在完成时被动：All the captions ___ by the teacher.",
        "options": [
          "have been checked",
          "have checking",
          "has been checked"
        ],
        "answers": [
          "have been checked"
        ],
        "explanation": "复数主语 captions 配 have，完成时被动为 have been checked。"
      },
      {
        "type": "choice",
        "prompt": "选择正确的情态动词被动：The artist’s name must ___ clearly.",
        "options": [
          "print",
          "been printed",
          "be printed"
        ],
        "answers": [
          "be printed"
        ],
        "explanation": "must 后用 be + 过去分词，表示名字必须被印清楚。"
      },
      {
        "type": "choice",
        "prompt": "“a clear conscience”最接近哪一项？",
        "options": [
          "钱包整洁",
          "问心无愧",
          "视力清晰"
        ],
        "answers": [
          "问心无愧"
        ],
        "explanation": "clear 在这一搭配中表示没有愧疚。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：作品发表之前必须取得什么？",
        "options": [
          "The artist’s permission.",
          "A new camera.",
          "A printed wallet card."
        ],
        "answers": [
          "The artist’s permission."
        ],
        "explanation": "文章明确要求取得创作者许可后才能发表。"
      },
      {
        "type": "text",
        "prompt": "把 They have checked the names. 改成以 The names 开头的被动句。 省略动作发出者，不写 by them。",
        "answers": [
          "The names have been checked."
        ],
        "explanation": "将 names 提为主语，have checked 改为 have been checked。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“这个文件需要被重新命名”。 以 The file 开头。",
        "tokens": [
          "The",
          "file",
          "needs",
          "to",
          "be",
          "renamed."
        ],
        "answers": [
          "The file needs to be renamed."
        ],
        "explanation": "need 后的被动不定式是 to be renamed。"
      }
    ],
    "sourcePages": [
      205,
      206
    ]
  },
  {
    "sourceLesson": 46,
    "title": "修车先说清问题",
    "scene": "社区自行车维修点",
    "goal": "掌握常见动词与 to、at、for、with 的搭配。",
    "grammar": {
      "title": "动词与介词搭配",
      "explanation": "英语中的介词常由前面的动词或表达决定，不能逐字从中文套用。例如 listen to 听，look at 看，wait for 等待，agree with 同意某人，apologize to someone for something 为某事向某人道歉。介词后若接动作，通常用动词-ing。",
      "examples": [
        {
          "en": "I apologized to the volunteer for arriving late.",
          "zh": "我因迟到向志愿者道歉。"
        },
        {
          "en": "We agreed with her plan and waited for the parts.",
          "zh": "我们赞同她的计划，并等待零件。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "unload",
        "meaning": "v. 卸下货物",
        "example": "The volunteers helped unload boxes from the van.",
        "exampleZh": "志愿者们帮忙把箱子从小货车上卸下来。"
      },
      {
        "word": "wooden",
        "meaning": "adj. 木制的",
        "example": "The tools were arranged on a wooden shelf.",
        "exampleZh": "工具摆在一个木架上。"
      },
      {
        "word": "extremely",
        "meaning": "adv. 极其；非常",
        "example": "The shop was extremely busy after school.",
        "exampleZh": "放学后店里非常忙。"
      },
      {
        "word": "occur",
        "meaning": "v. 发生；出现",
        "example": "The same error occurs whenever I open this file.",
        "exampleZh": "每次我打开这个文件都会出现同一个错误。"
      },
      {
        "word": "astonish",
        "meaning": "v. 使惊讶",
        "example": "The tiny size of the engine astonished us.",
        "exampleZh": "发动机小巧的体积让我们惊讶。"
      },
      {
        "word": "pile",
        "meaning": "n. 一堆",
        "example": "Please put the clean cloths in a separate pile.",
        "exampleZh": "请把干净的抹布另放成一堆。"
      },
      {
        "word": "woollen",
        "meaning": "adj. 羊毛制的；毛线的",
        "example": "She wore woollen gloves on the cold morning.",
        "exampleZh": "那个寒冷的早晨，她戴着羊毛手套。"
      },
      {
        "word": "goods",
        "meaning": "n. 商品；货物（复数）",
        "example": "The shop sells sports goods and simple repair tools.",
        "exampleZh": "这家店出售运动用品和简单的维修工具。"
      },
      {
        "word": "discover",
        "meaning": "v. 发现",
        "example": "We discovered a loose screw under the seat.",
        "exampleZh": "我们发现座椅下有颗松动的螺丝。"
      },
      {
        "word": "admit",
        "meaning": "v. 承认",
        "example": "I admitted that I had not read the instructions.",
        "exampleZh": "我承认自己没有读说明书。"
      },
      {
        "word": "confine",
        "meaning": "v. 限制；使局限于",
        "example": "Please confine the paint to the marked area.",
        "exampleZh": "请只在标出的区域内涂漆。"
      },
      {
        "word": "normal",
        "meaning": "adj. 正常的；通常的",
        "example": "The bicycle felt normal again after the repair.",
        "exampleZh": "修理后，这辆自行车骑起来又正常了。"
      }
    ],
    "passage": {
      "en": "I took my bicycle to the community repair desk because the front wheel made a strange noise. A volunteer listened to my explanation and looked at the wheel. I apologized for bringing a muddy bicycle, but she said it was no problem. While we waited for a spare part, she showed me how to check the brakes. I agreed with her advice to test them before every ride, then thanked her for helping me.",
      "zh": "前轮发出奇怪声响，我把自行车推到了社区维修点。一位志愿者听我说明后检查了车轮。我为把车弄得满是泥而道歉，她说没关系。等备用零件的时候，她教我怎样检查刹车。她建议每次骑车前都先测试刹车，我表示赞同，然后感谢她的帮助。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "选择固定搭配：Please listen ___ the full explanation.",
        "options": [
          "at",
          "for",
          "to"
        ],
        "answers": [
          "to"
        ],
        "explanation": "listen to 表示认真听。"
      },
      {
        "type": "choice",
        "prompt": "选择正确形式：I thanked her for ___ me.",
        "options": [
          "to help",
          "helping",
          "help"
        ],
        "answers": [
          "helping"
        ],
        "explanation": "for 是介词，后面接动名词 helping。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：I must ___ that I forgot to check the brakes.",
        "options": [
          "admit",
          "unload",
          "confine"
        ],
        "answers": [
          "admit"
        ],
        "explanation": "admit that... 表示承认某件事。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：等零件时志愿者教了什么？",
        "options": [
          "How to paint a wooden shelf.",
          "How to unload a van.",
          "How to check the brakes."
        ],
        "answers": [
          "How to check the brakes."
        ],
        "explanation": "她示范了检查自行车刹车的方法。"
      },
      {
        "type": "text",
        "prompt": "用 apologized、to、for 写完整句子，意思是“我为这个错误向她道歉”：I / her / the mistake。 请以 I apologized to her 开头。",
        "answers": [
          "I apologized to her for the mistake.",
          "I apologised to her for the mistake."
        ],
        "explanation": "apologize to someone for something 是完整搭配；英式拼法 apologise 也正确。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“我们在外面等零件”。 以 We 开头，把 outside 放在句末。",
        "tokens": [
          "We",
          "waited",
          "for",
          "the",
          "parts",
          "outside."
        ],
        "answers": [
          "We waited for the parts outside."
        ],
        "explanation": "wait for 后接所等待的人或物。"
      }
    ],
    "sourcePages": [
      209,
      210
    ]
  },
  {
    "sourceLesson": 47,
    "title": "社团报名页上线前",
    "scene": "校园网页小组",
    "goal": "综合使用过去完成时、间接引语和假设条件。",
    "grammar": {
      "title": "综合复习：时间、转述与假设",
      "explanation": "复习时先理清意思：过去某时之前已完成用 had done；转述问题用 asked if/whether 或 asked + 疑问词，并保持陈述语序；假想现在的另一种情况用 if + 过去时，would + 原形。计划、完成、义务和被动表达要与上下文一致。",
      "examples": [
        {
          "en": "We had tested the form before the club meeting began.",
          "zh": "社团会议开始前，我们已经测试过表单。"
        },
        {
          "en": "She asked whether the page could be read on a phone.",
          "zh": "她问能否在手机上阅读这个页面。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "thirsty",
        "meaning": "adj. 口渴的；特定较旧或文学语境中也指贪杯的、爱喝酒的",
        "example": "The biography describes the adult writer as a thirsty man who later regretted his drinking.",
        "exampleZh": "这部传记把那位成年作家写成爱喝酒的人，他后来为自己的饮酒行为后悔。"
      },
      {
        "word": "ghost",
        "meaning": "n. 鬼；幽灵（故事中的形象）",
        "example": "Our drama group made a friendly ghost costume.",
        "exampleZh": "戏剧小组做了一套友善幽灵的戏服。"
      },
      {
        "word": "haunt",
        "meaning": "v. 据说经常在……出没；萦绕",
        "example": "In the class play, a ghost haunts an empty theatre.",
        "exampleZh": "在班级短剧中，一个幽灵常在空剧院出没。"
      },
      {
        "word": "block",
        "meaning": "v. 阻塞；挡住",
        "example": "Please do not block the entrance with your bag.",
        "exampleZh": "请不要用包挡住入口。"
      },
      {
        "word": "furniture",
        "meaning": "n. 家具（不可数）",
        "example": "We moved the furniture to make space for the rehearsal.",
        "exampleZh": "我们搬动家具，给排练腾出空间。"
      },
      {
        "word": "whisky",
        "meaning": "n. 威士忌酒",
        "example": "The museum displayed an old bottle once used for whisky.",
        "exampleZh": "博物馆展出了一只曾用来装威士忌的旧酒瓶。"
      },
      {
        "word": "suggest",
        "meaning": "v. 暗示；表明；也可表示建议",
        "example": "The repeated errors suggest that the instructions are unclear.",
        "exampleZh": "反复出现的错误表明，说明可能不够清楚。"
      },
      {
        "word": "shake",
        "meaning": "v. 摇动；使震动",
        "example": "Please shake the paint bottle before opening it.",
        "exampleZh": "打开颜料瓶前请先摇一摇。"
      },
      {
        "word": "accept",
        "meaning": "v. 接受",
        "example": "The group accepted her suggestion about the title.",
        "exampleZh": "小组接受了她关于标题的建议。"
      }
    ],
    "passage": {
      "en": "Before our club registration page went online, we had tested it on three phones. One student asked whether the letters could be made larger. Another said that a picture blocked the final button on his screen. We accepted both comments and changed the design. If we had more time, we would add a short video, but the simple page is enough for now. By tomorrow evening, we will have checked every link once more.",
      "zh": "社团报名页上线之前，我们已经在三部手机上测试过它。一位同学问能否把文字放大。另一位说，在他的屏幕上，一张图片挡住了最后一个按钮。我们接受了两条意见，并修改了设计。如果时间再充裕些，我们会加入一个短视频，但目前这个简洁的页面已经够用。到明晚，我们将把每个链接再检查一遍。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "选择表示“会议前已完成”的形式：Before the meeting began, we ___ the page.",
        "options": [
          "are testing",
          "had tested",
          "will test"
        ],
        "answers": [
          "had tested"
        ],
        "explanation": "在过去会议开始之前发生的动作，用过去完成时。"
      },
      {
        "type": "choice",
        "prompt": "选正确的假设结果：If we had a larger screen, we ___ the whole page.",
        "options": [
          "would show",
          "will showed",
          "would shown"
        ],
        "answers": [
          "would show"
        ],
        "explanation": "would 后接动词原形 show。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：A large image can ___ a small button.",
        "options": [
          "accept",
          "shake",
          "block"
        ],
        "answers": [
          "block"
        ],
        "explanation": "图片可能挡住按钮，使用 block。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：大家目前为什么没有添加视频？",
        "options": [
          "They have no registration page.",
          "They do not have enough time.",
          "Their club forbids all pictures."
        ],
        "answers": [
          "They do not have enough time."
        ],
        "explanation": "If we had more time... 表明当前时间不够；简洁页面暂时够用。"
      },
      {
        "type": "text",
        "prompt": "把 “Is the link working?” she asked. 改成 She asked whether 开头的间接引语，并用过去时 was。",
        "answers": [
          "She asked whether the link was working."
        ],
        "explanation": "间接疑问句用 the link was working 的陈述语序。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“这些链接必须被再次检查”。 以 The links 开头，把 again 放在句末。",
        "tokens": [
          "The",
          "links",
          "must",
          "be",
          "checked",
          "again."
        ],
        "answers": [
          "The links must be checked again."
        ],
        "explanation": "情态动词被动结构为 must be checked。"
      }
    ],
    "sourcePages": [
      213,
      214
    ]
  },
  {
    "sourceLesson": 48,
    "title": "活动物资如何交接",
    "scene": "学校活动准备",
    "goal": "复习易混搭配，并用连接词交代同时发生的事。",
    "grammar": {
      "title": "搭配与连接表达复习",
      "explanation": "tell 通常接说话对象，tell someone something；say 的对象要用 to 引出。make 常与 decision、plan 等组成搭配，do 常与 homework、work 等搭配。so + 形容词，such + 名词短语。meanwhile 连接同时发生的另一件事，通常与前句用句号或分号分开。",
      "examples": [
        {
          "en": "Please tell the helpers where to put the boxes.",
          "zh": "请告诉帮手们把箱子放在哪里。"
        },
        {
          "en": "It was such a useful list that we kept a copy.",
          "zh": "这份清单很有用，所以我们留了一份副本。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "pull",
        "meaning": "v. 拉；拖",
        "example": "Pull the drawer gently so that the labels stay in place.",
        "exampleZh": "轻轻拉开抽屉，以免标签移位。"
      },
      {
        "word": "cotton wool",
        "meaning": "n. 药棉；脱脂棉（英式英语，不可数）",
        "example": "The school nurse keeps cotton wool in a clean box.",
        "exampleZh": "校医把药棉放在一个干净盒子里。"
      },
      {
        "word": "collect",
        "meaning": "v. 收集；领取",
        "example": "Please collect your name badge before entering the hall.",
        "exampleZh": "进入礼堂前请领取姓名牌。"
      },
      {
        "word": "collection",
        "meaning": "n. 收藏品；收集起来的一组物品",
        "example": "Our class has a small collection of local postcards.",
        "exampleZh": "我们班有一小套本地明信片收藏。"
      },
      {
        "word": "nod",
        "meaning": "v. 点头",
        "example": "She nodded to show that she understood the instructions.",
        "exampleZh": "她点了点头，表示听懂了说明。"
      },
      {
        "word": "meanwhile",
        "meaning": "adv. 与此同时",
        "example": "I checked the list; meanwhile, Rui counted the chairs.",
        "exampleZh": "我核对清单，与此同时，瑞数了椅子。"
      }
    ],
    "passage": {
      "en": "We were preparing supplies for the school activity day. I told the helpers to collect their badges first, then showed them a list of boxes. The first-aid box had already been checked by the school nurse. Meanwhile, another group was putting signs on the doors. One helper nodded but picked up the wrong box, so I made the labels larger. It was such a small change, yet it made the handover much clearer.",
      "zh": "我们正在为学校活动日准备物资。我告诉帮手们先领姓名牌，再给他们看箱子清单。急救箱已经由校医检查过。与此同时，另一组正在门上张贴标识。一位帮手虽然点了头，却拿错了箱子，于是我把标签做大了。改动很小，却让交接清楚了许多。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "选择正确搭配：Please ___ me when the helpers arrive.",
        "options": [
          "tell",
          "say",
          "speak"
        ],
        "answers": [
          "tell"
        ],
        "explanation": "tell 后可直接接人 me；say 不能这样直接接说话对象。"
      },
      {
        "type": "choice",
        "prompt": "选择正确表达：It was ___ useful checklist that everyone wanted a copy.",
        "options": [
          "so a",
          "such",
          "such a"
        ],
        "answers": [
          "such a"
        ],
        "explanation": "useful checklist 是可数单数名词短语，使用 such a。"
      },
      {
        "type": "choice",
        "prompt": "两件事同时进行，选择连接词：I counted the badges. ___, Lin checked the boxes.",
        "options": [
          "Finally",
          "Meanwhile",
          "Afterwards"
        ],
        "answers": [
          "Meanwhile"
        ],
        "explanation": "meanwhile 表示与此同时，与题目强调的同时进行一致。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：叙述者为什么放大标签？",
        "options": [
          "A helper had picked up the wrong box.",
          "The nurse asked for larger chairs.",
          "The signs had fallen off the doors."
        ],
        "answers": [
          "A helper had picked up the wrong box."
        ],
        "explanation": "帮手拿错箱子后，叙述者把标签做大以便辨认。"
      },
      {
        "type": "text",
        "prompt": "按 We + made... 写完整句子，使用 a plan、before lunch，表示“我们午饭前做了计划”。",
        "answers": [
          "We made a plan before lunch."
        ],
        "explanation": "制定计划用 make a plan；此处一般过去时为 made。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“请先领取你的姓名牌”。 以 Please 开头，把 first 放在句末。",
        "tokens": [
          "Please",
          "collect",
          "your",
          "name",
          "badge",
          "first."
        ],
        "answers": [
          "Please collect your name badge first."
        ],
        "explanation": "祈使句使用动词原形 collect，first 表示先做这一步。"
      }
    ],
    "sourcePages": [
      217
    ]
  },
  {
    "sourceLesson": 49,
    "title": "说明书里漏掉的一步",
    "scene": "社区阅读角组装家具",
    "goal": "用时间、原因、让步、目的和定语从句连接事件。",
    "grammar": {
      "title": "复合句：理清不同关系",
      "explanation": "when/after 引导时间，because 说明原因，although 表示让步，so that 常引出目的。who/which/that 引导定语从句修饰人或物。英语通常不把 although 和 but、because 和 so 配对连接同一关系；一句中有从句不代表一定需要更多连词。",
      "examples": [
        {
          "en": "Although the diagram was small, we could read it.",
          "zh": "虽然图示很小，我们还是看得清。"
        },
        {
          "en": "We labelled the screws so that nobody would mix them up.",
          "zh": "我们给螺丝贴上标签，以免大家弄混。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "tired",
        "meaning": "adj. 厌烦的（be tired of + 名词/动词-ing）；也指疲倦的",
        "example": "I am tired of replacing the same broken clip.",
        "exampleZh": "我厌烦了反复更换同一个总是坏掉的夹子。"
      },
      {
        "word": "real",
        "meaning": "adj. 真实的；真正的",
        "example": "We tested the model before building the real shelf.",
        "exampleZh": "我们先测试模型，再制作真正的架子。"
      },
      {
        "word": "owner",
        "meaning": "n. 所有者；主人",
        "example": "The owner of the café lent us a trolley.",
        "exampleZh": "咖啡馆老板借给我们一辆手推车。"
      },
      {
        "word": "spring",
        "meaning": "n. 弹簧（如床垫内的弹簧）",
        "example": "A metal spring inside the old mattress had broken.",
        "exampleZh": "旧床垫里的一根金属弹簧断了。"
      },
      {
        "word": "mattress",
        "meaning": "n. 床垫",
        "example": "We put a clean cover over the mattress.",
        "exampleZh": "我们给床垫套上了干净的罩子。"
      },
      {
        "word": "gust",
        "meaning": "n. 一阵强风",
        "example": "A sudden gust blew the paper cups off the table.",
        "exampleZh": "一阵突如其来的强风把纸杯吹下了桌子。"
      },
      {
        "word": "sweep",
        "meaning": "v. 扫；扫过；卷走",
        "example": "Please sweep the floor after the workshop.",
        "exampleZh": "工作坊结束后请扫地。"
      },
      {
        "word": "courtyard",
        "meaning": "n. 庭院；院子",
        "example": "The reading room opens onto a quiet courtyard.",
        "exampleZh": "阅览室朝向一个安静的庭院。"
      },
      {
        "word": "smash",
        "meaning": "v. 打碎；猛烈碰撞",
        "example": "A falling shelf could smash the glass below it.",
        "exampleZh": "掉落的架子可能砸碎下方的玻璃。"
      },
      {
        "word": "miraculously",
        "meaning": "adv. 奇迹般地；出乎意料地幸运",
        "example": "My phone miraculously survived its fall down the stairs.",
        "exampleZh": "手机从楼梯上摔下去，竟奇迹般地没坏。"
      },
      {
        "word": "unhurt",
        "meaning": "adj. 未受伤的",
        "example": "The cyclist was shaken but unhurt after the fall.",
        "exampleZh": "骑车人摔倒后受了惊，但没有受伤。"
      },
      {
        "word": "glance",
        "meaning": "v. 匆匆一看；瞥",
        "example": "Please glance at the checklist before you leave.",
        "exampleZh": "离开前请看一眼核对清单。"
      },
      {
        "word": "promptly",
        "meaning": "adv. 迅速地；及时地",
        "example": "The volunteer promptly answered our question.",
        "exampleZh": "志愿者及时回答了我们的问题。"
      }
    ],
    "passage": {
      "en": "We helped build a shelf for the community reading corner. Although the instructions looked simple, the shelf leaned to one side when we stood it up. The volunteer who supervised us asked everyone to stop. After we checked the diagram again, we discovered that a support bar was missing. We fitted it carefully so that the shelf would stand securely. Nobody put books on it until the volunteer had checked every screw. The delay was frustrating, but it prevented a much bigger problem.",
      "zh": "我们帮社区阅读角组装了一个书架。虽然说明书看起来简单，但把书架立起来时，它向一侧倾斜。负责指导我们的志愿者让所有人停下。再次查看图示后，我们发现少装了一根支撑条。我们仔细装好，让书架能站稳。在志愿者检查完每颗螺丝之前，没有人往上放书。这次耽搁令人沮丧，却避免了更大的问题。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "选择让步关系：___ we were tired, we checked the shelf again.",
        "options": [
          "Because of",
          "Despite",
          "Although"
        ],
        "answers": [
          "Although"
        ],
        "explanation": "Although 后接完整从句。Because of 和 Despite 后通常不能直接接这种完整从句。"
      },
      {
        "type": "choice",
        "prompt": "选择修饰人的关系词：The volunteer ___ helped us checked every screw.",
        "options": [
          "what",
          "who",
          "where"
        ],
        "answers": [
          "who"
        ],
        "explanation": "who 引导定语从句，修饰 The volunteer。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：The mattress felt uneven because a ___ inside it had broken.",
        "options": [
          "spring",
          "gust",
          "courtyard"
        ],
        "answers": [
          "spring"
        ],
        "explanation": "床垫内部的弹簧是 spring。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：书架倾斜的原因是什么？",
        "options": [
          "Too many books had been added.",
          "The courtyard was too small.",
          "A support bar was missing."
        ],
        "answers": [
          "A support bar was missing."
        ],
        "explanation": "再次检查图示后，大家发现少装了支撑条。"
      },
      {
        "type": "text",
        "prompt": "用 although 把两句合成一句，固定以 Although 开头：The task was difficult. We finished it.",
        "answers": [
          "Although the task was difficult, we finished it."
        ],
        "explanation": "although 从句后接主句，不再添加 but。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“我们核对了清单，以免漏掉任何东西”；以 We 开头。",
        "tokens": [
          "We",
          "checked",
          "the",
          "list",
          "so",
          "that",
          "we",
          "would",
          "miss",
          "nothing."
        ],
        "answers": [
          "We checked the list so that we would miss nothing."
        ],
        "explanation": "so that 引导目的从句，说明核对清单的目的。"
      }
    ],
    "sourcePages": [
      235,
      236
    ]
  },
  {
    "sourceLesson": 50,
    "title": "这周的乘车安排",
    "scene": "周末参观与公交出行",
    "goal": "区分日常规律、正在发生的动作与状态动词。",
    "grammar": {
      "title": "一般现在时与现在进行时",
      "explanation": "一般现在时说明习惯、事实和时刻表；现在进行时说明此刻或这一阶段的活动，也可表示已经安排的未来。know、believe、understand、own 等状态动词通常不用进行时。think 表示认为时多用一般现在时，表示正在考虑时可用进行时。",
      "examples": [
        {
          "en": "The bus leaves at nine every Saturday.",
          "zh": "这班公交车每周六九点发车。"
        },
        {
          "en": "I am thinking about a different route today.",
          "zh": "我今天正在考虑另一条路线。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "ride",
        "meaning": "n. 乘车；骑行的一段行程",
        "example": "The bus ride to the science centre takes twenty minutes.",
        "exampleZh": "乘公交车到科学中心要二十分钟。"
      },
      {
        "word": "excursion",
        "meaning": "n. 短途旅行；远足（较正式）",
        "example": "Our class is planning an excursion to a nearby farm.",
        "exampleZh": "我们班正在计划去附近农场短途参观。"
      },
      {
        "word": "conductor",
        "meaning": "n. 售票员；乘务员（部分公共交通中使用）",
        "example": "The conductor on the heritage tram checked our tickets.",
        "exampleZh": "复古电车上的乘务员检查了我们的车票。"
      },
      {
        "word": "view",
        "meaning": "n. 景色；视野",
        "example": "There is a clear view of the river from this window.",
        "exampleZh": "从这扇窗可以清楚地看到河景。"
      }
    ],
    "passage": {
      "en": "I usually cycle to the library, but this week I am taking the bus because my bicycle is being repaired. The route passes a museum that I want to visit. On Saturday, my cousin and I are meeting at the main stop for a short excursion. The bus leaves at nine, so we plan to arrive ten minutes early. My cousin knows the route well. I am thinking about bringing a notebook because the museum has a design exhibition.",
      "zh": "我通常骑车去图书馆，但这周自行车正在修，所以我改乘公交车。线路经过一家我想参观的博物馆。周六，我和表亲约好在主要站点见面，来一次短途出游。公交车九点发车，所以我们计划提前十分钟到。表亲很熟悉这条路线。我正在考虑带上笔记本，因为博物馆里有个设计展。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "强调通常习惯：I usually ___ to the library.",
        "options": [
          "cycled yesterday",
          "cycle",
          "am cycling"
        ],
        "answers": [
          "cycle"
        ],
        "explanation": "usually 引出习惯，一般现在时 cycle 符合语境。"
      },
      {
        "type": "choice",
        "prompt": "选择状态动词的自然表达：My cousin ___ this route well.",
        "options": [
          "knows",
          "is knowing",
          "know"
        ],
        "answers": [
          "knows"
        ],
        "explanation": "know 表示知道的状态，通常不用进行时；单数主语配 knows。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：We enjoyed a wonderful ___ of the river from the bridge.",
        "options": [
          "conductor",
          "ride",
          "view"
        ],
        "answers": [
          "view"
        ],
        "explanation": "a view of the river 表示河流的景色。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：叙述者这周为什么乘公交车？",
        "options": [
          "The cousin has lost the tickets.",
          "The bicycle is being repaired.",
          "The library has moved."
        ],
        "answers": [
          "The bicycle is being repaired."
        ],
        "explanation": "短文开头明确说明自行车正在维修。"
      },
      {
        "type": "text",
        "prompt": "用现在进行时翻译，主语 I，使用 take the bus、this week：这周我在乘公交车。 以 I 开头，把 this week 放在句末。",
        "answers": [
          "I am taking the bus this week.",
          "I’m taking the bus this week.",
          "I'm taking the bus this week."
        ],
        "explanation": "this week 强调这一阶段的临时安排，可用 am taking。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“她相信这个计划可行”；以 She 开头。",
        "tokens": [
          "She",
          "believes",
          "the",
          "plan",
          "will",
          "work."
        ],
        "answers": [
          "She believes the plan will work."
        ],
        "explanation": "believe 是状态动词，此处用一般现在时 believes。"
      }
    ],
    "sourcePages": [
      239,
      240
    ]
  },
  {
    "sourceLesson": 51,
    "title": "失物招领的小改进",
    "scene": "班级服务工作回顾",
    "goal": "用一般过去时描述完成的事件，并切换主动和被动。",
    "grammar": {
      "title": "一般过去时：主动与被动",
      "explanation": "已结束的过去事件用动词过去式；疑问句和否定句中的 did/did not 后用动词原形。一般过去时被动用 was/were + 过去分词。强调谁做了某事用主动，强调物品受到怎样的处理可用被动。",
      "examples": [
        {
          "en": "We sorted the lost items yesterday.",
          "zh": "我们昨天给失物分类了。"
        },
        {
          "en": "Each item was photographed before it was stored.",
          "zh": "每件物品收存前都拍了照。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "reward",
        "meaning": "n./v. 奖励；报答",
        "example": "The club rewarded careful work with a small certificate.",
        "exampleZh": "社团用一张小证书奖励认真的工作。"
      },
      {
        "word": "virtue",
        "meaning": "n. 美德；优点",
        "example": "Patience is a useful virtue when you teach a younger child.",
        "exampleZh": "教年幼的孩子时，耐心是一种很有用的美德。"
      },
      {
        "word": "diet",
        "meaning": "n. 日常饮食；按特定要求安排或限制的饮食；be/go on a diet 表示正在/开始采用这样的饮食安排",
        "example": "The patient was on a special diet recommended by her doctor.",
        "exampleZh": "那位病人正在按医生建议采用特殊的饮食安排。"
      },
      {
        "word": "forbid",
        "meaning": "v. 禁止",
        "example": "The lab rules forbid eating near the equipment.",
        "exampleZh": "实验室规定禁止在设备附近吃东西。"
      },
      {
        "word": "hurriedly",
        "meaning": "adv. 匆忙地",
        "example": "He hurriedly wrote his name before the form was collected.",
        "exampleZh": "表格收走前，他匆忙写下了自己的名字。"
      },
      {
        "word": "embarrass",
        "meaning": "v. 使尴尬；使难为情",
        "example": "Correcting a classmate loudly may embarrass them.",
        "exampleZh": "大声纠正同学可能会让对方难堪。"
      },
      {
        "word": "guiltily",
        "meaning": "adv. 内疚地；心虚地",
        "example": "I looked guiltily at the book I had forgotten to return.",
        "exampleZh": "我内疚地看着那本忘记归还的书。"
      },
      {
        "word": "strict",
        "meaning": "adj. 严格的",
        "example": "Our coach is strict about arriving on time.",
        "exampleZh": "教练对准时到场要求严格。"
      },
      {
        "word": "occasionally",
        "meaning": "adv. 偶尔；有时",
        "example": "We occasionally use the playground for outdoor lessons.",
        "exampleZh": "我们偶尔在操场上上户外课。"
      }
    ],
    "passage": {
      "en": "Last Friday, our class improved the lost-property system. We took clear photographs of the items and wrote the date beside each one. Personal details were kept off the public noticeboard. A student who had lost a water bottle recognised it immediately and thanked us. We did not give items to people without checking a description first. At the end of the day, our teacher rewarded the group with a certificate. The new system saved time and protected everyone’s privacy.",
      "zh": "上周五，我们班改进了失物招领制度。我们为物品拍了清晰照片，并在每件旁边写上日期。公开公告栏上没有展示个人资料。一位丢了水瓶的同学立刻认出了自己的水瓶，并向我们道谢。我们会先核对对方的描述，才把物品交出。当天结束时，老师用一张证书奖励了小组。新制度节省了时间，也保护了大家的隐私。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "选择一般过去时被动：The items ___ yesterday.",
        "options": [
          "were photographed",
          "are photograph",
          "was photographed"
        ],
        "answers": [
          "were photographed"
        ],
        "explanation": "items 是复数；过去时被动用 were photographed。"
      },
      {
        "type": "choice",
        "prompt": "选择正确否定：We did not ___ private details online.",
        "options": [
          "posted",
          "posting",
          "post"
        ],
        "answers": [
          "post"
        ],
        "explanation": "did not 后接动词原形 post。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：The club gave us a certificate as a ___ for our careful work.",
        "options": [
          "virtue",
          "reward",
          "diet"
        ],
        "answers": [
          "reward"
        ],
        "explanation": "certificate 是对认真工作的奖励，即 reward。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：发还物品前，小组会做什么？",
        "options": [
          "Check the person’s description.",
          "Publish the person’s address.",
          "Ask the teacher to buy a replacement."
        ],
        "answers": [
          "Check the person’s description."
        ],
        "explanation": "短文说会先核对失主对物品的描述。"
      },
      {
        "type": "text",
        "prompt": "把 They stored the bags yesterday. 改为以 The bags 开头的过去时被动句，保留 yesterday 在句末。 省略动作发出者，不写 by them。",
        "answers": [
          "The bags were stored yesterday."
        ],
        "explanation": "复数 bags 对应 were stored。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“我们没有公开那些姓名”；以 We 开头。",
        "tokens": [
          "We",
          "did",
          "not",
          "publish",
          "the",
          "names."
        ],
        "answers": [
          "We did not publish the names."
        ],
        "explanation": "did not 后用动词原形 publish。"
      }
    ],
    "sourcePages": [
      243,
      244
    ]
  },
  {
    "sourceLesson": 52,
    "title": "海报改了多久",
    "scene": "小组作业进度汇报",
    "goal": "比较已经完成的数量和持续进行的过程。",
    "grammar": {
      "title": "现在完成时与现在完成进行时",
      "explanation": "have/has + 过去分词常强调完成结果、次数或数量；have/has been + 动词-ing 强调从过去延续到现在的过程或持续时间，也可解释眼前痕迹。for 接一段时间，since 接起点。状态动词通常用完成时，例如 have known，不常说 have been knowing。",
      "examples": [
        {
          "en": "We have made three versions of the poster.",
          "zh": "我们已经做了三个版本的海报。"
        },
        {
          "en": "We have been discussing the layout for an hour.",
          "zh": "我们已经讨论版面一小时了。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "temporarily",
        "meaning": "adv. 暂时地",
        "example": "The reading room is temporarily closed for repairs.",
        "exampleZh": "阅览室因维修暂时关闭。"
      },
      {
        "word": "inch",
        "meaning": "n. 英寸（长度单位，约2.54厘米）",
        "example": "Move the picture an inch to the left.",
        "exampleZh": "把图片向左移一英寸。"
      },
      {
        "word": "space",
        "meaning": "n. 空间；空处",
        "example": "Leave some space between the title and the photograph.",
        "exampleZh": "标题和照片之间留些空白。"
      },
      {
        "word": "actually",
        "meaning": "adv. 实际上；事实上",
        "example": "The smaller design is actually easier to read.",
        "exampleZh": "实际上，较小的设计更容易阅读。"
      }
    ],
    "passage": {
      "en": "We have been working on our history poster since Monday. So far, we have written four short sections and chosen six photographs. The title has changed three times because it kept covering the main picture. Today, we are temporarily using a plain background while we compare colours. Our teacher says that empty space can make a page easier to read. We have been moving the pictures around for half an hour, but we have finally agreed on a clear layout.",
      "zh": "从周一开始，我们一直在做历史海报。到目前为止，我们写好了四个短段落，选了六张照片。标题已经改了三次，因为它总挡住主图。今天我们比较颜色时，暂时使用纯色背景。老师说，留白可以使页面更容易阅读。我们已经移动图片、调整位置半小时了，但终于就一个清晰的版面达成了一致。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "强调完成数量：We ___ four sections so far.",
        "options": [
          "have been wrote",
          "has written",
          "have written"
        ],
        "answers": [
          "have written"
        ],
        "explanation": "four sections 强调已完成的数量，主语 We 配 have written。"
      },
      {
        "type": "choice",
        "prompt": "强调持续过程：She ___ on the design for two hours and is still working.",
        "options": [
          "have worked",
          "has been working",
          "has been worked"
        ],
        "answers": [
          "has been working"
        ],
        "explanation": "has been working 强调持续两小时且仍在进行的过程。"
      },
      {
        "type": "choice",
        "prompt": "“The desk is temporarily closed”说明什么？",
        "options": [
          "服务台暂时关闭",
          "服务台永久关闭",
          "服务台刚刚扩大"
        ],
        "answers": [
          "服务台暂时关闭"
        ],
        "explanation": "temporarily 表示暂时，不是永久。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：标题为什么改了三次？",
        "options": [
          "The teacher disliked history.",
          "The group had no photographs.",
          "It kept covering the main picture."
        ],
        "answers": [
          "It kept covering the main picture."
        ],
        "explanation": "标题反复挡住主图，所以需要修改。"
      },
      {
        "type": "text",
        "prompt": "用现在完成进行时写句子，将 for an hour 放句末：We / discuss the layout / for an hour。 以 We 开头。",
        "answers": [
          "We have been discussing the layout for an hour."
        ],
        "explanation": "持续过程用 have been discussing，for 后接时长。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“我们已经选了六张照片”；以 We 开头。",
        "tokens": [
          "We",
          "have",
          "chosen",
          "six",
          "photographs."
        ],
        "answers": [
          "We have chosen six photographs."
        ],
        "explanation": "have chosen 表示选照片的结果已经完成。"
      }
    ],
    "sourcePages": [
      247,
      248
    ]
  },
  {
    "sourceLesson": 53,
    "title": "故障记录要写具体",
    "scene": "校园设备安全记录",
    "goal": "区分具体过去时间的事件、当前结果和持续排查。",
    "grammar": {
      "title": "过去时与两种现在完成形式",
      "explanation": "一般过去时用于明确结束的过去时间，如 yesterday、at nine。现在完成时用于到目前为止的结果，通常不和这些已结束的时间状语直接连用。现在完成进行时强调持续排查或调查的过程。记录故障时可依次说明何时发生、目前完成了什么、还在做什么。",
      "examples": [
        {
          "en": "The projector stopped at ten this morning.",
          "zh": "投影仪今天上午十点停止工作。"
        },
        {
          "en": "The technician has been checking it for twenty minutes.",
          "zh": "技术人员已经检查它二十分钟了。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "hot",
        "meaning": "adj. 带电的；通电的（此处不是温度高）",
        "example": "The warning says the wire may still be hot.",
        "exampleZh": "警示说明这根电线可能仍然带电。"
      },
      {
        "word": "fireman",
        "meaning": "n. 消防员（传统称呼，现代常用 firefighter）",
        "example": "A fireman visited our class to discuss fire safety.",
        "exampleZh": "一位消防员来班里讲解消防安全。"
      },
      {
        "word": "cause",
        "meaning": "n./v. 原因；引起",
        "example": "The technician has not found the cause of the noise.",
        "exampleZh": "技术人员还没找到噪音的原因。"
      },
      {
        "word": "examine",
        "meaning": "v. 检查；仔细查看",
        "example": "A trained technician will examine the damaged socket.",
        "exampleZh": "受过培训的技术人员会检查损坏的插座。"
      },
      {
        "word": "accidentally",
        "meaning": "adv. 意外地；无意中",
        "example": "I accidentally closed the form before saving it.",
        "exampleZh": "我不小心在保存前关掉了表单。"
      },
      {
        "word": "remains",
        "meaning": "n. 残余物；遗骸（复数形式）",
        "example": "The remains of the broken model were collected in a box.",
        "exampleZh": "破损模型的残片被收进了盒子里。"
      },
      {
        "word": "wire",
        "meaning": "n. 电线；金属丝",
        "example": "Do not touch a wire with damaged covering.",
        "exampleZh": "不要触碰绝缘外层损坏的电线。"
      },
      {
        "word": "volt",
        "meaning": "n. 伏特（电压单位）",
        "example": "The science diagram labels the battery as nine volts.",
        "exampleZh": "科学示意图把电池标为九伏。"
      },
      {
        "word": "power line",
        "meaning": "n. 输电线；电力线路",
        "example": "The safety poster tells us to stay away from fallen power lines.",
        "exampleZh": "安全海报告诉我们要远离掉落的电线。"
      },
      {
        "word": "solve",
        "meaning": "v. 解决；解开",
        "example": "We solved the timetable problem by changing rooms.",
        "exampleZh": "我们通过更换教室解决了时间安排问题。"
      },
      {
        "word": "mystery",
        "meaning": "n. 谜；难以解释的事",
        "example": "The missing page remained a mystery until we checked the printer.",
        "exampleZh": "我们检查打印机之前，丢失的那页一直是个谜。"
      },
      {
        "word": "snatch",
        "meaning": "v. 一把抓起；夺取",
        "example": "The actor snatched the pretend letter from the desk.",
        "exampleZh": "演员一把抓起了桌上的道具信。"
      },
      {
        "word": "spark",
        "meaning": "n. 火花",
        "example": "The damaged cable produced a spark, so everyone moved away.",
        "exampleZh": "损坏的电缆冒出火花，于是大家都退开了。"
      }
    ],
    "passage": {
      "en": "During science club yesterday, the projector suddenly went dark. We stopped the activity and told the teacher instead of touching the cables. A technician has examined the equipment, but she has not yet identified the cause. She has been checking the fault report for twenty minutes. Our group has written down exactly what happened before the screen failed. This record may help her solve the problem. Until the equipment is cleared for use, we are presenting our diagrams on paper.",
      "zh": "昨天科学社活动时，投影仪突然黑屏。我们停止活动并告诉老师，没有去碰电缆。技术人员已经检查过设备，但还没确定原因。她已经查看故障报告二十分钟。我们小组准确记录了屏幕失灵前发生的事。这份记录或许能帮助她解决问题。在设备被确认可以使用之前，我们先用纸张展示图示。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "与 yesterday 搭配，选择正确形式：The screen ___ yesterday.",
        "options": [
          "has been failing for",
          "failed",
          "has failed"
        ],
        "answers": [
          "failed"
        ],
        "explanation": "yesterday 是已结束的过去时间，这里用一般过去时 failed。"
      },
      {
        "type": "choice",
        "prompt": "强调持续排查：The technician ___ the report for twenty minutes and is still reading it.",
        "options": [
          "has been checking",
          "has been checked",
          "was checked"
        ],
        "answers": [
          "has been checking"
        ],
        "explanation": "主动持续动作使用 has been checking。"
      },
      {
        "type": "choice",
        "prompt": "电气安全警示中的“hot wire”指什么？",
        "options": [
          "颜色鲜艳的电线",
          "价格昂贵的电线",
          "可能带电的电线"
        ],
        "answers": [
          "可能带电的电线"
        ],
        "explanation": "hot 在这个特定语境中表示带电，不能理解为仅仅温度高。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：设备未获准使用之前，小组如何展示图示？",
        "options": [
          "Through a new power line.",
          "On paper.",
          "On the damaged projector."
        ],
        "answers": [
          "On paper."
        ],
        "explanation": "最后一句说明大家暂时用纸张展示。"
      },
      {
        "type": "text",
        "prompt": "用现在完成时写完整句子，yet 放句末：The technician / not find / the cause / yet。",
        "answers": [
          "The technician has not found the cause yet.",
          "The technician hasn’t found the cause yet.",
          "The technician hasn't found the cause yet."
        ],
        "explanation": "has not found 表示到现在尚未查明原因。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“我们昨天报告了这个问题”；以 We 开头，yesterday 放句末。",
        "tokens": [
          "We",
          "reported",
          "the",
          "problem",
          "yesterday."
        ],
        "answers": [
          "We reported the problem yesterday."
        ],
        "explanation": "明确过去时间 yesterday 与过去式 reported 搭配。"
      }
    ],
    "sourcePages": [
      251,
      252
    ]
  },
  {
    "sourceLesson": 54,
    "title": "报名桌前别拥挤",
    "scene": "校园烘焙社报名",
    "goal": "根据特指、泛指、数量和可数性选择限定词。",
    "grammar": {
      "title": "冠词与 some、any",
      "explanation": "a/an 用于首次提到或非特指的可数单数名词，an 看发音而不是字母。the 常用于已经明确或特指的对象。some 常用于肯定句，也可用于期待肯定回答的请求；any 常用于否定句和一般疑问句。不可数名词不直接加 a/an，如 some pastry、some information。",
      "examples": [
        {
          "en": "I found a pen and put the pen beside the register.",
          "zh": "我找到一支笔，把它放在登记簿旁。"
        },
        {
          "en": "Could I have some information about the club?",
          "zh": "能给我一些关于这个社团的信息吗？"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "sticky",
        "meaning": "adj. 黏的；黏糊糊的",
        "example": "The label left a sticky mark on the box.",
        "exampleZh": "标签在盒子上留下了一块黏痕。"
      },
      {
        "word": "finger",
        "meaning": "n. 手指",
        "example": "She raised one finger to ask for a moment.",
        "exampleZh": "她竖起一根手指，示意稍等。"
      },
      {
        "word": "pie",
        "meaning": "n. 馅饼；派",
        "example": "We shared a vegetable pie after the workshop.",
        "exampleZh": "工作坊后，我们分吃了一份蔬菜派。"
      },
      {
        "word": "mix",
        "meaning": "v. 混合；搅拌",
        "example": "Mix the colours on a separate piece of paper.",
        "exampleZh": "在另一张纸上调色。"
      },
      {
        "word": "pastry",
        "meaning": "n. 油酥面团；酥皮",
        "example": "The recipe says to keep the pastry cool.",
        "exampleZh": "食谱说要让酥皮面团保持凉爽。"
      },
      {
        "word": "annoying",
        "meaning": "adj. 令人烦恼的",
        "example": "The repeated error message was annoying.",
        "exampleZh": "反复出现的报错提示令人烦恼。"
      },
      {
        "word": "receiver",
        "meaning": "n. 电话听筒",
        "example": "The old desk phone has a heavy black receiver.",
        "exampleZh": "那台旧式座机有一个沉重的黑色听筒。"
      },
      {
        "word": "dismay",
        "meaning": "n. 沮丧；惊愕",
        "example": "To our dismay, the only printer had stopped working.",
        "exampleZh": "让我们沮丧的是，唯一的打印机停止工作了。"
      },
      {
        "word": "recognize",
        "meaning": "v. 认出；识别",
        "example": "I recognized my classmate’s handwriting on the sign.",
        "exampleZh": "我认出了标牌上同学的字迹。"
      },
      {
        "word": "persuade",
        "meaning": "v. 说服",
        "example": "We persuaded the group to use a clearer title.",
        "exampleZh": "我们说服小组采用了一个更清晰的标题。"
      },
      {
        "word": "mess",
        "meaning": "n. 杂乱；乱糟糟的状态",
        "example": "The desk was a mess after we made the posters.",
        "exampleZh": "制作海报后，桌子一片凌乱。"
      },
      {
        "word": "doorknob",
        "meaning": "n. 圆形门把手",
        "example": "The loose doorknob was reported to the caretaker.",
        "exampleZh": "松动的门把手已报告给管理员。"
      },
      {
        "word": "sign",
        "meaning": "v./n. 签名；标志；指示牌",
        "example": "Please sign the attendance sheet before you leave.",
        "exampleZh": "离开前请在签到表上签名。"
      },
      {
        "word": "register",
        "meaning": "n. 登记簿；记录册",
        "example": "The volunteer checked my name in the register.",
        "exampleZh": "志愿者在登记簿中核对了我的姓名。"
      }
    ],
    "passage": {
      "en": "The baking club set up a registration desk outside the hall. I placed a register and some pens on the table, then put a sign beside the door. At lunchtime, the pens disappeared quickly, but there were not any spare ones in the box. A volunteer suggested using an online form as well. We added a QR code to the sign, and the queue became shorter. Students who preferred paper could still sign the register, so everyone had a convenient way to join.",
      "zh": "烘焙社在礼堂外设置了报名桌。我把一本登记簿和一些笔放在桌上，又在门旁摆了块标牌。午饭时，笔很快被拿走了，盒子里却没有备用笔。一位志愿者建议同时使用线上表单。我们在标牌上加了一个二维码，队伍便缩短了。喜欢用纸笔的同学仍可以在登记簿上签名，因此每个人都有方便的报名方式。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "第一次提到表单，选择正确冠词：We created ___ online form.",
        "options": [
          "an",
          "a",
          "the two"
        ],
        "answers": [
          "an"
        ],
        "explanation": "online 以元音音素开头，可数单数 form 前用 an。"
      },
      {
        "type": "choice",
        "prompt": "选择适合不可数名词的表达：Could I have ___ information about the club?",
        "options": [
          "an",
          "a few",
          "some"
        ],
        "answers": [
          "some"
        ],
        "explanation": "information 不可数；礼貌请求中可用 some information。"
      },
      {
        "type": "choice",
        "prompt": "旧式电话上的 receiver 是什么？",
        "options": [
          "门把手",
          "听筒",
          "报名簿"
        ],
        "answers": [
          "听筒"
        ],
        "explanation": "receiver 在传统电话语境中指听筒。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：添加线上表单后，纸质报名怎样处理？",
        "options": [
          "Students could still use the register.",
          "All paper registration was banned.",
          "The register was sent to a museum."
        ],
        "answers": [
          "Students could still use the register."
        ],
        "explanation": "短文说偏好纸笔的同学仍可签登记簿。"
      },
      {
        "type": "text",
        "prompt": "用 there were not any 写完整句子，表达“盒子里没有备用笔”。请以 There 开头，地点用 in the box。",
        "answers": [
          "There were not any spare pens in the box.",
          "There weren’t any spare pens in the box.",
          "There weren't any spare pens in the box."
        ],
        "explanation": "否定句中使用 any，pens 为复数，搭配 were。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“我把一本登记簿放在桌上”；以 I 开头。 将 a register 紧接在 put 后，on the table 放在句末。",
        "tokens": [
          "I",
          "put",
          "a",
          "register",
          "on",
          "the",
          "table."
        ],
        "answers": [
          "I put a register on the table."
        ],
        "explanation": "首次提到一本登记簿用 a register；the table 是明确的桌子。"
      }
    ],
    "sourcePages": [
      255,
      256
    ]
  },
  {
    "sourceLesson": 55,
    "title": "听爷爷讲旧街道",
    "scene": "家庭口述历史项目",
    "goal": "用 used to 和 would 描述过去状态与反复发生的动作。",
    "grammar": {
      "title": "过去习惯与过去进行时",
      "explanation": "used to + 动词原形可描述过去的状态或习惯，常暗示现在不同。would + 动词原形可在明确的过去背景下描述反复动作，但一般不能替代过去状态的 used to，例如 used to own。过去进行时 was/were doing 描写当时正在进行的动作或背景。",
      "examples": [
        {
          "en": "My aunt used to own a small bookshop.",
          "zh": "我姨妈以前开过一家小书店。"
        },
        {
          "en": "Every Sunday, she would put new books in the window.",
          "zh": "过去每个星期天，她都会把新书摆到橱窗里。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "gold",
        "meaning": "n. 金；黄金",
        "example": "The museum label says the ring is made of gold.",
        "exampleZh": "博物馆的说明牌说戒指是金制的。"
      },
      {
        "word": "mine",
        "meaning": "n. 矿；矿山",
        "example": "Our geography project includes a map of an old coal mine.",
        "exampleZh": "我们的地理项目包含一座旧煤矿的地图。"
      },
      {
        "word": "treasure",
        "meaning": "n. 珍宝；宝藏",
        "example": "The family considered the handwritten letters a treasure.",
        "exampleZh": "家人把那些手写信视为珍宝。"
      },
      {
        "word": "revealer",
        "meaning": "n. 揭示者；揭示或探测事物的装置（较少见，常用于命名）",
        "example": "Our team nicknamed its detector the Hidden Object Revealer.",
        "exampleZh": "我们小组给探测器起了个外号，叫“隐藏物品探测器”。"
      },
      {
        "word": "invent",
        "meaning": "v. 发明",
        "example": "Our club hopes to invent a better bag clip.",
        "exampleZh": "我们社团希望发明一种更好用的包夹。"
      },
      {
        "word": "detect",
        "meaning": "v. 探测；发现",
        "example": "The classroom sensor can detect movement near the door.",
        "exampleZh": "教室的传感器能探测门旁的移动。"
      },
      {
        "word": "bury",
        "meaning": "v. 埋；埋藏",
        "example": "The gardening guide says not to bury the seeds too deeply.",
        "exampleZh": "园艺指南说不要把种子埋得太深。"
      },
      {
        "word": "cave",
        "meaning": "n. 洞穴；山洞",
        "example": "Visitors need a guide to enter the cave.",
        "exampleZh": "游客需要由向导带领才能进入洞穴。"
      },
      {
        "word": "seashore",
        "meaning": "n. 海岸；海滨",
        "example": "We drew shells during an art trip to the seashore.",
        "exampleZh": "去海边的美术写生活动中，我们画了贝壳。"
      },
      {
        "word": "pirate",
        "meaning": "n. 海盗",
        "example": "A student played a pirate in our short comedy.",
        "exampleZh": "一位同学在我们的短喜剧中扮演海盗。"
      },
      {
        "word": "arm",
        "meaning": "v. 武装；装备（常用 arm ... with ...）",
        "example": "We armed ourselves with notebooks before the interview.",
        "exampleZh": "采访前，我们备好了笔记本。"
      },
      {
        "word": "soil",
        "meaning": "n. 土壤",
        "example": "The school garden needs soil that drains well.",
        "exampleZh": "学校花园需要排水良好的土壤。"
      },
      {
        "word": "entrance",
        "meaning": "n. 入口",
        "example": "The new entrance has a wide ramp.",
        "exampleZh": "新入口有一条宽坡道。"
      },
      {
        "word": "finally",
        "meaning": "adv. 最后；终于",
        "example": "We finally found a quiet room for the interview.",
        "exampleZh": "我们终于找到了一个安静的房间做采访。"
      },
      {
        "word": "worthless",
        "meaning": "adj. 无价值的；没有用的",
        "example": "Without a date, this timetable is almost worthless.",
        "exampleZh": "这份时刻表没有日期，几乎没用。"
      },
      {
        "word": "thoroughly",
        "meaning": "adv. 彻底地；全面地",
        "example": "Please check the recording thoroughly before deleting any files.",
        "exampleZh": "删除任何文件前，请全面检查录音。"
      },
      {
        "word": "trunk",
        "meaning": "n. 大旅行箱；大衣箱（较旧式，非树干）",
        "example": "Grandma keeps old theatre costumes in a wooden trunk.",
        "exampleZh": "奶奶把旧戏服放在一个木制大衣箱里。"
      },
      {
        "word": "confident",
        "meaning": "adj. 有信心的；确信的",
        "example": "I felt more confident after practising my questions.",
        "exampleZh": "练习过提问后，我更有信心了。"
      },
      {
        "word": "value",
        "meaning": "n. 价值；重要性",
        "example": "The value of the letters lies in the memories they preserve.",
        "exampleZh": "这些信的价值在于它们保存的记忆。"
      }
    ],
    "passage": {
      "en": "For our local-history project, I interviewed my grandfather about his old street. There used to be a tiny repair shop beside his home. Every Saturday, neighbours would gather there and exchange news while their bicycles were being fixed. As he was describing the shop, he opened a large trunk and showed me several photographs. I recorded his memories and checked the dates with him afterwards. The pictures had little market value, but they helped our class understand how people used the street before it changed.",
      "zh": "为了完成地方历史课题，我采访了爷爷，请他讲讲旧日的街道。他家旁边以前有一家小修理铺。过去每到周六，邻居们都会聚在那里，一边等自行车修好，一边聊天。他描述修理铺时，打开了一个大衣箱，拿出几张照片给我看。我记录了他的回忆，之后又跟他核对日期。这些照片没什么市场价值，却帮助我们班了解了街道变化之前，人们怎样在这里生活。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "描述过去的拥有状态，选择最合适的表达：My uncle ___ own a small shop, but he no longer does.",
        "options": [
          "would to",
          "was used",
          "used to"
        ],
        "answers": [
          "used to"
        ],
        "explanation": "used to 可以描述过去的状态；would 不用于此处的拥有状态。"
      },
      {
        "type": "choice",
        "prompt": "在明确过去背景下描述反复动作：When we lived there, we ___ visit the library every Saturday.",
        "options": [
          "have",
          "would",
          "were"
        ],
        "answers": [
          "would"
        ],
        "explanation": "would + 原形可以表达过去经常发生的动作。"
      },
      {
        "type": "choice",
        "prompt": "本课“a wooden trunk for clothes”中的 trunk 指什么？",
        "options": [
          "装衣物的大箱子",
          "树干",
          "车轮"
        ],
        "answers": [
          "装衣物的大箱子"
        ],
        "explanation": "这里的 trunk 是较旧式的大旅行箱或衣箱。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：照片主要帮助同学们了解什么？",
        "options": [
          "How to detect metal underground.",
          "How to repair a recording device.",
          "How people used the old street."
        ],
        "answers": [
          "How people used the old street."
        ],
        "explanation": "照片和回忆帮助大家了解街道过去的生活。"
      },
      {
        "type": "text",
        "prompt": "用 used to 表达以前的状态，按 My grandmother / live / near the sea 写完整句子。",
        "answers": [
          "My grandmother used to live near the sea."
        ],
        "explanation": "used to live 描述祖母过去住在海边附近。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“他讲故事时，我正在录音”；以 I 开头。",
        "tokens": [
          "I",
          "was",
          "recording",
          "while",
          "he",
          "was",
          "telling",
          "the",
          "story."
        ],
        "answers": [
          "I was recording while he was telling the story."
        ],
        "explanation": "两个过去进行时由 while 连接，表示同时进行的动作。"
      }
    ],
    "sourcePages": [
      259,
      260
    ]
  },
  {
    "sourceLesson": 56,
    "title": "哪辆模型车更稳",
    "scene": "科学课模型测试",
    "goal": "根据可数性使用数量词，并进行准确比较。",
    "grammar": {
      "title": "数量词与比较",
      "explanation": "many、few/a few 修饰可数复数，much、little/a little 修饰不可数名词。few/little 强调少到不够，a few/a little 表示有一些。a large number of 接可数复数，a great deal of 接不可数。比较时可用 the same as、different from；比较级前可以加 much 或 far 表示程度更大。",
      "examples": [
        {
          "en": "We have a few spare wheels, but very little time.",
          "zh": "我们有几个备用轮子，但时间非常少。"
        },
        {
          "en": "This track is much smoother than the old one.",
          "zh": "这条跑道比旧的平整得多。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "sound",
        "meaning": "n. 声音",
        "example": "The small motor made a soft humming sound.",
        "exampleZh": "小马达发出轻柔的嗡嗡声。"
      },
      {
        "word": "excitement",
        "meaning": "n. 兴奋；激动",
        "example": "There was great excitement when the model finally moved.",
        "exampleZh": "模型终于动起来时，大家都很激动。"
      },
      {
        "word": "handsome",
        "meaning": "adj. 英俊的；漂亮大方的",
        "example": "The drama poster showed a handsome young prince.",
        "exampleZh": "戏剧海报上画着一位英俊的年轻王子。"
      },
      {
        "word": "Rolls-Royce",
        "meaning": "n. 劳斯莱斯（汽车品牌）",
        "example": "We sketched a Rolls-Royce during the museum visit.",
        "exampleZh": "参观博物馆时，我们画了一辆劳斯莱斯汽车。"
      },
      {
        "word": "Benz",
        "meaning": "n. 奔驰（汽车品牌名称，也可指姓氏本茨）",
        "example": "The display included an early Benz car.",
        "exampleZh": "展品中有一辆早期奔驰汽车。"
      },
      {
        "word": "wheel",
        "meaning": "n. 车轮；轮子",
        "example": "One wheel was smaller than the other three.",
        "exampleZh": "一个车轮比另外三个小。"
      },
      {
        "word": "explosion",
        "meaning": "n. 爆炸；爆炸声",
        "example": "The film used a recorded explosion for its sound effect.",
        "exampleZh": "电影使用录制的爆炸声作为音效。"
      },
      {
        "word": "course",
        "meaning": "n. 赛道；路线",
        "example": "The model cars followed a short course marked with tape.",
        "exampleZh": "模型车沿着胶带标出的短赛道行驶。"
      },
      {
        "word": "rival",
        "meaning": "n. 对手；竞争者",
        "example": "Our closest rival offered to lend us a spare wheel.",
        "exampleZh": "我们最强的对手主动提出借给我们一个备用轮子。"
      },
      {
        "word": "speed",
        "meaning": "v. 快速行进；疾驰",
        "example": "The toy car sped across the smooth floor.",
        "exampleZh": "玩具车飞快地驶过光滑的地板。"
      },
      {
        "word": "downhill",
        "meaning": "adv. 下坡地；向坡下",
        "example": "The model rolled downhill without a motor.",
        "exampleZh": "模型不用马达就沿坡滚了下去。"
      }
    ],
    "passage": {
      "en": "In science class, we compared two model cars on the same course. The first car had larger wheels, but it also carried much more weight. We had only a little time, so each team completed three tests. A few students expected the heavier car to win, yet the lighter one travelled farther. Its wheels were different from those on the first car. Before drawing a conclusion, we decided to change just one feature at a time and repeat the experiment.",
      "zh": "科学课上，我们让两辆模型车在同一条赛道上进行比较。第一辆车轮更大，但重量也大得多。时间不多，所以每组完成了三次测试。几位同学以为较重的车会赢，结果较轻的车行驶得更远。它的轮子与第一辆的不同。得出结论前，我们决定每次只改变一个特征，再重复实验。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "选择修饰不可数名词的表达：We have only ___ time left.",
        "options": [
          "many",
          "a little",
          "a few"
        ],
        "answers": [
          "a little"
        ],
        "explanation": "time 在此不可数，因此用 a little。"
      },
      {
        "type": "choice",
        "prompt": "选择正确搭配：These wheels are different ___ the old ones.",
        "options": [
          "from",
          "as",
          "than to"
        ],
        "answers": [
          "from"
        ],
        "explanation": "different from 表示与……不同。"
      },
      {
        "type": "choice",
        "prompt": "模型车测试中的 course 是什么？",
        "options": [
          "课堂铃声",
          "车身颜色",
          "赛道或行驶路线"
        ],
        "answers": [
          "赛道或行驶路线"
        ],
        "explanation": "course 在此指模型车行驶的路线。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：为什么小组决定一次只改变一个特征？",
        "options": [
          "To make both cars much heavier.",
          "To make the comparison more reliable.",
          "To avoid using any wheels."
        ],
        "answers": [
          "To make the comparison more reliable."
        ],
        "explanation": "原测试中车轮和重量都不同，一次只改变一项有助于判断究竟是哪项影响结果。"
      },
      {
        "type": "text",
        "prompt": "用 a few 写完整句子，表达“我们有几个备用轮子”。使用 We、have、spare wheels。",
        "answers": [
          "We have a few spare wheels."
        ],
        "explanation": "wheels 是可数复数，有一些用 a few。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“这辆车比那辆轻得多”；以 This 开头。",
        "tokens": [
          "This",
          "car",
          "is",
          "much",
          "lighter",
          "than",
          "that",
          "one."
        ],
        "answers": [
          "This car is much lighter than that one."
        ],
        "explanation": "much 可修饰比较级 lighter，表示轻得多。"
      }
    ],
    "sourcePages": [
      263,
      264
    ]
  },
  {
    "sourceLesson": 57,
    "title": "找到你的志愿者搭档",
    "scene": "社区图书活动",
    "goal": "用介词准确说明地点、衣着、随身特征和离开表面。",
    "grammar": {
      "title": "at、in、off 与 with",
      "explanation": "at 常把地点看作一个点，如 at the entrance；in 表示在空间内部，也用于穿着某颜色或衣物，如 in a blue coat。off 可表示离开表面，如 take a bag off the table。with 可介绍伴随的人或可辨认的特征，如 the student with a red folder。",
      "examples": [
        {
          "en": "Meet the volunteer at the information desk.",
          "zh": "到咨询台与志愿者会合。"
        },
        {
          "en": "The student in a green jacket is holding a box with two handles.",
          "zh": "穿绿外套的同学正拿着一个有两个提手的箱子。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "madam",
        "meaning": "n. 女士（正式、礼貌称呼）",
        "example": "“Excuse me, madam, is this your ticket?” the volunteer asked.",
        "exampleZh": "“打扰一下，女士，这是您的票吗？”志愿者问。"
      },
      {
        "word": "jeans",
        "meaning": "n. 牛仔裤（复数，量词常用 a pair of）",
        "example": "I wore jeans and comfortable shoes for the book sale.",
        "exampleZh": "图书义卖时，我穿了牛仔裤和舒适的鞋。"
      },
      {
        "word": "hesitate",
        "meaning": "v. 犹豫",
        "example": "Do not hesitate to ask if the instructions are unclear.",
        "exampleZh": "如果说明不清楚，尽管提问。"
      },
      {
        "word": "serve",
        "meaning": "v. 接待；为……服务",
        "example": "Two volunteers serve visitors at the front desk.",
        "exampleZh": "两位志愿者在前台接待访客。"
      },
      {
        "word": "scornfully",
        "meaning": "adv. 轻蔑地；鄙夷地",
        "example": "The character laughed scornfully at the idea in the play.",
        "exampleZh": "剧中角色对那个想法发出了轻蔑的笑声。"
      },
      {
        "word": "punish",
        "meaning": "v. 惩罚",
        "example": "The story asks whether it is fair to punish the whole team.",
        "exampleZh": "这个故事提出了惩罚整支队伍是否公平的问题。"
      },
      {
        "word": "fur",
        "meaning": "n. 毛皮；皮毛",
        "example": "The museum displayed a hat made of artificial fur.",
        "exampleZh": "博物馆展出了一顶人造毛皮帽子。"
      },
      {
        "word": "eager",
        "meaning": "adj. 热切的；渴望的",
        "example": "The new volunteers were eager to help.",
        "exampleZh": "新志愿者们都很想帮忙。"
      }
    ],
    "passage": {
      "en": "At the community book fair, I was asked to find my volunteer partner. The organiser said, “Look for the student in blue jeans with a yellow notebook.” I found her at the information desk, where she was helping a visitor fill in a form. She asked me to take a stack of leaflets off a chair so that an older visitor could sit down. Once the chair was clear, we checked our tasks together. The detailed description had saved me from interrupting several other students.",
      "zh": "社区书展上，我被安排去找自己的志愿者搭档。组织者说：“找穿蓝色牛仔裤、拿黄色笔记本的那位同学。”我在咨询台找到了她，她正在帮一位访客填写表格。她请我把椅子上的一叠传单拿走，让一位年长的访客能坐下。椅子清空后，我们一起核对了任务。那段具体的外貌描述让我不用打扰好几位其他同学。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "描述衣着，选择介词：The student ___ a red jacket is my partner.",
        "options": [
          "in",
          "at",
          "off"
        ],
        "answers": [
          "in"
        ],
        "explanation": "in + 衣物表示穿着某件衣服。"
      },
      {
        "type": "choice",
        "prompt": "表示把物品从椅面拿开：Please take the leaflets ___ the chair.",
        "options": [
          "with",
          "at",
          "off"
        ],
        "answers": [
          "off"
        ],
        "explanation": "off 表示离开一个表面。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：The volunteers were ___ to start and kept asking how they could help.",
        "options": [
          "fur",
          "eager",
          "scornfully"
        ],
        "answers": [
          "eager"
        ],
        "explanation": "eager 表示热切、很想参与，与后面的行为一致。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：为什么要把传单从椅子上拿走？",
        "options": [
          "So that an older visitor could sit down.",
          "So that the notebook could be sold.",
          "So that students could stand on the chair."
        ],
        "answers": [
          "So that an older visitor could sit down."
        ],
        "explanation": "清空椅子是为了让年长访客坐下。"
      },
      {
        "type": "text",
        "prompt": "用 with 描述特征，翻译：拿着黄色笔记本的那位同学是我的搭档。固定开头 The student with，结尾 is my partner。",
        "answers": [
          "The student with a yellow notebook is my partner.",
          "The student with the yellow notebook is my partner."
        ],
        "explanation": "with a yellow notebook 修饰 student，说明辨认特征。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“穿蓝色衣服的志愿者正在入口等候”；以 The 开头，地点放句末。",
        "tokens": [
          "The",
          "volunteer",
          "in",
          "blue",
          "is",
          "waiting",
          "at",
          "the",
          "entrance."
        ],
        "answers": [
          "The volunteer in blue is waiting at the entrance."
        ],
        "explanation": "in blue 描述衣着，at the entrance 表示等候地点。"
      }
    ],
    "sourcePages": [
      267,
      268
    ]
  },
  {
    "sourceLesson": 58,
    "title": "导览词也要查证",
    "scene": "社区历史展准备",
    "goal": "区分传闻与事实，使用转述被动和双宾语被动。",
    "grammar": {
      "title": "转述被动与双宾语",
      "explanation": "It is said that... 与 主语 + is/are said to... 都可表示据说，不保证内容已经证实。若所说事件早于转述，可用 is said to have done。give/show 等双宾语动词可让人或物作被动主语：We were given a map / A map was given to us。",
      "examples": [
        {
          "en": "The building is said to be over a hundred years old.",
          "zh": "据说这栋建筑已有一百多年历史。"
        },
        {
          "en": "We were shown a photograph of the original entrance.",
          "zh": "有人给我们看了原来入口的照片。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "blessing",
        "meaning": "n. 幸事；福分",
        "example": "The extra study room was a blessing during the noisy repairs.",
        "exampleZh": "吵闹的维修期间，多出来的自习室真是件幸事。"
      },
      {
        "word": "disguise",
        "meaning": "n. 伪装；掩饰",
        "example": "The actor wore a simple disguise in the final scene.",
        "exampleZh": "演员在最后一场戏中做了简单伪装。"
      },
      {
        "word": "tiny",
        "meaning": "adj. 极小的",
        "example": "A tiny label showed the date on the back of the photograph.",
        "exampleZh": "照片背面的一张小标签标着日期。"
      },
      {
        "word": "possess",
        "meaning": "v. 拥有（较正式）",
        "example": "The local museum possesses several old street maps.",
        "exampleZh": "当地博物馆拥有几幅旧街道地图。"
      },
      {
        "word": "cursed",
        "meaning": "adj. 被诅咒的（常见于故事或迷信叙述）",
        "example": "The novelist describes the island as cursed.",
        "exampleZh": "小说家把那座岛描写成被诅咒的地方。"
      },
      {
        "word": "increase",
        "meaning": "v. 增加；增长",
        "example": "We hope to increase the number of readable labels.",
        "exampleZh": "我们希望增加易读标签的数量。"
      },
      {
        "word": "plant",
        "meaning": "v./n. 种植；植物",
        "example": "Our class will plant flowers beside the new path.",
        "exampleZh": "我们班将在新路旁种花。"
      },
      {
        "word": "church",
        "meaning": "n. 教堂",
        "example": "The old photograph shows a church beside a small bridge.",
        "exampleZh": "那张旧照片里，一座教堂位于小桥旁。"
      },
      {
        "word": "evil",
        "meaning": "adj./n. 邪恶的；恶",
        "example": "The play’s evil character tries to steal the town’s clock.",
        "exampleZh": "剧中的邪恶角色企图偷走镇上的钟。"
      },
      {
        "word": "reputation",
        "meaning": "n. 名声；声誉",
        "example": "The library has a reputation for friendly service.",
        "exampleZh": "这家图书馆以服务友善而闻名。"
      },
      {
        "word": "claim",
        "meaning": "v. 夺去（生命）；也可指声称、宣称",
        "example": "The memorial records the lives that the old factory fire claimed.",
        "exampleZh": "纪念碑记录了那场旧工厂火灾中失去的生命。"
      },
      {
        "word": "victim",
        "meaning": "n. 受害者",
        "example": "The safety lesson explained how to help a victim of online fraud.",
        "exampleZh": "安全课讲解了如何帮助网络诈骗的受害者。"
      },
      {
        "word": "vicar",
        "meaning": "n. 英国国教教区牧师（特定宗教职务）",
        "example": "We interviewed a vicar about the church’s community history.",
        "exampleZh": "我们采访了一位教区牧师，了解教堂的社区历史。"
      },
      {
        "word": "source",
        "meaning": "n. 来源；资料出处",
        "example": "Every historical claim needs a reliable source.",
        "exampleZh": "每个历史说法都需要可靠的来源。"
      },
      {
        "word": "income",
        "meaning": "n. 收入",
        "example": "Ticket income helps pay for the museum’s repairs.",
        "exampleZh": "门票收入帮助支付博物馆的维修费用。"
      },
      {
        "word": "trunk",
        "meaning": "n. 树干（本课词义）",
        "example": "The sign was placed beside the tree trunk, not nailed to it.",
        "exampleZh": "标牌放在树干旁边，没有钉在树上。"
      }
    ],
    "passage": {
      "en": "Our class is preparing audio guides for a small history exhibition. The oldest building in our neighbourhood is said to have been a school, but we have not found a record that confirms this. A retired teacher gave us a photograph, and we were shown two old maps at the library. We are comparing these sources before recording the guide. If a detail is uncertain, we will say so clearly. A good local story is interesting, but visitors also deserve to know which parts are supported by evidence.",
      "zh": "我们班正在为一个小型历史展准备语音导览。据说社区最老的那栋建筑曾是学校，但我们还没找到能够证实的记录。一位退休教师给了我们一张照片，图书馆工作人员又给我们看了两幅旧地图。录制导览前，我们正在对比这些来源。若某个细节不确定，我们会明确说明。好的地方故事很有趣，但访客也有权知道哪些部分有证据支持。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "选择表示“据说”的被动结构：The house ___ to be very old.",
        "options": [
          "says",
          "is saying",
          "is said"
        ],
        "answers": [
          "is said"
        ],
        "explanation": "主语 + is said to do 表示据说……。"
      },
      {
        "type": "choice",
        "prompt": "把给人的地图作为主语，选正确搭配：A map was given ___ us.",
        "options": [
          "off",
          "to",
          "at"
        ],
        "answers": [
          "to"
        ],
        "explanation": "give something to someone 被动后保留 to us。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：A museum label should name the ___ of its information.",
        "options": [
          "source",
          "victim",
          "trunk"
        ],
        "answers": [
          "source"
        ],
        "explanation": "说明信息来自哪里，要标明 source，即来源。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：小组将怎样处理尚未证实的细节？",
        "options": [
          "Present every rumour as a fact.",
          "Remove all references to the maps.",
          "State clearly that they are uncertain."
        ],
        "answers": [
          "State clearly that they are uncertain."
        ],
        "explanation": "小组承诺对不确定的细节明确说明。"
      },
      {
        "type": "text",
        "prompt": "把 People say that the house is old. 改成以 The house 开头、使用 is said to 的句子。 省略动作发出者。",
        "answers": [
          "The house is said to be old."
        ],
        "explanation": "that 从句中的 is old 改为 to be old，主句用 is said。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“我们得到了一份旧地图的副本”；以 We 开头。",
        "tokens": [
          "We",
          "were",
          "given",
          "a",
          "copy",
          "of",
          "the",
          "old",
          "map."
        ],
        "answers": [
          "We were given a copy of the old map."
        ],
        "explanation": "以接收者 We 为主语，使用 were given 的被动形式。"
      }
    ],
    "sourcePages": [
      271,
      272
    ]
  },
  {
    "sourceLesson": 59,
    "title": "让小组学习真正有效",
    "scene": "同伴学习习惯",
    "goal": "综合区分习惯、过去经历和持续至今的改进。",
    "grammar": {
      "title": "综合复习：习惯与持续变化",
      "explanation": "一般现在时讲现在的规律，过去式讲具体过去事件；现在完成进行时强调一直在做的改进。would 可在过去背景中描述反复行为。is said to 等转述被动只说明别人这样说，不等于已证明。综合叙述时让每种形式服务于清楚的时间线。",
      "examples": [
        {
          "en": "We meet every Tuesday and compare our notes.",
          "zh": "我们每周二见面并对照笔记。"
        },
        {
          "en": "We have been trying a new study routine since September.",
          "zh": "从九月开始，我们一直在试用一套新的学习安排。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "bark",
        "meaning": "v. 吠叫；狗叫",
        "example": "The dog began to bark when the delivery van arrived.",
        "exampleZh": "送货车到时，那条狗开始叫。"
      },
      {
        "word": "press",
        "meaning": "v. 按；压",
        "example": "Press the green button to start the recording.",
        "exampleZh": "按绿色按钮开始录音。"
      },
      {
        "word": "paw",
        "meaning": "n. 爪；兽足",
        "example": "The cat rested one paw on the closed notebook.",
        "exampleZh": "猫把一只爪子搭在合上的笔记本上。"
      },
      {
        "word": "latch",
        "meaning": "n. 门闩；搭扣",
        "example": "The caretaker checked the latch on the garden gate.",
        "exampleZh": "管理员检查了花园门上的门闩。"
      },
      {
        "word": "expert",
        "meaning": "n. 专家；行家",
        "example": "A local cycling expert taught us how to check our helmets.",
        "exampleZh": "一位本地骑行专家教我们检查头盔。"
      },
      {
        "word": "develop",
        "meaning": "v. 养成；发展",
        "example": "I want to develop a habit of checking my work.",
        "exampleZh": "我想养成检查作业的习惯。"
      },
      {
        "word": "habit",
        "meaning": "n. 习惯",
        "example": "Keeping a short reading diary is a useful habit.",
        "exampleZh": "记简短的阅读日记是个好习惯。"
      },
      {
        "word": "remove",
        "meaning": "v. 移走；去掉",
        "example": "Please remove the old label before adding a new one.",
        "exampleZh": "贴新标签前请去掉旧标签。"
      }
    ],
    "passage": {
      "en": "Last term, our study group would spend the first twenty minutes choosing what to do. We often left with several questions unfinished. Since September, we have been using a simple routine: choose one goal before the meeting, work quietly, and compare answers at the end. At yesterday’s meeting, we finished early and had time to explain our mistakes. Short breaks are said to help concentration, so we are also testing that idea. We will keep notes rather than assume that every popular study tip works for everyone.",
      "zh": "上学期，我们学习小组每次都会花头二十分钟决定做什么。离开时，常常还有好几道题没完成。从九月开始，我们一直使用一套简单安排：会前选好一个目标，安静完成任务，最后核对答案。昨天的小组学习提前完成了，我们还有时间解释错误。据说短暂休息有助于集中注意力，所以我们也在试验这个想法。我们会记录效果，而不是假定每条流行的学习建议都适合所有人。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "表示从九月一直尝试至今：We ___ this routine since September.",
        "options": [
          "are tried",
          "have been trying",
          "had trying"
        ],
        "answers": [
          "have been trying"
        ],
        "explanation": "have been trying 与 since 起点搭配，强调持续到现在。"
      },
      {
        "type": "choice",
        "prompt": "在过去背景下选择习惯表达：Last term, we ___ spend twenty minutes choosing a task.",
        "options": [
          "would",
          "will",
          "have"
        ],
        "answers": [
          "would"
        ],
        "explanation": "would + 动词原形可描述过去反复发生的动作。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：Checking my answers before handing in work has become a ___.",
        "options": [
          "paw",
          "latch",
          "habit"
        ],
        "answers": [
          "habit"
        ],
        "explanation": "反复形成的做法是 habit，即习惯。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：新的学习安排要求什么时候选择目标？",
        "options": [
          "Twenty minutes after arriving.",
          "Before the meeting.",
          "After all the answers are compared."
        ],
        "answers": [
          "Before the meeting."
        ],
        "explanation": "新安排的第一步是在会面之前选一个目标。"
      },
      {
        "type": "text",
        "prompt": "用 have been using 写完整句子，since Monday 放句末：We / a checklist / since Monday。",
        "answers": [
          "We have been using a checklist since Monday."
        ],
        "explanation": "持续使用某物用 have been using，since Monday 指起点。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“这个方法据说有用”；以 This 开头。",
        "tokens": [
          "This",
          "method",
          "is",
          "said",
          "to",
          "be",
          "useful."
        ],
        "answers": [
          "This method is said to be useful."
        ],
        "explanation": "is said to be 表示据说处于某种状态。"
      }
    ],
    "sourcePages": [
      275,
      276
    ]
  },
  {
    "sourceLesson": 60,
    "title": "演出当天怎么碰面",
    "scene": "校园戏剧节安排",
    "goal": "用现在进行时表达安排，用现在时表达未来时间从句。",
    "grammar": {
      "title": "未来安排与时间从句",
      "explanation": "现在进行时可说明已经安排的未来行动，通常给出时间背景。主句谈未来时，when、until、as soon as、before、after 引导的时间从句通常用一般现在时，不用 will。区别于间接疑问句：I do not know when he will arrive 中的 when 是何时，不是当……时。",
      "examples": [
        {
          "en": "We are meeting the stage manager at three tomorrow.",
          "zh": "我们明天下午三点和舞台负责人见面。"
        },
        {
          "en": "I will message you as soon as the rehearsal ends.",
          "zh": "排练一结束，我就给你发消息。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "future",
        "meaning": "n. 将来；未来",
        "example": "The play asks what a fairer future could look like.",
        "exampleZh": "这部戏探讨更公平的未来可能是什么样的。"
      },
      {
        "word": "fair",
        "meaning": "n. 集市；游乐集会",
        "example": "Our school fair has music, games and a book stall.",
        "exampleZh": "学校游园会有音乐、游戏和图书摊位。"
      },
      {
        "word": "fortune-teller",
        "meaning": "n. 算命者；占卜者（所作预言并非可靠预测）",
        "example": "I play a fortune-teller in a comedy about mistaken predictions.",
        "exampleZh": "我在一部关于错误预言的喜剧中扮演占卜者。"
      },
      {
        "word": "crystal",
        "meaning": "n. 水晶；晶体",
        "example": "The stage team used a clear plastic ball instead of real crystal.",
        "exampleZh": "舞台组用透明塑料球代替了真正的水晶。"
      },
      {
        "word": "relation",
        "meaning": "n. 亲属；亲戚（本课词义）",
        "example": "One of my relations is coming to watch the play.",
        "exampleZh": "我的一位亲戚要来看演出。"
      },
      {
        "word": "impatiently",
        "meaning": "adv. 不耐烦地",
        "example": "He tapped the table impatiently while the file loaded.",
        "exampleZh": "文件加载时，他不耐烦地敲着桌子。"
      }
    ],
    "passage": {
      "en": "Our drama group is performing at the school fair on Saturday. I am meeting my partner beside the hall at one, and a relation of hers is bringing the costumes. We will check every prop before the doors open. In our comedy, a fortune-teller makes confident predictions that turn out to be wrong. The audience knows it is a joke. As soon as our scene ends, we will move the chairs for the next group. Nobody will leave until the stage manager checks that the space is clear.",
      "zh": "周六，我们戏剧组要在学校游园会上演出。我约好一点在礼堂旁与搭档会合，她的一位亲戚会送来戏服。开门前，我们将检查每件道具。在这出喜剧中，一位占卜者信心满满地作出预言，结果全都错了。观众知道这只是玩笑。我们这场戏一结束，就会搬动椅子，为下一组腾地方。舞台负责人检查并确认场地清空前，谁都不会离开。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "未来时间从句选正确形式：We will begin as soon as the audience ___.",
        "options": [
          "arrives",
          "will arrive",
          "arriving"
        ],
        "answers": [
          "arrives"
        ],
        "explanation": "as soon as 引导未来时间从句，用一般现在时 arrives。"
      },
      {
        "type": "choice",
        "prompt": "选择已安排的未来表达：I ___ my partner at one tomorrow.",
        "options": [
          "am meet",
          "have meeting",
          "am meeting"
        ],
        "answers": [
          "am meeting"
        ],
        "explanation": "现在进行时 am meeting 配未来时间，可表示已安排的会面。"
      },
      {
        "type": "choice",
        "prompt": "“A relation of hers brought the costumes.”中的 relation 指什么？",
        "options": [
          "她使用的一种道具",
          "她的一位亲戚",
          "她写的一篇评论"
        ],
        "answers": [
          "她的一位亲戚"
        ],
        "explanation": "relation 在本课中表示亲属。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：同学们何时才会离开？",
        "options": [
          "After the stage manager checks that the space is clear.",
          "Before their scene starts.",
          "As soon as the costumes arrive."
        ],
        "answers": [
          "After the stage manager checks that the space is clear."
        ],
        "explanation": "until 从句说明离开的前提是负责人确认场地清空。"
      },
      {
        "type": "text",
        "prompt": "用 when 合并为将来时间句，以 I will call you 开头：我到家时会给你打电话。到家使用 get home。",
        "answers": [
          "I will call you when I get home."
        ],
        "explanation": "主句用 will call，未来时间从句用一般现在时 get。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“门打开之前我们会等候”；以 We 开头。",
        "tokens": [
          "We",
          "will",
          "wait",
          "until",
          "the",
          "doors",
          "open."
        ],
        "answers": [
          "We will wait until the doors open."
        ],
        "explanation": "until 引导时间从句，未来意义用一般现在时 open。"
      }
    ],
    "sourcePages": [
      279,
      280
    ]
  },
  {
    "sourceLesson": 61,
    "title": "星空展的倒计时",
    "scene": "学校天文社展览",
    "goal": "区分将来某时前完成的结果和持续到该时的时长。",
    "grammar": {
      "title": "将来完成时与将来完成进行时",
      "explanation": "will have + 过去分词强调未来截止点前完成的结果。will have been + 动词-ing 强调持续到未来某一时点的活动时长，常与 for + 时间连用。两种形式都需要清楚的未来参照点；状态动词通常不用完成进行式。",
      "examples": [
        {
          "en": "By Friday, we will have built the model.",
          "zh": "到周五，我们将已做完模型。"
        },
        {
          "en": "By Friday, we will have been preparing for three weeks.",
          "zh": "到周五，我们将已经连续准备三周。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "Hubble",
        "meaning": "n. 哈勃（此处指哈勃太空望远镜的名称）",
        "example": "Our club chose a Hubble image for its astronomy poster.",
        "exampleZh": "我们社团为天文海报选了一张哈勃望远镜图像。"
      },
      {
        "word": "telescope",
        "meaning": "n. 望远镜（尤指天文望远镜）",
        "example": "A teacher helped us focus the telescope on the Moon.",
        "exampleZh": "老师帮助我们调整望远镜，观察月亮。"
      },
      {
        "word": "launch",
        "meaning": "v. 发射；启动",
        "example": "The animation shows how engineers launch a satellite.",
        "exampleZh": "动画展示工程师怎样发射卫星。"
      },
      {
        "word": "space",
        "meaning": "n. 太空；空间",
        "example": "Our exhibition begins with a question about travel in space.",
        "exampleZh": "我们的展览以一个关于太空旅行的问题开场。"
      },
      {
        "word": "NASA",
        "meaning": "n. 美国国家航空航天局（机构简称）",
        "example": "The student cited NASA as the source of the photograph.",
        "exampleZh": "那位同学注明照片来源为美国国家航空航天局。"
      },
      {
        "word": "billion",
        "meaning": "n. 十亿",
        "example": "The chart uses one billion as its unit.",
        "exampleZh": "图表以十亿为单位。"
      },
      {
        "word": "faulty",
        "meaning": "adj. 有故障的；有缺陷的",
        "example": "We replaced a faulty switch in the classroom model.",
        "exampleZh": "我们更换了教室模型上有故障的开关。"
      },
      {
        "word": "astronaut",
        "meaning": "n. 宇航员",
        "example": "I wrote three questions for an imaginary astronaut interview.",
        "exampleZh": "我为一次模拟宇航员采访写了三个问题。"
      },
      {
        "word": "shuttle",
        "meaning": "n. 航天飞机；往返交通工具（此处侧重前者）",
        "example": "The museum displayed a model space shuttle.",
        "exampleZh": "博物馆展出了一架航天飞机模型。"
      },
      {
        "word": "Endeavour",
        "meaning": "n. 奋进号（航天飞机专名）",
        "example": "We carefully copied the name Endeavour onto the model’s label.",
        "exampleZh": "我们仔细地把“奋进号”这个名字抄到模型标签上。"
      },
      {
        "word": "robot-arm",
        "meaning": "n. 机械臂（现代常写作 robot arm 或 robotic arm）",
        "example": "The robot arm on our model can lift a paper cup.",
        "exampleZh": "我们模型上的机械臂能提起一个纸杯。"
      },
      {
        "word": "grab",
        "meaning": "v. 抓住；抓取",
        "example": "The mechanical hand tried to grab the foam block.",
        "exampleZh": "机械手试着抓取泡沫块。"
      },
      {
        "word": "atmosphere",
        "meaning": "n. 大气层；空气",
        "example": "The diagram shows several layers of the atmosphere.",
        "exampleZh": "这幅图展示了大气层的几个分层。"
      },
      {
        "word": "distant",
        "meaning": "adj. 遥远的",
        "example": "We used tiny lights to represent distant stars.",
        "exampleZh": "我们用小灯代表遥远的恒星。"
      },
      {
        "word": "galaxy",
        "meaning": "n. 星系",
        "example": "She drew a spiral galaxy for the display.",
        "exampleZh": "她为展览画了一个旋涡星系。"
      },
      {
        "word": "universe",
        "meaning": "n. 宇宙",
        "example": "The final display asks how people study the universe.",
        "exampleZh": "最后一块展板提出了人类怎样研究宇宙的问题。"
      },
      {
        "word": "eagle eye",
        "meaning": "n. 锐利的目光；敏锐的观察力",
        "example": "With an eagle eye for detail, Min spotted the missing unit.",
        "exampleZh": "敏有着敏锐的观察力，发现了漏写的单位。"
      }
    ],
    "passage": {
      "en": "Our astronomy club is preparing an exhibition for the school library. By next Friday, we will have finished a model telescope and checked the captions beside every image. By then, we will have been working on the project for a month. One team is designing a robot arm that can move a foam block, while another is comparing pictures of distant galaxies. We are keeping the explanations short enough for younger visitors. Before the exhibition opens, we will have tested each activity with a small group of classmates.",
      "zh": "我们天文社正在为学校图书馆准备一个展览。到下周五，我们将完成望远镜模型，并核对每幅图片旁的说明。届时，我们将已为这个项目持续工作一个月。一组正在设计能搬动泡沫块的机械臂，另一组则在比较遥远星系的图片。我们让说明保持简短，好让低年级访客理解。展览开幕前，我们将请一小组同学测试完每项互动活动。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "强调未来截止点前完成：By Friday, we ___ all the labels.",
        "options": [
          "will have checking",
          "will been checked",
          "will have checked"
        ],
        "answers": [
          "will have checked"
        ],
        "explanation": "将来完成时是 will have + 过去分词 checked。"
      },
      {
        "type": "choice",
        "prompt": "强调持续至未来的时长：By June, we ___ on the model for two months.",
        "options": [
          "will been working",
          "will have been working",
          "will have working"
        ],
        "answers": [
          "will have been working"
        ],
        "explanation": "将来完成进行时为 will have been working。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：The switch was ___, so it had to be replaced.",
        "options": [
          "faulty",
          "distant",
          "billion"
        ],
        "answers": [
          "faulty"
        ],
        "explanation": "需要更换开关，说明它有故障，即 faulty。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：开幕前谁会帮助测试活动？",
        "options": [
          "A team of visiting astronauts.",
          "Only the school librarian.",
          "A small group of classmates."
        ],
        "answers": [
          "A small group of classmates."
        ],
        "explanation": "最后一句说会请一小组同学参加测试。"
      },
      {
        "type": "text",
        "prompt": "用将来完成进行时写完整句子：By July, we / practise / for three months。采用英式拼写 practising。",
        "answers": [
          "By July, we will have been practising for three months."
        ],
        "explanation": "持续到未来七月的练习时长，用 will have been practising。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“到那时我们将已完成这个模型”；以 We 开头，by then 放句末。",
        "tokens": [
          "We",
          "will",
          "have",
          "completed",
          "the",
          "model",
          "by",
          "then."
        ],
        "answers": [
          "We will have completed the model by then."
        ],
        "explanation": "will have completed 表示到未来参照点前完成。"
      }
    ],
    "sourcePages": [
      283,
      284
    ]
  },
  {
    "sourceLesson": 62,
    "title": "实验记录里的前因后果",
    "scene": "科学课种子生长记录",
    "goal": "用过去完成时说明结果，用过去完成进行时说明此前过程。",
    "grammar": {
      "title": "过去完成时与过去完成进行时",
      "explanation": "had + 过去分词强调过去参照点之前已完成的动作或数量；had been + 动词-ing 强调在那个过去时点之前持续的活动，也可解释当时的状态。两者都不是单纯更久远的过去，而是相对于另一个过去事件来组织时间。",
      "examples": [
        {
          "en": "By the end of the lesson, we had measured every plant.",
          "zh": "到那节课结束时，我们已测量完每株植物。"
        },
        {
          "en": "We had been recording the changes for two weeks when the display opened.",
          "zh": "展览开幕时，我们已经连续记录这些变化两周了。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "control",
        "meaning": "v./n. 控制；管理",
        "example": "We tried to control the amount of light in the experiment.",
        "exampleZh": "我们试着控制实验中的光照量。"
      },
      {
        "word": "smoke",
        "meaning": "n. 烟",
        "example": "If you see smoke in the building, tell an adult and leave safely.",
        "exampleZh": "如果看到楼内有烟，要告诉成人并安全离开。"
      },
      {
        "word": "desolate",
        "meaning": "adj. 荒凉的；荒无人烟的",
        "example": "The photograph showed a desolate landscape with no buildings.",
        "exampleZh": "照片展示了一片没有建筑的荒凉景象。"
      },
      {
        "word": "threaten",
        "meaning": "v. 威胁；可能造成伤害",
        "example": "Heavy rain could threaten the outdoor exhibition.",
        "exampleZh": "大雨可能影响户外展览的安全开展。"
      },
      {
        "word": "surrounding",
        "meaning": "adj. 周围的；附近的",
        "example": "We compared the school garden with the surrounding streets.",
        "exampleZh": "我们比较了学校花园和附近街道的环境。"
      },
      {
        "word": "destruction",
        "meaning": "n. 破坏；毁坏",
        "example": "The museum display explains the destruction caused by the storm.",
        "exampleZh": "博物馆的展板介绍了暴风雨造成的破坏。"
      },
      {
        "word": "flood",
        "meaning": "n./v. 洪水；淹没",
        "example": "The flood damaged several homes near the river.",
        "exampleZh": "洪水损坏了河边的几所房屋。"
      },
      {
        "word": "authority",
        "meaning": "n. 主管机构；当局（常用复数 authorities）",
        "example": "The local authority issued a notice about the closed path.",
        "exampleZh": "当地主管部门发布了步道关闭的通知。"
      },
      {
        "word": "grass-seed",
        "meaning": "n. 草籽（现代常写作 grass seed）",
        "example": "We weighed the grass seed before putting it into the trays.",
        "exampleZh": "我们先称草籽的重量，再放入托盘。"
      },
      {
        "word": "spray",
        "meaning": "v. 喷洒",
        "example": "Spray a little water onto the dry soil.",
        "exampleZh": "往干土上喷一点水。"
      },
      {
        "word": "quantity",
        "meaning": "n. 数量；量",
        "example": "Each tray received the same quantity of water.",
        "exampleZh": "每个托盘都获得了同样的水量。"
      },
      {
        "word": "root",
        "meaning": "n. 根；根部",
        "example": "The clear pot lets us see the plant’s roots.",
        "exampleZh": "透明花盆让我们能看见植物的根。"
      },
      {
        "word": "century",
        "meaning": "n. 世纪；一百年",
        "example": "The old garden was created more than a century ago.",
        "exampleZh": "这座旧花园建于一个多世纪以前。"
      },
      {
        "word": "patch",
        "meaning": "n. 小块；一片",
        "example": "We left a small patch of soil uncovered for comparison.",
        "exampleZh": "我们留了一小块土不加覆盖，作为对比。"
      },
      {
        "word": "blacken",
        "meaning": "v. 使变黑；变黑",
        "example": "Smoke had blackened the wall shown in the photograph.",
        "exampleZh": "照片里的墙被烟熏黑了。"
      }
    ],
    "passage": {
      "en": "Our science group compared grass grown in two trays. By the day of our presentation, we had taken twelve photographs and measured the longest roots. We had been recording changes for three weeks, but one result still surprised us. The tray beside the window had received more sunlight than the other. We realised that we had not controlled this difference. Instead of hiding the problem, we explained it in our report and planned a second test with both trays under the same lighting conditions.",
      "zh": "我们科学小组比较了两个托盘里草的生长情况。展示当天，我们已经拍了十二张照片，并测量了最长的根。我们连续记录变化已有三周，但一个结果仍让我们意外。窗边的托盘比另一个得到了更多阳光。我们意识到自己没有控制这一差异。我们没有隐瞒问题，而是在报告里作了说明，并计划把两个托盘放在相同光照条件下再做一次测试。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "强调过去某时前完成的数量：By presentation day, we ___ twelve photographs.",
        "options": [
          "have take",
          "had taken",
          "have taken"
        ],
        "answers": [
          "had taken"
        ],
        "explanation": "had taken 强调到那个过去时间点已经完成十二张照片的拍摄。"
      },
      {
        "type": "choice",
        "prompt": "强调此前持续三周的过程：We ___ changes for three weeks when the test ended.",
        "options": [
          "had been recording",
          "had recording",
          "were been recording"
        ],
        "answers": [
          "had been recording"
        ],
        "explanation": "had been recording 说明测试结束前持续进行的记录。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：Both trays received the same ___ of water.",
        "options": [
          "century",
          "authority",
          "quantity"
        ],
        "answers": [
          "quantity"
        ],
        "explanation": "水的量使用 quantity；same quantity 表示同样的量。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：第一次实验未控制哪一项差异？",
        "options": [
          "The students’ names.",
          "The amount of sunlight.",
          "The number of school days in a week."
        ],
        "answers": [
          "The amount of sunlight."
        ],
        "explanation": "窗边托盘接受了更多阳光，这个变量没有控制好。"
      },
      {
        "type": "text",
        "prompt": "用过去完成进行时写完整句子，以 They 开头：They / work / for two hours / when the teacher arrived。",
        "answers": [
          "They had been working for two hours when the teacher arrived."
        ],
        "explanation": "以老师到达为过去参照点，之前已持续工作两小时，用 had been working。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“展示前我们已量过根”；以 We 开头，before the presentation 放句末。",
        "tokens": [
          "We",
          "had",
          "measured",
          "the",
          "roots",
          "before",
          "the",
          "presentation."
        ],
        "answers": [
          "We had measured the roots before the presentation."
        ],
        "explanation": "had measured 表示测量先于过去的展示。"
      }
    ],
    "sourcePages": [
      287,
      288
    ]
  },
  {
    "sourceLesson": 63,
    "title": "把拍照要求转告清楚",
    "scene": "社区活动拍照志愿服务",
    "goal": "转述肯定和否定要求，并保留正确的人称指代。",
    "grammar": {
      "title": "转述命令与请求",
      "explanation": "tell/ask + 人 + to do 可转述要求；否定用 tell/ask + 人 + not to do。tell 通常语气更直接，ask 常表达请求。代词需要根据谁在说话、要求谁做事来调整。转述命令不使用疑问句语序，也不需要保留 please。",
      "examples": [
        {
          "en": "The organiser asked us to check the name cards.",
          "zh": "组织者请我们核对姓名牌。"
        },
        {
          "en": "She told me not to publish the photograph yet.",
          "zh": "她让我暂时不要发表那张照片。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "circle",
        "meaning": "n. 圈子；交际范围",
        "example": "The photography club helped me widen my circle of friends.",
        "exampleZh": "摄影社帮助我扩大了朋友圈。"
      },
      {
        "word": "admire",
        "meaning": "v. 钦佩；欣赏",
        "example": "I admire the way she listens before giving advice.",
        "exampleZh": "我钦佩她先倾听再给建议的做法。"
      },
      {
        "word": "close",
        "meaning": "adj. 亲密的；关系密切的",
        "example": "We became close friends after working on the project.",
        "exampleZh": "合作完成课题后，我们成了亲密的朋友。"
      },
      {
        "word": "wedding",
        "meaning": "n. 婚礼",
        "example": "My cousin asked me to take photographs at her wedding.",
        "exampleZh": "表姐请我在她的婚礼上拍照。"
      },
      {
        "word": "reception",
        "meaning": "n. 招待会；婚宴",
        "example": "The wedding reception was held in a small restaurant.",
        "exampleZh": "婚宴在一家小餐馆举行。"
      },
      {
        "word": "sort",
        "meaning": "n. 种类；类型",
        "example": "What sort of photographs does the organiser need?",
        "exampleZh": "组织者需要哪一类照片？"
      }
    ],
    "passage": {
      "en": "I volunteered to photograph a community reading event. Before it began, the organiser asked me to check which visitors had agreed to appear in photographs. She told us not to post any pictures until the selection had been reviewed. A close friend helped me keep a list of names and permissions. When another volunteer asked for the files, I explained the organiser’s request and offered to share them after approval. Taking a good photograph mattered, but respecting the people in it mattered just as much.",
      "zh": "我自愿为社区阅读活动拍照。开始前，组织者请我确认哪些访客同意出现在照片中。她告诉我们，在选出的照片完成审核之前，不要发布任何照片。一位好友帮我记录姓名和许可情况。当另一位志愿者索要文件时，我说明了组织者的要求，并表示获准后可以分享。拍出好照片很重要，尊重照片里的人同样重要。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "选择正确转述：The organiser asked us ___ the list.",
        "options": [
          "to check",
          "checking",
          "check to"
        ],
        "answers": [
          "to check"
        ],
        "explanation": "ask someone to do something 表示请某人做某事。"
      },
      {
        "type": "choice",
        "prompt": "选择否定请求：She told me ___ the files yet.",
        "options": [
          "to not sharing",
          "not share",
          "not to share"
        ],
        "answers": [
          "not to share"
        ],
        "explanation": "否定不定式是 not to share。"
      },
      {
        "type": "choice",
        "prompt": "“a circle of friends”中的 circle 指什么？",
        "options": [
          "一条弯曲的道路",
          "朋友圈；交际圈",
          "照片的圆形边框"
        ],
        "answers": [
          "朋友圈；交际圈"
        ],
        "explanation": "circle 可指相互联系的一群人或社交圈。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：叙述者何时愿意分享照片文件？",
        "options": [
          "After approval.",
          "Before checking permissions.",
          "As soon as anyone asks."
        ],
        "answers": [
          "After approval."
        ],
        "explanation": "叙述者说明获准后再分享，符合组织者的要求。"
      },
      {
        "type": "text",
        "prompt": "把 “Do not post the photo,” she told me. 改为以 She told me 开头的间接引语。",
        "answers": [
          "She told me not to post the photo."
        ],
        "explanation": "否定命令转述为 told me not to post。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“他请我们检查姓名”；以 He 开头。",
        "tokens": [
          "He",
          "asked",
          "us",
          "to",
          "check",
          "the",
          "names."
        ],
        "answers": [
          "He asked us to check the names."
        ],
        "explanation": "asked 后接宾语 us，再接 to check。"
      }
    ],
    "sourcePages": [
      291,
      292
    ]
  },
  {
    "sourceLesson": 64,
    "title": "错过集合之后怎样复盘",
    "scene": "学校参观后的总结",
    "goal": "用与过去事实相反的假设说明本可能发生的结果。",
    "grammar": {
      "title": "过去虚拟条件句",
      "explanation": "if + had + 过去分词，主句用 would/could have + 过去分词，表示过去并未发生的条件与结果。would have 强调假想结果，could have 表示本来可能或能够。不要与现在虚拟 if + 过去式、would + 原形混淆。先确认真实发生了什么，再表达另一种过去。",
      "examples": [
        {
          "en": "If we had checked the address, we would have found the right gate.",
          "zh": "如果我们核对过地址，就会找到正确的大门了。"
        },
        {
          "en": "If I had brought my notes, I could have answered the question.",
          "zh": "如果我带了笔记，当时就能回答那个问题了。"
        }
      ]
    },
    "vocabulary": [
      {
        "word": "tunnel",
        "meaning": "n. 隧道",
        "example": "The walking route passes through a short tunnel under the road.",
        "exampleZh": "步行路线穿过公路下的一条短隧道。"
      },
      {
        "word": "port",
        "meaning": "n. 港口",
        "example": "The museum has a model of the town’s old port.",
        "exampleZh": "博物馆有一个小镇旧港口的模型。"
      },
      {
        "word": "ventilate",
        "meaning": "v. 使通风",
        "example": "The caretaker opened the windows to ventilate the room.",
        "exampleZh": "管理员打开窗户，让房间通风。"
      },
      {
        "word": "chimney",
        "meaning": "n. 烟囱",
        "example": "A tall brick chimney appears in the old factory photograph.",
        "exampleZh": "旧工厂照片上有一根高大的砖烟囱。"
      },
      {
        "word": "sea level",
        "meaning": "n. 海平面",
        "example": "The map gives the height of each hill above sea level.",
        "exampleZh": "地图标出了每座山丘的海拔高度。"
      },
      {
        "word": "double",
        "meaning": "adj./v. 双的；成双的；两倍的；使加倍",
        "example": "The hall has double doors wide enough for the display cases.",
        "exampleZh": "大厅有双扇门，宽度足够让展示柜通过。"
      },
      {
        "word": "ventilation",
        "meaning": "n. 通风；通风系统",
        "example": "Good ventilation keeps the crowded room comfortable.",
        "exampleZh": "良好的通风让拥挤的房间保持舒适。"
      },
      {
        "word": "fear",
        "meaning": "v./n. 担心；害怕；恐惧",
        "example": "We feared that the late train would make us miss the visit.",
        "exampleZh": "我们担心晚点的火车会让我们错过参观。"
      },
      {
        "word": "invasion",
        "meaning": "n. 入侵；侵略",
        "example": "The history display explains how an invasion changed the town.",
        "exampleZh": "历史展板介绍了一次入侵如何改变了这座城镇。"
      },
      {
        "word": "officially",
        "meaning": "adv. 正式地；官方地",
        "example": "The new visitor centre officially opened on Monday.",
        "exampleZh": "新游客中心于周一正式开放。"
      },
      {
        "word": "connect",
        "meaning": "v. 连接；联系",
        "example": "A covered path connects the library to the main building.",
        "exampleZh": "一条有顶步道把图书馆与主楼连接起来。"
      },
      {
        "word": "European",
        "meaning": "adj./n. 欧洲的；欧洲人",
        "example": "Our class compared street designs in three European cities.",
        "exampleZh": "我们班比较了三个欧洲城市的街道设计。"
      },
      {
        "word": "continent",
        "meaning": "n. 大洲；大陆",
        "example": "The game asks players to match countries to their continent.",
        "exampleZh": "这个游戏要求玩家把国家与所在大洲配对。"
      }
    ],
    "passage": {
      "en": "After our class visit to the transport museum, we reviewed a problem with the meeting point. Several students had waited at the old entrance because the printed map had not been updated. If we had checked the museum’s latest notice, we would have met at the correct gate. We also realised that, if one volunteer had stood by the old sign, fewer people might have been confused. Our teacher asked us to write a clearer plan for next time. The aim was to improve the process rather than blame the students.",
      "zh": "班级参观交通博物馆后，我们复盘了集合地点的问题。几位同学在旧入口等候，因为打印的地图没有更新。如果我们查看过博物馆的最新通知，就会在正确的大门集合。我们也意识到，如果安排一位志愿者站在旧标牌旁，可能就会少一些人感到困惑。老师请我们为下次写一份更清楚的计划。目的是改进流程，而不是责怪同学。"
    },
    "questions": [
      {
        "type": "choice",
        "prompt": "选择过去虚拟条件句：If we ___ earlier, we would have caught the bus.",
        "options": [
          "left tomorrow",
          "have leaving",
          "had left"
        ],
        "answers": [
          "had left"
        ],
        "explanation": "与过去事实相反的条件使用 had left。"
      },
      {
        "type": "choice",
        "prompt": "选择过去假设结果：If I had seen the notice, I ___ to the new gate.",
        "options": [
          "will have go",
          "would have gone",
          "would go yesterday"
        ],
        "answers": [
          "would have gone"
        ],
        "explanation": "过去虚拟的主句为 would have + 过去分词 gone。"
      },
      {
        "type": "choice",
        "prompt": "根据语境选词：The two buildings are joined by a ___. People can walk through it underground.",
        "options": [
          "tunnel",
          "chimney",
          "continent"
        ],
        "answers": [
          "tunnel"
        ],
        "explanation": "可在地下穿过的通道是 tunnel。"
      },
      {
        "type": "choice",
        "prompt": "阅读短文：为什么部分同学去了旧入口？",
        "options": [
          "The latest notice told them to go there.",
          "The teacher wanted them to miss the visit.",
          "The printed map had not been updated."
        ],
        "answers": [
          "The printed map had not been updated."
        ],
        "explanation": "旧版打印地图导致同学前往旧入口。"
      },
      {
        "type": "text",
        "prompt": "用过去虚拟条件句翻译：如果我看到了通知，我就会等候。固定开头 If I had seen the notice，主句使用 would have waited。",
        "answers": [
          "If I had seen the notice, I would have waited."
        ],
        "explanation": "条件 had seen 和结果 would have waited 都指与事实相反的过去。"
      },
      {
        "type": "ordering",
        "prompt": "排列词语，表达“如果我们问过，就会知道了”；以 If 开头。",
        "tokens": [
          "If",
          "we",
          "had",
          "asked,",
          "we",
          "would",
          "have",
          "known."
        ],
        "answers": [
          "If we had asked, we would have known."
        ],
        "explanation": "过去虚拟条件为 had asked，结果为 would have known。"
      }
    ],
    "sourcePages": [
      295,
      296,
      297
    ]
  }
];

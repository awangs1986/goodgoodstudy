// Independently authored daily-life practice. Only vocabulary and grammar targets follow the source syllabus.
const v = (word, meaning, example, exampleZh) => ({ word, meaning, example, exampleZh });
const g = (title, explanation, pairs) => ({ title, explanation, examples: pairs.map(([en, zh]) => ({ en, zh })) });
const c = (prompt, options, answer, explanation) => ({ type: 'choice', prompt, options, answers: [answer], explanation });
const t = (prompt, answers, explanation) => ({ type: 'text', prompt, answers, explanation });
const o = (prompt, sentence, explanation, alternatives = []) => {
  const words = sentence.split(' ');
  const pivot = Math.ceil(words.length / 2);
  const start = words.slice(0, 2).join(' ');
  const adverbHint = words.includes('already') ? '；already 放在助动词后' : words.includes('never') ? '；never 放在助动词后' : '';
  const hasFinalTime = /\b(?:today|tomorrow|yesterday|very late|at (?:one|two|three|four|five|six|seven|eight|nine|ten)|on (?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday) afternoons|last (?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)|(?:before|after) (?:lunch|dinner|school|we left|you borrow books)|for several years)[.!?]?$/.test(sentence);
  const timeHint = hasFinalTime ? '；时间信息放在句末' : '';
  const directions = `${prompt}（以“${start}”开头${timeHint}${adverbHint}。）`;
  return { type: 'ordering', prompt: directions, tokens: [...words.slice(pivot), ...words.slice(0, pivot)], answers: [sentence, ...alternatives], explanation };
};
export const lessons = [
{
  sourceLesson: 1, title: '午餐盒上的名字', scene: '教室失物招领', goal: '按照人物、动作、对象的顺序说明发生的事。',
  grammar: g('简单陈述句的语序', '英语陈述句通常先说谁，再说做什么，最后说动作的对象。表示地点和时间的信息常放在后面。不要照搬中文把宾语随意放在动词前。', [['Ming carried two boxes into the classroom.', '明把两个盒子搬进了教室。'], ['Our teacher checked the names after lunch.', '午饭后，老师核对了名字。']]),
  vocabulary: [
    v('private', '私人的；不公开的', 'Please keep your private messages off the classroom screen.', '请不要把私人消息显示在教室屏幕上。'),
    v('conversation', '交谈；谈话', 'We had a short conversation about our homework.', '我们简短地聊了聊作业。'),
    v('theatre', '剧院；剧场（美式常拼作 theater）', 'The new theatre is next to our school.', '新剧院在我们学校旁边。'),
    v('seat', '座位', 'There is an empty seat near the window.', '窗边有一个空座位。'),
    v('play', '戏剧；剧本', 'Our class is writing a play about school life.', '我们班正在写一部关于校园生活的戏剧。'),
    v('loudly', '大声地', 'Please speak loudly enough for the back row.', '请说得大声些，让后排也能听见。'),
    v('angry', '生气的', 'Dad was angry about the broken window.', '爸爸因窗户被打破而生气。'),
    v('angrily', '生气地', 'She closed her notebook angrily and took a deep breath.', '她生气地合上笔记本，深吸了一口气。'),
    v('attention', '注意；注意力', 'The red label caught my attention.', '红色标签引起了我的注意。'),
    v('bear', '忍受；承受（过去式 bore，过去分词 borne）', 'I cannot bear the smell of burnt milk.', '我受不了牛奶烧焦的味道。'),
    v('business', '事情；事务；生意', 'The club has some important business to discuss.', '社团有一些重要事务要讨论。'),
    v('rudely', '无礼地；粗鲁地', 'The customer spoke rudely to the young worker.', '那位顾客对年轻工作人员说话很无礼。')
  ],
  passage: { en: 'Two blue lunch boxes sat on our classroom shelf. I opened one and found noodles. My lunch was rice, so I closed it immediately. After class, I asked Jia about the boxes. We had a short conversation and checked the names underneath. She took her noodles, and I found my rice. Now we put our names on the lids.', zh: '两个蓝色午餐盒放在教室架子上。我打开一个，发现里面是面条。我的午饭是米饭，所以我马上盖上了它。下课后，我问佳这两个盒子是谁的。我们简短交谈，并查看了底部的名字。她拿走了面条，我也找到了米饭。现在我们把名字写在盒盖上。' },
  questions: [
    c('选择符合正常陈述句语序的句子。', ['Lin checked the label carefully.', 'Lin the label checked carefully.', 'Checked Lin carefully the label.'], 'Lin checked the label carefully.', '先是主语 Lin，再是动词 checked，最后是宾语 the label。'),
    c('补全句子：Our teacher ___ the boxes on the shelf.', ['the names read', 'put', 'on put'], 'put', '主语后需要动词；put 后面接动作对象 the boxes。'),
    c('“请注意名字。”这里的“注意”对应哪一个词？', ['business', 'attention', 'seat'], 'attention', 'pay attention to 表示注意某人或某事。'),
    c('根据短文，“我”为什么马上盖上第一个饭盒？', ['饭盒是空的。', '面条太热了。', '里面的食物不是自己的午饭。'], '里面的食物不是自己的午饭。', '自己的午饭是米饭，打开后却看到面条。'),
    t('用给定顺序组成完整句：I / checked / the name。使用一般过去时。', ['I checked the name.'], 'checked 已经是过去式；句子依次交代人物、动作和对象。'),
    o('排列单词，表达“佳把她的盒子放在了架子上”。', 'Jia put her box on the shelf.', 'put 后紧接宾语 her box，地点 on the shelf 放在后面。')
  ], sourcePages: [15, 16]
},
{
  sourceLesson: 2, title: '放学后的一通电话', scene: '家庭与校园联系', goal: '区分每天的习惯和此刻正在进行的动作。',
  grammar: g('一般现在时与现在进行时', '经常发生的事用一般现在时，常与 usually、every day 连用。正在发生的事用 am/is/are 加动词-ing。第三人称单数的一般现在时动词通常加-s。', [['Bo usually walks home with his cousin.', '博通常和表弟一起走回家。'], ['He is waiting for the bus today.', '他今天正在等公交车。']]),
  vocabulary: [
    v('until', '直到……为止', 'The library stays open until six.', '图书馆一直开放到六点。'),
    v('outside', '在外面', 'My bicycle is outside.', '我的自行车在外面。'),
    v('ring', '（铃、电话等）响（rang, rung）', 'My phone rings when the washing is ready.', '衣服洗好时，我的手机会响。'),
    v('aunt', '姑妈；姨妈；伯母；婶婶；舅妈', 'My aunt teaches at a primary school.', '我阿姨在一所小学教书。'),
    v('repeat', '重复；再说一遍', 'Could you repeat the room number?', '你能再说一遍房间号吗？')
  ],
  passage: { en: 'My aunt usually calls me after school. Today my phone is ringing while I am packing my bag. She is outside the school, but I cannot leave yet. Our club meets until five on Tuesdays. I explain this and ask her to repeat her plan. She is going to the nearby bookshop. We can meet there after the club.', zh: '阿姨通常放学后给我打电话。今天，我正在收拾书包，手机响了。她在校外，但我还不能走。我们社团每周二活动到五点。我向她解释，并请她再说一遍计划。她正要去附近的书店。社团活动结束后，我们可以在那里碰面。' },
  questions: [
    c('补全习惯：My aunt usually ___ me on Fridays.', ['is calling', 'call', 'calls'], 'calls', 'usually 表示习惯，第三人称单数主语搭配 calls。'),
    c('补全此刻的动作：Look! Wei ___ his bag.', ['is carrying', 'carry', 'carried'], 'is carrying', 'Look 提示眼前发生的事，用 is carrying。'),
    c('你没听清地址，想请对方再说一次，应选哪个动词？', ['ring', 'repeat', 'leave'], 'repeat', 'repeat 指把已经说过的内容再说一遍。'),
    c('根据短文，阿姨会去哪里等？', ['附近的书店', '社团教室', '家里的厨房'], '附近的书店', '阿姨要去附近的书店，两人活动后在那里碰面。'),
    t('用现在进行时完成句子，只填两个词：He ___ ___ outside.（wait）', ['is waiting'], 'He 后使用 is，再接 waiting。'),
    o('排列单词，表达“我们社团每周二下午活动”。', 'Our club meets on Tuesday afternoons.', '一般现在时 meets 描述固定活动，时间放在句末。')
  ], sourcePages: [19, 20]
},
{
  sourceLesson: 3, title: '雨天改了计划', scene: '周末朋友出行', goal: '用一般过去时讲清已经结束的小事件。',
  grammar: g('一般过去时的肯定句和问句', '过去已经结束的动作使用动词过去式。提问用 Did 加主语加动词原形；否定用 did not 加原形。不要在 did 后再把实义动词变成过去式。', [['We visited the science room on Saturday.', '我们周六参观了科学活动室。'], ['Did you bring your student card?', '你带学生证了吗？']]),
  vocabulary: [
    v('send', '发送；寄送（sent, sent）', 'Please send the photo to our class group.', '请把照片发到班级群里。'),
    v('postcard', '明信片', 'I keep a postcard from Hangzhou on my desk.', '我把一张来自杭州的明信片放在桌上。'),
    v('spoil', '破坏；使扫兴（spoiled/spoilt）', 'A wet notebook did not spoil our day.', '笔记本湿了并没有破坏我们的好心情。'),
    v('museum', '博物馆', 'The museum has a room full of old bicycles.', '这家博物馆有一间屋子摆满旧自行车。'),
    v('public', '公共的；向公众开放的', 'There is a public drinking fountain in the park.', '公园里有一个公共饮水处。'),
    v('friendly', '友好的', 'The new student gave us a friendly smile.', '新同学友好地朝我们笑了笑。'),
    v('waiter', '（通常指男性）餐厅服务员', 'The waiter brought an extra bowl for my brother.', '服务员给我弟弟多拿了一个碗。'),
    v('lend', '借出（lent, lent）；lend something to someone', 'Can you lend your ruler to me?', '你能把尺子借给我吗？'),
    v('decision', '决定', 'We made the decision together.', '我们一起作出了决定。'),
    v('whole', '整个的；完整的', 'I spent the whole afternoon on my model.', '我花了一整个下午做模型。'),
    v('single', '单一的；一个的', 'We did not leave a single bottle on the beach.', '我们没有在海滩上留下一个瓶子。')
  ],
  passage: { en: 'We planned a picnic last Saturday, but it rained all morning. Mei suggested the public sports centre instead. I sent a message to our friends, and everyone agreed. We played table tennis for an hour. Then a friendly worker lent us a ball for another game. The rain changed our decision, but it did not spoil the whole day.', zh: '上周六我们原本计划野餐，但整个上午都在下雨。梅建议改去公共体育中心。我给朋友们发了消息，大家都同意了。我们打了一小时乒乓球。然后一位友好的工作人员借给我们一个球，让我们玩另一项运动。雨改变了我们的决定，却没有毁掉整天的好心情。' },
  questions: [
    c('补全过去发生的事：Yesterday I ___ a message to Rui.', ['send', 'sent', 'sending'], 'sent', 'Yesterday 表示过去；send 的过去式是 sent。'),
    c('补全问句：Did you ___ table tennis?', ['played', 'playing', 'play'], 'play', 'did 后面的实义动词用原形。'),
    c('朋友说“我可以把球借给你”，应使用哪个动词表示借出？', ['lend', 'spoil', 'spend'], 'lend', 'lend 表示从拥有者一方把物品借出去。'),
    c('根据短文，大家为什么改去体育中心？', ['他们丢了球。', '上午一直在下雨。', '野餐地点太远了。'], '上午一直在下雨。', '原本要野餐，但整上午的雨使大家改变了计划。'),
    t('改成一般过去时，只填一个词：We ___ the plan yesterday.（change）', ['changed'], 'change 的过去式是在词尾加-d。'),
    o('排列单词，问“你的朋友们喜欢这场比赛吗？”', 'Did your friends enjoy the game?', 'Did 位于句首，主语后接动词原形 enjoy。')
  ], sourcePages: [23, 24]
},
{
  sourceLesson: 4, title: '第一次参加交换活动', scene: '线上校际交流', goal: '用现在完成时说明截至目前已有的经历或成果。',
  grammar: g('现在完成时', 'have/has 加过去分词把过去的动作与现在连接起来，可以表达已有的经历或刚完成的事。ever 常用于问经历，never 表示从未。持续到现在的状态还可搭配 for 加一段时间。明确说 yesterday 等结束的过去时间时，通常改用一般过去时。', [['I have been in the school reading group for three months.', '我加入学校阅读小组已经三个月了。'], ['Has your cousin ever studied abroad?', '你表姐有过在国外学习的经历吗？']]),
  vocabulary: [
    v('exciting', '令人兴奋的；刺激的', 'Building our first robot was exciting.', '制造我们的第一台机器人很令人兴奋。'),
    v('receive', '收到；接到', 'Did you receive the timetable this morning?', '你今天早上收到时间表了吗？'),
    v('firm', '公司；商行', 'My mother works for a small design firm.', '我妈妈在一家小型设计公司工作。'),
    v('different', '不同的', 'These two apps use different passwords.', '这两个应用使用不同的密码。'),
    v('centre', '中心（美式常拼作 center）', 'The youth centre offers free drawing classes.', '青少年中心提供免费的绘画课。'),
    v('abroad', '在国外；到国外（前面不加 to）', 'My cousin wants to work abroad for a year.', '我表姐想去国外工作一年。')
  ],
  passage: { en: 'Our class has joined an online exchange project. We have received a video from students at a different school. They show us their classrooms and their sports centre. I have never been abroad, so this is exciting for me. My partner and I have already made a short video about our school lunch. We still need to add English names for the dishes.', zh: '我们班参加了一个线上交流项目。我们收到了另一所学校学生发来的视频。他们展示了教室和体育中心。我从未出过国，所以这让我很兴奋。我和搭档已经制作了一段介绍学校午餐的短视频。我们还需要加上菜品的英文名称。' },
  questions: [
    c('补全已有的成果：We ___ already made our video.', ['has', 'have', 'are'], 'have', 'We 搭配 have，再接过去分词 made。'),
    c('询问到目前为止的经历：___ you ever joined an exchange project?', ['Did', 'Are', 'Have'], 'Have', 'Have you ever 加过去分词用来询问已有的经历。'),
    c('“到国外学习”中“到国外”应选哪一项？', ['abroad', 'to abroad', 'at abroad'], 'abroad', 'abroad 是副词，go/study abroad 不需要在前面加介词。'),
    c('根据短文，小组的视频还缺什么？', ['教室的照片', '同学的姓名', '菜品的英文名称'], '菜品的英文名称', '最后一句说明还需要给菜品加上英文名称。'),
    t('用 receive 的现在完成时补全句子，只填两个词：I ___ ___ your video.', ['have received'], 'I 搭配 have，receive 的过去分词是 received。'),
    o('排列单词，表达“她从未去过其他国家”。', 'She has never visited another country.', 'never 通常放在助动词 has 和过去分词 visited 之间。')
  ], sourcePages: [27, 28]
},
{
  sourceLesson: 5, title: '单车又能骑了', scene: '社区修车点', goal: '区分带明确过去时间的事件和影响现在的完成情况。',
  grammar: g('一般过去时与现在完成时对照', 'last week、yesterday 等明确结束的时间常配一般过去时。谈“现在已经做好了吗”则常用现在完成时，强调眼下的结果。相同动作可以因关注点不同而使用不同的时态。', [['The worker checked my bicycle yesterday.', '工作人员昨天检查了我的自行车。'], ['She has repaired the brake, so it works now.', '她已经修好刹车，所以现在可以用了。']]),
  vocabulary: [
    v('pigeon', '鸽子', 'A pigeon landed beside the bus stop.', '一只鸽子落在公交站旁边。'),
    v('message', '消息；口信', 'I left a message for the repair shop.', '我给维修店留了言。'),
    v('cover', '行过（一段路程）；覆盖', 'Our walking group covered five kilometres today.', '我们的步行小组今天走了五公里。'),
    v('distance', '距离', 'What is the distance between the two stations?', '这两个车站之间有多远？'),
    v('request', '请求；要求', 'The librarian agreed to my request for more time.', '图书管理员同意了我延长借阅时间的请求。'),
    v('spare part', '备用零件；备件', 'The shop ordered a spare part for our fan.', '商店为我们的风扇订了一个备件。'),
    v('service', '服务；服务业务', 'The bike shop offers a free checking service.', '这家自行车店提供免费的检查服务。')
  ],
  passage: { en: 'My bicycle made a strange noise on Monday. I took it to the community repair shop after school. The worker checked it and ordered a spare part. Today I have received a message: my bicycle is ready. The shop has also checked the lights. I can collect it this afternoon and ride the short distance home instead of walking.', zh: '星期一，我的自行车发出了奇怪的声音。放学后，我把它送到社区修车店。工作人员检查后订了一个备件。今天，我收到了一条消息：自行车修好了。店里还检查了车灯。我下午可以去取，然后骑完回家的这段短路，不用步行了。' },
  questions: [
    c('有明确过去时间：The worker ___ the lights yesterday.', ['has checked', 'checks', 'checked'], 'checked', 'yesterday 是已经结束的过去时间，用一般过去时。'),
    c('强调现在的结果：The worker ___ the repair, so I can use my bike now.', ['has finished', 'will finish', 'is starting'], 'has finished', 'has finished 表示修理已经完成，后半句说明现在可以用车。'),
    c('自行车坏了，需要换一个备用零件。应向店员询问什么？', ['a distance', 'a spare part', 'a pigeon'], 'a spare part', 'spare part 指可以替换损坏部件的备件。'),
    c('根据短文，“我”为什么今天能骑车回家？', ['借到了同学的车。', '自行车已经修好了。', '学校送了一辆新车。'], '自行车已经修好了。', '今天收到的消息说车已经可以取了。'),
    t('只填 send 的一般过去式：The shop ___ me a message last night.', ['sent'], 'last night 提示过去时间；send 的过去式是 sent。'),
    o('排列单词，表达“他们已经检查过两个车灯了”。', 'They have already checked both lights.', 'already 放在 have 和过去分词 checked 之间。')
  ], sourcePages: [31, 32]
},
{
  sourceLesson: 6, title: '给新同学准备午饭', scene: '校园友好互助', goal: '用 a、the、some 清楚介绍和再次指代人或物。',
  grammar: g('a、the 与 some', '首次提到一个可数单数名词时常用 a/an；再次提及同一个东西或双方都清楚的东西时用 the。some 可放在复数名词或不可数名词前，表示不确定的数量。', [['I packed a sandwich and some fruit.', '我装了一个三明治和一些水果。'], ['The sandwich is for my new classmate.', '这个三明治是给我的新同学的。']]),
  vocabulary: [
    v('beggar', '乞讨者（描述人的处境时应尊重对方）', 'The report described how a local charity helped a beggar find shelter.', '报道介绍了一家当地慈善机构如何帮助一位乞讨者找到住处。'),
    v('food', '食物（通常不可数）', 'There is enough food for everyone at the picnic.', '野餐的食物足够大家吃。'),
    v('pocket', '衣袋；口袋', 'I found my bus card in my jacket pocket.', '我在夹克口袋里找到了公交卡。'),
    v('call', '拜访；到访；也可指打电话', 'Our neighbour called at our flat to return a bowl.', '邻居来我们家归还一个碗。')
  ],
  passage: { en: 'A new student joined our class today. At lunchtime, she found that her food was still at home. I had a sandwich and some fruit in my bag. We shared the food at a table near the window. Later, she found a small note in her pocket. It was from her dad: remember your lunch! We both smiled.', zh: '今天班里来了一位新同学。午饭时，她发现自己的食物还留在家里。我的包里有一个三明治和一些水果。我们在靠窗的一张桌子旁分享了食物。后来，她在口袋里找到一张小纸条，是爸爸写的：记得带午饭！我们都笑了。' },
  questions: [
    c('首次介绍一个物品：I found ___ banana in my bag.', ['a', 'the', 'some'], 'a', 'banana 是单数可数名词，首次提到用 a。'),
    c('再次提到同一个香蕉：I took out a banana. ___ banana was for Lei.', ['A', 'The', 'Some'], 'The', '第二句指刚提到的同一个香蕉，用 the。'),
    c('衣服上用来装卡片的小袋子叫什么？', ['food', 'shelter', 'pocket'], 'pocket', 'pocket 是衣袋或口袋。'),
    c('根据短文，新同学的午饭在哪里？', ['家里', '公交车上', '窗边的桌上'], '家里', '她在午餐时才发现食物还在家里。'),
    t('填入 a、an 或 some：Please bring ___ water for the walk.', ['some'], 'water 是不可数名词，这里用 some 表示一些水。'),
    o('排列单词，表达“我的包里有一些水果”。', 'There is some fruit in my bag.', 'fruit 此处作为不可数名词，搭配 is 和 some。')
  ], sourcePages: [35, 36]
},
{
  sourceLesson: 7, title: '航模展台前', scene: '科学社团参观', goal: '用过去进行时交代过去某一刻正在发生的事。',
  grammar: g('过去进行时与一般过去时', 'was/were 加动词-ing 表示过去某一刻正在进行的动作。较短的动作可用一般过去时，放在 when 从句中，说明它发生时另一件事正在进行。', [['We were drawing a map at four yesterday.', '昨天四点，我们正在画地图。'], ['I was reading the sign when the guide arrived.', '导览员到来时，我正在读指示牌。']]),
  vocabulary: [
    v('detective', '侦探', 'The detective in our comic rides a folding bike.', '我们漫画里的侦探骑折叠自行车。'),
    v('airport', '机场（通常有旅客或货运设施）', 'We took the underground to the airport.', '我们乘地铁去了机场。'),
    v('expect', '期待；预计', 'We expect our science teacher to arrive at two.', '我们预计科学老师两点到。'),
    v('valuable', '贵重的；有价值的', 'Your advice was valuable to our team.', '你的建议对我们团队很有价值。'),
    v('parcel', '包裹', 'The parcel contains new paint for the art club.', '包裹里是给美术社团的新颜料。'),
    v('diamond', '钻石；金刚石', 'The museum displays a small diamond under bright lights.', '博物馆在明亮的灯光下展出一颗小钻石。'),
    v('steal', '偷（stole, stolen）', 'Someone tried to steal a bicycle outside the station.', '有人试图偷走车站外的一辆自行车。'),
    v('main', '主要的', 'Use the main entrance when you visit the school.', '来学校参观时请走正门。'),
    v('airfield', '飞机场；飞行场（可比大型机场设施简单）', 'The flying club practises at a small airfield.', '飞行俱乐部在一座小型飞行场训练。'),
    v('guard', '警卫；保安', 'The guard showed us where to park our bikes.', '保安告诉我们应该把自行车停在哪里。'),
    v('precious', '珍贵的；珍爱的', 'This photo is precious to my grandmother.', '这张照片对我奶奶来说非常珍贵。'),
    v('stone', '石头；石料', 'We painted a smiling face on a smooth stone.', '我们在一块光滑的石头上画了笑脸。'),
    v('sand', '沙；沙子（通常不可数）', 'Shake the sand out of your shoes before you come in.', '进来前把鞋里的沙子抖掉。')
  ],
  passage: { en: 'At the science fair, our club was showing a model airfield. I was explaining the main runway when a younger student raised her hand. She asked why it was so long. My partner found a video on the tablet, and we watched a plane take off. While it was playing, I moved the model plane slowly along our runway.', zh: '科学展上，我们社团正在展示一座飞行场模型。我正解释主跑道，一位低年级同学举起了手。她问跑道为什么那么长。我的搭档在平板上找到一段视频，我们看了一架飞机起飞。播放时，我沿着我们的跑道慢慢移动模型飞机。' },
  questions: [
    c('补全过去某一刻的动作：At three yesterday, we ___ our model.', ['are painting', 'were painting', 'paint'], 'were painting', '过去的明确时刻搭配过去进行时；we 使用 were。'),
    c('补全背景动作：I ___ the sign when a visitor asked a question.', ['was reading', 'read tomorrow', 'am reading'], 'was reading', '访客提问时，读指示牌的动作正在进行，用 was reading。'),
    c('表示“主要入口”应选择哪一项？', ['precious entrance', 'sand entrance', 'main entrance'], 'main entrance', 'main 表示主要的，可修饰入口或跑道。'),
    c('根据短文，低年级同学想知道什么？', ['展览什么时候结束。', '跑道为什么那么长。', '谁偷走了模型。'], '跑道为什么那么长。', '她指着主跑道询问其长度的原因。'),
    t('将 draw 变成过去进行时，只填两个词：She ___ ___ a plane at noon yesterday.', ['was drawing'], 'She 使用 was，draw 的-ing 形式是 drawing。'),
    o('排列单词，表达“我们当时正在一起看一段视频”。', 'We were watching a video together.', '主语 we 后用 were watching，再接宾语和方式信息。')
  ], sourcePages: [39, 40]
},
{
  sourceLesson: 8, title: '午休路线怎么选', scene: '校园步行路线', goal: '用比较级和最高级比较路线与设施。',
  grammar: g('形容词的比较级和最高级', '比较两者时常用比较级加 than；从三者或更多对象中选出最突出的一个时，用 the 加最高级。短词常加-er/-est，长词常配 more/most。good 的形式是 better/best。', [['The riverside route is quieter than the main road.', '河边路线比主路更安静。'], ['This is the safest path to the sports hall.', '这是去体育馆最安全的小路。']]),
  vocabulary: [
    v('competition', '比赛；竞赛', 'Our class entered a poster competition.', '我们班参加了海报比赛。'),
    v('neat', '整洁的；整齐的', 'Her notes are neat and easy to read.', '她的笔记整齐，读起来很清楚。'),
    v('path', '小路；步道', 'Follow the path beside the running track.', '沿着跑道旁的小路走。'),
    v('wooden', '木制的', 'We keep the board games in a wooden box.', '我们把桌游放在一个木盒里。'),
    v('pool', '水池；游泳池', 'The school pool opens at four on Fridays.', '学校游泳池周五四点开放。')
  ],
  passage: { en: 'We have three routes from our classroom to the sports hall. The path beside the pool is the shortest, but it gets wet. The road near the gate is wider and busier. I prefer the route past the wooden seats. It is the quietest of the three. On busy school days, a calm five-minute walk helps me feel ready for afternoon lessons.', zh: '从教室到体育馆有三条路线。游泳池旁的小路最短，但会变湿。校门附近的路更宽，也更繁忙。我更喜欢经过木座椅的路线。它是三条路中最安静的。忙碌的上学日里，安静地走五分钟能让我为下午的课做好准备。' },
  questions: [
    c('比较两条路：This path is ___ than that road.', ['shortest', 'shorter', 'the short'], 'shorter', '有 than 并比较两个对象，使用比较级 shorter。'),
    c('从三条路线中选出最安静的一条：It is ___ route of the three.', ['quieter', 'quiet', 'the quietest'], 'the quietest', '三者之间选“最……”，用 the 加最高级。'),
    c('“木制长椅”中的“木制的”应选哪个词？', ['wooden', 'neat', 'wide'], 'wooden', 'wooden 描述材料是木头。'),
    c('根据短文，“我”喜欢经过木座椅的路线，主要是因为它怎样？', ['最短', '最安静', '最繁忙'], '最安静', '短文明确说这条路线是三条中最安静的。'),
    t('填入 good 的比较级：This route is ___ than the wet path for carrying books.', ['better'], 'good 的比较级是不规则形式 better。'),
    o('排列单词，表达“新路比旧路更宽”。', 'The new path is wider than the old one.', '比较结构是形容词比较级 wider 加 than。')
  ], sourcePages: [43, 44]
},
{
  sourceLesson: 9, title: '周六换书见', scene: '社区换书活动', goal: '准确表达几点、哪天、哪个月份以及活动持续到何时。',
  grammar: g('时间介词', '几点钟用 at，具体某天或某天上午用 on，月份、年份和一般的早晚用 in。until 指一直到某个终点；from...till/from...to 同时交代起止时刻。during 后接活动或一段时间的名词，表示在那段时间里。', [['The drawing lesson begins at half past nine.', '绘画课九点半开始。'], ['In November, we practise on Fridays from four till five.', '十一月，我们每周五从四点练习到五点。']]),
  vocabulary: [
    v('welcome', '欢迎；迎接（可作名词或动词）', 'The volunteers gave the new members a warm welcome.', '志愿者热情欢迎了新成员。'),
    v('crowd', '人群', 'A small crowd watched the street artist.', '一小群人在观看街头艺人表演。'),
    v('gather', '聚集；集合', 'Please gather beside the blue door.', '请在蓝门旁集合。'),
    v('hand', '（钟表的）指针；也可指手', 'The long hand of the clock points to six.', '钟表的长针指向六。'),
    v('shout', '喊叫；大声说', 'You do not need to shout across the quiet room.', '房间很安静，你不必隔着房间大喊。'),
    v('refuse', '拒绝', 'You can refuse an invitation politely.', '你可以礼貌地拒绝邀请。'),
    v('laugh', '笑；发笑', 'The puppy made my little brother laugh.', '小狗逗得我弟弟笑了。')
  ],
  passage: { en: 'Our neighbourhood book swap opens at ten on Saturday morning. Volunteers gather at nine to sort the books. I will help at the welcome desk until noon. During the event, readers can leave a book and choose another one. My cousin wants a funny story that will make her laugh. I hope to find a book about space.', zh: '社区换书活动周六上午十点开始。志愿者九点集合整理图书。我会在接待台帮忙到中午。活动期间，读者可以留下一本书，再选一本带走。表妹想找一个能逗她笑的有趣故事。我希望找到一本关于太空的书。' },
  questions: [
    c('填入时间介词：The event starts ___ eleven o’clock.', ['on', 'at', 'in'], 'at', '具体钟点前用 at。'),
    c('填入时间介词：We will meet ___ Sunday afternoon.', ['in', 'at', 'on'], 'on', '具体某一天的下午前用 on。'),
    c('志愿者要在入口“集合”，应使用哪个词？', ['gather', 'refuse', 'laugh'], 'gather', 'gather 表示到同一地点聚集。'),
    c('根据短文，“我”在接待台帮忙到什么时候？', ['九点', '中午', '晚上十点'], '中午', 'until noon 表示一直到中午。'),
    t('从 during 或 until 中选择，表示“在活动期间”：___ the event, visitors can exchange books.', ['During'], 'during 后可接 the event，表示在整个活动时段中。'),
    o('排列单词，表达“志愿者们将于九点集合”。', 'The volunteers will gather at nine.', '具体时刻 nine 前用 at。')
  ], sourcePages: [47, 48]
},
{
  sourceLesson: 10, title: '纸盒也能做乐器', scene: '学校创意音乐课', goal: '用被动语态介绍物品的制作和使用。',
  grammar: g('一般现在时和一般过去时的被动语态', '当重点是物品受到什么动作时，可用 be 加过去分词。一般现在时用 am/is/are，一般过去时用 was/were。需要说明动作执行者时，可加 by。', [['These bags are made from old clothes.', '这些包是用旧衣服做的。'], ['The display was designed by our class.', '展板是我们班设计的。']]),
  vocabulary: [
    v('jazz', '爵士乐', 'My sister listens to jazz while she draws.', '姐姐画画时听爵士乐。'),
    v('musical', '音乐的；与音乐有关的', 'We tried a musical game in English class.', '我们在英语课上尝试了一个音乐游戏。'),
    v('instrument', '乐器；仪器', 'Which instrument would you like to learn?', '你想学哪一种乐器？'),
    v('clavichord', '击弦古钢琴（一种历史悠久的键盘乐器，日常较少见）', 'Our music worksheet has a picture of a clavichord.', '我们的音乐学习单上有一张击弦古钢琴的图片。'),
    v('recently', '最近；近来', 'I have recently started learning the drums.', '我最近开始学鼓。'),
    v('damage', '损坏；损伤（此处作动词）', 'Heavy rain can damage paper decorations.', '大雨会损坏纸质装饰品。'),
    v('key', '琴键；按键；也可指钥匙', 'Press one key gently and listen to the note.', '轻轻按下一个琴键，听听这个音。'),
    v('string', '（乐器的）弦；细绳', 'One string on my guitar needs replacing.', '我的吉他有一根弦需要更换。'),
    v('shock', '使震惊；使十分吃惊', 'The amount of plastic waste shocked our class.', '塑料垃圾的数量让我们全班震惊。'),
    v('allow', '允许；准许', 'The teacher allows us to practise during lunch break.', '老师允许我们在午休时练习。'),
    v('touch', '触碰；接触', 'Please wash your hands before you touch the food.', '接触食物之前请洗手。')
  ],
  passage: { en: 'Our music room has a new set of instruments. They were made by students from empty boxes and clean bottles. A large box is used as a drum. The bottles are filled with different amounts of water. We touch them gently with small sticks to make notes. Our teacher has recently started a group, and everyone is allowed to try.', zh: '音乐教室有了一套新乐器。它们是学生用空盒子和干净瓶子做的。一个大盒子被当作鼓。瓶子里装着不同量的水。我们用小棒轻轻碰它们来发出音符。老师最近成立了一个小组，每个人都可以尝试。' },
  questions: [
    c('物品受到动作：The instruments ___ by students last week.', ['made', 'were made', 'was make'], 'were made', '主语为复数，过去时被动结构是 were made。'),
    c('描述日常用途：This box ___ as a drum.', ['is used', 'uses', 'is using'], 'is used', '盒子是被使用的对象，用 is used。'),
    c('吉他上可以拨动、用来发声的细线叫什么？', ['a key', 'a box', 'a string'], 'a string', 'string 可指弦乐器上的弦。'),
    c('根据短文，瓶子里装的水有什么不同？', ['颜色不同', '水量不同', '温度不同'], '水量不同', 'different amounts of water 指不同的水量。'),
    t('填入 make 的过去分词：The small drum was ___ from a clean box.', ['made'], '被动语态中的 be 后接过去分词 made。'),
    o('排列单词，表达“这些瓶子被用于音乐课”。', 'These bottles are used in music lessons.', '复数主语 these bottles 搭配 are used。')
  ], sourcePages: [51, 52]
},
{
  sourceLesson: 11, title: '职业日的小采访', scene: '校园职业体验', goal: '结合时间线索，复习习惯、已结束的事和当前进展。',
  grammar: g('常用时态综合复习', '平时习惯用一般现在时，眼前动作用现在进行时；结束的过去事件用一般过去时，过去某刻正在做的事用过去进行时；截至现在的成果用现在完成时。重点是动作的承受者时，再用 be 加过去分词构成被动语态。', [['I was writing when the teacher came in.', '老师进来时，我正在写字。'], ['The interview was recorded by two students.', '这段采访是两名学生录下来的。']]),
  vocabulary: [
    v('turn', '行为；举动；a good turn 指一件善意的事', 'Sharing your notes with an absent classmate is a good turn.', '把笔记分享给缺课同学是一件善意的事。'),
    v('deserve', '应得；值得', 'The volunteers deserve a warm thank-you.', '志愿者们值得一句热情的感谢。'),
    v('lawyer', '律师', 'A lawyer answered our questions on careers day.', '职业日上，一位律师回答了我们的问题。'),
    v('bank', '银行', 'The bank is opposite the post office.', '银行在邮局对面。'),
    v('salary', '工资；通常指定期领取的薪金', 'The job notice lists the hours and the monthly salary.', '招聘通知列出了工时和月薪。'),
    v('immediately', '立即；马上', 'Please tell the teacher immediately if the screen stops working.', '如果屏幕停止工作，请马上告诉老师。')
  ],
  passage: { en: 'Yesterday our class interviewed a lawyer during careers day. We asked about her work, but we did not ask about her salary. She explained how she helps people understand difficult documents. I was writing notes while my partner was recording the interview. We have already checked the recording. Now we are choosing a short part to share at our next class meeting.', zh: '昨天职业日期间，我们班采访了一位律师。我们问了她的工作，但没有问她的工资。她解释自己如何帮助人们理解复杂的文件。我在记笔记时，搭档正在为采访录音。我们已经检查过录音。现在，我们正在挑选一个简短片段，准备在下次班会上分享。' },
  questions: [
    c('录音是被保存的：The recording ___ on the school computer yesterday.', ['was saved', 'saved', 'is saving'], 'was saved', 'recording 是动作的承受者，过去时被动结构是 was saved。'),
    c('补全已结束的事件：Our class ___ three guests yesterday.', ['interviewed', 'has interviewed', 'is interviewing'], 'interviewed', 'yesterday 明确限定了过去时间。'),
    c('招聘信息中的“月薪”应该写成什么？', ['monthly turn', 'monthly salary', 'monthly bank'], 'monthly salary', 'salary 是工资；monthly salary 表示月薪。'),
    c('根据短文，采访时搭档做了什么？', ['去银行办事', '记录了采访的声音', '询问了律师工资'], '记录了采访的声音', '搭档 recorded the interview，说明进行了录音。'),
    t('根据“此刻”填写 check 的现在进行时，只填两个词：We ___ ___ the sound now.', ['are checking'], 'We 搭配 are，加 checking 表示正在检查。'),
    o('排列单词，表达“我们小组已经完成了采访”。', 'Our group has already finished the interview.', '单数集体名词 group 在这里搭配 has finished。')
  ], sourcePages: [55, 56]
},
{
  sourceLesson: 12, title: '水上课堂前一天', scene: '学校组织的港口参观', goal: '用 will 说明将来的安排、预测和临时决定。',
  grammar: g('will 表示将来', 'will 后接动词原形，不随主语人称变化。否定可用 will not 或 won’t。提问把 will 放在主语前。shall 在现代日常英语中较少用于普通将来陈述，常见于 Shall we...? 这样的建议。', [['We will bring our notebooks tomorrow.', '我们明天会带笔记本。'], ['Will the guide meet us at the gate?', '导览员会在门口接我们吗？']]),
  vocabulary: [
    v('luck', '运气；好运', 'Good luck with your first basketball match!', '祝你的第一场篮球比赛顺利！'),
    v('captain', '船长；队长', 'The captain will explain the safety rules.', '船长会讲解安全规则。'),
    v('sail', '乘船航行；（船）航行', 'The small boat sails across the lake every morning.', '这条小船每天早晨驶过湖面。'),
    v('harbour', '港口；港湾（美式常拼作 harbor）', 'We drew the colourful boats in the harbour.', '我们画了港口里五颜六色的船。'),
    v('proud', '自豪的；骄傲的', 'I am proud of my sister for helping her team.', '我为姐姐帮助团队而自豪。'),
    v('important', '重要的', 'It is important to listen before asking questions.', '提问前认真听很重要。')
  ],
  passage: { en: 'Tomorrow our class will visit a working harbour. We will meet a captain and learn how goods arrive by sea. Our teacher says we will stay on the marked path. I will bring a notebook because I want to draw the boats. We will not sail anywhere on this visit, but we will watch a large ship leave.', zh: '明天我们班将参观一座正在运作的港口。我们会见到一位船长，了解货物如何经海路运来。老师说我们会待在标出的通道上。我会带笔记本，因为我想画船。这次参观不会出海，但我们会观看一艘大船离港。' },
  questions: [
    c('补全将来安排：Our teacher will ___ the route tomorrow.', ['explains', 'explained', 'explain'], 'explain', 'will 后接动词原形 explain。'),
    c('选择正确的将来时问句。', ['Will you bring a notebook?', 'Do will you bring a notebook?', 'Will you brings a notebook?'], 'Will you bring a notebook?', '问句把 will 放在主语前，后面仍用动词原形。'),
    c('海边供船只停靠的地方叫什么？', ['a captain', 'a harbour', 'luck'], 'a harbour', 'harbour 指港口或港湾。'),
    c('根据短文，这次参观会做什么？', ['乘大船远航', '观看一艘大船离港', '参加游泳比赛'], '观看一艘大船离港', '末句说大家不会出海，但会看一艘大船离开。'),
    t('把 will 的否定写进空格，接受完整形式或缩写：We ___ leave the marked path.', ['will not', "won't"], 'will not 和 won’t 都能表示将来不会。'),
    o('排列单词，表达“我们班明天将参观港口”。', 'Our class will visit the harbour tomorrow.', 'will visit 表示将来，tomorrow 说明时间。')
  ], sourcePages: [59, 60]
},
{
  sourceLesson: 13, title: '周日下午我有任务', scene: '社区义卖志愿服务', goal: '用将来进行时说明未来某个时段正在做的事。',
  grammar: g('将来进行时', 'will be 加动词-ing 描述将来某个时刻或时段正在进行的动作。它常用来交代已有安排，从而解释那段时间能不能参加别的活动。', [['At two tomorrow, I will be helping at the information desk.', '明天下午两点，我会正在服务台帮忙。'], ['They will be practising during the lunch break.', '午休期间他们会在练习。']]),
  vocabulary: [
    v('group', '小组；团体', 'Our group is making signs for the sale.', '我们小组正在为义卖制作标牌。'),
    v('pop singer', '流行歌手', 'We discussed a pop singer in our music project.', '我们在音乐项目中讨论了一位流行歌手。'),
    v('club', '社团；俱乐部', 'The photography club meets twice a month.', '摄影社团每月活动两次。'),
    v('performance', '表演；演出', 'The drum performance lasted five minutes.', '鼓乐表演持续了五分钟。'),
    v('occasion', '场合；时机', 'A school open day is a good occasion to meet other families.', '学校开放日是认识其他家庭的好机会。')
  ],
  passage: { en: 'My friend wants to play badminton on Sunday afternoon, but I will be helping at the community sale. At two, our group will be arranging books on the tables. Later, the drama club will be giving a short performance. I will be selling drinks then. We can play badminton in the morning instead, before I leave for the sale.', zh: '朋友想周日下午打羽毛球，但那时我要在社区义卖帮忙。两点，我们小组会在桌上摆放图书。稍后，戏剧社将进行一场简短表演。那时我会在卖饮料。我们可以改在上午打球，就在我去义卖之前。' },
  questions: [
    c('未来某时正在做：At three tomorrow, I ___ at the book table.', ['will be working', 'was working', 'have worked'], 'will be working', '未来具体时刻的进行中动作，用 will be working。'),
    c('补全结构：They will be ___ the room at noon.', ['clean', 'cleaned', 'cleaning'], 'cleaning', 'will be 后接动词-ing 构成将来进行时。'),
    c('戏剧社将在台上做一场“表演”，应使用哪个词？', ['occasion', 'performance', 'message'], 'performance', 'performance 指演出或表演。'),
    c('根据短文，两人可以把羽毛球安排在什么时候？', ['周日上午', '周日下午两点', '演出进行时'], '周日上午', '最后一句提出上午打球，再去参加义卖。'),
    t('只填 help 的将来进行时（三个词）：She ___ ___ ___ at the sale at two.', ['will be helping'], '结构是 will be 加 helping。'),
    o('排列单词，表达“我们三点时会正在卖书”。', 'We will be selling books at three.', 'will be selling 描述三点时正在进行的动作。')
  ], sourcePages: [63, 64]
},
{
  sourceLesson: 14, title: '陶艺课的准备', scene: '家庭接送与兴趣课程', goal: '用过去完成时区分过去两个动作的先后。',
  grammar: g('过去完成时与动作顺序', 'had 加过去分词表示在过去另一个动作之前已经完成的事。后发生的动作通常用一般过去时。after/before 能帮助读者理解顺序，但关键仍是叙述的时间关系。', [['I had packed my apron before my aunt arrived.', '阿姨到来前，我已经把围裙装好了。'], ['After we had washed our hands, we ate lunch.', '我们洗过手后吃了午饭。']]),
  vocabulary: [
    v('amusing', '有趣的；逗人发笑的', 'The video of the dancing cat was amusing.', '猫跳舞的视频很有趣。'),
    v('experience', '经历（可数）；经验（通常不可数）', 'Making my first clay cup was a new experience.', '第一次做陶杯对我来说是一种新经历。'),
    v('wave', '挥手；招手', 'I waved to my cousin from the school gate.', '我从校门口向表弟挥手。'),
    v('lift', '顺路搭乘；搭便车（英式用法，常用 give someone a lift）', 'My aunt gave me a lift to my art lesson.', '阿姨顺路开车送我去上美术课。'),
    v('reply', '回答；回复（reply to someone）', 'Please reply to the club message by Friday.', '请在周五之前回复社团消息。'),
    v('language', '语言', 'Learning a language takes regular practice.', '学习一门语言需要经常练习。'),
    v('journey', '旅程；路途', 'The bus journey took forty minutes.', '乘公交车的这段路花了四十分钟。')
  ],
  passage: { en: 'My aunt gave me a lift to my first pottery class. Before she arrived, I had packed an apron and a towel. The journey was short, so we reached the studio early. After the teacher had shown us a sample, we made our own cups. Mine looked rather strange, but the experience was amusing. I used it for my pencils at home.', zh: '阿姨开车送我去上第一节陶艺课。她来之前，我已经装好围裙和毛巾。路程很短，所以我们早早到了工作室。老师展示样品之后，我们做了自己的杯子。我的杯子看起来挺奇怪，不过这段经历很有趣。回家后，我用它装铅笔。' },
  questions: [
    c('先完成收拾，再到车站：By the time we reached the station, I ___ my bag.', ['will pack', 'had packed', 'am packing'], 'had packed', '收拾发生在过去的到站动作之前，用 had packed。'),
    c('过去完成时结构：She had ___ the address before we left.', ['check', 'checking', 'checked'], 'checked', 'had 后接过去分词 checked。'),
    c('阿姨顺路用汽车送你一段，“搭一程”可表达为哪一项？', ['a lift', 'a language', 'a reply'], 'a lift', 'give someone a lift 表示开车送某人一程。'),
    c('根据短文，那个陶杯后来用来做什么？', ['装铅笔', '装午餐', '送给司机'], '装铅笔', '最后一句说明作者在家里用杯子装铅笔。'),
    t('填写 finish 的过去完成时，只填两个词：I ___ ___ my homework before the car arrived.', ['had finished'], '较早完成的动作使用 had finished。'),
    o('排列单词，表达“我们离开之前已核对过地址”。', 'We had checked the address before we left.', '先核对地址，再出发；较早的动作使用 had checked。')
  ], sourcePages: [67, 68]
},
{
  sourceLesson: 15, title: '把老师的话带回来', scene: '校园活动筹备', goal: '用 said 和 told 转述别人的话，注意人称与时态。',
  grammar: g('陈述句的间接引语', '用过去时 said/told 转述先前的话时，原来的现在时常往回变成过去时，will 常变为 would。tell 后需要听话人，如 told us；say 后可直接接内容，如 said that。人称也要按说话关系调整。', [['Lin said that she needed two helpers.', '琳说她需要两名帮手。'], ['The teacher told us that the room was available.', '老师告诉我们房间可以使用。']]),
  vocabulary: [
    v('secretary', '秘书；负责行政联络的人员', 'The school secretary helped us book a room.', '学校秘书帮我们预约了房间。'),
    v('nervous', '紧张的；不安的', 'I felt nervous before my first presentation.', '第一次做展示之前，我感到紧张。'),
    v('afford', '负担得起（常用 can afford）', 'Our club can afford two new balls this term.', '我们社团这学期买得起两个新球。'),
    v('weak', '弱的；不牢固的；不擅长的', 'The weak shelf cannot hold heavy books.', '这个不牢固的架子承受不了很重的书。'),
    v('interrupt', '打断；插话', 'Please do not interrupt while someone is explaining.', '别人在解释时，请不要打断。')
  ],
  passage: { en: 'I felt nervous when I asked the school secretary about a room for our art sale. She told me that the small hall was free on Friday. I explained that our club could not afford new tables. She said that we could borrow six old ones. When I returned to class, I shared the news, and everyone began planning the display.', zh: '我向学校秘书询问美术义卖的场地时有些紧张。她告诉我，小礼堂周五空着。我解释说社团买不起新桌子。她说我们可以借六张旧桌子。回到班里，我分享了这个消息，大家便开始规划展台。' },
  questions: [
    c('选择正确搭配：The secretary ___ us that the hall was free.', ['told', 'said', 'spoke'], 'told', 'tell 后可以直接接听话人 us；say 不能直接这样接人。'),
    c('按过去时转述：Lei said, “I am ready.” → Lei said that he ___ ready.', ['is being', 'was', 'be'], 'was', '在本题的过去时转述练习中，am 往回变为 was。'),
    c('表示“我们买得起两张桌子”，空格应填：We can ___ two tables.', ['interrupt', 'reply', 'afford'], 'afford', 'can afford 表示有能力承担费用。'),
    c('根据短文，社团将怎样解决桌子的问题？', ['买六张新桌子', '借六张旧桌子', '取消展示'], '借六张旧桌子', '秘书说社团可以借六张旧桌子。'),
    t('按时态回移规则，只填一个词：She said, “I will help.” → She said that she ___ help.', ['would'], '在过去时的转述中，will 通常变为 would。'),
    o('排列单词，表达“我们的老师说这个计划很好”。', 'Our teacher said that the plan was good.', 'said 后接 that 引导的内容，was 体现过去时转述。')
  ], sourcePages: [71, 72]
},
{
  sourceLesson: 16, title: '骑车去体育馆', scene: '城市路线与交通规则', goal: '用真实条件句说明可能的情况及其结果。',
  grammar: g('真实条件句：if 加现在时', '谈论将来可能发生的条件时，if 从句通常用一般现在时，主句可用 will、can 或祈使句。不要因为说的是将来，就在 if 从句里机械地加 will。', [['If it rains, we will take the bus.', '如果下雨，我们会乘公交车。'], ['If the light is red, wait behind the line.', '如果是红灯，就在线后等。']]),
  vocabulary: [
    v('park', '停放（车辆）', 'Please park your bicycle inside the painted area.', '请把自行车停在画出的区域内。'),
    v('traffic', '交通；路上的车辆（通常不可数）', 'There is heavy traffic near the school at five.', '五点时学校附近交通繁忙。'),
    v('ticket', '罚单；也可指票', 'The driver found a parking ticket on the windscreen.', '司机在挡风玻璃上看到了一张停车罚单。'),
    v('note', '便条；笔记', 'I left a note beside the front door.', '我在前门旁留了一张便条。'),
    v('area', '区域；地区', 'This area is for walking, not cycling.', '这片区域供步行使用，不供骑车。'),
    v('sign', '标志；指示牌', 'The blue sign points to the swimming pool.', '蓝色指示牌指向游泳池。'),
    v('reminder', '提醒；提示物', 'I set a reminder to bring my helmet.', '我设置了一个提醒，免得忘记带头盔。'),
    v('fail', '未能；没有做到；fail to do something', 'If the link fails to open, ask the teacher for help.', '如果链接打不开，就向老师求助。'),
    v('obey', '遵守；服从', 'Everyone must obey the road signs.', '每个人都必须遵守道路标志。')
  ],
  passage: { en: 'We want to cycle to the sports hall on Saturday. If traffic is heavy, we will use the quieter side road. A sign near the hall shows the bicycle parking area. If it is full, we can ask a worker where to park. I have set a reminder to bring my helmet. We will check our lights before we leave.', zh: '我们想周六骑车去体育馆。如果交通繁忙，就走更安静的支路。体育馆附近有一块标志，指明自行车停放区。如果停满了，我们可以问工作人员能停在哪里。我已经设置了提醒，记得带头盔。出发前，我们会检查车灯。' },
  questions: [
    c('补全条件句：If the road ___ busy, we will take another route.', ['will be', 'is', 'was being'], 'is', '谈未来的真实条件时，if 从句用一般现在时。'),
    c('补全可能的结果：If the bike area is full, we ___ a worker.', ['will ask', 'asked yesterday', 'were asking'], 'will ask', '主句可以用 will 加原形表示将来的行动。'),
    c('手机上设置一个提示，提醒自己带头盔，这叫作什么？', ['a salary', 'a journey', 'a reminder'], 'a reminder', 'reminder 是帮助记起要做之事的提醒。'),
    c('根据短文，如果交通繁忙，他们会怎么走？', ['改走安静的支路', '骑进步行区', '不戴头盔赶路'], '改走安静的支路', '第二句说明了 traffic is heavy 时选择的路线。'),
    t('只填 obey 的正确形式：If everyone ___ the signs, the area will be safer.', ['obeys'], 'everyone 在语法上作单数，且 if 从句用现在时，因此是 obeys。'),
    o('排列单词，表达“如果大门关着，我们就在这里等”。', 'If the gate is closed, we will wait here.', 'if 从句使用 is，主句使用 will wait。')
  ], sourcePages: [75, 76]
},
{
  sourceLesson: 17, title: '上台前的检查单', scene: '校园舞台排练', goal: '区分必须做、不必做和禁止做的事。',
  grammar: g('must 与 have to', 'must 和 have to 都可表达必要或义务。have to 可随时态变化，例如过去的 had to。must not 表示禁止，do not have to 表示没有必要，两者不能混淆。have got to 在口语中也可表示必须。', [['You must keep this doorway clear.', '你必须保持这处门口畅通。'], ['We had to move the lights before the show.', '演出前我们不得不移动灯光。']]),
  vocabulary: [
    v('appear', '出现；登场', 'Our names will appear on the club website.', '我们的名字会出现在社团网站上。'),
    v('stage', '舞台', 'The chairs are at the back of the stage.', '椅子在舞台后部。'),
    v('bright', '鲜艳的；明亮的', 'She chose a bright yellow folder.', '她选了一个鲜黄色的文件夹。'),
    v('stocking', '长筒袜（通常到膝盖以上）', 'The costume includes a pair of white stockings.', '这套戏服包括一双白色长筒袜。'),
    v('sock', '短袜；袜子', 'One wet sock is hanging beside my shoes.', '一只湿袜子挂在我的鞋子旁边。')
  ],
  passage: { en: 'Our class play begins tomorrow. Before we appear on stage, we must check the steps and clear away our bags. We have to wear dark shoes, but we do not have to buy special clothes. Bright scarves will show which group we belong to. The teacher reminds us that we must not run behind the curtain, even when we feel nervous.', zh: '我们班的戏剧明天开演。登台前，我们必须检查台阶并把书包移走。我们必须穿深色鞋，但不用购买专门的服装。鲜艳的围巾会显示我们属于哪一组。老师提醒我们，即使紧张，也不能在幕布后面奔跑。' },
  questions: [
    c('校规禁止奔跑：You ___ run behind the curtain.', ['do not have to', 'must not', 'may'], 'must not', 'must not 表示禁止；do not have to 只表示不必。'),
    c('没有必要买新衣服：We ___ buy new clothes for this show.', ['must', 'must not', 'do not have to'], 'do not have to', 'do not have to 表示没有必要，并不禁止购买。'),
    c('演员正式表演的台面叫什么？', ['a stage', 'a stocking', 'a pocket'], 'a stage', 'stage 是舞台。'),
    c('根据短文，大家用什么来显示自己属于哪一组？', ['不同颜色的书包', '鲜艳的围巾', '新买的鞋子'], '鲜艳的围巾', '围巾用于标明分组。'),
    t('用 have to 的过去式补全，只填两个词：Yesterday we ___ ___ move the chairs.', ['had to'], '过去的必要使用 had to，不能写成 musted。'),
    o('排列单词，表达“我们必须把自己的书包放在远离台阶的地方”。', 'We must keep our bags away from the steps.', 'must 后接动词原形 keep，away from 表示远离。')
  ], sourcePages: [79, 80]
},
{
  sourceLesson: 18, title: '旅途中的一顿热饭', scene: '家庭旅行午餐', goal: '理解 have 表示拥有、活动和完成时助动词时的不同用法。',
  grammar: g('have 的几种常用功能', 'have 可以表示拥有，也可和名词组成活动表达，如 have lunch、have a rest。作完成时助动词时，后面接过去分词。表示正在吃饭等活动时可用 be having；表示拥有时通常不用进行时。', [['We have a map of the village.', '我们有一张村庄地图。'], ['Dad is having a rest after the walk.', '步行后，爸爸正在休息。']]),
  vocabulary: [
    v('pub', '英式酒馆；也常供应餐食（本课生活场景只涉及用餐）', 'Our travel guide lists a village pub that serves lunch.', '我们的旅游指南列出了一家供应午餐的乡村酒馆。'),
    v('landlord', '酒馆经营者（本课语境）；也可指房东', 'The pub landlord showed our family to a large table.', '酒馆老板领我们一家到一张大桌子旁。'),
    v('bill', '账单', 'We checked the bill before paying for lunch.', '我们付午餐费前核对了账单。')
  ],
  passage: { en: 'During our family trip, we had lunch at a village pub. The landlord brought us soup and bread. My brother had a small notebook, so he drew the building while we waited. We have kept his drawing with our holiday photos. When the bill arrived, Dad checked it carefully. Then we had a short rest before continuing our walk.', zh: '家庭旅行期间，我们在一家乡村酒馆吃了午饭。老板给我们端来汤和面包。弟弟带着一个小笔记本，所以等餐时画了这座建筑。我们把他的画和假期照片保存在一起。账单送来后，爸爸仔细核对了它。然后我们稍微休息了一下，再继续步行。' },
  questions: [
    c('表示此刻正在吃午饭：We ___ lunch right now.', ['are having', 'have had yesterday', 'has'], 'are having', 'have lunch 是活动，正在进行时可用 are having。'),
    c('表示拥有：My brother ___ a notebook in his bag.', ['is having', 'have', 'has'], 'has', '表示拥有通常不用进行时；单数主语用 has。'),
    c('在本课乡村酒馆的语境里，landlord 指谁？', ['写菜单的学生', '经营酒馆的人', '拍旅行照片的人'], '经营酒馆的人', 'landlord 在英式酒馆语境中可以指经营者，并非这里只能解释为房东。'),
    c('根据短文，弟弟在等餐时做了什么？', ['画了建筑', '去买面包', '核对了账单'], '画了建筑', '他用随身的小笔记本画了这座建筑。'),
    t('补全现在完成时，只填一个词：We have ___ the drawing.（keep）', ['kept'], '助动词 have 后接过去分词，keep 的过去分词是 kept。'),
    o('排列单词，表达“午饭后我们短暂休息了一下”。', 'We had a short break after lunch.', 'had a short break 表示休息了一会儿，had 是活动动词 have 的过去式。')
  ], sourcePages: [83, 84]
},
{
  sourceLesson: 19, title: '能借一把球拍吗', scene: '体育中心礼貌请求', goal: '用 can、could、may 提出请求，并用 may/might 表达不确定。',
  grammar: g('请求许可与表达可能', 'Can I、Could I、May I 都可用于请求许可，could 和 may 常更客气。may/might 加原形表示现在或将来有可能；may/might have 加过去分词表示对已经发生的事作不确定的推测。', [['Could I use the spare racket?', '我能用备用球拍吗？'], ['She may have left her card at home.', '她可能把卡落在家里了。']]),
  vocabulary: [
    v('hurry', '匆忙；赶紧', 'Do not hurry down the wet steps.', '不要匆忙跑下湿台阶。'),
    v('ticket office', '售票处', 'The ticket office is beside the main entrance.', '售票处在正门旁边。'),
    v('pity', '令人遗憾的事；可惜', 'It is a pity that you cannot join our picnic.', '你不能来参加野餐，真可惜。'),
    v('exclaim', '惊呼；大声说（较书面）', '“What a huge model!” the children exclaimed.', '“好大的模型！”孩子们惊呼。'),
    v('return', '归还；返回', 'Please return the racket before the centre closes.', '请在中心关门前归还球拍。'),
    v('sadly', '悲伤地；遗憾地', 'She smiled sadly when the holiday ended.', '假期结束时，她带着伤感笑了笑。')
  ],
  passage: { en: 'I reached the sports centre without my racket. My friend said I might have left it beside the door at home. I asked the worker, “May I borrow one for an hour?” She gave me a blue racket and asked me to return it by five. It was a little heavier than mine, but we could still enjoy our game.', zh: '我到了体育中心，却没带球拍。朋友说我可能把它落在家门旁了。我问工作人员：“我能借一把用一小时吗？”她给了我一把蓝色球拍，让我五点前归还。它比我自己的稍重，但我们仍然可以开心地打球。' },
  questions: [
    c('礼貌请求许可，应选择哪一句？', ['May I borrow a racket?', 'I borrowed a racket yesterday.', 'I must borrow your racket now.'], 'May I borrow a racket?', 'May I 加动词原形是礼貌询问是否允许。'),
    c('推测已经发生的事：He might have ___ his card at home.', ['leave', 'leaving', 'left'], 'left', 'might have 后接过去分词 left。'),
    c('用完借来的球拍后，把它“归还”应使用哪个词？', ['hurry', 'return', 'exclaim'], 'return', 'return 在这里指把东西还回去。'),
    c('根据短文，球拍需要在几点前归还？', ['四点', '五点', '六点'], '五点', '工作人员要求 by five，也就是五点前或最迟五点。'),
    t('使用 may have 的结构，只填三个词：She ___ ___ ___ the message.（miss，可能已经错过）', ['may have missed'], 'may have missed 表示对过去是否漏看了消息作推测。'),
    o('排列单词，问“我今天可以用这个备用球吗？”', 'Could I use the spare ball today?', 'Could I 加动词原形可以用于客气地请求许可。')
  ], sourcePages: [87, 88]
},
{
  sourceLesson: 20, title: '一起让河边更干净', scene: '学生社区清洁活动', goal: '把动作当作一件事来表达，并正确使用动名词。',
  grammar: g('动名词：动词-ing 作名词用', '一个动作可以用-ing 形式作主语，例如 Walking is...。enjoy、finish 等动词后常接-ing；介词后出现动词时也通常用-ing，如 after eating。动名词不是见到-ing 就一定表示进行时。', [['Cycling to school saves me time.', '骑车上学帮我节省时间。'], ['We talked about improving the noticeboard.', '我们讨论了改进布告栏的事。']]),
  vocabulary: [
    v('catch', '抓住；接住；捕获（caught, caught）', 'Can you catch the ball with both hands?', '你能用双手接住球吗？'),
    v('fisherman', '渔民；钓鱼者（此词传统上常指男性）', 'A fisherman showed our class how a fishing net works.', '一位渔民向我们班展示了渔网如何使用。'),
    v('boot', '靴子', 'Mud covered the front of my left boot.', '泥覆盖了我左脚靴子的前端。'),
    v('waste', '浪费（本课作名词）；也可指废弃物', 'Leaving the lights on in an empty room is a waste of energy.', '空房间一直开灯是在浪费能源。'),
    v('realize', '意识到；明白', 'I did not realize how heavy the box was.', '我没有意识到箱子有多重。')
  ],
  passage: { en: 'Picking up litter beside the river is part of our club activity. We wear boots and work with an adult volunteer. I enjoy being outside, but I dislike seeing plastic bags in the grass. After collecting the litter, we sort it at the centre. I now realize that bringing a reusable bottle is easier than cleaning up lots of empty ones.', zh: '在河边捡垃圾是我们的社团活动之一。我们穿着靴子，和一位成年志愿者一起干活。我喜欢待在户外，但不喜欢看到草地里的塑料袋。收集完垃圾后，我们在中心分类。现在我明白，带一个可重复使用的水瓶比清理一大堆空瓶子更省事。' },
  questions: [
    c('动作作主语：___ a reusable bag is a useful habit.', ['Carry', 'Carrying', 'Carried'], 'Carrying', '此处整个动作作主语，使用动名词 Carrying。'),
    c('介词后接动名词：Wash your hands after ___ outside.', ['working', 'work', 'worked'], 'working', 'after 这里是介词，后接动词-ing。'),
    c('“我终于意识到了问题。”其中“意识到”对应哪个词？', ['catch', 'boot', 'realize'], 'realize', 'realize 表示开始明白或意识到某事。'),
    c('根据短文，捡完垃圾之后大家做什么？', ['去买新水瓶', '到中心分类垃圾', '把垃圾留在草地里'], '到中心分类垃圾', 'after collecting the litter 之后的动作是 sort it at the centre。'),
    t('只填动词的正确形式：Our group enjoys ___ outdoors.（work）', ['working'], 'enjoy 后接动名词 working。'),
    o('排列单词，表达“我们在午饭前完成了小路的清洁”。', 'We finished cleaning the path before lunch.', 'finish 后接 cleaning，表示完成清洁这项活动。')
  ], sourcePages: [91, 92]
},
{
  sourceLesson: 21, title: '让饮水处更好找', scene: '校园设施改进建议', goal: '用带情态动词和 will 的被动语态讨论办法。',
  grammar: g('情态动词后的被动语态', 'can、must、should、will 后接 be 加过去分词，可以说明某物能被、必须被、应被或将被怎样处理。不论主语单复数，情态动词后的 be 都保持原形。', [['The label can be read from the corridor.', '从走廊就能读到标签。'], ['The old notice will be replaced tomorrow.', '旧通知明天将被更换。']]),
  vocabulary: [
    v('mad', '疯狂的；不明智的（口语，评价人的精神状态时需谨慎）', 'It would be mad to leave all our revision until the final evening.', '把所有复习都留到最后一晚会是个疯狂的主意。'),
    v('reason', '原因；理由', 'What is the reason for the change of room?', '换教室的原因是什么？'),
    v('sum', '一笔钱；金额', 'Our class raised a small sum for new library books.', '我们班为添置图书馆新书筹了一小笔钱。'),
    v('determined', '坚定的；下定决心的', 'We are determined to make the school easier to use.', '我们决心让学校设施更方便使用。')
  ],
  passage: { en: 'New students often cannot find our drinking water station. Our class is determined to help. A bright sign can be placed above the door, and a map will be added to the noticeboard. The cost is only a small sum. Our teacher said that the plan must be checked first. If it is approved, the signs will be made next week.', zh: '新同学常常找不到饮水处。我们班决心帮忙。可以在门上方放一块醒目的标牌，并在布告栏上加一张地图。费用只是一小笔钱。老师说计划必须先经过检查。如果获准，标牌会在下周制作。' },
  questions: [
    c('补全被动结构：The map can ___ near the entrance.', ['puts', 'be put', 'putting'], 'be put', 'can 后接 be 加过去分词；put 的过去分词仍是 put。'),
    c('说明将被完成的工作：The new signs will ___ next week.', ['be made', 'be make', 'made'], 'be made', '将来被动结构是 will be made。'),
    c('“一小笔钱”应选哪一项？', ['a small reason', 'a small sign', 'a small sum'], 'a small sum', 'sum 在这里指金额。'),
    c('根据短文，制作标牌前必须先做什么？', ['搬走饮水处', '让计划经过检查', '购买大量水瓶'], '让计划经过检查', '老师说计划 must be checked first。'),
    t('填写完整的被动结构，只填三个词：The plan ___ ___ ___ first.（must / check）', ['must be checked'], '情态动词 must 后接 be checked，表示计划必须被检查。'),
    o('排列单词，表达“布告板上将添加一张新地图”。', 'A new map will be added to the board.', '主语 map 是被添加的对象，使用 will be added。')
  ], sourcePages: [95, 96]
},
{
  sourceLesson: 22, title: '我的小游戏计划', scene: '兴趣社团合作', goal: '把动词和正确的介词搭配使用。',
  grammar: g('动词与 of、from、in、on 的搭配', '有些动词的意义与后面的介词一起形成搭配，需要整体记忆。例如 dream of 梦想，hear from 收到某人的消息，believe in 信任，depend on 依靠。介词后接动词时使用-ing。', [['She dreams of designing a useful app.', '她梦想设计一个有用的应用。'], ['Our timetable depends on the room bookings.', '我们的时间表取决于房间的预约情况。']]),
  vocabulary: [
    v('dream', '做梦；梦想（动词，dream of/about）', 'I dream of creating a game for my younger cousins.', '我梦想给年幼的表弟妹做一个游戏。'),
    v('age', '年龄', 'Children of different ages joined the drawing activity.', '不同年龄的孩子参加了绘画活动。'),
    v('channel', '海峡；水道；也可指频道', 'Draw a narrow channel between the two islands on the map.', '在地图上的两座岛之间画一条狭窄水道。'),
    v('throw', '扔；抛（threw, thrown）', 'Throw the soft ball gently to your partner.', '轻轻把软球抛给你的搭档。')
  ],
  passage: { en: 'I dream of making a simple game for our school fair. The player will guide a boat through a narrow channel. I have heard from two classmates who want to help. One is good at drawing, and the other enjoys testing games. I believe in our team, but our progress depends on finding time to meet after homework.', zh: '我梦想为学校游园会制作一个简单的游戏。玩家要引导一条船穿过狭窄的水道。我收到了两位想帮忙的同学的消息。一个擅长画画，另一个喜欢测试游戏。我相信我们的团队，但进展取决于我们能否在完成作业后找到碰面的时间。' },
  questions: [
    c('补全固定搭配：I dream ___ creating a useful game.', ['from', 'on', 'of'], 'of', 'dream of 加名词或动名词表示梦想。'),
    c('补全固定搭配：Our next step depends ___ the test results.', ['on', 'in', 'from'], 'on', 'depend on 表示依赖、取决于。'),
    c('两块陆地之间狭窄的水道可以叫什么？', ['an age', 'a channel', 'a reminder'], 'a channel', 'channel 可以表示海峡或水道。'),
    c('根据短文，团队进展取决于什么？', ['能否买到一条真船', '能否找到作业后碰面的时间', '能否换一所学校'], '能否找到作业后碰面的时间', '最后一句说进展取决于大家能否找到时间见面。'),
    t('填写一个介词：Have you heard ___ your project partner this week?（收到对方消息）', ['from'], 'hear from someone 表示收到某人的消息。'),
    o('排列单词，表达“我信任我们团队的成员”。', 'I believe in the members of our team.', 'believe in 表示信任或相信某人的能力。')
  ], sourcePages: [99, 100]
},
{
  sourceLesson: 23, title: '图书馆的新机器', scene: '社区自助借书', goal: '综合运用条件句、将来表达和被动语态说明一套流程。',
  grammar: g('综合复习：条件、将来与被动', '说明流程可用 if 加现在时，再用 will/can 表示结果；重点是动作承受者时用被动语态。未来某刻正在做用 will be doing；过去某动作之前已完成用 had done；用 said/told 转述时，注意人称和时态回移。have 可表示拥有、活动或构成完成时。', [['The librarian said that she had checked the machine.', '图书管理员说她已经检查过机器。'], ['At ten tomorrow, she will be helping new readers.', '明天十点，她会正在帮助新读者。']]),
  vocabulary: [
    v('complete', '完成（动词）', 'Please complete the short form before the club meeting.', '请在社团会议前填完这份简短表格。'),
    v('modern', '现代的；新式的', 'The modern library has quiet rooms for group study.', '这座现代化图书馆有安静的小组学习室。'),
    v('strange', '奇怪的；陌生的', 'I heard a strange clicking sound from my bag.', '我听到包里传来奇怪的咔嗒声。'),
    v('district', '地区；行政区', 'Students from five schools in our district joined the event.', '我们区五所学校的学生参加了活动。')
  ],
  passage: { en: 'Our district library has a modern borrowing machine. A worker told me that she had tested it before the library opened. Tomorrow morning she will be helping new readers. If I scan my card, the screen will show my name. Each book must be placed under the light. After I complete the steps, I can take the books home. Next time, I will try it without help.', zh: '我们区的图书馆有一台新式自助借书机。一位工作人员告诉我，她在图书馆开门前已经测试过机器。明天上午她会在这里帮助新读者。如果扫描借书卡，屏幕就会显示我的名字。每本书都必须放在灯光下。完成操作后，我就能把书带回家。下次，我会尝试独立使用。' },
  questions: [
    c('真实条件句：If you ___ the button, the screen will change.', ['will press', 'press', 'pressed yesterday'], 'press', 'if 从句谈将来的条件时，使用一般现在时。'),
    c('表达操作要求：The book must ___ under the light.', ['be placed', 'place', 'placing'], 'be placed', '书是被放置的对象，must 后用 be placed。'),
    c('“完成表格”中的“完成”应选哪个词？', ['contain', 'appear', 'complete'], 'complete', 'complete 可以作动词，表示完成。'),
    c('根据短文，下一次“我”准备怎样使用机器？', ['不借书，只拍照', '不请人帮助，自己尝试', '带回家使用'], '不请人帮助，自己尝试', 'without help 表示不借助别人的帮助。'),
    t('只填两个词，表达将来的打算：Next time, I ___ ___ the machine myself.（will / use）', ['will use'], 'will 后接动词原形 use。'),
    o('排列单词，表达“借书前，你的卡必须经过扫描”。', 'Your card must be scanned before you borrow books.', 'must be scanned 是被动结构，before 引出随后发生的借书动作。')
  ], sourcePages: [103, 104]
},
{
  sourceLesson: 24, title: '买错颜色之后', scene: '文具店沟通', goal: '复习感叹句和容易混淆的常用表达，礼貌说明问题。',
  grammar: g('用 what 感叹，并复习常用搭配', '感叹一个可数单数事物，可用 What a/an 加形容词加名词；不可数名词或复数名词前不加 a/an。复习时也要留意 lend 是借出，borrow 是借入，tell 后可直接接人。', [['What a helpful suggestion!', '多么有帮助的建议！'], ['What clear instructions!', '多么清楚的说明！']]),
  vocabulary: [
    v('manager', '经理；负责人', 'The shop manager answered my question about the paint.', '店铺经理回答了我关于颜料的问题。'),
    v('upset', '心烦的；不安的；难过的', 'I felt upset when my drawing got wet.', '画被弄湿时，我很难过。'),
    v('sympathetic', '表示同情或理解的', 'The coach was sympathetic when I explained the problem.', '我解释问题时，教练表示理解。'),
    v('complain', '抱怨；投诉（常用 complain about）', 'I wrote to complain about the noisy fan.', '我写信投诉那台吵闹的风扇。'),
    v('wicked', '邪恶的；坏的（常见于故事人物描写）', 'The wicked queen in our play wears a silver crown.', '我们戏里的坏王后戴着银色王冠。'),
    v('contain', '包含；装有', 'This box contains twelve coloured pencils.', '这个盒子里装着十二支彩色铅笔。'),
    v('honesty', '诚实；坦诚', 'Her honesty helped us solve the misunderstanding.', '她的坦诚帮助我们解决了误会。')
  ],
  passage: { en: 'I went to the art shop to complain about a box of paint. It contained blue instead of green. The manager checked my order and showed me that I had chosen blue myself. I felt upset, but I admitted my mistake. She was sympathetic and offered to exchange the unopened box. What a relief! Honesty made the conversation much easier.', zh: '我去美术用品店反映一盒颜料的问题。里面是蓝色，而不是绿色。经理核对订单后告诉我，是我自己选了蓝色。我有点沮丧，但承认了错误。她表示理解，并愿意更换未开封的盒子。真让人松了一口气！坦诚让这次沟通容易多了。' },
  questions: [
    c('补全感叹句：___ useful tip!', ['What an', 'What a', 'What'], 'What a', 'tip 是单数可数名词；useful 以辅音音素开头，所以用 a。'),
    c('选择正确感叹句，news 在这里不可数。', ['What helpful news!', 'What a helpful news!', 'What an helpful news!'], 'What helpful news!', '不可数名词 news 前不加 a 或 an。'),
    c('发现是自己的错误，并如实说明，体现了哪一种品质？', ['honesty', 'traffic', 'distance'], 'honesty', 'honesty 表示诚实、坦诚。'),
    c('根据短文，为什么颜料是蓝色的？', ['经理故意改了订单', '仓库里没有绿色', '“我”下单时自己选了蓝色'], '“我”下单时自己选了蓝色', '经理核对订单后指出作者自己选择了蓝色，作者也承认了。'),
    t('从 lend 或 borrow 中选一个原形：Could I ___ your green pencil for a minute?', ['borrow'], '从别人的手里借入，用 borrow；lend 表示借出。'),
    o('排列单词，表达“这是一本多么实用的指南！”', 'What a useful guide this is!', '单数可数名词 guide 前用 a；what 感叹句保留 this is 的陈述语序。')
  ], sourcePages: [107, 108], coverageNotes: '本课源资料采用常用难点复习，没有独立的 Key structures 栏；这里用原创购物沟通复习感叹句及相关用法。'
},
{
  sourceLesson: 25, title: '把出游方案说清楚', scene: '班级周末出游讨论', goal: '用连接词把原因、选择和转折组织成连贯表达。',
  grammar: g('并列句与成对连接词', 'and 补充信息，but/yet 表示转折，so 引出结果，or 提供选择。both...and 表示两者都，either...or 表示二选一，neither...nor 表示两者都不，not only...but also 表示不仅……而且……。连接的部分尽量保持相同结构。', [['Both the train and the bus stop near the park.', '火车和公交车都在公园附近停靠。'], ['Neither Lin nor I want to leave before sunrise.', '琳和我都不想在日出前出发。']]),
  vocabulary: [
    v('railway', '铁路；铁路系统', 'The new railway connects our town with the city.', '新铁路把我们镇和城市连接起来。'),
    v('porter', '搬运工；行李员（部分车站或酒店提供此类服务）', 'The hotel porter helped carry the heavy suitcase upstairs.', '酒店行李员帮忙把重箱子搬上楼。'),
    v('several', '几个；数个', 'Several classmates suggested a later train.', '几个同学建议坐晚一点的火车。'),
    v('foreigner', '外国人；来自其他国家的人（称呼时也可具体说明国籍或用 visitor）', 'As a foreigner in the town, our exchange teacher asks us about local customs.', '作为镇上的外国人，交流老师向我们询问当地习俗。'),
    v('wonder', '想知道；感到疑惑', 'I wonder whether the park has bicycle parking.', '我想知道公园有没有自行车停车处。')
  ],
  passage: { en: 'Our class is planning a Saturday visit to a wetland park. The railway station is near the entrance, so travelling by train seems sensible. Several classmates want an early start, but others have morning lessons. We can either take the ten o’clock train or meet at the park after lunch. I wonder which plan works for most people. Our teacher suggests checking both the timetable and everyone’s availability before deciding.', zh: '我们班正在计划周六参观湿地公园。火车站离入口近，所以坐火车似乎合理。几位同学想早点出发，但另一些人上午有课。我们可以坐十点的火车，也可以午饭后在公园集合。我想知道哪个方案适合大多数人。老师建议决定前同时查看时刻表和大家的空闲时间。' },
  questions: [
    c('提供两个可选方案：We can either leave now ___ wait until ten.', ['and', 'or', 'nor'], 'or', 'either...or 用于二选一。'),
    c('表达两个时间都不合适：Neither Monday ___ Tuesday works for our group.', ['or', 'and', 'nor'], 'nor', 'neither...nor 表示两者都不。'),
    c('“我想知道大家几点有空”中的“想知道”可以用哪个动词？', ['wonder', 'carry', 'receive'], 'wonder', 'wonder 可引出一个自己尚不知道答案的问题。'),
    c('根据短文，为什么有些同学不想早出发？', ['火车站关门了。', '他们上午有课。', '公园只在夜间开放。'], '他们上午有课。', '短文说 others have morning lessons。'),
    t('只填 and、but、so 中最符合因果关系的词：The later train is full, ___ we need another plan.', ['so'], '前半句是原因，后半句是结果，用 so。'),
    o('排列单词，表达“价格和时间都很重要”。', 'Both the price and the time are important.', 'both...and 连接两个并列成分，此处整体为复数，使用 are。', ['Both the time and the price are important.'])
  ], sourcePages: [125, 126]
},
{
  sourceLesson: 26, title: '旧布料的新用途', scene: '校园手工与环保', goal: '在较长场景里区分正在做的事、习惯与状态。',
  grammar: g('现在时复习：动作与状态', '日常习惯、普遍情况用一般现在时；当前进行的动作使用现在进行时。know、understand、like 等表达认识或感受的动词，表示普通状态时通常不用进行时。不要把“现在知道”机械翻成 am knowing。', [['This material feels soft and washes well.', '这块材料摸起来柔软，也容易清洗。'], ['We are cutting it into small squares today.', '今天我们正在把它剪成小方块。']]),
  vocabulary: [
    v('art', '艺术；美术', 'Our art project uses things that people usually throw away.', '我们的美术项目使用人们通常会丢掉的东西。'),
    v('critic', '评论家；批评者', 'The film critic explained why the ending worked well.', '影评人解释了结尾为什么处理得好。'),
    v('paint', '绘画；涂颜色（动词）', 'We will paint the wooden signs after lunch.', '午饭后我们会给木标牌上色。'),
    v('pretend', '假装', 'Do not pretend to understand if you need another explanation.', '如果需要再解释一次，就不要假装明白。'),
    v('pattern', '图案；样式', 'The bag has a simple pattern of blue circles.', '包上有一个简单的蓝色圆圈图案。'),
    v('curtain', '窗帘；幕布', 'The thin curtain lets plenty of light into the room.', '这幅薄窗帘让充足的光线照进房间。'),
    v('material', '材料；布料', 'We chose thick material for the lunch bag.', '我们选了厚布料来做午餐袋。'),
    v('appreciate', '欣赏；领会；感谢', 'I appreciate the care you put into this card.', '我很感谢你做这张卡片时的用心。'),
    v('notice', '注意到；察觉（动词）', 'Did you notice the small pocket inside the bag?', '你注意到包里面的小口袋了吗？'),
    v('whether', '是否', 'We need to decide whether the cloth is strong enough.', '我们需要判断这块布是否足够结实。'),
    v('hang', '悬挂（hung, hung）', 'Hang your apron on the hook after class.', '下课后把围裙挂在钩子上。'),
    v('critically', '带着审视或批判的眼光；挑剔地', 'Read your own draft critically before you hand it in.', '交稿前要用审视的眼光读一遍自己的草稿。'),
    v('upside down', '上下颠倒地', 'Turn the empty box upside down to check its base.', '把空盒子倒过来检查底部。')
  ],
  passage: { en: 'Our art club usually makes posters, but this month we are sewing lunch bags from old curtains. I like the blue material because its pattern is simple. My partner is measuring the cloth while I check our plan. We do not know whether one piece is large enough, so we ask the teacher. She helps us arrange the shapes carefully. I am beginning to appreciate how much thought a useful design needs.', zh: '我们美术社通常制作海报，但这个月正在用旧窗帘缝午餐袋。我喜欢蓝色布料，因为它的图案简单。搭档在量布，我在检查计划。我们不知道一块布够不够大，于是问老师。她帮我们仔细安排各个形状的位置。我开始体会到，一个实用设计需要花多少心思。' },
  questions: [
    c('表达眼前正在进行的动作：Look! Our teacher ___ the cloth.', ['measures every day', 'is measuring', 'measured last week'], 'is measuring', 'Look 提示眼前动作，使用 is measuring。'),
    c('表达当前的认识状态，哪句自然正确？', ['I am knowing the answer.', 'I knowing the answer.', 'I know the answer.'], 'I know the answer.', 'know 表示普通认识状态时通常用一般现在时。'),
    c('布料上重复出现的圆点和线条，合起来可以称为什么？', ['a pattern', 'a critic', 'a curtain rail'], 'a pattern', 'pattern 可以表示装饰图案。'),
    c('根据短文，大家为什么向老师求助？', ['不知道一块布够不够大。', '想知道旧窗帘多少钱。', '不想参加社团。'], '不知道一块布够不够大。', '他们不确定布料大小是否够用，老师帮助安排形状。'),
    t('用 paint 的现在进行时补全，只填两个词：My classmates ___ ___ the signs at the moment.', ['are painting'], '复数主语搭配 are，at the moment 提示正在发生的动作。'),
    o('排列单词，表达“我喜欢这个包上的简单图案”。', 'I like the simple pattern on this bag.', 'like 表示喜好状态，这里使用一般现在时。')
  ], sourcePages: [129, 130]
},
{
  sourceLesson: 27, title: '在操场学户外技能', scene: '校园实践活动日', goal: '用规则和不规则过去式连贯讲述活动经过。',
  grammar: g('一般过去时复习', '按事情发生的顺序叙述已结束的活动，通常连续使用一般过去时。规则动词多加-ed；不规则形式需要按词记忆，例如 creep→crept、leap→leapt/leaped、wind→wound。问句和否定句中的 did 后恢复原形。', [['We unfolded the tent and checked the poles.', '我们展开帐篷并检查支杆。'], ['The route wound around the edge of the field.', '路线沿着场地边缘蜿蜒延伸。']]),
  vocabulary: [
    v('tent', '帐篷', 'Our club borrowed a tent for the outdoor skills lesson.', '社团为户外技能课借了一顶帐篷。'),
    v('field', '田野；场地', 'We practised on the field behind the school.', '我们在学校后面的场地上练习。'),
    v('smell', '闻起来；闻；嗅（动词）', 'The bread smells wonderful when it comes out of the oven.', '面包刚出炉时闻起来特别香。'),
    v('wonderful', '极好的；令人愉快的', 'We had a wonderful afternoon learning new skills.', '我们度过了一个学习新技能的美好下午。'),
    v('campfire', '营火；篝火', 'The teacher explained why a campfire was not allowed in the dry area.', '老师解释了为什么干燥地区不允许点篝火。'),
    v('creep', '蹑手蹑脚地走；缓慢爬行（crept, crept）', 'The cat crept behind the sofa to find its toy.', '猫悄悄钻到沙发后面找玩具。'),
    v('sleeping bag', '睡袋', 'Roll the sleeping bag tightly before packing it.', '装包前把睡袋紧紧卷起来。'),
    v('comfortable', '舒适的；自在的', 'These old trainers are still comfortable for walking.', '这双旧运动鞋走路穿着仍然很舒服。'),
    v('soundly', '香甜地；酣睡地', 'I slept soundly after the long sports day.', '漫长的运动日结束后，我睡得很香。'),
    v('leap', '跳跃；跃过（leapt/leaped）', 'The dancer leapt into the air at the end of the song.', '歌曲结束时，舞者腾空跃起。'),
    v('heavily', '大量地；猛烈地；沉重地', 'It snowed heavily during the night.', '夜里下了大雪。'),
    v('stream', '小溪；溪流', 'A narrow stream runs beside the walking route.', '一条狭窄的小溪流经步道旁。'),
    v('form', '形成；组成（动词）', 'Please form a circle around the activity table.', '请围着活动桌站成一个圈。'),
    v('wind', '蜿蜒；曲折前进（读 /waɪnd/，过去式与过去分词 wound）', 'The path winds between the trees behind our school.', '小路在学校后面的树木之间蜿蜒延伸。'),
    v('right', '正好；恰好（此处作副词）', 'The bus stop is right outside the sports centre.', '公交站就在体育中心门外。')
  ],
  passage: { en: 'On activity day, our class learnt outdoor skills on the school field. First, we formed small groups and put up a tent. Then a volunteer showed us how to pack a sleeping bag. Mine looked huge at first, but I rolled it again and made it smaller. After lunch, we followed a route that wound around the trees. We finished right beside the school gate, tired and pleased with our progress.', zh: '活动日那天，我们班在学校场地学习户外技能。首先，我们分成小组，搭起一顶帐篷。然后，一位志愿者教我们收纳睡袋。我的睡袋开始看起来很大，但我重新卷了一遍，把它卷小了。午饭后，我们沿着一条绕树木蜿蜒的路线走。终点正好在校门旁。虽然很累，但我们对自己的进步感到满意。' },
  questions: [
    c('选择 wind 的正确过去式：The route ___ through the trees yesterday.', ['winded', 'winding', 'wound'], 'wound', '表示蜿蜒延伸的 wind，过去式为 wound。'),
    c('否定句中使用原形：We did not ___ any equipment at school.', ['left', 'leave', 'leaving'], 'leave', 'did not 后接动词原形 leave。'),
    c('“终点恰好就在校门旁”，表示“恰好”的副词是哪一个？', ['right', 'heavily', 'soundly'], 'right', 'right 可以放在地点表达前加强语气，表示正好、就。'),
    c('根据短文，“我”怎样让睡袋变小了？', ['剪掉一块布', '重新卷了一遍', '换了一个新睡袋'], '重新卷了一遍', '作者 rolled it again，重新卷后更紧凑了。'),
    t('只填 creep 的过去式：The cat ___ quietly towards its toy yesterday.', ['crept'], 'creep 是不规则动词，过去式为 crept。'),
    o('排列单词，表达“我们小组在午饭后收拾了器材”。', 'Our group packed the equipment after lunch.', '用 packed 叙述结束的动作，把 after lunch 放在句末。')
  ], sourcePages: [133, 134]
},
{
  sourceLesson: 28, title: '收集家乡的传说', scene: '校园口述故事项目', goal: '用 since、for 和 so far 说明持续时间及阶段成果。',
  grammar: g('现在完成时的时间线索', 'since 后接起点，如 since Monday；for 后接一段时间，如 for two weeks。so far、up till now 表示截至目前，常与现在完成时搭配。ever/never 关注已有或未有过的经历。持续状态可说 have known/have had，不能把瞬间动作随意当作一直持续。', [['We have known this story since primary school.', '我们从小学起就知道这个故事。'], ['Our group has collected five recordings so far.', '截至目前，我们小组已经收集了五段录音。']]),
  vocabulary: [
    v('rare', '罕见的；稀少的', 'It is rare to see an empty bus at this time.', '这个时间很少看到空公交车。'),
    v('ancient', '古代的；古老的', 'The school display shows ancient farming tools.', '学校的展览展示了古代农具。'),
    v('myth', '神话；虚构的传说', 'We read a myth about the changing seasons.', '我们读了一个关于季节变化的神话。'),
    v('trouble', '麻烦；困难', 'Tell me if you have trouble opening the audio file.', '如果音频文件打不开，请告诉我。'),
    v('effect', '效果；影响', 'The soft music has a calming effect on the room.', '轻柔的音乐让房间的氛围安静下来。'),
    v('Medusa', '美杜莎（希腊神话人物名，文化识读词）', 'Our mythology poster includes two drawings of Medusa.', '我们的神话海报上有两幅美杜莎的画像。'),
    v('Gorgon', '戈耳工（希腊神话中的怪物名称，文化识读词）', 'I looked up the word Gorgon while planning a mythology quiz.', '策划神话知识问答时，我查了 Gorgon 这个词。')
  ],
  passage: { en: 'Our history group has collected local stories for three weeks. Since the project began, we have interviewed four grandparents, with their permission. Some stories describe real places; others are ancient myths. We have had trouble with one noisy recording, so we will ask the speaker to check our notes. So far, the most interesting discovery is that different families tell different versions of the same story. We will show those differences on our display.', zh: '我们的历史小组已经收集家乡故事三周了。项目开始以来，我们获得许可，采访了四位祖父母辈的长者。有的故事描述真实地点，有的是古老神话。有一段录音杂音太大，所以我们会请讲述者核对我们的笔记。截至目前，最有趣的发现是，不同家庭对同一个故事有不同版本。我们会在展板上展示这些差异。' },
  questions: [
    c('一段持续时间前用什么？We have worked on the display ___ two weeks.', ['since', 'for', 'at'], 'for', 'two weeks 是时间长度，前面用 for。'),
    c('时间起点前用什么？She has known that story ___ she was six.', ['for', 'during', 'since'], 'since', 'she was six 指过去的起点，使用 since。'),
    c('涉及古代神灵和想象情节的故事通常可称为什么？', ['a myth', 'a bill', 'a salary'], 'a myth', 'myth 表示神话。'),
    c('根据短文，项目发现了什么有趣现象？', ['所有录音都没有杂音。', '不同家庭会讲同一故事的不同版本。', '每个故事都是真实历史。'], '不同家庭会讲同一故事的不同版本。', '短文特别指出不同家庭的版本存在差异。'),
    t('只填 collect 的现在完成时（两个词）：Our team ___ ___ six stories so far.', ['has collected'], 'team 在这里作单数，so far 表示截至目前，用 has collected。'),
    o('排列单词，表达“我知道这个故事已经有好几年了”。', 'I have known this story for several years.', 'know 的过去分词是 known；for several years 表示持续时长。')
  ], sourcePages: [137, 138], coverageNotes: 'Medusa 与 Gorgon 作为文化专名保留，例句用于原创海报和知识问答场景，不沿用原文故事。'
},
{
  sourceLesson: 29, title: '阳台上的新朋友', scene: '家庭搬家后的生活', goal: '在同一段叙述中清楚区分过去事件和延续至今的变化。',
  grammar: g('过去的时间点与延续至今的时间段', 'last summer、yesterday 等结束的时间配一般过去时。since、so far 等把时间连到现在，常配现在完成时。叙述中可以先用过去时交代起点，再用现在完成时说明此后的成果。', [['My grandparents moved here in July.', '我的祖父母七月搬到了这里。'], ['They have met several neighbours since then.', '从那以后，他们已经认识了几位邻居。']]),
  vocabulary: [
    v('taxi', '出租车', 'We took a taxi because our suitcases were heavy.', '因为行李箱很重，我们坐了出租车。'),
    v('Pilatus Porter', '皮拉图斯·波特（飞机型号名称，文化识读词）', 'For our model project, I chose a picture of a Pilatus Porter.', '在模型项目中，我选了一张皮拉图斯·波特飞机的图片。'),
    v('land', '降落；着陆（动词）', 'We watched a rescue helicopter land near the training field.', '我们看着一架救援直升机降落在训练场附近。'),
    v('plough', '耕地（动词）；美式常拼作 plow', 'At the farm, we saw a tractor plough the field.', '在农场，我们看到拖拉机在耕地。'),
    v('lonely', '偏僻的；人迹稀少的；也可指孤独的', 'A lonely road led to the old weather station.', '一条偏僻的路通往旧气象站。'),
    v('Welsh', '威尔士的；威尔士人或语言的', 'Our exchange project includes a video from a Welsh school.', '我们的交流项目包括一段威尔士学校发来的视频。'),
    v('roof', '屋顶', 'We could see red roofs from the classroom window.', '我们从教室窗户能看到红色屋顶。'),
    v('block', '一栋大型楼房；一片街区', 'Our block has a shared room on the ground floor.', '我们这栋楼一层有一个公共活动室。'),
    v('flat', '公寓；一套住房（英式用法）', 'Their new flat has a sunny balcony.', '他们的新公寓有一个阳光充足的阳台。'),
    v('desert', '抛弃；离弃（动词，重音在第二音节；不同于表示沙漠的名词）', 'Do not desert your teammates when the task becomes difficult.', '任务变难时，不要丢下队友。')
  ],
  passage: { en: 'My grandparents moved into a new flat last summer. At first, they missed their old neighbours. Since then, they have started a small balcony garden and joined a gardening group in their block. I visited them on Sunday and helped carry two bags of soil upstairs. Grandma has sent me three photos of the plants this week. She says the garden has helped her make friends, even though it is much smaller than the old one.', zh: '我的祖父母去年夏天搬进了新公寓。起初，他们很想念老邻居。后来，他们开始种一个小阳台花园，并加入楼里的园艺小组。我周日去看他们，帮忙把两袋土搬上楼。奶奶这周已经给我发了三张植物照片。她说，虽然花园比原来的小得多，却帮助她交到了朋友。' },
  questions: [
    c('交代结束的过去事件：They ___ into this flat last August.', ['have moved', 'move every day', 'moved'], 'moved', 'last August 明确指已经结束的过去时间，用 moved。'),
    c('说明截至目前的成果：Grandma ___ three neighbours so far.', ['has met', 'met tomorrow', 'was meet'], 'has met', 'so far 与现在相连，用现在完成时 has met。'),
    c('表示“不应在困难时抛弃队友”，应使用哪个动词？', ['land', 'desert', 'plough'], 'desert', 'desert 作动词表示离弃、抛弃。'),
    c('根据短文，阳台花园给奶奶带来了什么变化？', ['帮助她交到朋友', '让她搬回旧房子', '让她不用上下楼'], '帮助她交到朋友', '奶奶说花园帮助她 make friends。'),
    t('只填 send 的过去式：Grandma ___ a photo yesterday evening.', ['sent'], 'yesterday evening 是已结束的过去时间；send 的过去式是 sent。'),
    o('排列单词，表达“上周日，我在祖父母的公寓里帮了他们”。', 'I helped my grandparents in their flat last Sunday.', 'last Sunday 对应一般过去时 helped，时间放在句末。')
  ], sourcePages: [141, 142], coverageNotes: 'Pilatus Porter 为飞机型号专名，保留识读例句；desert 使用源词表的动词“抛弃”义。'
},
{
  sourceLesson: 30, title: '体育节的体验卡', scene: '校园运动项目体验', goal: '用冠词与 some/any 描述设施、物品和地名。',
  grammar: g('冠词与 some/any 复习', '首次提到单数可数事物可用 a/an，再次指向同一事物用 the。肯定句常用 some，普通疑问句和否定句常用 any。城市、多数国家名通常不用 the；河流、海洋等名称通常带 the，例如 the Yangtze River。', [['We visited a sports hall, and the hall had two courts.', '我们参观了一座体育馆，馆内有两片球场。'], ['We do not have any spare tickets.', '我们没有多余的票。']]),
  vocabulary: [
    v('polo', '水球（本课语境，完整名称为 water polo；单独 polo 也常指马球）', 'We watched a water polo match during PE class.', '体育课上，我们观看了一场水球比赛。'),
    v('Wayle', '韦尔河（源材料中的河流专名，识读词）', 'Our vocabulary card marks Wayle as a river name.', '我们的词汇卡把 Wayle 标为河名。'),
    v('cut', '穿过；抄近路走（cut, cut；常见 cut across）', 'The footpath cuts across the grass beside our school.', '这条步道穿过我们学校旁边的草地。'),
    v('row', '划船（动词）', 'The instructor taught us to row in time with each other.', '教练教我们按相同节奏划船。'),
    v('kick', '踢（动词）', 'Kick the ball gently towards your partner.', '把球轻轻踢向你的搭档。'),
    v('towards', '朝；向', 'Walk towards the blue flag to find our group.', '朝蓝旗方向走，就能找到我们小组。'),
    v('nearly', '几乎；差不多', 'We have nearly finished putting away the equipment.', '我们快把器材收拾好了。'),
    v('sight', '景象；所见之物；视力', 'The colourful boats made a cheerful sight.', '五颜六色的船呈现出一幅欢乐的景象。')
  ],
  passage: { en: 'Our school sports festival offers more than running races. There is a rowing machine in the hall, and some coaches are teaching students how to use it. The machine measures distance without moving across any water. In another room, we can watch a video about water polo. I have nearly filled my activity card, but I still need to try one team game. My friend points towards the badminton court, where two more players are needed for doubles.', zh: '学校体育节不只有跑步比赛。礼堂里有一台划船机，一些教练正在教学生使用。机器不用真的在水面上移动，也能测量距离。另一间教室可以看水球介绍视频。我的活动卡快填满了，但还需要尝试一项团队运动。朋友指向羽毛球场，那里进行双打还需要两名队员。' },
  questions: [
    c('先介绍再特指：We tried a rowing machine. ___ machine was easy to use.', ['A', 'The', 'An'], 'The', '第二次提到同一台机器，使用 the。'),
    c('普通否定句：There are not ___ empty courts now.', ['some', 'a', 'any'], 'any', '否定句中表示任何、一些，通常用 any。'),
    c('本课中的 polo 指一项在泳池里进行的团队运动，完整名称是什么？', ['water polo', 'table tennis', 'horse racing'], 'water polo', '源词表此处是水球；现代日常表达用 water polo 更清楚。'),
    c('根据短文，“我”的活动卡还缺哪一类体验？', ['一项团队运动', '一次画画活动', '一次火车旅行'], '一项团队运动', '作者 still need to try one team game。'),
    t('填 the 或 none（表示不加冠词）：Our geography video follows ___ Yangtze River.', ['the'], '河流名称前通常加定冠词 the。'),
    o('排列单词，表达“球场附近有一些空座位”。', 'There are some empty seats near the court.', '肯定句可用 some 修饰复数名词 empty seats。')
  ], sourcePages: [145, 146], coverageNotes: 'Wayle 保留为河名识读项；polo 按源语境讲水球，并明确现代常用完整形式 water polo。'
},
{
  sourceLesson: 31, title: '放学后不再只看手机', scene: '个人习惯与校园社团', goal: '用 used to 对比过去的习惯与现在的变化。',
  grammar: g('used to 与过去进行时', 'used to 加动词原形表示过去经常做、现在已改变的习惯或状态。它不同于 was/were doing：后者只说明过去某个时刻正在做。使用 did 的否定和问句时，写 did not use to / Did...use to...?。', [['I used to spend every break alone.', '我过去每次课间都独自度过。'], ['I was talking to a classmate when the bell rang.', '铃响时，我正在和一位同学说话。']]),
  vocabulary: [
    v('retire', '退休；退出原有工作', 'Our former librarian plans to retire this winter.', '我们以前的图书管理员计划今年冬天退休。'),
    v('company', '公司', 'A local company donated notebooks to the event.', '一家本地公司为活动捐了笔记本。'),
    v('bicycle', '自行车', 'My bicycle has a basket for my schoolbag.', '我的自行车有一个放书包的车篮。'),
    v('save', '积蓄；节省；保存', 'I am trying to save enough money for a new dictionary.', '我在努力攒够买一本新词典的钱。'),
    v('workshop', '车间；工作坊', 'The school workshop has tools for simple woodwork.', '学校工坊有做简单木工的工具。'),
    v('helper', '帮手；助手', 'Each activity leader needs one helper.', '每位活动负责人需要一个帮手。'),
    v('employ', '雇用', 'The repair shop employs two trained workers.', '这家维修店雇用了两名受过培训的员工。'),
    v('grandson', '孙子；外孙', 'The older volunteer came with her grandson.', '那位年长志愿者带着她的孙子一起来了。')
  ],
  passage: { en: 'I used to come home and watch short videos until dinner. I did not feel rested afterwards, and my homework often began late. This term, I joined the school music club. Now I practise for twenty minutes after school and save videos for the weekend. Yesterday, I was practising a new song when my sister came in. She asked to join me. Our small routine has become something we both look forward to.', zh: '我以前回家后会一直刷短视频到晚饭。看完并没有感觉休息好，作业也常常开始得很晚。这学期，我加入了学校音乐社。现在我放学后练习二十分钟，把视频留到周末看。昨天，我正在练一首新歌，姐姐走了进来。她问能不能一起练。这个小习惯变成了我们俩都期待的事。' },
  questions: [
    c('过去的习惯、现在已改变：I ___ watch videos every afternoon.', ['am used', 'used to', 'was used'], 'used to', 'used to 加原形表示过去经常如此而现在不同。'),
    c('过去某一时刻正在做：I ___ when my sister entered the room.', ['used to sing every day', 'sing tomorrow', 'was singing'], 'was singing', '过去进行时 was singing 交代她进来时正在发生的动作。'),
    c('为了以后买词典而积攒钱，可以用哪个动词？', ['save', 'employ', 'retire'], 'save', 'save money 表示积蓄钱。'),
    c('根据短文，“我”现在把看短视频留到什么时候？', ['每天晚饭前', '周末', '音乐社排练时'], '周末', '短文说 save videos for the weekend。'),
    t('填写两个词：Did you ___ ___ practise alone?（过去常常）', ['use to'], '有 Did 时用原形 use，不再写 used。'),
    o('排列单词，表达“我过去常常很晚才开始写作业”。', 'I used to start my homework very late.', 'used to 加动词原形 start，说明过去常有的习惯。')
  ], sourcePages: [149, 150]
},
{
  sourceLesson: 32, title: '礼物包装不必贵', scene: '朋友生日与环保选择', goal: '用 as...as 和 not as/so...as 做程度比较。',
  grammar: g('同级比较与否定比较', 'as 加形容词或副词原级再加 as，表示两者在某方面相当。not as...as 或 not so...as 表示前者不及后者。中间用原级，不使用比较级；也可以把否定比较改写成合适的比较级句子。', [['This paper is as strong as the new paper.', '这张纸和新纸一样结实。'], ['The large box is not as easy to carry as the small one.', '大盒子不如小盒子容易搬。']]),
  vocabulary: [
    v('once', '曾经；以前；也可指一次', 'I once made a birthday card from an old calendar.', '我曾用旧日历做过一张生日卡。'),
    v('temptation', '诱惑；想做某事的冲动', 'I resisted the temptation to buy another set of stickers.', '我忍住了再买一套贴纸的诱惑。'),
    v('article', '物品；一件东西（本课义，较正式）；也可指文章', 'Each article in the display has a small price label.', '展台上的每件物品都有一个小价格标签。'),
    v('wrap', '包裹；包装（wrapped, wrapped）', 'Wrap the notebook in clean paper before adding the ribbon.', '先用干净的纸包好笔记本，再系丝带。'),
    v('simply', '仅仅；只；简单地', 'You can simply use the back of an old sheet of paper.', '你只需使用一张旧纸的背面。'),
    v('arrest', '逮捕（动词）', 'The detective story ends when the police arrest the thief.', '这个侦探故事以警方逮捕小偷结束。')
  ],
  passage: { en: 'I once thought a present needed expensive wrapping to look special. For my friend’s birthday, I compared two ways to wrap a notebook. Clean brown paper was not as shiny as the shop’s gift wrap, but it was just as strong. I added a hand-drawn label and a ribbon from an old box. The result looked as cheerful as the expensive version. My friend liked the drawing best, so next time I may simply make my own packaging again.', zh: '我曾以为礼物需要昂贵包装才显得特别。朋友生日时，我比较了两种包装笔记本的方法。干净的牛皮纸不如店里的礼品纸亮，但一样结实。我加了一张手绘标签和一条从旧盒子上留下的丝带。成品看起来和昂贵的版本一样欢乐。朋友最喜欢那幅画，所以我下次可能还会自己做包装。' },
  questions: [
    c('同级比较中用原级：This bag is as ___ as that one.', ['stronger', 'strong', 'strongest'], 'strong', 'as...as 中间放形容词原级 strong。'),
    c('选择与“盒子甲不如盒子乙重”意思一致的句子。', ['Box A is as heavy as Box B.', 'Box A is heavier than Box B.', 'Box A is not as heavy as Box B.'], 'Box A is not as heavy as Box B.', 'not as heavy as 表示重量不及对方。'),
    c('准备礼物时，用纸把笔记本包起来，应使用哪个动词？', ['wrap', 'arrest', 'retire'], 'wrap', 'wrap 表示包裹或包装。'),
    c('根据短文，朋友最喜欢礼物包装的哪一部分？', ['昂贵的商店包装', '手绘图画', '纸上的价格标签'], '手绘图画', '短文说朋友 liked the drawing best。'),
    t('从 as 或 than 中选择，表达两条丝带一样长：This ribbon is as long ___ that one.', ['as'], '同级比较使用 as long as，中间的 long 保持原级。'),
    o('排列单词，表达“这个盒子和那个盒子一样结实”。', 'This box is as strong as that one.', '比较同样的程度时用 as strong as，strong 保持原级。')
  ], sourcePages: [153, 154]
}
];

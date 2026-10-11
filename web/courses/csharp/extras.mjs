// New C# lessons (review items 8–10): one review at the start of each chapter, plus
// predict-the-output, fix-the-bug and fill-in-the-blank exercises in every chapter.
// `after` names the lesson each new one is placed behind (null = chapter start).
const prelude = 'using System;\nusing System.Collections.Generic;\n\n';
const one = output => [{ input: '', output }];
function shuffle(id, choices, answer) {
  const seed = [...id].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 7);
  const shift = seed % choices.length;
  const shuffled = choices.map((_, index) => choices[(index + shift) % choices.length]);
  return { choices: shuffled, answer: (answer - shift + choices.length) % choices.length };
}
const predict = (chapter, after, id, title, topic, teach, code, choices, hints, extra = {}) => ({ chapter, after, lesson: {
  id, title, topic, teach, type: 'predict', objective: '先别运行，在脑子里逐行执行这段程序，选出它完整的输出（↵ 表示换行）。',
  solution: prelude + code, ...shuffle(id, choices, 0), tests: one(choices[0]), hints, ...extra } });
const fix = (chapter, after, id, title, topic, teach, objective, buggy, code, output, hints, extra = {}) => ({ chapter, after, lesson: {
  id, title, topic, teach, type: 'fix', objective, starter: prelude + buggy, solution: prelude + code, tests: extra.tests ?? one(output), hints, ...extra } });
const fill = (chapter, after, id, title, topic, teach, objective, blanks, code, output, hints, extra = {}) => ({ chapter, after, lesson: {
  id, title, topic, teach, type: 'fill', objective, starter: prelude + blanks, solution: prelude + code, tests: extra.tests ?? one(output), hints, ...extra } });
const review = (chapter, id, title, topic, teach, code, choices, hints) => predict(chapter, null, id, title, topic, teach, code, choices, hints, { review: true });

export const csharpExtras = [
  // ----- cs01 -----
  predict('cs01', 'cs01-03', 'cs01-p1', '预测：拼起来的旗语', '预测输出：Write 与 WriteLine', '读代码、预测输出是程序员每天都在做的练习：不运行，只在脑子里一行行执行。\n这题考 Write 和 WriteLine 的区别：Write 输出后不换行，下一次输出会接在同一行。',
    'Console.Write("North");\nConsole.WriteLine("Gate");\nConsole.WriteLine("Open");', ['NorthGate\nOpen\n', 'North\nGate\nOpen\n', 'North Gate\nOpen\n', 'NorthGateOpen\n'],
    ['第一句是 Write，输出后不换行。', '第二句接在 North 后面，然后换行。', '第三句单独一行。']),
  fix('cs01', 'cs01-07', 'cs01-f1', '改错：大写的生命', '改错：变量名区分大小写', 'C# 区分大小写：hp 和 Hp 是两个不同的名字。使用一个从没声明过的名字，编译器会报 CS0103：“当前上下文中不存在名称 Hp”。\n看到 CS0103，就去对照声明那一行的拼写和大小写。',
    '修好程序，让它输出 30。', 'int hp = 30;\nConsole.WriteLine(Hp);\n', 'int hp = 30;\nConsole.WriteLine(hp);', '30\n',
    ['运行后读报错：哪个名字不存在？', '声明写的是 hp，使用时写成了什么？', '把 Hp 改成 hp。'], { required: ['WriteLine(hp)'] }),
  fill('cs01', 'cs01-08', 'cs01-b1', '填空：名牌上的空位', '填空：字符串插值', '填空题：程序大部分已经写好，只需要把 ____ 换成正确的代码。\n字符串插值的两个要点：字符串前面加 $，变量放在花括号 { } 里。',
    '把两个 ____ 补全，输出 Mira Lv.2。', 'string name = "Mira";\nint level = 2;\nConsole.WriteLine(____"{name} Lv.{____}");\n', 'string name = "Mira";\nint level = 2;\nConsole.WriteLine($"{name} Lv.{level}");', 'Mira Lv.2\n',
    ['字符串前面缺了什么符号，花括号才会被替换？', '第二个空要放等级变量。', '依次填 $ 和 level。']),
  // ----- cs02 -----
  review('cs02', 'cs02-r1', '复习：雾港的面板', '复习变量与插值', '开始新章节前，先用一道小题复习第 1 章：变量、复合赋值和字符串插值。',
    'int gold = 10;\ngold += 5;\nstring name = "Kai";\nConsole.WriteLine($"{name}: {gold}");', ['Kai: 15\n', 'Kai: 10\n', '{name}: {gold}\n', 'name: 15\n'],
    ['gold 先是 10，再加 5。', '插值会把 {name} 和 {gold} 换成变量的值。', '冒号后有一个空格。']),
  predict('cs02', 'cs02-07', 'cs02-p1', '预测：平均分的陷阱', '预测输出：整数除法与转换', '三个看起来差不多的表达式：7 / 2、7 / 2.0、(double)(7 / 2)。\n两个整数相除结果是整数，小数被截断；只要有一边是小数，就按小数算；括号里的先算。',
    'Console.WriteLine(7 / 2);\nConsole.WriteLine(7 / 2.0);\nConsole.WriteLine((double)(7 / 2));', ['3\n3.5\n3\n', '3.5\n3.5\n3.5\n', '3\n3.5\n3.5\n', '4\n3.5\n4\n'],
    ['7 / 2 两边都是整数。', '7 / 2.0 有一边是小数。', '(double)(7 / 2) 先算括号里的整数除法得到 3；double 的 3 输出时显示为 3。']),
  fix('cs02', 'cs02-08', 'cs02-f1', '改错：数字变成了文字', '改错：先把文字转成整数', 'ReadLine 读到的永远是文字（string）。"5" + 1 不是 6，而是把文字拼起来，或者直接编译失败。想做数学运算，要先用 int.Parse 把文字变成整数。\n这段程序把 string 直接赋给 int，编译器会报 CS0029：无法把 string 隐式转换为 int。',
    '修好程序：读取一个整数，输出它加 1 的结果。', 'int age = Console.ReadLine() ?? "0";\nConsole.WriteLine(age + 1);\n', 'int age = int.Parse(Console.ReadLine() ?? "0");\nConsole.WriteLine(age + 1);', '',
    ['读报错 CS0029：哪种类型不能变成哪种类型？', 'ReadLine 返回 string，需要转换成 int。', '写成 int.Parse(Console.ReadLine() ?? "0")。'], { tests: [{ input: '18\n', output: '19\n' }, { input: '0\n', output: '1\n' }], required: ['int.Parse'] }),
  // ----- cs03 -----
  review('cs03', 'cs03-r1', '复习：集市的账本', '复习输入与整数运算', '复习第 2 章：整数除法会丢掉小数，% 求余数。',
    'int gold = 17;\nConsole.WriteLine($"{gold / 3} {gold % 3}");', ['5 2\n', '5.6 2\n', '5 1\n', '6 2\n'],
    ['17 除以 3 商几？', '整数除法不保留小数。', '17 = 3 × 5 + 2。']),
  predict('cs03', 'cs03-03', 'cs03-p1', '预测：阶梯从上往下', '预测输出：else if 的顺序', 'else if 阶梯从上往下检查，第一个成立的分支执行后，后面的都跳过。所以条件的顺序会改变结果。',
    'int hp = 80;\nif (hp > 30) Console.WriteLine("Wounded");\nelse if (hp > 70) Console.WriteLine("Healthy");\nelse Console.WriteLine("Critical");', ['Wounded\n', 'Healthy\n', 'Wounded\nHealthy\n', 'Critical\n'],
    ['hp 是 80，先检查第一个条件。', '80 > 30 成立。', '第一个成立后，后面的分支都不检查了——这其实是一个顺序 bug。']),
  fix('cs03', 'cs03-07', 'cs03-f1', '改错：一个等号的陷阱', '改错：== 与 =', '判断相等要写两个等号 ==。一个等号 = 是赋值，C# 不允许把赋值当成 if 的条件（int 不是 bool），会报 CS0029。\n这是从其他语言转来的人和新手最常犯的错误之一。',
    '修好条件判断：读取整数，等于 7 时输出 Lucky，否则输出 Normal。', 'int roll = int.Parse(Console.ReadLine() ?? "0");\nif (roll = 7) Console.WriteLine("Lucky");\nelse Console.WriteLine("Normal");\n', 'int roll = int.Parse(Console.ReadLine() ?? "0");\nif (roll == 7) Console.WriteLine("Lucky");\nelse Console.WriteLine("Normal");', '',
    ['读报错：条件需要 bool，但得到了什么？', 'if 里的 = 是赋值。', '把 = 改成 ==。'], { tests: [{ input: '7\n', output: 'Lucky\n' }, { input: '3\n', output: 'Normal\n' }], required: ['=='] }),
  fill('cs03', 'cs03-02', 'cs03-b1', '填空：刚好够买', '填空：比较运算符', '选对比较运算符是写条件的关键：金币刚好等于价格时也应该能买，所以要包含等于的情况。> 不含等于，>= 含等于。',
    '把 ____ 换成正确的运算符：金币大于或等于 8 时输出 Buy，否则输出 Save。', 'int gold = int.Parse(Console.ReadLine() ?? "0");\nif (gold ____ 8) Console.WriteLine("Buy");\nelse Console.WriteLine("Save");\n', 'int gold = int.Parse(Console.ReadLine() ?? "0");\nif (gold >= 8) Console.WriteLine("Buy");\nelse Console.WriteLine("Save");', '',
    ['金币正好是 8 时应该买。', '需要“大于或等于”。', '填 >=。'], { tests: [{ input: '8\n', output: 'Buy\n' }, { input: '7\n', output: 'Save\n' }, { input: '20\n', output: 'Buy\n' }] }),
  // ----- cs04 -----
  review('cs04', 'cs04-r1', '复习：森林的路标', '复习条件与逻辑', '复习第 3 章：&& 要求两边都成立；! 取反。',
    'int level = 3;\nbool hasKey = false;\nif (level >= 3 && !hasKey) Console.WriteLine("Find the key");\nelse Console.WriteLine("Go");', ['Find the key\n', 'Go\n', 'Find the key\nGo\n', '（没有输出）\n'],
    ['level >= 3 成立吗？', '!hasKey 是 !false，也就是 true。', '两边都成立，执行 if 分支。']),
  predict('cs04', 'cs04-08', 'cs04-p1', '预测：台阶有几级', '预测输出：嵌套循环', '嵌套循环里，外层每走一步，内层都要完整跑一遍。这题内层的次数跟着外层变化（c <= r）。',
    'for (int r = 1; r <= 3; r++) {\n  for (int c = 1; c <= r; c++) Console.Write(c);\n  Console.WriteLine();\n}', ['1\n12\n123\n', '123\n123\n123\n', '1\n22\n333\n', '123\n12\n1\n'],
    ['r = 1 时内层输出 1。', '内层输出的是 c，不是 r。', 'r = 3 时输出 123。']),
  fix('cs04', 'cs04-01', 'cs04-f1', '改错：少走了一级', '改错：循环边界差一', '“差一错误”是循环最常见的 bug：多走一次或少走一次。检查方法：第一轮 i 是几？最后一轮 i 是几？一共几轮？',
    '程序应输出 1 到 5 共五行，修好循环条件。', 'for (int i = 1; i < 5; i++) Console.WriteLine(i);\n', 'for (int i = 1; i <= 5; i++) Console.WriteLine(i);', '1\n2\n3\n4\n5\n',
    ['运行看看最后输出的是几。', 'i < 5 时最后一轮是 4。', '把 < 改成 <=。']),
  // ----- cs05 -----
  review('cs05', 'cs05-r1', '复习：回声的次数', '复习循环与 break', '复习第 4 章：数清楚循环执行了几次；break 立刻结束整个循环。',
    'int sum = 0;\nfor (int i = 1; i <= 10; i++) {\n  if (i > 3) break;\n  sum += i;\n}\nConsole.WriteLine(sum);', ['6\n', '55\n', '10\n', '3\n'],
    ['i 为 1、2、3 时累加。', 'i 为 4 时 break。', '1 + 2 + 3 = 6。']),
  predict('cs05', 'cs05-07', 'cs05-p1', '预测：复印件被修改', '预测输出：值参数', 'int 参数是一份拷贝：方法里修改参数，调用处的变量不受影响。想把结果带回去，要用 return。',
    'void Boost(int hp) { hp += 10; }\nint hp = 5;\nBoost(hp);\nConsole.WriteLine(hp);', ['5\n', '15\n', '10\n', '0\n'],
    ['Boost 收到的是 hp 的拷贝。', '方法里加的是拷贝。', '外面的 hp 还是 5。']),
  fix('cs05', 'cs05-03', 'cs05-f1', '改错：没交回的结果', '改错：缺少 return', '声明了返回类型 int 的方法，每条路径都必须 return 一个值，否则编译器报 CS0161：“并非所有代码路径都返回值”。\n只算出结果而不 return，调用处什么也拿不到。',
    '修好 Damage 方法，让程序输出 7。', 'int Damage(int atk, int def) {\n  int d = atk - def;\n}\nConsole.WriteLine(Damage(12, 5));\n', 'int Damage(int atk, int def) {\n  int d = atk - def;\n  return d;\n}\nConsole.WriteLine(Damage(12, 5));', '7\n',
    ['读报错 CS0161。', '方法算出了 d，但交回了吗？', '在方法最后加 return d;。'], { required: ['return'] }),
  fill('cs05', 'cs05-05', 'cs05-b1', '填空：方法的返回类型', '填空：返回类型与 return', '方法名前面写返回类型：只做事不交回结果写 void，交回整数写 int，交回真假写 bool。return 后面写要交回的值。',
    '把两个 ____ 补全，输出 True 和 False。', '____ IsAlive(int hp) {\n  ____ hp > 0;\n}\nConsole.WriteLine(IsAlive(3));\nConsole.WriteLine(IsAlive(0));\n', 'bool IsAlive(int hp) {\n  return hp > 0;\n}\nConsole.WriteLine(IsAlive(3));\nConsole.WriteLine(IsAlive(0));', 'True\nFalse\n',
    ['方法交回的是“真或假”。', '交回结果的关键字是什么？', '依次填 bool 和 return。']),
  // ----- cs06 -----
  review('cs06', 'cs06-r1', '复习：法师的咒语卷轴', '复习方法与返回值', '复习第 5 章：调用方法时参数按顺序传入，return 把结果交回调用处。',
    'int Twice(int n) { return n * 2; }\nint Add(int a, int b) { return a + b; }\nConsole.WriteLine(Add(Twice(3), 1));', ['7\n', '8\n', '6\n', '9\n'],
    ['先算里层的 Twice(3)。', 'Twice(3) 是 6。', 'Add(6, 1) 是 7。']),
  predict('cs06', 'cs06-02', 'cs06-p1', '预测：最后一个格子', '预测输出：下标从 0 开始', '数组下标从 0 开始，最后一个下标是 Length - 1。arr[arr.Length] 已经越界，会抛出 IndexOutOfRangeException。',
    'int[] hp = { 4, 9, 2 };\nhp[1] = 7;\nConsole.WriteLine($"{hp[0]} {hp[hp.Length - 1]} {hp.Length}");', ['4 2 3\n', '9 2 3\n', '4 7 3\n', '4 2 2\n'],
    ['hp[1] 被改成了 7，但没有被输出。', '最后一个下标是 Length - 1 = 2。', 'Length 是 3。']),
  fix('cs06', 'cs06-03', 'cs06-f1', '改错：越界的回声', '改错：数组越界', '数组有 3 个元素时，合法下标只有 0、1、2。循环写成 i <= scores.Length 会在最后一轮访问 scores[3]，运行时抛出 IndexOutOfRangeException（索引超出了数组界限）。\n这种错误能编译，运行时才出现，所以要读运行时的报错信息。',
    '修好循环，逐行输出 3 个分数。', 'int[] scores = { 5, 8, 2 };\nfor (int i = 0; i <= scores.Length; i++) Console.WriteLine(scores[i]);\n', 'int[] scores = { 5, 8, 2 };\nfor (int i = 0; i < scores.Length; i++) Console.WriteLine(scores[i]);', '5\n8\n2\n',
    ['运行看看出了什么异常。', '最后一轮 i 等于几？', '把 <= 改成 <。']),
  // ----- csoop -----
  review('csoop', 'csoop-r1', '复习：背包里的东西', '复习 List 与 foreach', '复习第 6 章：List 用 Add 添加、Count 计数，foreach 逐个取出元素。',
    'var bag = new List<string> { "Herb" };\nbag.Add("Key");\nforeach (string item in bag) Console.Write(item + " ");\nConsole.WriteLine(bag.Count);', ['Herb Key 2\n', 'Key Herb 2\n', 'Herb Key 1\n', 'Herb 1\n'],
    ['bag 一开始有 Herb。', 'Add 把 Key 加在后面。', 'Count 是 2。']),
  predict('csoop', 'cs06-11', 'csoop-p1', '预测：同一位英雄', '预测输出：引用类型', '类是引用类型：var b = a; 没有复制出第二个对象，a 和 b 指向同一个对象。通过 b 修改，a 也能看到变化。',
    'var a = new Hero();\nvar b = a;\nb.Hp = 3;\nConsole.WriteLine(a.Hp);\nclass Hero { public int Hp = 10; }', ['3\n', '10\n', '13\n', '0\n'],
    ['b = a 复制的是“指向同一个对象的引用”。', 'b.Hp = 3 修改的是那个对象。', 'a 指向同一个对象。']),
  fix('csoop', 'cs06-12', 'csoop-f1', '改错：受保护的生命', '改错：private set 只能在类内部修改', 'private set 表示这个属性只能在类内部修改。在类外面写 hero.Hp = 0; 会报 CS0272（set 访问器不可访问）。\n这正是封装的目的：想改生命，就调用类提供的方法（比如 TakeDamage）。',
    '不要直接改 Hp，改为调用 TakeDamage(5)，让程序输出 7。', 'var hero = new Hero();\nhero.Hp = hero.Hp - 5;\nConsole.WriteLine(hero.Hp);\nclass Hero {\n  public int Hp { get; private set; } = 12;\n  public void TakeDamage(int d) { Hp = Math.Max(0, Hp - d); }\n}\n', 'var hero = new Hero();\nhero.TakeDamage(5);\nConsole.WriteLine(hero.Hp);\nclass Hero {\n  public int Hp { get; private set; } = 12;\n  public void TakeDamage(int d) { Hp = Math.Max(0, Hp - d); }\n}', '7\n',
    ['读报错 CS0272：哪个属性的 set 不可访问？', '类提供了什么方法来扣血？', '把第二行换成 hero.TakeDamage(5);。'], { required: ['TakeDamage(5)'] }),
  // ----- cs07 -----
  review('cs07', 'cs07-r1', '复习：英雄工坊', '复习类与方法', '复习英雄工坊：构造方法给对象设置初始状态，实例方法修改对象自己的数据。',
    'var h = new Hero(8);\nh.Heal(5);\nConsole.WriteLine(h.Hp);\nclass Hero {\n  public int Hp;\n  public Hero(int hp) { Hp = hp; }\n  public void Heal(int n) { Hp = Math.Min(10, Hp + n); }\n}', ['10\n', '13\n', '8\n', '5\n'],
    ['构造方法让 Hp = 8。', 'Heal(5) 想加到 13。', 'Math.Min(10, 13) 是 10。']),
  predict('cs07', 'cs07-04', 'cs07-p1', '预测：钥匙只能用一次', '预测输出：资源消耗', '游戏状态会随命令变化：第一次开门消耗钥匙，第二次就没有钥匙了。逐条命令跟踪 keys 的值。',
    'int keys = 1;\nforeach (string cmd in new[] { "open", "open" }) {\n  if (keys > 0) { keys--; Console.WriteLine("Opened"); }\n  else Console.WriteLine("Locked");\n}', ['Opened\nLocked\n', 'Opened\nOpened\n', 'Locked\nLocked\n', 'Locked\nOpened\n'],
    ['第一次 open 时 keys 是 1。', '开门后 keys 变成 0。', '第二次 open 没有钥匙。']),
  fix('cs07', 'cs07-07', 'cs07-f1', '改错：重复的奖励', '改错：奖励只能发一次', '游戏里的 bug 往往是逻辑错误：能编译，结果不对。这段程序每次 fight 都发 5 金币，因为没有记录敌人是否已经被击败。\n用一个 bool 变量记住状态，第二次就输出 Clear。',
    '修好程序：第一次 fight 输出 Won Gold:5，之后的 fight 输出 Clear。', 'int gold = 0;\nstring? cmd;\nwhile ((cmd = Console.ReadLine()) != null) {\n  if (cmd == "fight") { gold += 5; Console.WriteLine($"Won Gold:{gold}"); }\n}\n', 'int gold = 0;\nbool defeated = false;\nstring? cmd;\nwhile ((cmd = Console.ReadLine()) != null) {\n  if (cmd == "fight") {\n    if (defeated) Console.WriteLine("Clear");\n    else { defeated = true; gold += 5; Console.WriteLine($"Won Gold:{gold}"); }\n  }\n}', '',
    ['运行两次 fight，看看金币。', '需要一个变量记住“敌人已被击败”。', '加 bool defeated，第一次战斗后设为 true，之后输出 Clear。'], { tests: [{ input: 'fight\nfight\n', output: 'Won Gold:5\nClear\n' }, { input: 'fight\n', output: 'Won Gold:5\n' }], required: ['bool'] })
];

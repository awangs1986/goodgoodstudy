// Exercise variety (review item 8): predict-the-output, fix-the-bug and fill-in-the-blank
// lessons sprinkled through every chapter. Pointer chapters already gained theirs in
// lessons-structure.mjs (D6-N01/N04, D7-N01/N02/N03/N05, D7-N04).
import { cProgram, makeLesson } from './lesson-factory.mjs';
import { r, T } from './teach/helpers.mjs';

const p = (body, helpers = '', headers = '#include <stdio.h>') => cProgram(body, helpers, headers);
const full = (body, helpers = '', headers = '#include <stdio.h>') => `${p(body, helpers, headers)}`;
const lesson = (chapterId, spec) => makeLesson({ id: chapterId, title: '', scene: '' }, spec);
const predictObjective = '阅读编辑器里的程序，先别运行，选出它<b>完整的输出</b>（·表示空格，↵表示换行）。答对后可以运行验证。';

export const varietyLessons = [
  // ----- Day 1 -----
  lesson('day01', { id: 'D1-P01', difficulty: '★☆☆ 入门', title: '预测：没有换行的钟声', knowledge: '预测输出：\\n 的位置', type: 'predict',
    en: { title: 'Predict: Bells Without Newlines', topic: 'Where \\n goes' },
    ...T(r`<b>读代码、预测输出</b>是程序员每天都在做的事：不运行，只在脑子里一行行“执行”。|这题考的是换行：printf 只在遇到 <code>\n</code> 时换行，没有 \n 的输出会和下一次输出连在一起。`, undefined,
      [r`第一个 printf 输出 Dawn 后没有换行。`, r`第二个 printf 接在同一行，然后换行。`, r`第三个 printf 在新的一行。`]),
    task: '预测输出。', objective: predictObjective,
    choices: ['DawnBell\nRing\n', 'Dawn\nBell\nRing\n', 'Dawn Bell\nRing\n', 'DawnBellRing\n'], answer: 0,
    solution: p(r`    printf("Dawn");
    printf("Bell\n");
    printf("Ring\n");`) }),
  lesson('day01', { id: 'D1-F01', difficulty: '★☆☆ 入门', title: '改错：大写的生命', knowledge: '改错：变量名区分大小写', type: 'fix',
    en: { title: 'Fix: The Capitalized HP', topic: 'Names are case-sensitive' },
    ...T(r`C 区分大小写：<code>hp</code>、<code>HP</code>、<code>Hp</code> 是三个不同的名字。|用了一个没声明过的名字，编译器会报 <code>use of undeclared identifier</code>（使用了未声明的标识符）。看到这类报错，就去对照声明那一行的拼写。`, r`int gold = 5;
printf("%d\n", Gold);   // 错误：Gold 没声明过`,
      [r`运行后看报错指出的是哪个名字。`, r`声明写的是 hp，使用时写成了什么？`, r`把 printf 里的 <code>HP</code> 改成 <code>hp</code>，输出 <code>HP: 27</code>。`]),
    task: '修好未声明的变量。', objective: '修好程序，让它输出 <code>HP: 27</code>。',
    starterCode: full(r`    int hp = 27;
    printf("HP: %d\n", HP);`),
    outputRule: { mode: 'exact', value: 'HP: 27\n' }, must: [[/printf\s*\([^;]*,\s*hp\s*\)/, '请输出变量 hp。']],
    solution: p(r`    int hp = 27;
    printf("HP: %d\n", hp);`) }),
  lesson('day01', { id: 'D1-B01', difficulty: '★☆☆ 入门', title: '填空：药剂刻度', knowledge: '填空：选择格式符', type: 'fill',
    en: { title: 'Fill In: Potion Gauge', topic: 'Choosing a format specifier' },
    ...T(r`<b>填空题</b>：程序的大部分已经写好，你只需要把 <code>____</code> 换成正确的代码。|格式符速查：<code>%d</code> 整数、<code>%c</code> 字符、<code>%s</code> 文字、<code>%f</code> 小数（<code>%.1f</code> 保留 1 位）、<code>%%</code> 百分号。`, undefined,
      [r`第一个空要输出 float，并保留一位小数。`, r`第二个空要输出 char。`, r`依次填 <code>%.1f</code> 和 <code>%c</code>。`]),
    task: '填写格式符。', objective: '把两个 <code>____</code> 换成正确的格式符，让程序输出 <code>Potion: 12.5 ml</code> 和 <code>Grade: A</code>。',
    starterCode: full(r`    float potion = 12.5f;
    char grade = 'A';
    printf("Potion: ____ ml\n", potion);
    printf("Grade: ____\n", grade);`),
    outputRule: { mode: 'exact', value: 'Potion: 12.5 ml\nGrade: A\n' },
    solution: p(r`    float potion = 12.5f;
    char grade = 'A';
    printf("Potion: %.1f ml\n", potion);
    printf("Grade: %c\n", grade);`) }),

  // ----- Day 2 -----
  lesson('day02', { id: 'D2-P01', difficulty: '★★☆ 基础', title: '预测：半瓶魔药的陷阱', knowledge: '预测输出：整数除法与转换', type: 'predict',
    en: { title: 'Predict: The Half-Potion Trap', topic: 'Integer division and casts' },
    ...T(r`三个看起来差不多的表达式：<code>7 / 2</code>、<code>7 / 2.0</code>、<code>(float)(7 / 2)</code>。|规则：两个整数相除，结果是整数，小数被<b>截断</b>；只要有一边是小数，就按小数算；括号里的先算——<code>(float)(7 / 2)</code> 先得到整数 3，再变成 3.0，丢掉的 0.5 回不来了。`, undefined,
      [r`7 / 2 两边都是整数。`, r`7 / 2.0 有一边是小数。`, r`(float)(7 / 2) 先算括号里的整数除法。`]),
    task: '预测输出。', objective: predictObjective,
    choices: ['3 3.5 3.0\n', '3.5 3.5 3.5\n', '3 3.5 3.5\n', '4 3.5 4.0\n'], answer: 0,
    solution: p(r`    printf("%d ", 7 / 2);
    printf("%.1f ", 7 / 2.0);
    printf("%.1f\n", (float)(7 / 2));`) }),
  lesson('day02', { id: 'D2-F01', difficulty: '★★☆ 基础', title: '改错：消失的蓝门', knowledge: '改错：交换需要临时变量', type: 'fix',
    en: { title: 'Fix: The Vanishing Blue Gate', topic: 'Swapping needs a temporary' },
    ...T(r`这段程序<b>能编译、能运行</b>，但结果不对——这叫<b>逻辑错误</b>，编译器帮不了你，只能靠你读代码。|逐行跟踪变量：执行 <code>red = blue;</code> 后，red 和 blue 都是 9，red 原来的 2 已经丢了。D2-Q12 学过的办法：先用 temp 保存。`, undefined,
      [r`先运行，看看 After 那一行哪里不对。`, r`第一句赋值以后，red 的旧值还在吗？`, r`用 <code>temp = red; red = blue; blue = temp;</code> 三步交换。`]),
    task: '修好交换逻辑。', objective: '修好程序，输出 <code>Before: 2 9</code> 和 <code>After: 9 2</code>。',
    starterCode: full(r`    int red = 2, blue = 9;
    printf("Before: %d %d\n", red, blue);
    red = blue;
    blue = red;
    printf("After: %d %d\n", red, blue);`),
    outputRule: { mode: 'exact', value: 'Before: 2 9\nAfter: 9 2\n' },
    solution: p(r`    int red = 2, blue = 9, temp;
    printf("Before: %d %d\n", red, blue);
    temp = red;
    red = blue;
    blue = temp;
    printf("After: %d %d\n", red, blue);`) }),

  // ----- Day 3 -----
  lesson('day03', { id: 'D3-P01', difficulty: '★★☆ 基础', title: '预测：一个等号的陷阱', knowledge: '预测输出：= 与 ==', type: 'predict',
    en: { title: 'Predict: The Single Equals Trap', topic: '= versus ==' },
    ...T(r`<code>if (hp = 0)</code> 不是比较！它先把 0 <b>赋值</b>给 hp，然后用赋值的结果 0 当条件——0 是假，所以永远走 else，而且 hp 被悄悄改成了 0。|编译器通常会给一条警告（using the result of an assignment as a condition），这类警告一定要看。比较相等请写 <code>==</code>。`, undefined,
      [r`if 里的 = 是赋值，hp 变成了 0。`, r`条件的值是 0，也就是假。`, r`走 else，最后再打印被改过的 hp。`]),
    task: '预测输出。', objective: predictObjective,
    choices: ['Alive\n0\n', 'Fallen\n5\n', 'Alive\n5\n', 'Fallen\n0\n'], answer: 0,
    solution: p(r`    int hp = 5;
    if ((hp = 0)) printf("Fallen\n");
    else printf("Alive\n");
    printf("%d\n", hp);`) }),
  lesson('day03', { id: 'D3-F01', difficulty: '★★☆ 基础', title: '改错：猫头鹰说了两遍', knowledge: '改错：switch 漏写 break', type: 'fix',
    en: { title: 'Fix: The Owl Speaks Twice', topic: 'Missing break in switch' },
    ...T(r`switch 找到匹配的 case 后，会<b>一直往下执行</b>，直到遇到 break 或 switch 结束。忘了 break，就会“掉进”下一个 case，这叫<b>贯穿</b>（fall-through）。|这是一个典型的逻辑错误：能编译，输出却多了一行。`, undefined,
      [r`运行看看：输入 'a' 时输出了几行？`, r`case 'a' 后面少了什么？`, r`在 <code>printf("West\n");</code> 后加上 <code>break;</code>。`]),
    task: '修好 switch。', objective: '方向是 <code>a</code> 时只应输出一行 <code>West</code>。修好程序。',
    starterCode: full(r`    char direction = 'a';
    switch (direction) {
        case 'w': printf("North\n"); break;
        case 'a': printf("West\n");
        case 's': printf("South\n"); break;
        default: printf("You hit a tree.\n");
    }`),
    outputRule: { mode: 'exact', value: 'West\n' },
    solution: p(r`    char direction = 'a';
    switch (direction) {
        case 'w': printf("North\n"); break;
        case 'a': printf("West\n"); break;
        case 's': printf("South\n"); break;
        default: printf("You hit a tree.\n");
    }`) }),
  lesson('day03', { id: 'D3-B01', difficulty: '★☆☆ 入门', title: '填空：刚好够买', knowledge: '填空：比较运算符', type: 'fill',
    en: { title: 'Fill In: Just Enough Gold', topic: 'Comparison operators' },
    ...T(r`选对比较运算符是写条件的关键：金币<b>刚好等于</b>价格时也应该能买，所以要包含等于的情况。|<code>&gt;</code> 不含等于，<code>&gt;=</code> 含等于。边界上的值（这里是 12 = 12）最容易出错。`, undefined,
      [r`gold 和 price 都是 12。`, r`需要“大于或等于”。`, r`填 <code>&gt;=</code>。`]),
    task: '填写比较运算符。', objective: '把 <code>____</code> 换成正确的运算符，让金币刚好够时输出 <code>Buy</code>。',
    starterCode: full(r`    int gold = 12, price = 12;
    if (gold ____ price) printf("Buy\n");
    else printf("Save\n");`),
    outputRule: { mode: 'exact', value: 'Buy\n' }, must: [[/gold\s*>=\s*price/, '金币刚好够也要能买：用 >=。']],
    solution: p(r`    int gold = 12, price = 12;
    if (gold >= price) printf("Buy\n");
    else printf("Save\n");`) }),

  // ----- Day 4 -----
  lesson('day04', { id: 'D4-P01', difficulty: '★★☆ 基础', title: '预测：砖墙有几块', knowledge: '预测输出：嵌套循环', type: 'predict',
    en: { title: 'Predict: How Many Bricks?', topic: 'Nested loops' },
    ...T(r`嵌套循环里，外层每走一步，内层都要<b>完整</b>跑一遍。|这题内层的次数跟着外层变化（<code>c &lt; r</code>），第 0 行一个都不画。逐行写下 r 的值和内层次数，就能得到答案。`, undefined,
      [r`r 取 0、1、2。`, r`内层次数等于 r：0 次、1 次、2 次。`, r`每行结束都换行，第一行是空行。`]),
    task: '预测输出。', objective: predictObjective,
    choices: ['\n#\n##\n', '#\n##\n###\n', '#\n##\n', '##\n#\n\n'], answer: 0,
    solution: p(r`    for (int r = 0; r < 3; r++) {
        for (int c = 0; c < r; c++) printf("#");
        printf("\n");
    }`) }),
  lesson('day04', { id: 'D4-F01', difficulty: '★★☆ 基础', title: '改错：少走了一步', knowledge: '改错：循环边界差一', type: 'fix',
    en: { title: 'Fix: One Step Short', topic: 'Off-by-one loop bound' },
    ...T(r`“差一错误”（off-by-one）是循环最常见的 bug：多走一次或少走一次。|检查方法：问自己“第一轮 i 是几？最后一轮 i 是几？一共几轮？”。<code>i &lt; 5</code> 最后一轮是 4，<code>i &lt;= 5</code> 最后一轮才是 5。`, undefined,
      [r`运行看看最后一行输出的是 Step 几。`, r`想包含 5，条件应该用哪个运算符？`, r`把 <code>i &lt; 5</code> 改成 <code>i &lt;= 5</code>。`]),
    task: '修好循环边界。', objective: '程序应输出 Step 1 到 Step 5 共五行。修好循环条件。',
    starterCode: full(r`    for (int i = 1; i < 5; i++) {
        printf("Step %d\n", i);
    }`),
    outputRule: { mode: 'exact', value: 'Step 1\nStep 2\nStep 3\nStep 4\nStep 5\n' },
    solution: p(r`    for (int i = 1; i <= 5; i++) {
        printf("Step %d\n", i);
    }`) }),
  lesson('day04', { id: 'D4-B01', difficulty: '★☆☆ 入门', title: '填空：金币累加器', knowledge: '填空：累加循环', type: 'fill',
    en: { title: 'Fill In: Coin Counter', topic: 'Accumulating in a loop' },
    ...T(r`累加三件套：①循环外 <code>total = 0</code>；②循环条件决定加到几；③循环体 <code>total += i</code>。|把三个空补齐，让程序算出 1 + 2 + 3 + 4 = 10。`, undefined,
      [r`total 要从几开始？`, r`i 要走到 4（包含 4）。`, r`依次填 <code>0</code>、<code>&lt;=</code>、<code>+=</code>。`]),
    task: '补全累加循环。', objective: '把三个 <code>____</code> 补全，输出 <code>Total: 10</code>。',
    starterCode: full(r`    int total = ____;
    for (int i = 1; i ____ 4; i++) {
        total ____ i;
    }
    printf("Total: %d\n", total);`),
    outputRule: { mode: 'exact', value: 'Total: 10\n' },
    solution: p(r`    int total = 0;
    for (int i = 1; i <= 4; i++) {
        total += i;
    }
    printf("Total: %d\n", total);`) }),

  // ----- Day 5 -----
  lesson('day05', { id: 'D5-P01', difficulty: '★★☆ 基础', title: '预测：提前结束的咒语', knowledge: '预测输出：return 立即结束函数', type: 'predict',
    en: { title: 'Predict: The Spell That Ends Early', topic: 'return ends a function' },
    ...T(r`函数执行到 <code>return</code> 就立刻结束，后面的语句不会执行。|这题 grade(85) 和 grade(40) 分别从哪个 return 离开？跟着参数走一遍。`, undefined,
      [r`grade(85)：85 >= 60 成立。`, r`成立时直接 return 'P'，后面不执行。`, r`grade(40) 走到最后的 return。`]),
    task: '预测输出。', objective: predictObjective,
    choices: ['P F\n', 'P P\n', 'F F\n', 'F P\n'], answer: 0,
    solution: p(r`    printf("%c %c\n", grade(85), grade(40));`, r`char grade(int score) {
    if (score >= 60) return 'P';
    return 'F';
}`) }),
  lesson('day05', { id: 'D5-F01', difficulty: '★★☆ 基础', title: '改错：不认识的预言', knowledge: '改错：缺少函数原型', type: 'fix',
    en: { title: 'Fix: The Unknown Prophecy', topic: 'Missing function prototype' },
    ...T(r`编译器从上往下读。main 里调用 prophecy 时，它还没见过这个函数，于是报错 <code>call to undeclared function 'prophecy'</code>。|两种修法：①把函数定义挪到 main 前面；②在 main 前面加一行原型 <code>void prophecy(void);</code>。D5-Q13 学过第二种。`, undefined,
      [r`读报错：哪个名字“undeclared”？`, r`函数的定义在 main 的前面还是后面？`, r`在 main 前加 <code>void prophecy(void);</code>。`]),
    task: '让编译器提前认识函数。', objective: '修好程序，输出 <code>Seven runes remember your name.</code>。',
    starterCode: `#include <stdio.h>

int main(void) {
    prophecy();
    return 0;
}

void prophecy(void) {
    printf("Seven runes remember your name.\\n");
}`,
    outputRule: { mode: 'exact', value: 'Seven runes remember your name.\n' },
    solution: `#include <stdio.h>

void prophecy(void);

int main(void) {
    prophecy();
    return 0;
}

void prophecy(void) {
    printf("Seven runes remember your name.\\n");
}` }),

  // ----- Day 6a -----
  lesson('day06', { id: 'D6-B01', difficulty: '★★☆ 基础', title: '填空：逐字念出真名', knowledge: "填空：'\\0' 循环条件", type: 'fill',
    en: { title: 'Fill In: Spell the True Name', topic: "Loop until '\\0'" },
    ...T(r`遍历字符串的标准写法：从下标 0 开始，<b>直到遇到结束符 '\0'</b> 为止。|字符常量用单引号；结束符写作 <code>'\0'</code>（反斜杠加数字 0）。`, undefined,
      [r`循环什么时候停？`, r`停在字符串的结束符上。`, r`填 <code>'\0'</code>。`]),
    task: '补全循环条件。', objective: "把 <code>____</code> 补全，逐字输出 <code>R-u-n-e-</code> 并换行。",
    starterCode: full(r`    char word[] = "Rune";
    for (int i = 0; word[i] != ____; i++) printf("%c-", word[i]);
    printf("\n");`),
    outputRule: { mode: 'exact', value: 'R-u-n-e-\n' }, must: [[/!=\s*'\\0'/, "循环条件请和 '\\0' 比较。"]],
    solution: p(r`    char word[] = "Rune";
    for (int i = 0; word[i] != '\0'; i++) printf("%c-", word[i]);
    printf("\n");`) }),

  // ----- Day 6b -----
  lesson('day06b', { id: 'D6-P01', difficulty: '★★☆ 基础', title: '预测：地图的行与列', knowledge: '预测输出：map[行][列]', type: 'predict',
    en: { title: 'Predict: Rows and Columns', topic: 'map[row][col]' },
    ...T(r`二维数组先写<b>行</b>再写<b>列</b>：<code>map[y][x]</code>。map[1][3] 是第 1 行（从 0 数）的第 3 列。|行列写反是地图游戏里最常见的 bug 之一，先在纸上标好下标再读题。`, undefined,
      [r`map[1] 是第二行 "#@.k#"。`, r`这一行的第 3 个字符（从 0 数）是什么？`, r`map[0][1] 是第一行第 1 列。`]),
    task: '预测输出。', objective: predictObjective,
    choices: ['k #\n', '. #\n', '@ #\n', 'k .\n'], answer: 0,
    solution: p(r`    char map[3][6] = {"#####", "#@.k#", "#####"};
    printf("%c %c\n", map[1][3], map[0][1]);`) }),
  lesson('day06b', { id: 'D6-F01', difficulty: '★★☆ 基础', title: '改错：被回车吃掉的方向', knowledge: '改错：%c 读到残留回车', type: 'fix',
    en: { title: 'Fix: The Direction Eaten by Enter', topic: '%c reads a leftover newline' },
    figure: 'input-buffer',
    ...T(r`第二章的输入缓冲区还记得吗？<code>scanf("%d", &amp;steps)</code> 读完数字后，回车还留在缓冲区里。紧接着的 <code>scanf("%c", &amp;d)</code> 读到的是那个回车 <code>'\n'</code>，而不是 d！|程序不会报错，只是“莫名其妙”地不动。修法是在 %c 前加一个空格：<code>" %c"</code>。`, undefined,
      [r`运行看看：方向读到的是什么？（程序会打印它的编号）`, r`回车的编号是 10，说明 %c 读到了残留的换行。`, r`把 <code>"%c"</code> 改成 <code>" %c"</code>。`]),
    task: '修好方向输入。', objective: '默认输入是 <code>1</code> 和 <code>d</code> 两行。修好程序，让它输出 <code>Code: 100</code> 和 <code>Moved right</code>。',
    input: '1\nd\n', inputLabel: '1 ↵ d',
    starterCode: full(r`    int steps;
    char d;
    scanf("%d", &steps);
    scanf("%c", &d);
    printf("Code: %d\n", d);
    if (d == 'd') printf("Moved right\n");
    else printf("Not moved\n");`),
    expected: ['Code: 100', 'Moved right'], minLines: 2, must: [[/scanf\s*\(\s*"\s+%c"/, '读字符时请写 " %c"。']],
    solution: p(r`    int steps;
    char d;
    scanf("%d", &steps);
    scanf(" %c", &d);
    printf("Code: %d\n", d);
    if (d == 'd') printf("Moved right\n");
    else printf("Not moved\n");`) }),

  // ----- Day 7b -----
  lesson('day07b', { id: 'D7-F01', difficulty: '★★★ 综合', title: '改错：治疗没有生效', knowledge: '改错：结构体要传地址', type: 'fix',
    en: { title: 'Fix: The Heal Did Nothing', topic: 'Pass a struct by address' },
    ...T(r`<code>void heal(Player p, int n)</code> 收到的是 hero 的<b>拷贝</b>：拷贝的 hp 加了，main 里的 hero 毫无变化。|要修改原件，参数改成 <code>Player *p</code>，函数里用 <code>p-&gt;hp</code>，调用时传 <code>&amp;hero</code>。三个地方都要改。`, undefined,
      [r`运行看看 HP 有没有变化。`, r`heal 的参数是拷贝还是地址？`, r`改成 <code>void heal(Player *p, int n) { p->hp += n; }</code>，调用 <code>heal(&hero, 10);</code>。`]),
    task: '让治疗真正生效。', objective: '修好程序，输出 <code>HP: 30</code>。',
    starterCode: full(r`    Player hero = {20};
    heal(hero, 10);
    printf("HP: %d\n", hero.hp);`, r`typedef struct { int hp; } Player;
void heal(Player p, int n) { p.hp += n; }`),
    outputRule: { mode: 'exact', value: 'HP: 30\n' }, must: [[/Player\s*\*\s*\w+/, '请让 heal 接收 Player 指针。']],
    solution: p(r`    Player hero = {20};
    heal(&hero, 10);
    printf("HP: %d\n", hero.hp);`, r`typedef struct { int hp; } Player;
void heal(Player *p, int n) { p->hp += n; }`) }),
  lesson('day07b', { id: 'D7-B01', difficulty: '★★☆ 基础', title: '填空：箭头符号', knowledge: '填空：-> 访问成员', type: 'fill',
    en: { title: 'Fill In: The Arrow', topic: 'Member access with ->' },
    ...T(r`通过结构体<b>变量</b>访问成员用点号 <code>hero.hp</code>；通过结构体<b>指针</b>访问成员用箭头 <code>p-&gt;hp</code>（等价于 <code>(*p).hp</code>）。|记法：手里拿的是“门牌号”（指针），就用箭头指过去。`, undefined,
      [r`p 是指针还是结构体变量？`, r`指针访问成员要用箭头。`, r`两个空都填 <code>-></code>。`]),
    task: '补全成员访问。', objective: '把两个 <code>____</code> 补全，输出 <code>Keys: 2</code>。',
    starterCode: full(r`    Player hero = {0};
    add_key(&hero);
    add_key(&hero);
    printf("Keys: %d\n", hero.keys);`, r`typedef struct { int keys; } Player;
void add_key(Player *p) { p____keys = p____keys + 1; }`),
    outputRule: { mode: 'exact', value: 'Keys: 2\n' }, must: [[/p\s*->\s*keys\s*=\s*p\s*->\s*keys/, '请用 -> 访问指针指向的成员。']],
    solution: p(r`    Player hero = {0};
    add_key(&hero);
    add_key(&hero);
    printf("Keys: %d\n", hero.keys);`, r`typedef struct { int keys; } Player;
void add_key(Player *p) { p->keys = p->keys + 1; }`) })
];

// Restructure lessons (review items 5, 6 and "其他发现"): new array/string and pointer-basics
// lessons, two milestone projects and one review lesson at the start of each chapter.
import { cProgram, makeLesson } from './lesson-factory.mjs';
import { r, T } from './teach/helpers.mjs';

const p = (body, helpers = '', headers = '#include <stdio.h>') => cProgram(body, helpers, headers);
const at = id => ({ id, title: '', scene: '' });
const lesson = (chapterId, spec) => makeLesson(at(chapterId), spec);
const reviewEn = {
  'D2-R01': ['Review: Echoes in the Fog Harbor', 'printf and variables'],
  'D3-R01': ['Review: The Market Ledger', 'Arithmetic and integer division'],
  'D4-R01': ['Review: The Forest Fork', 'if / else-if'],
  'D5-R01': ['Review: Counting Echoes', 'Loops and break'],
  'D6-R01': ['Review: The Spell Scroll', 'Functions and return values'],
  'D6-R02': ['Review: Star Map Cells', 'Arrays and strings'],
  'D7-R01': ['Review: Struct Records', 'Structs'],
  'D7-R02': ['Review: The Address Box', 'Pointer basics']
};
const review = (chapterId, id, title, knowledge, teach, hints, code, choices, answer) => lesson(chapterId, {
  en: { title: reviewEn[id][0], topic: reviewEn[id][1] },
  id, difficulty: '★☆☆ 入门', title, knowledge, type: 'predict', review: true, minutes: 5,
  ...T(teach, undefined, hints), task: '复习：预测输出。', objective: '复习上一章：阅读编辑器里的程序，选出它<b>完整的输出</b>（·表示空格，↵表示换行）。',
  choices, answer, solution: code
});

export const structureLessons = [
  // ---------- Reviews: two minutes of the previous chapter before new material ----------
  review('day02', 'D2-R01', '复习：雾港的回声', '复习 printf 与变量',
    r`开始新章节前，先用一道小题唤醒上一章的记忆：变量、<code>%d</code>、<code>%c</code> 和换行。|在脑子里从上往下“执行”一遍，记下每个变量的值，再看 printf 会把它们放到哪里。`,
    [r`先找出 level 和 rank 的值。`, r`第一个 printf 没有 \n，所以第二个 printf 会接在同一行。`, r`把两段拼起来，注意末尾只有一次换行。`],
    p(r`    int level = 3;
    char rank = 'C';
    printf("Lv.%d ", level);
    printf("Rank %c\n", rank);`), ['Lv.3 Rank C\n', 'Lv.3\nRank C\n', 'Lv.%d Rank %c\n', 'Lv.3 RankC\n'], 0),
  review('day03', 'D3-R01', '复习：集市的账本', '复习运算与整数除法',
    r`复习第二章：复合赋值和整数除法。|记住：两个整数相除，小数部分直接丢掉；<code>%</code> 求余数。`,
    [r`gold 先加 5，再除以 2。`, r`17 / 2 在整数里是 8，不是 8.5。`, r`17 % 2 是 1。`],
    p(r`    int gold = 12;
    gold += 5;
    printf("%d %d\n", gold / 2, gold % 2);`), ['8 1\n', '8.5 1\n', '8 0\n', '17 1\n'], 0),
  review('day04', 'D4-R01', '复习：森林的岔路', '复习 if / else-if',
    r`复习第三章：else-if 阶梯从上往下检查，<b>第一个成立</b>的分支执行后，其余的都跳过。`,
    [r`hp 是 45，从第一个条件开始检查。`, r`45 > 70 不成立，45 > 30 成立。`, r`成立后后面的分支不再检查。`],
    p(r`    int hp = 45;
    if (hp > 70) printf("Healthy\n");
    else if (hp > 30) printf("Wounded\n");
    else if (hp > 0) printf("Critical\n");
    else printf("Fallen\n");`), ['Wounded\n', 'Wounded\nCritical\n', 'Healthy\n', 'Critical\n'], 0),
  review('day05', 'D5-R01', '复习：回声的次数', '复习循环与 break',
    r`复习第四章：for 循环和 break。数清楚循环体执行了几次，break 会立刻结束整个循环。`,
    [r`i 从 1 开始，每轮先判断 i == 4。`, r`i 为 1、2、3 时输出，i 为 4 时 break。`, r`输出在同一行，最后的 \n 在循环外。`],
    p(r`    for (int i = 1; i <= 6; i++) {
        if (i == 4) break;
        printf("%d ", i);
    }
    printf("\n");`), ['1 2 3 \n', '1 2 3 4 \n', '1 2 3 5 6 \n', '1 2 3 4 5 6 \n'], 0),
  review('day06', 'D6-R01', '复习：法师的咒语卷轴', '复习函数与返回值',
    r`复习第五章：调用函数时，参数按顺序装进函数的参数里，<code>return</code> 把结果交回调用处。`,
    [r`先算 twice(3)。`, r`twice(3) 返回 6，再把 6 交给 add(6, 1)。`, r`add 返回 7。`],
    p(r`    printf("%d\n", add(twice(3), 1));`, r`int twice(int n) { return n * 2; }
int add(int a, int b) { return a + b; }`), ['7\n', '8\n', '6\n', '9\n'], 0),
  review('day06b', 'D6-R02', '复习：星图的格子', '复习数组与字符串',
    r`复习上半章：数组下标从 0 开始；字符串是以 <code>'\0'</code> 结尾的 char 数组。`,
    [r`a[1] 是第二个元素。`, r`name[0] 是第一个字母。`, r`组合起来是 9 和 A。`],
    p(r`    int a[3] = {4, 9, 2};
    char name[] = "Aster";
    printf("%d %c\n", a[1], name[0]);`), ['9 A\n', '4 A\n', '9 s\n', '4 s\n'], 0),
  review('day07', 'D7-R01', '复习：结构体档案', '复习结构体',
    r`复习第六章：结构体用点号访问成员，结构体变量传给函数时传的是<b>拷贝</b>。`,
    [r`boost 收到的是 hero 的拷贝。`, r`函数里改的是拷贝的 hp。`, r`main 里的 hero.hp 还是 10。`],
    p(r`    Hero hero = {10};
    boost(hero);
    printf("%d\n", hero.hp);`, r`typedef struct { int hp; } Hero;
void boost(Hero h) { h.hp += 5; }`), ['10\n', '15\n', '5\n', '0\n'], 0),
  review('day07b', 'D7-R02', '复习：门牌号与箱子', '复习指针基础',
    r`复习上半章：<code>&amp;x</code> 取地址，<code>*p</code> 打开指针指向的箱子。通过指针修改，原变量真的会变。`,
    [r`p 指向 keys。`, r`*p += 2 让 keys 变成 3。`, r`打印的是 keys 本身。`],
    p(r`    int keys = 1;
    int *p = &keys;
    *p += 2;
    printf("%d\n", keys);`), ['3\n', '1\n', '2\n', '0\n'], 0),

  // ---------- Day 4 milestone ----------
  lesson('day04', {
    id: 'D4-M01', difficulty: '★★★ 综合', title: '里程碑：回声猜数', knowledge: '输入 + 循环 + 分支', milestone: true, minutes: 25,
    en: { title: 'Milestone: Echo Guessing Game', topic: 'Input, loops and branches' },
    ...T(r`<b>里程碑项目</b>：把前四章的知识拼成一个能玩的小游戏。地牢回声藏着一个秘密数字 37，玩家最多猜 5 次。|每次用 <code>scanf("%d", &amp;guess)</code> 读一个猜测：太小输出 <code>Too low</code>，太大输出 <code>Too high</code>，猜中输出 <code>Correct! Tries: 次数</code> 并用 break 结束。5 次都没猜中，输出 <code>The echo fades.</code>。|提示：用一个变量 found 记录有没有猜中，循环结束后根据它决定要不要输出失败信息。`, r`for (int t = 1; t <= 5; t++) {
    scanf("%d", &guess);
    if (guess == secret) { found = 1; break; }
}`,
      [r`for 循环最多 5 次，每次先 scanf 读一个数。`, r`三种情况：小于、大于、等于 secret；等于时设 found = 1 并 break。`, r`默认输入 50、25、37 时依次输出 <code>Too high</code>、<code>Too low</code>、<code>Correct! Tries: 3</code>。`]),
    task: '完成猜数字游戏。', objective: '秘密数字是 37。最多读取 5 个猜测，按规则输出提示；猜中时输出 <code>Correct! Tries: 次数</code> 并结束；5 次都没猜中输出 <code>The echo fades.</code>。默认输入：<code>50 25 37</code>（每行一个）。',
    input: '50\n25\n37\n', inputLabel: '50 ↵ 25 ↵ 37', expected: ['Too high', 'Too low', 'Correct! Tries: 3'], minLines: 3,
    must: [[/scanf\s*\(\s*"%d"\s*,\s*&/, '请用 scanf("%d", &变量) 读取猜测。'], [[/\bfor\s*\(/, /\bwhile\s*\(/], '请用循环处理多次猜测。'], [/\bbreak\s*;/, '猜中后用 break 结束循环。']],
    solution: p(r`    int secret = 37, guess, found = 0;
    for (int tries = 1; tries <= 5; tries++) {
        if (scanf("%d", &guess) != 1) break;
        if (guess < secret) printf("Too low\n");
        else if (guess > secret) printf("Too high\n");
        else { printf("Correct! Tries: %d\n", tries); found = 1; break; }
    }
    if (!found) printf("The echo fades.\n");`)
  }),

  // ---------- Day 6a: arrays and strings ----------
  lesson('day06', {
    id: 'D6-N01', difficulty: '★★☆ 基础', title: '第五颗星不存在', knowledge: '数组越界', type: 'predict', figure: 'array-bounds',
    en: { title: 'There Is No Fifth Star', topic: 'Out-of-bounds access' },
    ...T(r`<code>int a[4]</code> 有 4 个格子，合法下标只有 <b>0、1、2、3</b>。最后一个是 <code>a[3]</code>，不是 a[4]！|访问 <code>a[4]</code> 叫<b>数组越界</b>。C 语言不会替你检查：程序可能输出乱七八糟的数、悄悄改坏别的变量，甚至崩溃，而且每次结果都可能不同——这叫<b>未定义行为</b>。|所以遍历数组的标准写法是 <code>i &lt; 长度</code>，而不是 <code>i &lt;= 长度</code>。这道题请预测正确写法的输出。`, r`int a[4] = {4, 9, 2, 7};
for (int i = 0; i < 4; i++)    // 正确：0~3
for (int i = 0; i <= 4; i++)   // 错误：会读到 a[4]`,
      [r`循环条件是 i < 4，i 取 0、1、2、3。`, r`每次输出 a[i] 和一个空格。`, r`一共 4 个数，没有第五个。`]),
    task: '预测数组遍历的输出。', objective: '编辑器里的程序用正确的边界遍历数组。选出它的<b>完整输出</b>。',
    choices: ['4 9 2 7 \n', '9 2 7 \n', '4 9 2 7 0 \n', '4 9 2 \n'], answer: 0,
    solution: p(r`    int a[4] = {4, 9, 2, 7};
    for (int i = 0; i < 4; i++) printf("%d ", a[i]);
    printf("\n");`)
  }),
  lesson('day06', {
    id: 'D6-N02', difficulty: '★★☆ 基础', title: '名字有多长', knowledge: "字符串结尾 '\\0'", figure: 'string-nul',
    en: { title: 'How Long Is the Name?', topic: "The '\\0' terminator" },
    ...T(r`C 的字符串是 char 数组，最后一定有一个看不见的<b>结束符</b> <code>'\0'</code>（数值为 0）。<code>"Aster"</code> 看起来 5 个字母，其实占 6 个格子。|所有处理字符串的代码都靠它知道“字符串到哪里结束”：printf 的 %s 一直输出，直到遇到 '\0'。|所以 <code>char name[20]</code> 最多只能放 19 个字母，要给 '\0' 留一格。这题请你自己数：从下标 0 开始往后走，遇到 '\0' 就停，走了几步就是长度。`, r`char s[] = "Hi";
int n = 0;
while (s[n] != '\0') n++;   // n = 2`,
      [r`用一个计数器 len 从 0 开始。`, r`<code>while (name[len] != '\0') len++;</code>`, r`"Aster" 输出 <code>Length: 5</code>；数组占的格子数是 len + 1，输出 <code>Cells: 6</code>。`]),
    task: '手动计算字符串长度。', objective: '对 <code>char name[] = "Aster";</code> 不用任何库函数，用循环数出长度，输出 <code>Length: 5</code> 和 <code>Cells: 6</code>（含结束符）。',
    expected: ['Length: 5', 'Cells: 6'], minLines: 2,
    must: [[/\\0/, "循环条件里请检查结束符 '\\0'。"], [[/\bwhile\s*\(/, /\bfor\s*\(/], '请用循环数长度。']],
    solution: p(r`    char name[] = "Aster";
    int len = 0;
    while (name[len] != '\0') len++;
    printf("Length: %d\n", len);
    printf("Cells: %d\n", len + 1);`)
  }),
  lesson('day06', {
    id: 'D6-N03', difficulty: '★★☆ 基础', title: '石门的口令', knowledge: 'strlen 与 strcmp',
    en: { title: 'The Stone Door Password', topic: 'strlen and strcmp' },
    ...T(r`<code>#include &lt;string.h&gt;</code> 里有现成的字符串工具：<code>strlen(s)</code> 返回长度（不含 '\0'），<code>strcmp(a, b)</code> 比较两个字符串，<b>相同时返回 0</b>。|注意：不能用 <code>==</code> 比较两个字符串！<code>a == b</code> 比较的是它们在不在同一个位置（地址），不是内容。比较内容一定要用 strcmp。|strcmp 返回 0 表示“相等”，这和平时“0 是假”相反，写成 <code>strcmp(a, b) == 0</code> 最不容易搞错。`, r`#include <string.h>
if (strcmp(word, "open") == 0) printf("Match\n");
printf("%zu\n", strlen("rune"));   // 4`,
      [r`程序开头加 <code>#include &lt;string.h&gt;</code>。`, r`长度用 <code>strlen(password)</code>，输出时可以写 <code>(int)strlen(password)</code> 配合 %d。`, r`比较用 <code>strcmp(password, "ember") == 0</code>，相等输出 <code>Door: open</code>。`]),
    task: '用 strlen 和 strcmp 检查口令。', objective: '对 <code>char password[] = "ember";</code>：输出 <code>Length: 5</code>；用 strcmp 和 "ember" 比较，相同则输出 <code>Door: open</code>，否则输出 <code>Door: shut</code>。',
    expected: ['Length: 5', 'Door: open'], minLines: 2,
    must: [[/\bstrlen\s*\(/, '请用 strlen 求长度。'], [/\bstrcmp\s*\(/, '请用 strcmp 比较字符串，不要用 ==。']],
    solution: p(r`    char password[] = "ember";
    printf("Length: %d\n", (int)strlen(password));
    if (strcmp(password, "ember") == 0) printf("Door: open\n");
    else printf("Door: shut\n");`, '', '#include <stdio.h>\n#include <string.h>')
  }),
  lesson('day06', {
    id: 'D6-N04', difficulty: '★★☆ 基础', title: '改不了的名字', knowledge: 'strcpy：数组不能用 = 赋值', type: 'fix',
    en: { title: 'The Name That Would Not Change', topic: 'strcpy (arrays cannot be assigned with =)' },
    ...T(r`<code>char name[20] = "Aster";</code> 在<b>声明时</b>可以用 = 初始化，但之后再写 <code>name = "Bram";</code> 就会编译失败：数组整体<b>不能用 = 赋值</b>，报错类似 <code>array type 'char[20]' is not assignable</code>。|要换掉字符串内容，用 string.h 里的 <code>strcpy(目标, 来源)</code>，它把来源的字符一个个复制进目标数组（连同 '\0'）。目标数组必须足够大。`, r`#include <string.h>
char name[20] = "Aster";
strcpy(name, "Bram");   // 正确
// name = "Bram";       // 错误：数组不能赋值`,
      [r`先运行，读报错：哪一行、说了什么“not assignable”？`, r`改名要用 <code>strcpy(name, "Bram");</code>，并确认已经 #include &lt;string.h&gt;。`, r`修好后输出 <code>Old: Aster</code> 和 <code>New: Bram</code>。`]),
    task: '修好改名的 bug。', objective: '程序想把英雄的名字从 Aster 改成 Bram，但无法编译。修好它，输出 <code>Old: Aster</code> 和 <code>New: Bram</code>。',
    starterCode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char name[20] = "Aster";
    printf("Old: %s\\n", name);
    name = "Bram";
    printf("New: %s\\n", name);
    return 0;
}`,
    outputRule: { mode: 'exact', value: 'Old: Aster\nNew: Bram\n' },
    must: [[/\bstrcpy\s*\(\s*name/, '请用 strcpy 复制新名字。']],
    solution: p(r`    char name[20] = "Aster";
    printf("Old: %s\n", name);
    strcpy(name, "Bram");
    printf("New: %s\n", name);`, '', '#include <stdio.h>\n#include <string.h>')
  }),

  // ---------- Day 6b milestone ----------
  lesson('day06b', {
    id: 'D6-M01', difficulty: '★★★ 综合', title: '里程碑：迷宫逃脱', knowledge: '二维地图 + 输入 + 循环', milestone: true, minutes: 30,
    en: { title: 'Milestone: Maze Escape', topic: '2D map, input and loops' },
    ...T(r`<b>里程碑项目</b>：做一个真正能走的迷宫！先读一个整数 n 表示步数，再读 n 个方向字符（w 上、s 下、a 左、d 右）。|每一步：算出目标格 → 是墙 <code>#</code> 就输出 <code>Bump!</code>；是出口 <code>E</code> 就输出 <code>Escaped in 步数 steps!</code> 并停止；否则移动并输出 <code>Moved</code>。最后打印整张地图。|这里会用到：二维字符数组、<code>scanf(" %c", ...)</code>（记得空格）、for 循环、break 和 if 判断。`, r`for (int step = 1; step <= n; step++) {
    scanf(" %c", &d);
    /* 算目标格、判断墙和出口、移动 */
}`,
      [r`地图用 <code>char map[5][8]</code>，玩家从 (1,1) 出发，用 x、y 记录位置。`, r`每一步 nx、ny 从当前位置算起；<code>map[ny][nx] == '#'</code> 时只输出 Bump!。`, r`默认输入 <code>7</code> 和 <code>d d d s s d d</code>：前三步走到 (4,1)，向下两步到 (4,3)，再向右两步走进出口。`]),
    task: '完成迷宫逃脱。', objective: '地图如下（玩家 @ 在第 1 行第 1 列）。读入步数 n 和 n 个方向，按规则逐步输出；到达 E 时输出 <code>Escaped in 步数 steps!</code> 并结束移动；最后打印地图。<pre>#######\n#@...##\n####.##\n####..E\n#######</pre>默认输入：<code>7</code> 和 <code>d d d s s d d</code>。',
    input: '7\nd d d s s d d\n', inputLabel: '7 ↵ d d d s s d d', expected: ['Moved', 'Escaped in 7 steps!'], minLines: 8,
    must: [[/scanf\s*\(\s*"\s+%c"/, '读方向时请用 " %c"。'], [/\bmap\s*\[[^\]]+\]\s*\[[^\]]+\]/, '请用二维字符数组 map[行][列] 保存地图。']],
    solution: p(r`    char map[5][8] = {"#######", "#@...##", "####.##", "####..E", "#######"};
    int x = 1, y = 1, n;
    char d;
    scanf("%d", &n);
    for (int step = 1; step <= n; step++) {
        if (scanf(" %c", &d) != 1) break;
        int nx = x, ny = y;
        if (d == 'w') ny--; else if (d == 's') ny++; else if (d == 'a') nx--; else if (d == 'd') nx++;
        if (nx < 0 || nx >= 7 || ny < 0 || ny >= 5 || map[ny][nx] == '#') { printf("Bump!\n"); continue; }
        map[y][x] = '.';
        x = nx; y = ny;
        if (map[y][x] == 'E') { map[y][x] = '@'; printf("Escaped in %d steps!\n", step); break; }
        map[y][x] = '@';
        printf("Moved\n");
    }
    for (int row = 0; row < 5; row++) printf("%s\n", map[row]);`)
  }),

  // ---------- Day 7a: pointer basics ----------
  lesson('day07', {
    id: 'D7-N01', difficulty: '★★☆ 基础', title: '箱子里的新数字', knowledge: '通过 *p 修改变量', type: 'predict', figure: 'pointer-box',
    en: { title: 'A New Number in the Box', topic: 'Writing through *p' },
    ...T(r`<code>*p</code> 不只能读，还能<b>写</b>：<code>*p = 25;</code> 的意思是“按 p 里的门牌号找到箱子，把 25 放进去”。|因为 p 里装的是 hp 的门牌号，所以被改的就是 hp 本身。这正是指针的威力：拿到地址的人，可以修改原来的变量。`, r`int gold = 1;
int *p = &gold;
*p = 9;            // gold 变成 9`,
      [r`p 指向 hp。`, r`<code>*p = 25;</code> 改的是 p 指向的箱子，也就是 hp。`, r`最后打印的是 hp。`]),
    task: '预测通过指针修改后的值。', objective: '阅读程序，选出它的完整输出。',
    choices: ['HP: 25\n', 'HP: 10\n', 'HP: 35\n', '编译错误\n'], answer: 0,
    solution: p(r`    int hp = 10;
    int *p = &hp;
    *p = 25;
    printf("HP: %d\n", hp);`)
  }),
  lesson('day07', {
    id: 'D7-N02', difficulty: '★★☆ 基础', title: '补全门牌号', knowledge: '& 与 * 填空', type: 'fill',
    en: { title: 'Fill In the House Number', topic: 'Filling in & and *' },
    ...T(r`两个符号记牢：<code>&amp;变量</code> = 取出这个变量的地址（门牌号）；<code>*指针</code> = 打开指针指向的箱子。|声明时的 <code>int *p</code> 表示“p 是一个指向 int 的指针”；使用时的 <code>*p</code> 表示“p 指向的那个 int”。同一个星号，在声明和使用里意思略有不同，多写几次就熟了。|把编辑器里的 <code>____</code> 换成正确的符号或代码。`, r`int a = 3;
int *p = &a;   // & 取地址
*p += 1;       // * 打开箱子，a 变成 4`,
      [r`第一个空：让 p 装进 gold 的地址。`, r`第二个空：通过 p 打开箱子，在原值上加 5。`, r`答案是 <code>&amp;gold</code> 和 <code>*p</code>，输出 <code>Gold: 12</code>。`]),
    task: '补全指针代码。', objective: '把编辑器中的两个 <code>____</code> 补全，让程序通过指针把金币从 7 增加到 12，输出 <code>Gold: 12</code>。',
    starterCode: `#include <stdio.h>

int main(void) {
    int gold = 7;
    int *p = ____;
    ____ += 5;
    printf("Gold: %d\\n", gold);
    return 0;
}`,
    outputRule: { mode: 'exact', value: 'Gold: 12\n' },
    must: [[/int\s*\*\s*p\s*=\s*&\s*gold/, '第一个空要填 gold 的地址。'], [/\*\s*p\s*\+=\s*5/, '第二个空要通过 *p 修改金币。']],
    solution: p(r`    int gold = 7;
    int *p = &gold;
    *p += 5;
    printf("Gold: %d\n", gold);`)
  }),
  lesson('day07', {
    id: 'D7-N03', difficulty: '★★☆ 基础', title: '复印件交换术', knowledge: '值传递 vs 地址传递', type: 'predict',
    en: { title: 'Swapping Photocopies', topic: 'Pass by value vs by address' },
    ...T(r`普通参数是<b>值传递</b>：调用 <code>swap_copy(a, b)</code> 时，函数拿到的是 a、b 的<b>复印件</b>。函数里怎么交换复印件，main 里的原件都纹丝不动。|这就是上一题 swap_int 要用 <code>int *</code> 参数的原因：只有拿到原件的地址，才能改原件。预测一下这个“失败的交换”会输出什么。`, r`void set_zero(int n) { n = 0; }   // 只改了复印件
int x = 5;
set_zero(x);                       // x 还是 5`,
      [r`swap_copy 的参数是 int，不是 int *。`, r`函数里交换的是复印件。`, r`main 里的 a、b 都没变。`]),
    task: '预测值传递的结果。', objective: '阅读程序，选出它的完整输出。',
    choices: ['After: 1 2\n', 'After: 2 1\n', 'After: 2 2\n', 'After: 1 1\n'], answer: 0,
    solution: p(r`    int a = 1, b = 2;
    swap_copy(a, b);
    printf("After: %d %d\n", a, b);`, r`void swap_copy(int x, int y) {
    int temp = x;
    x = y;
    y = temp;
}`)
  }),
  lesson('day07', {
    id: 'D7-N05', difficulty: '★★☆ 基础', title: '迷路的读数', knowledge: 'scanf 为什么要 &', type: 'fix',
    en: { title: 'The Lost Reading', topic: 'Why scanf needs &' },
    ...T(r`第二章我们把 <code>scanf("%d", &amp;x)</code> 里的 &amp; 当成“固定写法”。现在你懂了：scanf 要把读到的数<b>写进</b>你的变量，所以它需要变量的<b>地址</b>，就像 swap_int 需要地址一样。|如果漏了 &amp;，scanf 拿到的是变量里的数值，却把它当成门牌号去写——写到一个随机的位置。编译器通常只给一条警告 <code>format specifies type 'int *' but the argument has type 'int'</code>，运行时可能崩溃，也可能“看起来正常”。<b>警告也要认真看！</b>|例外：读字符串时 <code>scanf("%19s", name)</code> 不加 &amp;，因为数组名本身就是第一个格子的地址。`, r`int n;
scanf("%d", &n);     // 正确：把地址交给 scanf
// scanf("%d", n);   // 错误：把数值当成地址`,
      [r`运行并打开“语法检查”，留意 warning 指出的那一行。`, r`scanf 的第二个参数需要地址。`, r`改成 <code>scanf("%d", &amp;gold);</code>，默认输入 40 时输出 <code>Gold: 40</code>。`]),
    task: '修好读数 bug。', objective: '程序应读入金币数并输出 <code>Gold: 金币</code>，但 scanf 写错了。修好它（默认输入 <code>40</code>）。',
    input: '40\n',
    starterCode: `#include <stdio.h>

int main(void) {
    int gold = 0;
    scanf("%d", gold);
    printf("Gold: %d\\n", gold);
    return 0;
}`,
    expected: ['Gold: 40'], minLines: 1,
    must: [[/scanf\s*\(\s*"%d"\s*,\s*&\s*gold\s*\)/, 'scanf 需要变量的地址：&gold。']],
    solution: p(r`    int gold = 0;
    scanf("%d", &gold);
    printf("Gold: %d\n", gold);`)
  }),

  // ---------- Day 7b: pointers with arrays ----------
  lesson('day07b', {
    id: 'D7-N04', difficulty: '★★☆ 基础', title: '星光阶梯', knowledge: '指针与数组', type: 'predict', figure: 'pointer-array',
    en: { title: 'The Starlight Stairs', topic: 'Pointers and arrays' },
    ...T(r`数组名在大多数场合会变成<b>第一个格子的地址</b>，所以 <code>int *p = arr;</code> 不需要 &amp;。|<code>p + 1</code> 不是“地址加 1 个字节”，而是“往后挪一个格子”。<code>*(p + 1)</code> 就是 arr[1]，<code>p[2]</code> 就是 arr[2]——下标写法其实就是指针运算的简写。|这也解释了为什么数组传给函数后，函数里改数组会影响 main：传过去的是地址。`, r`int arr[3] = {3, 7, 11};
int *p = arr;
printf("%d\n", *(p + 1));   // 7`,
      [r`p 指向 arr[0]。`, r`*(p + 1) 是 arr[1]，p[2] 是 arr[2]。`, r`再看 *p 本身是 arr[0]。`]),
    task: '预测指针访问数组的输出。', objective: '阅读程序，选出它的完整输出。',
    choices: ['3 7 11\n', '3 4 5\n', '7 11 3\n', '3 3 3\n'], answer: 0,
    solution: p(r`    int arr[3] = {3, 7, 11};
    int *p = arr;
    printf("%d %d %d\n", *p, *(p + 1), p[2]);`)
  })
];

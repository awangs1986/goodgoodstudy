import { r, T } from './helpers.mjs';
export default {
  'D4-Q01': T(r`<b>循环</b>让一段代码重复执行。<code>for (int i = 1; i &lt;= 10; i++)</code> 有三部分，用分号隔开：①起点 <code>int i = 1</code>；②继续的条件 <code>i &lt;= 10</code>；③每轮结束后做什么 <code>i++</code>（i 加 1）。|执行过程：先设 i = 1 → 检查条件 → 执行循环体 → i++ → 再检查条件……直到条件不成立就停。`, r`for (int i = 1; i <= 3; i++)
    printf("Hi %d\n", i);   // Hi 1, Hi 2, Hi 3`,
    [r`用 for 循环让 i 从 1 走到 10。`, r`<code>for (int i = 1; i <= 10; i++)</code>，循环体里用 %d 输出 i。`, r`每行格式照抄题目，例如 <code>Step 1: the echo follows...</code>。`]),
  'D4-Q02': T(r`<code>while (条件) { ... }</code> 只要条件成立就一直重复。和 for 不同，变量的初始化和更新要你自己写在循环外面和循环体里。|一定要在循环体里改变条件中的变量（这里是 <code>light--</code>，让亮度减 1），否则条件永远成立，程序就停不下来了——这叫<b>死循环</b>。`, r`int n = 3;
while (n > 0) { printf("%d\n", n); n--; }`,
    [r`亮度从 5 开始，每轮输出后减 1，一直到 0 也要输出。`, r`<code>while (light >= 0) { printf(...); light--; }</code>`, r`循环结束后再输出 <code>Darkness!</code>。`]),
  'D4-Q03': T(r`<code>do { ... } while (条件);</code> 先执行一次，<b>再</b>检查条件。所以不管条件一开始成不成立，循环体至少执行一次。|对比：while 是“先看门再进”，do-while 是“先进门再看”。注意 do-while 末尾的分号不能少。`, r`int x = 0;
do { printf("once\n"); } while (x > 0);`,
    [r`这题要求即使 alarm 是 0 也要响一次，正好用 do-while。`, r`<code>do { printf(...); alarm--; } while (alarm > 0);</code>`, r`输出一次 <code>Alarm rings once!</code>。`]),
  'D4-Q04': T(r`循环也可以倒着数：起点 3，条件 <code>i &gt;= 1</code>，每轮 <code>i--</code>（减 1）。|想让倒计时显示在同一行，printf 里就不要写 <code>\n</code>，等循环结束后再换行。`, r`for (int i = 5; i >= 1; i--) printf("%d ", i);
printf("\n");`,
    [r`倒数用递减的 for 循环。`, r`<code>for (int i = 3; i >= 1; i--) printf("%d... ", i);</code>`, r`循环后输出 <code>\nThe gate opens!\n</code>。`]),
  'D4-Q05': T(r`<b>累加</b>是循环最常见的用途：先准备一个从 0 开始的总数 <code>total = 0</code>，每轮 <code>total += i</code>。|total 必须在循环<b>外面</b>声明和清零，否则每轮都会被重新设成 0。`, r`int sum = 0;
for (int i = 1; i <= 4; i++) sum += i;   // 10`,
    [r`循环外先准备 total = 0。`, r`循环 1 到 6，每轮 <code>total += i;</code> 并输出这一波。`, r`最后输出 <code>Total: 21</code>。`]),
  'D4-Q06': T(r`<code>break;</code> 会<b>立刻跳出</b>整个循环，不管条件还成不成立。|常见用法：循环有一个最大次数（最多 5 轮），但中途满足某个条件（生命归零）就提前结束。`, r`for (int i = 1; i <= 10; i++) {
    if (i == 3) break;
    printf("%d\n", i);   // 只输出 1、2
}`,
    [r`for 循环最多 5 轮，每轮扣 4 点生命。`, r`扣完后如果 hp 小于 0 就设为 0，输出，然后 <code>if (hp == 0) break;</code>。`, r`每行格式 <code>Beat 1 HP: 26</code>。`]),
  'D4-Q07': T(r`<code>continue;</code> 跳过<b>本轮</b>剩下的语句，直接进入下一轮（break 是整个循环都不要了）。|判断奇偶用取余：<code>floor % 2 == 0</code> 说明能被 2 整除，是偶数。`, r`for (int i = 1; i <= 5; i++) {
    if (i == 3) continue;
    printf("%d\n", i);   // 1 2 4 5
}`,
    [r`遍历 1 到 10，偶数层跳过。`, r`<code>if (floor % 2 == 0) continue;</code>`, r`奇数层输出 <code>Ghost on floor 1</code> 等。`]),
  'D4-Q08': T(r`“查找”是 break 的经典场景：一个个检查，找到了就停，不必再看后面的。|再用一个计数器 <code>checked</code> 记录检查了几次，break 之后它的值就是检查次数。`, r`for (int i = 1; i <= 9; i++) {
    if (i * i > 20) { printf("%d\n", i); break; }
}`,
    [r`循环 1 到 12，每轮 checked++，遇到 7 就输出并 break。`, r`<code>if (chest == 7) { printf("Treasure: %d\n", chest); break; }</code>`, r`循环后输出 <code>Checked: 7</code>。`]),
  'D4-Q09': T(r`两个循环可以一前一后排着用：第一个输出 7 个 <code>#</code>，第二个输出 3 个 <code>-</code>。|<code>for (int i = 0; i &lt; 7; i++)</code> 正好执行 7 次（i 是 0~6），这是“重复 n 次”最常用的写法。`, r`for (int i = 0; i < 4; i++) printf("*");   // ****`,
    [r`先输出 [，再两个循环，最后输出 ]。`, r`<code>for (int i = 0; i < 7; i++) printf("#");</code>，另一个循环 3 次输出 -。`, r`结果 <code>[#######---]</code>。`]),
  'D4-Q10': T(r`循环里的 printf 不带 <code>\n</code>，输出就会连在同一行。|先输出 Casting，再用循环输出 5 个点，最后输出 “ Fireball!” 并换行。`, r`printf("Load");
for (int i = 0; i < 3; i++) printf(".");
printf("\n");`,
    [r`三段：Casting、5 个点、 Fireball!。`, r`中间用 <code>for (int i = 0; i < 5; i++) printf(".");</code>`, r`输出 <code>Casting..... Fireball!</code>。`]),
  'D4-Q11': T(r`<b>嵌套循环</b>：循环里面再放一个循环。外层控制“第几行”，内层控制“这一行画几个”。|内层循环结束后、外层进入下一轮前，输出一个 <code>\n</code> 换行。外层每走一步，内层就要完整跑一遍。`, r`for (int r = 0; r < 2; r++) {
    for (int c = 0; c < 3; c++) printf("#");
    printf("\n");
}`,
    [r`外层 4 行，内层 8 列。`, r`内层 <code>for (int col = 0; col < 8; col++) printf("#");</code> 之后 <code>printf("\n");</code>。`, r`输出 4 行，每行 <code>########</code>。`]),
  'D4-Q12': T(r`空心房间：只有<b>边上</b>是墙。在第几行、第几列时是边？第一行（row == 0）、最后一行（row == 4）、第一列（col == 0）、最后一列（col == 8）。|在内层循环里用 if（或三目运算符）判断：是边就输出 #，否则输出点。`, r`if (row == 0 || row == 4 || col == 0 || col == 8) printf("#");
else printf(".");`,
    [r`嵌套循环 5 行 9 列，每格判断是不是边。`, r`边的条件：<code>row == 0 || row == 4 || col == 0 || col == 8</code>`, r`第一行是 9 个 #，中间行是 <code>#.......#</code>。`]),
  'D4-Q13': T(r`三角形的秘密：第几行就画几颗星。让内层循环的次数<b>跟着外层变量变</b>：<code>col &lt; row</code>。|外层 row 从 1 到 6，内层每次画 row 颗星。`, r`for (int row = 1; row <= 3; row++) {
    for (int c = 0; c < row; c++) printf("*");
    printf("\n");
}`,
    [r`外层 row 从 1 到 6。`, r`内层条件写 <code>col < row</code>。`, r`第一行 <code>*</code>，第六行 <code>******</code>。`]),
  'D4-Q14': T(r`嵌套循环正好能遍历一个网格的所有坐标：外层 y（行），内层 x（列）。|每个坐标输出成 <code>(x,y) </code>，一行结束后换行。注意格式符的顺序要和变量顺序一致。`, r`for (int y = 0; y < 2; y++) {
    for (int x = 0; x < 2; x++) printf("(%d,%d) ", x, y);
    printf("\n");
}`,
    [r`外层 y 走 3 行，内层 x 走 4 列。`, r`内层 <code>printf("(%d,%d) ", x, y);</code>`, r`第一行 <code>(0,0) (1,0) (2,0) (3,0) </code>。`]),
  'D4-Q15': T(r`循环变量本身也可以参与计算：第 n 击伤害 = base + n。|每轮算出这一击的伤害、加进总伤害、输出这一击，循环结束后再输出总数。`, r`int total = 0;
for (int n = 1; n <= 3; n++) total += 10 + n;   // 33`,
    [r`hit 从 1 到 5，每击伤害 <code>base + hit</code>。`, r`<code>int damage = base + hit; total += damage;</code>`, r`最后 <code>Total: 30</code>。`]),
  'D4-Q16': T(r`嵌套循环不一定是画图，也可以是“每个…都做…次”：每具骷髅（外层）都尝试 2 次（内层）。|总共输出 3 × 2 = 6 行。循环体只有一条语句时，可以省略花括号，但加上更不容易出错。`, r`for (int a = 1; a <= 2; a++)
    for (int b = 1; b <= 2; b++) printf("%d-%d\n", a, b);`,
    [r`外层 skeleton 1 到 3，内层 attempt 1 到 2。`, r`内层 <code>printf("Skeleton %d Try %d\n", skeleton, attempt);</code>`, r`共 6 行，第一行 <code>Skeleton 1 Try 1</code>。`]),
  'D4-Q17': T(r`阶乘 5! = 1×2×3×4×5。和累加类似，这次是<b>累乘</b>：结果从 <b>1</b> 开始（从 0 开始就永远是 0 了），每轮 <code>result *= n</code>。|每轮都输出一次，就能看到它一步步变大。`, r`int p = 1;
for (int i = 1; i <= 3; i++) p *= i;   // 6`,
    [r`result 从 1 开始，n 从 1 到 5。`, r`每轮 <code>result *= n;</code> 然后输出。`, r`格式 <code>%d! = %d</code>，最后一行 <code>5! = 120</code>。`]),
  'D4-Q18': T(r`<code>while (1)</code> 的条件永远为真，是一个故意的“无限循环”，游戏主循环常这样写。|它必须靠循环体里的 <code>break</code> 才能结束。写这种循环时，先想好“什么情况下退出”。`, r`int n = 0;
while (1) { n++; if (n == 3) break; }`,
    [r`round 从 0 开始，每轮先加 1 再输出。`, r`<code>if (round == 4) { printf(...); break; }</code>`, r`最后输出 <code>Exit: gate opened</code>。`]),
  'D4-Q19': T(r`循环条件要想清楚<b>边界</b>：还能不能爬下一层？下一层是第 floor + 1 层，要消耗 floor + 1 点体力，所以条件是 <code>stamina &gt;= floor + 1</code>。|循环停下时，floor 就是爬完的层数，stamina 是剩下的体力。可以手算前几层验证。`, r`int money = 10, bought = 0;
while (money >= 3) { money -= 3; bought++; }`,
    [r`用 while，条件是体力够不够爬下一层。`, r`循环体：<code>floor++; stamina -= floor;</code>`, r`输出 <code>Floors: 9</code> 和 <code>Stamina: 5</code>。`]),
  'D4-Q20': T(r`章节试炼：用 while 写一个战斗循环，条件里同时放三件事：双方都活着、且回合数没到上限。|每回合：回合数加 1 → 英雄攻击 → 魔像还活着才反击 → 生命不低于 0 → 输出。循环结束后根据谁还活着输出结果。`, r`while (a > 0 && b > 0 && round < 20) {
    round++;
    b -= 8;
}`,
    [r`while 条件：<code>hero > 0 && golem > 0 && round < 20</code>。`, r`魔像被打后 <code>if (golem > 0) hero -= golem_damage;</code>，再把负数修正为 0。`, r`每回合输出 <code>Round %d Hero: %d Golem: %d</code>，最后输出胜负和 <code>Rounds: %d</code>。`])
};

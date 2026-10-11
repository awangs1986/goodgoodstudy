import { r, T } from './helpers.mjs';
export default {
  'D6-Q01': T(r`<b>数组</b>是一排连在一起、类型相同的格子，用一个名字管理。<code>int stars[5] = {3, 7, 11, 5, 9};</code> 准备了 5 个 int 格子。|格子的编号叫<b>下标</b>，<b>从 0 开始</b>：stars[0] 是第一个，stars[4] 是最后一个，第三颗是 <code>stars[2]</code>。|配合 for 循环 <code>for (int i = 0; i &lt; 5; i++)</code>，就能逐个访问所有格子。`, r`int a[3] = {4, 8, 15};
printf("%d\n", a[0]);   // 4（第一个）`,
    [r`数组里放 5 个数，第三颗的下标是 2。`, r`<code>printf("Third: %d\nAll:", stars[2]);</code> 然后循环输出 <code>" %d"</code>。`, r`输出 <code>Third: 11</code> 和 <code>All: 3 7 11 5 9</code>。`]),
  'D6-Q02': T(r`数组的格子可以像普通变量一样读写：<code>energy[i] = 0;</code>。|循环 + if 是处理数组的基本套路：逐个检查，满足条件的就修改。`, r`int a[3] = {1, -2, 3};
for (int i = 0; i < 3; i++) if (a[i] < 0) a[i] = 0;`,
    [r`循环检查每个格子，负数就报告位置并改成 0。`, r`<code>if (energy[i] < 0) { printf("Pollution at: %d\n", i); energy[i] = 0; }</code>`, r`最后输出 <code>Fixed: 4 0 8 2</code>。`]),
  'D6-Q03': T(r`统计数组：总和用累加；最大值先假设第一个最大 <code>max = damage[0]</code>，再逐个比较，遇到更大的就换掉。|平均值要小心整数除法：<code>total / 6.0</code> 用小数除，才能得到 7.x 这样的结果，用 %.1f 输出。`, r`int max = a[0];
for (int i = 1; i < n; i++) if (a[i] > max) max = a[i];`,
    [r`一个循环里同时累加总和、更新最大值。`, r`平均值写成 <code>total / 6.0</code>。`, r`输出 <code>Total: 48</code>、<code>Average: 8.0</code>、<code>Max: 12</code>。`]),
  'D6-Q04': T(r`几个数组用同一个下标对应同一件事，叫<b>平行数组</b>：dx[0]、dy[0]、name[0] 都描述“上”。|方向名字是一组文字，可以用上一题学的二维字符数组 <code>char name[4][6]</code> 保存，每一行是一个字符串。`, r`int dx[2] = {1, -1};
char name[2][6] = {"Right", "Left"};
printf("%s: %d\n", name[0], dx[0]);`,
    [r`三个数组：dx、dy 和方向名，下标对齐。`, r`方向名用 <code>char name[4][6] = {"Up", "Down", "Left", "Right"};</code>`, r`循环输出 <code>%s: %d,%d</code>，第一行 <code>Up: 0,-1</code>。`]),
  'D6-Q05': T(r`C 没有专门的“字符串类型”，字符串就是一个 <b>char 数组</b>，最后藏着一个结束符 <code>'\0'</code>。|<code>char name[20] = "Aster";</code> 用 %s 可以整体输出；也可以用循环一个个字符输出，直到遇到 <code>'\0'</code> 为止。`, r`char word[] = "Hi";
for (int i = 0; word[i] != '\0'; i++) printf("%c ", word[i]);`,
    [r`用 %s 输出一次，再逐字符输出一次。`, r`循环条件 <code>name[i] != '\0'</code>，每次输出 <code>" %c"</code>。`, r`输出 <code>Name: Aster</code> 和 <code>Letters: A s t e r</code>。`]),
  'D6-Q06': T(r`想保存好几个字符串，用<b>二维字符数组</b>：<code>char items[4][10]</code> 表示 4 行，每行最多 10 个 char（含 '\0'，所以最多 9 个字母）。|<code>items[i]</code> 就是第 i 个字符串，可以直接交给 %s。`, r`char names[2][8] = {"Ann", "Bob"};
printf("%s\n", names[1]);   // Bob`,
    [r`4 个物品名放进 <code>char items[4][10]</code>。`, r`循环 <code>printf("%d. %s\n", i + 1, items[i]);</code>`, r`第一行 <code>1. Key</code>，编号从 1 开始所以要 i + 1。`]),
  'D6-Q07': T(r`在字符串里找一个字母：从头逐个比较，找到就记下位置并 break。|用 <code>found = -1</code> 表示“还没找到”（下标不可能是 -1），循环结束后检查 found 就知道结果。`, r`int pos = -1;
for (int i = 0; s[i] != '\0'; i++) if (s[i] == 'a') { pos = i; break; }`,
    [r`遍历字符串直到 '\0'，比较每个字符是不是 'k'。`, r`找到时 <code>found = i; break;</code>`, r`"cloak" 里 k 的下标是 4，输出 <code>Key letter at: 4</code>。`]),
  'D6-Q08': T(r`字符串就是数组，所以可以直接改某个格子：<code>map[2] = '.';</code>。|“移动”就是两步：原位置改成地板，新位置改成 @。改完再用 %s 输出整行地图。`, r`char s[] = "a@b";
s[1] = '.'; s[2] = '@';   // "a.@"`,
    [r`先输出原地图，修改两个格子，再输出。`, r`<code>map[2] = '.'; map[3] = '@';</code>`, r`输出 <code>Before: #.@..k#</code> 和 <code>After:  #..@.k#</code>（After 后两个空格）。`]),
  'D6-Q09': T(r`二维字符数组可以画地图：<code>char map[4][8]</code> 有 4 行，每行是一个 7 个字符的字符串（第 8 格放 '\0'）。|<code>map[y]</code> 是第 y 行，<code>map[y][x]</code> 是第 y 行第 x 列的那个字符。先行后列，别弄反。`, r`char m[2][4] = {"###", "#@#"};
for (int y = 0; y < 2; y++) printf("%s\n", m[y]);`,
    [r`4 行地图，每行 7 个字符，数组列数写 8。`, r`<code>for (int y = 0; y < 4; y++) printf("%s\n", map[y]);</code>`, r`第二行是 <code>#@.k.D#</code>。`]),
  'D6-Q10': T(r`统计二维地图：两层循环遍历每一格 <code>map[y][x]</code>，根据字符分类计数。|外层 y 走行，内层 x 走列；列只数到 7（不包括 '\0'）。`, r`for (int y = 0; y < 2; y++)
    for (int x = 0; x < 3; x++)
        if (m[y][x] == '#') walls++;`,
    [r`三个计数器：墙、地板、特殊物件。`, r`<code>if (map[y][x] == '#') walls++; else if (map[y][x] == '.') floors++; else special++;</code>`, r`输出 <code>Walls: 18</code>、<code>Floors: 7</code>、<code>Special: 3</code>。`]),
  'D6-Q11': T(r`在地图上移动之前，先“看一眼”目标格：<code>map[ny][nx] != '#'</code> 才能走。|能走就：原位置改 '.'，新位置改 '@'。这就是所有地图游戏的核心逻辑。`, r`if (m[ny][nx] != '#') { m[y][x] = '.'; m[ny][nx] = '@'; }`,
    [r`目标坐标是 (2,1)，先检查它是不是墙。`, r`能走时更新两个格子并输出 Moved，否则输出 Bump!。`, r`最后循环打印整张地图。`]),
  'D6-Q12': T(r`<b>结构体</b> struct 把描述同一个东西的多项数据打包在一起：<code>struct Player { char name[20]; int hp, atk; };</code>。|声明变量 <code>struct Player hero = {"Aster", 40, 12};</code>，值按成员顺序填。用点号访问成员：<code>hero.hp</code>。`, r`struct Pet { char name[10]; int age; };
struct Pet cat = {"Mimi", 3};
printf("%s %d\n", cat.name, cat.age);`,
    [r`定义 struct Player，包含名字、HP、攻、防、坐标和钥匙。`, r`初始化 <code>{"Aster", 40, 12, 7, 2, 3, 1}</code>，用 <code>hero.name</code>、<code>hero.hp</code> 访问。`, r`三行输出，第一行 <code>Player: Aster</code>。`]),
  'D6-Q13': T(r`结构体也能组成数组：<code>struct Monster monsters[3]</code>，每个元素是一只完整的怪物。|<code>monsters[i].hp</code> 先用下标找到第 i 只，再用点号取它的 hp。找最强者时记录的是<b>下标</b> best，最后用它取名字。`, r`for (int i = 0; i < 3; i++)
    if (m[i].atk > m[best].atk) best = i;`,
    [r`三只怪物放进结构体数组，循环输出名字和 HP。`, r`同一个循环里比较 atk，更新 best 下标。`, r`最后输出 <code>Strongest: Golem</code>。`]),
  'D6-Q14': T(r`<code>typedef</code> 给类型起个短名字：<code>typedef struct { ... } Player;</code> 之后直接写 <code>Player hero;</code>，不用每次写 struct。|结构体可以作为参数传给函数。注意传进去的是<b>一份拷贝</b>，函数里改它不影响原来的（D7 用指针解决）。`, r`typedef struct { int x, y; } Point;
int sum(Point p) { return p.x + p.y; }`,
    [r`用 typedef 定义 Player。`, r`<code>void print_player(Player p)</code> 输出，<code>int player_power(Player p)</code> 返回 atk + def。`, r`输出 <code>Aster HP: 40</code> 和 <code>Power: 19</code>。`]),
  'D6-Q15': T(r`typedef 后的结构体数组：<code>Player team[3] = {{"Aster", 40}, ...};</code>，每对花括号是一名队员。|循环里既输出、又累加总 HP，一次遍历做两件事。`, r`Player t[2] = {{"A", 5}, {"B", 7}};`,
    [r`三名队员放进 Player 数组。`, r`循环输出 <code>%s: %d</code>，同时 <code>total += team[i].hp;</code>`, r`最后 <code>Team HP: 100</code>。`]),
  'D6-Q16': T(r`用 <code>scanf("%19s", name)</code> 读一个单词（遇到空格或回车就停）。|读字符串时 name 前面<b>不加 &amp;</b>：数组名本身就代表地址（D7 会解释原因）。<code>%19s</code> 限制最多读 19 个字符，给 '\0' 留一格，防止写出数组边界。`, r`char city[10];
scanf("%9s", city);
printf("%s\n", city);`,
    [r`准备 char name[20]，用 scanf 读入。`, r`<code>scanf("%19s", name);</code>（不加 &）`, r`输入 Aster 时输出 <code>Welcome, Aster!</code>。`]),
  'D6-Q17': T(r`一个 scanf 可以连续读多个数：<code>scanf("%d%d", &amp;gold, &amp;offer);</code>，输入里的空格或回车会把它们分开。|读入以后就和普通变量一样，可以拿去判断和计算。`, r`int a, b;
scanf("%d%d", &a, &b);`,
    [r`读两个整数：金币和贡品。`, r`<code>scanf("%d%d", &gold, &offer);</code> 然后 if 判断够不够。`, r`输入 30 18 时输出 <code>Offering accepted</code> 和 <code>Gold: 12</code>。`]),
  'D6-Q18': T(r`读一个字符要写 <code>scanf(" %c", &amp;direction);</code>，%c 前面的<b>空格</b>会跳过之前残留的空白和回车（第二章的输入缓冲区图讲过）。|读到方向后用 switch 修改结构体的坐标成员。`, r`char c;
scanf(" %c", &c);`,
    [r`读一个方向字符，再 switch 修改 p.x 或 p.y。`, r`<code>scanf(" %c", &direction);</code>，case 'd' 时 <code>p.x++;</code>`, r`输入 d 时输出 <code>Position: 3,2</code>。`]),
  'D6-Q19': T(r`把输入、边界检查和地图结合起来：先根据方向算出目标坐标 nx、ny，再检查①没有出地图边界 ②目标不是墙，两个都满足才移动。|顺序很重要：先检查边界，再读 map[ny][nx]，否则可能读到数组外面。`, r`if (nx >= 0 && nx < W && map[ny][nx] != '#') { /* move */ }`,
    [r`读方向 → 算 nx、ny → 检查 → 移动 → 打印地图。`, r`条件 <code>nx >= 0 && nx < 6 && ny >= 0 && ny < 4 && map[ny][nx] != '#'</code>`, r`输入 d 时输出 Moved，再打印 4 行地图。`]),
  'D6-Q20': T(r`章节试炼：读一次方向，移动后如果撞见怪物 M，就进行最多 3 回合的自动战斗。|把前面学的组合起来：结构体保存双方属性，二维数组是地图，scanf 读方向，for 循环最多 3 回合并在一方倒下时停止。`, r`for (int r = 1; r <= 3 && p.hp > 0 && m.hp > 0; r++) { /* ... */ }`,
    [r`先读方向并判断目标格是不是 'M'。`, r`战斗循环条件 <code>r <= 3 && p.hp > 0 && m.hp > 0</code>。`, r`输出格式照题目要求，先输出 <code>Encounter!</code>。`])
};

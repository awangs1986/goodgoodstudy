import { r, T } from './helpers.mjs';
// Day 1 already has hand-written, lesson-specific hints; it gains teach text and examples.
export default {
  'D1-Q01': T(r`<code>printf</code> 是 C 语言的“喊话筒”：括号里双引号包住的文字会原样显示在屏幕上。|每个 C 程序都从 <code>int main(void) { ... }</code> 的第一行开始执行，你的语句要写在这对花括号里面。语句末尾的分号 <code>;</code> 就像句号，不能省。|<code>\n</code> 叫<b>换行符</b>，表示“到这里换到下一行”，它本身不会显示出来。`, r`printf("Hi!\n");`),
  'D1-Q02': T(r`一条 <code>printf</code> 里可以放好几个 <code>\n</code>，每遇到一个就换一次行。|想输出三行，就要在第一段和第二段之间、第二段和第三段之间各放一个 <code>\n</code>，最后一行末尾再放一个，让输出整齐结束。|数一数：三行文字 = 三个换行符。`, r`printf("A\nB\n");   // 输出两行：A 和 B`),
  'D1-Q03': T(r`程序从上往下执行：先写的 <code>printf</code> 先输出。想让菜单按 1、2、3 的顺序出现，就按这个顺序写。|可以每行用一个 <code>printf</code>，也可以把三行合进一个字符串，用 <code>\n</code> 分开，两种写法输出一样。|评分会逐字比较，括号、空格和大小写都要和题目一致。`, r`printf("1) Go\n");
printf("2) Stop\n");`),
  'D1-Q04': T(r`字符串用双引号开头和结尾。如果文字里面本身也有双引号，编译器会以为字符串提前结束了。|解决办法是<b>转义</b>：在里面的双引号前加反斜杠，写成 <code>\"</code>，意思是“这是一个要显示的引号，不是结尾”。|像 <code>\n</code>、<code>\"</code> 这种以反斜杠开头的组合，都叫<b>转义序列</b>。`, r`printf("He said \"Hi\"\n");   // 输出：He said "Hi"`),
  'D1-Q05': T(r`反斜杠 <code>\</code> 在字符串里有特殊作用（开启转义），所以想显示一个真正的反斜杠，要写两个：<code>\\</code>。|编译器看到 <code>\\</code> 会把它变成屏幕上的一个 <code>\</code>。路径里有几个反斜杠，代码里就要写几对。`, r`printf("D:\\games\n");   // 输出：D:\games`),
  'D1-Q06': T(r`连续两个换行 <code>\n\n</code> 会产生一个<b>空行</b>：第一个结束当前行，第二个再结束一个什么都没有的行。|空行常用来把屏幕上的内容分段，让玩家读得更轻松。`, r`printf("Part 1\n\nPart 2\n");`),
  'D1-Q07': T(r`屏幕上的图案其实就是一行行字符拼出来的，这叫 ASCII 画。|每行用一个 <code>printf</code> 最容易对齐：先在纸上画好，再一行行抄进代码。注意每行末尾都要有 <code>\n</code>。|如果图案里要出现双引号或反斜杠，记得用 <code>\"</code>、<code>\\</code> 转义。`, r`printf(" /\\ \n");
printf("/__\\\n");`),
  'D1-Q08': T(r`<b>变量</b>是一个有名字的储物格。<code>int level = 1;</code> 的意思是：准备一个只能装整数（int）的格子，起名叫 level，先放进 1。|要把变量的值放进输出里，用<b>格式符</b> <code>%d</code> 占位，再在逗号后面写变量名：<code>printf("%d", level);</code> 运行时 %d 会被替换成 level 里的数字。`, r`int coins = 3;
printf("Coins: %d\n", coins);   // 输出：Coins: 3`),
  'D1-Q09': T(r`变量里的值可以随时换掉：<code>gold = 5;</code> 把原来的值扔掉，放进新的 5。这叫<b>赋值</b>。|注意这里的 <code>=</code> 不是数学里的“等于”，而是“把右边的值放进左边的格子”。|已经声明过的变量，再次使用时不用再写 <code>int</code>。`, r`int day = 1;
day = 2;          // 不要写成 int day = 2;
printf("%d\n", day);`),
  'D1-Q10': T(r`<code>char</code> 类型只装<b>一个字符</b>，要用单引号：<code>'D'</code>。双引号 <code>"D"</code> 是字符串，两者不一样。|输出 char 用格式符 <code>%c</code>，输出 int 用 <code>%d</code>。一个 printf 里可以有多个格式符，后面的变量按顺序一一对应。`, r`char grade = 'A';
int score = 95;
printf("%c %d\n", grade, score);`),
  'D1-Q11': T(r`一行可以同时声明几个同类型的变量：<code>int x = 3, y = 8;</code>，用逗号隔开。|一个 printf 里有两个 <code>%d</code> 时，第一个换成逗号后的第一个变量，第二个换成第二个变量，顺序不能弄反。`, r`int w = 4, h = 2;
printf("%d x %d\n", w, h);   // 输出：4 x 2`),
  'D1-Q12': T(r`变量名可以用字母、数字和下划线，但不能以数字开头，也不能有空格：<code>max_hp</code> 可以，<code>max hp</code> 不行。|起名要能看出意思，过几天你自己读代码时会感谢自己。格式字符串里的 <code>/</code> 只是普通文字，会原样输出。`, r`int mana = 8, max_mana = 10;
printf("MP: %d/%d\n", mana, max_mana);`),
  'D1-Q13': T(r`在 printf 里，<code>%</code> 是格式符的开头（比如 <code>%d</code>）。如果想显示一个真正的百分号，要写两个：<code>%%</code>。|这和反斜杠要写成 <code>\\</code> 是同一个道理：特殊符号要“说两遍”才表示它本身。`, r`printf("Done: 50%%\n");   // 输出：Done: 50%`),
  'D1-Q14': T(r`<code>float</code> 类型能装带小数点的数，写数字时末尾加 <code>f</code>（如 <code>12.5f</code>）表示这是 float。|输出小数用 <code>%f</code>，默认显示 6 位小数；写成 <code>%.1f</code> 就只保留 1 位，<code>%.2f</code> 保留 2 位。`, r`float speed = 3.14f;
printf("%.1f\n", speed);   // 输出：3.1`),
  'D1-Q15': T(r`printf 不会自动换行：只有你写了 <code>\n</code> 才换行。|所以连续三个 <code>printf("#");</code> 会把三个 # 接在同一行，最后再单独输出一个 <code>\n</code>（或者在最后一个里带上）结束这一行。`, r`printf("ab");
printf("c\n");   // 输出：abc`),
  'D1-Q16': T(r`一行文字可以分好几次 printf 写完：第一次不带 <code>\n</code>，第二次接着在同一行后面输出。|换行发生在哪里，完全由 <code>\n</code> 的位置决定，和你分成几条 printf 无关。`, r`printf("Name: ");
printf("Aster\n");`),
  'D1-Q17': T(r`<b>注释</b>是写给人看的说明，编译器会完全忽略它。|单行注释用 <code>//</code>，从这里到行尾都是注释；多行注释用 <code>/*</code> 开始、<code>*/</code> 结束，中间可以写很多行。|好的注释写“为什么这么做”，帮助以后的你读懂代码。`, r`/* 这里是多行注释
   第二行 */
// 这是单行注释
printf("Hi\n");`),
  'D1-Q18': T(r`把本章学过的都用上：用 <code>char</code> 存首字母，用 <code>int</code> 存等级、生命和金币，再用 <code>%c</code>、<code>%d</code> 把它们放进输出。|先在纸上画好卡片的样子，再一行一个 printf 写出来。每个格式符都要对应一个类型匹配的变量。`, r`char c = 'K';
int lv = 2;
printf("Name: %c\nLevel: %d\n", c, lv);`),
  'D1-Q19': T(r`剧情文字和变量可以自由组合：普通句子直接写在字符串里，需要变化的数字用 <code>%d</code> 占位。|一个 printf 里可以放多段文字和多个 <code>\n</code>，执行顺序仍然从左到右、从上到下。`, r`int keys = 2;
printf("Door opens.\nKeys: %d\n", keys);`),
  'D1-Q20': T(r`章节试炼：把输出、转义、变量和格式符组合起来，做一张完整的标题画面。|建议做法：先声明变量（等级、HP、金币、等级字母），再一行一个 printf 画边框和内容。写完后对照要求逐项检查：游戏名、边框、欢迎语、等级、HP、金币、Press Start 都在吗？至少 4 个值来自变量吗？`, r`int hp = 27;
printf("+------+\n");
printf("| HP %d |\n", hp);
printf("+------+\n");`)
};

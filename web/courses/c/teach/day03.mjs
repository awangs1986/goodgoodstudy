import { r, T } from './helpers.mjs';
export default {
  'D3-Q01': T(r`到目前为止，程序每一行都会执行。<code>if</code> 让程序学会<b>做选择</b>：<code>if (条件) 语句A; else 语句B;</code> 条件成立执行 A，否则执行 B，两者只会走一个。|在 C 里，<b>0 表示“假”，不是 0 就表示“真”</b>。所以 <code>if (has_silver_key)</code> 的意思就是“如果有钥匙（值不是 0）”。`, r`int raining = 1;
if (raining) printf("Take umbrella\n");
else printf("Sunny walk\n");`,
    [r`用一个变量表示有没有银钥匙，1 表示有。`, r`<code>if (has_silver_key) ... else ...</code>，两边各一个 printf。`, r`钥匙为 1 时应输出 <code>The gate opens.</code>。`]),
  'D3-Q02': T(r`比较运算符会算出“真”或“假”：<code>&gt;</code> 大于、<code>&lt;</code> 小于、<code>&gt;=</code> 大于等于、<code>&lt;=</code> 小于等于、<code>==</code> 等于、<code>!=</code> 不等于。|特别注意：判断相等要写<b>两个等号</b> <code>==</code>。一个等号 <code>=</code> 是赋值，写进 if 里会悄悄改掉变量，是新手最常见的 bug 之一。`, r`int hp = 0;
if (hp == 0) printf("Out\n");`,
    [r`条件是“生命大于 0”。`, r`<code>if (hp > 0) printf("Alive\n"); else printf("Fallen\n");</code>`, r`hp = 1 时应输出 <code>Alive</code>。`]),
  'D3-Q03': T(r`有多于两种情况时，用 <code>else if</code> 排成一个“阶梯”：从上往下检查，<b>第一个成立的分支执行后，后面的全部跳过</b>。|所以顺序很重要：先检查最大的范围（&gt; 70），再检查 &gt; 30，最后 &gt; 0，剩下的交给 else。`, r`if (score >= 90) printf("A\n");
else if (score >= 60) printf("B\n");
else printf("C\n");`,
    [r`四档：Healthy（>70）、Wounded（>30）、Critical（>0）、Fallen。`, r`写成 <code>if ... else if ... else if ... else</code> 的阶梯，从大到小检查。`, r`hp = 24 应落在第三档，输出 <code>Critical</code>。`]),
  'D3-Q04': T(r`if 也可以只有一半、没有 else：条件成立就做一件事，不成立就什么也不做。|常见用法是“设下限”：先正常计算 <code>damage = attack - defense</code>，如果结果小于 1，再把它改成 1。这样无论防御多高，伤害都至少是 1。`, r`int n = 3 - 5;
if (n < 0) n = 0;   // n 不会是负数`,
    [r`先照常算伤害，再检查它是否太小。`, r`<code>int damage = attack - defense;</code> 然后 <code>if (damage < 1) damage = 1;</code>`, r`攻击 8、防御 12 时输出 <code>Damage: 1</code>。`]),
  'D3-Q05': T(r`两座桥要分别判断，就写两个<b>独立的</b> if-else，它们互不影响：第一个的结果不会挡住第二个。|“承重够不够”可以写成 <code>a &gt;= weight</code>：承重大于<b>或等于</b>队伍重量都算安全，刚好相等也能过。`, r`if (a >= w) printf("A ok\n"); else printf("A no\n");
if (b >= w) printf("B ok\n"); else printf("B no\n");`,
    [r`两座桥各写一个 if-else。`, r`条件是 <code>a >= weight</code> 和 <code>b >= weight</code>。`, r`输出 <code>Bridge A: safe</code> 和 <code>Bridge B: unsafe</code>。`]),
  'D3-Q06': T(r`<code>||</code> 读作“或”：两边<b>只要有一个</b>成立，整体就成立。|中毒 <b>或</b> 生命低于 20，任一种都危险，所以写成 <code>if (poisoned || hp &lt; 20)</code>。`, r`if (tired || hungry) printf("Rest\n");`,
    [r`两个危险条件，满足任一个就报警。`, r`<code>if (poisoned || hp < 20)</code>`, r`中毒为 0、hp 为 16 时仍输出 <code>DANGER</code>。`]),
  'D3-Q07': T(r`<code>&amp;&amp;</code> 读作“并且”：两边<b>都</b>成立，整体才成立，缺一个都不行。|要有月石 <b>并且</b> 是夜晚，写成 <code>if (has_moonstone &amp;&amp; is_night)</code>。`, r`if (has_key && door_near) printf("Open\n");`,
    [r`两个条件必须同时满足。`, r`<code>if (has_moonstone && is_night)</code>`, r`两个都为 1 时输出 <code>Secret path appears.</code>。`]),
  'D3-Q08': T(r`<code>!</code> 读作“不是”，把真变假、假变真。|<code>!has_torch</code> 的意思是“没有火把”：has_torch 为 0 时，<code>!has_torch</code> 为真。注意 <code>!</code> 和 <code>!=</code> 不是一回事。`, r`int lamp = 0;
if (!lamp) printf("Dark\n");`,
    [r`条件是“没有火把”。`, r`<code>if (!has_torch)</code>`, r`输出 <code>Something approaches.</code>。`]),
  'D3-Q09': T(r`if 里面可以再放 if，叫<b>嵌套</b>。外层先检查钱够不够，钱够了才进入里层检查背包有没有空位。|多条语句要用花括号 <code>{ }</code> 包起来，组成一个“代码块”。<code>potions++</code> 是 <code>potions += 1</code> 的简写，让数量加 1（下一章会经常用到）。`, r`if (gold >= 5) {
    if (space > 0) { gold -= 5; items++; }
    else printf("Full\n");
}`,
    [r`外层判断金币，里层判断空位，每层都要有 else 处理失败情况。`, r`购买成功时：<code>gold -= price; potions++;</code>`, r`输出 <code>Bought potion</code> 和 <code>Gold: 8 Potions: 1</code>。`]),
  'D3-Q10': T(r`<b>三目运算符</b> <code>条件 ? 值A : 值B</code> 是“二选一”的简写：条件成立取 A，否则取 B。|<code>int steps = luck &gt;= 50 ? 3 : 7;</code> 等价于先写 if 给 steps 赋 3，else 赋 7。它也能直接选两段文字交给 printf。|适合“两边都是简单值”的情况；逻辑复杂时还是写 if-else 更清楚。从这一题以后，参考答案里会经常用到它。`, r`int a = 4, b = 9;
int max = a > b ? a : b;   // 9`,
    [r`用 <code>?:</code> 根据 luck 选出步数，也可以用它选择输出的文字。`, r`<code>int steps = luck >= 50 ? 3 : 7;</code>`, r`输出 <code>Lucky route</code> 和 <code>Steps: 3</code>。`]),
  'D3-Q11': T(r`<code>switch</code> 适合“一个变量对照多个固定值”：<code>case 'w':</code> 表示“如果等于 'w'”。|每个 case 末尾要写 <code>break;</code> 跳出 switch，否则会“掉”进下一个 case 继续执行。<code>default:</code> 处理所有没列出的情况。`, r`switch (key) {
    case 'y': printf("Yes\n"); break;
    default: printf("No\n");
}`,
    [r`对方向字符 switch，w/a/s/d 各一个 case。`, r`每个 case 后面都要 <code>break;</code>，最后加 <code>default:</code>。`, r`'d' 应输出 <code>East</code>。`]),
  'D3-Q12': T(r`switch 也能比较整数：<code>case 1:</code>、<code>case 2:</code>……|保留 <code>default</code> 是个好习惯：哪怕你觉得不会出现别的值，它也能在意外时给出提示，而不是什么都不做。`, r`switch (day) {
    case 6: case 7: printf("Weekend\n"); break;
    default: printf("Workday\n");
}`,
    [r`四个季节对应 case 1 到 case 4。`, r`每个 case 带 <code>break;</code>，再加 <code>default</code>。`, r`season = 4 时输出 <code>Winter spirit</code>。`]),
  'D3-Q13': T(r`多层嵌套像过安检：先过第一道门（没有诅咒），才去第二道（金钥匙），再到第三道（银钥匙）。|每一层的 else 告诉玩家“卡在了哪一道门”。写嵌套时用缩进对齐花括号，一眼就能看出哪个 else 属于哪个 if。`, r`if (a) {
    if (b) printf("both\n");
    else printf("only a\n");
}`,
    [r`三层 if：诅咒 → 金钥匙 → 银钥匙。`, r`最外层是 <code>if (!cursed)</code>，里面依次检查 gold_key、silver_key。`, r`全部满足时输出 <code>Royal chest opened.</code>。`]),
  'D3-Q14': T(r`char 也能用 <code>==</code> 比较：<code>role == 'N'</code>，注意字符要用单引号。|先确认角色是旅人（N），再在里面检查是不是满月——这就是嵌套判断的典型用法。`, r`char c = 'N';
if (c == 'N') printf("Neutral\n");`,
    [r`外层判断角色标记，内层判断满月。`, r`<code>if (role == 'N') { if (full_moon) ... else ... } else ...</code>`, r`满月时输出 <code>Werewolf!</code>。`]),
  'D3-Q15': T(r`判断区间时，要特别小心<b>边界</b>上的值：1、9、10、20 各属于哪一档？|先处理最特殊的值（<code>roll == 1</code>、<code>roll == 20</code>），再处理范围（<code>roll &lt;= 9</code>），剩下的就是成功。写完用几个边界值手动走一遍。`, r`if (n == 0) printf("zero\n");
else if (n <= 9) printf("small\n");
else printf("big\n");`,
    [r`先判断 1 和 20 这两个特殊点数。`, r`顺序：<code>== 1</code> → <code>== 20</code> → <code><= 9</code> → else。`, r`roll = 20 输出 <code>Critical success</code>。`]),
  'D3-Q16': T(r`10×6 的地图，x 的合法范围是 0 到 9，y 是 0 到 5（从 0 开始数）。|“在地图外”：x 或 y 超出范围；“在边缘”：在地图内，且 x 是 0 或 9、或 y 是 0 或 5。多个条件用 <code>||</code> 连起来。`, r`if (x < 0 || x >= 10) printf("Outside\n");`,
    [r`先判断是否在地图外，再判断是否在边缘，最后是内部。`, r`边缘条件：<code>x == 0 || x == 9 || y == 0 || y == 5</code>`, r`(0,3) 输出 <code>Edge tile</code>。`]),
  'D3-Q17': T(r`switch 的每个 case 不只能输出，还能<b>修改变量</b>：进入防御姿态时攻击减少、防御增加。|switch 结束后再统一输出属性，就能看到这次选择带来的变化。`, r`switch (mode) {
    case 1: speed += 2; break;
    case 2: speed -= 2; break;
}
printf("%d\n", speed);`,
    [r`case 2 里同时修改攻击和防御。`, r`<code>case 2: atk -= 4; def += 6; printf("Defend\n"); break;</code>`, r`最后输出 <code>ATK: 6 DEF: 14 SPD: 5</code>。`]),
  'D3-Q18': T(r`游戏菜单本质上就是一个 switch：玩家选 1、2、3，程序给出不同回应。|把每个选项的结果写在对应的 case 里，别忘了 break 和 default（玩家乱选时的回应）。`, r`switch (choice) {
    case 1: printf("Hello\n"); break;
    default: printf("...\n");
}`,
    [r`对 choice 写 switch，三个 case 加一个 default。`, r`case 1 对应“说出真相”的回应。`, r`choice = 1 输出 <code>The ranger lowers his bow.</code>。`]),
  'D3-Q19': T(r`胜负判断要把两个人的状态<b>组合</b>起来看：Boss 倒下并且玩家还活着，才是真正的胜利。|把最具体的组合放在前面检查（&amp;&amp; 连接的条件），再处理单方面的情况。`, r`if (enemy <= 0 && me > 0) printf("Win\n");
else if (me <= 0) printf("Lose\n");`,
    [r`四种结局：胜利、同归于尽、失败、继续战斗。`, r`胜利条件：<code>boss_hp <= 0 && player_hp > 0</code>`, r`默认数据输出 <code>Victory</code>。`]),
  'D3-Q20': T(r`章节试炼：用一条 else-if 阶梯，根据五个变量决定结局。|技巧：先把题目的规则一条条抄成注释，再把每条翻译成一个 <code>else if</code>。最先检查“生命归零”这种一票否决的情况。写完后改改变量的值，看看每条结局能不能被触发。`, r`if (hp <= 0) printf("Retreat\n");
else if (road == 1 && !storm) printf("Camp\n");
else printf("Retreat\n");`,
    [r`把每条结局规则写成一个分支，第一个检查 hp <= 0。`, r`道路规则例如 <code>road == 4 && key</code> 打开遗迹。`, r`默认配置输出 <code>Ancient ruin opened</code> 和 <code>Ending: Rune found</code>。`])
};

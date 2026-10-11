import { r, T } from './helpers.mjs';
export default {
  'D2-Q01': T(r`变量最有用的地方是可以<b>计算</b>。<code>gold = gold - cost;</code> 先算右边（30 - 12 = 18），再把结果放回左边的 gold。|同一个变量出现在 = 两边很正常：右边用的是旧值，算完后左边得到新值。`, r`int coins = 10, price = 4;
coins = coins - price;   // coins 变成 6`,
    [r`先准备两个 int 变量：金币和开刃费用。`, r`用 <code>gold = gold - cost;</code>（或 <code>gold -= cost;</code>）让金币减去费用。`, r`最后 <code>printf("Gold: %d\n", gold);</code>，应输出 Gold: 18。`]),
  'D2-Q02': T(r`<code>+</code> 可以连着用：<code>a + b + c</code> 从左到右依次相加。|把结果存进一个新变量（比如 <code>final_atk</code>）比直接写进 printf 更清楚，后面还能继续使用它。`, r`int a = 2, b = 3, c = 4;
int sum = a + b + c;   // 9`,
    [r`三个加成分别存进三个变量，再算总和。`, r`<code>int final_atk = atk + hammer + rune;</code>`, r`输出格式是 <code>Final ATK: %d</code>，结果应为 14。`]),
  'D2-Q03': T(r`<code>hp -= 6;</code> 是 <code>hp = hp - 6;</code> 的简写，叫<b>复合赋值</b>。|连续写三次，生命就会被一点点扣掉，每一步都在上一步的结果上继续算。`, r`int hp = 20;
hp -= 3;
hp -= 5;   // hp 现在是 12`,
    [r`只用一个 hp 变量，从 45 开始，依次扣三次。`, r`三行 <code>hp -= 6;</code>、<code>hp -= 8;</code>、<code>hp -= 5;</code>。`, r`最后输出 <code>HP: %d</code>，应为 26。`]),
  'D2-Q04': T(r`<code>hp += 18;</code> 等于 <code>hp = hp + 18;</code>，让变量在原来的基础上增加。|想同时报告“之前”和“之后”，就要在修改<b>之前</b>先输出一次，修改<b>之后</b>再输出一次。语句的先后顺序决定了你看到的是哪个值。`, r`int mp = 5;
printf("Before: %d\n", mp);
mp += 3;
printf("After: %d\n", mp);`,
    [r`顺序是：输出旧值 → 治疗 → 输出新值。`, r`治疗必须用 <code>hp += 18;</code>。`, r`两行输出：<code>Before: 21</code> 和 <code>After: 39</code>。`]),
  'D2-Q05': T(r`计算可以分步做：先算出伤害 <code>damage = attack - defense</code>，再用它去扣生命 <code>hp -= damage</code>。|把中间结果起个名字存起来，程序更好读，也方便一次输出多个结果。`, r`int atk = 9, def = 4;
int dmg = atk - def;   // 5`,
    [r`先算实际伤害（攻击减护甲），再从生命里扣掉它。`, r`<code>int damage = attack - defense;</code> 然后 <code>hp -= damage;</code>`, r`输出两行：<code>Damage: 9</code> 和 <code>HP: 31</code>。`]),
  'D2-Q06': T(r`两个整数相除，结果还是整数，小数部分会被直接<b>丢掉</b>（不是四舍五入）：<code>100 / 3</code> 得 33。|<code>%</code> 是<b>取余</b>，算的是“除完还剩多少”：<code>100 % 3</code> 得 1。它和格式符的 % 是两回事。|整数除法 + 取余是一对好搭档：33 × 3 + 1 = 100。`, r`printf("%d %d\n", 7 / 2, 7 % 2);   // 输出：3 1`,
    [r`每人所得用除法，剩下的零头用取余。`, r`<code>gold / team</code> 和 <code>gold % team</code>，两边都用变量。`, r`输出 <code>Each: 33</code> 和 <code>Remain: 1</code>。`]),
  'D2-Q07': T(r`<code>+=</code> 和 <code>-=</code> 可以交替使用，像记账一样一笔一笔更新同一个变量。|写之前先手算一遍：20 - 4 + 7 - 3 = ?，运行后对比结果，这是检查程序的好习惯。`, r`int n = 10;
n -= 2; n += 5;   // 13`,
    [r`一个 arrows 变量从 20 开始，按顺序更新三次。`, r`<code>arrows -= 4; arrows += 7; arrows -= 3;</code>`, r`输出 <code>Arrows: 20</code>（手算一下，确实回到了 20）。`]),
  'D2-Q08': T(r`乘法和除法也有复合赋值：<code>price *= 2;</code> 让价格翻倍，<code>price /= 2;</code> 让价格减半。|每改一次就输出一次，就能看到变量在不同时刻的值。`, r`int x = 5;
x *= 3;   // 15
x /= 5;   // 3`,
    [r`先翻倍并输出，再减半并输出。`, r`用 <code>*=</code> 和 <code>/=</code>，每次修改后紧跟一个 printf。`, r`两行：<code>Double: 12</code> 和 <code>Normal: 6</code>。`]),
  'D2-Q09': T(r`<code>*</code> 是乘号（键盘上没有 ×）。路程 = 速度 × 时间，写成 <code>speed * hours</code>。|算出跑步距离后先输出，再用 <code>+=</code> 加上传送的距离，得到总路程。`, r`int price = 3, count = 4;
int cost = price * count;   // 12`,
    [r`先算奔跑距离 18 × 3，再加上传送的 25。`, r`<code>int distance = speed * hours;</code>，输出后 <code>distance += 25;</code>`, r`两行：<code>Run: 54</code> 和 <code>Total: 79</code>。`]),
  'D2-Q10': T(r`<b>陷阱</b>：<code>5 / 2</code> 两边都是整数，结果是 2，小数被截断。|想得到 2.5，要先把其中一个数变成小数类型：<code>(float)bottles / mages</code>。括号里的 <code>(float)</code> 叫<b>强制类型转换</b>，它先把 5 变成 5.0，再做除法。|注意顺序：<code>(float)(5 / 2)</code> 是先算整数除法得 2，再转成 2.0，丢掉的小数回不来了。输出小数用 <code>%.1f</code>。`, r`printf("%d\n", 7 / 2);            // 3
printf("%.1f\n", (float)7 / 2);   // 3.5`,
    [r`同一个除法要输出两次：一次整数结果，一次精确结果。`, r`精确结果写成 <code>(float)bottles / mages</code>，用 <code>%.1f</code> 输出。`, r`两行：<code>Whole: 2</code> 和 <code>Exact: 2.5</code>。`]),
  'D2-Q11': T(r`int 和 float 一起运算时，结果会自动变成 float：<code>16 * 1.5f</code> 得 24.0。|把结果存进 float 变量，用 <code>%.1f</code> 输出一位小数。`, r`int base = 10;
float bonus = base * 1.2f;
printf("%.1f\n", bonus);   // 12.0`,
    [r`伤害倍率是小数，结果要用 float 保存。`, r`<code>float rate = 1.5f, damage = base * rate;</code>`, r`输出 <code>Critical: 24.0</code>。`]),
  'D2-Q12': T(r`想交换两个变量的值，不能直接写 <code>red = blue; blue = red;</code>：第一句执行完，red 原来的值就被覆盖、找不回来了。|办法是准备一个<b>临时变量</b> temp，像倒饮料要第三个空杯子：先把 red 存进 temp，再把 blue 放进 red，最后把 temp 放进 blue。`, r`int a = 1, b = 2, temp;
temp = a; a = b; b = temp;   // a=2, b=1`,
    [r`交换前先输出一次，交换后再输出一次。`, r`三步：<code>temp = red; red = blue; blue = temp;</code>`, r`输出 <code>Before: 2 9</code> 和 <code>After: 9 2</code>。`]),
  'D2-Q13': T(r`用 0 和 1 表示“关”和“开”是编程里很常见的技巧。|<code>torch = 1 - torch;</code> 是个小机关：0 变成 1，1 变成 0。每执行一次就切换一次状态。`, r`int light = 1;
light = 1 - light;   // 0
light = 1 - light;   // 1`,
    [r`从 0 开始，切换两次，每次切换后都输出。`, r`切换写法是 <code>torch = 1 - torch;</code>`, r`输出 <code>Switch 1: 1</code> 和 <code>Switch 2: 0</code>。`]),
  'D2-Q14': T(r`“十分之一取整”正好可以用整数除法实现：<code>87 / 10</code> 得 8，小数自动去掉。|算出税以后，总价 = 价格 + 税，找零 = 100 - 总价。一个表达式也可以直接写在 printf 的参数里。`, r`int price = 45;
int tax = price / 10;   // 4`,
    [r`先算税，再算总价，最后算找零。`, r`<code>tax = price / 10;</code>，<code>total = price + tax;</code>，找零是 <code>100 - total</code>。`, r`三行：<code>Tax: 8</code>、<code>Total: 95</code>、<code>Change: 5</code>。`]),
  'D2-Q15': T(r`C 和数学一样“先乘除、后加减”：<code>5 + 3 * 2</code> 先算 3 × 2，结果是 11。|想先算加法就加括号：<code>(5 + 3) * 2</code> 得 16。拿不准时就加括号，代码也更好读。`, r`printf("%d\n", 2 + 3 * 4);     // 14
printf("%d\n", (2 + 3) * 4);   // 20`,
    [r`两个表达式只差一对括号，分别输出。`, r`<code>base + gem * 2</code> 和 <code>(base + gem) * 2</code>。`, r`输出 <code>First: 11</code> 和 <code>Second: 16</code>。`]),
  'D2-Q16': T(r`每种整数类型能装的数有上限，int 一般最多约 21 亿。超出范围叫<b>溢出</b>，结果会变成奇怪的数。|<code>long</code> 是更大的整数格子，适合经验值、分数这类会越来越大的数。输出 long 用格式符 <code>%ld</code>。`, r`long score = 3000000000L;
printf("%ld\n", score);`,
    [r`经验值变量的类型要用 long。`, r`<code>long exp = 90;</code>，然后两次 <code>+=</code>。`, r`输出 <code>EXP: %ld</code>，结果是 185。`]),
  'D2-Q17': T(r`先求出总重，再从总重里减掉盾牌，就不用重新把剑和药水加一遍。|把常用的中间结果（总重）存起来反复用，是写程序的好习惯。`, r`int a = 3, b = 5;
int total = a + b;
printf("%d\n", total - b);   // 3`,
    [r`先算三件物品的总重。`, r`<code>int total = sword + shield + potion;</code>，拿掉盾就是 <code>total - shield</code>。`, r`输出 <code>Total: 21</code> 和 <code>Without shield: 10</code>。`]),
  'D2-Q18': T(r`坐标用两个变量 x、y 表示。“移动”是在原值上加减（<code>x += 2</code>），“传送”是直接赋新值（<code>x = 10</code>）。|每个阶段结束后输出一次，就能清楚看到坐标的变化过程。`, r`int x = 0;
x += 3;   // 移动：3
x = 7;    // 传送：7`,
    [r`三个阶段：起点、移动后、传送后，每个阶段输出一次。`, r`移动用 <code>x += 2; y += 1;</code>，传送用 <code>x = 10; y = 10;</code>。`, r`输出格式 <code>Start: 2,4</code>、<code>Move: 4,5</code>、<code>Warp: 10,10</code>。`]),
  'D2-Q19': T(r`复杂的计算拆成几步：先算最终攻击（三项相加），再算伤害（攻击减敌防），最后扣生命。|每一步都用上一步的结果，名字起清楚，就不会乱。`, r`int atk = 4 + 2 + 1;
int dmg = atk - 3;`,
    [r`顺序：最终攻击 → 伤害 → 战后生命。`, r`<code>atk = base + weapon + buff;</code>，<code>damage = atk - defense;</code>，<code>hp -= damage;</code>`, r`输出 <code>ATK: 18</code>、<code>Damage: 11</code>、<code>HP: 29</code>。`]),
  'D2-Q20': T(r`章节试炼：用变量模拟一场固定的三回合战斗。|先算出双方每回合造成的伤害（攻击减对方防御），这两个数每回合都一样。然后每回合各扣一次生命，再输出双方生命。三回合就是把同样的几行写三遍——下一章学了循环，就不用重复了。`, r`int hp = 20, dmg = 4;
hp -= dmg;
printf("Round 1 HP: %d\n", hp);`,
    [r`先算英雄伤害 = 英雄攻击 - 怪物防御，怪物伤害 = 怪物攻击 - 英雄防御。`, r`每回合：<code>monster_hp -= hero_damage; hero_hp -= monster_damage;</code> 然后输出一行。`, r`输出格式照抄题目，例如 <code>Round 1 Hero: %d Monster: %d</code>，共三回合。`])
};

import { r, T } from './helpers.mjs';
export default {
  'D5-Q01': T(r`<b>函数</b>是一段起了名字、可以反复使用的代码，就像一个“技能”。<code>void print_line(void) { ... }</code>：<code>void</code> 表示它做完事不交回结果，括号里的 <code>void</code> 表示不需要参数。|函数要写在 main <b>前面</b>（或者先声明，D5-Q13 会讲）。在 main 里写 <code>print_line();</code> 就是<b>调用</b>它：程序跳进函数执行，执行完再回到原处继续。`, r`void hello(void) { printf("Hi\n"); }

int main(void) {
    hello();
    hello();   // 调用两次，输出两行 Hi
    return 0;
}`,
    [r`写两个 void 函数：一个输出标题，一个输出横线。`, r`在 main 里按“横线、标题、横线”的顺序调用。`, r`<code>print_line(); print_title(); print_line();</code>`]),
  'D5-Q02': T(r`<b>参数</b>是函数的“输入口”。<code>void print_status(int hp, int atk, int def)</code> 声明了三个参数；调用 <code>print_status(40, 12, 7)</code> 时，40、12、7 会按顺序装进 hp、atk、def。|参数只在函数内部有效，名字和 main 里的变量重名也没关系，它们是各自独立的格子。`, r`void show(int n) { printf("n = %d\n", n); }
// 调用：show(5);  输出 n = 5`,
    [r`函数接收三个 int 参数，分三行输出。`, r`<code>void print_status(int hp, int atk, int def) { printf("HP: %d\nATK: %d\nDEF: %d\n", hp, atk, def); }</code>`, r`main 里调用 <code>print_status(40, 12, 7);</code>。`]),
  'D5-Q03': T(r`同一个函数可以用不同的参数调用多次，这正是函数的价值：写一次，到处用。|<code>print_position(2, 3)</code> 和 <code>print_position(8, 5)</code> 执行的是同一段代码，只是装进参数的值不同。`, r`void say(int a, int b) { printf("%d %d\n", a, b); }
say(1, 2);
say(3, 4);`,
    [r`函数接收 x 和 y 两个参数。`, r`函数体 <code>printf("Position: (%d, %d)\n", x, y);</code>`, r`main 里调用两次：(2, 3) 和 (8, 5)。`]),
  'D5-Q04': T(r`函数还能<b>交回一个结果</b>：把 void 换成结果的类型（这里是 <code>int</code>），在函数里用 <code>return 值;</code> 交回。调用处 <code>calc_damage(12, 5)</code> 就会“变成”那个值，可以直接放进 printf 或存进变量。|<code>return</code> 执行后函数立刻结束，后面的语句不再执行。`, r`int twice(int n) { return n * 2; }
printf("%d\n", twice(4));   // 8`,
    [r`返回类型是 int，返回攻击减防御，但最低为 1。`, r`<code>int damage = atk - def; if (damage < 1) damage = 1; return damage;</code>（也可以用三目运算符）`, r`输出 <code>Damage A: 7</code> 和 <code>Damage B: 1</code>。`]),
  'D5-Q05': T(r`函数可以修改自己的参数 hp，但改的只是<b>复印件</b>：main 里的原变量不会变（D7 学指针时会讲怎样改原件）。|所以要用 return 把新生命交回去。别忘了下限：扣完如果小于 0，就返回 0。`, r`int minus(int hp, int d) {
    hp -= d;
    if (hp < 0) hp = 0;
    return hp;
}`,
    [r`在函数里扣血，再检查是不是小于 0。`, r`<code>hp -= damage; return hp > 0 ? hp : 0;</code>`, r`输出 <code>HP A: 25</code> 和 <code>HP B: 0</code>。`]),
  'D5-Q06': T(r`上一题是“下限”，这一题是“上限”：治疗后如果超过最大生命，就只能等于最大生命。|把最大值也作为参数传进来，函数就能用在不同的角色身上。`, r`int cap(int v, int max) { return v > max ? max : v; }`,
    [r`函数有三个参数：当前生命、治疗量、最大生命。`, r`<code>hp += amount; return hp > max_hp ? max_hp : hp;</code>`, r`输出 <code>Heal A: 35</code> 和 <code>Heal B: 50</code>。`]),
  'D5-Q07': T(r`比较运算的结果本身就是 1（真）或 0（假），所以 <code>return hp &gt; 0;</code> 直接就能返回“是否活着”。|另一个函数负责“讲述”：根据 alive 是 1 还是 0 输出不同文字。<code>printf("%s\n", 条件 ? "Alive" : "Fallen")</code> 用 %s 输出由三目运算符选出的一段文字（%s 在第一章学过）。`, r`int is_even(int n) { return n % 2 == 0; }
printf("%d\n", is_even(4));   // 1`,
    [r`is_alive 返回 <code>hp > 0</code> 的结果。`, r`print_alive_state 用 if 或三目运算符，在 Alive 和 Fallen 之间选一个输出。`, r`main 里：<code>print_alive_state(is_alive(9)); print_alive_state(is_alive(0));</code>`]),
  'D5-Q08': T(r`求较大值是函数的经典练习：两个参数比一比，把大的 return 出去。|两数相等时返回哪个都一样。测试函数时，要特意试一下“相等”这种边界情况。`, r`int min_int(int a, int b) { return a < b ? a : b; }`,
    [r`函数接收 a、b，返回较大的那个。`, r`<code>return a > b ? a : b;</code>`, r`输出 <code>Best: 17</code> 和 <code>Equal: 12</code>。`]),
  'D5-Q09': T(r`把小动作分别写成小函数，主程序读起来就像在讲故事：<code>x = move_right(x);</code>。|注意要把返回值<b>接住</b>：只写 <code>move_right(x);</code> 的话，算出来的新坐标没有存起来，x 不会变。`, r`int inc(int n) { return n + 1; }
int a = 1;
a = inc(a);   // a 变成 2`,
    [r`四个函数，每个返回移动后的新坐标。`, r`调用时写 <code>x = move_right(x);</code>，把结果存回变量。`, r`三步后输出 <code>Position: (2, 3)</code>。`]),
  'D5-Q10': T(r`函数里可以有循环。把“画生命条”封装成 <code>print_bar(filled, empty)</code>，以后任何地方想画就调用一下。|参数决定循环次数：filled 个 #，empty 个 -。`, r`void stars(int n) {
    for (int i = 0; i < n; i++) printf("*");
    printf("\n");
}`,
    [r`函数里两个循环，次数由参数决定。`, r`第一个循环 <code>i < filled</code> 输出 #，第二个 <code>i < empty</code> 输出 -。`, r`调用 <code>print_bar(6, 4);</code> 得到 <code>[######----]</code>。`]),
  'D5-Q11': T(r`好的函数只做一件事。一个函数只负责<b>判断</b>（返回 1 或 0），另一个只负责<b>显示</b>。|分开以后，判断逻辑可以在别处复用，显示方式也能单独修改，互不影响。`, r`int is_open(int keys) { return keys > 0; }
void show(int ok) { if (ok) printf("Yes\n"); else printf("No\n"); }`,
    [r`can_open_door 只 return，不 printf。`, r`print_door_result 根据参数输出 Door opens 或 Door locked。`, r`main 里把一个函数的结果交给另一个：<code>print_door_result(can_open_door(1));</code>`]),
  'D5-Q12': T(r`把公式写进函数，就不用每次重新写一遍：<code>return level * 5 + bonus;</code>。|乘法先算，所以不用加括号。三只怪物调用三次即可。`, r`int area(int w, int h) { return w * h; }`,
    [r`函数返回 <code>level * 5 + bonus</code>。`, r`调用三次：(2, 3)、(5, 2)、(8, 1)。`, r`输出 <code>Reward 1: 13</code>、<code>Reward 2: 27</code>、<code>Reward 3: 41</code>。`]),
  'D5-Q13': T(r`编译器从上往下读代码。如果 main 里调用的函数写在 main 后面，编译器读到调用时还不认识它。|解决办法是在 main 前面写一行<b>函数原型</b>（声明）：<code>void prophecy(void);</code>，相当于先“报个名”，函数的完整内容可以放到后面。注意原型末尾有分号。`, r`void greet(void);          // 原型

int main(void) { greet(); return 0; }

void greet(void) { printf("Hi\n"); }`,
    [r`main 前面只写一行原型。`, r`原型 <code>void prophecy(void);</code>，main 后面再写完整定义。`, r`函数里输出 <code>Seven runes remember your name.</code>。`]),
  'D5-Q14': T(r`函数里可以放 switch：根据传进来的编号，说不同的台词。|这样 main 只需要 <code>talk_npc(2);</code> 一行，台词细节都藏在函数里。`, r`void speak(int id) {
    switch (id) { case 1: printf("A\n"); break; default: printf("?\n"); }
}`,
    [r`函数接收 NPC 编号，内部用 switch。`, r`三个 case 加 default，每个 case 带 break。`, r`调用 <code>talk_npc(2);</code> 输出 <code>Smith: Trust the steel.</code>。`]),
  'D5-Q15': T(r`函数调用可以<b>套娃</b>：<code>enter_room(next_room(3))</code> 先算里面的 next_room(3) 得到 4，再把 4 交给 enter_room。|读的时候从最里层往外读。`, r`int add1(int n) { return n + 1; }
printf("%d\n", add1(add1(1)));   // 3`,
    [r`next_room 返回房间号加 1，enter_room 负责输出。`, r`main 里一行 <code>enter_room(next_room(3));</code>`, r`输出 <code>Enter room 4</code>。`]),
  'D5-Q16': T(r`前面写过的小函数可以像积木一样拼起来：先算伤害，再扣血，最后显示状态。|每一步的输出作为下一步的输入，这叫<b>流水线</b>。`, r`int d = calc(12, 5);
int hp = apply(20, d);`,
    [r`三个函数：calc_damage、apply_damage、print_status。`, r`<code>int damage = calc_damage(12, 5); int enemy_hp = apply_damage(20, damage);</code>`, r`输出 <code>Damage: 7</code>，再调用 print_status 输出 <code>Enemy HP: 13</code>。`]),
  'D5-Q17': T(r`<b>纯函数</b>：只根据参数算出结果并 return，不打印、不改外面的东西。|纯函数最容易测试和复用：同样的输入永远得到同样的输出。打印的事交给调用它的地方。`, r`int score(int a, int b) { return a + b * 2; }`,
    [r`score_battle 只 return 评分公式，函数里不要 printf。`, r`<code>return hp + gold * 2 + keys * 5;</code>`, r`main 里输出 <code>Battle score: 103</code>。`]),
  'D5-Q18': T(r`<code>clamp</code>（夹住）把一个值限制在范围内：太小就返回最小值，太大就返回最大值，否则原样返回。|一个函数里可以有多个 return，哪个先执行到就从哪里结束。`, r`int clamp(int v, int lo, int hi) {
    if (v < lo) return lo;
    if (v > hi) return hi;
    return v;
}`,
    [r`三种情况：小于最小、大于最大、在中间。`, r`两个 if 各带一个 return，最后 <code>return value;</code>`, r`输出 <code>Floor: 1</code>、<code>Floor: 5</code>、<code>Floor: 9</code>。`]),
  'D5-Q19': T(r`<b>单一职责</b>：每个函数只做一件小事，名字就说明它做什么。|把一大段混乱的剧情拆成 title、room、chest、gain_gold、status 这样的小函数，main 就变成一份清楚的“目录”。`, r`void title(void) { printf("Ash Crown\n"); }
int gain(int g, int n) { return g + n; }`,
    [r`至少写 4 个小函数，各管一件事。`, r`金币变化用 <code>gold = gain_gold(gold, 10);</code> 这样的返回值函数。`, r`main 里按剧情顺序调用，照题目要求的文字输出。`]),
  'D5-Q20': T(r`章节试炼：用六个函数组织一场短战斗——计算伤害、扣血、治疗、判断存活、显示状态、输出结局。|先把六个函数都写好并单独想清楚它们的输入和输出，再在 main 里按回合调用。这就是把大问题拆成小问题的编程思维。`, r`int d = damage(10, 4);
hp = hurt(hp, d);
if (!alive(hp)) printf("Fallen\n");`,
    [r`先写六个函数，再写 main 里的回合流程。`, r`伤害、扣血、治疗都返回 int；存活返回 0/1；状态和结局用 void 输出。`, r`输出格式照抄题目，例如 <code>Round %d Hero: %d Knight: %d</code>。`])
};

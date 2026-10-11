import { r, T } from './helpers.mjs';
export default {
  'D7-Q01': T(r`内存像一排带门牌号的箱子，每个变量占一个箱子，门牌号叫<b>地址</b>。<code>&amp;hp</code> 读作“hp 的地址”。|<b>指针</b>是专门装地址的变量：<code>int *p = &amp;hp;</code> 意思是“p 里装着 hp 的门牌号”。<code>*p</code> 读作“p 指向的那个箱子”，读 *p 就是读 hp。|地址的具体数字每次运行都可能不同，所以我们比较地址是否相同，而不是打印它。`, r`int coins = 7;
int *p = &coins;
printf("%d\n", *p);   // 7`,
    [r`先定义 hp，再定义指针 p 存 hp 的地址。`, r`<code>int *p = &hp;</code>，用 <code>*p</code> 读取值，用 <code>p == &hp</code> 比较地址。`, r`输出 <code>HP: 50</code>、<code>Pointer value: 50</code>、<code>Same address: yes</code>。`]),
  'D7-Q02': T(r`把结构体的地址传给函数：<code>heal_player(&amp;hero, 12);</code>，函数参数写 <code>Player *p</code>。|通过指针访问成员用箭头 <code>-&gt;</code>：<code>p-&gt;hp</code> 等于 <code>(*p).hp</code>。因为拿到的是地址，函数里修改的就是 main 里的原 hero，不是拷贝。`, r`void grow(Pet *p) { p->age++; }
grow(&cat);   // cat.age 真的变了`,
    [r`函数参数是 Player 指针，调用时传 &hero。`, r`<code>p->hp += amount; if (p->hp > p->max_hp) p->hp = p->max_hp;</code>`, r`输出 <code>HP: 47/50</code>。`]),
  'D7-Q03': T(r`第五章的 apply_damage 只能 return 新生命，因为参数是拷贝。现在用指针，函数可以<b>直接改</b> main 里的生命，不需要返回值。|调用两次，每次都在上一次的结果上继续扣。`, r`void hurt(Player *p, int d) { p->hp -= d; if (p->hp < 0) p->hp = 0; }`,
    [r`参数 <code>Player *p</code>，用 -> 修改 hp。`, r`扣完后 <code>if (p->hp < 0) p->hp = 0;</code>`, r`输出 <code>After 18: 22</code> 和 <code>After 50: 0</code>。`]),
  'D7-Q04': T(r`<code>p-&gt;keys++</code> 让指针指向的结构体的钥匙数加 1。|函数调用两次，main 里的 hero.keys 就真的从 0 变成 2。<code>Player hero = {0};</code> 把所有成员都设成 0。`, r`void add(Bag *b) { b->items++; }`,
    [r`add_key 接收 Player 指针。`, r`函数体只有一句 <code>p->keys++;</code>`, r`调用两次后输出 <code>Keys: 2</code>。`]),
  'D7-Q05': T(r`一个指针就能修改结构体的<b>多个</b>成员：<code>p-&gt;x += dx; p-&gt;y += dy;</code>。|这比返回值方便：return 一次只能交回一个值，而指针可以一次改好几项。`, r`void move(Point *p, int dx, int dy) { p->x += dx; p->y += dy; }`,
    [r`move_player 接收 Player 指针和两个位移。`, r`<code>p->x += dx; p->y += dy;</code>`, r`输出 <code>Before: 2,3</code> 和 <code>After: 7,1</code>。`]),
  'D7-Q06': T(r`第二章我们在 main 里用 temp 交换过两个变量。想把交换写成函数，参数必须是<b>地址</b>：<code>void swap_int(int *a, int *b)</code>。|函数里用 <code>*a</code>、<code>*b</code> 读写 main 里的原箱子。调用时传地址：<code>swap_int(&amp;sword, &amp;axe);</code>。看上面的动画：temp 先接住 *a，*a 换成 *b，*b 再拿走 temp。`, r`void swap_int(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}`,
    [r`参数是两个 int 指针，交换它们指向的值。`, r`三步：<code>int temp = *a; *a = *b; *b = temp;</code>`, r`调用 <code>swap_int(&sword, &axe);</code>，输出 <code>After: 21 12</code>。`]),
  'D7-Q07': T(r`有的函数只需要“看看”数据，不应该修改它。参数写成 <code>const Player *p</code>，const 表示“只读”：函数里如果不小心写了 <code>p-&gt;hp = 0;</code>，编译器会直接报错。|用指针传结构体还有一个好处：不用复制整个结构体，更省事。`, r`int alive(const Player *p) { return p->hp > 0; }`,
    [r`参数写 <code>const Player *p</code>。`, r`<code>return p->hp > 0;</code>`, r`输出 <code>Alive: 1</code> 和 <code>Fallen: 0</code>。`]),
  'D7-Q08': T(r`二维数组传给函数时，参数写成 <code>char map[][COLS]</code>：行数可以空着，但<b>列数必须写明</b>，编译器才知道每行多长。|<code>#define COLS 6</code> 定义一个常量，改地图大小时只改这一处。数组参数传的是地址，所以函数里改 map，main 里的地图也会变。`, r`#define W 4
void clear(char m[][W], int y, int x) { m[y][x] = '.'; }`,
    [r`get_tile 返回一个格子，set_tile 修改一个格子。`, r`参数 <code>char map[][COLS]</code>，读写 <code>map[y][x]</code>。`, r`输出 <code>Before: .</code> 和 <code>After: k</code>。`]),
  'D7-Q09': T(r`一个函数同时改两样东西：玩家坐标（通过 Player 指针）和地图（通过数组参数）。|先算目标、检查能不能走，不能走就 <code>return 0</code>；能走就更新地图和坐标，<code>return 1</code> 告诉调用者成功了。`, r`if (blocked) return 0;
p->x = nx;
return 1;`,
    [r`先计算 nx、ny 并检查边界和墙。`, r`成功时：旧格改 '.'，更新 p->x、p->y，新格改 '@'，return 1。`, r`向右移动应输出成功的日志并打印地图。`]),
  'D7-Q10': T(r`移动时顺便检查目标格的内容：如果是钥匙 'k'，就 <code>p-&gt;keys++</code> 并输出拾取日志。|这种“走上去自动触发”的效果叫<b>副作用</b>，是游戏逻辑里很常见的写法。`, r`if (map[ny][nx] == 'k') { p->keys++; printf("Got key\n"); }`,
    [r`移动前先检查目标格是不是 'k'。`, r`是的话 <code>p->keys++;</code> 并输出 <code>You found a key!</code>。`, r`然后照常更新地图和坐标。`]),
  'D7-Q11': T(r`门 'D' 需要钥匙：没有钥匙就输出提示并 <code>return;</code> 提前结束（void 函数里单独写 return 表示“到此为止”）。|有钥匙就消耗一把 <code>p-&gt;keys--</code>，开门后继续移动。`, r`if (p->keys == 0) { printf("Locked\n"); return; }
p->keys--;`,
    [r`目标是门时检查钥匙数。`, r`没钥匙 <code>return;</code>，有钥匙 <code>p->keys--;</code> 并输出 Door opened.。`, r`最后钥匙应为 0。`]),
  'D7-Q12': T(r`怪物也是结构体，同样可以用指针修改：<code>hit_monster(&amp;m, 13)</code> 直接扣掉 m 的血。|判断生死的函数只读，所以参数用 <code>const Monster *</code>。`, r`void hit(Monster *m, int d) { m->hp -= d; if (m->hp < 0) m->hp = 0; }`,
    [r`hit_monster 用指针扣血，不低于 0。`, r`monster_alive 参数 <code>const Monster *m</code>，返回 <code>m->hp > 0</code>。`, r`输出 <code>HP: 7 Alive: 1</code> 和 <code>HP: 0 Alive: 0</code>。`]),
  'D7-Q13': T(r`battle 函数接收两个指针，在循环里轮流修改双方的生命，最后 return 谁赢了。|因为用的是指针，战斗结束后 main 里还能看到双方剩下的生命。伤害最低为 1，防止打不动陷入死循环。`, r`int battle(Player *p, Monster *m) {
    while (p->hp > 0 && m->hp > 0) { /* 轮流攻击 */ }
    return p->hp > 0;
}`,
    [r`while 循环直到一方倒下。`, r`每轮先算玩家伤害扣怪物，怪物倒下就 break，否则反击。`, r`return <code>p->hp > 0</code>，main 里根据返回值输出结果。`]),
  'D7-Q14': T(r`“生命低于四分之一”可以写成 <code>m.hp * 4 &lt; m.max_hp</code>，避免整数除法带来的误差。|先判断怪物要不要逃，再判断逃不逃得掉（roll ≥ 50），两层条件嵌套。`, r`if (hp * 4 < max_hp) { /* 很虚弱 */ }`,
    [r`条件一：<code>m.hp * 4 < m.max_hp</code>。`, r`满足时输出逃跑尝试，再用 roll 决定 escaped。`, r`最后输出 <code>Escape success</code>。`]),
  'D7-Q15': T(r`字符串字面量 <code>"The crown remembers."</code> 存在只读的内存里。用 <code>const char *</code> 指向它最安全：<code>const char *line = "...";</code>。|<code>const char *dialogues[] = {...};</code> 是一个装着多个字符串地址的数组，交给 %s 就能输出。函数参数写 <code>const char *line</code> 表示“我只读这段文字”。`, r`const char *msg = "Hello";
printf("%s\n", msg);`,
    [r`talk 函数参数 <code>const char *line</code>。`, r`对话数组 <code>const char *dialogues[] = {"The crown remembers.", "The ash still burns."};</code>`, r`循环调用 talk 输出两行。`]),
  'D7-Q16': T(r`<code>enum</code> 给一组整数起名字：<code>typedef enum { EXPLORE, BATTLE, ... } GameState;</code>，EXPLORE 是 0，BATTLE 是 1……|用名字代替神秘数字，代码一读就懂：<code>state = BATTLE;</code> 比 <code>state = 1;</code> 清楚得多。配合 switch 就是一个<b>状态机</b>。`, r`typedef enum { OFF, ON } Power;
Power p = ON;
if (p == ON) printf("on\n");`,
    [r`用 typedef enum 定义五种状态。`, r`<code>GameState state = BATTLE;</code> 然后 switch 每种状态。`, r`输出 <code>State: BATTLE</code>。`]),
  'D7-Q17': T(r`<b>输出参数</b>：return 只能交回一个值，想交回更多，就让调用者把变量的地址传进来，函数通过 <code>*dx = ...</code> 把结果写回去。|这里 return 值表示“方向是否有效”，真正的位移通过 dx、dy 两个指针带回。`, r`void get_two(int *a, int *b) { *a = 1; *b = 2; }
int x, y;
get_two(&x, &y);`,
    [r`先把 *dx、*dy 设成 0，再根据方向修改其中一个。`, r`无效方向 <code>return 0;</code>，有效 <code>return 1;</code>。`, r`调用 <code>direction_to_delta('w', &dx, &dy)</code>，输出 <code>Valid: 1 dx: 0 dy: -1</code>。`]),
  'D7-Q18': T(r`<code>scanf</code> 会返回成功读到了几项。<code>while (scanf(" %c", &amp;command) == 1)</code> 表示“只要还能读到一个字符就继续”，输入读完时自动退出。|命令 q 用 break 主动退出；无效命令用 continue 跳过本轮剩余的移动和输出。`, r`char c;
while (scanf(" %c", &c) == 1) {
    if (c == 'q') break;
}`,
    [r`循环条件 <code>scanf(" %c", &command) == 1</code>。`, r`'q' 输出 Quit safely 并 break；无效输入输出 Invalid direction 并 continue。`, r`输入 d、x、q 时依次输出 <code>Position: 2,1</code>、<code>Invalid direction</code>、<code>Quit safely</code>。`]),
  'D7-Q19': T(r`毕业前的彩排：在地图上依次走到钥匙、门和守卫，把前面学过的拾取、开门、战斗串成一条剧情。|按顺序一步步写，每完成一步就输出关键日志，方便检查哪一步出了问题。`, r`// 1. 拾钥匙  2. 开门  3. 战斗守卫`,
    [r`三个阶段：k → D → M。`, r`每个阶段先检查目标格字符，再更新玩家状态和地图。`, r`照题目要求输出每一步的日志。`]),
  'D7-Q20': T(r`毕业试炼：只读一次玩家选择，用 switch 分别处理治疗、献金、查看王冠，再输出最终状态和结局。|把前面学过的结构体、指针函数、const 只读参数、输入和 switch 组合起来。三种有效选择都要能通关，写完逐一测试 1、2、3。`, r`switch (choice) {
    case 1: heal_player(&hero); break;
    case 2: offer_gold(&hero); break;
}`,
    [r`读入一次 choice，用 switch 分派。`, r`修改状态的函数接收 <code>Player *</code>，打印函数接收 <code>const Player *</code>。`, r`最后输出状态和结局，分别用输入 1、2、3 测试。`])
};

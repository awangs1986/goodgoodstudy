// New lessons that fix "used before taught" and move input earlier (review items 3 and 4).
import { cProgram, makeLesson } from './lesson-factory.mjs';
import { r, T } from './teach/helpers.mjs';

const p = body => cProgram(body);
const at = (chapterId, title) => ({ id: chapterId, title, scene: '' });

export const inputLessons = {
  // Taught in Day 1 so later lessons can print text with %s (D3, D4-Q20, D5).
  'D1-S01': makeLesson(at('day01', '雾港'), {
    id: 'D1-S01', difficulty: '★☆☆ 入门', title: '灯塔的名字牌', knowledge: '%s 输出文字',
    en: { title: 'The Lighthouse Name Plate', topic: '%s for text' },
    ...T(r`<code>%d</code> 给整数占位，<code>%c</code> 给单个字符占位，<code>%s</code> 则给<b>一整段文字</b>（字符串）占位。|<code>printf("Place: %s\n", "Fog Harbor");</code> 运行时 %s 会被换成后面那段文字。这让我们可以先写好格式，再把不同的文字“填”进去。后面的章节会经常这样用，比如根据条件选出 "Alive" 或 "Fallen" 再交给 %s。`, r`printf("Hello, %s!\n", "Mira");   // Hello, Mira!`,
      [r`格式字符串里写 %s，文字放在逗号后面。`, r`<code>printf("Lighthouse: %s\n", "Ash Beacon");</code>`, r`再用同样的方法输出 <code>Keeper: Ada</code>。`]),
    task: '用 %s 输出灯塔和守灯人的名字。', objective: '使用 <code>%s</code>，输出两行：<code>Lighthouse: Ash Beacon</code> 和 <code>Keeper: Ada</code>。两段名字都要作为 printf 的参数传入。',
    outputRule: { mode: 'exact', value: 'Lighthouse: Ash Beacon\nKeeper: Ada\n' },
    must: [[/%s/, '请用 %s 占位。'], [/,\s*"Ash Beacon"\s*\)/, '把 "Ash Beacon" 作为 printf 的参数传入。'], [/,\s*"Ada"\s*\)/, '把 "Ada" 作为 printf 的参数传入。']],
    solution: p(r`    printf("Lighthouse: %s\n", "Ash Beacon");
    printf("Keeper: %s\n", "Ada");`)
  }),
  'D2-IN1': makeLesson(at('day02', '黑铁集市'), {
    id: 'D2-IN1', difficulty: '★★☆ 基础', title: '商人报价', knowledge: 'scanf 读整数',
    en: { title: "The Merchant's Price", topic: 'scanf with %d' },
    ...T(r`到目前为止，数据都是写死在代码里的。真正的程序会<b>读输入</b>：<code>scanf("%d", &amp;price);</code> 从键盘读一个整数，放进 price。|<code>%d</code> 和 printf 里一样，表示“整数”。变量前面的 <code>&amp;</code> 先当成<b>固定写法</b>：它告诉 scanf 变量住在哪里，好把数放进去（第七章学指针时会彻底讲清楚）。忘了写 &amp; 是新手最常见的错误之一。|在本课程里，输入要<b>先填进</b>右下方的“程序输入”框，再运行。`, r`int age;
scanf("%d", &age);
printf("Next year: %d\n", age + 1);`,
      [r`先声明 int 变量，再用 scanf 读入。`, r`<code>scanf("%d", &price);</code>，别忘了 &。`, r`输入 25 时输出 <code>Price: 25</code> 和 <code>Double: 50</code>。`]),
    task: '读入报价并计算两倍价格。', objective: '从输入读取一个整数报价，输出 <code>Price: 报价</code> 和 <code>Double: 两倍报价</code>。默认输入为 <code>25</code>。',
    input: '25\n', expected: ['Price: 25', 'Double: 50'], minLines: 2,
    must: [[/scanf\s*\(\s*"%d"\s*,\s*&\s*\w+\s*\)/, '请用 scanf("%d", &变量) 读入报价。']],
    solution: p(r`    int price;
    scanf("%d", &price);
    printf("Price: %d\n", price);
    printf("Double: %d\n", price * 2);`)
  }),
  'D2-IN2': makeLesson(at('day02', '黑铁集市'), {
    id: 'D2-IN2', difficulty: '★★☆ 基础', title: '登记职业徽章', knowledge: 'scanf 与 " %c"',
    en: { title: 'Register a Class Badge', topic: 'scanf and " %c"' },
    figure: 'input-buffer',
    ...T(r`你按下的每个键（包括<b>回车</b>）都会先进入一个叫<b>输入缓冲区</b>的队伍，scanf 从队伍前面取。|<code>%d</code> 读完数字就停下，后面的回车 <code>\n</code> 还留在队伍里。如果下一句是 <code>scanf("%c", &amp;c)</code>，它会直接读到这个回车，而不是你想要的字母！|解决方法：写成 <code>scanf(" %c", &amp;c)</code>，%c 前面的<b>空格</b>表示“先跳过所有空白和回车”。读数字的 %d 会自动跳过空白，所以不需要这个空格。`, r`int level;
char rank;
scanf("%d", &level);
scanf(" %c", &rank);   // 空格跳过残留的回车`,
      [r`先读一个整数，再读一个字符。`, r`读字符写成 <code>scanf(" %c", &job);</code>，注意 %c 前的空格。`, r`默认输入 30 和 m 时输出 <code>HP: 30</code> 和 <code>Class: m</code>。`]),
    task: '读入生命和职业字母。', objective: '依次读取一个整数生命值和一个职业字母，输出 <code>HP: 生命</code> 和 <code>Class: 字母</code>。默认输入为两行：<code>30</code> 和 <code>m</code>。',
    input: '30\nm\n', inputLabel: '30 ↵ m', expected: ['HP: 30', 'Class: m'], minLines: 2,
    must: [[/scanf\s*\(\s*"\s+%c"/, '读字符时请写成 " %c"（%c 前加空格），跳过残留的回车。']],
    solution: p(r`    int hp;
    char job;
    scanf("%d", &hp);
    scanf(" %c", &job);
    printf("HP: %d\n", hp);
    printf("Class: %c\n", job);`)
  })
};

// 第 0 课：程序是什么、源代码 → 编译 → 运行、怎样读报错。New fixed IDs C0-Qnn.
import { buildChapter } from './lesson-factory.mjs';
import { lessonZeroIntro } from '../shared/lesson-zero.mjs';

const meta = {
  id: 'day00', day: 0, numeral: '0', rune: '启程之钥', title: '第 0 课 · 启程码头',
  subtitle: '程序是什么、编译与运行、读懂报错',
  description: '还没写过一行代码？从这里开始：先弄懂程序怎样跑起来，再学会和报错做朋友。',
  scene: '码头的老守灯人递给你一本空白手册：“写下的每一行，都会被一丝不苟地执行。”',
  en: { title: 'Lesson 0 · The Pier', subtitle: 'What a program is, compiling, reading errors', description: 'Start here before your first line of code.', rune: 'The Starting Key', scene: 'The old lighthouse keeper hands you a blank handbook.' }
};

const hello = `#include <stdio.h>

int main(void) {
    printf("Hello, Adventurer!\\n");
    return 0;
}`;

export const day00 = buildChapter(meta, [
  {
    id: 'C0-Q01', difficulty: '★☆☆ 入门', title: '你的第一个程序', knowledge: '程序的结构', minutes: 6,
    en: { title: 'Your First Program', topic: 'Program structure' },
    teach: `<p>${lessonZeroIntro.program}</p><p>右边编辑器里已经是一个完整的 C 程序：<code>#include &lt;stdio.h&gt;</code> 借来“输出工具箱”；<code>int main(void) { ... }</code> 是程序的<b>入口</b>，运行时从这里的第一行开始；<code>printf(...)</code> 把文字显示到屏幕上；<code>return 0;</code> 告诉系统“顺利结束”。</p><p>现在你不需要写任何东西，只要点“运行代码”，看看下方控制台出现了什么，然后点“提交符文”。</p>`,
    example: hello,
    task: '不修改代码，先运行，再提交。', objective: '运行编辑器里已有的程序，确认它输出 <code>Hello, Adventurer!</code>，然后提交。',
    starterCode: hello, outputRule: { mode: 'exact', value: 'Hello, Adventurer!\n' },
    hints: ['这一题不用改代码，直接点右下角的“▶ 运行代码”。', '运行后看下方“控制台”标签，应该能看到 Hello, Adventurer!。', '确认输出无误后点“◆ 提交符文”。如果不小心改乱了，点工具栏的 ↶ 恢复初始代码。'],
    solution: hello
  },
  {
    id: 'C0-Q02', difficulty: '★☆☆ 入门', title: '从源代码到屏幕', knowledge: '编译与运行', type: 'predict', minutes: 6,
    en: { title: 'From Source to Screen', topic: 'Compile and run' },
    figure: 'pipeline',
    teach: `<p>${lessonZeroIntro.compile}</p><p>程序严格按<b>从上到下</b>的顺序执行：先执行第一条 <code>printf</code>，再执行第二条。<code>\\n</code> 表示“换行”，没有它，下一段文字会紧接在同一行后面。</p><p>这一题请先别运行，在脑子里当一回计算机：编辑器里的程序会输出什么？选出答案后提交，答对才能运行验证。</p>`,
    task: '预测输出。', objective: '阅读编辑器里的程序，选出它运行后<b>完整的输出</b>（·表示空格，↵表示换行）。',
    choices: ['Lamp on\nShip in\n', 'Ship in\nLamp on\n', 'Lamp onShip in\n', 'printf("Lamp on\\n");\n'], answer: 0,
    hints: ['程序从 main 里的第一行开始，一行一行往下执行。', '第一条 printf 输出 Lamp on 并换行，第二条接着在下一行输出。', '双引号和 printf 本身不会出现在输出里，屏幕上只出现引号里的文字。'],
    solution: `#include <stdio.h>

int main(void) {
    printf("Lamp on\\n");
    printf("Ship in\\n");
    return 0;
}`
  },
  {
    id: 'C0-Q03', difficulty: '★☆☆ 入门', title: '读懂第一条报错', knowledge: '编译报错与行号', type: 'fix', minutes: 8,
    en: { title: 'Read Your First Error', topic: 'Compiler errors' },
    figure: 'error-c',
    teach: `<p>${lessonZeroIntro.errors}</p><p>C 语言里每条语句都要以分号 <code>;</code> 结尾，就像中文句子的句号。编辑器里的程序故意漏了一个分号。先点“运行代码”，打开“语法检查”标签，你会看到像上图这样的报错：<code>main.c:4:35</code> 表示 main.c 文件第 4 行第 35 列，<code>expected ';'</code> 意思是“这里缺一个分号”。</p><p>找到那一行，补上分号，再运行。觉得报错难懂时，也可以点“✨ AI解释错误”。</p>`,
    task: '找出并修好报错。', objective: '先运行，读懂报错指出的<b>行号</b>和原因；修好代码，让程序输出 <code>Hello, Adventurer!</code>。',
    starterCode: `#include <stdio.h>

int main(void) {
    printf("Hello, Adventurer!\\n")
    return 0;
}`,
    outputRule: { mode: 'exact', value: 'Hello, Adventurer!\n' },
    hints: ['先运行一次，看“语法检查”里第一条 error 的行号。', '报错说 expected \';\'：第 4 行 printf(...) 的右括号后面少了东西。', '把第 4 行改成 <code>printf("Hello, Adventurer!\\n");</code>，末尾加上分号。'],
    solution: hello
  },
  {
    id: 'C0-Q04', difficulty: '★☆☆ 入门', title: '一个字母的错误', knowledge: '拼写错误', type: 'fix', minutes: 8,
    en: { title: 'One Wrong Letter', topic: 'Typos' },
    teach: `<p>编译器对拼写一丝不苟：<code>printf</code> 写成 <code>prinft</code>，在它看来就是一个从没听说过的名字。这时报错会出现 <code>undeclared function 'prinft'</code>（未声明的函数）或 <code>undefined symbol</code>（找不到这个名字），意思都是“我不认识它”。</p><p>同样，大小写也算拼写：<code>Printf</code> 和 <code>printf</code> 是两个不同的名字。看到“不认识的名字”类报错，第一反应就是逐个字母检查拼写。</p>`,
    example: `printf("ok\\n");   // 正确\nprinft("ok\\n");   // 错误：编译器不认识 prinft`,
    task: '修好拼写错误。', objective: '运行并阅读报错，修好拼写错误，让程序依次输出 <code>Map found</code> 和 <code>Gate open</code> 两行。',
    starterCode: `#include <stdio.h>

int main(void) {
    printf("Map found\\n");
    prinft("Gate open\\n");
    return 0;
}`,
    outputRule: { mode: 'exact', value: 'Map found\nGate open\n' },
    must: [[/printf\s*\(\s*"Gate open/, '第二句也要用 printf 输出。']],
    hints: ['报错里提到了一个编译器不认识的名字，它是什么？', '对比第 4 行和第 5 行：哪一行的 printf 拼法不一样？', '把 <code>prinft</code> 改成 <code>printf</code>。'],
    solution: `#include <stdio.h>

int main(void) {
    printf("Map found\\n");
    printf("Gate open\\n");
    return 0;
}`
  }
]);

// "第 0 课" shared by the C and C# courses: what a program is, how source code becomes a
// running program, and how to read a compiler error. Each course supplies its own code.

const box = (x, label, sub, cls) => `<g class="lz-step ${cls}"><rect x="${x}" y="24" width="150" height="86" rx="12"/><text x="${x + 75}" y="60" class="lz-title">${label}</text><text x="${x + 75}" y="92" class="lz-sub">${sub}</text></g>`;
const arrow = (x, cls) => `<g class="lz-arrow ${cls}"><line x1="${x}" y1="67" x2="${x + 18}" y2="67"/><path d="M${x + 16} 59 L${x + 28} 67 L${x + 16} 75 Z"/></g>`;

/** Animated SVG: source code → compiler → program → output. `compiler` names the real tool. */
export function pipelineFigure({ file = 'main.c', compiler = 'Clang 编译器', output = 'Hello!' } = {}) {
  return `<figure class="lesson-figure lz-figure"><svg viewBox="0 0 720 196" role="img" aria-label="源代码经过编译器变成程序，运行后产生输出">
<style>
.lz-step rect{fill:#fff8e8;stroke:#5b4a32;stroke-width:2.5}.lz-title{font:700 24px system-ui,sans-serif;fill:#3b2f20;text-anchor:middle}.lz-sub{font:24px ui-monospace,monospace;fill:#6b543b;text-anchor:middle}
.lz-arrow line{stroke:#c0782e;stroke-width:4}.lz-arrow path{fill:#c0782e}
.lz-step,.lz-arrow{opacity:.25;animation:lz-glow 8s infinite}
.s2{animation-delay:1.3s}.a2{animation-delay:2s}.s3{animation-delay:2.7s}.a3{animation-delay:3.4s}.s4{animation-delay:4.1s}.a1{animation-delay:.6s}
@keyframes lz-glow{0%{opacity:.25}8%,70%{opacity:1}90%,100%{opacity:.25}}
@media (prefers-reduced-motion:reduce){.lz-step,.lz-arrow{animation:none;opacity:1}}
</style>
${box(4, '① 源代码', file, 's1')}${arrow(158, 'a1')}${box(190, '② 编译', compiler, 's2')}${arrow(344, 'a2')}${box(376, '③ 程序', '计算机能执行', 's3')}${arrow(530, 'a3')}${box(562, '④ 运行输出', output, 's4')}
<text x="360" y="148" class="lz-sub">编译器先检查你写的代码：有错就报错并停下，</text><text x="360" y="180" class="lz-sub">没有错才生成能运行的程序。</text>
</svg><figcaption>源代码 → 编译 → 程序 → 运行输出</figcaption></figure>`;
}

/** Annotated compiler message: where the file name, line, column and reason are. */
export function errorAnatomyFigure(message) {
  const esc = String(message).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return `<figure class="lesson-figure"><pre class="lz-error">${esc}</pre><figcaption>读报错的顺序：<b>文件名</b> → <b>行号</b>（冒号后第一个数字）→ <b>列号</b> → <b>error 后面的原因</b>。先看第一条报错，后面的往往是它连带出来的。</figcaption></figure>`;
}

export const lessonZeroIntro = {
  program: '程序就是一张写给计算机的“任务清单”。计算机非常听话但一点也不会猜：清单上写什么，它就从上到下一条一条照做，一个字母都不能错。我们写的文字叫<b>源代码</b>，人能读懂；计算机真正执行的是机器指令，所以中间需要一个翻译官。',
  compile: '这个翻译官叫<b>编译器</b>。按下“运行”时，编译器先通读整份源代码，检查拼写和语法；全部合格才翻译成程序，然后运行程序，屏幕上出现的文字就是<b>输出</b>。如果程序需要用户提供数据，那些数据叫<b>输入</b>。',
  errors: '写错是学编程的日常，高手每天也会看到很多报错。报错不是责备你，而是编译器在告诉你“第几行、第几个字附近、出了什么问题”。读报错的顺序是：先找行号，再看 error 后面的英文原因，最后只修第一条，再运行一次。'
};

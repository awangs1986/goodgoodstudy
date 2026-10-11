// Teaching diagrams for the C course (inline SVG, offline, respects reduced motion).
import { errorAnatomyFigure, pipelineFigure } from '../shared/lesson-zero.mjs';

const css = `<style>
.fx-box{fill:#fff8e8;stroke:#5b4a32;stroke-width:2.5}.fx-hot{fill:#ffe1b8;stroke:#c0782e;stroke-width:3}
.fx-t{font:700 16px system-ui,sans-serif;fill:#3b2f20;text-anchor:middle}.fx-s{font:13px ui-monospace,monospace;fill:#7a6248;text-anchor:middle}
.fx-m{font:15px ui-monospace,monospace;fill:#3b2f20;text-anchor:middle}.fx-bad{fill:#fde3df;stroke:#b8433a;stroke-width:2.5;stroke-dasharray:6 4}
.fx-arrow{stroke:#c0782e;stroke-width:3.5;fill:none;marker-end:url(#fxHead)}
</style><defs><marker id="fxHead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#c0782e"/></marker></defs>`;
const fig = (label, body, caption, height = 170) => `<figure class="lesson-figure"><svg viewBox="0 0 720 ${height}" role="img" aria-label="${label}">${css}${body}</svg><figcaption>${caption}</figcaption></figure>`;
const cell = (x, y, w, value, sub, cls = 'fx-box') => `<rect x="${x}" y="${y}" width="${w}" height="54" rx="8" class="${cls}"/><text x="${x + w / 2}" y="${y + 33}" class="fx-m">${value}</text>${sub ? `<text x="${x + w / 2}" y="${y + 76}" class="fx-s">${sub}</text>` : ''}`;

const figures = {
  pipeline: () => pipelineFigure({ file: 'main.c', compiler: 'Clang', output: 'Hello!' }),
  'error-c': () => errorAnatomyFigure("main.c:4:35: error: expected ';' after expression\n    printf(\"Hello, Adventurer!\\n\")\n                                  ^\n                                  ;"),
  'input-buffer': () => fig('输入缓冲区示意图：scanf 读走数字后，回车还留在缓冲区里',
    `<text x="20" y="30" class="fx-t" style="text-anchor:start">键盘输入：7 回车 d 回车，先全部进入“输入缓冲区”排队</text>
${cell(20, 48, 70, '7', '%d 读走')}${cell(100, 48, 70, '\\n', '还留着！', 'fx-hot')}${cell(180, 48, 70, 'd', '')}${cell(260, 48, 70, '\\n', '')}
<text x="360" y="70" class="fx-s" style="text-anchor:start">scanf("%c", &amp;c) 会先读到那个 \\n</text>
<text x="360" y="96" class="fx-s" style="text-anchor:start">scanf(" %c", &amp;c) 的空格：先跳过空白和回车</text>
<text x="360" y="122" class="fx-s" style="text-anchor:start">→ 读到真正的 d</text>`,
    '%d 读数字时会自动跳过前面的空白，但 %c 不会；在 %c 前加一个空格就能跳过残留的回车。', 150),
  'string-nul': () => fig('字符串 Aster 在内存中占 6 个格子，最后一格是 \\0',
    `${['A', 's', 't', 'e', 'r', '\\0'].map((ch, i) => cell(30 + i * 90, 30, 80, ch, `name[${i}]`, i === 5 ? 'fx-hot' : 'fx-box')).join('')}
<text x="580" y="140" class="fx-s">\\0 是“字符串到此结束”的记号</text>`,
    'char name[] = "Aster"; 实际占 6 格：5 个字母 + 1 个看不见的结束符 \\0。所以 char name[20] 最多放 19 个字母。', 150),
  'array-bounds': () => fig('数组越界示意图：长度为 4 的数组只有下标 0 到 3',
    `${[4, 9, 2, 7].map((v, i) => cell(30 + i * 100, 30, 90, v, `a[${i}]`)).join('')}${cell(430, 30, 90, '?', 'a[4] 越界！', 'fx-bad')}
<text x="560" y="62" class="fx-s" style="text-anchor:start">不属于数组的内存</text>`,
    'int a[4] 的合法下标是 0、1、2、3。写 a[4] 就踩到了别人的格子：C 不会替你检查，结果可能是乱码、崩溃或“看起来正常”。', 150),
  'pointer-box': () => fig('变量是带门牌号的箱子，指针箱子里装的是另一个箱子的门牌号',
    `${cell(60, 40, 140, '50', '')}<text x="130" y="30" class="fx-t">int hp</text><text x="130" y="118" class="fx-s">门牌号 &amp;hp = 1000</text>
${cell(420, 40, 160, '1000', '')}<text x="500" y="30" class="fx-t">int *p = &amp;hp</text><text x="500" y="118" class="fx-s">门牌号 2000</text>
<path d="M420 67 C 340 67, 300 67, 205 67" class="fx-arrow"/><text x="312" y="56" class="fx-s">指向</text>
<text x="360" y="152" class="fx-s">&amp;hp：取出 hp 的门牌号　　*p：按 p 里的门牌号找到箱子，打开它（就是 hp）</text>`,
    '门牌号 1000、2000 只是示意，真实地址由系统分配，每次运行都可能不同。', 170),
  'pointer-swap': () => fig('swap 动画：通过两个指针，交换 main 里 a 和 b 两个箱子的内容',
    `<style>.sw-a{animation:sw-a 6s infinite}.sw-b{animation:sw-b 6s infinite}.sw-t{animation:sw-t 6s infinite;opacity:0}
@keyframes sw-a{0%,20%{transform:translate(0,0)}35%,55%{transform:translate(220px,90px)}75%,100%{transform:translate(400px,0)}}
@keyframes sw-b{0%,45%{transform:translate(0,0)}65%,100%{transform:translate(-400px,0)}}
@keyframes sw-t{0%,20%{opacity:0}30%,70%{opacity:1}80%,100%{opacity:0}}
@media (prefers-reduced-motion:reduce){.sw-a,.sw-b,.sw-t{animation:none}.sw-t{opacity:1}}</style>
<text x="140" y="26" class="fx-t">main 的 a（被 *x 指向）</text><text x="540" y="26" class="fx-t">main 的 b（被 *y 指向）</text>
<rect x="80" y="36" width="120" height="54" rx="8" class="fx-box"/><rect x="480" y="36" width="120" height="54" rx="8" class="fx-box"/>
<rect x="300" y="126" width="120" height="54" rx="8" class="fx-hot"/><text x="360" y="200" class="fx-s">临时变量 temp</text>
<g class="sw-a"><text x="140" y="70" class="fx-m">12</text></g><g class="sw-b"><text x="540" y="70" class="fx-m">21</text></g>
<g class="sw-t"><text x="360" y="230" class="fx-s">① temp = *x;　② *x = *y;　③ *y = temp;</text></g>`,
    '如果函数只接收 int a、int b（值的复印件），交换的只是复印件；接收地址 int *x、int *y，才能改到 main 里的原箱子。', 240),
  'pointer-array': () => fig('数组名就是第一个格子的地址，p + 1 指向下一个格子',
    `${[3, 7, 11].map((v, i) => cell(60 + i * 130, 40, 110, v, `arr[${i}] = *(p + ${i})`)).join('')}
<text x="115" y="28" class="fx-s">p = arr</text><path d="M560 67 C 520 67, 520 67, 455 67" class="fx-arrow"/><text x="610" y="72" class="fx-s">p + 2</text>`,
    '把数组传给函数时，传过去的其实是第一个格子的地址；所以函数里改 arr[i]，main 里的数组也会变。', 150)
};

export function figureHtml(key) {
  const make = figures[key];
  if (!make) throw new Error(`Unknown C figure: ${key}`);
  return make();
}
export const figureKeys = Object.keys(figures);

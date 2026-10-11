// 航海地理课：10 个海区，每个海区 = 1 节“航海学堂”概念课 + 若干港口课。先讲后测，通过测验才解锁下一站。
// 稳定 ID：海区 geo01…geo10；概念课 geo-c01；港口课 geo-<港口 id>；题目 geo-<港口>-q1 / geo-c01-q1。存档按这些 ID 记录，不要改。
import { regions } from './concepts.mjs';
import { portsA } from './ports-a.mjs';
import { portsB } from './ports-b.mjs';
import { routes } from './routes.mjs';
export { routes };
export const ports = [...portsA, ...portsB];
export const sources = [
  { title: 'Natural Earth 1:50m 物理矢量与阴影地形（海岸线、陆地、湖泊、河流、SR_50M）', url: 'https://www.naturalearthdata.com/about/terms-of-use/', version: 'v4.1/5.x · 公有领域（Public Domain）' },
  { title: 'CIA The World Factbook（2025 年存档版；CIA 已于 2026-02-04 停止更新）', url: 'https://web.archive.org/web/2025/https://www.cia.gov/the-world-factbook/', version: '美国政府作品 · 公有领域' },
  { title: '维基百科中文/英文各港口城市条目与气候表（仅核对事实与常年气候数据，未复制文本）', url: 'https://zh.wikipedia.org/', version: '文本 CC BY-SA 4.0；本课未改编其文本' },
  { title: 'NOAA / WMO 气候常年值（维基百科气候表的原始来源之一）', url: 'https://www.ncei.noaa.gov/products/land-based-station/comparative-climatic-data', version: '公有领域 / 各国气象机构' },
  { title: '《南极条约》（1959）', url: 'https://www.ats.aq/e/antarctictreaty.html', version: '条约文本' }
];
export const credits = { paragraphs: [
  '航海图由本项目用 Python 从 Natural Earth 1:50m 公有领域数据（陆地、海岸线、湖泊、河流和 SR_50M 阴影地形）渲染成 PNG，地理位置准确，画面风格为本项目原创。',
  '港口与概念讲解全部由本项目用自己的话原创编写，事实参考 CIA World Factbook（公有领域，2025 年存档版）与维基百科条目（只核对事实，未复制或改编 CC BY-SA 文本），因此本课程文本按项目 MIT 许可发布。',
  '气候图是用 matplotlib 根据各城市常年月平均气温和降水的近似值绘制的（数值来自维基百科气候表所引的各国气象机构常年值，已四舍五入）；南极半岛只给出帕尔默站的气温。',
  '港口插画、标题图、船只和船长形象为 AI 生成或占位图，不使用任何真实品牌标志。'
], sources };

const conceptLesson = (r, chapterIndex) => ({ id: `geo-c${r.id.slice(3)}`, kind: 'concept', title: `航海学堂 · ${r.concept.title}`, teach: r.concept, questions: r.quiz, chapterId: r.id, chapterIndex });
const portLesson = (p, chapterIndex) => ({ id: `geo-${p.id}`, kind: 'port', portId: p.id, title: `${p.name} · ${p.country}`, port: p, questions: p.quiz, chapterId: p.chapter, chapterIndex });
export const chapters = regions.map((r, chapterIndex) => {
  const list = ports.filter(p => p.chapter === r.id);
  return { id: r.id, icon: r.icon, title: r.title, sub: r.sub, ports: list.map(p => p.id), lessons: [conceptLesson(r, chapterIndex), ...list.map(p => portLesson(p, chapterIndex))].map((l, localIndex) => ({ ...l, localIndex })) };
});
export const lessons = chapters.flatMap(c => c.lessons);
export const questions = lessons.flatMap(l => l.questions);
export const portById = Object.fromEntries(ports.map(p => [p.id, p]));
if (new Set(lessons.map(l => l.id)).size !== lessons.length) throw new Error('Duplicate geography lesson id');
if (new Set(questions.map(q => q.id)).size !== questions.length) throw new Error('Duplicate geography question id');
for (const [a, b] of routes) if (!portById[a] || !portById[b]) throw new Error(`Unknown route port ${a}-${b}`);

// FIBA 篮球规则课：先学规则（图解 + 真实情景）→ 再当裁判（情景选择题）。
// 稳定 ID：阶段 fb05-02、单元测试 fb05-exam；题目 fb05-02-q1、fb05-exam-1。存档按这些 ID 记录。
import { buildCourse } from '../shared/rules-course.mjs';
import { unitsA } from './content-a.mjs';
import { unitsB } from './content-b.mjs';

export const sources = [
  { title: 'FIBA Official Basketball Rules 2026（v1.1，Central Board 2026-04-23 批准，2026-10-01 生效）', url: 'https://assets.fiba.basketball/image/upload/documents-corporate-fiba-official-rules-2026-v1-1.pdf', version: 'OBR 2026 v1.1 · July 2026' },
  { title: 'The FIBA Official Basketball Rules Changes valid as of 1 October 2026（规则修改摘要）', url: 'https://assets.fiba.basketball/image/upload/documents-corporate-fiba-official-rules-2026-rule-changes-v1-1-en.pdf', version: 'v1.1 · July 2026' },
  { title: 'FIBA 新闻：Official Basketball Rules 2026 to take effect October 1', url: 'https://about.fiba.basketball/en/news/fiba-official-basketball-rules-2026-to-take-effect-october-1', version: '2026' },
  { title: 'FIBA Official Basketball Rules Interpretations（OBRI，2026 版计划于 2026 年 9 月发布）', url: 'https://about.fiba.basketball/en/news/fiba-official-basketball-rules-changes-2026-summary-now-available', version: '延伸阅读' }
];
export const credits = { paragraphs: [
  '本课程依据 FIBA《Official Basketball Rules 2026》（2026 年 10 月 1 日起在全球生效）编写，已包含 2026 版的主要改动：扰乱犯规（DI）与恶意犯规（FL）取代“违反体育运动道德的犯规”、技术犯规分为两类、投篮动作的新定义、两次运球条款的修订、即时回放新增可审查情况等。',
  '规则文件的版权属于 FIBA。本课程只用自己的话解释规则，并标注条款号，未复制官方文本、图表或标志；所有插图（球场、队员、裁判手势、计时器）都是本项目手绘的 SVG。裁判手势为示意画法，正式手势以 OBR 附录 A 为准。',
  '课程讲解、情景和测验题均为本项目原创，按项目的 MIT 许可发布。规则如有疑问，以 FIBA 官方文件和当地赛事规程为准。'
], sources };
export const { chapters, lessons, questions } = buildCourse([...unitsA, ...unitsB], 'fiba');

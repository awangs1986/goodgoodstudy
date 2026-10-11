// F1 赛车规则课：先学规则（图解 + 真实情景）→ 再当干事（情景选择题）。
// 稳定 ID：阶段 f105-02、单元测试 f105-exam；题目 f105-02-q1、f105-exam-1。存档按这些 ID 记录。
import { buildCourse } from '../shared/rules-course.mjs';
import { unitsA } from './content-a.mjs';
import { unitsB } from './content-b.mjs';

export const sources = [
  { title: 'FIA 2026 F1 Regulations – Section B [Sporting]', url: 'https://www.fia.com/system/files/documents/fia_2026_f1_regulations_-_section_b_sporting_-_iss_09_-_2026-10-01.pdf', version: 'Issue 09 · 2026-10-01（WMSC 2026-09-30 批准）' },
  { title: 'FIA 2026 F1 Regulations – Section C [Technical]', url: 'https://www.fia.com/system/files/documents/fia_2026_f1_regulations_-_section_c_technical_-_iss_20_-_2026-08-05.pdf', version: 'Issue 20 · 2026-08-05（WMSC 2026-08-03 批准）' },
  { title: 'FIA 2026 F1 Regulations – Section A [General Regulatory Provisions]（积分 A2.2）', url: 'https://www.fia.com/system/files/documents/fia_2026_f1_regulations_-_section_a_general_provisions_-_iss_03_-_2026-06-25.pdf', version: 'Issue 03 · 2026-06-25' },
  { title: 'FIA 2026 F1 Regulations – Section D [Financial – F1 Teams]（成本帽，未逐条引用）', url: 'https://www.fia.com/regulation/category/110', version: 'Issue 08 · 2026-10-01' },
  { title: 'FIA 国际赛车运动规章（ISC）附录 H（旗语）与附录 L（驾驶规范、驾照罚分）', url: 'https://www.fia.com/regulation/category/123', version: '现行版' },
  { title: 'FIA 新闻：F1 新时代 2026 规则说明', url: 'https://www.fia.com/news/f1s-new-era-everything-you-need-know-about-how-fia-making-formula-1-more-competitive-more', version: '2024 发布' }
];
export const credits = { paragraphs: [
  '本课程依据 FIA 2026 年 F1 规则（截至 2026 年 10 月）编写：体育规则 Section B 第 9 版（2026-10-01）、技术规则 Section C 第 20 版（2026-08-05）、通用规定 Section A 第 3 版（积分）。FIA 在赛季中会多次修订规则，若与最新版本不一致，以 fia.com 发布的最新版本为准。',
  '旗语、驾驶礼仪和驾照罚分主要出自 FIA《国际赛车运动规章》（ISC）附录 H、附录 L 及驾驶标准指引，不在 F1 体育规则正文中，课程中已单独标注。“超车模式”的检测差距、额外电量和功率曲线等数值由 FIA 按赛站设定且多次调整，课程只讲原理并标注了不确定之处。',
  'FIA 规则文件的版权属于 FIA。本课程只用自己的话解释规则并标注条款号，未复制官方文本；所有赛车、赛道、旗帜、轮胎和计时塔插图均为本项目手绘的 SVG，使用中性配色，不含任何车队、F1、FIA 或轮胎品牌的标志与商标。',
  '课程讲解、情景和测验题均为本项目原创，按项目的 MIT 许可发布。'
], sources };
export const { chapters, lessons, questions } = buildCourse([...unitsA, ...unitsB], 'f1');

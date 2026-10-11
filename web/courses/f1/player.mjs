import { mountRulesCourse } from '../shared/rules-player.mjs';
import { chapters, lessons, credits } from './course.mjs';
export const mount = mountRulesCourse({ key: 'f1', chapters, lessons, credits, assessment: true, eyebrow: 'FIA F1 2026 · 先答题，再学规则', title: 'F1 赛车规则 2026', sub: '答题后查看讲解 · 完成测试领取成绩单', hookLabel: '🏁 赛道现场' });

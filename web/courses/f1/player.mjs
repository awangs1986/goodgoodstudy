import { mountRulesCourse } from '../shared/rules-player.mjs';
import { chapters, lessons, credits } from './course.mjs';
export const mount = mountRulesCourse({ key: 'f1', chapters, lessons, credits, eyebrow: 'FIA F1 2026 · 先学规则，再当干事', title: 'F1 赛车规则 2026', sub: '体育规则 Iss 09 · 技术规则 Iss 20', hookLabel: '🏁 赛道现场' });

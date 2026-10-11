import { mountRulesCourse } from '../shared/rules-player.mjs';
import { chapters, lessons, credits } from './course.mjs';
export const mount = mountRulesCourse({ key: 'fiba', chapters, lessons, credits, eyebrow: 'FIBA OBR 2026 · 先学规则，再当裁判', title: 'FIBA 篮球规则', sub: '规则依据 OBR 2026（2026-10-01 生效）', hookLabel: '🏀 场边观察' });

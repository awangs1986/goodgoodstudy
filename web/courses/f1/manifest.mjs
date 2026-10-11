export default {
  id: 'f1-rules', version: 1, status: 'available',
  title: { en: 'F1 Rules 2026 · Illustrated', 'zh-CN': 'F1 赛车规则 2026 · 图解' },
  description: { en: 'Based on the 2026 FIA Formula 1 Sporting (Issue 09) and Technical (Issue 20) Regulations: weekend format, starts, points, flags, Safety Car & VSC, active aero and Overtake mode, track limits, pit lane, tyres, penalties, parc fermé and power units.', 'zh-CN': '依据 FIA 2026 年 F1 体育规则（第 9 版）与技术规则（第 20 版）：周末赛制、发车、积分、旗语、安全车与虚拟安全车、主动空气动力学与“超车模式”、赛道界限、维修区、轮胎、处罚、封闭车场与动力单元。先看图解学规则，再当干事做情景题。' },
  exerciseTypes: ['choice'], load: () => import('./player.mjs')
};

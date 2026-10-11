export default {
  id: 'fiba-rules', version: 1, status: 'available',
  title: { en: 'FIBA Basketball Rules (OBR 2026)', 'zh-CN': 'FIBA 篮球规则 · 看图学当裁判' },
  description: { en: '10 units on the FIBA Official Basketball Rules 2026: court, time, scoring, travelling, 3/5/8/24-second rules, cylinder, charge vs block, the new disruptive & flagrant fouls, free throws and instant replay. Illustrated teach cards first, then referee-style scenario quizzes.', 'zh-CN': '依据 FIBA 2026 最新版规则：球场、时间、得分、走步与两次运球、3/5/8/24 秒、圆柱体与撞人/阻挡、2026 新增扰乱犯规与恶意犯规、罚球与即时回放。每关先看图解学规则，再当裁判做情景题。' },
  exerciseTypes: ['choice'], load: () => import('./player.mjs')
};

export default {
  id: 'f1-rules', version: 1, status: 'available',
  title: { en: 'F1 Rules 2026 · Illustrated', 'zh-CN': 'F1 赛车规则 2026 · 图解' },
  description: { en: 'Take the F1 rules challenge first, then learn from illustrated explanations. Finish every question to receive a personal score report, or explore everything freely in Study Mode.', 'zh-CN': '先挑战 F1 规则情景题，交卷后看图解讲解；完成全部题目可领取个人成绩单。学习模式可自由查看所有内容。' },
  exerciseTypes: ['choice'], load: () => import('./player.mjs')
};

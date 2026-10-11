export default {
  id: 'c',
  version: 1,
  status: 'available',
  title: { en: 'C · The Ashen Crown', 'zh-CN': 'C · 灰烬王冠' },
  description: {
    en: '184 trials: lesson 0 plus 9 chapters with explanations, scanf input, pointer diagrams, predict / fix / fill exercises and two milestone projects.',
    'zh-CN': '第 0 课加 9 章共 184 道试炼：每题先讲后练，配输入、指针图示、读代码猜输出 / 改错 / 填空和两个里程碑项目。'
  },
  order: { en: 'Best as a second course after C#: it shows how memory really works.', 'zh-CN': '建议学完 C# 再学：用来理解内存和指针。' },
  exerciseTypes: ['code', 'predict', 'fix', 'fill'],
  load: () => import('./player.mjs')
};

export default {
  id: 'english-nce', version: 1, status: 'available',
  title: { en: 'English · Comic City & Real Life (NCE syllabus)', 'zh-CN': '英语 · 漫画城与生活运用（新概念大纲）' },
  description: { en: 'Keep the original 325 comic quests and offline audio; add 96 original real-life lessons using Book 2 vocabulary and grammar targets. Every lesson ends with a taught-vocabulary check. Separate track progress, one English backup.', 'zh-CN': '保留25街区、325格漫画任务与离线音频；新增96课第二册生活运用，覆盖862条目标词汇和对应语法，面向初高中、由易到难。每课都有先复习后测试的单词关，题型包括词义、补字母、情境选词和适合实物的看图选词。内容原创，两条路线分别记进度。' },
  exerciseTypes: ['choice', 'text', 'ordering', 'listening'], load: () => import('./wrapper-player.mjs')
};

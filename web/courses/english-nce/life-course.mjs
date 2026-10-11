import { lessons as early } from './life-content-01-32.mjs';
import { lessons as middle } from './life-content-33-64.mjs';
import { lessons as late } from './life-content-65-96.mjs';
import { buildVocabularyCheck } from '../shared/vocabulary-checks.mjs';
import { lifeSyllabus } from './life-syllabus.mjs';

export const lifeSources = [
  { title: '用户提供的第二册 PDF', url: 'https://github.com/sunny10010/English-book-for-study/blob/main/%E6%96%B0%E6%A6%82%E5%BF%B5%E8%8B%B1%E8%AF%AD%E7%AC%AC%E4%BA%8C%E5%86%8C.PDF' },
  { title: '最初提供的课文目录', url: 'https://github.com/wenmin92/NCE2/tree/2e1328bcc07fd5e7fe178bba45a74027b0bc1fb3' }
];
export const lifeStages = [
  { id: 1, title: '阶段 1 · 把日常事情说清楚（1–24）', description: '从校园、家人和出行开始，练习语序、常用时态、数量、比较与基本请求。短句先准确，再连接成一段。' },
  { id: 2, title: '阶段 2 · 连接事情的前后（25–48）', description: '用原因、时间、条件和相对位置解释生活中的事情；逐步接触被动表达、计划及更长的叙述。' },
  { id: 3, title: '阶段 3 · 解释、推测与选择（49–72）', description: '学校项目、社区活动与旅行安排中，区分事实和推测，使用完成时、转述、假设和较复杂的句子。' },
  { id: 4, title: '阶段 4 · 综合表达与真实决定（73–96）', description: '综合运用前面学过的词汇和句式，读懂较长语境，说明理由、评估方案并清楚表达自己的选择。' }
];

export const lifeLessons = [...early, ...middle, ...late].map(source => {
  const id = `nce2-life-${String(source.sourceLesson).padStart(3, '0')}`;
  const lesson = {
    ...source, id, stage: Math.floor((source.sourceLesson - 1) / 24) + 1,
    questions: source.questions.map((question, index) => ({ ...question, id: `${id}-q${String(index + 1).padStart(2, '0')}` }))
  };
  lesson.vocabularyCheck = buildVocabularyCheck({ lesson, vocabulary: lesson.vocabulary, language: 'en', contexts: lesson.vocabulary.map(word => word.example), allWords: true });
  return lesson;
});
if (new Set(lifeLessons.map(lesson => lesson.id)).size !== lifeLessons.length) throw new Error('Duplicate life English lesson ID');
export const lifeCoverage = {
  sourceLessons: lifeSyllabus.length,
  lessons: lifeLessons.length,
  vocabularyEntries: lifeLessons.reduce((sum, lesson) => sum + lesson.vocabulary.length, 0),
  practiceQuestions: lifeLessons.reduce((sum, lesson) => sum + lesson.questions.length, 0),
  vocabularyQuestions: lifeLessons.reduce((sum, lesson) => sum + lesson.vocabularyCheck.questions.length, 0)
};

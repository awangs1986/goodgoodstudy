import { gradeEnglish } from './judge.mjs';
import { normalizeVocabularyState, applyVocabularyAnswer, vocabularyPassed } from '../shared/vocabulary-checks.mjs';

const record = value => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
const copyAnswers = (questions, value) => Object.fromEntries(questions.flatMap(question => {
  const answer = record(value)[question.id];
  return typeof answer === 'string' || (Array.isArray(answer) && answer.every(token => typeof token === 'string'))
    ? [[question.id, structuredClone(answer)]] : [];
}));

export function normalizeLifeLesson(lesson, value) {
  const saved = record(value);
  const answers = copyAnswers(lesson.questions, saved.answers);
  const mainPassed = saved.mainPassed === true && saved.read === true && gradeEnglish(lesson, answers).passed;
  const vocabulary = normalizeVocabularyState(lesson.vocabularyCheck, saved.vocabulary);
  vocabulary.mainPassed = mainPassed;
  vocabulary.completed = vocabularyPassed(lesson.vocabularyCheck, vocabulary);
  return { read: saved.read === true, answers, mainPassed, vocabulary };
}

export function normalizeLifeProgress(value, lessons) {
  if (value != null && record(value).version != null && value.version !== 1) throw new Error('不支持此生活英语存档版本。');
  const saved = record(value), ids = new Set(lessons.map(lesson => lesson.id));
  const entries = Object.fromEntries(lessons.filter(lesson => Object.hasOwn(record(saved.entries), lesson.id)).map(lesson => [lesson.id, normalizeLifeLesson(lesson, saved.entries[lesson.id])]));
  const progress = {
    version: 1,
    active: saved.active === true,
    currentLessonId: ids.has(saved.currentLessonId) ? saved.currentLessonId : lessons[0]?.id ?? '',
    entries,
    completed: lessons.filter(lesson => entries[lesson.id]?.vocabulary.completed).map(lesson => lesson.id)
  };
  const currentIndex = lessons.findIndex(lesson => lesson.id === progress.currentLessonId);
  if (!lifeLessonUnlocked(lessons, progress, currentIndex)) progress.currentLessonId = lessons.find((lesson, index) => lifeLessonUnlocked(lessons, progress, index) && !progress.completed.includes(lesson.id))?.id ?? lessons[0]?.id ?? '';
  return progress;
}

export function lifeLessonUnlocked(lessons, progress, index) {
  return !!lessons[index] && (index === 0 || progress.completed.includes(lessons[index].id) || progress.completed.includes(lessons[index - 1].id));
}

export function submitLifeMain(lesson, value) {
  const entry = normalizeLifeLesson(lesson, value);
  if (!entry.read) throw new Error('请先完成本课学习，再开始练习。');
  const result = gradeEnglish(lesson, entry.answers);
  entry.mainPassed = result.passed;
  entry.vocabulary.mainPassed = result.passed;
  if (!result.passed) entry.vocabulary.completed = false;
  return { entry, result };
}

export function submitLifeVocabulary(lesson, value, questionId, answer) {
  const entry = normalizeLifeLesson(lesson, value);
  const result = applyVocabularyAnswer(lesson.vocabularyCheck, entry.vocabulary, questionId, answer);
  entry.vocabulary = result.state;
  entry.vocabulary.completed = vocabularyPassed(lesson.vocabularyCheck, entry.vocabulary);
  return { entry, correct: result.correct, completed: entry.vocabulary.completed };
}

/** Switching English tracks must not replace the other track's progress. */
export function withLifeProgress(courseProgress, lifeProgress) {
  return { ...structuredClone(record(courseProgress)), nce2Practice: structuredClone(lifeProgress) };
}

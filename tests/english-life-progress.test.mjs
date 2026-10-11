import test from 'node:test';
import assert from 'node:assert/strict';
import { buildVocabularyCheck } from '../web/courses/shared/vocabulary-checks.mjs';
import { normalizeLifeLesson, normalizeLifeProgress, lifeLessonUnlocked, submitLifeMain, submitLifeVocabulary, withLifeProgress } from '../web/courses/english-nce/life-progress.mjs';
import { normalizeProgress } from '../web/courses/shared/progress.mjs';
import { lessons as originalLessons } from '../web/courses/english-nce/course.mjs';

function fixture(id) {
  const lesson = { id, questions: [{ id: `${id}-q1`, prompt: 'Yesterday we ___ by train.', type: 'text', answers: ['travelled', 'traveled'], explanation: 'Yesterday 提示一般过去时。' }] };
  lesson.vocabularyCheck = buildVocabularyCheck({ lesson, vocabulary: [{ word: 'train', meaning: '火车' }, { word: 'ticket', meaning: '车票' }, { word: 'station', meaning: '车站' }], allWords: true });
  return lesson;
}
const lessons = [fixture('nce2-life-001'), fixture('nce2-life-002'), fixture('nce2-life-003')];

test('life English requires study, main practice, then the vocabulary recap and check', () => {
  const lesson = lessons[0]; let entry = normalizeLifeLesson(lesson, null);
  assert.throws(() => submitLifeMain(lesson, entry), /先完成本课学习/);
  assert.throws(() => submitLifeVocabulary(lesson, entry, lesson.vocabularyCheck.questions[0].id, '火车'), /Complete the lesson/);
  entry.read = true; entry.answers[`${lesson.id}-q1`] = 'travel';
  let result = submitLifeMain(lesson, entry); assert.equal(result.result.passed, false);
  entry.answers[`${lesson.id}-q1`] = 'traveled'; result = submitLifeMain(lesson, entry); entry = result.entry;
  assert.equal(result.result.passed, true); assert.equal(entry.vocabulary.mainPassed, true);
  assert.throws(() => submitLifeVocabulary(lesson, entry, lesson.vocabularyCheck.questions[0].id, '火车'), /recap/);
  entry.vocabulary.studied = true;
  const train = lesson.vocabularyCheck.questions.find(q => q.kind === 'meaning' && q.word === 'train');
  result = submitLifeVocabulary(lesson, entry, train.id, '车票'); entry = result.entry;
  assert.equal(result.correct, false); assert.equal(entry.vocabulary.mistakes[train.id], 1); assert.equal(entry.vocabulary.review, train.id);
  entry = normalizeLifeLesson(lesson, JSON.parse(JSON.stringify(entry)));
  assert.equal(entry.answers[`${lesson.id}-q1`], 'traveled'); assert.equal(entry.vocabulary.answers[train.id], '车票'); assert.equal(entry.mainPassed, true);
  result = submitLifeVocabulary(lesson, entry, train.id, '火车'); assert.equal(result.correct, true); entry = result.entry;
  assert.equal(entry.vocabulary.mistakes[train.id], 1, 'retry preserves mistake history');
  for (const q of lesson.vocabularyCheck.questions) entry = submitLifeVocabulary(lesson, entry, q.id, q.answer).entry;
  const progress = normalizeLifeProgress({ version: 1, entries: { [lesson.id]: entry } }, lessons);
  assert.deepEqual(progress.completed, ['nce2-life-001']);
  assert.equal(lifeLessonUnlocked(lessons, progress, 1), true);
  assert.equal(lifeLessonUnlocked(lessons, progress, 2), false);
  assert.equal(lifeLessonUnlocked(lessons, progress, 9), false);
  assert.deepEqual(normalizeLifeProgress(progress, lessons).completed, ['nce2-life-001']);
});

test('forged completion, stale answers and foreign lesson IDs do not unlock life lessons', () => {
  const lesson = lessons[0];
  const progress = normalizeLifeProgress({ version: 1, currentLessonId: 'nce2-life-003', completed: ['nce2-life-001'], entries: { 'nce2-life-001': { read: true, mainPassed: true, answers: { [`${lesson.id}-q1`]: 'wrong' }, vocabulary: { completed: true } }, 'fr01-01': { read: true } } }, lessons);
  assert.deepEqual(progress.completed, []); assert.equal(progress.currentLessonId, 'nce2-life-001');
  assert.deepEqual(Object.keys(progress.entries), ['nce2-life-001']);
  assert.equal(progress.entries[lesson.id].mainPassed, false);
  assert.throws(() => normalizeLifeProgress({ version: 2 }, lessons), /不支持/);
});

test('English track switching and backups preserve old task IDs, answers and new vocabulary checks', () => {
  const old = normalizeProgress({ version: 1, started: true, currentLessonId: 'en1-01-02', completed: ['en1-01-01'], responses: { 'en1-01-02': { answer: 'umbrella' } } }, originalLessons);
  old.languageVocabulary = { 'en1-01-01': { version: 1, mainPassed: true, answers: { a: '雨伞' } } };
  const before = structuredClone(old), life = normalizeLifeProgress(null, lessons);
  life.active = true; life.entries[lessons[0].id] = normalizeLifeLesson(lessons[0], { read: true, answers: { 'nce2-life-001-q1': 'travel' } });
  const merged = withLifeProgress(old, life);
  assert.deepEqual(old, before, 'no mutation of legacy progress');
  const restored = normalizeProgress(JSON.parse(JSON.stringify(merged)), originalLessons);
  assert.deepEqual(restored.completed, ['en1-01-01']); assert.equal(restored.currentLessonId, 'en1-01-02');
  assert.deepEqual(restored.responses, before.responses); assert.deepEqual(restored.languageVocabulary, old.languageVocabulary);
  assert.deepEqual(restored.nce2Practice, life);
  const resetLife = withLifeProgress(restored, normalizeLifeProgress(null, lessons));
  assert.deepEqual(resetLife.completed, restored.completed); assert.deepEqual(resetLife.responses, restored.responses);
  assert.deepEqual(resetLife.nce2Practice.entries, {});
});

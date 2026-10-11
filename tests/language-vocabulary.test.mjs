import test from 'node:test';
import assert from 'node:assert/strict';
import { chapters as english, lessons as englishLessons } from '../web/courses/english-nce/course.mjs';
import { chapters as french, lessons as frenchLessons } from '../web/courses/french-a1/course.mjs';
import { normalizeProgress, createProgress } from '../web/courses/shared/progress.mjs';
import { buildVocabularyCheck, normalizeVocabularyState, vocabularyAnswerCorrect, applyVocabularyAnswer, vocabularyPassed } from '../web/courses/shared/vocabulary-checks.mjs';
const sets = [['en', english], ['fr', french]];
const checkFor = (chapter, lesson, language) => buildVocabularyCheck({ lesson, vocabulary: chapter.vocabulary, language, contexts: [chapter.sentence].filter(Boolean) });
const fixture = (options = {}) => buildVocabularyCheck({ lesson: { id: 'test-lesson', localIndex: 0, questions: [{ prompt: '用英语写“苹果”。', answers: ['apple'], passage: 'There is an apple on the table.' }] }, vocabulary: [{ en: 'apple', meaning: '苹果' }, { en: 'table', meaning: '桌子' }, { en: 'book', meaning: '书' }], language: 'en', ...options });

test('all 481 existing language lessons have taught, scoped post-lesson checks with varied question kinds', () => {
  assert.equal(englishLessons.length + frenchLessons.length, 481);
  const ids = new Set(), counts = {};
  for (const [language, chapters] of sets) for (const chapter of chapters) for (const lesson of chapter.lessons) {
    const check = checkFor(chapter, lesson, language), taught = new Set(check.words.map(w => w.word)), meanings = new Set(check.words.map(w => w.meaning));
    assert.ok(check.words.length >= 3 && check.words.length <= 4, lesson.id);
    assert.ok(check.questions.length >= 4 && check.questions.length <= 7, lesson.id);
    assert.equal(check.fallback, check.words.some(word => word.source === 'chapter-recap'));
    for (const word of check.words) assert.ok(chapter.vocabulary.some(item => item[language] === word.word && item.meaning === word.meaning), `${lesson.id} ${word.word}`);
    for (const q of check.questions) {
      assert.ok(!ids.has(q.id), q.id); ids.add(q.id); counts[q.kind] = (counts[q.kind] ?? 0) + 1;
      assert.ok(q.id.startsWith(`${lesson.id}:vocabulary:`)); assert.ok(taught.has(q.word)); assert.ok(q.explanation);
      assert.ok(vocabularyAnswerCorrect(q, q.answer)); assert.ok(!vocabularyAnswerCorrect(q, 'wrong!')); assert.ok(!vocabularyAnswerCorrect(q, ''));
      if (q.options) {
        assert.ok(q.options.length >= 2 && q.options.length <= 4); assert.equal(new Set(q.options).size, q.options.length);
        assert.equal(q.options.filter(option => vocabularyAnswerCorrect(q, option)).length, 1);
        assert.ok(q.options.every(option => (q.kind === 'meaning' ? meanings : taught).has(option)), q.id);
      }
      if (q.kind === 'missing') {
        assert.ok(q.positions.length === 1 || q.positions.length === 2); assert.equal([...q.answer].length, q.positions.length);
        assert.equal((q.masked.match(/＿/g) ?? []).length, q.positions.length);
        const letters = [...q.answer]; assert.equal([...q.masked].map(char => char === '＿' ? letters.shift() : char).join(''), q.word);
        assert.ok(!vocabularyAnswerCorrect(q, q.word), q.id + ' must accept missing letters only');
      }
      if (q.kind === 'picture') { assert.ok(q.picture.description); assert.ok(!q.picture.svg.includes('<text')); assert.equal(q.audio, undefined); assert.equal(q.transcript, undefined); }
      if (q.kind === 'context') { assert.equal((q.masked.match(/____/g) ?? []).length, 1); assert.ok(q.explanation.includes(q.word)); }
    }
  }
  for (const kind of ['meaning', 'missing', 'picture', 'context']) assert.ok(counts[kind] > 0, kind);
});

test('quiz generation is deterministic, including option positions and lesson-specific IDs', () => {
  const a = fixture(); assert.deepEqual(a, fixture());
  const b = fixture({ lesson: { id: 'different-lesson', questions: [] } });
  assert.ok(a.questions.every(q => b.questions.every(other => q.id !== other.id)));
  assert.ok(new Set(a.questions.filter(q => q.options).map(q => q.options.indexOf(q.answer))).size > 1);
});

test('grammar-only tasks teach chapter recap before assessment, never distractor-only source words', () => {
  const check = fixture({ lesson: { id: 'grammar-only', localIndex: 1, questions: [{ prompt: '选择正确语法', answers: ['am'], options: ['am', 'apple'] }] } });
  assert.ok(check.fallback); assert.ok(check.words.every(word => word.source === 'chapter-recap'));
  let state = normalizeVocabularyState(check);
  assert.throws(() => applyVocabularyAnswer(check, state, check.questions[0].id, check.questions[0].answer));
  state.mainPassed = true;
  assert.throws(() => applyVocabularyAnswer(check, state, check.questions[0].id, check.questions[0].answer));
  state.studied = true; assert.ok(applyVocabularyAnswer(check, state, check.questions[0].id, check.questions[0].answer).correct);
});

test('allWords mode assesses each supplied term with bounded options, preserving synonyms', () => {
  const vocabulary = Array.from({ length: 16 }, (_, i) => ({ word: `word${i}`, meaning: `词义${i}` }));
  vocabulary.push({ word: 'term', meaning: '词义0' });
  const check = fixture({ vocabulary, allWords: true });
  assert.equal(check.words.length, 17); assert.equal(check.questions.filter(q => q.kind === 'meaning').length, 17);
  for (const q of check.questions.filter(q => q.options)) assert.ok(q.options.length <= 4);
  assert.equal(check.questions.find(q => q.word === 'term').options.filter(x => x === '词义0').length, 1);
});

test('picture questions exclude word aliases for the same object and unsupported abstract images', () => {
  const check = fixture({ allWords: true, vocabulary: [{ word: 'bike', meaning: '自行车' }, { word: 'bicycle', meaning: '脚踏车' }, { word: 'apple', meaning: '苹果' }] });
  const q = check.questions.find(item => item.kind === 'picture'); assert.equal(q.word, 'bike'); assert.ok(!q.options.includes('bicycle'));
  const abstract = fixture({ vocabulary: [{ word: 'perhaps', meaning: '或许' }, { word: 'often', meaning: '经常' }, { word: 'always', meaning: '总是' }] });
  assert.ok(!abstract.questions.some(q => q.kind === 'picture'));
});

test('French accents are required, Unicode-normalized, and articles have explicitly taught gender notes', () => {
  const check = fixture({ language: 'fr', allWords: true, vocabulary: [{ fr: 'zéro', meaning: '零' }, { fr: 'la pomme', meaning: '苹果' }, { fr: 'le livre', meaning: '书' }, { fr: "l'école", meaning: '学校' }, { fr: 'les dents', meaning: '牙齿' }] });
  const direct = { answer: 'é' }; assert.ok(vocabularyAnswerCorrect(direct, 'e\u0301')); assert.ok(!vocabularyAnswerCorrect(direct, 'e'));
  const missing = check.questions.find(q => q.kind === 'missing'); assert.ok(!missing.masked.includes('undefined'));
  assert.match(check.words.find(w => w.word === 'la pomme').note, /阴性/); assert.match(check.words.find(w => w.word === 'le livre').note, /阳性/);
  assert.match(check.words.find(w => w.word === "l'école").note, /不能判断/); assert.match(check.words.find(w => w.word === 'les dents').note, /复数.*不能判断/);
});

test('incorrect answers persist explanations and retry state, and only all-correct completes the check', () => {
  const check = fixture(); let state = normalizeVocabularyState(check); state.mainPassed = true; state.studied = true;
  const first = check.questions[0]; state = applyVocabularyAnswer(check, state, first.id, 'wrong').state;
  assert.equal(state.review, first.id); assert.equal(state.mistakes[first.id], 1); assert.ok(!vocabularyPassed(check, state));
  state = normalizeVocabularyState(check, JSON.parse(JSON.stringify(state))); assert.equal(state.review, first.id);
  state = applyVocabularyAnswer(check, state, first.id, first.answer).state; assert.equal(state.review, ''); assert.equal(state.mistakes[first.id], 1);
  for (const q of check.questions.slice(1)) state = applyVocabularyAnswer(check, state, q.id, q.answer).state;
  assert.ok(vocabularyPassed(check, state)); assert.equal(state.cleared.length, check.questions.length);
  state = applyVocabularyAnswer(check, state, first.id, first.answer).state; assert.equal(state.cleared.length, check.questions.length);
  state.answers[first.id] = 'wrong'; assert.ok(!vocabularyPassed(check, state));
  assert.ok(!normalizeVocabularyState(check, state).cleared.includes(first.id));
});

test('course normalize/export/import/reset preserves independent vocabulary, main work and existing completions', async () => {
  const lesson = englishLessons[0], check = checkFor(english[0], lesson, 'en');
  const quiz = normalizeVocabularyState(check); quiz.mainPassed = true; quiz.studied = true;
  quiz.answers[check.questions[0].id] = check.questions[0].answer; quiz.cleared = [check.questions[0].id];
  const saved = { version: 1, completed: [lesson.id], responses: { [lesson.id]: { main: 'retained' } }, battles: { [lesson.id]: { cleared: ['round'], stamina: 2 } }, languageVocabulary: { [lesson.id]: quiz, bogus: quiz }, nce2Practice: { version: 1, completed: ['nce2-life-001'] } };
  const exported = JSON.parse(JSON.stringify(normalizeProgress(saved, englishLessons)));
  assert.deepEqual(exported.completed, [lesson.id]); assert.deepEqual(exported.responses, saved.responses); assert.deepEqual(exported.battles, saved.battles);
  assert.deepEqual(Object.keys(exported.languageVocabulary), [lesson.id]); assert.deepEqual(exported.nce2Practice, saved.nce2Practice);
  assert.deepEqual(normalizeProgress(exported, frenchLessons).languageVocabulary, {});
  let persisted; const progress = createProgress({ progress: exported, saveProgress: value => { persisted = value; } }, englishLessons, error => { throw error; });
  await progress.replace(exported); assert.deepEqual(persisted.languageVocabulary[lesson.id], quiz);
  await progress.replace(null); assert.deepEqual(persisted.languageVocabulary, {}); assert.deepEqual(persisted.responses, {}); assert.deepEqual(persisted.completed, []); progress.dispose();
  const legacy = normalizeVocabularyState(check, undefined, true); assert.ok(legacy.mainPassed); assert.ok(!legacy.studied); assert.ok(!legacy.completed);
});

test('changed check content drops stale question mastery without discarding completed main work', () => {
  const check = fixture(), old = { ...normalizeVocabularyState(check), mainPassed: true, studied: true, completed: true, signature: 'old', cleared: check.questions.map(q => q.id), answers: Object.fromEntries(check.questions.map(q => [q.id, q.answer])) };
  const state = normalizeVocabularyState(check, old); assert.ok(state.mainPassed); assert.equal(state.studied, false); assert.equal(state.completed, false); assert.deepEqual(state.cleared, []);
  assert.deepEqual(normalizeVocabularyState(check, ['bad']), normalizeVocabularyState(check, null));
});

test('homograph verbs never receive misleading noun pictures, and same-meaning sets keep unique question IDs', () => {
  const verbs = fixture({ allWords: true, vocabulary: [{ word: 'book', meaning: '预订' }, { word: 'watch', meaning: '观看' }, { word: 'train', meaning: '训练' }] });
  assert.ok(!verbs.questions.some(q => q.kind === 'picture'));
  const synonyms = fixture({ allWords: true, vocabulary: [{ word: 'bike', meaning: '自行车' }, { word: 'bicycle', meaning: '自行车' }] });
  assert.equal(new Set(synonyms.questions.map(q => q.id)).size, synonyms.questions.length);
  assert.ok(synonyms.words.every(word => synonyms.questions.some(q => q.word === word.word)));
});

test('meaning distractors exclude overlapping taught senses, usage notes and part-of-speech prefixes', () => {
  const check = fixture({ allWords: true, vocabulary: [
    { word: 'display', meaning: 'n. 展览；陈列；展示' }, { word: 'exhibition', meaning: '展览' },
    { word: 'yet', meaning: '还；已经（疑问、否定）' }, { word: 'already', meaning: '已经' },
    { word: 'ticket', meaning: '车票' }
  ] });
  const display = check.questions.find(q => q.word === 'display' && q.kind === 'meaning');
  assert.ok(display); assert.ok(!display.options.includes('展览'));
  const yet = check.questions.find(q => q.word === 'yet' && q.kind === 'meaning');
  assert.ok(yet); assert.ok(!yet.options.includes('已经'));
  const context = check.questions.filter(q => q.options && q.options.includes('display'));
  assert.ok(context.every(q => !q.options.includes('exhibition')));
});

test('concrete Book 2 nouns with an explicit noun label can use pictures, verbs cannot', () => {
  const nouns = fixture({ allWords: true, vocabulary: [{ word: 'mirror', meaning: 'n. 镜子' }, { word: 'snake', meaning: 'n. 蛇' }, { word: 'wheel', meaning: 'n. 车轮；轮子' }] });
  assert.equal(nouns.questions.find(q => q.kind === 'picture').word, 'mirror');
  const verbs = fixture({ allWords: true, vocabulary: [{ word: 'mirror', meaning: 'v. 反映' }, { word: 'balloon', meaning: 'v. 激增' }, { word: 'snake', meaning: 'v. 蜿蜒前进' }] });
  assert.ok(!verbs.questions.some(q => q.kind === 'picture'));
});

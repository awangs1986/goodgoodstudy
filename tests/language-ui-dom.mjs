/**
 * Optional, separately run DOM integration QA. This does not replace real-browser/layout/audio QA.
 *
 * With jsdom available in the project's module resolution:
 *   node --loader ./tests/helpers/ignore-css.mjs tests/language-ui-dom.mjs
 * Or point at an existing jsdom module without adding any project dependency:
 *   GRAY_CROWN_JSDOM=/absolute/path/to/jsdom/lib/api.js node --loader ./tests/helpers/ignore-css.mjs tests/language-ui-dom.mjs
 * Missing jsdom is an explicit setup failure, never a skipped or passing check.
 */
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

let JSDOM;
try {
  const configured = process.env.GRAY_CROWN_JSDOM;
  const source = configured ? (configured.startsWith('file:') ? configured : pathToFileURL(resolve(configured)).href) : 'jsdom';
  ({ JSDOM } = await import(source));
  assert.equal(typeof JSDOM, 'function', 'The configured module must export JSDOM.');
} catch (cause) {
  throw new Error('DOM QA requires jsdom. Make jsdom resolvable or set GRAY_CROWN_JSDOM to an existing jsdom module file, then run this script with --loader ./tests/helpers/ignore-css.mjs. No tests were skipped.', { cause });
}

const dom = new JSDOM('<main id="root"></main>', { url: 'https://language-qa.invalid/' });
const { window } = dom;
for (const key of ['document', 'Event', 'HTMLElement', 'HTMLDialogElement', 'FileReader', 'Blob']) globalThis[key] = window[key];
globalThis.confirm = () => true;
globalThis.matchMedia = () => ({ matches: true });
window.HTMLElement.prototype.scrollIntoView = () => {};
window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
window.HTMLDialogElement.prototype.close = function () { this.open = false; this.dispatchEvent(new Event('close')); };
const root = document.querySelector('#root');
const settle = async () => { for (let i = 0; i < 12; i++) await new Promise(resolve => setImmediate(resolve)); };
const waitFor = async (predicate, message) => {
  const deadline = Date.now() + 3000;
  while (!predicate() && Date.now() < deadline) await new Promise(resolve => setTimeout(resolve, 5));
  assert.ok(predicate(), message);
};
const available = node => !node.disabled && !node.closest('fieldset[disabled]') && !node.closest('[hidden]') && (!node.closest('dialog') || node.closest('dialog').open);
const findButton = (text, container = root) => [...container.querySelectorAll('button')].find(node => node.textContent === text && available(node));
async function click(text, container = root) {
  await waitFor(() => findButton(text, container), `Available button not found: ${text}`);
  findButton(text, container).click(); await settle();
}
function fill(question, answer, selector = 'data-question-id') {
  const field = root.querySelector(`[${selector}="${question.id}"]`);
  assert.ok(field && !field.hidden && !field.disabled, `Answer field must be available: ${question.id}`);
  if (question.options) {
    const radio = [...field.querySelectorAll('input[type=radio]')].find(node => node.value === answer);
    assert.ok(radio && !radio.disabled, `Answer option not found: ${question.id}`);
    radio.checked = true; radio.dispatchEvent(new Event('change'));
  } else {
    const input = field.querySelector('input[type=text]'); assert.ok(input && !input.disabled, `Text input not found: ${question.id}`);
    input.value = answer; input.dispatchEvent(new Event('input'));
  }
}
async function strike() {
  const attack = [...root.querySelectorAll('button')].find(node => node.textContent.startsWith('💥 发动') && available(node));
  assert.ok(attack, 'Main battle attack is available'); attack.click(); await settle();
}
async function enterOriginalLesson(lesson, started) {
  await click(started ? '继续远征 →' : '踏上旅途 →');
  const node = root.querySelector(`[data-lesson-id="${lesson.id}"]`); assert.ok(node && !node.disabled); node.click(); await settle();
}
function savedContext(courseId, progress = null, reject = () => false) {
  let durable;
  return {
    context: { courseId, language: 'zh-CN', progress, async saveProgress(value) {
      if (reject(value)) throw new Error('SIMULATED DISK FULL');
      durable = structuredClone(value);
    } },
    get durable() { return durable; }
  };
}
const { buildVocabularyCheck, normalizeVocabularyState, applyVocabularyAnswer } = await import('../web/courses/shared/vocabulary-checks.mjs');
const checkFor = (lesson, chapter, language) => buildVocabularyCheck({ lesson, vocabulary: chapter.vocabulary, language, contexts: [chapter.sentence].filter(Boolean) });
let active;
const dispose = () => { active?.dispose(); active = undefined; };
const results = [];
function pass(result) { results.push(result); console.log(`PASS ${result}`); }

async function originalWorkflow(courseId, language) {
  const { mount } = await import(`../web/courses/${courseId}/player.mjs`);
  const { lessons, chapters } = await import(`../web/courses/${courseId}/course.mjs`);
  const lesson = lessons[0], check = checkFor(lesson, chapters[lesson.chapterIndex], language), store = savedContext(courseId);
  active = await mount(root, store.context); await enterOriginalLesson(lesson, false);
  assert.match(root.querySelector('.language-vocabulary').textContent, /完成上方主课/);
  for (const [index, question] of lesson.questions.entries()) {
    fill(question, question.answers[0]); await strike();
    if (index < lesson.questions.length - 1) await click('下一格 →');
  }
  await click('进入课后单词测试 →');
  assert.ok(store.durable.languageVocabulary[lesson.id].mainPassed);
  assert.ok(!store.durable.completed.includes(lesson.id), 'Main success alone must not unlock another task');
  const mainAnswers = structuredClone(store.durable.responses[lesson.id]), mainBattle = structuredClone(store.durable.battles[lesson.id]);
  await click('我复习好了，开始单词测试'); await click('检查这个答案');
  assert.match(root.querySelector('.vocabulary-feedback').textContent, /请先选择/);
  const first = check.questions[0]; fill(first, first.options.find(option => option !== first.answer), 'data-vocabulary-question');
  await click('检查这个答案'); assert.match(root.querySelector('.vocabulary-feedback').textContent, /还需要再练/);
  assert.ok(root.querySelector('.vocabulary-question').disabled, 'A wrong answer must enter explicit review');
  await active.flush(); dispose(); store.context.progress = store.durable;
  active = await mount(root, store.context); await enterOriginalLesson(lesson, true);
  assert.equal(root.querySelectorAll('[data-question-id]:not([hidden])').length, 0);
  assert.match(root.querySelector('.vocabulary-feedback').textContent, /还需要再练/);
  assert.deepEqual(store.durable.responses[lesson.id], mainAnswers); assert.deepEqual(store.durable.battles[lesson.id], mainBattle);
  await click('看懂了，再试一次');
  for (const [index, question] of check.questions.entries()) {
    assert.equal(root.querySelector('[data-vocabulary-question]').dataset.vocabularyQuestion, question.id);
    fill(question, question.answer, 'data-vocabulary-question'); await click('检查这个答案');
    if (index === 0) {
      await active.flush(); dispose(); store.context.progress = store.durable;
      active = await mount(root, store.context); await enterOriginalLesson(lesson, true);
      assert.equal(root.querySelector('[data-vocabulary-question]').dataset.vocabularyQuestion, check.questions[1].id);
      assert.equal(root.querySelector('.vocabulary-question').disabled, false, 'A partially correct word test must reopen with an enabled answer field');
      assert.ok(store.durable.languageVocabulary[lesson.id].cleared.includes(question.id));
    }
  }
  assert.ok(!store.durable.completed.includes(lesson.id));
  assert.match(root.querySelector('.language-vocabulary').textContent, /错词回顾/);
  await click('完成本课并收录漫画');
  assert.ok(store.durable.completed.includes(lesson.id)); assert.ok(store.durable.languageVocabulary[lesson.id].completed);
  const victory = root.querySelector('.adventure-dialog[open]'); assert.ok(victory, 'First completion should show the reward dialog');
  await click('关闭', victory); assert.equal(root.querySelector('.adventure-dialog[open]'), null);

  const wordHistory = structuredClone(store.durable.languageVocabulary[lesson.id]), attempts = store.durable.attempts[lesson.id];
  const rewardDisplay = root.querySelector('.learn-progress').textContent;
  await click('重练主课（保留完成与词测记录）');
  assert.equal(root.querySelectorAll('[data-question-id]:not([hidden])').length, 1);
  assert.ok(store.durable.completed.includes(lesson.id)); assert.equal(store.durable.battles[lesson.id].replay, true);
  assert.deepEqual(store.durable.languageVocabulary[lesson.id], wordHistory);
  fill(lesson.questions[0], lesson.questions[0].answers[0]); await strike();
  await active.flush(); dispose(); store.context.progress = store.durable;
  active = await mount(root, store.context); await enterOriginalLesson(lesson, true);
  assert.equal(root.querySelector('[data-question-id]:not([hidden])').dataset.questionId, lesson.questions[1].id);
  for (const [index, question] of lesson.questions.entries()) {
    if (index === 0) continue;
    fill(question, question.answers[0]); await strike();
    if (index < lesson.questions.length - 1) await click('下一格 →');
  }
  await click('进入课后单词测试 →');
  assert.equal(store.durable.battles[lesson.id].replay, undefined);
  assert.deepEqual(store.durable.languageVocabulary[lesson.id], wordHistory);
  assert.equal(store.durable.attempts[lesson.id], attempts);
  assert.equal(root.querySelector('.learn-progress').textContent, rewardDisplay, 'Main replay must not duplicate XP, gold or completion');
  assert.equal(root.querySelector('.adventure-dialog[open]'), null, 'Main replay must not issue another reward dialog');
  await click('再练一次单词（保留主课与完成记录）');
  assert.ok(store.durable.completed.includes(lesson.id));
  assert.deepEqual(store.durable.responses[lesson.id], mainAnswers); assert.deepEqual(store.durable.battles[lesson.id], mainBattle);
  await active.flush(); dispose();
  pass(`${courseId}: main/word gates, empty and wrong answers, saved resume, successful retry, completion, vocabulary replay, and resumable main replay without duplicate rewards`);
}

async function failedSaveWorkflow() {
  const { mount } = await import('../web/courses/english-nce/player.mjs');
  const { lessons, chapters } = await import('../web/courses/english-nce/course.mjs');
  const lesson = lessons[0], check = checkFor(lesson, chapters[0], 'en');
  let vocabulary = normalizeVocabularyState(check); vocabulary.mainPassed = true; vocabulary.studied = true;
  for (const question of check.questions) vocabulary = applyVocabularyAnswer(check, vocabulary, question.id, question.answer).state;
  let rejected = 0;
  const store = savedContext('english-nce', { version: 1, started: true, currentLessonId: lesson.id, languageVocabulary: { [lesson.id]: vocabulary } }, value => {
    if (value.completed.includes(lesson.id) && rejected === 0) { rejected++; return true; } return false;
  });
  active = await mount(root, store.context); await enterOriginalLesson(lesson, true); await click('完成本课并收录漫画');
  assert.equal(rejected, 1); assert.deepEqual(store.durable.completed, []);
  assert.equal(root.querySelector('.vocabulary-completed'), null);
  assert.ok(findButton('完成本课并收录漫画'), 'Failed final save must leave an explicit retry');
  assert.ok(root.querySelector('.learn-footer button').disabled, 'Failed final save must not unlock the next task');
  assert.equal(root.querySelector('.adventure-dialog[open]'), null);
  await click('完成本课并收录漫画');
  assert.deepEqual(store.durable.completed, [lesson.id]); assert.equal(store.durable.attempts[lesson.id], 1);
  assert.equal(store.durable.scores[lesson.id], 100); assert.equal(store.durable.consecutiveFailures[lesson.id], 0);
  assert.equal(store.durable.languageVocabulary[lesson.id].cleared.length, check.questions.length);
  assert.ok(root.querySelector('.adventure-dialog[open]'));
  await active.flush(); dispose();

  let mainRejected = 0;
  const retry = savedContext('english-nce', null, value => {
    if ((value.attempts[lesson.id] ?? 0) > 0 && mainRejected === 0) { mainRejected++; return true; } return false;
  });
  active = await mount(root, retry.context); await enterOriginalLesson(lesson, false);
  const question = lesson.questions[0]; fill(question, question.options.find(option => option !== question.answers[0])); await strike();
  assert.equal(mainRejected, 1); fill(question, question.answers[0]); await strike();
  assert.equal(retry.durable.responses[lesson.id][question.id], question.answers[0], 'Rollback must not disconnect mounted input closures from saved answers');
  assert.ok(retry.durable.battles[lesson.id].cleared.includes(question.id));
  assert.equal(retry.durable.attempts[lesson.id], undefined, 'Failed attempts must not leak into later saves');
  await active.flush(); dispose();
  pass('Failed-save recovery: no premature completion/reward/unlock, one successful final retry, and mounted main answers still save after rollback');
}

async function frenchAccentWorkflow() {
  const { mount } = await import('../web/courses/french-a1/player.mjs');
  const { lessons, chapters } = await import('../web/courses/french-a1/course.mjs');
  const target = lessons.map(lesson => ({ lesson, check: checkFor(lesson, chapters[lesson.chapterIndex], 'fr') }))
    .find(({ check }) => check.questions.some(question => question.kind === 'missing' && /[éèêëàâçîïôùûü]/u.test(question.answer)));
  assert.ok(target, 'An actual French task must exercise an accented missing letter');
  const { lesson, check } = target;
  const question = check.questions.find(item => item.kind === 'missing' && /[éèêëàâçîïôùûü]/u.test(item.answer));
  let vocabulary = normalizeVocabularyState(check); vocabulary.mainPassed = true; vocabulary.studied = true;
  for (const previous of check.questions.slice(0, check.questions.indexOf(question))) vocabulary = applyVocabularyAnswer(check, vocabulary, previous.id, previous.answer).state;
  const legacyCompleted = lessons.slice(0, lessons.indexOf(lesson)).map(item => item.id);
  const store = savedContext('french-a1', { version: 1, started: true, currentLessonId: lesson.id, mapChapter: lesson.chapterIndex, completed: legacyCompleted, languageVocabulary: { [lesson.id]: vocabulary } });
  active = await mount(root, store.context); await enterOriginalLesson(lesson, true);
  const unaccented = question.answer.normalize('NFD').replace(/\p{M}/gu, ''); assert.notEqual(unaccented, question.answer);
  fill(question, unaccented, 'data-vocabulary-question'); await click('检查这个答案');
  assert.match(root.querySelector('.vocabulary-feedback').textContent, /还需要再练/);
  await click('看懂了，再试一次');
  for (const character of question.answer) {
    const field = root.querySelector('[data-vocabulary-question]');
    if (findButton(character, field)) await click(character, field);
    else { const input = field.querySelector('input[type=text]'); input.value += character; input.dispatchEvent(new Event('input')); }
  }
  assert.equal(root.querySelector('.vocabulary-input').value, question.answer, 'Accent keys must insert letters into the active answer');
  await click('检查这个答案');
  assert.ok(store.durable.languageVocabulary[lesson.id].cleared.includes(question.id));
  assert.equal(store.durable.languageVocabulary[lesson.id].mistakes[question.id], 1);
  assert.deepEqual(store.durable.completed, legacyCompleted);
  await active.flush(); dispose();
  pass('French accents: an unaccented spelling is rejected, on-screen accent keys insert the correct spelling, retry succeeds and old completions remain');
}

async function lifeWorkflow() {
  const { mount } = await import('../web/courses/english-nce/wrapper-player.mjs');
  const { lifeLessons } = await import('../web/courses/english-nce/life-course.mjs');
  assert.equal(lifeLessons.length, 96, 'The shipped life track must contain all 96 lessons before full UI QA can pass');
  assert.deepEqual(lifeLessons.map(lesson => lesson.sourceLesson), Array.from({ length: 96 }, (_, index) => index + 1), 'The life route must present every source lesson in order');
  const lesson = lifeLessons[0];
  const original = { version: 1, started: true, completed: ['en1-01-01'], responses: { 'en1-01-02': { q1: 'keep old draft' } }, nce2Practice: { version: 1, active: true } };
  const store = savedContext('english-nce', original);
  active = await mount(root, store.context); await click(`继续第 1 课 · ${lesson.title}`);
  assert.equal(root.querySelectorAll('[data-question-id]').length, 0, 'Study must precede the life lesson exercise');
  await click('我已学完讲解和目标词，开始练习');
  fill(lesson.questions[0], lesson.questions[0].answers[0]);
  await waitFor(() => store.durable.nce2Practice.entries[lesson.id]?.answers[lesson.questions[0].id] === lesson.questions[0].answers[0], 'First debounced answer must be saved');
  fill(lesson.questions[1], lesson.questions[1].answers[0]);
  await waitFor(() => store.durable.nce2Practice.entries[lesson.id]?.answers[lesson.questions[1].id] === lesson.questions[1].answers[0], 'Input closure must still save after an earlier debounce');
  await click('检查练习'); assert.match(root.textContent, /还需要修改/); assert.ok(!store.durable.nce2Practice.completed.includes(lesson.id));
  for (const question of lesson.questions) fill(question, question.answers[0]);
  await click('检查练习'); assert.ok(!store.durable.nce2Practice.completed.includes(lesson.id));
  await click('复习好了，开始词测');
  await click('检查单词'); assert.match(root.querySelector('.life-feedback').textContent, /请先/);
  assert.deepEqual(store.durable.nce2Practice.entries[lesson.id].vocabulary.mistakes, {}, 'An empty vocabulary submission must not count as a mistake or reveal an answer');
  const first = lesson.vocabularyCheck.questions[0]; fill(first, first.options.find(option => option !== first.answer));
  await click('检查单词'); assert.match(root.querySelector('.life-feedback').textContent, /再试一次/);
  assert.equal(store.durable.nce2Practice.entries[lesson.id].vocabulary.mistakes[first.id], 1);
  await active.flush(); dispose(); store.context.progress = store.durable;
  active = await mount(root, store.context); await click(`继续第 1 课 · ${lesson.title}`);
  assert.equal(root.querySelector('[data-question-id]').dataset.questionId, first.id, 'Wrong vocabulary item must resume on reopening');
  assert.match(root.querySelector('.life-feedback').textContent, /再试一次/, 'Wrong-answer teaching feedback must also return after reopening');
  for (const question of lesson.vocabularyCheck.questions) { fill(question, question.answer); await click('检查单词'); }
  assert.deepEqual(store.durable.nce2Practice.completed, [lesson.id]);
  assert.deepEqual(store.durable.completed, original.completed); assert.deepEqual(store.durable.responses, original.responses);
  const completedBackup = structuredClone(store.durable);
  const lifeBefore = structuredClone(store.durable.nce2Practice);
  await click('漫画城 · 基础课程'); await waitFor(() => root.querySelector('.learning-course'), 'Original English track mounts');
  assert.equal(store.durable.nce2Practice.active, false); assert.deepEqual(store.durable.nce2Practice.completed, [lesson.id]);
  assert.deepEqual(store.durable.completed, original.completed); assert.deepEqual(store.durable.responses, original.responses);
  await click('第二册 · 生活运用'); await waitFor(() => root.querySelector('.life-course'), 'Life English track remounts');
  assert.deepEqual(store.durable.nce2Practice, lifeBefore);
  await click('重置生活运用');
  assert.deepEqual(store.durable.nce2Practice.entries, {}); assert.deepEqual(store.durable.nce2Practice.completed, []);
  assert.deepEqual(store.durable.completed, original.completed); assert.deepEqual(store.durable.responses, original.responses);
  // The native file picker itself is not simulated: exercise its received-file change handler.
  async function importBackup(backup) {
    const input = root.querySelector('.life-tools input[type=file]'); assert.ok(input);
    Object.defineProperty(input, 'files', { configurable: true, value: [{ text: async () => JSON.stringify(backup) }] });
    input.dispatchEvent(new Event('change')); await settle();
  }
  await importBackup({ kind: 'course-progress', version: 1, courseId: 'english-nce', progress: completedBackup });
  assert.deepEqual(store.durable.nce2Practice.completed, [lesson.id]);
  assert.deepEqual(store.durable.completed, original.completed); assert.deepEqual(store.durable.responses, original.responses);
  const beforeInvalidImport = structuredClone(store.durable);
  await importBackup({ kind: 'course-progress', version: 1, courseId: 'french-a1', progress: {} });
  assert.match(root.querySelector('.life-status').textContent, /这不是英语课程备份/);
  assert.deepEqual(store.durable, beforeInvalidImport, 'A foreign-course backup must not change either English track');
  await active.flush(); dispose();
  pass('NCE 96-lesson track: study/main/word gates, two independent debounced saves, wrong-answer resume/retry, first-lesson completion, track switching, reset and valid/invalid backup import preserve original completion/drafts');
}

try {
  await originalWorkflow('english-nce', 'en');
  await originalWorkflow('french-a1', 'fr');
  await failedSaveWorkflow();
  await frenchAccentWorkflow();
  await lifeWorkflow();
  console.log(`${results.length} DOM workflow groups passed. Real browser layout, pointer interaction, audio playback and native file dialogs remain separate checks.`);
} finally {
  dispose(); dom.window.close();
}

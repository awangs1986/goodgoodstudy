import { element, button, downloadJson } from '../shared/player.mjs';
import { normalizeProgress } from '../shared/progress.mjs';
import { vocabularyShuffle } from '../shared/vocabulary-checks.mjs';
import { lessons as originalLessons } from './course.mjs';
import { lifeLessons, lifeStages, lifeSources } from './life-course.mjs';
import { normalizeLifeProgress, normalizeLifeLesson, lifeLessonUnlocked, submitLifeMain, submitLifeVocabulary, withLifeProgress } from './life-progress.mjs';
import './life.css';

export async function mount(root, context) {
  let courseProgress = normalizeProgress(context.progress, originalLessons, context.language);
  let state = normalizeLifeProgress(courseProgress.nce2Practice, lifeLessons);
  state.active = true;
  let screen = 'map', busy = false, disposed = false, timer, queue = Promise.resolve();
  const status = element('p', '', 'life-status'); status.setAttribute('role', 'status');
  const shell = element('section', null, 'life-course');
  const main = element('main'); shell.append(main, status); root.replaceChildren(shell);
  const current = () => lifeLessons.find(lesson => lesson.id === state.currentLessonId) ?? lifeLessons[0];
  const entry = lesson => state.entries[lesson.id] ??= normalizeLifeLesson(lesson, null);
  const report = error => { status.textContent = `保存或操作失败：${error.message}。你的当前输入仍在此页，请重试保存。`; };
  function updateBusy() { root.querySelectorAll('button,input,textarea').forEach(node => { node.disabled = busy || node.dataset.unavailable === 'true'; }); }
  function persist() {
    clearTimeout(timer);
    const normalized = normalizeLifeProgress(state, lifeLessons); normalized.active = true;
    // Keep mounted input closures attached to the live entries while a debounced save runs.
    state.completed = normalized.completed; state.active = true;
    const snapshot = withLifeProgress(courseProgress, normalized);
    const operation = queue.catch(() => {}).then(() => context.saveProgress(snapshot)).then(() => { courseProgress = snapshot; });
    queue = operation;
    return operation;
  }
  function schedule() { clearTimeout(timer); timer = setTimeout(() => persist().catch(report), 300); }
  async function act(action) {
    if (busy || disposed) return;
    busy = true; updateBusy(); status.textContent = '';
    try { await action(); }
    catch (error) { report(error); }
    finally { busy = false; updateBusy(); }
  }
  const actionButton = (label, action, className) => button(label, () => act(action), className);
  function heading() {
    const header = element('header');
    header.append(element('h1', '第二册 · 生活运用'), element('p', `${lifeLessons.length} 课 · 4 个递进阶段 · 已完成 ${state.completed.length} 课`), element('p', '面向中国初高中学习者，把目标词汇和语法用于真实生活。先读讲解与例句，再练习，最后完成本课词测。', 'life-note'));
    const tools = element('div', null, 'life-tools');
    tools.append(actionButton('课程目录', async () => { await persist(); screen = 'map'; render(); }));
    tools.append(actionButton('备份整个英语课程', async () => { await persist(); downloadJson('english-nce-progress.json', { kind: 'course-progress', version: 1, courseId: 'english-nce', progress: courseProgress }); }));
    const label = element('label', '导入英语备份', 'soft-btn file-label'), input = element('input');
    input.type = 'file'; input.accept = 'application/json'; input.hidden = true; label.append(input); tools.append(label);
    input.addEventListener('change', () => { const file = input.files?.[0]; input.value = ''; if (!file) return; act(async () => {
      const value = JSON.parse(await file.text());
      if (value.kind !== 'course-progress' || value.version !== 1 || value.courseId !== 'english-nce') throw new Error('这不是英语课程备份');
      const imported = normalizeProgress(value.progress, originalLessons, context.language);
      const life = normalizeLifeProgress(imported.nce2Practice, lifeLessons); life.active = true;
      if (!confirm('用此备份替换整个英语课程进度（漫画城和生活运用）？其他课程不受影响。')) return;
      clearTimeout(timer); await queue.catch(() => {});
      const snapshot = withLifeProgress(imported, life);
      await context.saveProgress(snapshot); courseProgress = snapshot; state = life; screen = 'map'; render();
    }); });
    tools.append(actionButton('重置生活运用', async () => {
      if (!confirm('清除生活运用的学习进度？漫画城和其他课程进度会保留。')) return;
      clearTimeout(timer); await queue.catch(() => {});
      const fresh = normalizeLifeProgress(null, lifeLessons); fresh.active = true;
      const snapshot = withLifeProgress(courseProgress, fresh);
      await context.saveProgress(snapshot); courseProgress = snapshot; state = fresh; screen = 'map'; render();
    }));
    header.append(tools); return header;
  }
  function renderMap() {
    main.append(heading());
    const resume = current(), resumeIndex = lifeLessons.indexOf(resume);
    if (lifeLessonUnlocked(lifeLessons, state, resumeIndex)) main.append(actionButton(`继续第 ${resume.sourceLesson} 课 · ${resume.title}`, () => open(resume), 'primary-btn'));
    for (const stage of lifeStages) {
      const section = element('section', null, 'life-stage');
      section.append(element('h2', stage.title), element('p', stage.description));
      const grid = element('div', null, 'life-grid');
      for (const lesson of lifeLessons.filter(item => item.stage === stage.id)) {
        const available = lifeLessonUnlocked(lifeLessons, state, lifeLessons.indexOf(lesson)), done = state.completed.includes(lesson.id);
        const card = actionButton(`${done ? '✓' : available ? '→' : '🔒'} ${lesson.sourceLesson}. ${lesson.title}`, () => open(lesson));
        card.append(element('small', `${lesson.scene} · ${lesson.vocabulary.length} 个目标词`));
        card.dataset.unavailable = String(!available); card.disabled = !available; grid.append(card);
      }
      section.append(grid); main.append(section);
    }
    const source = element('p', '词汇与语法等级参考你提供的第二册资料。全部讲解、例句、阅读和题目为本项目原创；没有复制教材正文、习题或插图。', 'life-source');
    for (const item of lifeSources) { const link = element('a', ` ${item.title}`); link.href = item.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; source.append(link); }
    main.append(source, element('p', '原书语法有循环复习，本课程按基础→衔接→解释→综合递进。新路线不要求先通关漫画城；新课之间循序解锁。课文提供文字学习，不附教材录音，原有离线音频保持可用。', 'life-note'));
  }
  async function open(lesson) {
    if (!lifeLessonUnlocked(lifeLessons, state, lifeLessons.indexOf(lesson))) return;
    state.currentLessonId = lesson.id; await persist(); screen = 'lesson'; render(); main.scrollIntoView({ block: 'start' });
  }
  function renderStudy(lesson, value) {
    const study = element(value.read ? 'details' : 'section', null, 'life-panel');
    if (value.read) study.append(element('summary', '复习本课讲解、例句与词表'));
    study.append(element('h2', lesson.grammar.title), element('p', lesson.grammar.explanation));
    for (const example of lesson.grammar.examples) study.append(element('p', example.en, 'life-passage'), element('p', example.zh, 'life-note'));
    study.append(element('h3', '放进生活里的目标词'));
    const words = element('div', null, 'life-vocabulary');
    for (const word of lesson.vocabulary) { const card = element('article', null, 'life-word'); card.append(element('strong', word.word), element('span', word.meaning), element('p', word.example), element('p', word.exampleZh, 'life-note')); words.append(card); }
    study.append(words, element('h3', '生活阅读'), element('p', lesson.passage.en, 'life-passage'));
    const translation = element('details'); translation.append(element('summary', '查看中文理解'), element('p', lesson.passage.zh)); study.append(translation);
    study.append(element('p', `参考资料：第 ${lesson.sourceLesson} 课词汇/语法，PDF 第 ${lesson.sourcePages.join('、')} 页。下方内容和题目均为原创。`, 'life-source'));
    if (!value.read) study.append(actionButton('我已学完讲解和目标词，开始练习', async () => { value.read = true; await persist(); render(); }, 'primary-btn'));
    main.append(study);
  }
  function questionField(question, answer, onAnswer) {
    const field = element('fieldset', null, 'life-question life-answer'); field.dataset.questionId = question.id;
    field.append(element('legend', question.prompt));
    if (question.picture) { const picture = element('div', null, 'life-picture'); picture.setAttribute('role', 'img'); picture.setAttribute('aria-label', question.picture.description); picture.innerHTML = question.picture.svg; field.append(picture); }
    if (question.masked) field.append(element('p', question.masked, 'life-masked'));
    if (question.options) {
      for (const option of vocabularyShuffle(question.options, question.id)) {
        const label = element('label', null, 'life-choice'), input = element('input'); input.type = 'radio'; input.name = question.id; input.value = option; input.checked = answer === option;
        input.addEventListener('change', () => onAnswer(option)); label.append(input, document.createTextNode(option)); field.append(label);
      }
    } else {
      if (question.tokens) field.append(element('p', `词语：${vocabularyShuffle(question.tokens, question.id).join(' / ')}`, 'life-note'));
      const input = element('input'); input.type = 'text'; input.value = Array.isArray(answer) ? answer.join(' ') : answer ?? ''; input.autocomplete = 'off'; input.spellcheck = false;
      input.setAttribute('aria-label', question.kind === 'missing' ? '从左到右输入缺少的字母' : '输入你的答案');
      input.addEventListener('input', () => onAnswer(input.value)); field.append(input);
    }
    const feedback = element('p', '', 'life-feedback'); feedback.setAttribute('aria-live', 'polite'); field.append(feedback);
    return { field, feedback };
  }
  function renderMainQuestions(lesson, value) {
    main.append(element('h2', '生活练习'), element('p', '可以回看讲解。答错会给出解释，修改后再提交；这一步通过后还有本课词测。', 'life-note'));
    const fields = new Map();
    for (const question of lesson.questions) {
      const widget = questionField(question, value.answers[question.id], answer => { value.answers[question.id] = answer; widget.feedback.textContent = ''; schedule(); });
      fields.set(question.id, widget); main.append(widget.field);
    }
    main.append(actionButton('检查练习', async () => {
      const { entry: next, result } = submitLifeMain(lesson, value); Object.assign(value, next);
      await persist();
      if (result.passed) render();
      else for (const check of result.checks) { const widget = fields.get(check.id); widget.feedback.textContent = check.passed ? '✓ 正确' : `还需要修改。${check.explanation}\n参考：${check.expected}`; widget.feedback.classList.toggle('correct', check.passed); }
    }, 'primary-btn'));
  }
  function renderVocabulary(lesson, value) {
    const check = lesson.vocabularyCheck, wordState = value.vocabulary;
    main.append(element('h2', '课后单词测试'), element('p', `练习已通过。本课 ${check.words.length} 个目标词都会覆盖；分题完成，离开后可继续。`, 'life-note'));
    if (!wordState.studied) {
      const recap = element('section', null, 'life-panel'); recap.append(element('h3', '测前快速复习'));
      for (const word of check.words) recap.append(element('p', `${word.word} · ${word.meaning}${word.note ? `（${word.note}）` : ''}`));
      recap.append(actionButton('复习好了，开始词测', async () => { wordState.studied = true; await persist(); render(); }, 'primary-btn')); main.append(recap); return;
    }
    const question = check.questions.find(item => item.id === wordState.review) ?? check.questions.find(item => !wordState.cleared.includes(item.id));
    if (!question) { renderDone(lesson); return; }
    main.append(element('p', `已答对 ${wordState.cleared.length} / ${check.questions.length} 题`));
    let answer = wordState.answers[question.id] ?? '';
    const widget = questionField(question, answer, value => { answer = value; wordState.answers[question.id] = value; widget.feedback.textContent = ''; schedule(); }); main.append(widget.field);
    const explainRetry = () => `再试一次。${question.explanation}\n${question.kind === 'missing' ? `缺少的字母：${question.answer}` : `正确答案：${question.answer}`}`;
    if (wordState.review === question.id) widget.feedback.textContent = explainRetry();
    main.append(actionButton('检查单词', async () => {
      if (!String(answer).trim()) { widget.feedback.textContent = question.options ? '请先选择一个答案。' : '请先填写答案。'; return; }
      const { entry: next, correct } = submitLifeVocabulary(lesson, value, question.id, answer); Object.assign(wordState, next.vocabulary);
      await persist();
      if (correct) { status.textContent = '✓ 正确，进度已保存。'; render(); }
      else { widget.feedback.textContent = explainRetry(); }
    }, 'primary-btn'));
  }
  function renderDone(lesson) {
    const done = element('section', null, 'life-summary'); done.append(element('h2', '✓ 本课学习、练习和词测都完成了'), element('p', '可以重温讲解和错题，也可以继续下一课。重复学习不会重复增加完成数。'));
    const next = lifeLessons[lifeLessons.indexOf(lesson) + 1];
    if (next) done.append(actionButton(`继续第 ${next.sourceLesson} 课`, () => open(next), 'primary-btn'));
    done.append(actionButton('复习词测（保留完成记录）', async () => { screen = 'review'; render(); })); main.append(done);
  }
  function renderReview(lesson, value) {
    main.append(element('h2', '本课词测复盘'));
    for (const question of lesson.vocabularyCheck.questions) {
      const mistakes = value.vocabulary.mistakes[question.id] ?? 0;
      const row = element('section', null, 'life-panel'); row.append(element('p', question.kind === 'picture' ? '看图识词' : question.prompt), element('p', `答案：${question.answer}。${question.explanation}`), element('p', mistakes ? `此前需要修改 ${mistakes} 次，建议再读目标词例句。` : '已掌握', 'life-note')); main.append(row);
    }
    main.append(actionButton('回到本课', async () => { screen = 'lesson'; render(); }));
  }
  function render() {
    if (disposed) return;
    main.replaceChildren();
    if (screen === 'map') renderMap();
    else {
      const lesson = current(), value = entry(lesson);
      main.append(heading(), element('h2', `${lesson.sourceLesson}. ${lesson.title}`), element('p', `${lesson.scene} · ${lesson.goal}`, 'life-note'));
      if (screen === 'review') renderReview(lesson, value);
      else { renderStudy(lesson, value); if (value.read) { if (!value.mainPassed) renderMainQuestions(lesson, value); else if (value.vocabulary.completed) renderDone(lesson); else renderVocabulary(lesson, value); } }
    }
    updateBusy();
  }
  render();
  return { async flush() { if (busy) throw new Error('请等待当前保存完成。'); await persist(); }, dispose() { disposed = true; clearTimeout(timer); root.replaceChildren(); } };
}

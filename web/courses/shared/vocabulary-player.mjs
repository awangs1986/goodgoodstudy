import { buildVocabularyCheck, normalizeVocabularyState, applyVocabularyAnswer, vocabularyPassed } from './vocabulary-checks.mjs';

const element = (tag, text, className) => { const node = document.createElement(tag); if (text != null) node.textContent = text; if (className) node.className = className; return node; };
const button = (text, action, className = 'soft-btn') => { const node = element('button', text, className); node.type = 'button'; node.addEventListener('click', action); return node; };
const ACCENTS = ['é', 'è', 'ê', 'ë', 'à', 'â', 'ç', 'î', 'ï', 'ô', 'ù', 'û', 'ü', 'œ'];

/** Mount a separate post-lesson checkpoint without replacing any main-lesson responses.
 * ui: {lesson, body, root, state, busy, setBusy, save, progress.persist, record, report, notify}
 * Call finishMain(score) instead of ui.record(true, score), and dispose on lesson exit.
 * The main task is saved immediately. Only the final vocabulary-completion button records success.
 */
export function createVocabularyCheck(ui, config) {
  const check = buildVocabularyCheck({ lesson: ui.lesson, ...config });
  ui.state.languageVocabulary ??= {};
  let state = normalizeVocabularyState(check, ui.state.languageVocabulary[ui.lesson.id], ui.state.completed.includes(ui.lesson.id));
  const section = element('section', null, 'language-vocabulary'); section.setAttribute('aria-label', '课后单词测试');
  let mounted = false, disposed = false;
  const store = () => { ui.state.languageVocabulary[ui.lesson.id] = state; };
  store();
  const commit = async action => {
    if (ui.busy || disposed) return;
    ui.setBusy(true);
    try { await action(); store(); await ui.progress.persist(); }
    catch (error) { ui.report(error); }
    finally {
      ui.setBusy(false);
      if (!disposed) { render(); focusCurrent(); }
    }
  };
  function focusCurrent() {
    if (ui.root.querySelector('dialog[open]')) return;
    const target = section.querySelector('legend') ?? section.querySelector('h4') ?? section.querySelector('h3');
    if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); }
  }
  function wordList(target, items = check.words) {
    const list = element('ul', null, 'vocabulary-recap');
    for (const item of items) {
      const row = element('li'), word = element('strong', item.word); word.lang = check.language;
      row.append(word, element('span', item.meaning));
      if (item.note) row.append(element('small', item.note));
      if (item.context) { const context = element('p', item.context.sentence, 'vocabulary-example'); context.lang = check.language; row.append(context); }
      list.append(row);
    }
    target.append(list);
  }
  function render() {
    section.replaceChildren(element('h3', '课后单词测试'));
    const introduction = element('p', '本课完成条件：先修好主课画格，再复习本课词语并答对单词测试。主课答案和已答对的测试题都会保存。', 'vocabulary-instructions');
    section.append(introduction);
    if (ui.state.completed.includes(ui.lesson.id)) section.append(element('p', '本课已有完成记录，会一直保留；这里可以补做或复习单词。', 'vocabulary-legacy-note'));
    if (!state.mainPassed) { section.append(element('p', '完成上方主课后，在这里进行单词复习和测试。', 'vocabulary-locked')); return; }
    if (!state.studied) {
      section.append(element('h4', '先复习，再开始'), element('p', check.fallback ? '本节也复习以下同章词语。先看清词义与拼写，接下来只考这些词。' : '以下词语都来自本课。先看清词义与拼写，接下来只考这些词。'));
      if (check.language === 'fr') section.append(element('p', '法语重音符号也是拼写的一部分。冠词、已标明的阴阳性和复数形式一起学习；补字题会把冠词保留。'));
      wordList(section);
      section.append(button('我复习好了，开始单词测试', () => commit(() => { state.studied = true; }), 'primary-btn'));
      return;
    }
    const passed = vocabularyPassed(check, state);
    section.append(element('p', `已答对 ${state.cleared.length} / ${check.questions.length} 题${passed ? ' · 单词测试通过' : ''}`, 'vocabulary-progress'));
    if (passed) {
      section.append(element('p', '看词义、拼写和场景都练习好了。主课答复已保留。', 'question-feedback correct'));
      const mistaken = check.words.filter(item => check.questions.some(q => q.word === item.word && state.mistakes[q.id]));
      if (mistaken.length) { section.append(element('h4', '本次错词回顾'), element('p', '这些词已重试答对，再看一遍加深记忆。')); wordList(section, mistaken); }
      const recorded = state.completed && ui.state.completed.includes(ui.lesson.id);
      if (!recorded) section.append(button('完成本课并收录漫画', () => commit(async () => {
        if (!vocabularyPassed(check, state)) return;
        state.completed = true; store(); await ui.progress.persist();
        if (!ui.state.completed.includes(ui.lesson.id)) await ui.record(true, state.mainScore);
        else ui.notify('单词测试已通过，原有完成记录保持不变。');
      }), 'primary-btn'));
      else section.append(element('p', '✓ 本课与课后单词测试已完成。', 'vocabulary-completed'));
      section.append(button('再练一次单词（保留主课与完成记录）', () => commit(() => { state.studied = false; state.answers = {}; state.cleared = []; state.mistakes = {}; state.review = ''; })));
      return;
    }
    const question = check.questions.find(q => q.id === state.review) ?? check.questions.find(q => !state.cleared.includes(q.id));
    const field = element('fieldset', null, 'vocabulary-question'); field.dataset.vocabularyQuestion = question.id;
    field.append(element('legend', question.prompt));
    if (question.kind === 'picture') {
      const figure = element('figure', null, 'vocabulary-picture'); figure.innerHTML = question.picture.svg;
      figure.setAttribute('role', 'img'); figure.setAttribute('aria-label', question.picture.description);
      // No answer, translation, audio, or source scene is part of this figure's accessible name.
      field.append(figure);
      const description = element('details'); description.append(element('summary', '图片的视觉描述'), element('p', question.picture.description)); field.append(description);
    }
    if (question.masked) { const masked = element('p', question.masked, 'vocabulary-masked'); masked.lang = check.language; field.append(masked); }
    let input;
    const saveAnswer = answer => { if (ui.busy || state.review) return; state.answers[question.id] = answer; store(); ui.save(); };
    if (question.options) {
      for (const option of question.options) {
        const label = element('label', null, 'french-choice'), radio = element('input'); radio.type = 'radio'; radio.name = question.id; radio.value = option; radio.checked = state.answers[question.id] === option;
        radio.addEventListener('change', () => saveAnswer(option)); label.append(radio, element('span', option)); field.append(label);
      }
    } else {
      const label = element('label', '缺少的字母（从左到右）'), id = `${check.lessonId}-vocabulary-letters`;
      input = element('input', null, 'vocabulary-input'); input.id = id; input.type = 'text'; input.lang = check.language; input.autocomplete = 'off'; input.spellcheck = false; input.value = state.answers[question.id] ?? ''; label.htmlFor = id;
      input.addEventListener('input', () => saveAnswer(input.value)); field.append(label, input);
      if (check.language === 'fr') {
        const keys = element('div', null, 'accent-keys');
        for (const char of ACCENTS) { const key = button(char, () => { const start = input.selectionStart ?? input.value.length, end = input.selectionEnd ?? start; input.setRangeText(char, start, end, 'end'); saveAnswer(input.value); input.focus(); }); key.setAttribute('aria-label', `插入 ${char}`); keys.append(key); }
        field.append(keys);
      }
    }
    field.disabled = Boolean(state.review) || ui.busy; section.append(field);
    const status = element('div', null, 'vocabulary-feedback'); status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
    if (state.review) {
      status.append(element('p', '这题还需要再练一次。'), element('p', question.explanation));
      if (question.kind === 'missing') status.append(element('p', `缺少的字母依次是：${question.answer}。完整拼写：${question.word}。`));
      section.append(status, button('看懂了，再试一次', () => commit(() => { delete state.answers[question.id]; state.review = ''; }), 'primary-btn'));
    } else {
      section.append(status, button('检查这个答案', () => {
        const answer = state.answers[question.id];
        if (typeof answer !== 'string' || !answer.trim()) { status.textContent = '请先选择答案或填写缺少的字母。'; input?.focus(); return; }
        return commit(() => { state = applyVocabularyAnswer(check, state, question.id, answer).state; });
      }, 'primary-btn'));
    }
    section.append(button('返回词语复习（保留已答对的题）', () => commit(() => { state.studied = false; })));
  }
  const syncBusy = () => {
    section.querySelectorAll('fieldset.vocabulary-question').forEach(node => { node.disabled = ui.busy || Boolean(state.review); });
    section.querySelectorAll('button, input').forEach(node => { node.disabled = ui.busy || (Boolean(state.review) && Boolean(node.closest('.vocabulary-question'))); });
  };
  ui.root.addEventListener('course-busy-change', syncBusy);
  return {
    check,
    get mainPassed() { return state.mainPassed; },
    mount() { if (!mounted) { mounted = true; ui.body.append(section); render(); } },
    async finishMain(score = 100) {
      state.mainPassed = true; state.mainScore = score; store(); await ui.progress.persist();
      if (!disposed) { render(); focusCurrent(); section.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
    },
    dispose() { disposed = true; ui.root.removeEventListener('course-busy-change', syncBusy); }
  };
}

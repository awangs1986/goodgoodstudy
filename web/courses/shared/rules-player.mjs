import './rules.css';
import { createProgress, unlocked } from './progress.mjs';
import { gradeChoice, shuffled } from './rules-course.mjs';

const el = (tag, text, className) => { const n = document.createElement(tag); if (text != null) n.textContent = text; if (className) n.className = className; return n; };
const btn = (text, action, className = 'rc-btn') => { const n = el('button', text, className); n.type = 'button'; n.addEventListener('click', action); return n; };
const reducedMotion = () => globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
// Diagrams are bundled, trusted SVG strings authored in this repo (never user/save data).
function figure(d, className = 'rc-figure') {
  const fig = el('figure', null, className); fig.innerHTML = d.svg; if (d.anim) fig.dataset.anim = d.anim;
  const svg = fig.querySelector('svg');
  if (svg?.classList.contains('animated')) {
    fig.classList.add('has-anim');
    const toggle = btn('⏸ 暂停动画', () => { if (svg.animationsPaused()) { svg.unpauseAnimations(); toggle.textContent = '⏸ 暂停动画'; } else { svg.pauseAnimations(); toggle.textContent = '▶ 播放动画'; } }, 'rc-btn ghost rc-anim-toggle');
    if (reducedMotion()) { queueMicrotask(() => { try { svg.pauseAnimations(); svg.setCurrentTime(0); } catch {} }); toggle.textContent = '▶ 播放动画'; fig.classList.add('reduced'); }
    fig.append(toggle);
  }
  if (d.cap) fig.append(el('figcaption', d.cap));
  return fig;
}

export function mountRulesCourse(cfg) {
  const { key, chapters, lessons, credits } = cfg;
  return async function mount(root, context) {
    root.innerHTML = `<section class="rules-course theme-${key}"><header class="rc-header"><div><p class="rc-eyebrow"></p><h1></h1><p class="rc-sub"></p></div>
      <div class="rc-meter-wrap"><div class="rc-meter" role="progressbar" aria-label="课程进度" aria-valuemin="0" aria-valuemax="100"><span></span></div><span class="rc-meter-label"></span>
      <button type="button" class="rc-btn ghost rc-credits-btn">规则来源与版权</button></div></header>
      <div class="rc-layout"><nav class="rc-nav" aria-label="课程单元"></nav><main class="rc-main"></main></div></section>`;
    const $ = s => root.querySelector(s);
    $('.rc-eyebrow').textContent = cfg.eyebrow; $('h1').textContent = cfg.title; $('.rc-sub').textContent = `${chapters.length} 个单元 · ${lessons.length} 关 · ${cfg.sub}`;
    const status = el('p', '', 'rc-status'); status.setAttribute('role', 'status');
    const report = error => { status.textContent = error.message; status.classList.add('error'); };
    const progress = createProgress(context, lessons, report);
    const state = () => progress.state;
    const current = () => lessons.find(l => l.id === state().currentLessonId) ?? lessons[0];
    const record = lesson => { const v = state().responses[lesson.id]; const safe = v && typeof v === 'object' && !Array.isArray(v) ? v : {}; safe.answers = safe.answers && typeof safe.answers === 'object' ? safe.answers : {}; state().responses[lesson.id] = safe; return safe; };
    let busy = false, nextButton;

    function renderHeader() {
      const percent = Math.round(state().completed.length / lessons.length * 100);
      $('.rc-meter').setAttribute('aria-valuenow', String(percent)); $('.rc-meter > span').style.width = `${percent}%`;
      $('.rc-meter-label').textContent = `已完成 ${state().completed.length} / ${lessons.length}`;
      const nodes = chapters.map((chapter, ci) => {
        const group = el('section', null, 'rc-nav-unit'), done = chapter.lessons.filter(l => state().completed.includes(l.id)).length;
        group.append(el('h3', `${chapter.icon ?? ''} ${ci + 1}. ${chapter.title}`), el('small', `${done}/${chapter.lessons.length}`));
        for (const lesson of chapter.lessons) {
          const index = lessons.indexOf(lesson), open = unlocked(lessons, state(), index), complete = state().completed.includes(lesson.id);
          const item = btn(`${complete ? '✓' : open ? (lesson.kind === 'exam' ? '✎' : '○') : '🔒'} ${lesson.kind === 'exam' ? '单元测试' : lesson.title}`, () => go(index), 'rc-nav-item');
          item.dataset.lessonId = lesson.id; item.disabled = !open; item.classList.toggle('active', lesson === current()); item.classList.toggle('done', complete); group.append(item);
        }
        return group;
      });
      $('.rc-nav').replaceChildren(...nodes);
    }
    function renderTeach(lesson, main, saved, onRead) {
      const t = lesson.teach, teach = el('section', null, 'rc-step rc-teach'); teach.dataset.step = 'teach';
      teach.append(el('p', '第 1 步 · 先学规则', 'rc-step-label'));
      if (t.ref) teach.append(el('span', `📖 ${t.ref}`, 'rc-ref'));
      const hook = el('div', null, 'rc-box rc-hook'); hook.append(el('strong', cfg.hookLabel ?? '🏟 现场'), el('p', t.hook)); teach.append(hook);
      const rule = el('div', null, 'rc-box rc-rule'); rule.append(el('strong', '📘 规则怎么说')); const ul = el('ul'); t.rule.forEach(r => ul.append(el('li', r))); rule.append(ul); teach.append(rule);
      const figs = el('div', null, 'rc-figs'); t.diagrams.forEach(d => figs.append(figure(d))); teach.append(figs);
      const why = el('div', null, 'rc-box rc-why'); why.append(el('strong', '🤔 为什么要有这条规则'), el('p', t.why)); teach.append(why);
      const sc = el('div', null, 'rc-box rc-scenario'); sc.append(el('strong', '🎬 比赛里真的会这样'), el('p', t.scenario)); teach.append(sc);
      if (t.caution) { const c = el('div', null, 'rc-box rc-caution'); c.append(el('strong', '⚠️ 说明'), el('p', t.caution)); teach.append(c); }
      const finish = btn(saved.read ? '✓ 讲解已读完，测验已解锁' : '我已读完讲解，开始测验 →', () => { if (busy) return; saved.read = true; progress.schedule(); finish.disabled = true; finish.textContent = '✓ 讲解已读完，测验已解锁'; onRead(); }, 'rc-btn primary rc-finish-teach');
      finish.disabled = Boolean(saved.read); teach.append(finish); main.append(teach);
    }
    function renderQuiz(lesson, main, saved) {
      const exam = lesson.kind === 'exam', quiz = el('section', null, `rc-step rc-quiz${saved.read || exam ? '' : ' locked'}`); quiz.dataset.step = 'quiz';
      quiz.append(el('p', exam ? '单元测试 · 你来当裁判' : '第 2 步 · 情景测验', 'rc-step-label'));
      if (!exam && !saved.read) { quiz.append(el('p', '🔒 先读完上面的规则讲解，再来当裁判。', 'rc-locked-note')); main.append(quiz); return; }
      const checks = [];
      lesson.questions.forEach((question, index) => {
        const field = el('fieldset', null, 'rc-question'); field.dataset.questionId = question.id;
        const legend = el('legend'); legend.append(el('span', String(index + 1), 'rc-qnum'), el('span', question.prompt)); field.append(legend);
        if (question.svg) field.append(figure({ svg: question.svg }, 'rc-figure rc-qfig'));
        const feedback = el('div', null, 'rc-feedback'); feedback.setAttribute('aria-live', 'polite');
        const save = value => { saved.answers[question.id] = value; progress.schedule(); feedback.replaceChildren(); field.classList.remove('right', 'wrong'); };
        const opts = el('div', null, 'rc-options');
        for (const option of shuffled(question.options, question.id)) { const label = el('label', null, 'rc-choice'), input = el('input'); input.type = 'radio'; input.name = question.id; input.value = option; input.checked = saved.answers[question.id] === option; input.addEventListener('change', () => save(option)); label.append(input, el('span', option)); opts.append(label); }
        field.append(opts);
        if (!exam && question.hint) { const hint = el('p', `💡 提示：${question.hint}`, 'rc-hint-text'); hint.hidden = true; const hb = btn('💡 给我一点提示', () => { hint.hidden = false; hb.hidden = true; state().hints[lesson.id] = (Number(state().hints[lesson.id]) || 0) + 1; progress.schedule(); }, 'rc-btn ghost rc-hint-btn'); field.append(hb, hint); }
        field.append(feedback); quiz.append(field);
        checks.push(() => { const ok = gradeChoice(question, saved.answers[question.id]); field.classList.toggle('right', ok); field.classList.toggle('wrong', !ok);
          feedback.replaceChildren(el('p', ok ? `✓ 判罚正确！${question.explanation}` : (exam ? '✗ 这题判错了。' : '✗ 判罚不对，再想一想。'), 'rc-verdict'));
          if (!ok && !exam) feedback.append(el('p', `📖 讲解：${question.explanation}`, 'rc-explain')); return ok; });
      });
      const summary = el('p', null, 'rc-summary'); summary.setAttribute('role', 'status');
      const submit = btn(exam ? '提交单元测试' : '提交测验', async () => {
        if (busy) return;
        const results = checks.map(c => c()), right = results.filter(Boolean).length;
        saved.attempts = (Number(saved.attempts) || 0) + 1; state().attempts[lesson.id] = saved.attempts;
        state().scores[lesson.id] = Math.max(Number(state().scores[lesson.id]) || 0, Math.round(right / results.length * 100));
        if (right === results.length) { if (!state().completed.includes(lesson.id)) state().completed.push(lesson.id); summary.textContent = `全部判对（${right}/${results.length}）！${exam ? '本单元完成。' : '下一关已解锁。'}`; summary.className = 'rc-summary pass'; }
        else { summary.textContent = `判对 ${right}/${results.length}，${exam ? '回到本单元的讲解复习一下，再来挑战。' : '看看提示和讲解，改正后再提交。'}`; summary.className = 'rc-summary retry'; }
        busy = true; try { await progress.persist(); } catch (e) { report(e); } finally { busy = false; }
        renderHeader(); updateFooter();
      }, 'rc-btn primary rc-submit');
      quiz.append(submit, summary); main.append(quiz);
    }
    function updateFooter() { const index = lessons.indexOf(current()); if (nextButton) nextButton.disabled = !unlocked(lessons, state(), index + 1); }
    function render() {
      const lesson = current(), chapter = chapters[lesson.chapterIndex], main = $('.rc-main'), saved = record(lesson);
      main.replaceChildren(status, el('p', `${chapter.icon ?? ''} 第 ${lesson.chapterIndex + 1} 单元 · ${chapter.title}`, 'rc-topic'), el('h2', lesson.title));
      if (lesson.kind === 'exam') {
        const recap = el('section', null, 'rc-step rc-recap'); recap.append(el('p', '单元回顾', 'rc-step-label'), el('p', '本单元学过：'));
        const list = el('ul'); lesson.recap.forEach(r => list.append(el('li', `📘 ${r}`))); recap.append(list, el('p', '测试不给提示，全部判对才算完成本单元。', 'rc-note')); main.append(recap); renderQuiz(lesson, main, saved);
      } else { const slot = el('div'); renderTeach(lesson, main, saved, () => { slot.replaceChildren(); renderQuiz(lesson, slot, saved); slot.querySelector('.rc-quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }); main.append(slot); renderQuiz(lesson, slot, saved); }
      const footer = el('footer', null, 'rc-footer'), index = lessons.indexOf(lesson);
      const prev = btn('← 上一关', () => go(index - 1)); prev.disabled = index === 0;
      nextButton = btn('下一关 →', () => go(index + 1), 'rc-btn primary'); footer.append(prev, nextButton); main.append(footer);
      renderHeader(); updateFooter();
    }
    async function go(index) {
      if (busy || !lessons[index] || !unlocked(lessons, state(), index)) return;
      busy = true;
      try { state().currentLessonId = lessons[index].id; state().started = true; state().mapChapter = lessons[index].chapterIndex; await progress.persist(); } catch (e) { report(e); } finally { busy = false; }
      render(); $('.rc-main').scrollIntoView({ block: 'start' });
    }
    $('.rc-credits-btn').addEventListener('click', () => {
      const dialog = el('dialog', null, 'rc-dialog'); dialog.append(el('h2', '规则来源与版权'));
      credits.paragraphs.forEach(p => dialog.append(el('p', p)));
      const list = el('ul'); for (const src of credits.sources) { const li = el('li'), a = el('a', src.title); a.href = src.url; a.target = '_blank'; a.rel = 'noopener'; li.append(a, document.createTextNode(` · ${src.version}`)); list.append(li); }
      dialog.append(list, btn('关闭', () => dialog.close(), 'rc-btn primary'));
      dialog.addEventListener('close', () => dialog.remove()); $('.rules-course').append(dialog); dialog.showModal();
    });
    render();
    return { async flush() { if (busy) throw new Error('请等待当前操作完成后再切换课程。'); await progress.flush(); }, dispose() { progress.dispose(); root.replaceChildren(); } };
  };
}

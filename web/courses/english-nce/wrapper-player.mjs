import { mount as mountOriginal } from './player.mjs';
import { element, button } from '../shared/player.mjs';
import './life.css';

/** One English course and one backup, with independent original and life-practice tracks. */
export async function mount(root, context) {
  let progress = structuredClone(context.progress ?? null);
  let active, disposed = false, switching = false;
  const wrapper = element('div', null, 'english-tracks');
  const nav = element('nav', null, 'english-track-nav'); nav.setAttribute('aria-label', '英语学习路线');
  const original = button('漫画城 · 基础课程', () => switchTrack(false));
  const life = button('第二册 · 生活运用', () => switchTrack(true));
  const status = element('p', '', 'english-track-status'); status.setAttribute('role', 'status');
  const body = element('div'); nav.append(original, life); wrapper.append(nav, status, body); root.replaceChildren(wrapper);
  const childContext = () => ({ ...context, progress, async saveProgress(value) {
    await context.saveProgress(value);
    progress = structuredClone(value);
  } });
  async function switchTrack(useLife) {
    if (switching || disposed) return;
    switching = true; original.disabled = life.disabled = true;
    try {
      await active?.flush?.();
      const next = structuredClone(progress ?? { version: 1 });
      if (useLife || next.nce2Practice) next.nce2Practice = { ...(next.nce2Practice ?? { version: 1 }), active: useLife };
      // Persist the chosen route before disposing. A failed write leaves the current screen intact.
      if (active) { await context.saveProgress(next); progress = next; }
      else progress = next;
      const module = useLife ? await import('./life-player.mjs') : { mount: mountOriginal };
      if (disposed) return;
      active?.dispose?.();
      active = await module.mount(body, childContext());
      original.setAttribute('aria-current', useLife ? 'false' : 'page');
      life.setAttribute('aria-current', useLife ? 'page' : 'false');
      status.textContent = useLife ? '面向初高中 · 先学再练 · 课后词测 · 与漫画城分别保存进度' : '';
    } catch (error) { status.textContent = `切换失败：${error.message}`; }
    finally { switching = false; original.disabled = life.disabled = false; }
  }
  await switchTrack(progress?.nce2Practice?.active === true);
  return {
    async flush() { if (switching) throw new Error('请等待英语路线切换完成。'); await active?.flush?.(); },
    dispose() { disposed = true; active?.dispose?.(); root.replaceChildren(); }
  };
}

import { staticDiagram } from './rules-course.mjs';

const el = (tag, text, className) => { const n = document.createElement(tag); if (text != null) n.textContent = text; if (className) n.className = className; return n; };
const btn = (text, action, className) => { const n = el('button', text, className); n.type = 'button'; n.addEventListener('click', action); return n; };
const reducedMotion = () => globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
// Diagrams are bundled, trusted SVG strings authored in this repo (never user/save data).
export function figure(d, className = 'rc-figure') {
  const fig = el('figure', null, className); fig.innerHTML = d.svg; if (d.anim) fig.dataset.anim = d.anim;
  let svg = fig.querySelector('svg');
  // Wide technical diagrams need the full existing grid row; squeezing a whole
  // court or several cars into a 280px tile makes their annotations unreadable.
  const viewBox = svg?.getAttribute('viewBox')?.trim().split(/[\s,]+/).map(Number);
  if (svg?.dataset.layout === 'wide' || (viewBox?.length === 4 && viewBox[2] / viewBox[3] >= 1.6)) fig.classList.add('rc-figure-wide');
  if (svg?.classList.contains('animated')) {
    fig.classList.add('has-anim');
    const liveSvg = svg;
    let showingStill = false;
    const toggle = btn('⏸ 暂停动画', () => {
      if (showingStill) {
        svg.replaceWith(liveSvg); svg = liveSvg; showingStill = false;
        svg.setCurrentTime(0); svg.unpauseAnimations(); fig.classList.remove('reduced');
        toggle.textContent = '⏸ 暂停动画';
      } else if (svg.animationsPaused()) { svg.unpauseAnimations(); toggle.textContent = '⏸ 暂停动画'; }
      else { svg.pauseAnimations(); toggle.textContent = '▶ 播放动画'; }
    }, 'rc-btn ghost rc-anim-toggle');
    if (reducedMotion()) {
      // Time zero may be an entrance from outside the frame. Use the same clear
      // authored still as quizzes, then restore the original SVG on explicit play.
      const holder = el('div'); holder.innerHTML = staticDiagram(d.svg);
      const stillSvg = holder.querySelector('svg');
      svg.replaceWith(stillSvg); svg = stillSvg; showingStill = true;
      toggle.textContent = '▶ 播放动画'; fig.classList.add('reduced');
    }
    fig.append(toggle);
  }
  if (d.cap) fig.append(el('figcaption', d.cap));
  return fig;
}


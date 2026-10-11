import test from 'node:test';
import assert from 'node:assert/strict';
import { figure } from '../web/courses/shared/rules-figure.mjs';

// A small DOM double exercises the existing control's state transitions without
// pretending to test browser SMIL rendering or CSS layout.
class Node {
  constructor(tag, source = '') {
    this.tag = tag; this.source = source; this.children = []; this.dataset = {};
    this.listeners = {}; this.className = ''; this.paused = false; this.time = null;
    this.classList = {
      contains: value => this.className.split(/\s+/).includes(value),
      add: value => { if (!this.classList.contains(value)) this.className += ` ${value}`; },
      remove: value => { this.className = this.className.split(/\s+/).filter(v => v !== value).join(' '); }
    };
    if (tag === 'svg') {
      this.className = this.getAttribute('class') ?? '';
      this.dataset.layout = this.getAttribute('data-layout');
    }
  }
  set innerHTML(source) { this.children = []; if (source.startsWith('<svg')) this.append(new Node('svg', source)); }
  getAttribute(name) { return this.source.match(new RegExp(`^<svg[^>]*\\s${name}="([^"]*)"`))?.[1] ?? null; }
  append(child) { child.parent = this; this.children.push(child); }
  querySelector(tag) { return this.children.find(child => child.tag === tag) ?? null; }
  replaceWith(child) { const p = this.parent; p.children[p.children.indexOf(this)] = child; child.parent = p; this.parent = null; }
  addEventListener(type, callback) { this.listeners[type] = callback; }
  click() { this.listeners.click(); }
  animationsPaused() { return this.paused; }
  pauseAnimations() { this.paused = true; }
  unpauseAnimations() { this.paused = false; }
  setCurrentTime(time) { this.time = time; }
}

const source = '<svg class="rc-svg animated" viewBox="0 0 640 300"><g data-static-transform="translate(272 150)"><circle r="5"/><animateTransform attributeName="transform" values="-40 150;480 150"/></g></svg>';
function withDOM(reduce, run) {
  const originalDocument = globalThis.document, originalMedia = globalThis.matchMedia;
  globalThis.document = { createElement: tag => new Node(tag) };
  globalThis.matchMedia = () => ({ matches: reduce });
  try { run(); } finally { globalThis.document = originalDocument; globalThis.matchMedia = originalMedia; }
}

test('reduced motion shows a readable still, then restores the original SVG only on play', () => withDOM(true, () => {
  const fig = figure({ svg: source, cap: 'A convoy' });
  const still = fig.querySelector('svg'), control = fig.querySelector('button');
  assert.match(still.source, /transform="translate\(272 150\)" data-static-frame="true"/);
  assert.doesNotMatch(still.source, /<animate/);
  assert.equal(control.textContent, '▶ 播放动画');
  assert.ok(fig.classList.contains('rc-figure-wide'));
  assert.ok(fig.classList.contains('reduced'));
  control.click();
  const live = fig.querySelector('svg');
  assert.equal(live.source, source);
  assert.equal(live.time, 0);
  assert.equal(live.paused, false);
  assert.equal(control.textContent, '⏸ 暂停动画');
  assert.ok(!fig.classList.contains('reduced'));
  control.click(); assert.equal(live.paused, true); assert.equal(control.textContent, '▶ 播放动画');
  control.click(); assert.equal(live.paused, false); assert.equal(control.textContent, '⏸ 暂停动画');
}));

test('normal motion keeps the original animation and the existing pause/resume behavior', () => withDOM(false, () => {
  const fig = figure({ svg: source });
  const svg = fig.querySelector('svg'), control = fig.querySelector('button');
  assert.equal(svg.source, source);
  assert.ok(!fig.classList.contains('reduced'));
  control.click(); assert.equal(svg.paused, true);
  control.click(); assert.equal(svg.paused, false);
}));

test('static artwork has no animation button; tall courts can request a full row', () => withDOM(true, () => {
  const fig = figure({ svg: '<svg class="rc-svg" data-layout="wide" viewBox="0 0 360 460"></svg>' });
  assert.equal(fig.querySelector('button'), null);
  assert.ok(fig.classList.contains('rc-figure-wide'));
  assert.ok(!fig.classList.contains('has-anim'));
}));

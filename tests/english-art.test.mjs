import test from 'node:test';
import assert from 'node:assert/strict';
import { comicPanel, places, castNames, propNames, propsFor } from '../web/courses/english-nce/art.mjs';
import { props } from '../web/courses/english-nce/comic-props.mjs';
import { basePlaces, baseCast, baseProps, createComicKit } from '../web/courses/shared/comic-kit.mjs';
import { lessons } from '../web/courses/english-nce/course.mjs';

const oldKit = createComicKit();
test('English redraw covers all original places, characters and props without changing vocabulary matching', () => {
  assert.deepEqual(Object.keys(places), Object.keys(basePlaces));
  assert.deepEqual(Object.keys(castNames), Object.keys(baseCast));
  assert.deepEqual(propNames, Object.keys(baseProps));
  assert.equal(propNames.length, 53);
  for (const name of propNames) {
    assert.equal(props[name][0], baseProps[name][0], name);
    assert.notEqual(props[name][1](), baseProps[name][1](), `${name} has its own drawing`);
  }
  for (const lesson of lessons) for (const q of lesson.questions) {
    const sentence = [q.prompt, ...q.answers, q.transcript, q.passage, ...(q.options ?? [])].filter(Boolean).join(' ');
    assert.deepEqual(propsFor(sentence), oldKit.propsFor(sentence), q.id);
  }
});
test('every English question uses the new art, retaining its place, people, props, caption and accessible label', () => {
  const ids = new Set();
  for (const lesson of lessons) for (const q of lesson.questions) {
    const svg = comicPanel(q.scene);
    assert.match(svg, /data-art-style="american-comic"/);
    assert.match(svg, /viewBox="0 0 400 250"/);
    assert.match(svg, /role="img" aria-label="/);
    assert.ok(svg.includes(`data-place="${q.scene.place}"`), q.id);
    assert.equal([...svg.matchAll(/data-prop="([^"]+)"/g)].length, q.scene.props.length, q.id);
    assert.deepEqual([...svg.matchAll(/data-prop="([^"]+)"/g)].map(match => match[1]), q.scene.props, q.id);
    assert.equal([...svg.matchAll(/data-character="([^"]+)"/g)].length, Math.min(q.scene.cast.length, q.scene.villain ? 2 : 3) + Number(q.scene.villain), q.id);
    assert.ok(svg.includes(q.scene.caption), q.id);
    assert.ok(!/undefined|NaN|<image|<filter|<script/.test(svg), q.id);
    assert.ok(svg.length < 40000, `${q.id}: ${svg.length} bytes`);
    for (const [, id] of svg.matchAll(/\bid="([^"]+)"/g)) {
      assert.ok(!ids.has(id), `duplicate ${id}`); ids.add(id);
    }
  }
});
test('English panels safely escape all display text and fall back for unknown scene keys', () => {
  const value = '<script>alert("x")</script> & test';
  const svg = comicPanel({ place: 'unknown', cast: ['unknown'], props: ['unknown'], bubble: value, caption: value, burst: value, label: value });
  assert.ok(!svg.includes('<script>'));
  assert.ok(svg.includes('&lt;script&gt;'));
  assert.ok(svg.includes('data-place="street"'));
  assert.ok(svg.includes('data-character="leo"'));
  assert.ok(!svg.includes('data-prop="unknown"'));
});
test('English art does not change the default shared/French renderer', () => {
  const scene = { place: 'street', cast: ['leo'], props: ['umbrella'], bubble: 'Hello!' };
  assert.ok(!oldKit.comicPanel(scene).includes('data-art-style="american-comic"'));
  assert.match(comicPanel(scene), /data-art-style="american-comic"/);
});

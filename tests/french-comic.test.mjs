import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { chapters, lessons } from '../web/courses/french-a1/course.mjs';
import { adventure } from '../web/courses/french-a1/adventure.mjs';
import { comicPanel, places, propsFor, castNames, propNames, illustrationUrl } from '../web/courses/french-a1/art.mjs';
import { comicPanel as englishPanel } from '../web/courses/english-nce/art.mjs';
import { normalizeProgress } from '../web/courses/shared/progress.mjs';
import { attachAdventure } from '../web/courses/shared/adventure.mjs';

const FRANCHISE = new RegExp('p\\u006fk[e\\u00e9]m\\u006fn|pik\\u0061chu|\\u5b9d\\u53ef\\u68a6|\\u5bf6\\u53ef\\u5922|\\u30dd\\u30b1\\u30e2\\u30f3|\\u5ba0\\u7269|\\u9053\\u9986', 'i');

test('every French question has its own Paris comic panel and every exam is a boss panel', () => {
  const used = new Set();
  for (const lesson of lessons) for (const q of lesson.questions) {
    assert.ok(places[q.scene.place], `${q.id} place ${q.scene.place}`);
    used.add(q.scene.place);
    const html = comicPanel(q.scene);
    assert.match(html, /^<div class="comic-panel fr-comic-panel"/);
    assert.ok(!/<svg|<image|<canvas/i.test(html), q.id);
    assert.match(html, /src="\.\/art\/french-illustrations\/places\/[^"/]+\.png"/);
    assert.equal([...html.matchAll(/class="fr-comic-background"/g)].length, 1, q.id);
    assert.deepEqual([...html.matchAll(/data-prop="([^"]+)"/g)].map(match => match[1]), q.scene.props, q.id);
    const people = [...html.matchAll(/data-character="([^"]+)"/g)].map(match => match[1]);
    assert.deepEqual(people, [...(q.scene.villain ? ['gribouille'] : []), ...q.scene.cast], q.id);
    assert.ok([...html.matchAll(/<img\b[^>]*>/g)].every(([img]) => /loading="lazy"/.test(img) && /alt=""/.test(img)), q.id);
  }
  for (const name of ['cafe', 'boulangerie', 'metro', 'marche', 'gare', 'pharmacie']) assert.ok(used.has(name), name);
  assert.ok(lessons.filter(l => l.key === 'exam').every(l => l.questions.every(q => q.scene.villain)));
  assert.ok(propsFor('Un croissant et un café, s’il vous plaît.').includes('croissant'));
  assert.ok(propsFor('Il fait froid, je prends mon manteau.').includes('coat'));
  assert.ok(englishPanel({}).includes('comic-panel'), 'English still renders through the shared kit');
});

test('French lesson ids are unchanged and old pet-era saves load cleanly', () => {
  assert.equal(lessons.length, 156);
  for (const id of ['fr01-01', 'fr01-12', 'fr08-12', 'fr-basics-exam', 'fr-health-drill']) assert.ok(lessons.some(l => l.id === id), id);
  const legacy = { version: 1, started: true, companionId: 'pet-7', currentLessonId: 'fr02-03', completed: ['fr01-01', 'fr01-02'], battles: { 'fr01-03': { cleared: ['fr01-v3'], stamina: 2 } } };
  const state = normalizeProgress(legacy, lessons);
  assert.deepEqual(state.completed, ['fr01-01', 'fr01-02']); assert.equal(state.currentLessonId, 'fr02-03');
  assert.deepEqual(state.battles['fr01-03'], { cleared: ['fr01-v3'], stamina: 2 });
  assert.equal('companionId' in state, false);
});

test('French adventure keeps map, quests and a boss per unit with no creature-collection wording', () => {
  adventure.prepare(chapters); attachAdventure(chapters, adventure);
  assert.equal(adventure.regions.length, chapters.length);
  for (const chapter of chapters) { assert.equal(chapter.adventure.quests.length, chapter.lessons.length); assert.equal(chapter.lessons.at(-1).adventure.boss, true); }
  assert.ok(!FRANCHISE.test(JSON.stringify(adventure)));
});

test('repository source ships no franchise names or retired French assets', () => {
  assert.equal(existsSync(new URL('../web/public/art/french-pets', import.meta.url)), false);
  const walk = dir => readdirSync(dir).flatMap(name => { const path = new URL(name, dir); return statSync(path).isDirectory() ? walk(new URL(`${name}/`, dir)) : [path]; });
  for (const file of [...walk(new URL('../web/courses/', import.meta.url)), new URL('../README.md', import.meta.url), new URL('../ARCHITECTURE.md', import.meta.url)]) {
    assert.ok(!FRANCHISE.test(readFileSync(file, 'utf8')), file.pathname);
  }
});


test('French question content and all 416 scene assignments are unchanged', () => {
  assert.equal(lessons.flatMap(lesson => lesson.questions).length, 416);
  // Captured before replacing the renderer: includes every lesson/question/answer/audio/scene field.
  assert.equal(createHash('sha256').update(JSON.stringify(lessons, (key, value) => key === 'adventure' ? undefined : value)).digest('hex'),
    '69b66bdf71259156bc3a8e5b7fa815c718b43dcfd47f9aa2e0c9806b82e261ee');
  for (const lesson of lessons) for (const question of lesson.questions) if (question.audio) {
    assert.equal(question.scene.bubble, '♪ Écoute…', question.id);
    const html = comicPanel(question.scene);
    assert.match(html, /class="fr-comic-bubble"[^>]*>♪ Écoute…<\/span>/);
    assert.ok(!html.includes(question.transcript), `${question.id}: transcript is not in the illustration`);
  }
});

const layers = (html, type) => [...html.matchAll(new RegExp(`<span class="fr-comic-${type}[^>]+>`, 'g'))]
  .map(([tag]) => Object.fromEntries([...tag.matchAll(/data-([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value])));
test('French PNG composition preserves cast slots, facing, scale, pose metadata and boss limits', () => {
  assert.equal(Object.keys(places).length, 12);
  assert.equal(Object.keys(castNames).length, 9);
  assert.equal(propNames.length, 58);
  const solo = layers(comicPanel({ cast: ['paul'], pose: 'hold', mood: 'worried' }), 'character');
  assert.deepEqual(solo.map(person => [person.character, person.x, person.y, person.scale, person.pose, person.mood, person.flip]),
    [['paul', '110', '236', '0.8', 'hold', 'worried', 'false']]);
  const duo = layers(comicPanel({ cast: ['hugo', 'lea'], pose: 'point' }), 'character');
  assert.deepEqual(duo.map(person => [person.character, person.x, person.pose, person.flip]),
    [['hugo', '90', 'point', 'false'], ['lea', '310', 'stand', 'true']]);
  const trio = layers(comicPanel({ cast: ['anne', 'zoe', 'paul', 'luc'] }), 'character');
  assert.deepEqual(trio.map(person => [person.character, person.x, person.flip]),
    [['anne', '70', 'false'], ['zoe', '200', 'false'], ['paul', '330', 'true']]);
  const boss = layers(comicPanel({ cast: ['lea', 'luc', 'hugo'], villain: true }), 'character');
  assert.deepEqual(boss.map(person => [person.character, person.x, person.scale, person.flip]),
    [['gribouille', '330', '0.95', 'false'], ['lea', '90', '1', 'false'], ['luc', '200', '1', 'false']]);
  assert.equal(layers(comicPanel({ cast: ['missing'] }), 'character')[0].character, 'lea');
  assert.match(comicPanel({ place: 'constructor', cast: ['constructor'], pose: 'constructor' }), /data-place="rue"/);
});

test('French PNG props keep exact floor, wall and pharmacy sky anchors', () => {
  for (const [cast, spots, scale] of [
    [['lea'], [['230', '222'], ['310', '222'], ['370', '222']], '1.5'],
    [['lea', 'hugo'], [['200', '224'], ['160', '230'], ['244', '230']], '1.2'],
    [['lea', 'hugo', 'marie'], [['135', '230'], ['265', '230'], ['380', '232']], '1.2']
  ]) {
    const items = layers(comicPanel({ cast, props: ['cup', 'book', 'apple', 'bread'] }), 'prop');
    assert.deepEqual(items.map(item => [item.x, item.y]), spots);
    assert.ok(items.every(item => item.scale === scale));
  }
  const mixed = layers(comicPanel({ cast: ['lea', 'hugo'], props: ['sun', 'calendar', 'cup'] }), 'prop');
  assert.deepEqual(mixed.map(item => [item.prop, item.x, item.y, item.scale, item.placement]),
    [['sun', '350', '98', '1.1', 'sky'], ['calendar', '200', '120', '1.1', 'wall'], ['cup', '200', '224', '1.2', 'floor']]);
  for (const prop of ['sun', 'rain', 'snow', 'plane']) {
    const item = layers(comicPanel({ place: 'pharmacie', props: [prop] }), 'prop')[0];
    assert.deepEqual([item.x, item.y, item.scale], ['300', '126', '0.85']);
  }
  assert.equal(layers(comicPanel({ props: ['unknown', 'cup', 'cup'] }), 'prop').length, 2, 'duplicate objects remain visible');
});

test('French HTML text is escaped and asset URLs respect root, subpath and offline deployments', () => {
  const payload = '<img src=x onerror="alert(1)"> & \'Paris\'';
  const html = comicPanel({ bubble: payload, caption: payload, burst: payload, label: payload, pose: payload, mood: payload });
  assert.ok(!html.includes('<img src=x'));
  assert.ok(!html.includes('onerror="'));
  assert.match(html, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt; &amp; &#39;Paris&#39;/);
  assert.ok(!/<svg|<script|<canvas|<link/i.test(html));
  assert.equal(illustrationUrl('places', 'cafe'), './art/french-illustrations/places/cafe.png');
  assert.equal(illustrationUrl('characters', 'lea', '/'), '/art/french-illustrations/characters/lea.png');
  assert.equal(illustrationUrl('props', 'cup', '/learn/'), '/learn/art/french-illustrations/props/cup.png');
  assert.equal(illustrationUrl('props', 'cup', './'), './art/french-illustrations/props/cup.png');
  assert.equal(illustrationUrl('props', 'cup', '/learn'), '/learn/art/french-illustrations/props/cup.png');
  assert.throws(() => illustrationUrl('props', '../secret'));
  assert.throws(() => illustrationUrl('characters', 'lea" onerror="bad'));
  const requested = [...comicPanel({ place: 'cafe', cast: ['lea'], props: ['cup'] }).matchAll(/src="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(requested, ['./art/french-illustrations/places/cafe.png', './art/french-illustrations/props/cup.png', './art/french-illustrations/characters/lea.png']);
});

test('French renderer is independent of the shared SVG kit and has no eager asset loader', () => {
  for (const filename of ['art.mjs', 'art-manifest.mjs']) {
    const source = readFileSync(new URL(`../web/courses/french-a1/${filename}`, import.meta.url), 'utf8');
    assert.ok(!/from ['"][^'"]*shared\/comic-kit|<svg|<canvas|new Image\s*\(|\bfetch\s*\(|rel=["']preload/.test(source), filename);
  }
  const css = readFileSync(new URL('../web/courses/french-a1/french.css', import.meta.url), 'utf8');
  assert.match(css, /aspect-ratio:8\/5/);
  assert.match(css, /container-type:inline-size/);
  assert.match(css, /data-flip=true/);
  assert.ok(!/url\(/.test(css), 'CSS does not fetch hidden/global art');
  assert.match(englishPanel({}), /^<svg class="comic-panel"/, 'English remains SVG');
});

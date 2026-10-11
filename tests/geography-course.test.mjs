import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import * as geo from '../web/courses/geography/course.mjs';
import manifest from '../web/courses/geography/manifest.mjs';
import { courses } from '../web/course-registry.mjs';
import { gradeChoice, shuffled } from '../web/courses/shared/rules-course.mjs';
import { normalizeProgress } from '../web/courses/shared/progress.mjs';
import { freshVoyage, normalizeVoyage, plan, neighbors, sellPrice, wind, SHIPS, goodById } from '../web/courses/geography/voyage.mjs';

test('geography: counts, stable explicit ids, registry', () => {
  assert.equal(geo.chapters.length, 10); assert.equal(geo.ports.length, 42);
  assert.equal(geo.lessons.length, 52); assert.ok(geo.questions.length >= 160, String(geo.questions.length));
  geo.chapters.forEach((c, i) => { assert.equal(c.id, `geo${String(i + 1).padStart(2, '0')}`); assert.equal(c.lessons[0].kind, 'concept'); assert.equal(c.lessons[0].id, `geo-c${String(i + 1).padStart(2, '0')}`); assert.ok(c.ports.length >= 2); });
  for (const l of geo.lessons.filter(l => l.kind === 'port')) { assert.equal(l.id, `geo-${l.portId}`); l.questions.forEach((q, i) => assert.equal(q.id, `${l.id}-q${i + 1}`)); }
  assert.ok(courses.some(c => c.id === manifest.id && c.status === 'available'));
});
test('geography: every port teaches all sections with real coordinates, climate data and a source', () => {
  for (const p of geo.ports) {
    for (const k of ['hook', 'land', 'climate', 'culture', 'fact', 'zone', 'sea', 'continent', 'country']) assert.ok(p[k]?.length >= 2, `${p.id} ${k}`);
    assert.ok(Math.abs(p.lat) <= 72 && Math.abs(p.lon) <= 180, p.id);
    assert.equal(p.climateData.t.length, 12, p.id); if (p.climateData.p) assert.equal(p.climateData.p.length, 12, p.id);
    assert.match(p.wiki, /^https:\/\/zh\.wikipedia\.org\/wiki\//); assert.ok(p.goods.length >= 1 && p.landmark.name, p.id);
    assert.ok(existsSync(`web/public/art/geography/ports/${p.id}.webp`), `art ${p.id}`); assert.ok(existsSync(`web/public/art/geography/climate/${p.id}.png`), `climograph ${p.id}`);
  }
  assert.ok(geo.credits.sources.some(s => /Natural Earth/.test(s.title)) && geo.credits.sources.some(s => /Factbook/.test(s.title)));
});
test('geography: every quiz question has hint + explanation and grades', () => {
  for (const q of geo.questions) {
    assert.ok(q.explanation?.length >= 8 && q.hint, q.id); assert.equal(new Set(q.options).size, q.options.length, q.id); assert.ok(q.options.length >= 3);
    assert.ok(gradeChoice(q, q.answer)); assert.ok(!gradeChoice(q, q.options[1])); assert.deepEqual([...shuffled(q.options, q.id)].sort(), [...q.options].sort());
  }
  for (const l of geo.lessons) assert.ok(l.questions.length >= 3, l.id);
});
test('geography: sea routes connect every port in lesson order; voyages are feasible with the starter ship', () => {
  const order = geo.lessons.filter(l => l.kind === 'port').map(l => l.portId);
  for (let i = 1; i < order.length; i += 1) assert.ok(neighbors(order[i - 1]).includes(order[i]), `${order[i - 1]} -> ${order[i]}`);
  for (const [a, b] of geo.routes) for (const day of [0, 90, 180, 270]) for (const [x, y] of [[a, b], [b, a]]) {
    const p = plan({ ...freshVoyage(), at: x, day }, y); assert.ok(p.days >= 1 && p.days <= SHIPS[0].supply, `${x}-${y} ${p.days}`);
  }
  assert.equal(wind([[10, 80], [12, 60]], 30).factor > 1, true, 'NE monsoon helps westbound in Jan');
  assert.equal(wind([[10, 60], [12, 80]], 200).factor > 1, true, 'SW monsoon helps eastbound in Jul');
});
test('geography: trading prices reward distance; voyage save state is sanitized', () => {
  assert.ok(sellPrice('silk', 'london') > goodById.silk.price); assert.ok(sellPrice('silk', 'busan') < goodById.silk.price);
  const v = normalizeVoyage({ gold: -5, ship: 9, food: 999, at: 'atlantis', cargo: { silk: 3, hack: 4 }, visited: ['x', 'busan'], log: [{ day: 1, text: 'hi' }, 5] });
  assert.equal(v.gold, 0); assert.equal(v.ship, 3); assert.equal(v.food, SHIPS[2].supply); assert.equal(v.at, 'shanghai'); assert.deepEqual(v.cargo, { silk: 3 }); assert.ok(v.visited.includes('busan') && !v.visited.includes('x')); assert.equal(v.log.length, 1);
  const s = normalizeProgress({ version: 1, voyage: { gold: 5 } }, geo.lessons); assert.equal(s.voyage.gold, 5);
});
test('geography: artwork is raster only (no SVG) and prompts list covers every port', () => {
  const src = ['player.mjs', 'course.mjs', 'geo.css'].map(f => readFileSync(`web/courses/geography/${f}`, 'utf8')).join('\n');
  assert.ok(!/<svg|\.svg\b/i.test(src)); assert.ok(readdirSync('web/public/art/geography/ui').includes('world-chart.png'));
});

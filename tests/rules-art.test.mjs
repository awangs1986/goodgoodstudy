import test from 'node:test';
import assert from 'node:assert/strict';
import { staticDiagram } from '../web/courses/shared/rules-course.mjs';
import * as fiba from '../web/courses/fiba/course.mjs';
import * as f1 from '../web/courses/f1/course.mjs';
import { referee } from '../web/courses/fiba/art.mjs';
import { flag } from '../web/courses/f1/art.mjs';

test('quiz stills use the authored frame instead of dropping moving objects at the origin', () => {
  const source = '<svg class="rc-svg animated"><g data-static-transform="translate(272 150)"><g transform="scale(.7)"><path d="M0 0h4"/></g><animateTransform attributeName="transform" values="-40 150;480 150"/></g></svg>';
  const still = staticDiagram(source);
  assert.match(still, /<g transform="translate\(272 150\)" data-static-frame="true">/);
  assert.match(still, /transform="scale\(\.7\)"/);
  assert.doesNotMatch(still, /<animate|\banimated\b|data-static-transform/);
  assert.equal(staticDiagram(still), still, 'freezing twice is safe');
});

test('an authored still replaces only its own transform and removes paired motion nodes', () => {
  const source = '<svg class="rc-svg animated custom"><g transform="translate(0 0)" data-static-transform="translate(120 80)"><animateMotion path="M0 0L300 0"><mpath href="#route"/></animateMotion><g transform="rotate(15)"><circle r="4"><animate attributeName="r" values="4;6"/></circle></g></g></svg>';
  const still = staticDiagram(source);
  assert.equal((still.match(/translate\(/g) ?? []).length, 1);
  assert.match(still, /translate\(120 80\)/);
  assert.match(still, /transform="rotate\(15\)"/);
  assert.match(still, /class="rc-svg custom"/);
  assert.doesNotMatch(still, /<animate|<mpath/);
});

for (const [name, course, diagramCount, quizCount] of [['FIBA', fiba, 56, 30], ['F1', f1, 44, 24]]) {
  test(`${name}: every lesson and quiz illustration is retained and self-contained`, () => {
    const teaching = course.lessons.flatMap(l => l.teach?.diagrams ?? []).map(d => d.svg);
    const quizzes = course.questions.filter(q => q.svg);
    assert.equal(teaching.length, diagramCount);
    assert.equal(quizzes.length, quizCount);
    assert.equal(course.lessons.length, 40);
    assert.equal(course.questions.length, 130);
    for (const svg of [...teaching, ...quizzes.map(q => q.svg)]) {
      assert.match(svg, /role="img"/);
      assert.match(svg, /aria-label="[^"]+"/);
      assert.doesNotMatch(svg, /\b(?:NaN|undefined|Infinity)\b|<image\b|<script\b/);
      const ids = [...svg.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
      assert.equal(new Set(ids).size, ids.length, 'SVG definition IDs are unique within each image');
      for (const [, ref] of svg.matchAll(/url\(#([^)]*)\)/g)) assert.ok(ids.includes(ref), `missing local definition ${ref}`);
    }
    for (const q of quizzes) assert.doesNotMatch(q.svg, /<animate|\banimated\b|data-static-transform/, q.id);
  });

  test(`${name}: every moving illustration is connected to the existing animation controls`, () => {
    for (const lesson of course.lessons) for (const d of lesson.teach?.diagrams ?? []) {
      if (/<animate\w*\b/.test(d.svg)) assert.match(d.svg, /^<svg[^>]+class="[^"]*\banimated\b/, lesson.id);
    }
  });
}

test('regression: the six affected quiz scenes retain non-origin action frames', () => {
  for (const [course, ids] of [[fiba, ['fb05-01-q1', 'fb07-03-q1', 'fb09-02-q1']], [f1, ['f104-02-q1', 'f107-02-q1', 'f110-03-q1']]]) {
    for (const id of ids) {
      const svg = course.questions.find(q => q.id === id).svg;
      const positions = [...svg.matchAll(/transform="translate\(([-\d.]+) ([-\d.]+)\)" data-static-frame="true"/g)];
      assert.ok(positions.length > 0, id);
      for (const [, x, y] of positions) assert.ok(Number(x) > 0 && Number(y) > 0, `${id}: actor must not fall back to the origin`);
    }
  }
});

test('basketball referee signals retain their distinct hand meanings', () => {
  assert.equal((referee('three').match(/class="fb-hand fb-hand-three"/g) ?? []).length, 1);
  assert.equal((referee('goal3').match(/class="fb-hand fb-hand-three"/g) ?? []).length, 2);
  assert.match(referee('timeout'), /class="fb-hand fb-hand-index"/);
  assert.equal((referee('tech').match(/class="fb-hand fb-hand-flat"/g) ?? []).length, 2);
  assert.match(referee('charge'), /class="fb-hand fb-hand-fist"/);
  assert.match(referee('charge'), /class="fb-hand fb-hand-flat"/);
  assert.match(referee('stop'), /class="fb-hand fb-hand-palm"/);
});

test('F1: double-yellow uses two flags and safety-car scenes use a closed-body vehicle', () => {
  assert.equal((flag('double-yellow', { still: true }).match(/data-flag-panel="yellow"/g) ?? []).length, 2);
  const convoy = f1.lessons.find(l => l.id === 'f105-02').teach.diagrams[0].svg;
  assert.equal((convoy.match(/data-vehicle="safety-car"/g) ?? []).length, 1);
  assert.equal((convoy.match(/data-vehicle="open-wheel"/g) ?? []).length, 2);
  const frozen = staticDiagram(convoy);
  for (const x of [152, 272, 392]) assert.ok(frozen.includes(`translate(${x} 150)`));
});

test('F1: wheelbase dimension terminates at the wheel axles, not the body ends', () => {
  const svg = f1.lessons.find(l => l.id === 'f101-01').teach.diagrams[0].svg;
  const [, x, scale] = svg.match(/<g transform="translate\(([-\d.]+) [-\d.]+\) scale\(([-\d.]+)\)"><g class="f1-car"/);
  const axles = [...new Set([...svg.matchAll(/data-axle="(?:rear|front)" data-cx="([-\d.]+)"/g)].map(m => Number(x) + Number(m[1]) * Number(scale)))].sort((a, b) => a - b);
  const measured = svg.match(/data-dimension="wheelbase" data-axles="([^"]+)"/)[1].split(' ').map(Number);
  assert.deepEqual(measured, axles);
});

test('F1: track-limit comparison puts all four orange tyres outside, while purple still touches white', () => {
  const svg = f1.lessons.find(l => l.id === 'f107-01').teach.diagrams[0].svg;
  const cars = svg.split('<g class="f1-car"').slice(1);
  assert.equal(cars.length, 2);
  const corners = part => {
    const [, x, y] = part.match(/transform="translate\(([-\d.]+) ([-\d.]+)\) rotate\(0\) scale\(1\)"/);
    return [...part.matchAll(/data-cx="([-\d.]+)" data-cy="([-\d.]+)" data-width="([-\d.]+)" data-height="([-\d.]+)"/g)].flatMap(([, cx, cy, w, h]) =>
      [-1, 1].flatMap(sx => [-1, 1].map(sy => [Number(x) + Number(cx) + sx * w / 2, Number(y) + Number(cy) + sy * h / 2])));
  };
  const orange = corners(cars[0]), purple = corners(cars[1]);
  assert.equal(orange.length, 16);
  assert.equal(purple.length, 16);
  // The track is a 96px white stroke with an 88px asphalt stroke, about this
  // centreline. Sample its quadratic bend, including the straight section.
  const centreline = [[-10, 290], [300, 290]];
  for (let i = 0; i <= 1000; i++) {
    const t = i / 1000, u = 1 - t;
    centreline.push([u * u * 300 + 2 * u * t * 480 + t * t * 520, u * u * 290 + 2 * u * t * 290 + t * t * 150]);
  }
  for (const [x, y] of orange) assert.ok(Math.min(...centreline.map(([px, py]) => Math.hypot(x - px, y - py))) > 48, 'every tyre corner is beyond the white edge');
  assert.ok(purple.some(([, y]) => y >= 334 && y <= 338), 'purple tyre overlaps the horizontal white edge');
  assert.ok(purple.every(([, y]) => y <= 338), 'purple has not left the track with all wheels');
});

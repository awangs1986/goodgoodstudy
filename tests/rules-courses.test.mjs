import test from 'node:test';
import assert from 'node:assert/strict';
import * as fiba from '../web/courses/fiba/course.mjs';
import * as f1 from '../web/courses/f1/course.mjs';
import fibaManifest from '../web/courses/fiba/manifest.mjs';
import f1Manifest from '../web/courses/f1/manifest.mjs';
import { gradeChoice, shuffled } from '../web/courses/shared/rules-course.mjs';
import { courses } from '../web/course-registry.mjs';

for (const [name, course, manifest, prefix] of [['FIBA', fiba, fibaManifest, 'fb'], ['F1', f1, f1Manifest, 'f1']]) {
  test(`${name}: structure, counts and stable explicit ids`, () => {
    assert.ok(course.chapters.length >= 8 && course.chapters.length <= 12);
    assert.ok(course.questions.length >= 120 && course.questions.length <= 180, String(course.questions.length));
    for (const ch of course.chapters) {
      assert.match(ch.id, new RegExp(`^${prefix}\\d\\d$`));
      assert.equal(ch.lessons.at(-1).kind, 'exam');
      assert.ok(ch.lessons.filter(l => l.kind === 'stage').length >= 3);
      assert.ok(ch.lessons.at(-1).questions.length >= 4);
    }
    for (const l of course.lessons) assert.ok(l.id.startsWith(l.chapterId + '-'), l.id);
    for (const q of course.questions) assert.match(q.id, new RegExp(`^${prefix}\\d\\d-`));
    assert.ok(courses.some(c => c.id === manifest.id && c.status === 'available'));
  });
  test(`${name}: every stage teaches with a diagram, every question has explanation`, () => {
    for (const l of course.lessons.filter(l => l.kind === 'stage')) {
      for (const key of ['hook', 'why', 'scenario', 'ref']) assert.ok(l.teach[key], `${l.id} ${key}`);
      assert.ok(l.teach.rule.length >= 2, l.id);
      assert.ok(l.teach.diagrams.length >= 1, l.id);
      for (const d of l.teach.diagrams) { assert.match(d.svg, /^<svg[^>]+viewBox/); assert.match(d.svg, /role="img"/); assert.ok(d.cap, l.id); }
      assert.ok(l.questions.length >= 3, l.id);
    }
    for (const q of course.questions) {
      assert.ok(q.explanation?.length >= 6, q.id); if (!q.id.includes('-exam-')) assert.ok(q.hint, q.id);
      assert.equal(new Set(q.options).size, q.options.length, q.id); assert.ok(q.options.length >= 3, q.id);
      assert.ok(gradeChoice(q, q.answer)); assert.ok(!gradeChoice(q, q.options[1]));
      assert.deepEqual([...shuffled(q.options, q.id)].sort(), [...q.options].sort());
    }
    assert.ok(course.questions.filter(q => q.svg).length >= 20, 'scenario diagrams in quizzes');
  });
  test(`${name}: 6+ animated situations, no logos, credits`, () => {
    const svgs = course.lessons.flatMap(l => l.teach?.diagrams ?? []).map(d => d.svg);
    assert.ok(svgs.filter(s => s.includes('rc-svg animated')).length >= 6);
    for (const s of svgs) assert.doesNotMatch(s, /<image|href="http|Pirelli|FIBA logo/i);
    assert.ok(course.credits.sources.every(s => /^https:\/\//.test(s.url) && s.version));
  });
}

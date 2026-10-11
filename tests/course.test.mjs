import test from 'node:test';
import assert from 'node:assert/strict';
import { chapters, lessons, solutions } from '../web/courses/c/course.mjs';
import { gradeLesson } from '../web/courses/c/judge.mjs';

const legacyIds = Array.from({ length: 140 }, (_, index) => `D${Math.floor(index / 20) + 1}-Q${String(index % 20 + 1).padStart(2, '0')}`);

test('course has lesson 0, ten chapters and every original lesson plus the beginner additions', () => {
  assert.equal(chapters.length, 10);
  assert.deepEqual(chapters.map(chapter => chapter.id), ['day00', 'day01', 'day02', 'day03', 'day04', 'day05', 'day06', 'day06b', 'day07', 'day07b']);
  assert.equal(lessons.length, 184);
  assert.equal(solutions.length, lessons.length);
  for (const lesson of lessons) {
    assert.equal(lesson.hints.length, 3, `${lesson.id} hints`);
    assert.ok(lesson.story && lesson.objective && lesson.solution, `${lesson.id} content`);
    assert.ok(lesson.teach && lesson.teach.length > 40, `${lesson.id} teach`);
    assert.match(lesson.difficulty, /^★/, lesson.id);
    assert.ok(['code', 'predict', 'fix', 'fill'].includes(lesson.type), lesson.id);
  }
});

test('every original lesson id survives, ids are unique, and indexes follow the layout', () => {
  const ids = lessons.map(lesson => lesson.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of legacyIds) assert.ok(ids.includes(id), id);
  for (const [chapterIndex, chapter] of chapters.entries()) {
    for (const [localIndex, lesson] of chapter.lessons.entries()) {
      assert.equal(lesson.chapterIndex, chapterIndex, lesson.id);
      assert.equal(lesson.localIndex, localIndex, lesson.id);
    }
  }
});

test('difficulty is explicit per lesson: pointer lessons are never labelled intro', () => {
  for (const lesson of lessons.filter(item => item.chapterId === 'day07' || item.chapterId === 'day07b')) {
    if (!lesson.review) assert.doesNotMatch(lesson.difficulty, /入门/, lesson.id);
  }
});

test('new lesson types are judged correctly', () => {
  const ok = output => ({ ok: true, stage: 'run', output, stderr: '', code: 0 });
  for (const lesson of lessons.filter(item => item.type === 'fix' || item.type === 'fill')) {
    assert.notEqual(lesson.starterCode, lesson.solution, lesson.id);
    const rule = lesson.validation.output;
    const output = rule.mode === 'exact' ? rule.value : `${(rule.includes ?? []).join('\n')}\n`;
    if (lesson.type === 'fill') {
      assert.match(lesson.starterCode, /____/, lesson.id);
      assert.equal(gradeLesson(lesson, lesson.starterCode, ok(output)).passed, false, `${lesson.id} blank accepted`);
    }
  }
  for (const lesson of lessons.filter(item => item.type === 'predict')) {
    assert.ok(Array.isArray(lesson.choices) && lesson.choices.length >= 3, lesson.id);
    assert.ok(Number.isInteger(lesson.answer) && lesson.choices[lesson.answer] !== undefined, lesson.id);
    assert.equal(new Set(lesson.choices).size, lesson.choices.length, `${lesson.id} duplicate choices`);
  }
  const answers = lessons.filter(item => item.type === 'predict').map(item => item.answer);
  assert.ok(new Set(answers).size > 1, 'predict answers are shuffled');
});

test('every reference answer satisfies its lesson code rules', () => {
  for (const [index, lesson] of lessons.entries()) {
    const rule = lesson.validation.output;
    let output = rule.mode === 'exact' ? rule.value : `${(rule.includes ?? []).join('\n')}\n`;
    if (rule.mode !== 'exact') {
      const lines = output.replace(/\n$/, '').split('\n').length;
      output += 'ok\n'.repeat(Math.max(0, (rule.minLines ?? 0) - lines));
    }
    const judged = gradeLesson(lesson, solutions[index], { ok: true, stage: 'run', output, stderr: '', code: 0 });
    const codeFailures = judged.tests.filter(item => item.name !== '冒险结果' && !item.passed);
    assert.deepEqual(codeFailures, [], `${lesson.id}: ${codeFailures.map(item => item.message).join('；')}`);
  }
});

test('second lesson explains all three newline characters required by its exact output', () => {
  const lesson = lessons.find(item => item.id === 'D1-Q02');
  assert.equal((lesson.hints[2].match(/\\n/g) ?? []).length, 3);
  assert.equal(lesson.validation.output.value, 'Dawn Bell\nAlarm Bell\nHarbor Closed\n');
});

test('equivalent beginner solutions are not tied to reference variable names or one syntax form', () => {
  const alternatives = [
    { id: 'D2-Q01', source: 'int coins = 30, fee = 12; coins -= fee;', output: 'Gold: 18\n' },
    { id: 'D2-Q06', source: 'int coins = 100, people = 3; int each = coins / people, left = coins % people;', output: 'Each: 33\nRemain: 1\n' },
    { id: 'D2-Q10', source: 'int bottles = 5, people = 2; double exact = (double)bottles / people;', output: 'Whole: 2\nExact: 2.5\n' },
    { id: 'D3-Q10', source: 'const char *path = 63 >= 50 ? "Lucky route" : "Cursed route";', output: 'Lucky route\nSteps: 3\n' },
    { id: 'D4-Q03', source: 'int alarm = 0; do printf("Alarm rings once!\\n"); while (alarm > 0);', output: 'Alarm rings once!\n' },
    { id: 'D4-Q11', source: 'int row = 0; while (row++ < 4) { int col = 0; while (col++ < 8) printf("#"); }', output: '########\n########\n########\n########\n' },
    { id: 'D6-Q01', source: 'int dust[5] = {3, 7, 11, 5, 9};', output: 'Third: 11\nAll: 3 7 11 5 9\n' },
    { id: 'D7-Q02', source: 'void heal_player(Player *hero) { hero->hp += 12; }', output: 'HP: 47/50\n' },
    { id: 'D7-Q07', source: 'int player_alive(const Player *hero) { return hero->hp > 0; }', output: 'Alive: 1\nFallen: 0\n' }
  ];
  for (const candidate of alternatives) {
    const lesson = lessons.find(item => item.id === candidate.id);
    const judged = gradeLesson(lesson, candidate.source, { ok: true, stage: 'run', output: candidate.output, stderr: '', code: 0 });
    assert.equal(judged.passed, true, `${candidate.id}: ${judged.tests.filter(item => !item.passed).map(item => item.message).join('；')}`);
  }
});

test('graduation trial accepts each of its three valid choice outcomes in the required order', () => {
  const lesson = lessons.find(item => item.id === 'D7-Q20');
  const validOutputs = [
    'Healing accepted.\nHP: 45 Gold: 35 Runes: 7\nEnding: The crown restores your light.\n',
    'Gold offered.\nHP: 30 Gold: 20 Runes: 7\nEnding: The crown accepts your vow.\n',
    'The crown reflects seven stars.\nHP: 30 Gold: 35 Runes: 7\nEnding: You choose wisdom.\n'
  ];
  for (const output of validOutputs) {
    assert.equal(gradeLesson(lesson, lesson.solution, { ok: true, stage: 'run', output, stderr: '', code: 0 }).passed, true);
  }
  const reversed = 'Gold offered.\nEnding: The crown accepts your vow.\nHP: 30 Gold: 20 Runes: 7\n';
  assert.equal(gradeLesson(lesson, lesson.solution, { ok: true, stage: 'run', output: reversed, stderr: '', code: 0 }).passed, false);
});

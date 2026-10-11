import { chapter as day01Meta, lessons as day01Source } from './lessons.mjs';
import { solutions as day01Solutions } from './solutions.mjs';
import { day00 } from './day00.mjs';
import { day02 } from './day02.mjs';
import { day03 } from './day03.mjs';
import { day04 } from './day04.mjs';
import { day05 } from './day05.mjs';
import { day06 } from './day06.mjs';
import { day07 } from './day07.mjs';
import { inputLessons } from './lessons-input.mjs';
import teachDay01 from './teach/day01.mjs';
import teachDay02 from './teach/day02.mjs';
import teachDay03 from './teach/day03.mjs';
import teachDay04 from './teach/day04.mjs';
import teachDay05 from './teach/day05.mjs';
import teachDay06 from './teach/day06.mjs';
import teachDay07 from './teach/day07.mjs';

// Per-lesson teach text, minimal example and (for D2–D7) three tiered hints, keyed by fixed lesson ID.
const teaching = { ...teachDay01, ...teachDay02, ...teachDay03, ...teachDay04, ...teachDay05, ...teachDay06, ...teachDay07 };

const day01 = {
  ...day01Meta,
  day: 1,
  numeral: 'Ⅰ',
  rune: '第一枚符文',
  description: '完成20项短试炼，让沉睡的灯塔重新照亮海岸。',
  lessons: day01Source.map((lesson, index) => ({
    ...lesson,
    chapterId: day01Meta.id,
    defaultInput: '',
    solution: day01Solutions[index]
  }))
};

// Chapter layout: an explicit, ordered list of fixed lesson IDs per chapter.
// Original lessons keep their positional IDs (D{chapter}-Q{nn}); new lessons get new IDs.
const pool = new Map([day00, day01, day02, day03, day04, day05, day06, day07].flatMap(chapter => chapter.lessons).concat(Object.values(inputLessons)).map(lesson => [lesson.id, lesson]));
const q = (day, from, to) => Array.from({ length: to - from + 1 }, (_, index) => `D${day}-Q${String(from + index).padStart(2, '0')}`);
const layout = [
  [day00, day00.lessons.map(lesson => lesson.id)],
  [day01, [...q(1, 1, 13), 'D1-S01', ...q(1, 14, 20)]],
  [day02, [...q(2, 1, 19), 'D2-IN1', 'D2-IN2', 'D2-Q20']],
  [day03, q(3, 1, 20)],
  [day04, q(4, 1, 20)],
  [day05, q(5, 1, 20)],
  [day06, q(6, 1, 20)],
  [day07, q(7, 1, 20)]
];
const used = new Set();
export const chapters = layout.map(([chapter, ids]) => ({ ...chapter, lessons: ids.map(id => {
  if (!pool.has(id)) throw new Error(`Unknown C lesson in layout: ${id}`);
  if (used.has(id)) throw new Error(`C lesson placed twice: ${id}`);
  used.add(id);
  return pool.get(id);
}) }));
for (const id of pool.keys()) if (!used.has(id)) throw new Error(`C lesson missing from layout: ${id}`);
for (const chapter of chapters) for (const lesson of chapter.lessons) if (teaching[lesson.id]) Object.assign(lesson, teaching[lesson.id]);
// Positions are derived after assembly; IDs (the save-file key) are fixed in each lesson's source.
chapters.forEach((chapter, chapterIndex) => {
  chapter.total = chapter.lessons.length;
  chapter.lessons.forEach((lesson, localIndex) => Object.assign(lesson, { chapterId: chapter.id, chapterIndex, localIndex }));
});
export const lessons = chapters.flatMap(chapter => chapter.lessons);
if (new Set(lessons.map(lesson => lesson.id)).size !== lessons.length) throw new Error('Duplicate C lesson id');
export const solutions = lessons.map(lesson => lesson.solution);

export function chapterStart(chapterIndex) {
  return chapters.slice(0, chapterIndex).reduce((total, chapter) => total + chapter.total, 0);
}

export function chapterForQuest(questIndex) {
  return chapters.find(chapter => chapter.lessons.some(lesson => lesson === lessons[questIndex])) ?? chapters[0];
}

export function globalQuestIndex(chapterIndex, localIndex) {
  return chapterStart(chapterIndex) + localIndex;
}

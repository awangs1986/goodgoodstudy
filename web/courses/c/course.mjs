import { chapter as day01Meta, lessons as day01Source } from './lessons.mjs';
import { solutions as day01Solutions } from './solutions.mjs';
import { day00 } from './day00.mjs';
import { day02 } from './day02.mjs';
import { day03 } from './day03.mjs';
import { day04 } from './day04.mjs';
import { day05 } from './day05.mjs';
import { day06 } from './day06.mjs';
import { day07 } from './day07.mjs';
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

export const chapters = [day00, day01, day02, day03, day04, day05, day06, day07];
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

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
import { structureLessons } from './lessons-structure.mjs';
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
const pool = new Map([day00, day01, day02, day03, day04, day05, day06, day07].flatMap(chapter => chapter.lessons).concat(Object.values(inputLessons), structureLessons).map(lesson => [lesson.id, lesson]));
const q = (day, from, to) => Array.from({ length: to - from + 1 }, (_, index) => `D${day}-Q${String(from + index).padStart(2, '0')}`);
// Day 6 and Day 7 were each split in two (review items 5 and 6); every original ID is kept.
const day06a = { ...day06, title: '星图遗迹·上', subtitle: '数组与字符串（含 \\0、越界、string.h）', description: '一次保存许多星光：数组、下标和字符串的真相。',
  en: { title: 'Star Ruins I', subtitle: "Arrays and strings ('\\0', bounds, string.h)", description: 'Many values in one container.', rune: 'The Sixth Rune', scene: 'Countless memories hang beneath the dome of the Star Ruins.' } };
const day06b = { ...day06, id: 'day06b', numeral: 'Ⅵ·下', title: '星图遗迹·下', subtitle: '二维地图、结构体与输入', description: '把地图、角色和玩家的输入连在一起，让角色真正走起来。',
  en: { title: 'Star Ruins II', subtitle: '2D maps, structs and input', description: 'Maps, characters and player input.', rune: 'The Sixth Rune (II)', scene: 'The star map unfolds into corridors you can walk.' } };
const day07a = { ...day07, title: '王冠前庭·指针基础', subtitle: '地址、解引用、swap 与结构体指针', description: '变量是带门牌号的箱子：学会用门牌号找到并修改它。',
  en: { title: 'Crown Forecourt', subtitle: 'Addresses, dereferencing, swap, struct pointers', description: 'Variables are boxes with house numbers.', rune: 'The Seventh Rune', scene: 'Every door in the forecourt bears a number.' } };
const day07b = { ...day07, id: 'day07b', numeral: 'Ⅶ·下', title: '王冠决战', subtitle: '指针与数组、字符串、函数，以及毕业综合', description: '把指针、地图、战斗与输入组合成完整的冒险。',
  en: { title: 'The Crown Showdown', subtitle: 'Pointers with arrays, strings and functions; graduation', description: 'Everything together.', rune: 'The Final Rune', scene: 'The crown hall waits at the end of the corridor.' } };
const layout = [
  [day00, day00.lessons.map(lesson => lesson.id)],
  [day01, [...q(1, 1, 13), 'D1-S01', ...q(1, 14, 20)]],
  [day02, ['D2-R01', ...q(2, 1, 19), 'D2-IN1', 'D2-IN2', 'D2-Q20']],
  [day03, ['D3-R01', ...q(3, 1, 20)]],
  [day04, ['D4-R01', ...q(4, 1, 20), 'D4-M01']],
  [day05, ['D5-R01', ...q(5, 1, 20)]],
  [day06a, ['D6-R01', 'D6-Q01', 'D6-Q02', 'D6-Q03', 'D6-N01', 'D6-Q05', 'D6-N02', 'D6-Q07', 'D6-Q08', 'D6-N03', 'D6-N04', 'D6-Q06', 'D6-Q04']],
  [day06b, ['D6-R02', ...q(6, 9, 19), 'D6-M01', 'D6-Q20']],
  [day07a, ['D7-R01', 'D7-Q01', 'D7-N01', 'D7-N02', 'D7-Q06', 'D7-N03', 'D7-N05', 'D7-Q02', 'D7-Q03', 'D7-Q04', 'D7-Q05', 'D7-Q07']],
  [day07b, ['D7-R02', 'D7-N04', 'D7-Q08', 'D7-Q15', 'D7-Q17', ...q(7, 9, 14), 'D7-Q16', 'D7-Q18', 'D7-Q19', 'D7-Q20']]
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

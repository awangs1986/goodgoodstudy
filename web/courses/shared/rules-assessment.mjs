import { gradeChoice } from './rules-course.mjs';

const record = value => value && typeof value === 'object' && !Array.isArray(value) ? value : {};

// Only answers to the current course questions survive backup imports or course revisions.
export function normalizeAssessment(value, lessons) {
  const source = record(value);
  if (source.version !== 1) return { version: 1, drafts: {}, submitted: {} };
  const drafts = {}, submitted = {};
  for (const lesson of lessons) {
    const options = new Map(lesson.questions.map(q => [q.id, q.options]));
    const clean = answers => Object.fromEntries(Object.entries(record(answers)).filter(([id, answer]) => options.get(id)?.includes(answer)));
    const draft = clean(record(source.drafts)[lesson.id]);
    if (Object.keys(draft).length) drafts[lesson.id] = draft;
    const entry = record(record(source.submitted)[lesson.id]);
    const answers = clean(entry.answers);
    if (lesson.questions.every(q => Object.hasOwn(answers, q.id))) {
      submitted[lesson.id] = { answers, submittedAt: typeof entry.submittedAt === 'string' ? entry.submittedAt : null };
      delete drafts[lesson.id];
    }
  }
  return { version: 1, drafts, submitted };
}

export function assessmentReport(assessment, chapters, lessons) {
  const results = chapters.map(chapter => {
    const total = chapter.lessons.reduce((n, lesson) => n + lesson.questions.length, 0);
    const right = chapter.lessons.reduce((n, lesson) => n + lesson.questions.filter(q => gradeChoice(q, assessment.submitted[lesson.id]?.answers[q.id])).length, 0);
    return { title: chapter.title, icon: chapter.icon, right, total };
  });
  const total = results.reduce((n, result) => n + result.total, 0);
  const right = results.reduce((n, result) => n + result.right, 0);
  const done = lessons.filter(lesson => assessment.submitted[lesson.id]).length;
  const percent = Math.round(right / total * 100);
  const title = percent === 100 ? '最忠诚的 F1 车迷' : percent >= 90 ? '铁杆 F1 车迷' : percent >= 75 ? '资深 F1 车迷' : percent >= 60 ? '进阶 F1 车迷' : '新晋 F1 车迷';
  return { results, total, right, done, percent, title, complete: done === lessons.length };
}

// Shared data helpers for the rules courses (FIBA basketball, F1). Pure data, no DOM — tests import this.
// mc(): the first option is the correct one; the player shuffles deterministically by question id.
export const mc = (id, prompt, options, explanation, hint, svg) => ({ id, type: 'choice', prompt, options, answer: options[0], explanation, hint, ...(svg ? { svg } : {}) });
// stage(): one "teach first, then test" stage. teach = { hook, rule: [], why, scenario, ref, diagrams: [{ svg, cap, anim? }], caution? }
export const stage = (id, title, teach, quiz) => ({ id, title, teach, quiz });
// The moving part declares a deliberate, readable still frame. Removing SMIL alone
// leaves objects authored at the origin in the top-left corner of the quiz image.
// These SVG strings are bundled course artwork, never untrusted input.
export function staticDiagram(svg) {
  return String(svg)
    .replace(/<animate\w*\b[^>]*\/>/g, '')
    .replace(/<animate\w*\b[^>]*>[\s\S]*?<\/animate\w*>/g, '')
    .replace(/<[^>]+\sdata-static-transform="([^"]*)"[^>]*>/g, (tag, transform) => {
      const clean = tag.replace(/\sdata-static-transform="[^"]*"/, '').replace(/\stransform="[^"]*"/, '');
      return clean.replace(/(\/?>)$/, ` transform="${transform}" data-static-frame="true"$1`);
    })
    .replace(/class="([^"]*)"/g, (_, value) => `class="${value.split(/\s+/).filter(name => name !== 'animated').join(' ')}"`);
}
export function buildCourse(units, prefix) {
  const chapters = units.map((unit, chapterIndex) => {
    const stageLessons = unit.stages.map((s, localIndex) => {
      // Scenario picture for the first quiz question: reuse the stage's scenario diagram (static copy) unless the question brings its own.
      const diagram = [...(s.teach.diagrams ?? [])].reverse().find(d => !d.svg.includes('data-kind="info"'))?.svg;
      const scene = diagram ? staticDiagram(diagram) : undefined;
      // Only attach it to a question whose answer the picture does not give away.
      const target = scene ? s.quiz.findIndex(q => !q.svg && !q.options.slice(0).some(o => o.length > 1 && scene.includes(o))) : -1;
      const quiz = s.quiz.map((q, i) => (i === target ? { ...q, svg: scene } : q));
      return { ...s, quiz, kind: 'stage', questions: quiz, chapterId: unit.id, chapterIndex, localIndex };
    });
    const exam = { id: `${unit.id}-exam`, kind: 'exam', title: `${unit.title} · 单元测试`, questions: unit.exam, chapterId: unit.id, chapterIndex, localIndex: stageLessons.length, recap: stageLessons.map(s => s.title) };
    return { ...unit, lessons: [...stageLessons, exam] };
  });
  const lessons = chapters.flatMap(c => c.lessons), questions = lessons.flatMap(l => l.questions);
  if (new Set(lessons.map(l => l.id)).size !== lessons.length) throw new Error(`Duplicate ${prefix} lesson id`);
  if (new Set(questions.map(q => q.id)).size !== questions.length) throw new Error(`Duplicate ${prefix} question id`);
  return { chapters, lessons, questions };
}
export const gradeChoice = (question, answer) => answer === question.answer;
export function shuffled(options, seed) {
  let h = 2166136261; for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  const list = [...options];
  for (let i = list.length - 1; i > 0; i -= 1) { h = Math.imul(h ^ (h >>> 13), 1597334677) >>> 0; const j = h % (i + 1); [list[i], list[j]] = [list[j], list[i]]; }
  return list;
}

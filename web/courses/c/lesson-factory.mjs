const skeleton = `#include <stdio.h>

int main(void) {
    // 在这里完成本次试炼

    return 0;
}`;

export function cProgram(body, helpers = '', headers = '#include <stdio.h>') {
  return `${headers}\n\n${helpers ? `${helpers.trim()}\n\n` : ''}int main(void) {\n${body.trimEnd()}\n    return 0;\n}`;
}

function plain(value) {
  return value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

// Lesson IDs and difficulty are explicit per lesson. Saved progress is keyed by ID,
// so IDs must never be derived from a lesson's position (lessons are reordered and inserted).
const defaultMinutes = difficulty => difficulty.startsWith('★★★') ? 25 : difficulty.startsWith('★★☆') ? 15 : 10;

export function makeLesson(chapter, spec) {
  const id = spec.id;
  if (!/^[A-Za-z0-9-]+$/.test(id ?? '')) throw new Error(`${chapter.id} 的题目缺少固定 id：${spec.title}`);
  if (!spec.difficulty) throw new Error(`${id} 缺少难度标注`);
  const objective = spec.objective ?? spec.task;
  const expected = Array.isArray(spec.expected) ? spec.expected : [spec.expected];
  return {
    id,
    chapterId: chapter.id,
    title: spec.title,
    difficulty: spec.difficulty,
    knowledge: spec.knowledge,
    minutes: spec.minutes ?? defaultMinutes(spec.difficulty),
    quote: spec.quote ?? `“${spec.title}不是障碍，而是第${chapter.day}枚符文留下的考验。”`,
    story: spec.story ?? `${chapter.scene}${spec.task}`,
    objective,
    rules: `输入：${spec.input ? `<code>${spec.inputLabel ?? spec.input.trim()}</code>` : '无'}<br>核心知识：<code>${spec.knowledge}</code><br>建议在 ${spec.minutes ?? defaultMinutes(spec.difficulty)} 分钟内完成`,
    starterCode: spec.starterCode ?? (spec.type === 'predict' ? spec.solution : skeleton),
    defaultInput: spec.input ?? '',
    // Lesson types: 'code' (write a program), 'predict' (read code, choose its output),
    // 'fix' (starter code contains a bug), 'fill' (starter code has ____ blanks).
    type: spec.type ?? 'code',
    teach: spec.teach,
    example: spec.example,
    figure: spec.figure,
    choices: spec.choices,
    answer: spec.answer,
    review: spec.review ?? false,
    milestone: spec.milestone ?? false,
    en: spec.en,
    hints: spec.hints ?? [
      `先锁定本题唯一的新武器：<code>${spec.knowledge}</code>，不要一次写完整段剧情。`,
      `把目标拆成“准备数据 → 处理数据 → 输出结果”三步：${plain(objective)}`,
      `先让最小示例通过编译，再补齐边界；注意分号、花括号和格式符。`
    ],
    validation: {
      // A predict lesson's snippet is its solution: running it must print exactly the correct choice.
      output: spec.type === 'predict' ? { mode: 'exact', value: spec.choices[spec.answer] } : spec.outputRule ?? { mode: 'custom', includes: expected.filter(Boolean), minLines: spec.minLines ?? 1, ordered: expected.length > 1 },
      code: [
        ...(spec.type === 'fill' ? [{ pattern: /^(?![\s\S]*_{3,})/, message: '还有 ____ 空格没有填写。', source: 'original' }] : []),
        ...(spec.must ?? []).map(([pattern, message]) => Array.isArray(pattern)
          ? { anyOf: pattern, message }
          : { pattern, message })
      ]
    },
    passStory: spec.passStory ?? `“${spec.title}”的符文碎片化作流光，飞向${chapter.title}深处。`,
    solution: spec.solution
  };
}

export function buildChapter(chapter, specs) {
  const lessons = specs.map(spec => makeLesson(chapter, spec));
  return { ...chapter, total: lessons.length, lessons };
}

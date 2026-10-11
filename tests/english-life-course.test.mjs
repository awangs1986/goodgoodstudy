import test from 'node:test';
import assert from 'node:assert/strict';
import { lifeLessons, lifeStages, lifeCoverage } from '../web/courses/english-nce/life-course.mjs';
import { lifeSyllabus } from '../web/courses/english-nce/life-syllabus.mjs';
import { gradeEnglish, normalizeEnglish } from '../web/courses/english-nce/judge.mjs';
import { vocabularyAnswerCorrect } from '../web/courses/shared/vocabulary-checks.mjs';

test('all 96 source lessons map to original life lessons with stable IDs and all 862 word targets', () => {
  assert.equal(lifeLessons.length, 96);
  assert.deepEqual(lifeLessons.map(l => l.sourceLesson), Array.from({ length: 96 }, (_, i) => i + 1));
  assert.equal(lifeCoverage.vocabularyEntries, 862);
  assert.equal(lifeCoverage.practiceQuestions, 576);
  assert.equal(new Set(lifeLessons.map(l => l.id)).size, 96);
  assert.deepEqual(lifeStages.map(stage => lifeLessons.filter(l => l.stage === stage.id).length), [24, 24, 24, 24]);
  assert.deepEqual(lifeSyllabus.filter(l => l.reviewOnly).map(l => l.lesson), [24, 48, 72, 96]);
  for (const lesson of lifeLessons) {
    const source = lifeSyllabus.find(item => item.lesson === lesson.sourceLesson);
    assert.equal(lesson.id, `nce2-life-${String(lesson.sourceLesson).padStart(3, '0')}`);
    assert.deepEqual(lesson.vocabulary.map(word => word.word), source.words, lesson.id);
    assert.equal(lesson.vocabularyCheck.words.length, source.words.length, `${lesson.id} all words are tested`);
    for (const page of source.pdfPages.vocabulary) assert.ok(lesson.sourcePages.includes(page), `${lesson.id} source page ${page}`);
    assert.ok(lesson.sourcePages.every(page => Number.isInteger(page) && page >= 1 && page <= 443));
    for (const word of lesson.vocabulary) {
      assert.ok(word.meaning && word.example && word.exampleZh, `${lesson.id}: ${word.word} is taught with meaning and an original example`);
      assert.ok(lesson.vocabularyCheck.questions.some(question => question.word === word.word), `${lesson.id}: ${word.word} reaches assessment`);
    }
  }
});

test('every original practice item is answerable and rejects empty, wrong and alternative distractor responses', () => {
  for (const lesson of lifeLessons) {
    assert.equal(lesson.questions.length, 6, lesson.id);
    assert.equal(new Set(lesson.questions.map(q => q.id)).size, 6, lesson.id);
    assert.equal(gradeEnglish(lesson, {}).passed, false);
    for (const question of lesson.questions) {
      assert.ok(question.prompt && question.explanation, question.id);
      assert.ok(question.answers.length > 0 && question.answers.every(answer => typeof answer === 'string' && answer.trim()), question.id);
      for (const answer of question.answers) assert.equal(gradeEnglish({ questions: [question] }, { [question.id]: answer }).passed, true, `${question.id}: alternative`);
      assert.equal(gradeEnglish({ questions: [question] }, { [question.id]: 'definitely incorrect answer' }).passed, false, question.id);
      if (question.type === 'choice') {
        assert.equal(question.options.length, 3, question.id);
        assert.equal(new Set(question.options).size, 3, question.id);
        assert.equal(question.options.filter(option => gradeEnglish({ questions: [question] }, { [question.id]: option }).passed).length, 1, `${question.id} only one option is accepted`);
      }
      if (question.type === 'ordering') assert.deepEqual(normalizeEnglish(question.tokens.join(' ')).split(' ').sort(), normalizeEnglish(question.answers[0]).split(' ').sort(), question.id);
    }
  }
});

test('life vocabulary checks use bounded choices, exact missing letters and no answer-bearing image labels', () => {
  for (const lesson of lifeLessons) for (const question of lesson.vocabularyCheck.questions) {
    assert.ok(vocabularyAnswerCorrect(question, question.answer));
    assert.ok(!vocabularyAnswerCorrect(question, ''));
    assert.ok(!vocabularyAnswerCorrect(question, 'incorrect'));
    if (question.options) {
      assert.ok(question.options.length >= 2 && question.options.length <= 4, question.id);
      assert.equal(new Set(question.options).size, question.options.length, question.id);
      assert.equal(question.options.filter(option => vocabularyAnswerCorrect(question, option)).length, 1, question.id);
    }
    if (question.kind === 'missing') {
      assert.ok(question.positions.length >= 1 && question.positions.length <= 2);
      const answer = [...question.answer];
      assert.equal([...question.masked].map(letter => letter === '＿' ? answer.shift() : letter).join(''), question.word);
    }
    if (question.kind === 'picture') {
      assert.ok(!question.picture.svg.includes('<text'));
      assert.ok(!question.picture.svg.includes('<script'));
      assert.ok(!/\bhref=|<image\b|<foreignObject\b/.test(question.picture.svg));
      assert.equal(question.transcript, undefined);
    }
  }
});

test('progressive lessons teach grammar, original examples, a translated reading and a real-life purpose before testing', () => {
  const lengths = [[], [], [], []];
  for (const lesson of lifeLessons) {
    assert.ok(lesson.title && lesson.scene && lesson.goal, lesson.id);
    assert.ok(lesson.grammar.title && lesson.grammar.explanation.length >= 35, lesson.id);
    assert.ok(lesson.grammar.examples.length >= 2, lesson.id);
    assert.ok(lesson.grammar.examples.every(example => example.en && example.zh), lesson.id);
    const words = lesson.passage.en.match(/\b[\w'-]+\b/g) ?? [];
    assert.ok(words.length >= 40 && words.length <= 150, `${lesson.id}: ${words.length} reading words`);
    assert.ok(lesson.passage.zh.length >= 40, lesson.id);
    lengths[lesson.stage - 1].push(words.length);
  }
  const means = lengths.map(stage => stage.reduce((a, b) => a + b, 0) / stage.length);
  assert.ok(means[3] > means[0] + 15, `later readings extend connected language: ${means}`);
});

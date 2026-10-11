import { pictureForWord } from './vocabulary-pictures.mjs';

export const VOCABULARY_VERSION = 1;
const object = value => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
const canonical = value => String(value ?? '').normalize('NFC').replace(/[’‘]/g, "'").trim().replace(/\s+/g, ' ').toLocaleLowerCase();
const withoutPartOfSpeech = value => value.trim().replace(/^(?:(?:n|v|vt|vi|adj|adv|prep|conj|pron|det|num|aux|phr)\.\s*)+/i, '');
const taughtSenses = value => withoutPartOfSpeech(value).replace(/（[^）]*）|\([^)]*\)/g, '').split(/[；;／/、，,]/).map(sense => canonical(withoutPartOfSpeech(sense)).replace(/[的地]$/, '')).filter(Boolean);
export function vocabularyMeaningsOverlap(first, second) {
  const left = taughtSenses(first), right = taughtSenses(second);
  return left.some(a => right.some(b => a === b || (a.length >= 2 && b.length >= 2 && (a.includes(b) || b.includes(a)))));
}
const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const wordRule = word => new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(word).replace(/['’]/g, "['’]")}(?![\\p{L}\\p{N}])`, 'iu');
const hash = text => [...text].reduce((n, char) => (Math.imul(n, 31) + char.codePointAt(0)) >>> 0, 7);
export function vocabularyShuffle(values, seed) {
  const result = [...values]; let state = hash(seed);
  for (let i = result.length - 1; i > 0; i--) { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; const j = state % (i + 1); [result[i], result[j]] = [result[j], result[i]]; }
  return result;
}
// A spelling alone is insufficient: book/watch/train can also be verbs. Picture only the taught noun sense.
const PICTURE_MEANINGS = {
  umbrella: ['雨伞', '伞'], coat: ['外套', '大衣'], pen: ['钢笔', '笔'], watch: ['手表'], book: ['书', '书本', '书籍'],
  apple: ['苹果'], bicycle: ['自行车', '脚踏车'], key: ['钥匙'], chair: ['椅子', '座位'], table: ['桌子', '桌'],
  fish: ['鱼'], guitar: ['吉他'], train: ['火车'], banana: ['香蕉'],
  postcard: ['明信片'], parcel: ['包裹', '邮包'], diamond: ['钻石', '金刚石'], boot: ['靴子', '长筒靴'],
  tent: ['帐篷'], mirror: ['镜子'], snake: ['蛇'], wheel: ['车轮', '轮子'], telescope: ['望远镜'],
  shark: ['鲨鱼'], balloon: ['气球'], ladder: ['梯子']
};
function pictureForEntry(item, language) {
  const picture = pictureForWord(item.word, language);
  if (!picture) return null;
  const senses = item.meaning.split(/[；;／/、，,]/).map(sense => withoutPartOfSpeech(sense).replace(/^一(?:个|件|支|本|把|张|辆|列|只|条)/, ''));
  return senses.every(sense => PICTURE_MEANINGS[picture.key]?.includes(sense)) ? picture : null;
}
function genderNote(word, language) {
  if (language !== 'fr') return '';
  if (/^(le|un|du) /i.test(word)) return '这里的名词是阳性，词表中的冠词一起记。';
  if (/^(la|une) /i.test(word)) return '这里的名词是阴性，词表中的冠词一起记。';
  if (/^(les|des) /i.test(word)) return '这里是复数形式；这个冠词本身不能判断名词的阴阳性。';
  if (/^(l['’]|de l['’])/i.test(word)) return '元音前使用省音形式；l’ 本身不能判断名词的阴阳性。';
  return '';
}
function visibleMaterial(lesson) {
  return (lesson.questions ?? []).flatMap(q => [q.prompt, q.passage, q.transcript, ...(q.answers ?? []), ...(q.tokens ?? [])]).filter(Boolean).join('\n');
}
function missingLetters(word, seed) {
  const chars = [...word.normalize('NFC')];
  // Keep articles and punctuation visible. The longest lexical word supplies the 1–2 missing letters.
  const runs = [...word.matchAll(/\p{L}+/gu)].sort((a, b) => b[0].length - a[0].length);
  const run = runs[0];
  if (!run || [...run[0]].length < 2) return null;
  const offset = [...word.slice(0, run.index)].length, count = [...run[0]].length >= 5 ? 2 : 1;
  const positions = vocabularyShuffle(Array.from({ length: [...run[0]].length }, (_, i) => offset + i), seed).slice(0, count).sort((a, b) => a - b);
  return { masked: chars.map((char, i) => positions.includes(i) ? '＿' : char).join(''), answer: positions.map(i => chars[i]).join(''), positions };
}
function findContext(word, lesson, contexts) {
  const sources = [...contexts, ...(lesson.questions ?? []).flatMap(q => [q.transcript, q.passage, ...(q.answers ?? [])])];
  for (const source of sources) {
    for (const line of String(source ?? '').split(/\n|(?<=[.!?])\s+/)) {
      if (line.includes('_') || line.length > 180 || (line.match(/\p{L}+/gu) ?? []).length < 4) continue;
      const match = line.match(wordRule(word));
      if (match && !line.slice(match.index + match[0].length).match(wordRule(word))) return { sentence: line, masked: line.slice(0, match.index) + '____' + line.slice(match.index + match[0].length) };
    }
  }
  return null;
}
/** Pure, reusable lesson-end assessment. Every target and distractor is explicitly taught in words.
 * vocabulary: [{ en|fr|word, meaning }]; contexts are optional original, already-taught sentences.
 * All identifiers are namespaced under lesson.id. No audio, sentence, or label accompanies picture questions.
 */
export function buildVocabularyCheck({ lesson, vocabulary, language = 'en', contexts = [], allWords = false }) {
  if (!lesson?.id || !['en', 'fr'].includes(language)) throw new Error('Vocabulary check needs a lesson ID and en/fr language.');
  const seenWords = new Set();
  const candidates = (vocabulary ?? []).flatMap(item => {
    const word = String(item[language] ?? item.word ?? '').normalize('NFC').trim(), meaning = String(item.meaning ?? '').trim();
    if (!word || !meaning || seenWords.has(canonical(word))) return [];
    seenWords.add(canonical(word));
    return [{ word, meaning, note: genderNote(word, language) }];
  });
  if (!candidates.length) throw new Error(`${lesson.id}: a vocabulary recap needs taught words.`);
  const material = visibleMaterial(lesson);
  const matched = candidates.filter(item => wordRule(item.word).test(material) || material.includes(`“${item.meaning}”`));
  const selected = allWords ? [...candidates] : matched.slice(0, 4);
  // Grammar-only microtasks get a brief, explicit recap of the current chapter, never outside vocabulary.
  const start = (Number(lesson.localIndex) || hash(lesson.id)) % candidates.length;
  for (let i = 0; selected.length < Math.min(3, candidates.length) && i < candidates.length; i++) {
    const item = candidates[(start + i) % candidates.length]; if (!selected.includes(item)) selected.push(item);
  }
  const words = selected.map(item => ({ ...item, source: matched.includes(item) ? 'lesson' : 'chapter-recap', context: findContext(item.word, lesson, contexts) }));
  const questions = [];
  const optionsFor = (item, field, eligible = words) => {
    // Do not offer one taught sense of the correct word as a supposedly wrong choice.
    const distinct = [...new Set(eligible.filter(word => !vocabularyMeaningsOverlap(word.meaning, item.meaning)).map(word => word[field]))];
    return [item[field], ...vocabularyShuffle(distinct, `${lesson.id}:${item.word}:${field}`).slice(0, 3)];
  };
  const add = (kind, word, extra) => {
    const id = `${lesson.id}:vocabulary:${kind}:${encodeURIComponent(word.word)}`;
    const question = { id, kind, word: word.word, meaning: word.meaning, explanation: `${word.word}：${word.meaning}。${word.note}`, ...extra };
    if (question.options) question.options = vocabularyShuffle(question.options, id);
    questions.push(question);
  };
  for (const item of words) {
    if (optionsFor(item, 'meaning').length > 1) add('meaning', item, { prompt: `“${item.word}”在本课中是什么意思？`, answer: item.meaning, options: optionsFor(item, 'meaning') });
    else { const missing = missingLetters(item.word, lesson.id); if (missing) add('missing', item, { ...missing, prompt: `补全“${item.meaning}”的拼写，只填缺少的 ${missing.positions.length} 个字母。` }); }
  }
  const spellingWord = words.find(item => missingLetters(item.word, lesson.id));
  if (spellingWord && words.length > 1 && !questions.some(q => q.kind === 'missing' && q.word === spellingWord.word)) {
    const missing = missingLetters(spellingWord.word, lesson.id);
    add('missing', spellingWord, { ...missing, prompt: `补全“${spellingWord.meaning}”的拼写，只填缺少的 ${missing.positions.length} 个字母（从左到右）。${language === 'fr' ? '保留重音符号；冠词已给出。' : ''}` });
  }
  const pictureWord = words.find(item => pictureForEntry(item, language));
  if (pictureWord && words.length > 1) {
    const picture = pictureForEntry(pictureWord, language);
    // Exclude aliases that depict the same object, even when their translations differ.
    const options = optionsFor(pictureWord, 'word', words.filter(item => item === pictureWord || pictureForWord(item.word, language)?.key !== picture.key));
    if (options.length > 1) add('picture', pictureWord, { prompt: '看图，选出对应的词。', answer: pictureWord.word, options, picture });
  }
  const contextWord = words.find(item => item.context);
  if (contextWord && optionsFor(contextWord, 'word').length > 1) add('context', contextWord, { prompt: `按本课句子的意思，选择表示“${contextWord.meaning}”的词来补全句子。`, masked: contextWord.context.masked, answer: contextWord.word, options: optionsFor(contextWord, 'word'), explanation: `${contextWord.context.sentence} 这里的 ${contextWord.word} 表示“${contextWord.meaning}”。${contextWord.note}` });
  if (!questions.length) throw new Error(`${lesson.id}: vocabulary needs at least two terms or a spellable word.`);
  const signature = String(hash(JSON.stringify(questions)));
  return { lessonId: lesson.id, language, words, questions, signature, fallback: words.some(item => item.source === 'chapter-recap') };
}
export function vocabularyAnswerCorrect(question, value) {
  return typeof value === 'string' && canonical(value) === canonical(question.answer);
}
export function normalizeVocabularyState(check, value, legacyCompleted = false) {
  const saved = object(value), same = saved.version === VOCABULARY_VERSION && saved.signature === check.signature;
  const answers = Object.fromEntries(check.questions.filter(q => same && typeof saved.answers?.[q.id] === 'string').map(q => [q.id, saved.answers[q.id]]));
  const cleared = check.questions.filter(q => same && Array.isArray(saved.cleared) && saved.cleared.includes(q.id) && vocabularyAnswerCorrect(q, answers[q.id])).map(q => q.id);
  const mistakes = Object.fromEntries(check.questions.filter(q => same && Number.isInteger(saved.mistakes?.[q.id]) && saved.mistakes[q.id] > 0).map(q => [q.id, Math.min(saved.mistakes[q.id], 999)]));
  return { version: VOCABULARY_VERSION, signature: check.signature, mainPassed: saved.mainPassed === true || legacyCompleted, mainScore: Number.isFinite(saved.mainScore) ? Math.max(0, Math.min(100, saved.mainScore)) : 100, studied: same && saved.studied === true, answers, cleared, mistakes, review: same && check.questions.some(q => q.id === saved.review) ? saved.review : '', completed: same && saved.completed === true };
}
export function applyVocabularyAnswer(check, state, questionId, answer) {
  const question = check.questions.find(q => q.id === questionId);
  if (!question) throw new Error('Unknown vocabulary question.');
  if (!state.mainPassed || !state.studied) throw new Error('Complete the lesson and recap before its vocabulary check.');
  const next = structuredClone(state); next.answers[question.id] = String(answer ?? '');
  const correct = vocabularyAnswerCorrect(question, answer);
  if (correct) { if (!next.cleared.includes(question.id)) next.cleared.push(question.id); next.review = ''; }
  else { next.cleared = next.cleared.filter(id => id !== question.id); next.mistakes[question.id] = (next.mistakes[question.id] ?? 0) + 1; next.review = question.id; }
  return { state: next, correct };
}
export const vocabularyPassed = (check, state) => state.mainPassed && state.studied && check.questions.every(q => state.cleared.includes(q.id) && vocabularyAnswerCorrect(q, state.answers[q.id]));

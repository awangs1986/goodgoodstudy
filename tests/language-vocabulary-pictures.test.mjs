import test from 'node:test';
import assert from 'node:assert/strict';
import { pictureForWord } from '../web/courses/shared/vocabulary-pictures.mjs';

const entries = [
  ['umbrella', 'un parapluie', '雨伞'], ['coat', 'le manteau', '外套'],
  ['pen', 'un stylo', '钢笔'], ['watch', 'la montre', '手表'],
  ['book', 'le livre', '书'], ['apple', 'une pomme', '苹果'],
  ['bicycle', 'le vélo', '自行车'], ['key', 'la clé', '钥匙'],
  ['chair', 'une chaise', '椅子'], ['table', 'la table', '桌子'],
  ['fish', 'le poisson', '鱼'], ['guitar', 'la guitare', '吉他'],
  ['train', 'le train', '火车'], ['banana', 'une banane', '香蕉'],
];

test('fourteen standalone objects have deliberate English and French mappings', () => {
  const drawings = new Set();
  for (const [word, french] of entries) {
    const picture = pictureForWord(word, 'en');
    assert.deepEqual(Object.keys(picture).sort(), ['description', 'key', 'svg']);
    assert.equal(picture.key, word);
    assert.deepEqual(pictureForWord(french, 'fr'), picture, french);
    assert.deepEqual(pictureForWord(french.split(' ').slice(1).join(' '), 'fr'), picture);
    assert.deepEqual(pictureForWord(word, 'english'), picture);
    assert.deepEqual(pictureForWord(french, 'french'), picture);
    drawings.add(picture.svg);
  }
  assert.equal(drawings.size, 14, 'different objects must not reuse an ambiguous picture');
  assert.deepEqual(pictureForWord('bike', 'en'), pictureForWord('bicycle', 'en'));
  assert.deepEqual(pictureForWord('une bicyclette', 'fr'), pictureForWord('bicycle', 'en'));
  assert.deepEqual(pictureForWord('la clef', 'fr'), pictureForWord('key', 'en'));
});

test('normalization preserves French accents and articles rather than guessing nouns', () => {
  assert.deepEqual(pictureForWord('  UNE   POMME  ', 'FR'), pictureForWord('apple', 'en'));
  assert.deepEqual(pictureForWord('le ve\u0301lo', 'fr'), pictureForWord('bicycle', 'en'));
  for (const wrong of ['la livre', 'une livre', 'le montre', 'un pomme', 'la poisson', 'le clé', 'la train', 'les pommes', 'velo']) {
    assert.equal(pictureForWord(wrong, 'fr'), null, wrong);
  }
});

test('related words, phrases, abstract meanings and unsupported languages never select props', () => {
  for (const wrong of ['pencil', 'write', 'time', 'clock', 'cold', 'winter', 'read', 'fruit', 'orange', 'ride', 'lock', 'door', 'sit', 'desk', 'piano', 'music', 'station', 'platform', 'coffee', 'tea', 'thank you', 'watch TV', 'a red apple', 'bookshop', 'trains', '__proto__', 'constructor', '<svg onload="alert(1)">']) {
    assert.equal(pictureForWord(wrong, 'en'), null, wrong);
  }
  for (const wrong of ['écrire', 'lire', 'la gare', 'la musique', 'du café', 'un café', 'un thé', 'montrer', 'le bureau', 'la pomme de terre', 'une pomme rouge', 'du poisson']) {
    assert.equal(pictureForWord(wrong, 'fr'), null, wrong);
  }
  assert.equal(pictureForWord('apple', 'fr'), null);
  assert.equal(pictureForWord('une pomme', 'en'), null);
  for (const language of ['de', 'zh', '', null, undefined, {}, 1]) assert.equal(pictureForWord('apple', language), null);
  for (const word of ['', null, undefined, {}, [], 1]) assert.equal(pictureForWord(word, 'en'), null);
});

test('pictures are self-contained inert SVG without labels or answer leakage', () => {
  for (const [word, french, meaning] of entries) {
    const { svg, description } = pictureForWord(word, 'en');
    assert.match(svg, /^<svg\b[^>]*viewBox="0 0 160 128"[^>]*>.*<\/svg>$/s);
    assert.match(svg, /aria-hidden="true"/);
    assert.match(svg, /focusable="false"/);
    assert.doesNotMatch(svg, /<(?:text|title|desc|foreignObject|script|image|use|a|style)\b/i);
    assert.doesNotMatch(svg, /\b(?:href|src|on\w+|aria-label|aria-labelledby|data-\w+)\s*=|url\s*\(|(?:javascript|data):/i);
    assert.doesNotMatch(svg.replace('xmlns="http://www.w3.org/2000/svg"', ''), /https?:\/\//i);
    assert.doesNotMatch(svg, /[\u3400-\u9fff]/);
    assert.ok(description.length >= 15, `${word} has a usable visual description`);
    for (const answer of [word, french, french.split(' ').at(-1), meaning]) {
      assert.ok(!description.toLowerCase().includes(answer), `${word}: description must not reveal ${answer}`);
      assert.ok(!svg.toLowerCase().includes(answer), `${word}: SVG must not reveal ${answer}`);
    }
  }
});

test('each result is independent and remains deterministic after caller mutation', () => {
  const expected = pictureForWord('apple', 'en');
  const changed = pictureForWord('apple', 'en');
  changed.description = 'changed';
  changed.svg = '<script />';
  changed.key = 'other';
  assert.deepEqual(pictureForWord('apple', 'en'), expected);
});

test('Book 2 concrete targets have twelve distinct original object drawings without answer text', () => {
  const words = ['postcard', 'parcel', 'diamond', 'boot', 'tent', 'mirror', 'snake', 'wheel', 'telescope', 'shark', 'balloon', 'ladder'];
  const drawings = new Set();
  for (const word of words) {
    const picture = pictureForWord(word, 'en');
    assert.equal(picture.key, word); assert.ok(picture.description.length >= 15);
    assert.doesNotMatch(picture.svg, /<(?:text|title|desc|foreignObject|script|image|use|a|style)\b/i);
    assert.doesNotMatch(picture.svg, /\b(?:href|src|on\w+|aria-label|aria-labelledby|data-\w+)\s*=|url\s*\(/i);
    assert.ok(!picture.svg.includes(word)); drawings.add(picture.svg);
  }
  assert.equal(drawings.size, 12);
  assert.deepEqual(pictureForWord('seat', 'en'), pictureForWord('chair', 'en'));
  assert.equal(pictureForWord('ring', 'en'), null, 'a verb or arena must not be drawn as jewellery');
});

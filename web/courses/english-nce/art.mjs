// English-only American adventure-comic artwork. The French kit stays independent.
// Original SVG paths; no filters, raster downloads or franchise art.
import { esc } from '../shared/comic-kit.mjs';
import { places } from './comic-places.mjs';
import { castNames, person, muddle } from './comic-cast.mjs';
import { props } from './comic-props.mjs';
export { places, castNames, muddle };

const INK = '#172338', PAPER = '#fff8e8';
const FONT = "'Arial','Noto Sans CJK SC','Microsoft YaHei',sans-serif";
export const propNames = Object.keys(props);
const rules = Object.entries(props).map(([name, [words]]) => [name, new RegExp(`(?<!\\p{L})(?:${words})(?!\\p{L})`, 'iu')]);
export function propsFor(text, limit = 2) {
  return rules.filter(([, rule]) => rule.test(text)).map(([name]) => name).slice(0, limit);
}
const skyProps = new Set(['sun', 'rain', 'snow', 'plane']);
const wallProps = new Set(['calendar', 'window', 'newspaper']);
// Keep sky props away from the platform/departure signs.
const skySpots = { station: [217, 127], airport: [339, 116], shop: [344, 129] };
const textWidth = (text, size) => [...String(text)].reduce((n, ch) => n + (/[^\u0000-\u00ff]/.test(ch) ? 1 : /[ilI.,!:' ]/.test(ch) ? .3 : .61) * size, 0);
const text = (x, y, value, size = 12, extra = '') => `<text x="${x}" y="${y}" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="${size}" fill="${INK}" ${extra}>${esc(value)}</text>`;

// Break at words when possible, then at characters for CJK and long vocabulary.
function speechLines(value, size) {
  const tokens = String(value).match(/[^\s\u3000-\u9fff\uff00-\uffef]+|[\u3000-\u9fff\uff00-\uffef]|\s+/gu) ?? [];
  const lines = [''];
  for (const token of tokens) {
    if (textWidth(lines.at(-1) + token, size) <= 202) lines[lines.length - 1] += token;
    else if (textWidth(token, size) <= 202) lines.push(token.trimStart());
    else for (const char of token) {
      if (textWidth(lines.at(-1) + char, size) > 202) lines.push('');
      lines[lines.length - 1] += char;
    }
  }
  return lines.map(line => line.trim()).filter(Boolean);
}
function speech(value, tailX) {
  let size = 12.5, lines = speechLines(value, size);
  while (lines.length > 3 && size > 9) { size -= .5; lines = speechLines(value, size); }
  const height = Math.max(29, 13 + lines.length * (size + 2));
  const width = Math.min(232, Math.max(76, ...lines.map(line => textWidth(line, size) + 24)));
  const left = Math.max(10, Math.min(386 - width, tailX - 35));
  const bottom = 9 + height;
  const tail = Math.max(left + 18, Math.min(left + width - 18, tailX));
  return `<g data-comic-layer="speech"><path d="M${left + 12} 9 H${left + width - 12} Q${left + width} 9 ${left + width} 21 V${bottom - 11} Q${left + width} ${bottom} ${left + width - 12} ${bottom} H${tail + 13} L${tail - 3} ${bottom + 13} L${tail + 1} ${bottom} H${left + 12} Q${left} ${bottom} ${left} ${bottom - 11} V21 Q${left} 9 ${left + 12} 9Z" fill="${PAPER}" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>${lines.map((line, i) => text(left + width / 2, 27 + i * (size + 2), line, size)).join('')}</g>`;
}
let serial = 0;
/** Same scene API and viewBox as the shared kit; only the English drawing changes. */
export function comicPanel(scene = {}) {
  const id = `en-comic-${++serial}`;
  const place = places[scene.place] ? scene.place : 'street';
  const people = (scene.cast?.length ? scene.cast : ['leo']).slice(0, scene.villain ? 2 : 3);
  const slots = people.length === 1 ? [87] : people.length === 2 ? [76, 316] : [65, 200, 334];
  const peopleSvg = people.map((who, i) => {
    const x = scene.villain && i === 1 ? 195 : slots[i];
    const key = castNames[who] ? who : 'leo';
    return person(key, x, { pose: i === 0 ? (scene.pose ?? 'wave') : 'stand', flip: x > 200, mood: scene.mood ?? 'happy' });
  }).join('');
  const items = (scene.props ?? []).filter(name => props[name]).slice(0, 3);
  const floorSpots = scene.villain ? [[172, 210], [226, 211], [269, 211]] : people.length === 1 ? [[211, 209], [284, 209], [352, 209]] : people.length === 2 ? [[174, 211], [234, 211], [267, 211]] : [[129, 214], [267, 214], [373, 214]];
  let floorIndex = 0, skyIndex = 0, wallIndex = 0;
  const propSvg = items.map(name => {
    const inSky = skyProps.has(name), onWall = wallProps.has(name);
    const [x, y] = inSky ? [(skySpots[place]?.[0] ?? 345) - skyIndex++ * 66, skySpots[place]?.[1] ?? 101] : onWall ? [194 + wallIndex++ * 63, 134] : floorSpots[floorIndex++];
    const scale = inSky || onWall ? .94 : people.length === 3 || scene.villain ? .9 : 1.08;
    return `<g data-prop="${esc(name)}" transform="translate(${x} ${y}) scale(${scale})">${props[name][1]()}</g>`;
  }).join('');
  const captionValue = String(scene.caption ?? '');
  const captionSize = Math.min(11.5, 365 / Math.max(1, textWidth(captionValue, 1)));
  const caption = captionValue ? `<g data-comic-layer="caption"><path d="M5 221 H395 V245 H5Z" fill="${PAPER}" stroke="${INK}" stroke-width="2.5"/><path d="M5 221 H17 V245 H5Z" fill="#f4c542"/>${text(203, 237.5, captionValue, captionSize)}</g>` : '';
  const burstX = ({ station: 222, airport: 216, shop: 184 })[place] ?? 344;
  const burst = scene.burst ? `<g data-comic-layer="burst" transform="translate(${burstX} 46)"><path d="M-39 -11 L-23 -15 L-25 -30 L-7 -23 L3 -36 L10 -21 L29 -27 L25 -10 L42 -4 L28 6 L36 21 L16 19 L9 33 L-1 21 L-20 30 L-20 13 L-39 10 L-28 0Z" fill="#f4c542" stroke="${INK}" stroke-width="2.8" stroke-linejoin="miter"/>${text(1, 5, scene.burst, Math.min(13, 64 / Math.max(1, textWidth(scene.burst, 1))))}</g>` : '';
  const label = scene.label ?? '英语课程美漫插图';
  return `<svg class="comic-panel" data-art-style="american-comic" viewBox="0 0 400 250" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg">
<defs><pattern id="${id}-dots" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".85" fill="${INK}" opacity=".17"/></pattern><clipPath id="${id}-clip"><rect x="4" y="4" width="392" height="242"/></clipPath></defs>
<desc>${esc(`${label}。${people.map(who => castNames[who] ?? castNames.leo).join('、')}${scene.villain ? '、Mr Muddle' : ''}${items.length ? `；${items.join('、')}` : ''}`)}</desc>
<g clip-path="url(#${id}-clip)"><g data-comic-layer="place" data-place="${esc(place)}">${places[place]()}</g><path d="M0 0 H400 V88 L0 153Z" fill="url(#${id}-dots)"/>${scene.villain ? muddle(333, 216, .94) : ''}${peopleSvg}${propSvg}${scene.bubble ? speech(scene.bubble, slots[0] + 6) : ''}${burst}${caption}</g>
<path d="M4 4 H396 V246 H4Z" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="miter"/></svg>`;
}

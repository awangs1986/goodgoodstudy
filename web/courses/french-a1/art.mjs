// Français · Paris en BD. PNG scenery, transparent original cast/props and live HTML text.
// This renderer is intentionally independent of the English/shared SVG drawing kit.
import { cast, villain, propNames, keywords, skyProps, wallProps, skySpots, placeLabels } from './art-manifest.mjs';
export { propNames, placeLabels, PLACE_WORDS } from './art-manifest.mjs';

export const VILLAIN = 'Gribouille 先生';
export const castNames = Object.fromEntries(Object.entries(cast).map(([key, person]) => [key, person.name]));
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const has = (object, key) => Object.hasOwn(object, key);
const knownProps = new Set(propNames);
const baseUrl = import.meta.env?.BASE_URL ?? './';

// Use Vite's deployment base, not an origin-root URL or import.meta.url (bundles live in assets/).
// Merely importing the manifest creates no Image, fetch, preload, or CSS image request.
export function illustrationUrl(group, key, base = baseUrl) {
  const allowed = group === 'places' ? has(placeLabels, key)
    : group === 'props' ? knownProps.has(key)
    : group === 'characters' && /^[a-z][a-z0-9-]*$/i.test(key);
  if (!allowed) throw new Error(`Unknown French illustration: ${group}/${key}`);
  return `${String(base).replace(/\/?$/, '/')}art/french-illustrations/${group}/${key}.png`;
}
function image(group, key, className, attributes = '') {
  return `<img class="${className}" src="${esc(illustrationUrl(group, key))}" alt="" aria-hidden="true" loading="lazy" decoding="async" draggable="false" ${attributes}>`;
}
// Retain the public places API, including callable entries, without SVG dependencies.
export const places = Object.fromEntries(Object.keys(placeLabels).map(key => [key, () => image('places', key, 'fr-comic-background', 'width="1600" height="1000"')]));
const rules = propNames.filter(key => keywords[key]).map(key => [key, new RegExp(`(?<!\\p{L})(?:${keywords[key]})(?!\\p{L})`, 'iu')]);
export function propsFor(text, limit = 2) {
  const found = [];
  for (const [key, rule] of rules) if (rule.test(text) && !found.includes(key)) found.push(key);
  return found.slice(0, limit);
}

const number = value => Number(value.toFixed(4));
const point = (x, y, scale = 1) => `data-x="${x}" data-y="${y}" data-scale="${scale}" style="--fr-x:${number(x / 4)}%;--fr-y:${number(y / 2.5)}%;--fr-scale:${scale}"`;
function character(key, x, { pose = 'stand', mood = 'happy', flip = false, isVillain = false } = {}) {
  const person = isVillain ? villain : cast[key];
  const variants = person.variants ?? {};
  const specific = `${pose}:${mood}`;
  const sprite = has(variants, specific) ? variants[specific] : has(variants, pose) ? variants[pose] : person.sprite;
  const attributes = `data-character="${key}" data-pose="${esc(pose)}" data-mood="${esc(mood)}" data-flip="${flip}" ${point(x, 236, person.scale ?? 1)}`;
  return `<span class="fr-comic-character${isVillain ? ' fr-comic-villain' : ''}" ${attributes}>${image('characters', sprite, 'fr-comic-sprite', 'width="600" height="900"')}</span>`;
}
function prop(key, x, y, scale) {
  const kind = skyProps.has(key) ? 'sky' : wallProps.has(key) ? 'wall' : 'floor';
  return `<span class="fr-comic-prop" data-prop="${key}" data-placement="${kind}" ${point(x, y, scale)}>${image('props', key, 'fr-comic-object', 'width="512" height="512"')}</span>`;
}
const textWidth = text => [...String(text)].reduce((sum, char) => sum + (char.charCodeAt(0) > 255 ? 13 : 7.4), 0);
function bubble(text, x, tailX) {
  const width = Math.min(230, Math.max(70, textWidth(text) + 24));
  const left = Math.max(8, Math.min(392 - width, x - width / 2));
  const tail = Math.max(12, Math.min(width - 16, tailX - left));
  return `<span class="fr-comic-bubble" style="left:${number(left / 4)}%;width:${number(width / 4)}%;--fr-tail:${number(tail / width * 100)}%">${esc(text)}</span>`;
}
/** Compose one 400×250 panel, preserving the existing scene and placement contract. */
export function comicPanel(scene = {}) {
  const place = has(places, scene.place) ? scene.place : 'rue';
  const people = (scene.cast?.length ? scene.cast : ['lea']).slice(0, scene.villain ? 2 : 3);
  const slots = people.length === 1 ? [110] : people.length === 2 ? [90, 310] : [70, 200, 330];
  const peopleHtml = people.map((who, index) => character(has(cast, who) ? who : 'lea', scene.villain && index === 1 ? 200 : slots[index], {
    pose: index === 0 ? (scene.pose ?? 'wave') : 'stand',
    flip: slots[index] > 200 && !(scene.villain && index === 1), mood: scene.mood ?? 'happy'
  })).join('');
  const items = (scene.props ?? []).filter(key => knownProps.has(key)).slice(0, 3);
  const floorSpots = people.length === 1 ? [[230, 222], [310, 222], [370, 222]]
    : people.length === 2 ? [[200, 224], [160, 230], [244, 230]] : [[135, 230], [265, 230], [380, 232]];
  let floorIndex = 0;
  const propsHtml = items.map(key => skyProps.has(key) ? prop(key, ...(skySpots[place] ?? [350, 98, 1.1]))
    : wallProps.has(key) ? prop(key, 200, 120, 1.1)
    : prop(key, ...floorSpots[floorIndex++ % floorSpots.length], people.length === 1 ? 1.5 : 1.2)).join('');
  const speech = scene.bubble ? bubble(scene.bubble, slots[0] + 40, slots[0] + 8) : '';
  const burst = scene.burst ? `<span class="fr-comic-burst"><span>${esc(scene.burst)}</span></span>` : '';
  const caption = scene.caption ? `<span class="fr-comic-caption">${esc(scene.caption)}</span>` : '';
  return `<div class="comic-panel fr-comic-panel" data-place="${place}" role="img" aria-label="${esc(scene.label ?? '漫画插图')}"><div class="fr-comic-layers" aria-hidden="true">${places[place]()}${propsHtml}${scene.villain ? character('gribouille', 330, { isVillain: true }) : ''}${peopleHtml}${speech}${burst}${caption}</div></div>`;
}

// Dev helper: before/after-style stills for the French sun vs PHARMACIE sign and the tug-of-war frame edges.
import { chromium } from 'playwright';
import path from 'node:path';
import { comicPanel } from '../web/courses/french-a1/art.mjs';
import { renderFrame } from '../web/courses/physics/anims.mjs';
const out = process.env.SHOTS ?? '/workspace/graycrown/shots';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1300, height: 560 } });
const cell = (svg, label) => `<figure style="margin:8px;width:400px"><div style="width:400px">${svg}</div><figcaption style="font:14px sans-serif">${label}</figcaption></figure>`;
const frames = ['pharmacie', 'cafe', 'boulangerie'].map(place => cell(comicPanel({ place, props: ['sun'], cast: ['lea'], label: place }), `${place} + sun`));
await page.setContent(`<div style="display:flex;flex-wrap:wrap">${frames.join('')}</div>`);
await page.screenshot({ path: path.join(out, 'fix-french-sun-pharmacie.png'), fullPage: true });
const tug = [200, 300, 400].map(v => cell(`<svg viewBox="0 0 400 220" style="width:400px;border:2px solid #c00">${renderFrame('tug-of-war', 4, v)}</svg>`, `右队 ${v} N, t=4s`));
await page.setContent(`<div style="display:flex;flex-wrap:wrap">${tug.join('')}</div>`);
// Every drawn element must sit inside the 400×220 viewBox.
const overflow = await page.evaluate(() => [...document.querySelectorAll('svg')].map(s => { const b = s.getBBox(); return [b.x, b.x + b.width]; }));
console.log('tug bbox x-range', JSON.stringify(overflow));
await page.screenshot({ path: path.join(out, 'fix-physics-tug-of-war.png'), fullPage: true });
await browser.close();

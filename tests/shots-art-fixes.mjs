// Dev helper: before/after-style stills for the French sun vs PHARMACIE sign and the tug-of-war frame edges.
// Run only in an environment where the repository's Playwright/browser workflow is available.
import { chromium } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { comicPanel } from '../web/courses/french-a1/art.mjs';
import { renderFrame } from '../web/courses/physics/anims.mjs';
const out = path.resolve(process.env.SHOTS ?? '/workspace/graycrown/shots');
await mkdir(out, { recursive: true });
const publicBase = new URL('../web/public/', import.meta.url).href;
const frenchCss = await readFile(new URL('../web/courses/french-a1/french.css', import.meta.url), 'utf8');
const cell = (html, label) => `<figure style="margin:8px;width:400px"><div style="width:400px">${html}</div><figcaption style="font:14px sans-serif">${label}</figcaption></figure>`;
const frames = ['pharmacie', 'cafe', 'boulangerie'].map(place => cell(comicPanel({ place, props: ['sun'], cast: ['lea'], label: place }), `${place} + sun`));
// An about:blank setContent document cannot resolve the renderer's relative public URLs.
// A local HTML document plus an absolute public base supports PNGs without a dev server.
const preview = path.join(out, 'fix-french-sun-pharmacie.html');
await writeFile(preview, `<!doctype html><html><head><meta charset="utf-8"><base href="${publicBase}"><style>${frenchCss}</style></head><body><div style="display:flex;flex-wrap:wrap">${frames.join('')}</div></body></html>`);
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
try {
  const page = await browser.newPage({ viewport: { width: 1300, height: 560 } });
  await page.goto(pathToFileURL(preview).href);
  await page.waitForFunction(() => document.images.length > 0 && [...document.images].every(img => img.complete && img.naturalWidth > 0), null, { timeout: 15000 });
  await page.screenshot({ path: path.join(out, 'fix-french-sun-pharmacie.png'), fullPage: true });
  const tug = [200, 300, 400].map(v => cell(`<svg viewBox="0 0 400 220" style="width:400px;border:2px solid #c00">${renderFrame('tug-of-war', 4, v)}</svg>`, `右队 ${v} N, t=4s`));
  await page.setContent(`<div style="display:flex;flex-wrap:wrap">${tug.join('')}</div>`);
  // Every drawn element must sit inside the 400×220 viewBox.
  const overflow = await page.evaluate(() => [...document.querySelectorAll('svg')].map(s => { const b = s.getBBox(); return [b.x, b.x + b.width]; }));
  console.log('tug bbox x-range', JSON.stringify(overflow));
  await page.screenshot({ path: path.join(out, 'fix-physics-tug-of-war.png'), fullPage: true });
} finally {
  await browser.close();
}

// Dev helper: screenshots for the small visual fixes (figure labels, back button under sticky nav, French sun, tug-of-war).
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdtemp, mkdir, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { lessons as cLessons } from '../web/courses/c/course.mjs';
import { lessons as csLessons } from '../web/courses/csharp/course.mjs';
import { lessons as frLessons } from '../web/courses/french-a1/course.mjs';
import { lessons as enLessons } from '../web/courses/english-nce/course.mjs';
import { lessons as phLessons } from '../web/courses/physics/course.mjs';
const root = process.cwd(), out = process.env.SHOTS ?? '/workspace/graycrown/shots';
const before = (list, id) => list.slice(0, list.findIndex(l => l.id === id)).map(l => l.id);
async function session(course, save, act, width = 1440) {
  const dir = await mkdtemp(path.join(tmpdir(), 'shots-')); await mkdir(path.join(dir, 'save'));
  await symlink(path.join(root, 'data/app'), path.join(dir, 'app'), 'dir');
  await writeFile(path.join(dir, 'save/progress.json'), JSON.stringify(save === undefined ? { version: 3, language: 'zh-CN', activeCourseId: 'c', courses: {} } : { version: 3, language: 'zh-CN', activeCourseId: course, courses: { [course]: save } }));
  const server = spawn(path.join(root, 'target/debug/gray-crown-launcher'), ['--data-dir', dir, '--no-open']); let log = '';
  server.stdout.on('data', d => log += d); server.stderr.on('data', d => log += d);
  while (!/http:\/\/127\.0\.0\.1:\d+\//.test(log)) await new Promise(r => setTimeout(r, 100));
  const url = log.match(/http:\/\/127\.0\.0\.1:\d+\//)[0];
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  try { await page.goto(url); await page.locator('.course-card').first().waitFor(); await page.waitForLoadState('networkidle'); await page.waitForTimeout(800); await act(page); }
  finally { await browser.close(); server.kill(); }
}
async function checkBack(page, sel, name) {
  // Reproduce what the players do when a lesson opens: scroll the lesson container to the top edge.
  // C: scroll as far as the page allows (focus in the editor does this); the others scroll their lesson container to the top edge.
  await page.evaluate(() => { const m = document.querySelector('.learn-main, .ph-main, .om-main'); if (m) m.scrollIntoView({ block: 'start' }); else window.scrollTo(0, 1e6); });
  await page.waitForTimeout(300);
  const nav = await page.locator('.course-navigation').boundingBox();
  const btn = sel ? await page.locator(sel).first().boundingBox() : null;
  console.log(name, 'nav bottom', nav && nav.y + nav.height, 'back top', btn && btn.y);
  if (btn && nav && btn.y < nav.y + nav.height) throw new Error(name + ': back button under nav');
  await page.screenshot({ path: path.join(out, `fix-back-${name}.png`) });
}
async function openC(page, id) {
  await page.locator('.course-card[data-course-id="c"] button').click();
  await page.locator('#continueBtn').click(); await page.locator('#mapView').waitFor();
  const node = page.locator(`#questPath button[title^="${id} "]`);
  for (let i = 0; i < 10 && !(await node.count()); i++) { await page.locator('#nextChapterBtn').click(); await page.waitForTimeout(200); }
  await node.click(); await page.locator('#questTeach').waitFor(); await page.waitForTimeout(600);
}
async function shared(page, course, id) {
  await page.locator(`.course-card[data-course-id="${course}"] button`).click(); await page.waitForTimeout(1500); await page.screenshot({ path: '/tmp/dbg.png' }); await page.locator('.adventure-prologue, .adventure-map').first().waitFor({ timeout: 8000 });
  if (await page.locator('.adventure-prologue').count()) await page.getByRole('button', { name: /踏上旅途|继续远征/ }).click();
  await page.locator('.adventure-map').waitFor();
  await page.locator(`.adventure-node[data-lesson-id="${id}"]`).click(); await page.waitForTimeout(1000);
}
const which = process.argv.slice(2), want = k => !which.length || which.includes(k);
const cSave = id => ({ version: 2, started: true, gold: 10, completed: before(cLessons, id), currentQuestId: id });
if (want('fig')) for (const [id, f] of [['D7-N01', 'pointer-box'], ['D7-N03', 'x'], ['C0-Q02', 'y']]) {
  const l = cLessons.find(x => x.id === id); if (!l) continue;
  await session('c', cSave(id), async page => { await openC(page, id); const fig = page.locator('#teachBody .lesson-figure').first();
    if (await fig.count()) { const px = await fig.evaluate(f => { const s = f.querySelector('svg'); if (!s) return null; const r = s.getBoundingClientRect(); const t = s.querySelector('text'); return r.width / s.viewBox.baseVal.width * parseFloat(getComputedStyle(t).fontSize); });
      console.log(id, 'first label px', px); await fig.screenshot({ path: path.join(out, `fix-figure-${id}.png`) }); } });
}
if (want('figall')) {
  const ids = cLessons.filter(l => l.figure && l.figure !== 'error-c').map(l => [l.id, l.figure]);
  const seen = new Set();
  for (const [id, f] of ids) { if (seen.has(f)) continue; seen.add(f);
    await session('c', cSave(id), async page => { await openC(page, id); const fig = page.locator('#teachBody .lesson-figure').first();
      const min = await fig.evaluate(f => { const s = f.querySelector('svg'); const k = s.getBoundingClientRect().width / s.viewBox.baseVal.width; return Math.min(...[...s.querySelectorAll('text')].map(t => parseFloat(getComputedStyle(t).fontSize) * k)); });
      console.log(f, id, 'min label px', min.toFixed(1)); await fig.screenshot({ path: path.join(out, `fix-figure-${f}.png`) }); }); }
}
if (want('back')) { if (!process.env.SKIPC)
  await session('c', cSave('D2-IN2'), async page => { await openC(page, 'D2-IN2'); await checkBack(page, '#backToMapBtn', 'c'); });
  for (const [course, list, save] of [['french-a1', frLessons, l => undefined], ['csharp', csLessons, l => undefined],
    ['french-a1', frLessons, l => undefined],
    ['english-nce', enLessons, l => undefined]])
    await session(course, save(list), async page => { await shared(page, course, list[0].id); await checkBack(page, 'button:has-text("返回区域地图")', course); });
  for (const course of ['physics', 'olympiad']) await session(course, { version: 1 }, async page => { await page.locator(`.course-card[data-course-id="${course}"] button`).click(); await page.waitForTimeout(1500); await checkBack(page, null, course); });
}
console.log('shots done');

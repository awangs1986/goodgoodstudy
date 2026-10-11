// Dev helper: screenshots for the beginner C / C# PR. Uses disposable data dirs.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdtemp, mkdir, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { lessons as cLessons } from '../web/courses/c/course.mjs';
import { lessons as csLessons } from '../web/courses/csharp/course.mjs';
const root = process.cwd(), out = process.env.SHOTS ?? '/workspace/graycrown/shots';
const before = (list, id) => list.slice(0, list.findIndex(l => l.id === id)).map(l => l.id);
async function session(course, save, act) {
  const dir = await mkdtemp(path.join(tmpdir(), 'shots-')); await mkdir(path.join(dir, 'save'));
  await symlink(path.join(root, 'data/app'), path.join(dir, 'app'), 'dir');
  await writeFile(path.join(dir, 'save/progress.json'), JSON.stringify({ version: 3, language: 'zh-CN', activeCourseId: course, courses: { [course]: save } }));
  const server = spawn(path.join(root, 'target/debug/gray-crown-launcher'), ['--data-dir', dir, '--no-open']); let log = '';
  server.stdout.on('data', d => log += d); server.stderr.on('data', d => log += d);
  while (!/http:\/\/127\.0\.0\.1:\d+\//.test(log)) await new Promise(r => setTimeout(r, 100));
  const url = log.match(/http:\/\/127\.0\.0\.1:\d+\//)[0];
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  try { await page.goto(url); await page.locator('.course-card').first().waitFor(); await act(page); }
  finally { await browser.close(); server.kill(); }
}
const cSave = id => ({ version: 2, started: true, gold: 10, completed: before(cLessons, id), currentQuestId: id });
async function openC(page, file, id) {
  await page.locator('.course-card[data-course-id="c"] button').click();
  await page.locator('#continueBtn').click();
  await page.locator('#mapView').waitFor();
  const node = page.locator(`#questPath button[title^="${id} "]`);
  for (let i = 0; i < 10 && !(await node.count()); i++) { await page.locator('#nextChapterBtn').click(); await page.waitForTimeout(200); }
  await node.click();
  await page.waitForTimeout(800); await page.screenshot({ path: '/tmp/shot-debug.png' });
  await page.locator('#questTeach').waitFor(); await page.waitForTimeout(600);
  await page.locator('#questPanel').screenshot({ path: path.join(out, file) });
}
const which = process.argv.slice(2);
const all = !which.length;
if (all || which.includes('shelf')) await session('c', cSave('C0-Q01'), async page => { await page.locator('#courseCards').screenshot({ path: path.join(out, 'beginner-shelf.png') }); });
if (all || which.includes('c0')) await session('c', cSave('C0-Q01'), page => openC(page, 'beginner-lesson0-c.png', 'C0-Q01'));
if (all || which.includes('teach')) await session('c', cSave('D2-IN2'), page => openC(page, 'beginner-c-teach.png', 'D2-IN2'));
if (all || which.includes('pointer')) await session('c', cSave('D7-N01'), page => openC(page, 'beginner-pointer-diagram.png', 'D7-N01'));
if (all || which.includes('fix')) await session('c', cSave('D6-N04'), page => openC(page, 'beginner-fix-the-bug.png', 'D6-N04'));
if (all || which.includes('cs0')) await session('csharp', { version: 1, currentLessonId: 'cs00-02', completed: ['cs00-01'], drafts: {} }, async page => {
  await page.locator('.course-card[data-course-id="csharp"] button').click(); await page.locator('.adventure-prologue').waitFor();
  await page.getByRole('button', { name: /踏上旅途|继续远征/ }).click(); await page.locator('.adventure-map').waitFor();
  await page.locator('.adventure-node[data-lesson-id="cs00-02"]').click(); await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(out, 'beginner-lesson0-csharp.png') });
});
console.log('shots done');

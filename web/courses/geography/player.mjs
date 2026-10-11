// 大航海地理 · 播放器。航海图为 Natural Earth 渲染的 PNG，航线与船只用 <canvas> 实时绘制（栅格，不用 SVG）。
import './geo.css';
import { createProgress, unlocked } from '../shared/progress.mjs';
import { gradeChoice, shuffled } from '../shared/rules-course.mjs';
import { chapters, lessons, ports, portById, credits, routes } from './course.mjs';
import { MAP, SHIPS, SUPPLY_PRICE, QUIZ_REWARD, freshVoyage, normalizeVoyage, goodById, sellPrice, neighbors, plan, routePoints, monthName, portLesson } from './voyage.mjs';

const el = (tag, text, className) => { const n = document.createElement(tag); if (text != null) n.textContent = text; if (className) n.className = className; return n; };
const btn = (text, action, className = 'gv-btn') => { const n = el('button', text, className); n.type = 'button'; n.addEventListener('click', action); return n; };
const img = (src, alt, className) => { const i = el('img', null, className); i.src = src; i.alt = alt; i.loading = 'lazy'; i.decoding = 'async'; return i; };
const ART = './art/geography';
const reducedMotion = () => globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const TABS = [['map', '🗺 航海图'], ['port', '⚓ 港口'], ['school', '📘 航海学堂'], ['market', '🛒 市场'], ['dock', '🔧 船坞'], ['finds', '💎 发现物'], ['log', '📜 航海日志']];
const fmtLat = (lat, lon) => `${Math.abs(lat).toFixed(1)}°${lat >= 0 ? 'N' : 'S'}，${Math.abs(lon).toFixed(1)}°${lon >= 0 ? 'E' : 'W'}`;

export async function mount(root, context) {
  root.innerHTML = `<section class="geo-voyage"><header class="gv-header">
    <div class="gv-brand"><p class="gv-eyebrow">大航海地理 · 环游世界</p><h1>扬帆世界 42 港</h1><p class="gv-sub"></p></div>
    <div class="gv-stats" aria-live="polite"></div>
    <div class="gv-meter-wrap"><div class="gv-meter" role="progressbar" aria-label="课程进度" aria-valuemin="0" aria-valuemax="100"><span></span></div><span class="gv-meter-label"></span><button type="button" class="gv-btn ghost gv-credits-btn">资料来源与版权</button></div>
  </header><nav class="gv-tabs" role="tablist"></nav><p class="gv-status" role="status"></p><main class="gv-main"></main></section>`;
  const $ = s => root.querySelector(s);
  const status = $('.gv-status');
  const report = error => { status.textContent = error.message; status.classList.add('error'); };
  const progress = createProgress(context, lessons, report);
  const S = () => progress.state;
  let V = normalizeVoyage(S().voyage); if (!S().voyage || !Object.keys(S().voyage).length) V = freshVoyage();
  let tab = 'map', selected = null, sailing = false, schoolLesson = null, busy = false, chartImage;
  const save = async () => { S().voyage = V; S().started = true; busy = true; try { await progress.persist(); } catch (e) { report(e); } finally { busy = false; } };
  const done = id => S().completed.includes(id);
  const isOpen = lesson => unlocked(lessons, S(), lessons.indexOf(lesson));
  const portOpen = id => isOpen(portLesson(id));
  const say = (text, kind = '') => { status.textContent = text; status.className = `gv-status ${kind}`; };
  const addLog = text => { V.log.push({ day: V.day, text }); V.log = V.log.slice(-60); };
  $('.gv-sub').textContent = `${chapters.length} 大海区 · ${ports.length} 个港口 · ${lessons.length} 关 · 先学后测，通过港口测验才能解锁下一站`;

  function renderHeader() {
    const ship = SHIPS[V.ship - 1], pct = Math.round(S().completed.length / lessons.length * 100);
    const used = Object.values(V.cargo).reduce((a, b) => a + b, 0);
    $('.gv-stats').replaceChildren(...[['💰', `${V.gold} 金币`], ['🍞', `粮食 ${V.food}/${ship.supply}`], ['💧', `淡水 ${V.water}/${ship.supply}`], ['⛵', `${ship.name}（${used}/${ship.cargo} 货舱）`], ['📅', `第 ${V.day + 1} 天 · ${monthName(V.day)}`], ['📍', portById[V.at].name]].map(([i, t]) => { const s = el('span', null, 'gv-stat'); s.append(el('b', i), document.createTextNode(` ${t}`)); return s; }));
    $('.gv-meter').setAttribute('aria-valuenow', String(pct)); $('.gv-meter > span').style.width = `${pct}%`;
    $('.gv-meter-label').textContent = `已完成 ${S().completed.length} / ${lessons.length} · 发现物 ${V.discoveries.length} / ${ports.length}`;
    $('.gv-tabs').replaceChildren(...TABS.map(([id, label]) => { const b = btn(label, () => { if (!sailing) { tab = id; render(); } }, 'gv-tab'); b.setAttribute('role', 'tab'); b.dataset.tab = id; b.setAttribute('aria-selected', String(tab === id)); return b; }));
  }

  // ───── 测验（港口课与航海学堂共用）─────
  function renderQuiz(lesson, host, onPass) {
    const rec = S().responses[lesson.id] && typeof S().responses[lesson.id] === 'object' ? S().responses[lesson.id] : (S().responses[lesson.id] = {});
    rec.answers = rec.answers && typeof rec.answers === 'object' ? rec.answers : {};
    const box = el('section', null, 'gv-card gv-quiz'); box.dataset.lesson = lesson.id; box.append(el('p', lesson.kind === 'port' ? '第 2 步 · 港口测验' : '第 2 步 · 学堂小测', 'gv-step'));
    const checks = [];
    lesson.questions.forEach((q, i) => {
      const field = el('fieldset', null, 'gv-q'); field.dataset.questionId = q.id; field.append(el('legend', `${i + 1}. ${q.prompt}`));
      const opts = el('div', null, 'gv-opts');
      for (const option of shuffled(q.options, q.id)) {
        const label = el('label', null, 'gv-opt'), input = el('input'); input.type = 'radio'; input.name = q.id; input.value = option; input.checked = rec.answers[q.id] === option;
        input.addEventListener('change', () => { rec.answers[q.id] = option; progress.schedule(); });
        label.append(input, el('span', option)); opts.append(label);
      }
      const hint = el('p', `💡 ${q.hint}`, 'gv-hint'); hint.hidden = true;
      const fb = el('div', null, 'gv-fb'); fb.setAttribute('aria-live', 'polite');
      field.append(opts, btn('💡 提示', () => { hint.hidden = false; }, 'gv-btn ghost small'), hint, fb); box.append(field);
      checks.push(() => { const ok = gradeChoice(q, rec.answers[q.id]); field.classList.toggle('right', ok); field.classList.toggle('wrong', !ok); fb.replaceChildren(el('p', ok ? `✓ 答对了！${q.explanation}` : `✗ 再想想。📖 ${q.explanation}`)); return ok; });
    });
    const summary = el('p', null, 'gv-summary'); summary.setAttribute('role', 'status');
    box.append(btn('提交测验', async () => {
      if (busy) return; const res = checks.map(c => c()), right = res.filter(Boolean).length;
      S().attempts[lesson.id] = (Number(S().attempts[lesson.id]) || 0) + 1; S().scores[lesson.id] = Math.max(Number(S().scores[lesson.id]) || 0, Math.round(right / res.length * 100));
      if (right === res.length) { const first = !done(lesson.id); if (first) S().completed.push(lesson.id); summary.textContent = `全部答对（${right}/${res.length}）！`; summary.className = 'gv-summary pass'; onPass?.(first); }
      else { summary.textContent = `答对 ${right}/${res.length}。看看讲解，改正后再提交。`; summary.className = 'gv-summary retry'; }
      await save(); renderHeader();
    }, 'gv-btn primary gv-submit'), summary);
    host.append(box);
  }

  // ───── 航海图 ─────
  function project(lat, lon, w, h) { return [(lon + 180) / 360 * w, (MAP.latN - lat) / (MAP.latN - MAP.latS) * h]; }
  function drawPath(ctx, pts, w, h) { // 跨越 180° 经线时把线段拆开、两边各画一次
    for (const shift of [-360, 0, 360]) {
      ctx.beginPath(); let prev = null;
      for (const [lat, lon0] of pts) { let lon = lon0 + shift; if (prev != null) { while (lon - prev > 180) lon -= 360; while (lon - prev < -180) lon += 360; } const [x, y] = project(lat, lon, w, h); prev == null ? ctx.moveTo(x, y) : ctx.lineTo(x, y); prev = lon; }
      ctx.stroke();
    }
  }
  function drawChart(canvas, shipAt) {
    const ctx = canvas.getContext('2d'), w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h); if (chartImage?.complete) ctx.drawImage(chartImage, 0, 0, w, h);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (const [a, b] of routes) {
      const open = portOpen(a) && portOpen(b), here = (a === V.at || b === V.at) && open;
      ctx.setLineDash(open ? [10, 8] : [3, 9]); ctx.lineWidth = here ? 3.2 : 2; ctx.strokeStyle = here ? 'rgba(255,214,120,.95)' : open ? 'rgba(255,236,190,.55)' : 'rgba(200,210,230,.22)';
      drawPath(ctx, routePoints(a, b), w, h);
    }
    ctx.setLineDash([]);
    if (selected && selected !== V.at) { const p = routePoints(V.at, selected); if (p) { ctx.lineWidth = 4; ctx.strokeStyle = '#ffcf5a'; ctx.shadowColor = '#ffcf5a'; ctx.shadowBlur = 10; drawPath(ctx, p, w, h); ctx.shadowBlur = 0; } }
    for (const p of ports) {
      const [x, y] = project(p.lat, p.lon, w, h), open = portOpen(p.id), visited = V.visited.includes(p.id), cleared = done(`geo-${p.id}`);
      ctx.beginPath(); ctx.arc(x, y, p.id === selected ? 9 : 6.5, 0, Math.PI * 2);
      ctx.fillStyle = cleared ? '#ffd166' : visited ? '#7fe0d0' : open ? '#ffffff' : 'rgba(150,160,180,.7)'; ctx.fill();
      ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(10,22,44,.85)'; ctx.stroke();
      if (open || visited) { ctx.font = '600 15px "Noto Sans SC", system-ui'; ctx.fillStyle = 'rgba(10,22,44,.75)'; ctx.fillText(p.name, x + 10, y + 5); ctx.fillStyle = '#fff6df'; ctx.fillText(p.name, x + 9, y + 4); }
    }
    const [sx, sy] = shipAt ?? project(portById[V.at].lat, portById[V.at].lon, w, h);
    ctx.font = '30px system-ui'; ctx.textAlign = 'center'; ctx.fillText('⛵', sx, sy - 12); ctx.textAlign = 'left';
  }
  function renderMap(main) {
    const wrap = el('section', null, 'gv-card gv-mapcard');
    const frame = el('div', null, 'gv-chart'); const canvas = el('canvas'); canvas.width = 1440; canvas.height = 600; canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', `世界航海图，你的船停在${portById[V.at].name}`);
    frame.append(canvas);
    canvas.addEventListener('click', e => { const r = canvas.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * canvas.width, y = (e.clientY - r.top) / r.height * canvas.height;
      let best = null, bd = 18 ** 2; for (const p of ports) { const [px, py] = project(p.lat, p.lon, canvas.width, canvas.height); const d = (px - x) ** 2 + (py - y) ** 2; if (d < bd) { bd = d; best = p.id; } }
      if (best) { selected = best; render(); } });
    const side = el('aside', null, 'gv-side');
    side.append(el('h3', `📍 现在停靠：${portById[V.at].name}`), el('p', `${portById[V.at].country} · ${fmtLat(portById[V.at].lat, portById[V.at].lon)}`, 'gv-muted'));
    const list = el('div', null, 'gv-dests'); list.append(el('h4', '可以前往的港口'));
    for (const id of neighbors(V.at)) {
      const p = portById[id], pl = plan(V, id), open = portOpen(id);
      const b = btn(`${open ? (V.visited.includes(id) ? '⚓' : '🧭') : '🔒'} ${p.name} · ${pl.days} 天${pl.via ? ` · ${pl.via}` : ''}`, () => { selected = id; render(); }, `gv-dest${selected === id ? ' active' : ''}`);
      b.dataset.port = id; list.append(b);
    }
    side.append(list);
    if (selected && selected !== V.at) {
      const p = portById[selected], pl = plan(V, selected), info = el('div', null, 'gv-plan');
      info.append(el('h4', `${p.name}（${p.en}）`), el('p', `${p.country} · ${p.continent} · ${p.sea}`));
      if (!pl) info.append(el('p', '这里不能直接航行到达，先去相邻的港口吧。', 'gv-muted'));
      else {
        info.append(el('p', `航程约 ${pl.distance} 海里，预计 ${pl.days} 天（${monthName(V.day)}出发）。`), el('p', `🌬 ${pl.wind.note}`, 'gv-wind'), el('p', `需要粮食 ${pl.days}、淡水 ${pl.days}。`));
        const ok = portOpen(selected), enough = V.food >= pl.days && V.water >= pl.days;
        if (!ok) info.append(el('p', '🔒 先完成前面港口的测验，才能解锁这个港口。', 'gv-muted'));
        else if (!enough) info.append(el('p', '补给不够！先去「市场」买粮食和淡水。', 'gv-warn'));
        const go = btn('⛵ 起航', () => sail(selected, canvas), 'gv-btn primary gv-sail'); go.disabled = !ok || !enough || sailing; info.append(go);
      }
      side.append(info);
    } else side.append(el('p', '点击地图上的港口，或者在上面的列表里选一个目的地。航海图上：白点 = 已解锁，青点 = 去过，金点 = 已通过港口测验。', 'gv-muted'));
    wrap.append(frame, side); main.append(wrap);
    chartImage ??= Object.assign(new Image(), { src: `${ART}/ui/world-chart.png` });
    if (chartImage.complete) drawChart(canvas); else chartImage.addEventListener('load', () => drawChart(canvas), { once: true });
    drawChart(canvas);
  }
  async function sail(to, canvas) {
    const pl = plan(V, to); if (!pl || sailing || busy || !portOpen(to) || V.food < pl.days || V.water < pl.days) return;
    sailing = true; say(`⛵ 起航！前往${portById[to].name}……`);
    const pts = pl.points, w = canvas.width, h = canvas.height;
    const seg = []; let total = 0; for (let i = 1; i < pts.length; i += 1) { let a = pts[i - 1], b = [...pts[i]]; if (b[1] - a[1] > 180) b[1] -= 360; if (b[1] - a[1] < -180) b[1] += 360; const d = Math.hypot(b[0] - a[0], b[1] - a[1]); seg.push([a, b, d]); total += d; }
    if (!reducedMotion()) await new Promise(resolve => { const t0 = performance.now(), dur = Math.min(3200, 900 + total * 12);
      const step = now => { const k = Math.min(1, (now - t0) / dur); let left = total * k, pos = pts[0]; for (const [a, b, d] of seg) { if (left <= d) { const f = d ? left / d : 0; pos = [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]; break; } left -= d; pos = b; }
        let lon = pos[1]; if (lon < -180) lon += 360; if (lon > 180) lon -= 360; drawChart(canvas, project(pos[0], lon, w, h)); k < 1 ? requestAnimationFrame(step) : resolve(); };
      requestAnimationFrame(step); });
    V.food -= pl.days; V.water -= pl.days; V.day += pl.days; const from = portById[V.at].name; V.at = to; if (!V.visited.includes(to)) V.visited.push(to);
    addLog(`${from} → ${portById[to].name}：航行 ${pl.days} 天，约 ${pl.distance} 海里。${pl.wind.note}`);
    selected = null; sailing = false; await save(); tab = 'port'; say(`⚓ 抵达${portById[to].name}！先读港口介绍，再参加港口测验。`, 'ok'); render();
  }

  // ───── 港口 ─────
  function renderPort(main) {
    const p = portById[V.at], lesson = portLesson(p.id);
    const hero = el('section', null, 'gv-hero'); hero.append(img(`${ART}/ports/${p.id}.webp`, `${p.name}港口插画：${p.landmark.name}`, 'gv-hero-img'));
    const cap = el('div', null, 'gv-hero-cap'); cap.append(el('p', `${chapters[lesson.chapterIndex].icon} 第 ${lesson.chapterIndex + 1} 海区 · ${chapters[lesson.chapterIndex].title}`, 'gv-eyebrow'), el('h2', `${p.name} · ${p.country}`), el('p', `${p.en} · ${fmtLat(p.lat, p.lon)}`)); hero.append(cap); main.append(hero);
    if (!isOpen(lesson)) { const c = el('section', null, 'gv-card'); c.append(el('p', '🔒 这个港口的课程还没解锁：先到「航海学堂」学完本海区的概念课，或完成前一个港口的测验。')); main.append(c); return; }
    const teach = el('section', null, 'gv-card gv-teach'); teach.append(el('p', '第 1 步 · 港口见闻', 'gv-step'));
    const hook = el('div', null, 'gv-box hook'); hook.append(el('strong', '🌅 抵达'), el('p', p.hook)); teach.append(hook);
    const facts = el('dl', null, 'gv-facts'); for (const [k, v] of [['大洲', p.continent], ['海域', p.sea], ['经纬度', fmtLat(p.lat, p.lon)], ['气候', p.zone]]) facts.append(el('dt', k), el('dd', v)); teach.append(facts);
    for (const [icon, title, text] of [['⛰', '地形', p.land], ['🌦', '气候与季节', p.climate]]) { const b = el('div', null, 'gv-box'); b.append(el('strong', `${icon} ${title}`), el('p', text)); teach.append(b); }
    const fig = el('figure', null, 'gv-climo'); fig.append(img(`${ART}/climate/${p.id}.png`, `${p.name}气候图：柱子是每月降水，折线是每月平均气温`), el('figcaption', '气候图：蓝柱 = 月降水量（毫米），橙线 = 月平均气温（°C）。数据为常年平均近似值。')); teach.append(fig);
    const people = el('div', null, 'gv-box'); people.append(el('strong', '👫 人们与文化'), el('p', p.culture)); teach.append(people);
    const goods = el('div', null, 'gv-box'); goods.append(el('strong', '🧺 特产'), el('p', `${p.goods.map(g => g.name).join('、')}——可以在「市场」买进，运到远方海区卖出好价钱。`)); teach.append(goods);
    const fact = el('div', null, 'gv-box fact'); fact.append(el('strong', '💡 你知道吗'), el('p', p.fact)); teach.append(fact);
    const src = el('p', null, 'gv-src'); const a = el('a', '维基百科条目'); a.href = p.wiki; a.target = '_blank'; a.rel = 'noopener'; src.append(document.createTextNode('📖 事实核对：CIA World Factbook（2025 存档）、'), a); teach.append(src);
    const rec = S().responses[lesson.id] && typeof S().responses[lesson.id] === 'object' ? S().responses[lesson.id] : (S().responses[lesson.id] = {});
    const slot = el('div');
    const read = btn(rec.read ? '✓ 已读完' : '我读完了，开始港口测验', async () => { rec.read = true; read.disabled = true; read.textContent = '✓ 已读完'; slot.replaceChildren(); quiz(); await save(); slot.scrollIntoView?.({ behavior: 'smooth', block: 'start' }); }, 'gv-btn primary gv-read');
    read.disabled = Boolean(rec.read); teach.append(read); main.append(teach, slot);
    const quiz = () => renderQuiz(lesson, slot, first => {
      if (!V.discoveries.includes(p.id)) V.discoveries.push(p.id);
      if (first && !V.rewarded.includes(p.id)) { V.rewarded.push(p.id); V.gold += QUIZ_REWARD; addLog(`通过${p.name}港口测验，获得发现物「${p.landmark.name}」和 ${QUIZ_REWARD} 金币。`); }
      say(`💎 新发现：${p.landmark.icon} ${p.landmark.name}！下一个港口已解锁。`, 'ok');
    });
    if (rec.read || done(lesson.id)) quiz();
  }

  // ───── 航海学堂 ─────
  function renderSchool(main) {
    const concepts = lessons.filter(l => l.kind === 'concept');
    schoolLesson ??= (concepts.find(l => isOpen(l) && !done(l.id)) ?? concepts.find(l => l.chapterId === portById[V.at].chapter)).id;
    const pick = el('div', null, 'gv-chips'); for (const l of concepts) { const b = btn(`${done(l.id) ? '✓' : isOpen(l) ? '📘' : '🔒'} ${chapters[l.chapterIndex].icon} ${l.teach.title}`, () => { schoolLesson = l.id; render(); }, `gv-chip${l.id === schoolLesson ? ' active' : ''}`); b.disabled = !isOpen(l); b.dataset.lessonId = l.id; pick.append(b); }
    main.append(pick);
    const l = lessons.find(x => x.id === schoolLesson), t = l.teach, c = el('section', null, 'gv-card gv-teach');
    c.append(el('p', `第 ${l.chapterIndex + 1} 海区 · ${chapters[l.chapterIndex].title} · 航海学堂`, 'gv-step'), el('h2', t.title));
    const banner = img(`${ART}/regions/${l.chapterId}.webp`, `${chapters[l.chapterIndex].title}海区横幅`, 'gv-banner'); c.prepend(banner);
    const hook = el('div', null, 'gv-box hook'); hook.append(el('strong', '🧭 船长说'), el('p', t.hook)); c.append(hook);
    const pts = el('div', null, 'gv-box'); pts.append(el('strong', '📘 知识点')); const ul = el('ul'); t.points.forEach(x => ul.append(el('li', x))); pts.append(ul); c.append(pts);
    for (const [k, cls, txt] of [['🤔 为什么重要', '', t.why], ['🗺 航海实例', 'fact', t.example]]) { const b = el('div', null, `gv-box ${cls}`); b.append(el('strong', k), el('p', txt)); c.append(b); }
    main.append(c);
    const rec = S().responses[l.id] && typeof S().responses[l.id] === 'object' ? S().responses[l.id] : (S().responses[l.id] = {});
    const slot = el('div'); const go = () => renderQuiz(l, slot, () => say('📘 概念课通过！对应的港口课已解锁。', 'ok'));
    const read = btn(rec.read ? '✓ 已读完' : '我读完了，开始小测', async () => { rec.read = true; read.disabled = true; read.textContent = '✓ 已读完'; go(); await save(); }, 'gv-btn primary gv-read'); read.disabled = Boolean(rec.read); c.append(read); main.append(slot);
    if (rec.read || done(l.id)) go();
  }

  // ───── 市场与船坞 ─────
  function renderMarket(main) {
    const p = portById[V.at], ship = SHIPS[V.ship - 1], used = () => Object.values(V.cargo).reduce((a, b) => a + b, 0);
    const c = el('section', null, 'gv-card'); c.append(el('h2', `🛒 ${p.name}市场`), el('p', '规则：本地特产按原价买进；运到越远的海区，卖价越高；在出产的海区卖只能打六折。船员每天吃 1 份粮食、喝 1 份淡水。', 'gv-muted'));
    const sup = el('div', null, 'gv-row'); sup.append(el('h3', '补给'));
    for (const [key, label] of [['food', '🍞 粮食'], ['water', '💧 淡水']]) {
      const room = ship.supply - V[key];
      sup.append(btn(`${label} 补满（+${room}，${room * SUPPLY_PRICE} 金币）`, async () => { const n = Math.min(room, Math.floor(V.gold / SUPPLY_PRICE)); if (n <= 0) return; V[key] += n; V.gold -= n * SUPPLY_PRICE; await save(); render(); }, 'gv-btn'));
    }
    if (V.gold < 20 && V.food < 15) sup.append(btn('🤝 向港务长求助（免费补给 20 份）', async () => { V.food = Math.min(ship.supply, V.food + 20); V.water = Math.min(ship.supply, V.water + 20); addLog(`${p.name}的港务长送来免费补给。`); await save(); render(); }, 'gv-btn ghost'));
    c.append(sup);
    const buy = el('div', null, 'gv-row'); buy.append(el('h3', '本地特产'));
    for (const g of p.goods.filter(g => g.price > 0)) buy.append(btn(`买 ${g.name}（${g.price} 金币）`, async () => { if (V.gold < g.price || used() >= ship.cargo) { say(V.gold < g.price ? '金币不够。' : '货舱满了！去船坞升级大船吧。', 'warn'); return; } V.gold -= g.price; V.cargo[g.id] = (V.cargo[g.id] ?? 0) + 1; await save(); render(); }, 'gv-btn'));
    c.append(buy);
    const sell = el('div', null, 'gv-row'); sell.append(el('h3', `货舱（${used()}/${ship.cargo}）`));
    const entries = Object.entries(V.cargo).filter(([, n]) => n > 0);
    if (!entries.length) sell.append(el('p', '货舱空空的。', 'gv-muted'));
    for (const [id, n] of entries) { const price = sellPrice(id, p.id); sell.append(btn(`卖 ${goodById[id].name} ×1（${price} 金币，剩 ${n}）`, async () => { V.cargo[id] -= 1; if (!V.cargo[id]) delete V.cargo[id]; V.gold += price; await save(); render(); }, 'gv-btn')); }
    c.append(sell); main.append(c);
  }
  function renderDock(main) {
    const c = el('section', null, 'gv-card'); c.append(el('h2', '🔧 船坞'), el('p', '船越大，跑得越快，能装的货和补给越多。升级的金币靠贸易和港口测验奖励来赚。', 'gv-muted'));
    const grid = el('div', null, 'gv-ships');
    for (const s of SHIPS) {
      const card = el('div', null, `gv-ship${s.level === V.ship ? ' current' : ''}`); card.append(img(`${ART}/ui/ship-${s.level}.webp`, `${s.name}侧面图`), el('h3', `${s.level} 级 · ${s.name}`), el('p', `航速 ${s.speed} 节 · 货舱 ${s.cargo} · 补给上限 ${s.supply}`));
      if (s.level === V.ship) card.append(el('p', '✓ 当前座船', 'gv-ok'));
      else if (s.level === V.ship + 1) { const b = btn(`升级（${s.cost} 金币）`, async () => { if (V.gold < s.cost) return; V.gold -= s.cost; V.ship = s.level; addLog(`在${portById[V.at].name}船坞升级为${s.name}！`); await save(); render(); }, 'gv-btn primary'); b.disabled = V.gold < s.cost; card.append(b); }
      grid.append(card);
    }
    c.append(grid); main.append(c);
  }
  function renderFinds(main) {
    const c = el('section', null, 'gv-card'); c.append(el('h2', `💎 发现物收藏（${V.discoveries.length}/${ports.length}）`));
    for (const ch of chapters) {
      c.append(el('h3', `${ch.icon} ${ch.title}`)); const grid = el('div', null, 'gv-finds');
      for (const id of ch.ports) { const p = portById[id], got = V.discoveries.includes(id), card = el('div', null, `gv-find${got ? ' got' : ''}`);
        if (got) card.append(img(`${ART}/ports/${id}.webp`, p.landmark.name), el('strong', `${p.landmark.icon} ${p.landmark.name}`), el('small', `${p.name} · 特产：${p.goods.map(g => g.name).join('、')}`));
        else card.append(el('div', '?', 'gv-find-q'), el('strong', '尚未发现'), el('small', `${p.name}港口测验通过后获得`));
        grid.append(card); }
      c.append(grid);
    }
    main.append(c);
  }
  function renderLog(main) {
    const c = el('section', null, 'gv-card'); c.append(el('h2', '📜 航海日志'));
    const ol = el('ol', null, 'gv-log'); [...V.log].reverse().forEach(e => ol.append(el('li', `第 ${e.day + 1} 天（${monthName(e.day)}）· ${e.text}`)));
    c.append(ol, btn('重新开始航行（保留学习进度）', async () => { if (!globalThis.confirm?.('确定把船、金币和位置重置到上海吗？已通过的课程和发现物会保留。')) return; const keep = V.discoveries; V = freshVoyage(); V.discoveries = keep; V.rewarded = [...keep]; await save(); render(); }, 'gv-btn ghost'));
    main.append(c);
  }

  function render() {
    renderHeader(); const main = $('.gv-main'); main.replaceChildren();
    ({ map: renderMap, port: renderPort, school: renderSchool, market: renderMarket, dock: renderDock, finds: renderFinds, log: renderLog })[tab](main);
  }
  $('.gv-credits-btn').addEventListener('click', () => {
    const d = el('dialog', null, 'gv-dialog'); d.append(el('h2', '资料来源与版权')); credits.paragraphs.forEach(p => d.append(el('p', p)));
    const ul = el('ul'); for (const s of credits.sources) { const li = el('li'), a = el('a', s.title); a.href = s.url; a.target = '_blank'; a.rel = 'noopener'; li.append(a, document.createTextNode(` · ${s.version}`)); ul.append(li); }
    d.append(ul, btn('关闭', () => d.close(), 'gv-btn primary')); d.addEventListener('close', () => d.remove()); $('.geo-voyage').append(d); d.showModal();
  });
  // First visit: start in the school so the concept lesson comes first (teach first, then test).
  if (!done('geo-c01')) tab = 'school';
  render();
  return { async flush() { if (busy || sailing) throw new Error('请等船靠岸后再切换课程。'); S().voyage = V; await progress.flush(); }, dispose() { progress.dispose(); root.replaceChildren(); } };
}

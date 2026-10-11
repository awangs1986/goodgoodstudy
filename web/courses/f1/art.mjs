import { technicalCar, technicalSafetyCar, technicalAeroSide } from './vehicle-art.mjs';
// F1 rules course illustration kit — hand-authored SVG, offline. Generic open-wheel silhouettes with
// team-neutral liveries; no F1/FIA logos, team marks or tyre-maker branding.
const C = { asphalt: '#343e49', asphalt2: '#3b4651', grass: '#3d584f', grass2: '#405c53', kerbR: '#b64b47', kerbW: '#d7dfe2', line: '#ffffff', ink: '#141922', gold: '#ffc533', bad: '#e5332a', ok: '#23a26d', pit: '#2c3038' };
export const LIVERY = { red: ['#d7263d', '#1b1b1f'], blue: ['#1f6fe0', '#f2f2f2'], orange: ['#ff8a1c', '#1d2a44'], teal: ['#14a3a0', '#0f1f2b'], silver: ['#c9ced6', '#1a1a1a'], purple: ['#7b4ce0', '#ffd23f'], green: ['#1f8a4c', '#e9f2ea'], yellow: ['#f2c318', '#1a1a1a'] };
let uid = 0; const id = p => `${p}${(uid += 1)}`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const FONT = `font-family="'Noto Sans SC','PingFang SC',system-ui,sans-serif"`;

// Top-down vehicle geometry and materials live in the dedicated illustration module.
export const car = (o = {}) => technicalCar(o, LIVERY);
export const safetyCar = (o = {}) => technicalSafetyCar(o, LIVERY);
export const aeroSide = (mode = 'corner', o = {}) => technicalAeroSide(mode, o, LIVERY);
export function aeroModes(o = {}) {
  return `<svg class="rc-svg animated" viewBox="0 0 640 300" role="img" aria-label="主动空气动力学：弯道模式与直道模式" xmlns="http://www.w3.org/2000/svg"><rect width="640" height="300" rx="14" fill="#0f1726"/>
   <g ${FONT}><text x="160" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#ff9c7c">弯道模式 Corner Mode</text><text x="160" y="56" text-anchor="middle" font-size="18" fill="#c9d4e5">翼片立起 · 抓地力大</text>
   <text x="480" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#7cc4ff">直道模式 Straight Mode</text><text x="480" y="56" text-anchor="middle" font-size="18" fill="#c9d4e5">翼片放平 · 阻力小</text>
   <path d="M320 70V280" stroke="#2c3a52" stroke-width="2" stroke-dasharray="6 6"/>
   <text x="320" y="292" text-anchor="middle" font-size="12" fill="#8fa3bf">${esc(o.note ?? '技术规则 C3.10 / C3.11；使用区域由 FIA 每站公布（体育规则 B7.1）')}</text></g>
   <g transform="translate(160 150) scale(.95)">${aeroSide('corner', { flow: true })}</g><g transform="translate(480 150) scale(.95)">${aeroSide('straight', { livery: 'orange' })}</g></svg>`;
}
// Track scene. Straight track band across the scene with kerbs & white edge lines.
export function scene(o = {}) {
  const m = id('tr'), W = o.w ?? 640, H = o.h ?? 300;
  const top = o.top ?? 90, bot = o.bot ?? 210;
  const straight = `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#${m}grass)"/>
   ${o.runoff ? `<rect x="0" y="${bot + 14}" width="${W}" height="${H - bot - 14}" fill="#8b8e94" opacity=".55"/>` : ''}
   <rect x="0" y="${top}" width="${W}" height="${bot - top}" fill="url(#${m}asph)"/>
   <rect x="${o.kerbFrom ?? 0}" y="${top - 12}" width="${(o.kerbTo ?? W) - (o.kerbFrom ?? 0)}" height="12" fill="url(#${m}kerb)"/><rect x="${o.kerbFrom ?? 0}" y="${bot}" width="${(o.kerbTo ?? W) - (o.kerbFrom ?? 0)}" height="12" fill="url(#${m}kerb)"/>
   <path d="M0 ${top + 2}H${W}M0 ${bot - 2}H${W}" stroke="${C.line}" stroke-width="4"/>`;
  const labelWidth = t => [...t].reduce((n, c) => n + (/[ -~]/.test(c) ? 9 : 16), 22);
  const lines = (o.lines ?? []).map(l => {
    const w = Math.min(W - 20, l.w ?? labelWidth(l.t ?? '')), x = Math.min(W - w / 2 - 10, Math.max(w / 2 + 10, l.x)), y = l.ty ?? top - 40;
    return `<g><path d="M${l.x} ${top - (l.ext ?? 0)}V${bot + (l.ext ?? 0)}" stroke="${l.c ?? C.line}" stroke-width="${l.wd ?? 4}" ${l.dash ? 'stroke-dasharray="10 6"' : ''}/>${l.t ? `<rect x="${x - w / 2}" y="${y - 18}" width="${w}" height="27" rx="6" fill="${l.bg ?? '#172630'}"/><text x="${x}" y="${y + 1}" text-anchor="middle" font-size="16" font-weight="800" fill="${l.fc ?? '#fff'}" ${FONT}>${esc(l.t)}</text>` : ''}</g>`;
  }).join('');
  const cars = (o.cars ?? []).map(c => c.kind === 'safety' ? safetyCar(c) : car(c)).join('');
  const labels = (o.labels ?? []).map(l => {
    const w = Math.min(W - 20, l.w ?? labelWidth(l.t)), x = Math.min(W - w / 2 - 10, Math.max(w / 2 + 10, l.x));
    return `<g><rect x="${x - w / 2}" y="${l.y - 18}" width="${w}" height="27" rx="6" fill="${l.bg ?? '#172630'}" stroke="#91a5b4" stroke-opacity=".2"/><text x="${x}" y="${l.y + 1}" text-anchor="middle" font-size="16" font-weight="700" fill="${l.fc ?? '#fff'}" ${FONT}>${esc(l.t)}</text></g>`;
  }).join('');
  const arrows = (o.arrows ?? []).map(a => `<path d="${a.d}" fill="none" stroke="${a.c ?? C.gold}" stroke-width="${a.w ?? 4}" stroke-linecap="round" ${a.dash ? 'stroke-dasharray="10 8"' : ''} marker-end="url(#${m}arr${a.c === C.bad ? 'b' : ''})"/>`).join('');
  return `<svg class="rc-svg${o.anim ? ' animated' : ''}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.alt ?? '赛道示意图')}" xmlns="http://www.w3.org/2000/svg"><defs>
   <pattern id="${m}grass" width="160" height="80" patternUnits="userSpaceOnUse"><rect width="160" height="80" fill="${C.grass}"/><rect width="80" height="80" fill="${C.grass2}"/></pattern>
   <pattern id="${m}asph" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="${C.asphalt}"/><circle cx="2" cy="3" r=".45" fill="${C.asphalt2}"/><circle cx="6" cy="6" r=".35" fill="#4b5560"/></pattern>
   <pattern id="${m}kerb" width="32" height="12" patternUnits="userSpaceOnUse"><rect width="16" height="12" fill="${C.kerbR}"/><rect x="16" width="16" height="12" fill="${C.kerbW}"/></pattern>
   <marker id="${m}arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="${C.gold}"/></marker>
   <marker id="${m}arrb" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="${C.bad}"/></marker></defs>
   ${o.custom ? o.custom(m) : straight}${o.under ?? ''}${lines}${arrows}${cars}${o.anim ? o.anim(m) : ''}${labels}${o.extra ?? ''}</svg>`;
}
// Translation and heading are animated independently. Static consumers commit the
// declared representative pose after removing SMIL; the live transform is untouched.
export function drive(o) {
  const points = o.values.split(';').map(p => p.trim().split(/\s+/).map(Number));
  const still = o.still ?? points[0];
  const headings = points.map((p, i) => {
    const a = points[Math.min(i, points.length - 2)], b = points[Math.min(i + 1, points.length - 1)];
    return o.orient === false || (a[0] === b[0] && a[1] === b[1]) ? (o.rot ?? 0) : Math.round(Math.atan2(b[1] - a[1], b[0] - a[0]) * 1800 / Math.PI) / 10;
  });
  const times = o.kt ?? points.map((_, i) => i / (points.length - 1)).join(';');
  return `<g class="f1-drive" data-static-transform="translate(${still.join(' ')})"><g data-static-transform="rotate(${o.stillRot ?? headings[0]})">${(o.kind === 'safety' ? safetyCar : car)({ ...o, x: 0, y: 0, rot: 0 })}<animateTransform attributeName="transform" type="rotate" values="${headings.join(';')}" keyTimes="${times}" calcMode="discrete" dur="${o.dur ?? 4}s" repeatCount="indefinite"/></g><animateTransform attributeName="transform" type="translate" values="${o.values}" keyTimes="${times}" dur="${o.dur ?? 4}s" repeatCount="indefinite"/></g>`;
}

export function flag(type, o = {}) {
  const w = 120, h = 80, m = id('fl');
  const transform = `translate(${o.x ?? 0} ${o.y ?? 0}) scale(${o.s ?? 1})`;
  const label = o.t ? `<text x="60" y="130" text-anchor="middle" font-size="15" font-weight="800" fill="${o.fc ?? C.ink}" ${FONT}>${esc(o.t)}</text>` : '';
  if (type === 'double-yellow') return `<g data-flag="double-yellow" transform="${transform}">${flag('yellow', { x: 1, y: 20, s: .73, still: o.still, poleH: 122 })}${flag('yellow', { x: 29, y: 0, s: .73, still: o.still, poleH: 150 })}${label}</g>`;
  const body = {
    green: '<rect width="120" height="80" fill="#159c54"/>', yellow: '<rect width="120" height="80" fill="#ffd62d"/>', red: '<rect width="120" height="80" fill="#e42c37"/>',
    blue: '<rect width="120" height="80" fill="#287ce8"/>', white: '<rect width="120" height="80" fill="#f7f9fc"/>', black: '<rect width="120" height="80" fill="#17212a"/>',
    bw: '<rect width="120" height="80" fill="#f7f9fc"/><path d="M0 0H120L0 80Z" fill="#101820"/>',
    blackorange: '<rect width="120" height="80" fill="#111a23"/><circle cx="60" cy="40" r="22" fill="#ff8a24"/>',
    stripes: `<rect width="120" height="80" fill="#ffd62d"/>${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${i * 20}" width="10" height="80" fill="#e42c37"/>`).join('')}`,
    chequered: `<pattern id="${m}ch" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#fff"/><rect width="12" height="12" fill="#15202a"/><rect x="12" y="12" width="12" height="12" fill="#15202a"/></pattern><rect width="120" height="80" fill="url(#${m}ch)"/>`
  }[type];
  const outline = 'M0 3Q25 -2 47 4T88 5Q105 2 120 0V74Q103 80 83 77T43 75Q20 72 0 78Z';
  const wave = o.still ? '' : '<animateTransform attributeName="transform" type="skewY" values="0;2;0;-2;0" dur="1.4s" repeatCount="indefinite"/>';
  return `<g data-flag="${type}" transform="${transform}"><defs><clipPath id="${m}clip"><path d="${outline}"/></clipPath>
   <linearGradient id="${m}cloth"><stop stop-color="#000" stop-opacity=".16"/><stop offset=".24" stop-color="#fff" stop-opacity=".18"/><stop offset=".47" stop-color="#000" stop-opacity=".12"/><stop offset=".7" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient>
   <linearGradient id="${m}pole"><stop stop-color="#657481"/><stop offset=".45" stop-color="#d5e0e8"/><stop offset="1" stop-color="#788998"/></linearGradient></defs>
   <rect x="-6" y="-4" width="6" height="${o.poleH ?? 150}" rx="2" fill="url(#${m}pole)"/><circle cx="-3" cy="-4" r="3.5" fill="#8fa1af"/>
   <g data-flag-panel="${type}"><g clip-path="url(#${m}clip)">${body}<rect width="120" height="80" fill="url(#${m}cloth)"/></g><path d="${outline}" fill="none" stroke="#243440" stroke-opacity=".3" stroke-width=".8"/><path d="M3 8Q25 3 47 9T88 10Q104 7 116 5M3 73Q24 67 44 71T84 72Q105 75 116 70" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width=".6"/>${wave}</g>${label}</g>`;
}
export function flags(list, o = {}) {
  const gap = 150;
  return `<svg class="rc-svg${o.still ? '' : ' animated'}" viewBox="0 0 ${list.length * gap + 20} ${o.h ?? 175}" role="img" aria-label="${esc(o.alt ?? '旗语：' + list.map(f => f.t).join('、'))}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="14" fill="#e9eff5"/>
   ${list.map((f, i) => flag(f.type, { x: 30 + i * gap, y: 20, t: f.t, still: o.still })).join('')}</svg>`;
}
const TYRE = { soft: ['#ed534a', 'S', '软胎'], medium: ['#ffd12a', 'M', '中性胎'], hard: ['#edf3f7', 'H', '硬胎'], inter: ['#33bf72', 'I', '半雨胎'], wet: ['#3a92ff', 'W', '全雨胎'] };
export function tyre(kind, o = {}) {
  const [c, l, name] = TYRE[kind], m = id('ty'), rain = kind === 'inter' || kind === 'wet';
  const tread = rain ? Array.from({ length: kind === 'wet' ? 13 : 7 }, (_, i) => {
    const y = -45 + i * (kind === 'wet' ? 7.5 : 14.5), x = -9 + 39 * Math.sqrt(Math.max(0, 1 - y * y / 2704));
    return `<path d="M${x - 3} ${y - 4}l11 8 13 -3" fill="none" stroke="#04090e" stroke-width="${kind === 'wet' ? 2.6 : 2.1}"/><path d="M${x - 3} ${y - 5.5}l11 8 13 -3" fill="none" stroke="#71808b" stroke-width=".6" opacity=".42"/>`;
  }).join('') : '';
  return `<g data-tyre="${kind}" transform="translate(${o.x ?? 0} ${o.y ?? 0}) scale(${o.s ?? 1})"><defs>
   <linearGradient id="${m}tread" x1="0" y1="0" x2="1" y2=".3"><stop stop-color="#111b26"/><stop offset=".45" stop-color="#394651"/><stop offset=".77" stop-color="#1d2832"/><stop offset="1" stop-color="#070e15"/></linearGradient>
   <radialGradient id="${m}wall" cx=".3" cy=".2" r=".9"><stop stop-color="#3d4954"/><stop offset=".6" stop-color="#19232d"/><stop offset="1" stop-color="#080f17"/></radialGradient>
   <linearGradient id="${m}rim" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d7e1e8"/><stop offset=".42" stop-color="#637789"/><stop offset="1" stop-color="#b0c0cc"/></linearGradient>
   <clipPath id="${m}band"><path d="M-9 -52H12A39 52 0 0 1 12 52H-9A39 52 0 0 0 -9 -52Z"/></clipPath></defs>
   <ellipse cx="4" cy="55" rx="49" ry="6" fill="#1b3041" opacity=".13"/>
   <path d="M-9 -52H12A39 52 0 0 1 12 52H-9Z" fill="url(#${m}tread)" stroke="#111c25" stroke-width=".9"/>
   <g clip-path="url(#${m}band)">${tread}${kind === 'wet' ? '<path d="M15 -51Q65 0 15 51" fill="none" stroke="#070e15" stroke-width="2"/>' : ''}<path d="M3 -50Q54 0 3 50" fill="none" stroke="#acbcc5" stroke-width=".7" opacity=".22"/></g>
   <ellipse cx="-9" rx="39" ry="52" fill="url(#${m}wall)" stroke="#51616d" stroke-width=".6"/>
   <ellipse cx="-9" rx="36.5" ry="49" fill="none" stroke="#82919b" stroke-width=".55" opacity=".4"/>
   <ellipse cx="-9" rx="31.5" ry="42" fill="none" stroke="${c}" stroke-width="3.8"/>
   <ellipse cx="-9" rx="25" ry="33.5" fill="#090f16" stroke="#566775" stroke-width=".8"/>
   <ellipse cx="-9" rx="21" ry="28" fill="url(#${m}rim)"/><ellipse cx="-9" rx="17.8" ry="24.1" fill="#1c2a37"/>
   <g transform="translate(-9 0) scale(.74 1)">${[0,60,120,180,240,300].map(a => `<path d="M-2 -4L-4 -23L1 -24L4 -7Z" fill="url(#${m}rim)" transform="rotate(${a})"/>`).join('')}<circle r="7.2" fill="#abbcc8"/><circle r="3.9" fill="#273845"/><circle r="1.5" fill="#d1dbe1"/></g>
   <path d="M-31 -29Q-20 -43 -8 -43" fill="none" stroke="#fff" stroke-width=".7" opacity=".35"/>
   <rect x="-15" y="-45" width="12" height="12" rx="4" fill="#17222d"/><text x="-9" y="-35" text-anchor="middle" font-size="10" font-weight="900" fill="${c}" font-family="system-ui">${l}</text>
   <text y="78" text-anchor="middle" font-size="15" font-weight="800" fill="${o.fc ?? C.ink}" ${FONT}>${esc(o.t ?? name)}</text></g>`;
}
export function tyres(list, o = {}) {
  return `<svg class="rc-svg" viewBox="0 0 ${list.length * 140 + 20} 170" role="img" aria-label="${esc(o.alt ?? '轮胎配方')}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="14" fill="#e9eff5"/>${list.map((k, i) => tyre(k.kind ?? k, { x: 80 + i * 140, y: 68, t: k.t })).join('')}</svg>`;
}
// Timing tower widget: rows {p, code, gap, tyre, hl, tag}
export function tower(rows, o = {}) {
  const h = 30;
  return `<svg class="rc-svg" viewBox="0 0 300 ${rows.length * h + 56}" role="img" aria-label="${esc(o.alt ?? '计时塔')}" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="${rows.length * h + 56}" rx="12" fill="#0d121c"/>
   <text x="16" y="30" font-size="15" font-weight="800" fill="#fff" ${FONT}>${esc(o.title ?? '第 34 / 57 圈')}</text>${o.status ? `<rect x="190" y="12" width="96" height="26" rx="6" fill="${o.statusC ?? C.gold}"/><text x="238" y="31" text-anchor="middle" font-size="14" font-weight="900" fill="#111" ${FONT}>${esc(o.status)}</text>` : ''}
   ${rows.map((r, i) => { const y = 46 + i * h; return `<g><rect x="8" y="${y}" width="284" height="${h - 3}" rx="5" fill="${r.hl ? '#2a3550' : i % 2 ? '#141b28' : '#182033'}"/><text x="26" y="${y + 19}" text-anchor="middle" font-size="14" font-weight="800" fill="#fff" font-family="system-ui">${r.p ?? i + 1}</text>
     <rect x="44" y="${y + 6}" width="4" height="${h - 15}" fill="${LIVERY[r.c ?? 'silver'][0]}"/><text x="56" y="${y + 19}" font-size="14" font-weight="800" fill="#fff" font-family="system-ui">${esc(r.code)}</text>
     <text x="196" y="${y + 19}" text-anchor="end" font-size="13" fill="#c9d4e5" ${FONT}>${esc(r.gap ?? '')}</text>${r.tyre ? `<circle cx="214" cy="${y + 13}" r="8" fill="#111" stroke="${TYRE[r.tyre][0]}" stroke-width="3"/>` : ''}${r.tag ? `<text x="282" y="${y + 19}" text-anchor="end" font-size="12" font-weight="800" fill="${r.tagC ?? C.gold}" ${FONT}>${esc(r.tag)}</text>` : ''}</g>`; }).join('')}</svg>`;
}
export function barChart(values, o = {}) {
  const W = o.w ?? 600, H = 230, bw = (W - 40) / values.length, max = Math.max(...values.map(v => v.v));
  return `<svg class="rc-svg" data-kind="info" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.alt ?? '柱状图')}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" rx="14" fill="#0f1726"/>
   <text x="20" y="30" font-size="16" font-weight="800" fill="#fff" ${FONT}>${esc(o.title ?? '')}</text>
   ${values.map((v, i) => { const bh = v.v / max * 140, x = 20 + i * bw; return `<rect x="${x + 4}" y="${200 - bh}" width="${bw - 8}" height="${bh}" rx="4" fill="${v.c ?? (i === 0 ? C.gold : '#4f86ff')}"/><text x="${x + bw / 2}" y="${194 - bh}" text-anchor="middle" font-size="13" font-weight="800" fill="#fff" font-family="system-ui">${v.v}</text><text x="${x + bw / 2}" y="218" text-anchor="middle" font-size="12" fill="#c9d4e5" ${FONT}>${esc(v.k)}</text>`; }).join('')}</svg>`;
}
export function info(rows, o = {}) {
  const h = 46, w = o.w ?? 600;
  return `<svg class="rc-svg" data-kind="info" viewBox="0 0 ${w} ${rows.length * h + (o.title ? 50 : 10)}" role="img" aria-label="${esc(o.title ?? '规则表')}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="100%" rx="14" fill="#0f1726"/><g ${FONT}>
   ${o.title ? `<text x="18" y="32" font-size="17" font-weight="800" fill="#fff">${esc(o.title)}</text>` : ''}
   ${rows.map((r, i) => { const y = (o.title ? 44 : 6) + i * h; return `<rect x="10" y="${y}" width="${w - 20}" height="${h - 6}" rx="9" fill="${i % 2 ? '#162036' : '#1b2640'}"/><rect x="10" y="${y}" width="8" height="${h - 6}" rx="3" fill="${r.c ?? C.gold}"/><text x="30" y="${y + 26}" font-size="15" font-weight="800" fill="#fff">${esc(r.k)}</text><text x="${o.split ?? 210}" y="${y + 26}" font-size="14" fill="#c9d4e5">${esc(r.v)}</text>`; }).join('')}</g></svg>`;
}
export const colors = C;

// Start lights gantry: n lit (0–5); anim cycles 1..5 then lights out.
export function gantry(o = {}) {
  const lit = o.lit ?? 5;
  const lamp = (i) => {
    const on = o.anim ? `<animate attributeName="fill" values="#2a1212;#2a1212;#ff2a1f;#ff2a1f;#2a1212;#2a1212" keyTimes="0;${(i + 1) / 7};${(i + 1) / 7 + .001};.857;.858;1" dur="4.2s" repeatCount="indefinite"/>` : '';
    return `<g transform="translate(${70 + i * 104} 70)"><rect x="-40" y="-44" width="80" height="88" rx="12" fill="#111"/><circle cy="-18" r="16" fill="${!o.anim && i < lit ? '#ff2a1f' : '#2a1212'}">${on}</circle><circle cy="20" r="16" fill="${!o.anim && i < lit ? '#ff2a1f' : '#2a1212'}">${on.replace('fill', 'fill')}</circle></g>`;
  };
  return `<svg class="rc-svg${o.anim ? ' animated' : ''}" viewBox="0 0 560 190" role="img" aria-label="${esc(o.alt ?? '发车灯')}" xmlns="http://www.w3.org/2000/svg"><rect width="560" height="190" rx="14" fill="#1a2233"/><rect x="20" y="20" width="520" height="100" rx="10" fill="#2c3445"/>${[0, 1, 2, 3, 4].map(lamp).join('')}
   <text x="280" y="160" text-anchor="middle" font-size="16" font-weight="800" fill="#fff" ${FONT}>${esc(o.t ?? '5 组红灯逐一亮起 → 全部熄灭 = 发车')}</text></svg>`;
}
// Pit lane scene: track on top, pit lane below with speed-limit lines and garages.
export function pitScene(o = {}) {
  const W = 640, H = 330;
  return scene({ w: W, h: H, alt: o.alt ?? '维修区示意图', top: 40, bot: 130, cars: o.cars ?? [], labels: o.labels ?? [], arrows: o.arrows ?? [], anim: o.anim,
    under: `<rect x="0" y="150" width="${W}" height="110" fill="#30343b"/><rect x="0" y="150" width="${W}" height="40" fill="#3d424a"/><path d="M0 190H${W}" stroke="#ffd400" stroke-width="3" stroke-dasharray="14 10"/>
     <text x="14" y="177" font-size="11" fill="#dae5ef" ${FONT}>快车道</text><text x="320" y="251" text-anchor="middle" font-size="12" fill="#dae5ef" ${FONT}>内车道 · 工作区</text>
     ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${70 + i * 90}" y="262" width="74" height="60" fill="#22262c" stroke="#555"/><rect x="${78 + i * 90}" y="270" width="58" height="8" fill="${['#d7263d', '#1f6fe0', '#ff8a1c', '#14a3a0', '#7b4ce0', '#c9ced6'][i]}"/>`).join('')}
     <path d="M60 150V260M580 150V260" stroke="#fff" stroke-width="5"/><g><rect x="22" y="200" width="76" height="40" rx="6" fill="#fff"/><circle cx="60" cy="220" r="17" fill="#fff" stroke="#e5332a" stroke-width="5"/><text x="60" y="226" text-anchor="middle" font-size="15" font-weight="900" fill="#111" font-family="system-ui">${o.limit ?? 80}</text></g>
     <text x="60" y="${H - 6}" text-anchor="middle" font-size="11" fill="#fff" ${FONT}>限速线</text><text x="580" y="${H - 6}" text-anchor="middle" font-size="11" fill="#fff" ${FONT}>限速结束</text>`, extra: o.extra });
}
// Start grid: two staggered columns of boxes.
export function gridScene(o = {}) {
  const W = 640, H = 300, boxes = [];
  for (let i = 0; i < 8; i += 1) { const x = 520 - i * 62, y = i % 2 ? 190 : 110; boxes.push(`<path d="M${x} ${y - 26}H${x + 20}V${y + 26}H${x}" fill="none" stroke="#fff" stroke-width="3"/><text x="${x + 32}" y="${y - 30}" font-size="12" font-weight="800" fill="#fff" font-family="system-ui">${i + 1}</text>`); }
  return scene({ w: W, h: H, top: 60, bot: 240, alt: o.alt ?? '发车格', under: boxes.join('') + `<path d="M570 60V240" stroke="#fff" stroke-width="6"/><path d="M582 60V240" stroke="#111" stroke-width="6" stroke-dasharray="6 6"/>`, cars: o.cars ?? [], labels: o.labels ?? [], arrows: o.arrows ?? [], anim: o.anim });
}
// Corner scene with custom curved track (for track limits / overtaking etiquette).
export function cornerScene(o = {}) {
  return scene({ w: 640, h: 360, alt: o.alt ?? '弯道示意', cars: o.cars ?? [], labels: o.labels ?? [], arrows: o.arrows ?? [], anim: o.anim, extra: o.extra,
    custom: m => `<rect width="640" height="360" fill="url(#${m}grass)"/><path d="M-10 290H300Q480 290 520 150Q540 60 650 40" fill="none" stroke="#8b8e94" stroke-width="150" opacity=".45"/>
      <path d="M-10 290H300Q480 290 520 150Q540 60 650 40" fill="none" stroke="${C.kerbR}" stroke-width="112"/>
      <path d="M-10 290H300Q480 290 520 150Q540 60 650 40" fill="none" stroke="${C.kerbW}" stroke-width="112" stroke-dasharray="18 18"/>
      <path d="M-10 290H300Q480 290 520 150Q540 60 650 40" fill="none" stroke="#fff" stroke-width="96"/>
      <path d="M-10 290H300Q480 290 520 150Q540 60 650 40" fill="none" stroke="url(#${m}asph)" stroke-width="88"/>` });
}

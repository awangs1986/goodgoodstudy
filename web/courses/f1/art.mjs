// F1 rules course illustration kit — hand-authored SVG, offline. Generic open-wheel silhouettes with
// team-neutral liveries; no F1/FIA logos, team marks or tyre-maker branding.
const C = { asphalt: '#3a3f47', asphalt2: '#444a53', grass: '#5c9e4f', grass2: '#4f8e43', kerbR: '#d8322b', kerbW: '#f5f5f5', line: '#ffffff', ink: '#141922', gold: '#ffc533', bad: '#e5332a', ok: '#23a26d', pit: '#2c3038' };
export const LIVERY = { red: ['#d7263d', '#1b1b1f'], blue: ['#1f6fe0', '#f2f2f2'], orange: ['#ff8a1c', '#1d2a44'], teal: ['#14a3a0', '#0f1f2b'], silver: ['#c9ced6', '#1a1a1a'], purple: ['#7b4ce0', '#ffd23f'], green: ['#1f8a4c', '#e9f2ea'], yellow: ['#f2c318', '#1a1a1a'] };
let uid = 0; const id = p => `${p}${(uid += 1)}`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const FONT = `font-family="'Noto Sans SC','PingFang SC',system-ui,sans-serif"`;

// Top-down car pointing +x, origin at car centre, length ≈ 100 units.
export function car(o = {}) {
  const [c1, c2] = LIVERY[o.livery ?? 'red'], s = o.scale ?? 1;
  const wheel = (x, y) => `<rect x="${x - 9}" y="${y - 6}" width="18" height="12" rx="3.5" fill="#15171b"/><rect x="${x - 7}" y="${y - 1}" width="14" height="2" rx="1" fill="${o.tyre ?? '#5a5f68'}"/>`;
  const glow = o.hl ? `<ellipse cx="0" cy="0" rx="62" ry="30" fill="none" stroke="${C.gold}" stroke-width="3" stroke-dasharray="7 5"/>` : '';
  const num = o.n != null ? `<text x="-14" y="4.5" text-anchor="middle" font-size="12" font-weight="900" fill="${c2}" font-family="system-ui">${esc(o.n)}</text>` : '';
  return `<g class="f1-car" transform="translate(${o.x ?? 0} ${o.y ?? 0}) rotate(${o.rot ?? 0}) scale(${s})">
   <ellipse cx="2" cy="3" rx="54" ry="22" fill="#000" opacity=".22"/>${glow}
   ${wheel(30, -17)}${wheel(30, 17)}${wheel(-34, -18)}${wheel(-34, 18)}
   <path d="M30 -10L33 -17M30 10L33 17M-34 -9L-34 -18M-34 9L-34 18" stroke="#222" stroke-width="2"/>
   <rect x="44" y="-20" width="8" height="40" rx="2" fill="${c2}"/><rect x="46" y="-20" width="3" height="40" fill="${c1}" opacity=".6"/>
   <path d="M50 -3Q56 0 50 3L18 6L10 -6Z" fill="${c1}"/>
   <path d="M18 -6Q6 -9 -6 -15L-26 -15Q-30 -10 -30 -6L-40 -5L-40 5L-30 6Q-30 10 -26 15L-6 15Q6 9 18 6Z" fill="${c1}"/>
   <path d="M-4 -13L-22 -13Q-25 -9 -25 0Q-25 9 -22 13L-4 13Q-8 0 -4 -13Z" fill="${c2}" opacity=".35"/>
   <ellipse cx="6" cy="0" rx="7" ry="4.6" fill="#111"/><circle cx="6" cy="0" r="3.4" fill="${c2}"/>
   <path d="M13 0Q12 -8 4 -8Q-1 -8 -2 -5M13 0Q12 8 4 8Q-1 8 -2 5" fill="none" stroke="#222" stroke-width="2.4"/>
   <rect x="-52" y="-16" width="9" height="32" rx="2" fill="${c2}"/><rect x="-50" y="-16" width="3" height="32" fill="${c1}"/>
   ${o.open ? `<rect x="-54" y="-16" width="3" height="32" fill="${C.gold}"/>` : ''}${num}</g>`;
}
// Side-view car for active aero: mode 'corner' | 'straight'.
export function aeroSide(mode = 'corner', o = {}) {
  const [c1, c2] = LIVERY[o.livery ?? 'blue'], open = mode === 'straight';
  const fwFlap = open ? 'rotate(-2 70 52)' : 'rotate(-16 70 52)', rwFlap = open ? 'rotate(-2 -78 4)' : 'rotate(-22 -78 4)';
  return `<g transform="translate(${o.x ?? 0} ${o.y ?? 0})">
   <ellipse cx="0" cy="70" rx="120" ry="6" fill="#000" opacity=".18"/>
   <circle cx="58" cy="52" r="18" fill="#15171b"/><circle cx="58" cy="52" r="8" fill="#555"/><circle cx="-62" cy="50" r="20" fill="#15171b"/><circle cx="-62" cy="50" r="9" fill="#555"/>
   <path d="M98 52L80 46L30 40L0 22L-30 20L-70 26L-84 40L-84 54L-40 56L0 54L40 50Z" fill="${c1}"/>
   <path d="M2 22Q12 6 26 18" fill="none" stroke="#222" stroke-width="3"/><circle cx="10" cy="20" r="6" fill="${c2}"/>
   <g transform="${fwFlap}"><rect x="62" y="48" width="34" height="5" rx="2" fill="${c2}"/></g><rect x="84" y="56" width="22" height="4" rx="1" fill="${c2}"/>
   <rect x="-90" y="-14" width="4" height="56" fill="#222"/><rect x="-104" y="-6" width="32" height="7" rx="2" fill="${c2}"/>
   <g transform="${rwFlap}"><rect x="-102" y="4" width="30" height="6" rx="2" fill="${open ? C.gold : c1}"/></g>
   ${(o.flow ?? true) ? (open ? `<path d="M140 -20H-150M140 0H-150" stroke="#7cc4ff" stroke-width="2" stroke-dasharray="10 8" opacity=".8"><animate attributeName="stroke-dashoffset" from="0" to="-36" dur=".6s" repeatCount="indefinite"/></path>` : `<path d="M140 -20Q-40 -20 -90 -40M140 0Q-60 0 -100 -24" fill="none" stroke="#ff9c7c" stroke-width="2" stroke-dasharray="10 8" opacity=".85"><animate attributeName="stroke-dashoffset" from="0" to="-36" dur=".9s" repeatCount="indefinite"/></path>`) : ''}
   </g>`;
}
export function aeroModes(o = {}) {
  return `<svg class="rc-svg animated" viewBox="0 0 640 300" role="img" aria-label="主动空气动力学：弯道模式与直道模式" xmlns="http://www.w3.org/2000/svg"><rect width="640" height="300" rx="14" fill="#0f1726"/>
   <g ${FONT}><text x="160" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#ff9c7c">弯道模式 Corner Mode</text><text x="160" y="56" text-anchor="middle" font-size="13" fill="#c9d4e5">翼片立起 → 下压力大、抓地好、阻力大</text>
   <text x="480" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#7cc4ff">直道模式 Straight Mode</text><text x="480" y="56" text-anchor="middle" font-size="13" fill="#c9d4e5">前后翼片放平 → 阻力小、更省电、更快</text>
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
  const lines = (o.lines ?? []).map(l => `<g><path d="M${l.x} ${top - (l.ext ?? 0)}V${bot + (l.ext ?? 0)}" stroke="${l.c ?? C.line}" stroke-width="${l.wd ?? 4}" ${l.dash ? 'stroke-dasharray="10 6"' : ''}/>${l.t ? `<g><rect x="${l.x - l.t.length * 7 - 8}" y="${(l.ty ?? top - 40) - 16}" width="${l.t.length * 14 + 16}" height="24" rx="6" fill="${l.bg ?? 'rgba(10,14,22,.85)'}"/><text x="${l.x}" y="${(l.ty ?? top - 40) + 1}" text-anchor="middle" font-size="13" font-weight="800" fill="${l.fc ?? '#fff'}" ${FONT}>${esc(l.t)}</text></g>` : ''}</g>`).join('');
  const cars = (o.cars ?? []).map(car).join('');
  const labels = (o.labels ?? []).map(l => `<g><rect x="${l.x - (l.w ?? l.t.length * 14 + 16) / 2}" y="${l.y - 17}" width="${l.w ?? l.t.length * 14 + 16}" height="25" rx="7" fill="${l.bg ?? 'rgba(10,14,22,.82)'}"/><text x="${l.x}" y="${l.y + 1}" text-anchor="middle" font-size="13" font-weight="700" fill="${l.fc ?? '#fff'}" ${FONT}>${esc(l.t)}</text></g>`).join('');
  const arrows = (o.arrows ?? []).map(a => `<path d="${a.d}" fill="none" stroke="${a.c ?? C.gold}" stroke-width="${a.w ?? 4}" stroke-linecap="round" ${a.dash ? 'stroke-dasharray="10 8"' : ''} marker-end="url(#${m}arr${a.c === C.bad ? 'b' : ''})"/>`).join('');
  return `<svg class="rc-svg${o.anim ? ' animated' : ''}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.alt ?? '赛道示意图')}" xmlns="http://www.w3.org/2000/svg"><defs>
   <pattern id="${m}grass" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="${C.grass}"/><rect width="20" height="40" fill="${C.grass2}"/></pattern>
   <pattern id="${m}asph" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="${C.asphalt}"/><circle cx="2" cy="3" r=".7" fill="${C.asphalt2}"/><circle cx="6" cy="6" r=".6" fill="#4d535d"/></pattern>
   <pattern id="${m}kerb" width="32" height="12" patternUnits="userSpaceOnUse"><rect width="16" height="12" fill="${C.kerbR}"/><rect x="16" width="16" height="12" fill="${C.kerbW}"/></pattern>
   <marker id="${m}arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="${C.gold}"/></marker>
   <marker id="${m}arrb" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="${C.bad}"/></marker></defs>
   ${o.custom ? o.custom(m) : straight}${o.under ?? ''}${lines}${arrows}${cars}${o.anim ? o.anim(m) : ''}${labels}${o.extra ?? ''}</svg>`;
}
// Animated car moving along x (SMIL). from/to x, y; dur seconds.
export const drive = (o) => `<g>${car({ ...o, x: 0, y: 0 })}<animateTransform attributeName="transform" type="translate" values="${o.values}" keyTimes="${o.kt ?? '0;1'}" dur="${o.dur ?? 4}s" repeatCount="indefinite"/></g>`;

export function flag(type, o = {}) {
  const w = 120, h = 80, m = id('fl');
  const body = {
    green: `<rect width="${w}" height="${h}" fill="#1fa34a"/>`, yellow: `<rect width="${w}" height="${h}" fill="#ffd400"/>`, red: `<rect width="${w}" height="${h}" fill="#e01b24"/>`,
    blue: `<rect width="${w}" height="${h}" fill="#1f6fe0"/>`, white: `<rect width="${w}" height="${h}" fill="#fafafa" stroke="#bbb"/>`, black: `<rect width="${w}" height="${h}" fill="#111"/>`,
    bw: `<rect width="${w}" height="${h}" fill="#fafafa" stroke="#bbb"/><path d="M0 0H${w}L0 ${h}Z" fill="#111"/>`,
    blackorange: `<rect width="${w}" height="${h}" fill="#111"/><circle cx="${w / 2}" cy="${h / 2}" r="22" fill="#ff7a00"/>`,
    stripes: `<rect width="${w}" height="${h}" fill="#ffd400"/>${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${i * 20}" width="10" height="${h}" fill="#e01b24"/>`).join('')}`,
    chequered: `<pattern id="${m}ch" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="#fff"/><rect width="10" height="10" fill="#111"/><rect x="10" y="10" width="10" height="10" fill="#111"/></pattern><rect width="${w}" height="${h}" fill="url(#${m}ch)" stroke="#999"/>`
  }[type];
  const wave = o.still ? '' : `<animateTransform attributeName="transform" type="skewY" values="0;4;0;-3;0" dur="1.4s" repeatCount="indefinite"/>`;
  return `<g transform="translate(${o.x ?? 0} ${o.y ?? 0}) scale(${o.s ?? 1})"><rect x="-6" y="-4" width="6" height="150" rx="2" fill="#8a8f98"/><g>${body}${wave}</g>${o.t ? `<text x="${w / 2}" y="${h + 26}" text-anchor="middle" font-size="15" font-weight="800" fill="${o.fc ?? C.ink}" ${FONT}>${esc(o.t)}</text>` : ''}</g>`;
}
export function flags(list, o = {}) {
  const gap = 150;
  return `<svg class="rc-svg${o.still ? '' : ' animated'}" viewBox="0 0 ${list.length * gap + 20} ${o.h ?? 175}" role="img" aria-label="${esc(o.alt ?? '旗语：' + list.map(f => f.t).join('、'))}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="14" fill="#eef2f7"/>
   ${list.map((f, i) => flag(f.type, { x: 30 + i * gap, y: 20, t: f.t, still: o.still })).join('')}</svg>`;
}
const TYRE = { soft: ['#e5332a', 'S', '软胎'], medium: ['#f2c318', 'M', '中性胎'], hard: ['#f2f2f2', 'H', '硬胎'], inter: ['#23a24a', 'I', '半雨胎'], wet: ['#1f6fe0', 'W', '全雨胎'] };
export function tyre(kind, o = {}) {
  const [c, l, name] = TYRE[kind];
  return `<g transform="translate(${o.x ?? 0} ${o.y ?? 0}) scale(${o.s ?? 1})"><circle r="52" fill="#16181c"/><circle r="40" fill="none" stroke="${c}" stroke-width="5"/>${kind === 'inter' || kind === 'wet' ? `<path d="M-46 -12l10 4M-48 4l10 2M46 -12l-10 4M48 4l-10 2" stroke="#333" stroke-width="3"/>` : ''}<circle r="24" fill="#8d939c"/><circle r="8" fill="#cfd4db"/>
   ${[0, 60, 120, 180, 240, 300].map(a => `<path d="M0 0L0 -22" transform="rotate(${a})" stroke="#6c727b" stroke-width="5"/>`).join('')}<circle r="8" fill="#cfd4db"/>
   <text y="74" text-anchor="middle" font-size="15" font-weight="800" fill="${o.fc ?? C.ink}" ${FONT}>${esc(o.t ?? name)}</text><text x="0" y="-31" text-anchor="middle" font-size="11" font-weight="900" fill="${c}" font-family="system-ui">${l}</text></g>`;
}
export function tyres(list, o = {}) {
  return `<svg class="rc-svg" viewBox="0 0 ${list.length * 140 + 20} 170" role="img" aria-label="${esc(o.alt ?? '轮胎配方')}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="14" fill="#eef2f7"/>${list.map((k, i) => tyre(k.kind ?? k, { x: 80 + i * 140, y: 68, t: k.t })).join('')}</svg>`;
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
    const on = o.anim ? `<animate attributeName="fill" values="#2a1212;#2a1212;#ff2a1f;#ff2a1f;#2a1212" keyTimes="0;${(i + 1) / 7};${(i + 1) / 7 + .001};.857;.858" dur="4.2s" repeatCount="indefinite"/>` : '';
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
     <text x="320" y="176" text-anchor="middle" font-size="12" fill="#c9d4e5" ${FONT}>快车道 Fast Lane</text><text x="320" y="246" text-anchor="middle" font-size="12" fill="#c9d4e5" ${FONT}>内车道（工作区） Inner Lane</text>
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
      <path d="M-10 290H300Q480 290 520 150Q540 60 650 40" fill="none" stroke="url(#${m}kerb)" stroke-width="112"/>
      <path d="M-10 290H300Q480 290 520 150Q540 60 650 40" fill="none" stroke="#fff" stroke-width="96"/>
      <path d="M-10 290H300Q480 290 520 150Q540 60 650 40" fill="none" stroke="url(#${m}asph)" stroke-width="88"/>` });
}

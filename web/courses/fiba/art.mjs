// FIBA course illustration kit — hand-authored SVG, offline, team-neutral (no logos/trademarks).
// All court geometry is in metres, taken from OBR 2026 Art. 2 (28 × 15 m court, 6.75 m three-point arc,
// 0.90 m side gap, 1.25 m no-charge semi-circle, 4.90 × 5.80 m restricted area, ring centre 1.575 m from the end line).
const S = 34; // px per metre
const C = { floor: '#f3d7a6', floor2: '#ecc98f', paint: '#d9542b', paintFill: 'rgba(217,84,43,.16)', line: '#fffaf0', ink: '#1f2433', a: '#e2483d', aDark: '#a3261f', b: '#2f6fdb', bDark: '#173f8a', ref: '#3b3f4a', ball: '#e8731c', gold: '#ffc533', ok: '#1f9d6b', bad: '#d4372c' };
let uid = 0;
const id = p => `${p}${(uid += 1)}`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

function defs(m) {
  return `<defs>
  <pattern id="${m}wood" width="1.2" height="15" patternUnits="userSpaceOnUse"><rect width="1.2" height="15" fill="${C.floor}"/><rect width=".6" height="15" fill="${C.floor2}" opacity=".45"/><line x1="0" y1="0" x2="0" y2="15" stroke="#d9b57a" stroke-width=".02"/></pattern>
  <marker id="${m}run" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${C.ink}"/></marker>
  <marker id="${m}pass" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${C.ball}"/></marker>
  <marker id="${m}bad" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${C.bad}"/></marker>
  <radialGradient id="${m}ballg" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#ffb066"/><stop offset="1" stop-color="${C.ball}"/></radialGradient>
  <filter id="${m}sh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx=".06" dy=".1" stdDeviation=".08" flood-opacity=".35"/></filter>
  </defs>`;
}
const ballSvg = (m, x, y, r = 0.24) => `<g class="fb-ball"><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${m}ballg)" stroke="#5a2a07" stroke-width=".03"/><path d="M${x - r} ${y}H${x + r}M${x} ${y - r}V${y + r}" stroke="#5a2a07" stroke-width=".025"/><path d="M${x - r * .7} ${y - r * .7}Q${x} ${y} ${x - r * .7} ${y + r * .7}M${x + r * .7} ${y - r * .7}Q${x} ${y} ${x + r * .7} ${y + r * .7}" fill="none" stroke="#5a2a07" stroke-width=".022"/></g>`;

// A player token: jersey-coloured disc with number, white rim, soft shadow; optional ball, facing arrow and ring highlight.
function token(m, p) {
  const fill = p.t === 'b' ? C.b : p.t === 'ref' ? C.ref : C.a, dark = p.t === 'b' ? C.bDark : p.t === 'ref' ? '#16181d' : C.aDark;
  const r = 0.42, ring = p.hl ? `<circle cx="${p.x}" cy="${p.y}" r="${r + .16}" fill="none" stroke="${C.gold}" stroke-width=".08" stroke-dasharray=".18 .1"/>` : '';
  const face = p.face != null ? `<path d="M${p.x} ${p.y}l${Math.cos(p.face) * .75} ${Math.sin(p.face) * .75}" stroke="${dark}" stroke-width=".07" stroke-linecap="round" opacity=".7"/>` : '';
  const stripes = p.t === 'ref' ? `<path d="M${p.x - .3} ${p.y - .28}V${p.y + .28}M${p.x} ${p.y - .42}V${p.y + .42}M${p.x + .3} ${p.y - .28}V${p.y + .28}" stroke="#fff" stroke-width=".09" opacity=".85"/>` : '';
  const label = p.t === 'ref' ? '' : `<text x="${p.x}" y="${p.y + .15}" text-anchor="middle" font-size=".42" font-weight="800" fill="#fff" font-family="system-ui,sans-serif">${esc(p.n ?? '')}</text>`;
  const tag = p.tag ? `<g><rect x="${p.x - p.tag.length * .17 - .12}" y="${p.y + .52}" width="${p.tag.length * .34 + .24}" height=".42" rx=".2" fill="${C.ink}" opacity=".85"/><text x="${p.x}" y="${p.y + .83}" text-anchor="middle" font-size=".3" fill="#fff" font-family="system-ui,sans-serif">${esc(p.tag)}</text></g>` : '';
  const ball = p.ball ? ballSvg(m, p.x + .38, p.y - .34) : '';
  return `<g class="fb-token">${ring}${face}<circle cx="${p.x}" cy="${p.y}" r="${r}" fill="${fill}" stroke="#fff" stroke-width=".07" filter="url(#${m}sh)"/>${stripes}${label}${ball}${tag}</g>`;
}
function arrow(m, a) {
  const style = { run: `stroke="${C.ink}" stroke-width=".07" marker-end="url(#${m}run)"`, pass: `stroke="${C.ball}" stroke-width=".07" stroke-dasharray=".25 .15" marker-end="url(#${m}pass)"`,
    dribble: `stroke="${C.ink}" stroke-width=".06" stroke-dasharray=".08 .1" marker-end="url(#${m}run)"`, bad: `stroke="${C.bad}" stroke-width=".08" marker-end="url(#${m}bad)"`, shot: `stroke="${C.ball}" stroke-width=".06" stroke-dasharray=".05 .12" stroke-linecap="round" marker-end="url(#${m}pass)"` }[a.kind ?? 'run'];
  return `<path d="${a.d}" fill="none" stroke-linecap="round" ${style}/>`;
}
const label = l => { const w = Math.max(l.w ?? 0, l.text.length * .4 + .5); return `<g><rect x="${l.x - w / 2}" y="${l.y - .44}" width="${w}" height=".64" rx=".18" fill="${l.bg ?? 'rgba(31,36,51,.88)'}"/><text x="${l.x}" y="${l.y + .02}" text-anchor="middle" font-size=".38" font-weight="700" fill="${l.fg ?? '#fff'}" font-family="'Noto Sans SC','PingFang SC',system-ui,sans-serif">${esc(l.text)}</text></g>`; };

// Half-court lines (portrait, basket at top). y = distance from the end line, x across the 15 m width.
function halfLines(hl = []) {
  const ring = 1.575, ft = 5.8, yj = Math.sqrt(6.75 ** 2 - 6.6 ** 2) + ring;
  const h = k => hl.includes(k);
  return `<g fill="none" stroke="${C.line}" stroke-width=".07">
   <rect x="5.05" y="0" width="4.9" height="${ft}" fill="${h('paint') ? 'rgba(255,197,51,.45)' : C.paintFill}" stroke="${C.line}"/>
   <path d="M5.7 ${ft}A1.8 1.8 0 0 0 9.3 ${ft}" /><path d="M5.7 ${ft}A1.8 1.8 0 0 1 9.3 ${ft}" stroke-dasharray=".3 .25"/>
   <path d="M0.9 0V${yj}A6.75 6.75 0 0 0 14.1 ${yj}V0" ${h('three') ? `stroke="${C.gold}" stroke-width=".14"` : ''}/>
   <path d="M6.25 1.2V1.575A1.25 1.25 0 0 0 8.75 1.575V1.2" ${h('nocharge') ? `stroke="${C.gold}" stroke-width=".14" fill="rgba(255,197,51,.35)"` : ''}/>
   <path d="M0 8.325H.15M14.85 8.325H15" />
   <path d="M5.05 1.75h-.1M5.05 2.6h-.1M5.05 3.45h-.1M9.95 1.75h.1M9.95 2.6h.1M9.95 3.45h.1" />
  </g>
  <g><rect x="6.6" y="1.12" width="1.8" height=".08" fill="#fff" stroke="${C.ink}" stroke-width=".03"/><path d="M7.5 1.2V1.36" stroke="${C.ink}" stroke-width=".05"/>
   <circle cx="7.5" cy="${ring}" r=".225" fill="none" stroke="${C.ball}" stroke-width=".06"/></g>`;
}
export function court(o = {}) {
  const m = id('fb'), W = 15, L = o.full ? 28 : 14, pad = 0.6;
  const w = (o.full ? L : W) + pad * 2, hgt = (o.full ? W : L) + pad * 2;
  let lines;
  if (o.full) {
    // Landscape: end lines at x=0 and x=28; we reuse the half-court drawing rotated.
    lines = `<g transform="matrix(0 1 1 0 0 0)">${halfLines(o.hl)}</g><g transform="matrix(0 1 -1 0 28 0)">${halfLines(o.hl)}</g>
     <g fill="none" stroke="${C.line}" stroke-width=".07"><path d="M14 0V15"/><circle cx="14" cy="7.5" r="1.8" fill="${o.hl?.includes('centre') ? 'rgba(255,197,51,.5)' : 'none'}"/></g>
     ${o.hl?.includes('backcourt') ? `<rect x="0" y="0" width="14" height="15" fill="rgba(47,111,219,.13)"/>` : ''}`;
  } else lines = halfLines(o.hl) + `<path d="M0 14H15" stroke="${C.line}" stroke-width=".07"/><path d="M5.7 14A1.8 1.8 0 0 1 9.3 14" fill="none" stroke="${C.line}" stroke-width=".07"/>`;
  const zones = (o.zones ?? []).map(z => `<path d="${z.d}" fill="${z.fill ?? 'rgba(255,197,51,.35)'}" stroke="${z.stroke ?? 'none'}" stroke-width=".06"/>`).join('');
  const body = (o.arrows ?? []).map(a => arrow(m, a)).join('') + (o.tokens ?? []).map(p => token(m, p)).join('') + (o.balls ?? []).map(b => ballSvg(m, b.x, b.y)).join('') + (o.labels ?? []).map(label).join('') + (o.extra ?? '');
  const anim = o.anim ? `<g class="fb-anim">${o.anim(m)}</g>` : '';
  const vw = w * S, vh = hgt * S;
  return `<svg class="rc-svg${o.anim ? ' animated' : ''}" viewBox="0 0 ${vw} ${vh}" role="img" aria-label="${esc(o.alt ?? '篮球场示意图')}" xmlns="http://www.w3.org/2000/svg">${defs(m)}
   <g transform="scale(${S}) translate(${pad} ${pad})"><rect x="-${pad}" y="-${pad}" width="${w}" height="${hgt}" rx=".3" fill="#2b3a4f"/>
   <rect x="0" y="0" width="${o.full ? L : W}" height="${o.full ? W : L}" fill="url(#${m}wood)"/><rect x="0" y="0" width="${o.full ? L : W}" height="${o.full ? W : L}" fill="none" stroke="${C.line}" stroke-width=".07"/>
   ${lines}${zones}${body}${anim}</g></svg>`;
}
// SMIL helpers: move a token/ball along a path, looping, 'begin' offset seconds.
export const moving = (m, kind, path, dur = 3, extra = {}) => {
  const n = extra.n ?? '', t = extra.t ?? 'a';
  const shape = kind === 'ball' ? ballSvg(m, 0, 0) : token(m, { x: 0, y: 0, t, n, ball: extra.ball });
  return `<g>${shape}<animateMotion dur="${dur}s" repeatCount="indefinite" path="${path}" keyPoints="${extra.kp ?? '0;1;1'}" keyTimes="${extra.kt ?? '0;.8;1'}" calcMode="linear"/></g>`;
};

// Referee figure with signal poses (simplified from OBR Appendix A diagrams, drawn in our own style).
const POSES = {
  travel: { l: [[-0.9, -1.3], [-0.2, -1.6]], r: [[0.9, -1.3], [0.2, -1.0]], note: '双拳在胸前绕圈' },
  dribble: { l: [[-1.0, -1.1], [-0.6, -0.6]], r: [[1.0, -1.1], [0.6, -0.6]], note: '双手掌心向下上下拍' },
  three: { l: [[-0.6, -0.5], [-0.5, 0.2]], r: [[0.8, -2.2], [0.9, -3.0]], note: '单手举起三指' },
  goal3: { l: [[-0.8, -2.2], [-0.9, -3.0]], r: [[0.8, -2.2], [0.9, -3.0]], note: '双手高举（三分球中篮）' },
  foul: { l: [[-0.6, -0.5], [-0.5, 0.2]], r: [[0.5, -2.2], [0.4, -3.1]], fist: 'r', note: '握拳高举：犯规，停表' },
  timeout: { l: [[-0.9, -1.9], [0.3, -1.9]], r: [[0.2, -1.2], [0.2, -2.1]], note: '双手搭成“T”' },
  block: { l: [[-1.0, -0.8], [-0.5, -0.3]], r: [[1.0, -0.8], [0.5, -0.3]], note: '双手叉腰：阻挡' },
  charge: { l: [[-0.6, -0.5], [-0.5, 0.2]], r: [[0.9, -1.4], [1.7, -1.5]], fist: 'r', note: '握拳向前推：带球撞人' },
  stop: { l: [[-0.6, -0.5], [-0.5, 0.2]], r: [[0.5, -2.2], [0.4, -3.1]], palm: 'r', note: '张开手掌高举：违例，停表' },
  shotclock: { l: [[-0.6, -0.5], [-0.5, 0.2]], r: [[0.6, -2.2], [0.5, -3.0]], twirl: true, note: '手指在头顶画圈：重置进攻计时' },
  tech: { l: [[-0.9, -1.9], [0.3, -1.9]], r: [[0.2, -1.2], [0.2, -2.1]], note: '手掌搭成“T”（技术犯规）' },
  pointDir: { l: [[-0.6, -0.5], [-0.5, 0.2]], r: [[1.0, -1.6], [1.9, -1.6]], note: '手臂平指：进攻方向' }
};
export function referee(pose = 'foul', o = {}) {
  const p = POSES[pose], m = id('rf');
  const arm = (pts, side) => { const sx = side === 'l' ? -0.42 : 0.42; const [e, h] = pts; return `<path d="M${sx} -1.55L${e[0]} ${e[1]}L${h[0]} ${h[1]}" fill="none" stroke="#2c2f36" stroke-width=".3" stroke-linecap="round" stroke-linejoin="round"/><path d="M${sx} -1.55L${e[0]} ${e[1]}" stroke="url(#${m}st)" stroke-width=".3" stroke-linecap="round"/><circle cx="${h[0]}" cy="${h[1]}" r=".16" fill="#e8b48a"/>`; };
  const twirl = p.twirl ? `<circle cx="0.5" cy="-3.3" r=".35" fill="none" stroke="${C.gold}" stroke-width=".07" stroke-dasharray=".2 .1"><animateTransform attributeName="transform" type="rotate" from="0 .5 -3.3" to="360 .5 -3.3" dur="1.6s" repeatCount="indefinite"/></circle>` : '';
  return `<svg class="rc-svg" viewBox="-2.6 -4 5.2 6.4" role="img" aria-label="${esc(o.alt ?? '裁判手势：' + p.note)}" xmlns="http://www.w3.org/2000/svg">
   <defs><pattern id="${m}st" width=".24" height=".24" patternUnits="userSpaceOnUse"><rect width=".24" height=".24" fill="#f4f4f4"/><rect width=".12" height=".24" fill="#1d1f24"/></pattern></defs>
   <rect x="-2.6" y="-4" width="5.2" height="6.4" rx=".2" fill="${o.bg ?? '#eef2f8'}"/>
   <ellipse cx="0" cy="1.95" rx="1.1" ry=".16" fill="#000" opacity=".12"/>
   <path d="M-.28 .1L-.36 1.9M.28 .1L.36 1.9" stroke="#2c2f36" stroke-width=".26" stroke-linecap="round"/>
   <path d="M-.5 -1.7Q0 -1.85 .5 -1.7L.42 .2H-.42Z" fill="url(#${m}st)" stroke="#1d1f24" stroke-width=".04"/>
   ${arm(p.l, 'l')}${arm(p.r, 'r')}
   <circle cx="0" cy="-2.15" r=".36" fill="#e8b48a"/><path d="M-.36 -2.25Q0 -2.7 .36 -2.25" fill="#3a2a1e"/>
   <circle cx="-.1" cy="-2.13" r=".03" fill="#222"/><circle cx=".12" cy="-2.13" r=".03" fill="#222"/>
   <path d="M.05 -1.95l.16 .12" stroke="#c48a2c" stroke-width=".05"/>${twirl}
   <text x="0" y="2.25" text-anchor="middle" font-size=".3" font-weight="700" fill="${C.ink}" font-family="'Noto Sans SC','PingFang SC',system-ui,sans-serif">${esc(o.caption ?? p.note)}</text></svg>`;
}
export const POSE_NAMES = Object.keys(POSES);

// Scoreboard widget: game clock + shot clock (+ optional team fouls), LED style.
export function clocks(o = {}) {
  const shot = o.shot ?? 24, warn = shot <= 5;
  const tf = o.fouls ? `<g transform="translate(330 30)"><text x="0" y="16" fill="#9fb3c8" font-size="13" font-family="system-ui">全队犯规</text>${[0,1,2,3,4].map(i => `<rect x="${i * 18}" y="26" width="13" height="20" rx="3" fill="${i < o.fouls ? (o.fouls >= 4 ? '#ff5a4e' : '#ffc533') : '#2c3a4d'}"/>`).join('')}</g>` : '';
  const anim = o.countdown ? `<text x="252" y="92" text-anchor="middle" font-size="52" font-weight="800" fill="${warn ? '#ff5a4e' : '#ffc533'}" font-family="ui-monospace,Menlo,monospace">${shot}<animate attributeName="opacity" values="1;.25;1" dur="1s" repeatCount="indefinite"/></text>` : `<text x="252" y="92" text-anchor="middle" font-size="52" font-weight="800" fill="${warn ? '#ff5a4e' : '#ffc533'}" font-family="ui-monospace,Menlo,monospace">${shot}</text>`;
  return `<svg class="rc-svg" viewBox="0 0 ${o.fouls ? 440 : 330} 140" role="img" aria-label="${esc(o.alt ?? `比赛计时 ${o.game ?? '10:00'}，进攻计时 ${shot} 秒`)}" xmlns="http://www.w3.org/2000/svg">
   <rect x="2" y="2" width="${o.fouls ? 436 : 326}" height="136" rx="16" fill="#101826" stroke="#3a4b63" stroke-width="2"/>
   <text x="24" y="34" fill="#9fb3c8" font-size="14" font-family="system-ui">${esc(o.period ?? '第 4 节')} · 比赛计时</text>
   <text x="24" y="92" font-size="${String(o.game ?? '10:00').length > 5 ? 38 : 48}" font-weight="800" fill="#f2f6fb" font-family="ui-monospace,Menlo,monospace" ${String(o.game ?? '10:00').length > 5 ? 'textLength="160" lengthAdjust="spacingAndGlyphs"' : ''}>${esc(o.game ?? '10:00')}</text>
   <rect x="196" y="22" width="112" height="96" rx="12" fill="#1b2638" stroke="${warn ? '#ff5a4e' : '#ffc533'}" stroke-width="2"/>
   <text x="252" y="40" text-anchor="middle" fill="#9fb3c8" font-size="12" font-family="system-ui">进攻计时</text>${anim}
   ${tf}<text x="24" y="124" fill="#7d8ea3" font-size="13" font-family="'Noto Sans SC',system-ui">${esc(o.note ?? '')}</text></svg>`;
}

// Footstep frames for travelling / gather / zero step. steps: [{l:'L'|'R'|'LR'|'', ball:'dribble'|'hold'|'air', txt, bad}]
export function steps(list, o = {}) {
  const w = 132, m = id('st');
  const foot = (x, y, side, on) => `<g transform="translate(${x} ${y}) ${side === 'R' ? 'scale(-1 1)' : ''}"><path d="M-9 14C-14 0-10-20 0-22C9-22 12-8 8 6C6 16-6 22-9 14Z" fill="${on ? C.ink : 'none'}" stroke="${C.ink}" stroke-width="2" ${on ? '' : 'stroke-dasharray="3 3" opacity=".45"'}/></g>`;
  const cells = list.map((s, i) => {
    const x = i * w + 10, bad = s.bad;
    const ballY = s.ball === 'dribble' ? 112 : s.ball === 'air' ? 48 : 66;
    return `<g transform="translate(${x} 0)"><rect x="0" y="0" width="${w - 12}" height="190" rx="14" fill="${bad ? '#fde8e6' : '#fff'}" stroke="${bad ? C.bad : '#d6dbe4'}" stroke-width="2"/>
     <text x="${(w - 12) / 2}" y="22" text-anchor="middle" font-size="14" font-weight="800" fill="${bad ? C.bad : C.ink}" font-family="'Noto Sans SC',system-ui">${esc(s.head ?? `第 ${i + 1} 帧`)}</text>
     ${foot(38, 120, 'L', s.l?.includes('L'))}${foot(82, 120, 'R', s.l?.includes('R'))}
     <text x="38" y="158" text-anchor="middle" font-size="11" fill="#6b7280">左</text><text x="82" y="158" text-anchor="middle" font-size="11" fill="#6b7280">右</text>
     <g transform="translate(${(w - 12) / 2} ${ballY})">${ballSvg(m, 0, 0, 11).replace(/stroke-width="\.0\d+"/g, 'stroke-width="1.2"')}</g>
     <text x="${(w - 12) / 2}" y="180" text-anchor="middle" font-size="12" fill="${C.ink}" font-family="'Noto Sans SC',system-ui">${esc(s.txt)}</text></g>`;
  }).join('');
  return `<svg class="rc-svg" viewBox="0 0 ${list.length * w + 8} 196" role="img" aria-label="${esc(o.alt ?? '脚步分解图')}" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="${m}ballg" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#ffb066"/><stop offset="1" stop-color="${C.ball}"/></radialGradient></defs>${cells}</svg>`;
}

// Side-view figures: cylinder principle, charge vs block, verticality.
function person(x, color, o = {}) {
  const lean = o.lean ?? 0, arms = o.arms ?? 'down', y0 = 0;
  const armPath = arms === 'up' ? `M${x - 12} -118L${x - 16} -170M${x + 12} -118L${x + 16} -170` : arms === 'out' ? `M${x - 12} -118L${x - 46} -100M${x + 12} -118L${x + 46} -100` : arms === 'push' ? `M${x + 12} -118L${x + 48} -112` + `M${x - 12} -118L${x - 22} -78` : `M${x - 12} -118L${x - 22} -78M${x + 12} -118L${x + 22} -78`;
  return `<g transform="rotate(${lean} ${x} ${y0})"><path d="M${x - 8} -70L${x - 14} -2M${x + 8} -70L${x + 14} -2" stroke="${color}" stroke-width="12" stroke-linecap="round"/><path d="M${x - 16} -128Q${x} -134 ${x + 16} -128L${x + 12} -66H${x - 12}Z" fill="${color}"/>
   <path d="${armPath}" stroke="${color}" stroke-width="10" stroke-linecap="round" fill="none"/><circle cx="${x}" cy="-146" r="14" fill="#e8b48a"/></g>`;
}
export function sideView(kind, o = {}) {
  const ground = `<rect x="0" y="0" width="520" height="40" fill="#e9c58c"/><path d="M0 0H520" stroke="#c99b5c" stroke-width="2"/>`;
  let body = '';
  if (kind === 'cylinder') body = `${person(200, C.b, { arms: 'up' })}<g opacity=".9"><ellipse cx="200" cy="-2" rx="52" ry="12" fill="rgba(47,111,219,.12)" stroke="${C.b}" stroke-width="2"/><path d="M148 -2V-200M252 -2V-200" stroke="${C.b}" stroke-width="2" stroke-dasharray="6 5"/><ellipse cx="200" cy="-200" rx="52" ry="12" fill="rgba(47,111,219,.08)" stroke="${C.b}" stroke-width="2" stroke-dasharray="6 5"/></g>
     ${person(360, C.a, { arms: 'up', lean: 8 })}<path d="M300 -150L262 -150" stroke="${C.bad}" stroke-width="4" marker-end="url(#svbad)"/><text x="200" y="-212" text-anchor="middle" font-size="15" font-weight="800" fill="${C.b}">防守人的圆柱体</text><text x="380" y="-190" text-anchor="middle" font-size="14" fill="${C.bad}" font-weight="700">侵入别人圆柱体 = 犯规</text>`;
  else if (kind === 'charge') body = `${person(150, C.a, { lean: 16, arms: 'push' })}${person(300, C.b, { arms: 'down', lean: -12 })}<path d="M205 -110L262 -110" stroke="${C.bad}" stroke-width="4" marker-end="url(#svbad)"/><text x="260" y="-180" text-anchor="middle" font-size="15" font-weight="800" fill="${C.ink}">防守人已站好位置、身体正对</text><text x="170" y="-200" text-anchor="middle" font-size="14" fill="${C.a}" font-weight="700">进攻人撞上去 → 带球撞人</text>`;
  else if (kind === 'block') body = `${person(160, C.a, { arms: 'up', lean: 4 })}${person(290, C.b, { arms: 'out', lean: 16 })}<path d="M300 -60L268 -60" stroke="${C.bad}" stroke-width="4" marker-end="url(#svbad)"/><text x="260" y="-190" text-anchor="middle" font-size="15" font-weight="800" fill="${C.bad}">防守人还在移动、斜插进路线 → 阻挡</text>`;
  else if (kind === 'vertical') body = `${person(200, C.b, { arms: 'up' })}${person(310, C.a, { arms: 'up', lean: -4 })}<path d="M148 -2V-200M252 -2V-200" stroke="${C.ok}" stroke-width="2" stroke-dasharray="6 5"/><text x="250" y="-210" text-anchor="middle" font-size="15" font-weight="800" fill="${C.ok}">垂直起跳、双手直上 = 合法防守</text>`;
  return `<svg class="rc-svg" viewBox="0 -240 520 280" role="img" aria-label="${esc(o.alt ?? '侧视示意图')}" xmlns="http://www.w3.org/2000/svg"><defs><marker id="svbad" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="${C.bad}"/></marker></defs>
   <rect x="0" y="-240" width="520" height="280" fill="#eef4fb"/><g font-family="'Noto Sans SC','PingFang SC',system-ui,sans-serif">${ground}${body}</g></svg>`;
}
// Simple info card diagram: big icons/rows (e.g. foul ladder, penalty table).
export function table(rows, o = {}) {
  const h = 46, w = o.w ?? 560;
  return `<svg class="rc-svg" viewBox="0 0 ${w} ${rows.length * h + (o.title ? 50 : 10)}" role="img" aria-label="${esc(o.title ?? '规则表')}" xmlns="http://www.w3.org/2000/svg"><g font-family="'Noto Sans SC','PingFang SC',system-ui,sans-serif">
   ${o.title ? `<text x="16" y="32" font-size="18" font-weight="800" fill="${C.ink}">${esc(o.title)}</text>` : ''}
   ${rows.map((r, i) => { const y = (o.title ? 44 : 6) + i * h; return `<rect x="6" y="${y}" width="${w - 12}" height="${h - 6}" rx="10" fill="${i % 2 ? '#f6f8fb' : '#fff'}" stroke="#dfe4ec"/><rect x="6" y="${y}" width="10" height="${h - 6}" rx="4" fill="${r.c ?? C.b}"/><text x="28" y="${y + 26}" font-size="15" font-weight="800" fill="${C.ink}">${esc(r.k)}</text><text x="${o.split ?? 200}" y="${y + 26}" font-size="14" fill="#3b4252">${esc(r.v)}</text>`; }).join('')}
  </g></svg>`;
}
export const colors = C;

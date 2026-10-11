import { signalFigure, signalNames, athlete, hoop, hand } from './figures.mjs';
// FIBA course illustration kit — hand-authored SVG, offline, team-neutral (no logos/trademarks).
// All court geometry is in metres, taken from OBR 2026 Art. 2 (28 × 15 m court, 6.75 m three-point arc,
// 0.90 m side gap, 1.25 m no-charge semi-circle, 4.90 × 5.80 m restricted area, ring centre 1.575 m from the end line).
const S = 34; // px per metre
const C = { floor: '#f3d7a6', floor2: '#ecc98f', paint: '#d9542b', paintFill: 'rgba(217,84,43,.16)', line: '#fffaf0', ink: '#1f2433', a: '#e2483d', aDark: '#a3261f', b: '#2f6fdb', bDark: '#173f8a', ref: '#3b3f4a', ball: '#e8731c', gold: '#ffc533', ok: '#1f9d6b', bad: '#d4372c' };
// Stable scoped paint-server IDs, independent of import/evaluation order.
const id = (prefix, value = '') => { let h = 2166136261; for (const c of JSON.stringify(value, (_, v) => typeof v === 'function' ? String(v) : v)) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0; return `${prefix}-${h.toString(36)}-`; };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

function defs(m) {
  return `<defs>
  <pattern id="${m}wood" width="2.4" height="5.6" patternUnits="userSpaceOnUse"><rect width="2.4" height="5.6" fill="#e8c48d"/>
   ${['#f1d5a7','#e9c491','#efd0a0','#e7bf87','#f0cfa0','#eac792'].map((c,i)=>`<rect x="${i*.4}" width=".4" height="5.6" fill="${c}"/><path d="M${i*.4} 0V5.6M${i*.4} ${(i%3)*1.8+.2}h.4" stroke="#ac7e48" stroke-width=".012" opacity=".48"/><path d="M${i*.4+.08} .1Q${i*.4+.16} 1.8 ${i*.4+.09} 3.3T${i*.4+.1} 5.5M${i*.4+.3} .6Q${i*.4+.25} 2.7 ${i*.4+.31} 5.1" stroke="#a77943" stroke-width=".009" fill="none" opacity=".18"/>`).join('')}
  </pattern>
  <linearGradient id="${m}finish" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".13"/><stop offset=".46" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#874611" stop-opacity=".06"/></linearGradient>
  ${[['run',C.ink],['pass',C.ball],['bad',C.bad]].map(([k,c])=>`<marker id="${m}${k}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker>`).join('')}
  ${[['a','#f37365',C.aDark],['b','#65a0f4',C.bDark],['ref','#80909e','#263a4a']].map(([k,c,d])=>`<linearGradient id="${m}jersey-${k}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${c}"/><stop offset="1" stop-color="${d}"/></linearGradient>`).join('')}
  <radialGradient id="${m}ballg" cx=".3" cy=".25" r=".8"><stop stop-color="#ffc479"/><stop offset=".5" stop-color="#ef8a2e"/><stop offset="1" stop-color="#b94b15"/></radialGradient>
  <filter id="${m}sh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx=".03" dy=".07" stdDeviation=".045" flood-color="#18304b" flood-opacity=".25"/></filter>
  </defs>`;
}
const ballSvg = (m, x, y, r = .24) => `<g class="fb-ball" transform="translate(${x} ${y}) scale(${r})"><circle r="1" fill="url(#${m}ballg)" stroke="#65321c" stroke-width=".07"/>
 <path d="M-1-.06Q0 .2 1-.06M-.16-.98Q.24 0-.16.98M-.78-.62Q.35-.45.65.75M.66-.75Q-.45-.5-.74.67" fill="none" stroke="#603322" stroke-width=".065"/>
 <path d="M-.55-.82Q-.1-1 .32-.86" stroke="#ffe3b9" stroke-width=".06" fill="none" opacity=".7"/>
 ${[[-.54,-.39],[-.32,-.59],[.13,-.5],[.5,-.23],[-.55,.2],[-.38,.47],[.12,.36],[.36,.56],[.6,.2],[-.22,.72]].map(([u,v])=>`<circle cx="${u}" cy="${v}" r=".022" fill="#7f431e" opacity=".32"/>`).join('')}</g>`;

// A readable numbered tactical marker; no team logos.
function token(m, p) {
  const r = .44, team = p.t ?? 'a';
  const ring = p.hl ? `<circle cx="${p.x}" cy="${p.y}" r=".6" fill="none" stroke="${C.gold}" stroke-width=".075" stroke-dasharray=".18 .1"/>` : '';
  const face = p.face != null ? `<path d="M${p.x} ${p.y}l${Math.cos(p.face)*.75} ${Math.sin(p.face)*.75}" stroke="#1e3854" stroke-width=".07" stroke-linecap="round"/>` : '';
  const stripes = team === 'ref' ? `<path d="M${p.x-.21} ${p.y-.3}v.6M${p.x} ${p.y-.35}v.7M${p.x+.21} ${p.y-.3}v.6" stroke="#edf3f8" stroke-width=".075"/>` : `<path d="M${p.x-.12} ${p.y-.32}q.12 .14 .24 0" stroke="#fff" stroke-width=".04" fill="none" opacity=".65"/><text x="${p.x}" y="${p.y+.18}" text-anchor="middle" font-size=".48" font-weight="850" fill="#fff" font-family="system-ui,sans-serif">${esc(p.n ?? '')}</text>`;
  const tagW = [...(p.tag ?? '')].length * .38 + .28;
  const tag = p.tag ? `<rect x="${p.x-tagW/2}" y="${p.y+.54}" width="${tagW}" height=".51" rx=".16" fill="#1d3047"/><text x="${p.x}" y="${p.y+.93}" text-anchor="middle" font-size=".38" fill="#fff" font-family="system-ui,sans-serif">${esc(p.tag)}</text>` : '';
  return `<g class="fb-token">${ring}${face}<circle cx="${p.x}" cy="${p.y}" r="${r}" fill="url(#${m}jersey-${team})" stroke="#fff" stroke-width=".065" filter="url(#${m}sh)"/>${stripes}${p.ball?ballSvg(m,p.x+.4,p.y-.36):''}${tag}</g>`;
}
function arrow(m, a) {
  const style = { run: `stroke="${C.ink}" stroke-width=".07" marker-end="url(#${m}run)"`, pass: `stroke="${C.ball}" stroke-width=".07" stroke-dasharray=".25 .15" marker-end="url(#${m}pass)"`, dribble: `stroke="${C.ink}" stroke-width=".06" stroke-dasharray=".08 .1" marker-end="url(#${m}run)"`, bad: `stroke="${C.bad}" stroke-width=".08" marker-end="url(#${m}bad)"`, shot: `stroke="${C.ball}" stroke-width=".06" stroke-dasharray=".05 .12" marker-end="url(#${m}pass)"` }[a.kind ?? 'run'];
  return `<path d="${a.d}" fill="none" stroke-linecap="round" ${style}/>`;
}
const label = (l, cw = 15) => {
  const lines = l.lines ?? [l.text], font = .49;
  const measure = str => [...str].reduce((w,c)=>w+(/[\u3000-\u9fff]/.test(c)?font:font*.57),0);
  const w = Math.max(l.w ?? 0, ...lines.map(measure))+.48, h = lines.length*.61+.2;
  const x = Math.min(cw-w/2-.14,Math.max(w/2+.14,l.x)), y = l.y;
  const leader = l.anchor ? `<path d="M${l.anchor[0]} ${l.anchor[1]}L${x} ${y}" fill="none" stroke="#243b53" stroke-width=".045"/><circle cx="${l.anchor[0]}" cy="${l.anchor[1]}" r=".11" fill="#ffc533" stroke="#293d51" stroke-width=".03"/>` : '';
  return `<g class="fb-label">${leader}<rect x="${x-w/2}" y="${y-.5}" width="${w}" height="${h}" rx=".16" fill="${l.bg ?? '#24364b'}" stroke="#fff" stroke-opacity=".5" stroke-width=".02"/>${lines.map((line,i)=>`<text x="${x}" y="${y+.04+i*.61}" text-anchor="middle" font-size="${font}" font-weight="650" fill="${l.fg ?? '#fff'}" font-family="'Noto Sans SC','PingFang SC',system-ui,sans-serif">${esc(line)}</text>`).join('')}</g>`;
};

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
  const m = id('fb', o), W = 15, L = o.full ? 28 : 14, cw = o.full ? L : W, ch = o.full ? W : L;
  // The metric court is untouched; expand the surrounding canvas for off-court actors.
  const actors = [...(o.tokens ?? []), ...(o.balls ?? [])];
  const padding = { left: .7, top: .7, right: .7, bottom: .7, ...(o.padding ?? {}) };
  for (const p of actors) { padding.left = Math.max(padding.left, .85-p.x); padding.right = Math.max(padding.right,p.x+(p.ball ? .9 : .65)-cw); padding.top = Math.max(padding.top,.8-p.y); padding.bottom = Math.max(padding.bottom,p.y+(p.tag?1.1:.7)-ch); }
  const w = cw+padding.left+padding.right, hgt = ch+padding.top+padding.bottom;
  let lines;
  if (o.full) {
    // Landscape: end lines at x=0 and x=28; we reuse the half-court drawing rotated.
    lines = `<g transform="matrix(0 1 1 0 0 0)">${halfLines(o.hl)}</g><g transform="matrix(0 1 -1 0 28 0)">${halfLines(o.hl)}</g>
     <g fill="none" stroke="${C.line}" stroke-width=".07"><path d="M14 0V15"/><circle cx="14" cy="7.5" r="1.8" fill="${o.hl?.includes('centre') ? 'rgba(255,197,51,.5)' : 'none'}"/></g>
     ${o.hl?.includes('backcourt') ? `<rect x="0" y="0" width="14" height="15" fill="rgba(47,111,219,.13)"/>` : ''}`;
  } else lines = halfLines(o.hl) + `<path d="M0 14H15" stroke="${C.line}" stroke-width=".07"/><path d="M5.7 14A1.8 1.8 0 0 1 9.3 14" fill="none" stroke="${C.line}" stroke-width=".07"/>`;
  const zones = (o.zones ?? []).map(z => `<path d="${z.d}" fill="${z.fill ?? 'rgba(255,197,51,.35)'}" stroke="${z.stroke ?? 'none'}" stroke-width=".06"/>`).join('');
  const body = (o.arrows ?? []).map(a => arrow(m, a)).join('') + (o.tokens ?? []).map(p => token(m, p)).join('') + (o.balls ?? []).map(b => ballSvg(m, b.x, b.y)).join('') + (o.labels ?? []).map(l => label(l, cw)).join('') + (o.extra ?? '');
  const anim = o.anim ? `<g class="fb-anim">${o.anim(m)}</g>` : '';
  const vw = Number((w * S).toFixed(2)), vh = Number((hgt * S).toFixed(2));
  return `<svg class="rc-svg${o.anim ? ' animated' : ''}" data-layout="wide" data-kind="court" viewBox="0 0 ${vw} ${vh}" role="img" aria-label="${esc(o.alt ?? '篮球场示意图')}" xmlns="http://www.w3.org/2000/svg">${defs(m)}
   <g transform="scale(${S}) translate(${padding.left} ${padding.top})"><rect x="-${padding.left}" y="-${padding.top}" width="${w}" height="${hgt}" rx=".3" fill="#2b3a4f"/>
   <rect x="0" y="0" width="${o.full ? L : W}" height="${o.full ? W : L}" fill="url(#${m}wood)"/><rect x="0" y="0" width="${cw}" height="${ch}" fill="url(#${m}finish)"/><rect x="0" y="0" width="${o.full ? L : W}" height="${o.full ? W : L}" fill="none" stroke="${C.line}" stroke-width=".07"/>
   ${lines}${zones}${o.bench ? `<g><rect x="16.2" y="17.15" width="5.8" height=".75" rx=".12" fill="#718396" stroke="#b8c8d5" stroke-width=".04"/><path d="M16.5 17.22h5.2" stroke="#dae5ed" stroke-width=".04"/><text x="19.1" y="17.68" text-anchor="middle" font-size=".4" fill="#fff" font-family="system-ui,sans-serif">记录台</text><rect x="12.9" y="17.23" width=".8" height=".65" rx=".1" fill="#aa554c"/><rect x="14.1" y="17.23" width=".8" height=".65" rx=".1" fill="#aa554c"/></g>` : ''}${body}${anim}</g></svg>`;
}
// SMIL helpers: move a token/ball along a path, looping, 'begin' offset seconds.
export const moving = (m, kind, path, dur = 3, extra = {}) => {
  const n = extra.n ?? '', t = extra.t ?? 'a';
  const shape = kind === 'ball' ? ballSvg(m, 0, 0) : token(m, { x: 0, y: 0, t, n, ball: extra.ball });
  const points = path.match(/-?\d*\.?\d+/g)?.map(Number) ?? [0,0];
  const still = extra.still ?? points.slice(-2);
  return `<g data-static-transform="translate(${still[0]} ${still[1]})">${extra.grab ? '<path d="M.28-.05Q.59-.3 .77-.17" stroke="#efbf98" stroke-width=".12" fill="none" stroke-linecap="round"/><path d="M.76-.23l.08 .09-.04 .09" stroke="#9c654b" stroke-width=".035" fill="none"/>' : ''}${shape}<animateMotion dur="${dur}s" repeatCount="indefinite" path="${path}" keyPoints="${extra.kp ?? '0;1;1'}" keyTimes="${extra.kt ?? '0;.8;1'}" calcMode="linear"/></g>`;
};

// Original anatomical signal set; all 12 gestures have explicit hand shapes.
export const referee = signalFigure;
export const POSE_NAMES = signalNames;

// Compact instrument panel with a separate caption band, so long explanations
// never disappear underneath the shot-clock housing at small display sizes.
const wrapLine = (str,limit=24) => { const lines=[];let line='',width=0;for(const c of str){const size=/[\u3000-\u9fff]/.test(c)?1:.56;if(width+size>limit&&line){lines.push(line);line='';width=0;}line+=c;width+=size;}if(line)lines.push(line);return lines; };
export function clocks(o = {}) {
  const shot=o.shot??24, warn=shot<=5, w=o.fouls?440:330, note=wrapLine(o.note??'',o.fouls?31:22), h=145+Math.max(1,note.length)*17, m=id('fb-clock',o);
  return `<svg class="rc-svg${o.countdown?' animated':''}" data-kind="clock" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(o.alt??`比赛计时 ${o.game??'10:00'}，进攻计时 ${shot} 秒`)}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${m}case" x2="0" y2="1"><stop stop-color="#263b51"/><stop offset=".12" stop-color="#132333"/><stop offset="1" stop-color="#0e1826"/></linearGradient></defs><rect x="2" y="2" width="${w-4}" height="${h-4}" rx="16" fill="url(#${m}case)" stroke="#5a7084" stroke-width="1.6"/><path d="M17 8H${w-17}" stroke="#90a5b7" stroke-width=".8" opacity=".5"/>
   ${[[12,13],[w-12,13],[12,h-13],[w-12,h-13]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.6" fill="#465e73" stroke="#081521" stroke-width=".8"/><path d="M${x-1.3} ${y}h2.6" stroke="#92a5b5" stroke-width=".7"/>`).join('')}
   <g font-family="'Noto Sans SC',system-ui,sans-serif"><text x="24" y="33" fill="#b0c1cf" font-size="13">${esc(o.period??'第 4 节')} · 比赛计时</text><path d="M22 45H182" stroke="#30485e"/>
   <text x="24" y="96" font-size="${String(o.game??'10:00').length>5?36:45}" font-weight="750" fill="#f3f7fb" font-family="ui-monospace,Menlo,monospace" ${String(o.game??'10:00').length>5?'textLength="155" lengthAdjust="spacingAndGlyphs"':''}>${esc(o.game??'10:00')}</text>
   <rect x="195" y="21" width="113" height="98" rx="10" fill="#081522" stroke="${warn?'#da5b4f':'#b9964a'}" stroke-width="1.8"/><path d="M202 28H298L203 54Z" fill="#b2c8dd" opacity=".04"/><text x="252" y="41" text-anchor="middle" font-size="12" fill="#a7bdcf">进攻计时</text><text x="252" y="97" text-anchor="middle" font-size="52" font-weight="800" fill="${warn?'#ff7966':'#f9c661'}" font-family="ui-monospace,Menlo,monospace">${shot}${o.countdown?'<animate attributeName="opacity" values="1;.25;1" dur="1s" repeatCount="indefinite"/>':''}</text>
   ${o.fouls?`<text x="376" y="36" text-anchor="middle" fill="#a7bdcf" font-size="12">全队犯规</text>${[0,1,2,3,4].map(i=>`<rect x="${330+i*18}" y="54" width="13" height="21" rx="3" fill="${i<o.fouls?(o.fouls>=4?'#f47768':'#f6c96e'):'#2a3c4e'}" stroke="#52697f" stroke-width=".5"/><text x="${336.5+i*18}" y="94" text-anchor="middle" fill="#879fb4" font-size="10">${i+1}</text>`).join('')}`:''}
   <path d="M22 130H${w-22}" stroke="#30485e"/>${note.map((line,i)=>`<text x="24" y="${149+i*17}" fill="#b6c7d4" font-size="12">${esc(line)}</text>`).join('')}</g></svg>`;
}

// Four panels remain in reading order, with grounded soles filled and airborne
// soles dashed. The 2-column layout keeps feet and labels readable on a phone.
export function steps(list, o = {}) {
  const w = 182, row = 210, cols = Math.min(2,list.length), m = id('st',list);
  const foot = (x,y,side,on) => `<g transform="translate(${x} ${y}) ${side==='R'?'scale(-1 1)':''}"><path d="M-10 16C-15 2-12-22 0-26C11-27 16-11 12 4L7 20Q-4 29-10 16Z" fill="${on?'#28445f':'#f6f9fc'}" stroke="${on?'#17314a':'#96aabd'}" stroke-width="1.6" ${on?'':'stroke-dasharray="3 3"'}/><path d="M-8 1Q1-4 11 0M-8 6Q0 1 10 5M-7 11Q0 8 8 11M-5 17L5 17M-8-12Q0-18 11-13M-9-6Q1-10 12-5" fill="none" stroke="${on?'#98aabd':'#c5d2de'}" stroke-width="1.3"/></g>`;
  const cells = list.map((s,i)=>{
    const x=(i%cols)*w+5,y=Math.floor(i/cols)*row+5, b=s.bad;
    const ballY=s.ball==='dribble'?87:s.ball==='air'?56:67;
    const palms=s.ball==='hold'?hand('rest',61,73,90,.38)+hand('rest',103,73,-90,.38,true):s.ball==='dribble'?hand('flat',79,48,180,.4):hand('flat',64,93,20,.32)+hand('flat',97,93,-20,.32,true);
    return `<g transform="translate(${x} ${y})"><rect width="172" height="199" rx="13" fill="${b?'#fff2ee':'#f7fafc'}" stroke="${b?'#c94f3f':'#cad7e2'}" stroke-width="1.4"/><path d="M13 41H159" stroke="${b?'#edc3b8':'#dfe7ee'}"/><circle cx="18" cy="20" r="10" fill="${b?'#b74132':'#28445f'}"/><text x="18" y="24" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">${i+1}</text><text x="98" y="25" text-anchor="middle" font-size="15" font-weight="750" fill="${b?C.bad:C.ink}">${esc(s.head??`第 ${i+1} 帧`)}</text>
     ${palms}${ballSvg(m,83,ballY,11)}${s.ball==='air'?'<path d="M121 80V56m-4 5 4-5 4 5" fill="none" stroke="#bf7a36" stroke-width="1.5"/>':''}
     ${foot(55,129,'L',s.l?.includes('L'))}${foot(113,129,'R',s.l?.includes('R'))}
     <text x="55" y="170" text-anchor="middle" font-size="12" fill="#60798f">左</text><text x="113" y="170" text-anchor="middle" font-size="12" fill="#60798f">右</text><text x="86" y="190" text-anchor="middle" font-size="14" font-weight="600" fill="${b?C.bad:C.ink}">${esc(s.txt)}</text></g>`;
  }).join('');
  return `<svg class="rc-svg" data-kind="steps" data-layout="wide" viewBox="0 0 ${cols*w} ${Math.ceil(list.length/cols)*row}" role="img" aria-label="${esc(o.alt??'脚步分解图')}" xmlns="http://www.w3.org/2000/svg">${defs(m)}<g font-family="'Noto Sans SC','PingFang SC',system-ui,sans-serif">${cells}</g></svg>`;
}

// Side-view basketball situations. Contact, air space and the ball remain explicit.
export function sideView(kind, o = {}) {
  const m = `fb-side-${kind}-`, wide = 560;
  const heading = (t,c=C.ink) => `<text x="280" y="-239" text-anchor="middle" font-size="17" font-weight="750" fill="${c}">${t}</text>`;
  const shadow = (x,air=false) => `<ellipse cx="${x}" cy="5" rx="${air?34:39}" ry="6" fill="#183653" opacity="${air?'.09':'.16'}"/>`;
  const contact = (x,y) => `<circle cx="${x}" cy="${y}" r="14" fill="#ffe7cf" fill-opacity=".42" stroke="${C.bad}" stroke-width="2" stroke-dasharray="3 3"/><path d="M${x-20} ${y-18}l-6-6M${x+18} ${y-20}l6-6" stroke="${C.bad}" stroke-width="2"/>`;
  const arrow = d => `<path d="${d}" fill="none" stroke="${C.bad}" stroke-width="3" stroke-linecap="round" marker-end="url(#${m}bad)"/>`;
  const ground = `<rect y="1" width="${wide}" height="64" fill="#e8c58f"/><path d="M0 2H560M0 23H560M0 45H560M70 2V23M260 2V23M450 2V23M170 23V45M360 23V45M80 45V65M270 45V65M460 45V65" stroke="#c59a64" stroke-width=".7"/><path d="M0 1H560" stroke="#b58953" stroke-width="1.5"/>`;
  let body = '';
  if (kind === 'cylinder') body = `${heading('圆柱体：对方手臂侵入造成接触',C.bad)}<ellipse cx="205" cy="-198" rx="48" ry="12" fill="#dbe9f8" stroke="#6c9ed6" stroke-width="1.5"/><path d="M157-198V2M253-198V2" stroke="#6697d0" stroke-width="1.5" stroke-dasharray="5 4"/><rect x="157" y="-198" width="96" height="200" fill="#649bdc" opacity=".055"/>${shadow(205)}${shadow(324)}${athlete(205,C.b,{arms:'up',n:5})}${athlete(324,C.a,{arms:'reach',n:7})}${contact(226,-137)}${arrow('M303-166L268-166')}<ellipse cx="205" cy="2" rx="48" ry="12" fill="none" stroke="#5c8fcc" stroke-width="1.5"/><text x="138" y="-93" text-anchor="end" font-size="13" fill="#31689f">防守人的空间</text><path d="M139-89H156" stroke="#5c8fcc"/><text x="351" y="-180" font-size="13" fill="${C.bad}">手臂越界</text><path d="M351-175L242-140" stroke="${C.bad}" stroke-width="1"/>`;
  else if (kind === 'charge') body = `${heading('防守已站定：进攻人撞上身体',C.bad)}${shadow(205)}${shadow(252)}<g transform="translate(188 0) rotate(10)">${athlete(0,C.a,{arms:'hold',running:true,n:7})}${ballSvg(m,32,-120,12)}</g>${athlete(251,C.b,{arms:'down',facing:-1,n:5})}${contact(231,-112)}${arrow('M115-79H164')}<path d="M229 10H284" stroke="${C.ok}" stroke-width="3"/><text x="319" y="-65" font-size="14" fill="#365471">双脚着地</text><text x="319" y="-43" font-size="14" fill="#365471">身体正对进攻人</text><path d="M311-56L279-13" stroke="#718b9f" stroke-width="1.2"/>`;
  else if (kind === 'block') body = `${heading('防守斜插入进攻路线：阻挡',C.bad)}<path d="M72 7H380" stroke="#8ca7bd" stroke-width="2" stroke-dasharray="7 6"/>${shadow(198)}${shadow(294)}${athlete(198,C.a,{arms:'hold',running:true,n:7})}${ballSvg(m,230,-120,12)}${athlete(274,C.b,{arms:'out',running:true,facing:-1,n:5})}${contact(237,-109)}${arrow('M343-53L301-27')}<text x="348" y="-89" font-size="14" fill="${C.bad}">横向移动</text><text x="90" y="39" font-size="13" fill="#715331">进攻路线 →</text>`;
  else if (kind === 'vertical') body = `${heading('垂直起跳、双手直上 = 合法防守',C.ok)}<path d="M157-210V1M253-210V1" stroke="#4b9e86" stroke-width="1.5" stroke-dasharray="5 5"/>${shadow(205,true)}${shadow(327,true)}${athlete(205,C.b,{arms:'up',y:-24,jump:true,n:5})}${athlete(327,C.a,{arms:'shoot',y:-13,jump:true,n:7})}${ballSvg(m,339,-208,12)}<path d="M126-43V-95" stroke="${C.ok}" stroke-width="2.5"/><path d="M121-86l5-9 5 9" fill="none" stroke="${C.ok}" stroke-width="2.5"/><text x="82" y="-19" font-size="13" fill="#38765e">离地</text><path d="M115-23L185-20" stroke="#70a18f"/>`;
  else if (kind === 'rising') body = `${heading('上升阶段封盖：球尚未到达最高点',C.ok)}${shadow(152,true)}${shadow(268,true)}${athlete(152,C.a,{arms:'shoot',y:-4,jump:true,n:7})}${athlete(268,C.b,{arms:'contest',y:-37,jump:true,facing:-1,n:13})}${hoop(433,-126,.8)}<path d="M174-193Q283-295 428-139" fill="none" stroke="#cf7a2f" stroke-width="2" stroke-dasharray="5 6"/>${ballSvg(m,217,-225,12)}<path d="M183-210L205-224" stroke="${C.ok}" stroke-width="3"/><path d="M196-225l10 0-3 9" fill="none" stroke="${C.ok}" stroke-width="2"/><text x="341" y="-208" font-size="13" fill="#4b6277">球篮</text><path d="M367-203L418-147" stroke="#a3b2bf"/>`;
  return `<svg class="rc-svg" data-layout="wide" data-kind="sideview" viewBox="0 -267 560 332" role="img" aria-label="${esc(o.alt ?? '侧视篮球动作示意图')}" xmlns="http://www.w3.org/2000/svg">${defs(m)}<rect x="0" y="-267" width="560" height="332" rx="14" fill="#eff4f8"/><g font-family="'Noto Sans SC','PingFang SC',system-ui,sans-serif">${ground}${body}</g></svg>`;
}

// Editorial rule cards use stacked key/value rows instead of shrinking a wide
// spreadsheet into a mobile illustration. Content and ordering are unchanged.
export function table(rows, o = {}) {
  const w=400, titleLines=wrapLine(o.title??'',20), titleH=o.title?titleLines.length*24+26:10;
  let y=titleH;
  const cards=rows.map((r,i)=>{const lines=wrapLine(r.v,23),h=42+lines.length*20,top=y;y+=h+7;return `<g><rect x="9" y="${top}" width="382" height="${h}" rx="9" fill="${i%2?'#edf3f7':'#fff'}" stroke="#d3dfe8"/><rect x="9" y="${top+9}" width="4" height="${h-18}" rx="2" fill="${r.c??C.b}"/><text x="25" y="${top+25}" font-size="16" font-weight="750" fill="#24384c">${esc(r.k)}</text>${lines.map((line,j)=>`<text x="25" y="${top+48+j*20}" font-size="15.5" fill="#435b70">${esc(line)}</text>`).join('')}</g>`;}).join('');
  return `<svg class="rc-svg" data-kind="info" data-layout="wide" viewBox="0 0 ${w} ${y+3}" role="img" aria-label="${esc(o.title??'规则表')}" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="${y+3}" rx="13" fill="#f4f7f9"/><g font-family="'Noto Sans SC','PingFang SC',system-ui,sans-serif">${titleLines.map((line,i)=>`<text x="18" y="${31+i*24}" font-size="18" font-weight="800" fill="#24384c">${esc(line)}</text>`).join('')}${cards}</g></svg>`;
}
export const colors = C;

// Ball-flight and replay close-ups share the same original anatomical/equipment kit.
export function goaltending() {
  const m='fb-goaltending-';
  return `<svg class="rc-svg animated" data-layout="wide" data-kind="flight" viewBox="0 0 560 340" role="img" aria-label="干扰得分：球下落且高于篮圈时被碰" xmlns="http://www.w3.org/2000/svg">${defs(m)}<rect width="560" height="340" rx="14" fill="#eff4f8"/><g font-family="'Noto Sans SC','PingFang SC',system-ui,sans-serif"><text x="280" y="30" text-anchor="middle" font-size="17" font-weight="750" fill="${C.bad}">下落段 + 高于篮圈：不能碰！</text><path d="M32 320H530" stroke="#bf9a6c" stroke-width="2"/><rect x="0" y="321" width="560" height="19" fill="#e7c593"/>
   <path d="M48 284Q246-48 434 164" fill="none" stroke="#d58c46" stroke-width="2" stroke-dasharray="5 6"/><path d="M120 239Q148 174 197 130" fill="none" stroke="${C.ok}" stroke-width="3"/><path d="M194 140l4-12-12 4" fill="none" stroke="${C.ok}" stroke-width="2"/><path d="M330 94Q365 109 393 135" fill="none" stroke="${C.bad}" stroke-width="3"/><path d="M382 132l13 5-5-13" fill="none" stroke="${C.bad}" stroke-width="2"/>
   <path d="M302 181H490" stroke="#859aad" stroke-width="1" stroke-dasharray="4 5"/><text x="299" y="199" text-anchor="end" font-size="12" fill="#6b8094">篮圈水平线</text><text x="81" y="141" font-size="14" fill="#2d725b">上升段</text><text x="342" y="68" font-size="14" fill="${C.bad}">下落段</text>
   ${hoop(436,181,.92,'rear')}<g transform="translate(328 285) scale(.9)">${athlete(0,C.b,{arms:'contest',n:13,jump:true})}</g><circle cx="381.164" cy="115.3024" r="16" fill="none" stroke="${C.bad}" stroke-width="1.5" stroke-dasharray="3 3"/>
   <g data-static-transform="translate(381.164 115.3024)">${ballSvg(m,0,0,12)}<animateMotion dur="2.6s" repeatCount="indefinite" path="M48 284Q246 -48 434 164"/></g>${hoop(436,181,.92,'front')}
   </g></svg>`;
}
export function replayScreen() {
  const m='fb-replay-';
  return `<svg class="rc-svg animated" data-layout="wide" data-kind="replay" viewBox="0 0 560 330" role="img" aria-label="即时回放显示器" xmlns="http://www.w3.org/2000/svg">${defs(m)}<rect width="560" height="330" rx="16" fill="#e8edf2"/><path d="M254 258H305L313 300H246Z" fill="#536777"/><path d="M208 301H352L369 310H192Z" fill="#344959"/><rect x="20" y="18" width="520" height="256" rx="15" fill="#1a2a3b" stroke="#62778a" stroke-width="2"/><rect x="35" y="33" width="490" height="215" rx="5" fill="#f0f5f8"/>
   <g transform="translate(36 34)"><path d="M0 176H488" stroke="#cda36a" stroke-width="2"/><path d="M0 178H488V212H0Z" fill="#eacb9c"/><path d="M21 190H466M103 178V190M284 190V212" stroke="#c4a06a" stroke-width=".7"/>${hoop(407,110,.68)}<g transform="translate(156 178) scale(.7)">${athlete(0,C.a,{arms:'shoot',n:7,jump:true})}</g>${ballSvg(m,236,46,11)}<path d="M235 46Q332 10 407 104" fill="none" stroke="#b6c5d1" stroke-dasharray="4 5" stroke-width="1.4"/><path d="M237 24V8M219 45H203M237 66V81M256 45H271" stroke="#d49b38" stroke-width="1"/><rect x="14" y="9" width="75" height="23" rx="4" fill="#23394e"/><text x="51" y="25" text-anchor="middle" font-family="ui-monospace,monospace" font-size="15" font-weight="700" fill="#ffe1a8">0:00.1</text><circle cx="400" cy="18" r="4" fill="#d34842"><animate attributeName="opacity" values="1;.2;1" dur="1s" repeatCount="indefinite"/></circle><text x="459" y="22" text-anchor="end" font-family="system-ui,sans-serif" font-size="11" font-weight="750" fill="#b63736">REPLAY</text></g>
   <path d="M46 256H515" stroke="#4f6478" stroke-width="2"/><path d="M46 256H324" stroke="#d3a348" stroke-width="2"/><circle cx="324" cy="256" r="3" fill="#f0bd59"/><text x="280" y="293" text-anchor="middle" font-family="'Noto Sans SC',system-ui,sans-serif" font-size="14" font-weight="750" fill="#24394f">IRS 回放：逐帧核查</text></svg>`;
}

// A small contact close-up explains what the tactical discs alone cannot show.
export function fastBreakDetail() {
  return `<g transform="translate(9.4 9.4) scale(.023)"><rect x="0" y="0" width="520" height="220" rx="12" fill="#f4f7fa" stroke="#7891a6" stroke-width="1.5"/><g transform="translate(36 196) scale(.9)">${athlete(189,C.b,{arms:'reach',facing:-1,running:true,n:8})}<path d="M277-137L302-124 299-113Z" fill="#e2483d" stroke="#973b31" stroke-width="1.4"/>${athlete(321,C.a,{arms:'hold',running:true,n:5})}${ballSvg('fb-fast-detail-',353,-120,12)}</g><defs><radialGradient id="fb-fast-detail-ballg"><stop stop-color="#ffca83"/><stop offset="1" stop-color="#d66720"/></radialGradient></defs><path d="M147 43L282 75" stroke="#a8473a" stroke-width="1.4"/><circle cx="287" cy="77" r="15" fill="none" stroke="#c45442" stroke-width="1.5" stroke-dasharray="3 3"/><text x="18" y="32" fill="#922d26" font-family="'Noto Sans SC',system-ui,sans-serif" font-size="17" font-weight="700">接触特写：拉住球衣</text><path d="M416 98H475m-10-7 10 7-10 7" fill="none" stroke="#7c8e9e" stroke-width="2"/><text x="446" y="133" text-anchor="middle" fill="#50677c" font-family="'Noto Sans SC',system-ui,sans-serif" font-size="14">前方无人</text></g>`;
}

// Original technical basketball artwork. Signal meanings checked against FIBA OBR 2026,
// Appendix A; these paths are independently drawn and contain no official artwork or logos.
const ink = '#243247', skin = '#d9a17d', skinLight = '#f0c4a0', skinShade = '#ac7257';
const font = "'Noto Sans SC','PingFang SC',system-ui,sans-serif";
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

// Wrist is (0,0), fingers point up. The three-point hand deliberately extends
// thumb, index and middle fingers, with ring/little fingers visibly folded.
export function hand(kind = 'palm', x = 0, y = 0, angle = 0, size = 1, mirror = false) {
  const outline = {
    palm: 'M-5 2L-7-8-15-19Q-17-24-13-25L-6-18-8-35Q-8-40-4-39L-1-22-1-41Q1-46 4-42L5-23 7-38Q9-42 12-38L10-20 14-30Q17-33 19-29L15-11Q12-4 6 2Z',
    flat: 'M-6 2L-8-9-14-19Q-16-23-12-24L-6-18-6-36Q-6-41-2-40L0-23 0-40Q2-44 5-40L6-23 6-37Q9-40 11-36L11-21 12-31Q16-34 17-30L16-11Q13-3 6 2Z',
    three: 'M-5 2L-9-8-18-17Q-21-22-17-25Q-14-26-7-18L-8-37Q-8-42-4-42Q-1-42 0-37L2-22 4-41Q5-46 9-44Q12-43 11-38L9-19Q12-24 16-20L17-13Q18-6 9 1Z',
    index: 'M-5 2L-8-8-13-15Q-16-20-12-22L-6-18-6-38Q-6-43-2-43Q2-43 2-38L3-20Q8-25 10-19Q16-22 18-15L17-7Q16-1 7 2Z',
    fist: 'M-6 3L-9-7-12-15Q-12-20-7-20Q-6-26 0-24Q4-29 9-23Q15-24 17-18L18-8Q18-1 7 3Z',
    rest: 'M-5 2L-8-13Q-10-19-6-20L-3-13-3-27Q-2-31 1-28L3-14 4-27Q6-30 8-26L9-12 11-22Q14-25 16-21L15-7Q14 0 6 3Z'
  }[kind] ?? '';
  const crease = kind === 'fist' ? 'M-8-14Q-3-17 2-11L10-9M-5-20V-15M2-23V-16M9-22V-16M14-17L14-11' : kind === 'three' ? 'M9-18L8-10Q13-6 16-12M6-18L4-11M-6-11Q1-14 6-8' : kind === 'index' ? 'M3-18L3-10M9-18V-10M14-15V-9M-5-12Q0-15 4-8' : 'M-5-13Q2-19 10-14M0-10L6-5M0-24L0-20M6-23V-19M11-21V-17';
  return `<g class="fb-hand fb-hand-${kind}" transform="translate(${x} ${y}) rotate(${angle}) scale(${mirror ? -size : size} ${size})"><path d="${outline}" fill="${skinLight}" stroke="${skinShade}" stroke-width="1.25" stroke-linejoin="round"/><path d="M-5 1L-6-8Q-1-4 6-3L6 2Z" fill="${skin}"/><path d="${crease}" fill="none" stroke="${skinShade}" stroke-width=".9" stroke-linecap="round"/></g>`;
}
const signals = {
  three: { l: [-48,25,-44,70,'rest',180], r: [58,-105,63,-164,'three',5], title: '三分出手：举三指', detail: '拇指 · 食指 · 中指' },
  goal3: { l: [-58,-105,-63,-164,'three',-5], r: [58,-105,63,-164,'three',5], title: '三分命中：双手高举', detail: '两手各伸出三指' },
  foul: { l: [-48,25,-44,70,'rest',180], r: [48,-110,43,-168,'fist',0], title: '握拳高举：犯规，停表', detail: '单拳高举' },
  stop: { l: [-48,25,-44,70,'rest',180], r: [48,-110,43,-161,'palm',0], title: '张开手掌高举：违例，停表', detail: '张开手掌' },
  timeout: { l: [-65,-43,-24,-58,'flat',90], r: [56,-4,0,-28,'index',0], title: '暂停：食指抵掌成 T', detail: '一根食指顶住横掌' },
  tech: { l: [-65,-55,-26,-70,'flat',90], r: [56,-3,0,-44,'flat',0], title: '技术犯规：双掌成 T', detail: '双手掌清楚可见' },
  charge: { l: [-64,-11,-10,-32,'flat',0], r: [67,-13,8,-44,'fist',-90], title: '带球撞人：拳击另一手掌', detail: '拳 → 掌' },
  block: { l: [-70,8,-34,38,'rest',-35], r: [70,8,34,38,'rest',35], title: '双手叉腰：阻挡', detail: '双手放于髋部' },
  pointDir: { l: [-48,25,-44,70,'rest',180], r: [82,-49,126,-49,'index',90], title: '手臂平指：进攻方向', detail: '食指指向比赛方向' },
  dribble: { l: [-58,-5,-44,15,'flat',105], r: [60,-7,48,2,'flat',-100], title: '两次运球：双手上下拍', detail: '手掌向下拍动' },
  travel: { l: [-66,-2,0,-31,'fist',90], r: [66,-27,0,-4,'fist',-90], title: '双拳在胸前绕圈', detail: '双拳滚动' },
  shotclock: { l: [-48,25,-44,70,'rest',180], r: [55,-100,50,-145,'index',8], title: '手指在头顶画圈：重置进攻计时', detail: '伸出食指旋转' }
};
export const signalNames = Object.keys(signals);

function refereeArm(a, side) {
  const [ex,ey,wx,wy,k,rot] = a, sx = side * 29, sy = -52;
  const mx = sx + (ex-sx)*.46, my = sy+(ey-sy)*.46;
  return `<g><path d="M${sx} ${sy}L${ex} ${ey}L${wx} ${wy}" fill="none" stroke="${skinShade}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/><path d="M${sx} ${sy}L${ex} ${ey}L${wx} ${wy}" fill="none" stroke="${skinLight}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="M${ex-2} ${ey+1}L${wx-2} ${wy+1}" fill="none" stroke="${skin}" stroke-width="3" stroke-linecap="round"/><path d="M${sx} ${sy}L${mx} ${my}" stroke="#293746" stroke-width="23" stroke-linecap="round"/><path d="M${sx} ${sy-3}L${mx} ${my-3}" stroke="#6d7e8c" stroke-width="15" stroke-linecap="round"/><path d="M${mx-4} ${my-5}l8 10" stroke="#d79353" stroke-width="2"/>${hand(k,wx,wy,rot,.68,side<0)}</g>`;
}
export function signalFigure(pose = 'foul', o = {}) {
  const p = signals[pose] ?? signals.foul, m = `fb-ref-${pose}`;
  let cues = '';
  if (pose === 'travel') cues = `<path d="M-36-39C-45-66 48-61 40-32M35 11C40 30-47 28-39 4" fill="none" stroke="#ce8128" stroke-width="2.5" marker-end="url(#${m}-direction)"/>`;
  if (pose === 'dribble') cues = `<path d="M-80 12V39M80 3V30" fill="none" stroke="#ce8128" stroke-width="2.5" marker-end="url(#${m}-direction)"/>`;
  if (pose === 'charge') cues = `<path d="M49-31H25" fill="none" stroke="#ce8128" stroke-width="2.5" marker-end="url(#${m}-direction)"/>`;
  if (pose === 'shotclock') cues = `<g><path d="M28-187C4-215 87-217 83-189" fill="none" stroke="#ce8128" stroke-width="2.5" marker-end="url(#${m}-direction)"/><animateTransform attributeName="transform" type="rotate" from="0 50 -199" to="360 50 -199" dur="1.6s" repeatCount="indefinite"/></g>`;
  return `<svg class="rc-svg${pose === 'shotclock' ? ' animated' : ''}" data-kind="referee" viewBox="-180 -238 360 458" role="img" aria-label="${esc(o.alt ?? '裁判手势：'+p.title)}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${m}-shirt" x1="0" x2="1"><stop stop-color="#98a6b2"/><stop offset=".5" stop-color="#c3ccd2"/><stop offset="1" stop-color="#71818e"/></linearGradient><linearGradient id="${m}-trousers" x1="0" x2="1"><stop stop-color="#182432"/><stop offset=".5" stop-color="#344455"/><stop offset="1" stop-color="#14202d"/></linearGradient><marker id="${m}-direction" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#ce8128"/></marker></defs>
  <rect x="-180" y="-238" width="360" height="458" rx="18" fill="${o.bg ?? '#f2f5f7'}"/><path d="M-160 150H160" stroke="#d8e1e8"/><ellipse cx="0" cy="171" rx="73" ry="9" fill="#18314a" opacity=".12"/>
  <path d="M-29 49L-31 98-26 160-9 160-3 97 0 73 6 101 10 160 29 160 29 100 28 49Z" fill="url(#${m}-trousers)" stroke="#192634" stroke-width="1.5"/><path d="M-14 64L-18 103-17 151M16 64L17 102 20 151" fill="none" stroke="#566373" stroke-width="1.3" opacity=".8"/>
  <path d="M-28 154L-9 154-7 169Q-9 175-45 173L-46 168Z M10 154L29 154 45 167Q50 174 11 173L8 168Z" fill="#18212c" stroke="#0d1620" stroke-width="1.5"/><path d="M-43 171H-10M12 171H43M-26 161L-14 163M17 162L29 161" stroke="#8191a0" stroke-width="1.6"/>
  <path d="M-30-59Q-15-68 0-66Q18-68 31-59L35-24 29 53Q0 60-30 53L-34-23Z" fill="url(#${m}-shirt)" stroke="#465462" stroke-width="1.5"/><path d="M-30-54L-20-48-24 48-30 51-34-23Z M30-54L21-47 25 48 29 51 35-23Z" fill="#243342"/><path d="M-16-51Q-10-20-14 4M17-47Q23-15 18 11M-18 30L-11 43M9 37L22 43" fill="none" stroke="#8796a3" stroke-width="1.5"/>
  <path d="M-8-77H8L10-61Q0-51-10-61Z" fill="${skin}"/><path d="M-12-64L-3-53 0-61 4-53 14-65" fill="#263746" stroke="#435463" stroke-width="1.5"/>
  <path d="M-12-59L-5-28 10-32 12-59" fill="none" stroke="#354653" stroke-width="1.4"/><path d="M-6-29H5V-23H-5Z" fill="#b9c6ce" stroke="#536573"/><circle cx="-3" cy="-26" r="1" fill="#344859"/>
  <path d="M-29 51Q0 56 29 51" stroke="#172532" stroke-width="6"/><rect x="-4" y="50" width="8" height="5" rx="1" fill="#81909c"/>
  <path d="M-18-112Q-20-130 1-132Q23-130 20-105L17-86Q8-71-4-78L-16-90Z" fill="${skinLight}" stroke="${skinShade}" stroke-width="1.3"/><path d="M12-118Q23-111 17-88Q10-77 1-78L8-85Z" fill="${skin}"/><path d="M-19-107L-18-122Q-12-139 7-134Q23-132 22-111L13-117 1-119-10-114-14-102Z" fill="#393535"/><path d="M-17-128Q-2-137 14-128" fill="none" stroke="#60534c" stroke-width="2"/>
  <ellipse cx="-18" cy="-104" rx="3" ry="6" fill="${skin}"/><ellipse cx="20" cy="-104" rx="3" ry="6" fill="${skin}"/><path d="M-11-108l7-1M7-109l7 1" stroke="#51463f" stroke-width="1.6"/><circle cx="-7" cy="-105" r="1.2" fill="#25303b"/><circle cx="11" cy="-105" r="1.2" fill="#25303b"/><path d="M2-105L0-97 4-96M-4-88Q3-86 9-89" fill="none" stroke="${skinShade}" stroke-width="1.1"/>
  ${refereeArm(p.l,-1)}${refereeArm(p.r,1)}${cues}
  <rect x="-168" y="188" width="336" height="24" rx="7" fill="#e5ebef"/><text x="0" y="205" text-anchor="middle" font-size="14" font-weight="700" fill="${ink}" font-family="${font}">${esc(o.caption ?? p.title)}</text><text x="0" y="-217" text-anchor="middle" font-size="12" letter-spacing="1" fill="#617489" font-family="${font}">${esc(p.detail)}</text></svg>`;
}

// Sports figures use three articulated segments per limb. Hands, shoe soles and
// ball contact are drawn separately so a pose never depends on a stick-figure line.
export function athlete(x, color, o = {}) {
  const facing = o.facing ?? 1, y = o.y ?? 0, n = o.n ?? (color === '#2f6fdb' ? 5 : 7);
  const poses = {
    up: [[[-16,-120],[-21,-151],[-20,-175]], [[16,-120],[21,-151],[20,-175]]],
    out: [[[-16,-120],[-40,-111],[-65,-112]], [[16,-120],[39,-109],[65,-115]]],
    reach: [[[-16,-120],[-52,-117],[-95,-137]], [[16,-120],[34,-100],[25,-80]]],
    hold: [[[-16,-120],[-31,-100],[25,-106]], [[16,-120],[47,-108],[39,-122]]],
    contest: [[[-16,-120],[-29,-143],[-42,-174]], [[16,-120],[35,-149],[41,-183]]],
    shoot: [[[-16,-120],[-24,-149],[10,-163]], [[16,-120],[29,-150],[16,-184]]],
    down: [[[-16,-120],[-28,-98],[-29,-80]], [[16,-120],[29,-96],[33,-78]]]
  };
  const armPts = poses[o.arms ?? 'down'];
  const legs = o.running ? [[[-9,-68],[-27,-37],[-47,-4]],[[9,-68],[31,-41],[40,-8]]] : o.jump ? [[[-9,-68],[-17,-39],[-13,-10]],[[9,-68],[23,-45],[36,-27]]] : [[[-9,-68],[-15,-37],[-18,-6]],[[9,-68],[15,-36],[19,-6]]];
  const limb = pts => { const d = 'M'+pts.map(p=>p.join(' ')).join('L'); return `<path d="${d}" fill="none" stroke="${skinShade}" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${skinLight}" stroke-width="9.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M${pts[1][0]-2} ${pts[1][1]+3}L${pts[2][0]-2} ${pts[2][1]}" stroke="${skin}" stroke-width="2.4" stroke-linecap="round"/>`; };
  const arm = (pts,side) => `${limb(pts)}${hand(o.arms==='hold'?'rest':'flat',...pts[2],o.arms==='up'||o.arms==='contest'||o.arms==='shoot'?side*5:o.arms==='reach'&&side<0?-70:o.arms==='down'?165:side*80,.36,side<0)}`;
  return `<g class="fb-athlete" transform="translate(${x} ${y}) scale(${facing} 1)">
  ${arm(armPts[0],-1)}${legs.map(limb).join('')}
  ${legs.map(pts=>{const [ax,ay]=pts[2];return `<path d="M${ax-5} ${ay-7}h10v8h-10Z" fill="#eaf0f5"/><path d="M${ax-6} ${ay-1}q5-3 11 0l13 4q4 3 1 5h-25Z" fill="#eaf0f5" stroke="#43546b" stroke-width="1.2"/><path d="M${ax-4} ${ay+7}h24M${ax+6} ${ay+2}l6 1M${ax+3} ${ay}l6 1" stroke="#405369" stroke-width="1.1"/>`;}).join('')}
  <path d="M-17-79L-20-50-3-47 1-61 5-47 24-50 17-79Z" fill="${color}" stroke="#263b50" stroke-width="1.3"/><path d="M-15-76L-15-53M14-76L18-53" stroke="#f3f7fa" stroke-width="3"/><path d="M-18-52L-3-49M6-49L22-52" stroke="#d5e2ec" stroke-width="2"/>
  <path d="M-17-128Q-7-134 0-131Q8-134 17-128L21-115 15-88 18-77Q0-72-18-77L-15-88-21-115Z" fill="${color}" stroke="#273d55" stroke-width="1.3"/><path d="M-17-126L-12-113-12-85-17-79M16-126L11-113 12-85 17-79" fill="none" stroke="#eaf1f7" stroke-width="3"/><path d="M-8-128Q0-116 8-128" fill="none" stroke="#eaf1f7" stroke-width="3"/><path d="M3-119Q15-104 11-89L15-79 3-76Z" fill="#142e4e" opacity=".18"/><path d="M-8-92l9 4M-8-84l6 2M-11-58l7 1" stroke="#fff" stroke-width="1" opacity=".3"/>
  <text x="1" y="-96" text-anchor="middle" font-family="system-ui,sans-serif" font-size="17" font-weight="800" fill="#fff" transform="scale(${facing} 1)">${n}</text>
  <path d="M-5-140H5V-130Q0-124-6-131Z" fill="${skin}"/><path d="M-12-154Q-13-168 1-167Q16-165 13-150L18-145 12-142 10-133Q2-127-7-136Z" fill="${skinLight}" stroke="${skinShade}" stroke-width="1"/><path d="M-13-151L-14-160Q-8-172 4-169Q16-169 15-156L5-159-5-154-6-146Z" fill="#3b3431"/><path d="M6-151h5M6-137l4-1" stroke="#654b3b" stroke-width="1.1"/><circle cx="9" cy="-148" r="1" fill="#273747"/><path d="M-5-144Q-10-152-11-146Q-12-140-6-139" fill="${skin}"/>
  ${arm(armPts[1],1)}</g>`;
}

// Backboard, rear rim, net and front rim are distinct layers. A caller can put
// a ball between the rear and front rim, avoiding the common flat-bar basket.
export function hoop(x, y, scale = 1, layer = 'all') {
  const rear = `<path d="M45-72L55-70V61L45 62Z" fill="#63758a"/><path d="M32-68L45-72V46L32 50Z" fill="#dce8ef" fill-opacity=".74" stroke="#6e8192" stroke-width="1.5"/><path d="M35-57L42-59V-3L35-1Z" fill="none" stroke="#fafcfd" stroke-width="2"/><path d="M41-8L52-9V42L41 44Z" fill="#eff5f8" stroke="#8294a4"/><path d="M15 0L34-4" stroke="#875139" stroke-width="4"/><ellipse cx="0" cy="0" rx="31" ry="9" fill="#e7eef3" fill-opacity=".15" stroke="#a95025" stroke-width="4"/>
   <path d="M-29 3L-19 48Q0 55 19 48L29 3" fill="#e9f0f4" fill-opacity=".45" stroke="#8195a5" stroke-width="1.2"/>
   ${[-24,-14,-4,6,16,26].map((u,i)=>`<path d="M${u} 5L${-18+i*7} 45M${u} 5L${Math.min(18,u+16)} 46" fill="none" stroke="#95a8b7" stroke-width="1"/>`).join('')}<path d="M-26 16Q0 24 26 16M-23 29Q0 37 23 29M-20 42Q0 48 20 42" fill="none" stroke="#fafcfd" stroke-width="1.5"/>`;
  const front = `<path d="M-31 0A31 9 0 0 0 31 0" fill="none" stroke="#f08832" stroke-width="4.5"/><path d="M-27 4Q0 15 27 4" fill="none" stroke="#ffb461" stroke-width="1"/>`;
  return `<g class="fb-hoop" transform="translate(${x} ${y}) scale(${scale})">${layer==='front'?front:layer==='rear'?rear:rear+front}</g>`;
}

// Original, brand-neutral motorsport illustrations. Geometry is shared across the course.
// Car coordinates: rear axle x=-34, front axle x=30. Top view points toward +x.
let serial = 0;
const uid = () => `f1v${++serial}`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const materials = (m, paint) => `<defs>
 <linearGradient id="${m}paint" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fff" stop-opacity=".58"/><stop offset=".2" stop-color="${paint}"/><stop offset=".62" stop-color="${paint}"/><stop offset="1" stop-color="#080d17"/></linearGradient>
 <linearGradient id="${m}rubber" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#10151b"/><stop offset=".23" stop-color="#333c47"/><stop offset=".55" stop-color="#1b222c"/><stop offset="1" stop-color="#080d13"/></linearGradient>
 <linearGradient id="${m}metal" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#e1e9ee"/><stop offset=".3" stop-color="#8f9daa"/><stop offset=".6" stop-color="#4a5866"/><stop offset="1" stop-color="#b5c3cd"/></linearGradient>
 <linearGradient id="${m}glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#879eac"/><stop offset=".27" stop-color="#354854"/><stop offset=".5" stop-color="#172330"/><stop offset="1" stop-color="#050d17"/></linearGradient>
 <pattern id="${m}carbon" width="3" height="3" patternUnits="userSpaceOnUse"><rect width="3" height="3" fill="#17212b"/><path d="M0 0L3 3M-1 2L1 4" stroke="#667986" stroke-width=".35" opacity=".32"/></pattern></defs>`;

export function technicalCar(o, palette) {
  const [paint, accent] = palette[o.livery ?? 'red'], m = uid();
  const tyre = (x, y, rear = false) => {
    const w = rear ? 20 : 18, h = rear ? 12.8 : 11.6;
    return `<g class="f1-wheel" data-axle="${rear ? 'rear' : 'front'}" data-cx="${x}" data-cy="${y}" data-width="${w}" data-height="${h}" transform="translate(${x} ${y})${rear ? '' : ` rotate(${o.steer ?? 0})`}">
     <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="3.6" fill="url(#${m}rubber)" stroke="#050a0f" stroke-width=".8"/>
     <path d="M${-w / 2 + 3} ${-h / 2 + 1.6}H${w / 2 - 3}M${-w / 2 + 3} ${h / 2 - 1.6}H${w / 2 - 3}" stroke="${o.tyre ?? '#74828c'}" stroke-width=".65" opacity=".8"/>
     <path d="M-6 -2.4H6M-7 1.8H7" stroke="#8895a0" stroke-width=".4" opacity=".25"/>
     <rect x="-3.5" y="${y < 0 ? h / 2 - 2 : -h / 2}" width="7" height="2" rx=".7" fill="#64717b"/><path d="M-1 -2V2M1 -2V2" stroke="#070c12" stroke-width=".45" opacity=".7"/></g>`;
  };
  return `<g class="f1-car" data-vehicle="open-wheel" transform="translate(${o.x ?? 0} ${o.y ?? 0}) rotate(${o.rot ?? 0}) scale(${o.scale ?? 1})">${materials(m, paint)}
   <ellipse cx="0" cy="3" rx="55" ry="24" fill="#050912" opacity=".27"/>
   ${o.hl ? '<ellipse cx="0" cy="0" rx="61" ry="29" fill="none" stroke="#ffc533" stroke-width="2" stroke-dasharray="6 4"/>' : ''}
   <path d="M-39 -9L-29 -15L-3 -16L16 -11L25 -8L25 8L16 11L-3 16L-29 15L-39 9Z" fill="url(#${m}carbon)" stroke="#71818c" stroke-width=".45"/>
   <path d="M-28 -14L-5 -14M-28 14L-5 14" stroke="${paint}" stroke-width=".7" opacity=".8"/>
   <g fill="none" stroke="#9ca8b0" stroke-width="1.05"><path d="M-22 -7L-34 -18L-40 -5M-22 7L-34 18L-40 5M10 -6L30 -17L23 -4M10 6L30 17L23 4"/><path d="M-34 -18L-28 -2M-34 18L-28 2M30 -17L16 -3M30 17L16 3" stroke="#2f3b45" stroke-width="1.7"/></g>
   <path d="M-46 -16H-41V16H-46Z" fill="url(#${m}carbon)"/>
   <g fill="url(#${m}carbon)" stroke="#8897a2" stroke-width=".4"><path d="M-53 -18H-43V18H-53Z"/><path d="M-52 -18V18M-48.5 -18V18M-45 -18V18" fill="none"/></g>
   <path d="M-53 -18H-43M-53 18H-43" stroke="${paint}" stroke-width="2.2"/><path d="M-51 -15V15" stroke="${o.open ? '#ffc533' : accent}" stroke-width="1.2"/>
   <path d="M42 -21Q48 -19 54 -22V22Q48 19 42 21L39 8V-8Z" fill="url(#${m}carbon)" stroke="#95a4ae" stroke-width=".45"/>
   <path d="M44 -20Q47 0 44 20M48 -20Q51 0 48 20M51 -21Q54 0 51 21" fill="none" stroke="${accent}" stroke-width="1.05" opacity=".85"/>
   <path d="M42 -22H54M42 22H54" stroke="${paint}" stroke-width="2.3"/>
   <path d="M-42 -4L-28 -7L-25 -12Q-11 -16 0 -11L17 -5L49 -2Q54 0 49 2L17 5L0 11Q-11 16 -25 12L-28 7L-42 4Z" fill="${paint}"/>
   <path d="M-42 -4L-28 -7L-25 -12Q-11 -16 0 -11L17 -5L49 -2Q54 0 49 2L17 5L0 11Q-11 16 -25 12L-28 7L-42 4Z" fill="url(#${m}paint)" stroke="#07121c" stroke-width=".65"/>
   <path d="M-27 -8Q-10 -13 0 -8L-5 -4L-30 -3M-27 8Q-10 13 0 8L-5 4L-30 3" fill="${paint}" stroke="#cfedf0" stroke-opacity=".2" stroke-width=".5"/>
   <path d="M-4 -10L2 -8L-1 -5L-9 -7ZM-4 10L2 8L-1 5L-9 7Z" fill="#07131d"/>
   <path d="M-34 -2L-11 -3L-3 0L-11 3L-34 2Z" fill="${accent}" opacity=".65"/>
   <path d="M-29 0H-13M21 -1.6L45 -1" fill="none" stroke="#f4fbff" stroke-width=".6" opacity=".65"/>
   <path d="M-1 -5Q6 -8 12 -4L17 0L12 4Q6 8 -1 5Z" fill="#07111c" stroke="#6d808b" stroke-width=".7"/>
   <ellipse cx="5" cy="0" rx="3.7" ry="3.1" fill="url(#${m}metal)"/><path d="M6 -2.5Q9 0 6 2.5L5 1.5V-1.5Z" fill="#121f2b"/>
   <path d="M-1 -5Q10 -10 15 0Q10 10 -1 5M15 0H20" fill="none" stroke="#0a121b" stroke-width="2.7"/>
   <path d="M-1 -5Q10 -10 15 0Q10 10 -1 5M15 0H20" fill="none" stroke="url(#${m}metal)" stroke-width="1.5"/>
   <path d="M13 -7L10 -12M13 7L10 12" stroke="#263641" stroke-width=".85"/><rect x="7" y="-13.2" width="6" height="2" rx=".8" fill="${paint}"/><rect x="7" y="11.2" width="6" height="2" rx=".8" fill="${paint}"/>
   ${tyre(-34, -18, true)}${tyre(-34, 18, true)}${tyre(30, -17)}${tyre(30, 17)}
   ${o.n != null ? `<text x="-15" y="2.7" text-anchor="middle" font-size="7.8" font-weight="900" fill="#f5f8fc" stroke="#07101a" stroke-width=".22" paint-order="stroke" font-family="system-ui">${esc(o.n)}</text>` : ''}</g>`;
}

export function technicalSafetyCar(o, palette) {
  const [paint] = palette[o.livery ?? 'silver'], m = uid();
  return `<g class="f1-safety-car" data-vehicle="safety-car" transform="translate(${o.x ?? 0} ${o.y ?? 0}) rotate(${o.rot ?? 0}) scale(${o.scale ?? 1})">${materials(m, paint)}
   <ellipse cx="0" cy="3" rx="54" ry="23" fill="#050912" opacity=".3"/>
   <g fill="#101720" stroke="#34414c" stroke-width=".7"><rect x="-35" y="-22" width="18" height="8" rx="3"/><rect x="-35" y="14" width="18" height="8" rx="3"/><rect x="23" y="-22" width="17" height="8" rx="3"/><rect x="23" y="14" width="17" height="8" rx="3"/></g>
   <path d="M-47 -13Q-49 -20 -37 -20H28Q47 -20 51 -9V9Q47 20 28 20H-37Q-49 20 -47 13Z" fill="${paint}"/>
   <path d="M-47 -13Q-49 -20 -37 -20H28Q47 -20 51 -9V9Q47 20 28 20H-37Q-49 20 -47 13Z" fill="url(#${m}paint)" stroke="#07101a" stroke-width="1"/>
   <path d="M-28 -14L-15 -16L15 -15L26 -10V10L15 15L-15 16L-28 14Z" fill="url(#${m}glass)" stroke="#acb9c4" stroke-width=".6"/>
   <path d="M-17 -12H9L13 -10V10L9 12H-17L-21 9V-9Z" fill="${paint}" stroke="#090e15" stroke-width=".8"/>
   <path d="M16 -13L23 -8V8L16 13M-23 -13V13" stroke="#bfdae4" stroke-width=".55" opacity=".7"/>
   <path d="M30 -12L43 -9M30 12L43 9M-40 -16H-29M-40 16H-29" stroke="#edf5fa" stroke-width=".8" opacity=".55"/>
   <rect data-part="roof-beacon" x="-2.8" y="-15" width="6" height="30" rx="1.8" fill="#25303b" stroke="#89919b" stroke-width=".65"/>
   <rect x="-2" y="-14" width="4.4" height="10" rx="1" fill="#ffbe40"/><rect x="-2" y="4" width="4.4" height="10" rx="1" fill="#ffbe40"/><path d="M-1 -12V-6M-1 6V12" stroke="#fff4bd" stroke-width="1.1"/>
   <path d="M45 -14L48 -9M45 14L48 9" stroke="#e9f7ff" stroke-width="3" stroke-linecap="round"/><path d="M-46 -14V-8M-46 14V8" stroke="#ff584a" stroke-width="2.5"/>
   <path d="M49 -5V5M-43 -17V17" stroke="#25323e" stroke-width="2"/>
   <text x="-12" y="2.5" text-anchor="middle" font-size="7.5" font-weight="900" fill="#f7fafc" stroke="#13202c" stroke-width=".25" paint-order="stroke" font-family="system-ui">SC</text></g>`;
}

export function technicalAeroSide(mode, o, palette) {
  const [paint, accent] = palette[o.livery ?? 'blue'], m = uid(), open = mode === 'straight';
  const wheel = (x, y, r) => `<g class="f1-side-wheel" data-axle="${x < 0 ? 'rear' : 'front'}" data-cx="${x}" data-cy="${y}" data-radius="${r}"><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${m}rubber)" stroke="#07101a" stroke-width="1.4"/><circle cx="${x}" cy="${y}" r="${r - 2.5}" fill="none" stroke="#5a6876" stroke-width=".65"/><circle cx="${x}" cy="${y}" r="${r * .61}" fill="url(#${m}metal)"/><circle cx="${x}" cy="${y}" r="${r * .5}" fill="#29353f"/>
   ${[0,60,120,180,240,300].map(a => `<path d="M${x} ${y - 2}L${x - 2} ${y - r * .48}L${x + 2} ${y - r * .48}Z" fill="#94a3af" transform="rotate(${a} ${x} ${y})"/>`).join('')}<circle cx="${x}" cy="${y}" r="3.3" fill="#c7d2da"/><circle cx="${x}" cy="${y}" r="1.4" fill="#1c2935"/></g>`;
  return `<g class="f1-aero-car" transform="translate(${o.x ?? 0} ${o.y ?? 0})">${materials(m, paint)}
   <ellipse cx="0" cy="72" rx="113" ry="5" fill="#000" opacity=".25"/>
   <path d="M-94 52H-72L-45 45H22L57 48L94 54L105 59H-91Z" fill="url(#${m}carbon)" stroke="#536576" stroke-width=".6"/>
   <path data-part="side-bodywork" d="M-89 48L-63 31L-39 22L-24 4H-16L-10 23H13L37 36L83 46L97 50L76 52L30 48L-5 57H-75Z" fill="${paint}"/>
   <path d="M-89 48L-63 31L-39 22L-24 4H-16L-10 23H13L37 36L83 46L97 50L76 52L30 48L-5 57H-75Z" fill="url(#${m}paint)" stroke="#09131d" stroke-width=".8"/>
   <path d="M-44 35Q-17 28 6 32L25 43L8 51H-43Z" fill="${paint}" stroke="#dbf0fa" stroke-opacity=".22" stroke-width=".8"/>
   <path d="M-34 40Q-15 35 7 38L15 43L-4 45H-34Z" fill="#0c1b29"/><path d="M-33 47H3L-7 50H-37Z" fill="${accent}" opacity=".7"/>
   <path d="M-21 8H-17V15H-24Z" fill="#0b1826"/><path d="M-8 24L-2 31H19L14 22Z" fill="#0b1826"/><circle cx="5" cy="20" r="5.4" fill="url(#${m}metal)"/><path d="M7 18L11 20L7 22" fill="#08121f"/>
   <path d="M-6 23L-3 13Q11 8 21 21L24 28" fill="none" stroke="#0a1420" stroke-width="4.2"/><path d="M-6 23L-3 13Q11 8 21 21L24 28" fill="none" stroke="url(#${m}metal)" stroke-width="2.2"/>
   <path d="M38 43L60 54L27 49M-41 38L-63 54L-78 44" fill="none" stroke="#b1bdc5" stroke-width="1.3"/>
   <path d="M-80 38V6M-94 -8V48" stroke="#64727d" stroke-width="2.8"/><path d="M-103 -8H-74V-3H-103Z" fill="url(#${m}carbon)" stroke="#d3dce2" stroke-width=".55"/>
   <g transform="rotate(${open ? -2 : -22} -78 6)"><path d="M-103 3H-73V8H-103Z" fill="${open ? '#ffc533' : paint}" stroke="#dde8ee" stroke-width=".55"/></g>
   <path d="M-104 -9V13M-73 -9V13" stroke="${accent}" stroke-width="2"/>
   <path d="M82 59H110V63H78" fill="url(#${m}carbon)" stroke="#bac8d1" stroke-width=".65"/>
   <g transform="rotate(${open ? -2 : -17} 91 52)"><path d="M80 49H109V53H80Z" fill="${open ? '#ffc533' : accent}" stroke="#dde8ee" stroke-width=".55"/></g><path d="M108 49V65" stroke="${paint}" stroke-width="2.2"/>
   ${wheel(-63, 51, 20)}${wheel(60, 53, 18)}
   ${(o.flow ?? true) ? `<path d="${open ? 'M140 -23H-138M140 -3H-138' : 'M140 -23Q-40 -23 -130 -46M140 -3Q-60 -3 -133 -22'}" fill="none" stroke="${open ? '#7cc4ff' : '#ffad90'}" stroke-width="1.7" stroke-dasharray="9 7" opacity=".8"><animate attributeName="stroke-dashoffset" from="0" to="-32" dur="${open ? '.6' : '.9'}s" repeatCount="indefinite"/></path>` : ''}</g>`;
}

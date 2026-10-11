// Original English-course cast, redrawn as inked adventure-comic figures.
// Every mark is a local vector path: no image assets, filters, or inherited paint.
const INK = '#172338';
const PAPER = '#fff8e8';
const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const path = (d, fill = 'none', stroke = INK, width = 2.2) => `<path d="${d}" fill="${fill}" stroke="${stroke}"${stroke === 'none' || width === 2.2 ? '' : ` stroke-width="${width}"`}/>`;
const ellipse = (x, y, rx, ry, fill, stroke = INK, width = 2.2) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}"${stroke === 'none' || width === 2.2 ? '' : ` stroke-width="${width}"`}/>`;
const group = (transform, marks) => `<g transform="${transform}">${marks}</g>`;
const shade = (d, fill) => path(d, fill, 'none', 0);
const line = (d, color = INK, width = 1.3) => path(d, 'none', color, width);

const cast = {
  leo: { name: 'Leo', skin: '#f4c394', skinShade: '#d68e63', shirt: '#ed493f', shirtShade: '#a82737', pants: '#3166c9', pantsShade: '#203c88', hair: '#202637', hairLight: '#526077', style: 'spiky' },
  mia: { name: 'Mia', skin: '#e9b780', skinShade: '#c67e57', shirt: '#20ae92', shirtShade: '#12685e', pants: '#9860cb', pantsShade: '#593b88', hair: '#6b3828', hairLight: '#b37243', style: 'ponytail', skirt: true },
  grant: { name: 'Mr Grant', skin: '#dfb087', skinShade: '#b77856', shirt: '#a26a42', shirtShade: '#684239', pants: '#535e73', pantsShade: '#30384d', hair: '#a9b3bf', hairLight: '#e0e5e8', style: 'side', glasses: true, mustache: true, longSleeves: true },
  rose: { name: 'Grandma Rose', skin: '#f1c9aa', skinShade: '#cc947e', shirt: '#ed88aa', shirtShade: '#a64878', pants: '#796486', pantsShade: '#4d3a60', hair: '#fff7ec', hairLight: '#ffffff', style: 'bun', glasses: true, skirt: true, longSleeves: true },
  sam: { name: 'Sam', skin: '#f3c296', skinShade: '#d48d65', shirt: '#ffd246', shirtShade: '#d98a28', pants: '#2f83c4', pantsShade: '#235080', hair: '#a64b26', hairLight: '#e88f42', style: 'cap', scale: 0.82 },
  lin: { name: 'Dr Lin', skin: '#edc398', skinShade: '#c98c6a', shirt: '#fffdf3', shirtShade: '#a1b8c9', pants: '#537083', pantsShade: '#31485f', hair: '#20232f', hairLight: '#5b6c80', style: 'bob', longSleeves: true },
  ada: { name: 'Ada', skin: '#a96b43', skinShade: '#754632', shirt: '#6cb84e', shirtShade: '#397044', pants: '#68483b', pantsShade: '#3b2c32', hair: '#302321', hairLight: '#74513c', style: 'curly' },
  bell: { name: 'Officer Bell', skin: '#d7a17b', skinShade: '#aa6e51', shirt: '#3867a4', shirtShade: '#233e6f', pants: '#273d66', pantsShade: '#172840', hair: '#3c302b', hairLight: '#70574a', style: 'police', longSleeves: true }
};

export const castNames = Object.freeze(Object.fromEntries(Object.entries(cast).map(([id, who]) => [id, who.name])));

function backHair(who) {
  if (who.style === 'ponytail') return path('M10 -132 C24 -144 34 -127 29 -115 L34 -103 L26 -98 L24 -111 L19 -113 L16 -127Z', who.hair) + shade('M25 -130 L25 -115 L29 -104 L26 -103 L22 -112 L20 -128Z', who.hairLight);
  if (who.style === 'bob') return path('M-15 -130 Q-11 -143 5 -139 Q19 -137 19 -123 L21 -99 L10 -98 L6 -117 L-8 -113 L-15 -99 L-21 -103 L-19 -122Z', who.hair) + shade('M13 -128 L17 -105 L12 -106 L9 -128Z', who.hairLight);
  if (who.style === 'bun') return path('M-8 -132 L-12 -136 L-8 -141 L0 -143 L9 -141 L12 -136 L7 -132Z', who.hair) + line('M-7 -139 L-2 -136 M3 -140 L6 -137', '#a0a8b7', 1.2);
  if (who.style === 'curly') return path('M-15 -110 L-22 -115 L-20 -122 L-24 -127 L-18 -132 L-16 -139 L-7 -139 L-1 -143 L6 -139 L14 -140 L20 -133 L23 -127 L20 -120 L21 -112 L15 -109Z', who.hair);
  return '';
}

function frontHair(who) {
  const { hair, hairLight } = who;
  switch (who.style) {
    case 'spiky': return path('M-14 -119 L-18 -131 L-10 -130 L-11 -140 L-2 -135 L5 -141 L10 -136 L18 -138 L16 -124 L11 -123 L9 -132 L1 -127 L-8 -130 L-11 -120Z', hair) + shade('M-8 -134 L-3 -131 L5 -138 L3 -132 L-2 -128Z', hairLight) + line('M9 -134 L13 -132', hairLight, 1.4);
    case 'ponytail': return path('M-14 -120 L-17 -127 L-14 -135 L-6 -140 L5 -139 L14 -134 L16 -123 L11 -122 L6 -132 L-1 -130 L-11 -131 L-11 -120Z', hair) + shade('M-11 -135 L-5 -137 L3 -136 L-1 -133 L-10 -132Z', hairLight) + path('M17 -130 L21 -129 L20 -124 L16 -125Z', '#ffca4b', INK, 1.5);
    case 'side': return path('M-13 -118 L-18 -124 L-16 -132 L-10 -136 L-4 -137 L-8 -131 L-12 -128 L-11 -119Z M11 -134 L16 -131 L18 -123 L14 -117 L11 -119 L13 -126Z', hair) + shade('M-14 -130 L-11 -131 L-14 -122Z M13 -129 L15 -126 L14 -122Z', hairLight) + line('M-6 -130 L3 -132 L8 -131', '#ad785c', 1.1);
    case 'bun': return path('M-14 -118 L-18 -126 L-14 -135 L-6 -138 L5 -138 L14 -133 L17 -124 L12 -118 L10 -128 L3 -130 L-5 -127 L-12 -128 L-11 -120Z', hair) + shade('M4 -135 L12 -131 L13 -124 L9 -129 L2 -130Z', '#b7c0ca') + line('M-12 -132 L-7 -134 M-6 -133 L-1 -135', '#9aa5b3', 1.2);
    case 'cap': return path('M-14 -121 L-17 -126 L-13 -133 L-7 -133 L-8 -121Z M10 -126 L16 -125 L14 -117 L10 -118Z', hair) + path('M-17 -128 L-15 -137 L-6 -141 L7 -140 L14 -135 L17 -128Z', '#f88a35') + shade('M4 -139 L12 -135 L15 -130 L7 -130Z', '#bc4a27') + line('M-3 -139 L-4 -130', '#ffd476', 1.6) + path('M-18 -129 L13 -131 L28 -125 L27 -122 L10 -125 L-17 -124Z', '#fca545') + line('M13 -128 L23 -125', PAPER, 1.3);
    case 'bob': return path('M-15 -121 L-17 -130 L-11 -137 L0 -140 L10 -137 L15 -130 L15 -119 L10 -123 L7 -132 L1 -129 L-9 -129 L-11 -119Z', hair) + shade('M-12 -133 L-4 -137 L4 -135 L-1 -132 L-10 -132Z', hairLight) + line('M12 -116 L15 -105', '#7d8a9a', 1.2);
    case 'curly': return path('M-16 -120 L-21 -124 L-18 -130 L-19 -135 L-12 -136 L-8 -141 L-2 -139 L3 -142 L9 -138 L15 -138 L16 -132 L21 -129 L17 -122 L12 -119 L10 -127 L5 -128 L0 -125 L-5 -129 L-12 -127 L-12 -120Z', hair) + line('M-13 -132 Q-9 -136 -7 -131 M-3 -135 Q1 -137 3 -132 M7 -133 Q12 -135 13 -130 M-17 -125 L-14 -127', hairLight, 1.8);
    case 'police': return path('M-14 -119 L-17 -127 L-12 -132 L13 -132 L17 -126 L14 -118 L11 -124 L-11 -124 L-11 -119Z', hair) + path('M-18 -132 L-16 -139 L0 -142 L17 -138 L19 -132 L13 -128 L-13 -128Z', '#284572') + shade('M2 -140 L15 -137 L16 -134 L2 -136Z', '#4672a6') + path('M-18 -132 L18 -132 L22 -127 L13 -124 L-13 -125 L-20 -128Z', '#182b4a') + path('M-4 -137 L0 -139 L4 -137 L3 -133 L0 -131 L-3 -134Z', '#ffd55b', INK, 1.3) + line('M-12 -129 L11 -128', '#7d9fce', 1.1);
    default: return '';
  }
}

function legs(who) {
  const { pants, pantsShade, skin, skinShade } = who;
  const shoes = path('M-14 -8 L-5 -8 L-4 -2 L-6 0 L-24 0 L-24 -4 L-19 -7Z', INK) + path('M6 -8 L14 -9 L19 -5 L24 -3 L24 0 L5 0 L4 -3Z', INK) + line('M-21 -3 L-8 -3 M8 -3 L20 -3', '#93a2b1', 1.2);
  if (who.skirt) return path('M-13 -32 L-4 -32 L-5 -7 L-14 -7Z M5 -32 L13 -32 L14 -7 L6 -7Z', skin) + shade('M-7 -29 L-5 -29 L-7 -9 L-11 -9Z M10 -29 L13 -30 L12 -9 L9 -9Z', skinShade) + path('M-14 -64 L14 -64 L23 -31 L14 -27 L-4 -28 L-24 -32Z', pants) + shade('M5 -61 L14 -62 L22 -32 L13 -30 L8 -41Z', pantsShade) + line('M-9 -55 L-15 -35 M2 -52 L1 -34 M12 -43 L15 -35', pantsShade, 1.5) + line('M-18 -33 L-6 -32', '#d9b3ec', 1.4) + shoes;
  return path('M-14 -63 L15 -63 L17 -39 L14 -8 L5 -7 L1 -36 L-2 -36 L-5 -8 L-15 -8 L-18 -40Z', pants) + shade('M1 -58 L7 -57 L8 -35 L11 -10 L6 -10 L0 -39 L-3 -34 L-8 -10 L-12 -10 L-8 -37 L-7 -52Z', pantsShade) + line('M-13 -54 L-8 -48 M11 -52 L9 -45 M-13 -28 L-8 -26 M8 -24 L13 -22 M-13 -12 L-7 -12 M7 -12 L13 -12', INK, 1.2) + line('M-13 -44 L-13 -34 M12 -40 L12 -31', '#85afda', 1.7) + shoes;
}

function arms(who, pose) {
  const { skin, skinShade, shirt, shirtShade, longSleeves } = who;
  const left = path('M-15 -97 L-22 -94 L-30 -79 L-30 -64 L-23 -61 L-21 -77 L-12 -88Z', longSleeves ? shirt : skin) + shade('M-25 -83 L-24 -67 L-28 -66 L-28 -78 L-20 -91Z', longSleeves ? shirtShade : skinShade) + path('M-29 -66 L-22 -65 L-21 -60 L-23 -57 L-24 -52 L-29 -53 L-32 -58Z', skin, INK, 1.8) + line('M-28 -61 L-26 -57 M-25 -61 L-24 -58', skinShade, 1.1) + path('M-15 -98 L-22 -95 L-28 -84 L-20 -78 L-12 -89Z', shirt) + shade('M-26 -85 L-20 -80 L-16 -87 L-21 -86Z', shirtShade) + line('M-26 -66 L-22 -65', INK, 1.3);
  let shape, sleeve, hand, creases;
  if (pose === 'wave') {
    shape = 'M15 -96 L21 -101 L27 -112 L29 -133 L37 -133 L36 -109 L31 -97 L24 -87Z';
    sleeve = 'M14 -98 L21 -101 L30 -97 L25 -85 L16 -87Z';
    hand = 'M30 -132 L30 -141 L27 -145 Q26 -148 28 -148 L32 -144 L31 -150 Q31 -153 34 -152 L36 -143 L37 -150 Q38 -153 40 -150 L40 -140 L42 -145 Q43 -147 45 -145 L43 -135 L38 -130Z';
    creases = line('M32 -129 L34 -117 M32 -110 L29 -103', longSleeves ? '#86a0b6' : skinShade, 1.4) + line('M34 -140 L38 -137 L35 -135', skinShade, 1.1);
  } else if (pose === 'point') {
    shape = 'M15 -97 L24 -98 L32 -98 L40 -101 L42 -94 L32 -89 L22 -86 L15 -89Z';
    sleeve = 'M14 -98 L24 -99 L27 -88 L17 -85Z';
    hand = 'M39 -101 L46 -103 L50 -104 Q52 -103 50 -101 L46 -99 L49 -97 L48 -93 L43 -92 L40 -94Z';
    creases = line('M29 -94 L36 -97', longSleeves ? '#86a0b6' : skinShade, 1.3) + line('M44 -98 L47 -97 M43 -95 L46 -95', skinShade, 1);
  } else if (pose === 'hold') {
    shape = 'M15 -97 L24 -94 L32 -80 L30 -73 L17 -68 L14 -75 L23 -79 L15 -88Z';
    sleeve = 'M14 -98 L24 -95 L29 -86 L21 -81 L14 -87Z';
    hand = 'M18 -76 L13 -78 L8 -75 L7 -70 L12 -67 L18 -69 L21 -72Z';
    creases = line('M27 -83 L28 -78 L24 -76', longSleeves ? '#86a0b6' : skinShade, 1.3) + line('M10 -74 L16 -72 M11 -71 L15 -70', skinShade, 1.1);
  } else {
    shape = 'M15 -97 L22 -94 L29 -79 L28 -64 L21 -62 L20 -77 L13 -88Z';
    sleeve = 'M14 -98 L22 -95 L28 -84 L20 -78 L12 -89Z';
    hand = 'M21 -65 L28 -66 L31 -58 L28 -53 L24 -53 L23 -58 L20 -61Z';
    creases = line('M25 -79 L25 -68', longSleeves ? '#86a0b6' : skinShade, 1.4) + line('M25 -61 L26 -57 M28 -61 L28 -58', skinShade, 1.1);
  }
  return left + path(shape, longSleeves ? shirt : skin) + path(sleeve, shirt) + line(pose === 'wave' ? 'M21 -97 L26 -96 M22 -90 L26 -89' : 'M20 -93 L23 -87', shirtShade, 2.6) + (pose === 'hold' ? '' : path(hand, skin, INK, 1.8)) + creases;
}

function outfit(who, id) {
  const { shirt, shirtShade } = who;
  let marks = path('M-8 -101 L-19 -97 L-16 -79 L-14 -61 L-2 -57 L15 -61 L17 -80 L20 -96 L8 -101Z', shirt) + shade('M8 -99 L18 -96 L14 -82 L15 -62 L6 -60 L6 -82 L1 -91Z', shirtShade) + shade('M-16 -94 L-10 -96 L-8 -85 L-13 -78Z', id === 'lin' ? '#ffffff' : '#ffffff38') + line('M-12 -73 L-5 -77 M-11 -67 L-6 -68 M9 -69 L13 -72', INK, 1.2) + line('M-6 -98 L0 -92 L7 -99', INK, 1.4);
  if (id === 'leo') marks += path('M-10 -101 L-5 -97 L5 -97 L11 -101 L12 -94 L5 -90 L-7 -91 L-12 -96Z', '#ffd346', INK, 1.9) + path('M6 -92 L12 -91 L17 -78 L9 -82 L8 -88 L4 -86Z', '#ffd346', INK, 1.8) + shade('M7 -93 L11 -95 L10 -90 L15 -81 L11 -84Z', '#db8b28') + line('M-6 -94 L1 -93', PAPER, 1.6) + line('M-12 -82 L-8 -83', '#ffb29b', 1.5);
  if (id === 'mia') marks += path('M-7 -100 L0 -94 L7 -100 L4 -102 L-4 -102Z', PAPER, INK, 1.4) + path('M-14 -63 L14 -63 L15 -59 L-14 -59Z', '#493354', INK, 1.2) + path('M-2 -63 L3 -63 L3 -59 L-2 -59Z', '#eec65f', INK, 1) + line('M-8 -88 L-3 -86', '#8bebbf', 1.5);
  if (id === 'grant') marks += path('M-8 -100 L0 -91 L8 -100 L5 -70 L-3 -67Z', '#ffe8bd', INK, 1.5) + path('M-8 -101 L-12 -91 L-7 -88 L-11 -83 L-3 -62 L0 -91Z M8 -100 L12 -91 L8 -87 L11 -82 L2 -62 L0 -91Z', shirt) + line('M-11 -74 L-5 -74 M7 -77 L12 -77', INK, 1.4) + ellipse(1, -70, 1.4, 1.4, '#e6c487', 'none', 0);
  if (id === 'rose') marks += path('M-8 -100 L-1 -92 L-7 -91 L-12 -96Z M8 -100 L-1 -92 L5 -91 L12 -96Z', '#ffbdcd', INK, 1.4) + ellipse(0, -91, 2.5, 3, '#f6d367', INK, 1) + line('M-1 -83 L-1 -65', '#ad4c74', 1.2) + [-82, -75, -68].map(y => ellipse(1, y, 1.2, 1.2, PAPER, 'none', 0)).join('');
  if (id === 'sam') marks += path('M-9 -96 L-5 -91 L5 -91 L9 -96', 'none', '#9d5b2c', 1.9) + path('M-8 -81 L0 -85 L8 -81 L5 -72 L-5 -72Z', '#fff5cf', INK, 1.5) + line('M-3 -78 L0 -80 L3 -78 L0 -75Z', '#ed7530', 2) + line('M-13 -65 L12 -65', '#f9e982', 1.6);
  if (id === 'lin') marks += path('M-8 -101 L0 -93 L8 -101 L12 -86 L17 -48 L3 -45 L0 -65 L-3 -45 L-17 -49 L-12 -85Z', '#fffdf3') + shade('M8 -97 L12 -85 L16 -49 L7 -48 L5 -75 L1 -87Z', '#bfd0d9') + path('M-7 -101 L-11 -91 L-7 -86 L-10 -81 L-1 -71 L0 -93 L7 -101 L11 -91 L7 -85 L9 -81 L1 -73', '#e9f1f3', INK, 1.2) + path('M-10 -64 L-4 -64 L-4 -55 L-10 -55Z', '#edf4f1', '#708e9f', 1) + line('M-8 -97 Q-15 -81 -7 -77 Q0 -73 7 -79 L9 -90', '#265971', 1.7) + ellipse(8, -76, 3.1, 3.1, '#769aae', INK, 1.2) + line('M-8 -97 L-8 -94 M8 -98 L8 -95', INK, 2) + path('M7 -67 L12 -67 L12 -61 L7 -61Z', '#f6fbfb', '#8299a9', 1) + line('M9.5 -66 L9.5 -62 M8 -64 L11 -64', '#d64d4d', 1.2);
  if (id === 'ada') marks += path('M-9 -100 L-5 -101 L-3 -89 L6 -89 L8 -100 L12 -99 L9 -86 L15 -56 L-16 -56 L-10 -86Z', '#e8efd3', INK, 1.7) + shade('M7 -87 L11 -75 L14 -57 L6 -57 L3 -78Z', '#adc396') + path('M-8 -73 L6 -73 L5 -63 L-6 -63Z', '#cee0ba', INK, 1.2) + line('M-8 -83 L8 -83 M-3 -72 L-3 -65 M-11 -60 L-7 -62', '#667b53', 1.2);
  if (id === 'bell') marks += path('M-8 -100 L0 -94 L8 -100 L5 -91 L0 -94 L-5 -91Z', '#7397c0', INK, 1.3) + path('M-1 -93 L2 -93 L4 -77 L0 -72 L-3 -77Z', '#182b4a', INK, 1) + path('M-19 -96 L-11 -98 L-10 -94 L-17 -92Z M12 -98 L19 -96 L17 -92 L10 -94Z', '#f0c75a', INK, 1) + path('M-11 -86 L-7 -88 L-3 -85 L-5 -80 L-8 -79 L-11 -82Z', '#ffd868', INK, 1.2) + path('M5 -84 L12 -84 L11 -79 L5 -79Z', '#284572', INK, 1.1) + path('M-14 -65 L15 -65 L15 -59 L-14 -59Z', '#172840', INK, 1.3) + path('M-3 -65 L3 -65 L3 -59 L-3 -59Z', '#edc653', INK, 1) + line('M7 -82 L10 -82', '#a3b9d5', 1);
  return marks;
}

function face(who, mood) {
  const { skin, skinShade } = who;
  const ear = path('M-13 -121 L-17 -121 L-17 -115 L-13 -112Z M13 -121 L17 -120 L16 -114 L12 -112Z', skin, INK, 1.6);
  const head = path('M-13 -128 L-8 -135 L3 -137 L11 -132 L14 -123 L12 -112 L7 -105 L0 -102 L-8 -106 L-13 -114Z', skin) + shade('M8 -130 L13 -124 L11 -113 L6 -106 L0 -104 L-2 -107 L5 -110 L7 -117Z', skinShade) + shade('M-10 -127 L-6 -131 L-2 -131 L-5 -125 L-10 -123Z', '#fff2ca55') + line('M0 -120 L-2 -114 L2 -113', '#915c49', 1.1);
  const worried = mood === 'worried', surprised = mood === 'surprised';
  const brow = worried ? 'M-10 -123 L-5 -125 M4 -125 L9 -122' : surprised ? 'M-10 -127 L-5 -128 M4 -128 L9 -126' : 'M-10 -123 L-5 -124 M4 -124 L9 -122';
  const eyes = [-6, 6].map(x => path(`M${x - 2.9} -120 Q${x} ${surprised ? -124.5 : -123} ${x + 2.8} -120 Q${x} ${surprised ? -116 : -118} ${x - 2.9} -120Z`, '#fffdf3', INK, 1) + ellipse(x + 0.4, -120, 1.35, surprised ? 2.05 : 1.5, INK, 'none', 0)).join('');
  const mouth = surprised ? path('M-2 -109 Q0 -112 3 -109 L3 -106 Q0 -103 -2 -106Z', '#703d42', INK, 1.3) : worried ? line('M-4 -106 Q0 -111 5 -107', INK, 1.4) : path('M-5 -110 Q0 -107 6 -111 L3 -106 L-1 -106Z', '#fffdf3', INK, 1.2);
  const glasses = who.glasses ? path('M-12 -123 L-2 -123 L-2 -117 L-10 -116Z M2 -123 L12 -123 L10 -116 L2 -117Z', 'none', INK, 1.5) + line('M-2 -121 L2 -121 M-15 -122 L-12 -121 M12 -121 L15 -122', INK, 1.3) + line('M-10 -121 L-7 -122 M4 -121 L7 -122', '#fff6e2', 1.1) : '';
  const age = who.glasses ? line('M-11 -112 L-8 -111 M8 -112 L10 -113 M-4 -129 L4 -129', skinShade, 1) : '';
  const mustache = who.mustache ? path('M-8 -112 L-3 -115 L0 -113 L3 -115 L8 -112 L6 -109 L0 -111 L-5 -109Z', who.hair, INK, 1.1) + line('M-4 -113 L-2 -112 M3 -113 L5 -112', '#dce2e6', 1) : '';
  return ear + head + line(brow, INK, 1.6) + eyes + mouth + age + glasses + mustache;
}

/** Draw an original character at a shared foot baseline (y=216).
 * Local anatomy is slender and angular; poses leave room for panel speech.
 * Unknown IDs use Leo, matching the course's original fallback behavior.
 */
export function person(whoId, x, { pose = 'wave', mood = 'happy', flip = false } = {}) {
  const id = Object.hasOwn(cast, whoId) ? whoId : 'leo';
  const who = cast[id], scale = who.scale ?? 1;
  const safePose = ['stand', 'wave', 'point', 'hold'].includes(pose) ? pose : 'stand';
  const safeMood = ['happy', 'worried', 'surprised'].includes(mood) ? mood : 'happy';
  const neck = path('M-7 -108 L7 -108 L8 -99 L1 -94 L-8 -100Z', who.skin, INK, 1.8) + shade('M-6 -106 L6 -107 L5 -102 L0 -99 L-6 -101Z', who.skinShade);
  return `<g stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" data-character="${escape(id)}" data-pose="${safePose}" data-mood="${safeMood}" transform="translate(${Number(x)} 216) scale(${flip ? -scale : scale} ${scale})">${ellipse(0, 1, 29, 3.4, '#17233a24', 'none', 0)}${backHair(who)}${legs(who)}${arms(who, safePose)}${neck}${outfit(who, id)}${safePose === 'hold' ? path('M18 -76 L13 -78 L8 -75 L7 -70 L12 -67 L18 -69 L21 -72Z', who.skin, INK, 1.8) + line('M10 -74 L16 -72 M11 -71 L15 -70', who.skinShade, 1.1) : ''}${face(who, safeMood)}${frontHair(who)}</g>`;
}

/** Mr Muddle keeps his lavender fog, spiral eyes, and crooked top hat. */
export function muddle(x, y = 220, s = 1) {
  const mist = path('M-27 -8 L-38 -17 L-31 -27 L-40 -41 L-34 -57 L-25 -65 L-28 -80 L-20 -93 L-7 -96 L4 -100 L19 -94 L29 -83 L28 -71 L39 -62 L42 -44 L34 -35 L40 -21 L29 -11 L14 -8 L4 -1 L-11 -6 L-22 -2Z', '#aa91d1', INK, 2.8) + shade('M15 -91 L27 -80 L24 -67 L34 -61 L37 -46 L28 -37 L35 -23 L26 -15 L13 -13 L4 -6 L-6 -10 L8 -24 L18 -33 L15 -50 L20 -65Z', '#68569e') + shade('M-24 -72 L-28 -57 L-34 -47 L-31 -37 L-21 -44 L-16 -58 L-18 -71Z M-16 -86 L-7 -91 L1 -90 L-6 -82Z', '#d7c4ef') + line('M-31 -24 L-20 -20 L-13 -23 M20 -29 L25 -33 M-25 -55 L-20 -59 M-20 -30 L-16 -32', '#4e427a', 1.4);
  const collar = path('M-21 -54 L-7 -42 L0 -48 L6 -42 L22 -57 L18 -37 L6 -29 L0 -34 L-9 -29 L-22 -41Z', '#7863a7', INK, 1.8) + path('M-12 -41 L-3 -39 L0 -42 L3 -39 L12 -42 L10 -32 L3 -36 L0 -33 L-3 -36 L-11 -32Z', '#f05e60', INK, 1.7) + shade('M1 -40 L10 -40 L8 -35 L3 -37Z', '#b02f4f');
  const face = path('M-23 -84 L-11 -92 L8 -91 L24 -82 L23 -65 L14 -53 L0 -49 L-16 -55 L-24 -68Z', '#baa4df', INK, 2.2) + shade('M12 -87 L22 -80 L20 -66 L13 -57 L0 -53 L-3 -57 L7 -61 L11 -72Z', '#8870b6') + line('M-17 -79 L-6 -83 M5 -83 L16 -78', INK, 2.4) + path('M-17 -72 C-18 -80 -5 -81 -4 -72 C-3 -64 -14 -63 -14 -70 C-14 -75 -7 -75 -8 -71', '#fff9e8', INK, 1.7) + path('M5 -72 C4 -80 17 -80 18 -72 C19 -64 8 -63 8 -70 C8 -75 15 -75 14 -71', '#fff9e8', INK, 1.7) + path('M-2 -72 L-5 -65 L1 -63 L4 -66', '#aa8ac8', INK, 1.3) + path('M-12 -60 L-2 -57 L13 -62 L8 -54 L0 -52 L-8 -55Z', '#fff9e8', INK, 1.6) + line('M-5 -58 L-5 -55 M2 -58 L2 -54 M8 -60 L7 -56', '#8a729c', 1.1);
  const hat = group('rotate(-8 0 -93)', path('M-20 -96 L-22 -129 L-10 -133 L19 -130 L21 -96Z', '#252638', INK, 2.7) + shade('M-16 -126 L-10 -129 L-9 -105 L-16 -103Z', '#60607a') + shade('M12 -127 L17 -126 L18 -107 L12 -108Z', '#101729') + path('M-20 -107 L20 -107 L21 -98 L-20 -97Z', '#f06366', INK, 1.6) + shade('M8 -106 L19 -106 L20 -100 L9 -100Z', '#a52f51') + path('M-31 -98 L-17 -101 L20 -100 L32 -96 L30 -91 L10 -88 L-17 -89 L-32 -92Z', '#252638', INK, 2.3) + line('M-24 -94 L-12 -93 L13 -92', '#7d7b94', 1.3));
  const punctuation = group('translate(46 -90) rotate(10)', path('M-3 -12 Q-1 -19 5 -16 Q11 -14 6 -8 L2 -5 L2 -2', 'none', '#f6ce50', 3.5) + ellipse(2, 3, 1.7, 1.7, '#f6ce50', INK, 0.8) + line('M13 -16 L12 -6', '#f6ce50', 3.5) + ellipse(12, -1, 1.7, 1.7, '#f6ce50', INK, 0.8));
  return `<g stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" data-character="muddle" transform="translate(${Number(x)} ${Number(y)}) scale(${Number(s)})">${ellipse(0, 1, 33, 4, '#17233a24', 'none', 0)}${mist}${collar}${face}${hat}${punctuation}</g>`;
}

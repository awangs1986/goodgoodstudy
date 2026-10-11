// Original, standalone vocabulary objects, matching the shared comic kit's palette.
// Do not use comic-kit propsFor here: its scene keywords intentionally match actions,
// locations and related objects, which would make picture-to-word checks misleading.
import { S, c, e, p, r } from './comic-kit.mjs';

const objects = {
  postcard: {
    description: '一张横放的浅色硬卡片，中央有竖线，右上角有齿边小方块，右半边排列三条短横线。',
    draw: () => `${r(17, 27, 126, 76, '#fff3d6', 'rx="3"')}${p('M80 37 V93 M94 65 H130 M94 78 H124 M94 91 H132')}${r(113, 35, 22, 22, '#8bbbd4', 'stroke-dasharray="2 3"')}${p('M26 82 L41 57 L55 76 L65 64 L72 85Z', '#8bb883')}${c(39, 45, 6, '#f5c452')}`,
  },
  parcel: {
    description: '棕色长方体包着纸，交叉细绳绕过顶部和侧面，顶部右侧贴有浅色小方签。',
    draw: () => `${p('M22 42 L72 22 L139 44 L90 67Z', '#d8b583')}${p('M22 42 L90 67 V110 L22 85Z', '#be925c')}${p('M90 67 L139 44 V87 L90 110Z', '#a97b4e')}${p('M45 33 L113 56 V99 M113 34 L62 56 V100', 'none')}${p('M93 34 L111 40 L97 46 L80 40Z', '#fff3d6')}`,
  },
  diamond: {
    description: '浅蓝色透明几何块的顶部较平，两侧折成棱角，下半部分收成一个尖点，内部有交错折线。',
    draw: () => `${p('M37 35 H123 L145 63 L80 113 L15 63Z', '#bfe8f2')}${p('M15 63 H145 M37 35 L57 63 L80 113 L103 63 L123 35 M57 63 L80 35 L103 63')}${p('M80 9 V21 M9 29 L20 38 M140 27 L151 16', 'none')}`,
  },
  boot: {
    description: '一只棕色鞋的筒部高过脚踝，前方鞋头向右延伸，底部有厚深色鞋底，筒前排列系带。',
    draw: () => `${p('M36 19 H84 V66 Q88 78 118 81 Q141 83 141 104 H32 V79 L36 68Z', '#b47c48')}${p('M32 104 H141 V114 H29Z', '#514138')}${p('M48 25 H75 M48 37 H75 M48 49 H75 M48 61 H75 M36 80 H88')}${p('M42 19 V71', 'none')}`,
  },
  tent: {
    description: '绿色三角顶的布面支在草地上，正面开着三角形入口，两侧细绳斜拉到地面的短桩。',
    draw: () => `${p('M8 111 H153', 'none')}${p('M23 104 L69 21 L126 104Z', '#78ae85')}${p('M69 21 L101 26 L147 104 H126Z', '#538568')}${p('M45 103 L69 53 L94 103Z', '#293746')}${p('M27 80 L10 109 M122 79 L152 109 M10 104 V117 M151 104 V117')}`,
  },
  mirror: {
    description: '竖立的金色椭圆框中间是浅蓝色平滑表面，表面有两道白色斜光，底部连着短杆和底座。',
    draw: () => `${r(75, 94, 10, 18, '#be925c')}${e(80, 115, 37, 7, '#be925c')}${e(80, 56, 42, 50, '#e0ba69')}${e(80, 56, 34, 42, '#cde9f0')}${p('M60 54 L91 27 M62 72 L99 39', 'none', 'style="stroke:white;stroke-width:7"')}`,
  },
  snake: {
    description: '没有四肢的绿色细长身体盘成连续弯曲，前端略宽，有小眼睛和伸出的分叉细舌。',
    draw: () => `${p('M24 103 Q137 125 124 81 Q117 61 74 70 Q19 78 35 42 Q44 26 84 43 Q103 51 118 36', 'none', 'style="stroke:#539968;stroke-width:18"')}${e(124, 30, 19, 13, '#68ac76')}${c(127, 25, 2, '#1d1a26')}${p('M142 33 L154 33 M154 33 L159 28 M154 33 L159 38', 'none', 'style="stroke:#be4c53;stroke-width:2"')}`,
  },
  wheel: {
    description: '黑色粗圆环包着浅色内圈，中央小圆轴向四周伸出多根细辐条，整体呈圆盘形。',
    draw: () => `${c(80, 64, 48, '#384551')}${c(80, 64, 35, '#c7d1d9')}${[0,45,90,135].map(a => `<g transform="rotate(${a} 80 64)">${p('M45 64 H115')}</g>`).join('')}${c(80, 64, 9, '#7b91a3')}`,
  },
  telescope: {
    description: '斜朝左上方的蓝色长圆筒由三脚架支撑，较宽端有圆形玻璃面，窄端接着弯折的小目镜。',
    draw: () => `${p('M79 64 V82 M79 82 L43 117 M79 82 L80 121 M79 82 L118 117')}${p('M37 18 L112 50 L101 76 L26 44Z', '#699dbf')}${e(30, 30, 10, 15, '#cce8f3', 'transform="rotate(24 30 30)"')}${p('M107 59 L128 68 V82', 'none', 'style="stroke:#3a5268;stroke-width:10"')}${p('M120 81 H138')}`,
  },
  shark: {
    description: '灰蓝色流线身体有尖鼻和张开的带齿嘴，背上竖起高三角鳍，尾端上下分叉，侧面有三条短弧线。',
    draw: () => `${p('M30 64 L10 34 L14 91 L39 78 Q85 107 147 66 Q111 25 58 52 L73 22 L96 48', '#6b98ad')}${p('M48 75 L68 106 L78 81', '#5c8195')}${p('M119 65 L142 68 L127 78Z', '#fff')}${p('M123 69 L126 75 L129 70 L133 73 M96 54 Q91 64 96 75 M103 55 Q98 64 103 74')}${c(127, 57, 2, '#1d1a26')}`,
  },
  balloon: {
    description: '红色椭圆薄膜体的底端扎着小结，下方接一根弯曲的细线，表面留有一块白色弧形高光。',
    draw: () => `${e(80, 47, 36, 42, '#df6c75')}${p('M75 89 L72 98 H88 L84 88Z', '#bf5360')}${p('M80 98 Q100 108 77 116 Q65 122 82 125')}${p('M60 39 Q58 24 73 18', 'none', 'style="stroke:white;stroke-width:6"')}`,
  },
  ladder: {
    description: '两根平行长杆斜靠着，上下之间由多条短横档连接，底端分别落在地面。',
    draw: () => `${p('M46 119 L72 9 M100 119 L126 9', 'none', 'style="stroke:#aa7a4b;stroke-width:9"')}${[25,44,63,82,101].map(y => p(`M${69-(y-9)*.235} ${y} H${123-(y-9)*.235}`, 'none', 'style="stroke:#c79765;stroke-width:6"')).join('')}${p('M22 121 H137')}`,
  },
  umbrella: {
    description: '半圆弧形顶篷分成几瓣，下方连着一根底端弯曲的长柄。',
    draw: () => `${p('M80 18 V104 Q80 116 68 112 Q63 110 63 104')}${p('M24 62 Q32 20 80 20 Q128 20 136 62 Q122 51 108 62 Q94 51 80 62 Q66 51 52 62 Q38 51 24 62Z', '#e5484d')}${p('M80 20 Q56 32 52 62 M80 20 Q104 32 108 62')}`,
  },
  coat: {
    description: '左右伸出两条长袖，中央对开，领口翻折，正面有一列圆扣。',
    draw: () => `${p('M56 24 L68 19 H92 L104 24 L130 65 L112 76 L101 56 L108 111 H52 L59 56 L48 76 L30 65Z', '#8c6fd1')}${p('M68 19 L80 36 L69 50 L60 28 M92 19 L80 36 L91 50 L100 28', '#bca7ed')}${p('M80 36 V111 M57 82 H70 M90 82 H103')}${[58, 74, 90].map(y => c(85, y, 2, '#ffe45c')).join('')}`,
  },
  pen: {
    description: '细长的蓝色杆身侧边带有夹片，一端是有中央细缝的菱形金属尖头。',
    draw: () => `<g transform="rotate(34 80 64)">${r(72, 24, 16, 61, '#3b82c4', 'rx="5"')}${r(72, 18, 16, 15, '#234f80', 'rx="3"')}${p('M87 25 H93 V48', 'none')}${p('M72 85 H88 L93 95 L80 115 L67 95Z', '#ffd166')}${p('M80 96 V115')}${c(80, 94, 2, '#1d1a26')}</g>`,
  },
  watch: {
    description: '圆形白色盘面内有两根指针，上下各接一段棕色长带。',
    draw: () => `${r(67, 9, 26, 110, '#9a6a3c', 'rx="6"')}${r(67, 13, 26, 12, '#f2b866', 'rx="2"')}${r(110, 56, 8, 15, '#ffd166', 'rx="2"')}${c(80, 64, 33, '#ffd166')}${c(80, 64, 27, '#fff')}${p('M80 43 V64 L94 73 M80 40 V43 M104 64 H101 M80 88 V85 M56 64 H59')}${c(80, 64, 2, '#1d1a26')}`,
  },
  book: {
    description: '两片展开的矩形封面内夹着浅色薄页，中间有一道竖向折缝。',
    draw: () => `${p('M23 29 Q53 22 80 35 Q107 22 137 29 V103 Q107 96 80 109 Q53 96 23 103Z', '#e5484d')}${p('M29 22 Q55 17 80 30 Q105 17 131 22 V96 Q105 91 80 103 Q55 91 29 96Z', '#fff3d6')}${p('M80 30 V103 M36 88 Q57 87 73 94 M87 94 Q103 87 124 88')}`,
  },
  apple: {
    description: '红色圆润轮廓的顶部和底部略微凹陷，顶端伸出短梗和一片绿叶。',
    draw: () => `${p('M79 37 Q56 19 39 38 Q20 61 39 96 Q53 119 79 107 Q105 119 121 93 Q139 59 119 38 Q101 20 79 37Z', '#ff5d5d')}${p('M80 37 Q77 22 86 15')}${p('M86 28 Q93 9 111 17 Q106 34 86 28Z', '#5cc06a')}${p('M47 47 Q37 57 39 68')}`,
  },
  bicycle: {
    description: '两个同样大的圆轮由三角形细架相连，上方分别有小坐垫和弯曲握把。',
    draw: () => `${c(35, 89, 24, '#fff')}${c(124, 89, 24, '#fff')}${p('M35 89 L58 51 L82 89Z M58 51 H109 L82 89 M109 51 L124 89', 'none')}${p('M82 89 L88 97 H96 M58 51 L54 40 M43 40 H66 M109 51 L104 31 H121 L128 40')}${c(82, 89, 5, '#e5484d')}`,
  },
  key: {
    description: '一端是中空圆环，另一端延伸出细长金色杆，杆的末端有两处直角凸齿。',
    draw: () => `${p('M54 59 H138 V74 H129 V89 H117 V74 H104 V85 H92 V74 H54Z', '#ffd166')}${c(42, 66, 27, '#ffd166')}${c(42, 66, 13, '#fff')}`,
  },
  chair: {
    description: '方形平面上方竖起一块高靠背，下方伸出四条细长支脚。',
    draw: () => `${p('M54 69 V111 M97 68 V108 M102 82 V115 M44 82 V116', 'none')}${p('M49 69 V21 H94 V69', '#b98a52')}${p('M54 31 H89 M54 41 H89')}${p('M49 64 H94 L109 83 H39Z', '#d9a464')}${p('M39 83 V89 H109 V83', '#b98a52')}`,
  },
  table: {
    description: '宽大的棕色水平平面呈透视四边形，四个角下方各有一条长支脚。',
    draw: () => `${r(39, 51, 9, 49, '#8d6136')}${r(112, 51, 9, 49, '#8d6136')}${r(27, 64, 10, 48, '#9a6a3c')}${r(123, 64, 10, 48, '#9a6a3c')}${p('M39 36 H121 L144 63 V71 H16 V63Z', '#c48d58')}${p('M16 63 H144 M121 36 L144 63')}`,
  },
  fish: {
    description: '横向椭圆的身体带有圆眼，背部和腹部有三角形薄片，尾端分叉。',
    draw: () => `${p('M66 43 L79 26 L96 47 M69 83 L80 102 L95 82', '#3b82c4')}${p('M46 63 L17 42 V89 L46 74Z', '#3b82c4')}${p('M43 66 Q70 26 112 49 Q128 57 141 67 Q128 84 110 90 Q70 105 43 66Z', '#6ec6ff')}${p('M104 49 Q94 66 105 88 M78 60 L66 72 L80 76')}${c(121, 63, 4, '#fff')}${c(122, 63, 1, '#1d1a26')}`,
  },
  guitar: {
    description: '木色的双弧形中空主体中央有圆孔，连接长窄颈部，六根细线贯穿上下。',
    draw: () => `${p('M67 50 Q49 41 46 59 Q43 70 53 77 Q33 95 48 110 Q60 123 80 115 Q100 123 112 110 Q127 95 107 77 Q117 70 114 59 Q111 41 93 50Z', '#f2b866')}${r(74, 23, 12, 54, '#9a6a3c')}${r(70, 7, 20, 22, '#c48d58', 'rx="4"')}${p('M70 12 H65 M90 12 H95 M70 18 H65 M90 18 H95 M70 24 H65 M90 24 H95')}${c(80, 83, 11, '#1d1a26')}${r(65, 102, 30, 5, '#9a6a3c')}<path d="M75 12 V103 M77 12 V103 M79 12 V103 M81 12 V103 M83 12 V103 M85 12 V103" stroke="#f8e9bb" stroke-width="1" fill="none"/>`,
  },
  train: {
    description: '带烟囱的前车头连接一节有窗的长车厢，多组圆轮下方是两道平行轨道。',
    draw: () => `${p('M12 108 H149 M12 118 H149 M23 108 V118 M47 108 V118 M71 108 V118 M95 108 V118 M119 108 V118 M143 108 V118')}${r(12, 48, 63, 41, '#5aa9e6', 'rx="4"')}${[20, 38, 56].map(x => r(x, 56, 12, 15, '#d9f1ff', 'rx="2"')).join('')}${p('M75 87 H86')}${r(83, 36, 31, 53, '#3b82c4', 'rx="3"')}${r(88, 43, 20, 23, '#d9f1ff', 'rx="2"')}${r(114, 60, 28, 29, '#5aa9e6', 'rx="3"')}${r(123, 39, 12, 21, '#3b82c4')}${r(119, 34, 20, 7, '#1d1a26')}${[27, 61, 97, 132].map(x => c(x, 94, 9, '#44404f')).join('')}${p('M90 94 H138', 'none')}`,
  },
  banana: {
    description: '一根长而弯曲的黄色果实，两端较细，内侧凹弧与外侧圆弧之间有一道细纹。',
    draw: () => `${p('M30 39 Q53 96 115 72 Q131 64 139 45 Q142 76 113 98 Q54 135 24 64 L20 46Z', '#ffd23f')}${p('M30 52 Q58 119 119 87')}${p('M20 46 L16 36 L26 30 L32 42Z', '#9a6a3c')}${p('M135 49 L137 39 L143 39 L141 50Z', '#9a6a3c')}`,
  },
};

// Each spelling is deliberate. In particular, "la livre" (a unit of weight),
// "la montre" versus "montrer", or "la gare" must not inherit a similar noun's art.
const english = new Map([
  ['postcard', 'postcard'], ['parcel', 'parcel'], ['diamond', 'diamond'], ['boot', 'boot'],
  ['tent', 'tent'], ['mirror', 'mirror'], ['snake', 'snake'], ['wheel', 'wheel'],
  ['telescope', 'telescope'], ['shark', 'shark'], ['balloon', 'balloon'], ['ladder', 'ladder'],
  ['seat', 'chair'],
  ['umbrella', 'umbrella'], ['coat', 'coat'], ['pen', 'pen'], ['watch', 'watch'],
  ['book', 'book'], ['apple', 'apple'], ['bicycle', 'bicycle'], ['bike', 'bicycle'],
  ['key', 'key'], ['chair', 'chair'], ['table', 'table'], ['fish', 'fish'],
  ['guitar', 'guitar'], ['train', 'train'], ['banana', 'banana'],
]);
const french = new Map([
  ['parapluie', 'umbrella'], ['le parapluie', 'umbrella'], ['un parapluie', 'umbrella'],
  ['manteau', 'coat'], ['le manteau', 'coat'], ['un manteau', 'coat'],
  ['stylo', 'pen'], ['le stylo', 'pen'], ['un stylo', 'pen'],
  ['montre', 'watch'], ['la montre', 'watch'], ['une montre', 'watch'],
  ['livre', 'book'], ['le livre', 'book'], ['un livre', 'book'],
  ['pomme', 'apple'], ['la pomme', 'apple'], ['une pomme', 'apple'],
  ['vélo', 'bicycle'], ['le vélo', 'bicycle'], ['un vélo', 'bicycle'],
  ['bicyclette', 'bicycle'], ['la bicyclette', 'bicycle'], ['une bicyclette', 'bicycle'],
  ['clé', 'key'], ['la clé', 'key'], ['une clé', 'key'],
  ['clef', 'key'], ['la clef', 'key'], ['une clef', 'key'],
  ['chaise', 'chair'], ['la chaise', 'chair'], ['une chaise', 'chair'],
  ['table', 'table'], ['la table', 'table'], ['une table', 'table'],
  ['poisson', 'fish'], ['le poisson', 'fish'], ['un poisson', 'fish'],
  ['guitare', 'guitar'], ['la guitare', 'guitar'], ['une guitare', 'guitar'],
  ['train', 'train'], ['le train', 'train'], ['un train', 'train'],
  ['banane', 'banana'], ['la banane', 'banana'], ['une banane', 'banana'],
]);
const languages = new Map([['en', english], ['english', english], ['fr', french], ['french', french]]);

/**
 * Exact vocabulary whitelist, never a scene-keyword/substring search.
 * @param {string} word A vocabulary entry, including its French article if present.
 * @param {'en'|'fr'|'english'|'french'} language
 * @returns {{key: string, svg: string, description: string}|null}
 * The caller must expose description as the picture's accessible description.
 * The SVG itself is hidden from assistive technology to avoid duplicate reading.
 */
export function pictureForWord(word, language) {
  if (typeof word !== 'string' || typeof language !== 'string') return null;
  const vocabulary = languages.get(language.trim().toLowerCase());
  const key = vocabulary?.get(word.normalize('NFC').trim().toLowerCase().replace(/\s+/g, ' '));
  if (!key) return null;
  const { draw, description } = objects[key];
  return {
    key,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 128" aria-hidden="true" focusable="false" ${S}>${draw()}</svg>`,
    description,
  };
}

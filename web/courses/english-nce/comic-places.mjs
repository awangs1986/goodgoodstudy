// Original, hand-inked American-comic environments for the English course.
// Fragments use no SVG ids or shared-kit helpers, so any number of panels can coexist.
// Staging: keep the lower centre open for teaching props and the 222–247 caption band calm.
const INK = '#172338';
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const attrs = object => Object.entries(object).filter(([, v]) => v !== undefined).map(([k, v]) => `${k}="${esc(v)}"`).join(' ');
const shape = (tag, geometry, fill = 'none', options = {}) => `<${tag} ${attrs({ ...geometry, fill, ...options })}/>`;
const r = (x,y,width,height,fill,options) => shape('rect',{x,y,width,height},fill,options);
const p = (d,fill='none',options) => shape('path',{d},fill,options);
const e = (cx,cy,rx,ry,fill,options) => shape('ellipse',{cx,cy,rx,ry},fill,options);
const c = (cx,cy,radius,fill,options) => shape('circle',{cx,cy,r:radius},fill,options);
const l = (x1,y1,x2,y2,options={}) => shape('line',{x1,y1,x2,y2},'none',{'stroke-width':1.2,...options});
const flat = (x,y,w,h,fill) => r(x,y,w,h,fill,{stroke:'none'});
const text = (x,y,value,size=12,fill=INK) => `<text ${attrs({x,y,fill,stroke:'none','font-family':"'Arial Narrow','Helvetica Neue',Arial,sans-serif",'font-weight':800,'font-size':size,'text-anchor':'middle','letter-spacing':'.65'})}>${esc(value)}</text>`;
const hatch = (x,y,count=5,length=10,spacing=5,color=INK) => Array.from({length:count},(_,i)=>l(x+i*spacing,y,x+i*spacing-length*.42,y+length,{stroke:color,'stroke-width':.8})).join('');
const dots = (x,y,cols=7,rows=3,color=INK) => Array.from({length:rows},(_,j)=>Array.from({length:cols},(_,i)=>c(x+i*5+(j%2)*2.5,y+j*5,.65,color,{stroke:'none'})).join('')).join('');
const room = (wall='#eee7d3',side='#d6c9af',floor='#c7ac86') => `${flat(0,0,400,250,wall)}${p('M0 0 H24 V169 L0 186Z',side,{stroke:'none'})}${p('M364 0 H400 V185 L364 169Z',side,{stroke:'none'})}${flat(0,169,400,81,floor)}${p('M0 185 L24 169 H364 L400 185', 'none',{'stroke-width':2.2})}${l(24,0,24,169,{'stroke-width':1.8})}${l(364,0,364,169,{'stroke-width':1.8})}${p('M0 17 L24 29 H364 L400 17','none',{stroke:'#fff8e9','stroke-width':3})}${p('M0 218 L110 169 M400 216 L296 169 M149 250 L178 169 M267 250 L224 169','none',{stroke:INK,'stroke-width':.7,opacity:.25})}`;
const window = (x,y,w,h) => `${p(`M${x+4} ${y+4} h${w} v${h} h-${w}Z`,'#ab9f88',{stroke:'none'})}${r(x,y,w,h,'#a6d7e0')}${p(`M${x+3} ${y+3} H${x+w-3} L${x+3} ${y+h-3}Z`,'#dcefeb',{stroke:'none'})}${l(x+w*.54,y,x+w*.54,y+h,{'stroke-width':3})}${l(x,y+h*.57,x+w,y+h*.57,{'stroke-width':3})}${r(x-4,y+h,w+8,5,'#faf2df',{'stroke-width':1.5})}`;
const sky = (color='#b5dcea') => `${flat(0,0,400,250,color)}${p('M10 56 H66 Q72 43 88 48 Q92 35 108 40 Q127 38 135 56 H181','none',{stroke:'#eef4e9','stroke-width':7})}${p('M288 30 H324 Q330 20 342 25 Q352 11 367 25 H400','none',{stroke:'#edf4ea','stroke-width':6})}`;
const tree = (x,y,s=1) => `<g transform="translate(${x} ${y}) scale(${s})">${p('M-7 0 L-4 -48 L-20 -68 L-14 -73 L1 -59 L14 -81 L19 -77 L6 -48 L9 0Z','#95734c')}${p('M-34 -51 L-42 -63 L-38 -82 L-27 -86 L-30 -99 L-11 -115 L4 -110 L15 -120 L34 -107 L35 -95 L47 -87 L42 -65 L28 -57 L23 -43 L4 -44 L-10 -37 L-26 -43Z','#79a77b')}${p('M-37 -65 L-16 -71 L-10 -59 L10 -69 L25 -65 L44 -79 L42 -65 L28 -57 L23 -43 L4 -44 L-10 -37 L-26 -43Z','#49775d',{stroke:'none'})}${p('M-22 -88 L-10 -97 L1 -92 M9 -80 L21 -90 L33 -83','none',{stroke:'#c4d6a2','stroke-width':2})}${l(0,-42,1,-7,{stroke:'#d1aa71','stroke-width':1.4})}${hatch(11,-52,4,9,4)}</g>`;
const books = (x,y,count=7,step=14) => '<g stroke-width="1.2">'+Array.from({length:count},(_,i)=>{
  const height=22+(i%3)*5, color=['#b96a58','#6a92a0','#bd9c51','#778974','#967990'][i%5];
  return `${r(x+i*step,y-height,step-3,height,color)}${p(`M${x+i*step+3} ${y-height+5} h${step-9}`,'none',{stroke:'#f2e4c6'})}`;
}).join('')+'</g>';

const scenes = {
  home: () => `${room('#f1e3c6','#d9c5a1','#c5a274')}
    ${window(249,44,87,68)}${p('M250 118 L337 118 L367 170 H308Z','#e4c692',{stroke:'none'})}
    ${r(49,42,49,39,'#a67448')}${r(54,47,39,29,'#f6edd8',{'stroke-width':1.2})}${p('M55 71 L66 60 L76 68 L84 55 L93 70 V76 H55Z','#7d9a99',{'stroke-width':1})}
    ${p('M23 167 L130 167 L161 184 L53 184Z','#9c795d',{stroke:'none'})}
    ${p('M24 132 L37 120 H127 L144 135 V168 H24Z','#bd6258')}${p('M37 120 H127 L137 131 H31Z','#de8b73',{'stroke-width':1.4})}
    ${r(33,133,50,28,'#d98570',{'stroke-width':1.6,rx:3})}${r(85,133,49,28,'#d98570',{'stroke-width':1.6,rx:3})}
    ${p('M28 153 H135 L143 164 H24Z','#e9a081',{'stroke-width':1.7})}${r(20,143,15,30,'#bd6258',{rx:3})}${r(131,143,15,30,'#b75851',{rx:3})}
    ${flat(36,166,94,6,'#944c48')}${l(29,173,29,179,{'stroke-width':4})}${l(136,173,136,179,{'stroke-width':4})}${hatch(116,165,4,6,4)}
    ${p('M350 169 H374 L369 149 H355Z','#bd805b')}${p('M362 151 L348 128 L351 121 L361 130 L364 111 L370 110 L369 137 L381 124 L385 130 L368 152Z','#729572',{'stroke-width':1.5})}${dots(26,87,7,4,'#b99773')}`,

  kitchen: () => `${room('#dce9df','#b6ccbc','#e5d9bb')}
    ${flat(24,86,247,57,'#f4edda')}${[100,119,138].map(y=>l(24,y,271,y,{stroke:'#9aafa4',opacity:.6})).join('')}${[48,84,120,156,192,228,264].map(x=>l(x,86,x,142,{stroke:'#9aafa4',opacity:.6})).join('')}
    ${r(30,38,110,46,'#91b9af')}${l(85,39,85,82,{'stroke-width':1.5})}${l(75,58,75,69,{'stroke-width':2})}${l(96,58,96,69,{'stroke-width':2})}${flat(32,78,106,5,'#699589')}
    ${p('M174 48 H220 L231 78 H163Z','#dae2da')}${r(184,30,27,19,'#b5c8c0',{'stroke-width':1.6})}${r(160,77,74,6,'#78958d',{'stroke-width':1.5})}${hatch(175,77,9,5,5)}
    ${p('M24 132 H271 L283 142 H15Z','#faf3e1')}${r(24,143,249,27,'#bca376')}${flat(24,164,249,6,'#927f5b')}${l(91,145,91,166,{'stroke-width':1.5})}${l(164,145,164,167,{'stroke-width':1.5})}${l(114,151,139,151,{'stroke-width':2})}
    ${p('M168 128 H232 L244 138 H163Z','#667471',{'stroke-width':1.4})}${e(184,132,10,2.5,'#303c40',{'stroke-width':1})}${e(220,132,10,2.5,'#303c40',{'stroke-width':1})}${r(169,144,70,24,'#4a5d5e',{'stroke-width':1.5})}${r(176,149,56,14,'#34444c',{'stroke-width':1})}
    ${p('M298 49 L309 41 H377 V170 H298Z','#edf0df')}${p('M365 42 H377 V170 H365Z','#c3d1c9',{'stroke-width':1.4})}${l(298,91,365,91,{'stroke-width':1.8})}${l(307,70,307,81,{'stroke-width':3})}${l(307,102,307,122,{'stroke-width':3})}${hatch(369,146,2,16,4)}${dots(281,47,3,7,'#90aca0')}`,

  classroom: () => `${room('#eee7c8','#d4c799','#c2ab87')}
    ${p('M75 40 H328 V136 H75Z','#b18b58',{stroke:'none'})}${r(69,34,254,95,'#96734d')}${r(77,42,238,78,'#345f56',{'stroke-width':1.6})}${p('M81 45 H311 V61 H81Z','#3c6b5d',{stroke:'none'})}
    ${p('M100 78 h46 M100 92 h82 M100 107 h62 M203 78 h73 M203 92 h51','none',{stroke:'#e5e8c9','stroke-width':2.4,opacity:.8})}${p('M264 106 l9 -10 l10 10 l-10 8Z','none',{stroke:'#d2dcad','stroke-width':1.5})}
    ${r(68,126,258,7,'#c5a173',{'stroke-width':1.6})}${r(244,122,28,5,'#b5c1a4',{'stroke-width':1})}${l(93,125,109,125,{stroke:'#f8edc8','stroke-width':2.3})}${hatch(80,132,8,4,5)}
    ${c(347,61,14,'#f8f0d6',{'stroke-width':2})}${p('M347 51 V61 L354 64','none',{'stroke-width':1.6})}
    ${p('M271 150 H365 L385 161 H260Z','#d1af71')}${p('M260 161 H385 V168 H260Z','#96724c',{'stroke-width':1.8})}${r(270,168,7,14,'#765d43',{'stroke-width':1.5})}${r(372,168,7,20,'#765d43',{'stroke-width':1.5})}${p('M346 146 H366 L371 150 H344Z','#c58169',{'stroke-width':1.2})}${dots(29,87,5,5,'#b5a67c')}`,

  shop: () => `${room('#eee2ce','#d7c3a9','#cbb99a')}
    ${r(24,49,153,116,'#907657')}${flat(30,55,141,107,'#cfba92')}${[88,123,157].map((y,row)=>`${[39,63,88,113,138,157].map((x,i)=>`${r(x,y-23-(i%2)*6,i===5?9:17,23+(i%2)*6,['#c77b68','#d5b762','#81a7a1','#9d8a9e'][(i+row)%4],{'stroke-width':1.2})}${flat(x+2,y-16, i===5?5:13,7,'#efe5c6')}`).join('')}${r(27,y,148,5,'#a88a60',{'stroke-width':1.3})}`).join('')}
    ${p('M239 33 H377 V66 H239Z','#937455',{stroke:'none'})}${r(233,27,140,33,'#ecd079')}${text(303,48,'CORNER SHOP',13)}${l(247,53,359,53,{stroke:'#9e8041','stroke-width':1})}
    ${p('M254 122 H376 L390 135 H242Z','#e3c29a')}${p('M242 135 H390 V172 H242Z','#79a599')}${p('M372 135 H390 V172 H372Z','#54877e',{stroke:'none'})}${r(253,142,109,21,'#93b9aa',{'stroke-width':1.4})}
    ${p('M300 108 H333 L344 124 H292Z','#5c6d72',{'stroke-width':1.8})}${r(300,96,31,16,'#4a5c64',{'stroke-width':1.7})}${r(304,99,22,9,'#c6dec1',{'stroke-width':1})}${l(294,127,343,127,{'stroke-width':2})}${hatch(376,145,3,16,4)}${dots(192,89,6,4,'#b8a27e')}`,

  street: () => `${sky('#b9d9e3')}
    ${p('M0 33 H85 V162 L0 177Z','#c7957d')}${p('M85 33 L105 47 V162 H85Z','#99745f')}${p('M0 33 H85 L105 47 H0Z','#edc6a0')}
    ${[57,91,125].map(y=>[13,48].map(x=>`${r(x,y,22,23,'#667f89',{'stroke-width':1.6})}${p(`M${x+2} ${y+2} H${x+20} L${x+2} ${y+17}Z`,'#b9d7d8',{stroke:'none'})}${l(x-2,y+25,x+25,y+25,{'stroke-width':2})}`).join('')).join('')}
    ${p('M110 74 H174 V159 H110Z','#aab6b2')}${p('M174 74 L188 84 V159 H174Z','#7e9392')}${[87,113].map(y=>[120,145].map(x=>r(x,y,15,16,'#e9d9a5',{'stroke-width':1.4})).join('')).join('')}
    ${p('M296 52 L322 36 H400 V178 L296 160Z','#bfa06d')}${p('M296 52 L322 36 V167 L296 160Z','#8d805e')}${flat(323,37,77,131,'#e4c084')}${l(322,36,322,167,{'stroke-width':2.5})}${[55,90,125].map(y=>[335,374].map(x=>r(x,y,20,23,'#677f84',{'stroke-width':1.6})).join('')).join('')}${l(323,82,400,82,{'stroke-width':1.5})}
    ${p('M0 175 L194 145 H225 L400 180 V250 H0Z','#aeb2ad')}${p('M129 250 L194 151 H224 L288 250Z','#687983',{'stroke-width':1.5})}${p('M0 187 L194 150 M400 190 L226 151','none',{'stroke-width':1.7})}
    ${[0,1,2,3].map(i=>p(`M${169-i*5} ${188+i*7} H${244+i*4} L${247+i*4} ${191+i*7} H${166-i*5}Z`,'#eee9cf',{stroke:'none'})).join('')}
    ${l(267,78,267,172,{'stroke-width':4})}${p('M258 77 V61 Q267 53 276 61 V77Z','#efcd78',{'stroke-width':2})}${l(256,79,278,79,{'stroke-width':3})}${hatch(304,122,3,15,5)}${dots(91,97,2,7,'#655d52')}`,

  park: () => `${sky('#bfdde3')}
    ${p('M0 130 Q65 106 133 125 Q211 96 274 126 Q330 98 400 121 V250 H0Z','#b4c99b',{'stroke-width':1.7})}${p('M0 158 L66 140 L139 155 L239 138 L320 153 L400 141 V250 H0Z','#8fad80',{stroke:'none'})}
    ${p('M120 250 Q143 193 225 158 L253 150 L268 156 Q197 190 199 250Z','#dfccaa',{'stroke-width':1.3})}${p('M161 250 Q158 201 244 157','none',{stroke:'#b4a280','stroke-width':1.1})}
    ${p('M24 181 L68 174 L116 183 L75 193Z','#6c9271',{stroke:'none'})}${tree(48,184,.9)}${tree(360,179,.93)}
    ${p('M256 151 H325 L337 157 H250Z','#b49668',{'stroke-width':1.5})}${r(258,128,66,7,'#bd9b66',{'stroke-width':1.5})}${r(258,139,66,7,'#bd9b66',{'stroke-width':1.5})}${l(263,147,258,169,{'stroke-width':3})}${l(322,146,329,169,{'stroke-width':3})}
    ${p('M109 177 l-3 -7 M114 176 l3 -10 M285 193 l-4 -6 M291 193 l2 -9 M20 205 l-4 -6 M25 204 l2 -9','none',{stroke:'#547b59','stroke-width':1.3})}${dots(321,185,5,3,'#618263')}`,

  station: () => `${flat(0,0,400,250,'#cddad8')}
    ${p('M0 18 H400 V41 H0Z','#6f8b8b')}${p('M0 41 H400 L340 61 H43Z','#a3b9b2',{'stroke-width':1.5})}${p('M15 41 L59 62 M93 41 L119 62 M168 41 L177 62 M243 41 L236 62 M318 41 L295 62 M393 41 L353 62','none',{stroke:'#7c9792','stroke-width':1.2})}
    ${flat(0,61,400,90,'#bbc9c3')}${p('M-13 85 Q-13 70 4 70 H387 L407 94 V156 H-13Z','#76a9b1')}${p('M0 137 H400 V155 H0Z','#447784',{stroke:'none'})}
    ${[7,91,175,307].map(x=>`${r(x,84,65,40,'#c1dce0',{'stroke-width':2})}${p(`M${x+3} 87 H${x+59} L${x+3} 118Z`,'#e5efdd',{stroke:'none'})}${l(x+32,86,x+32,122,{'stroke-width':1.2})}`).join('')}${r(253,80,40,71,'#97bfbe',{'stroke-width':1.8})}${r(259,86,27,34,'#d6e7df',{'stroke-width':1.3})}${l(281,128,281,139,{'stroke-width':2})}${l(0,134,400,134,{stroke:'#e9c474','stroke-width':4})}
    ${l(292,39,292,51,{'stroke-width':2})}${l(357,39,357,51,{'stroke-width':2})}${r(270,50,110,25,'#354c58')}${text(325,67,'PLATFORM 2',12,'#f3db91')}
    ${flat(0,157,400,93,'#b7b8aa')}${p('M0 154 H400 V162 H0Z','#6b7776',{'stroke-width':1.4})}${flat(0,162,400,7,'#e1c178')}${Array.from({length:30},(_,i)=>c(8+i*13,165.5,.8,'#8c794c',{stroke:'none'})).join('')}${p('M0 201 H400 M119 250 L179 170 M290 250 L254 170','none',{stroke:'#929d94','stroke-width':.8})}${hatch(8,145,12,7,5,'#30545f')}`,

  office: () => `${room('#e3e9df','#bdc9bc','#a5aca1')}
    ${window(39,42,91,75)}${p('M43 95 H61 V77 H75 V102 H86 V84 H106 V99 H126 V113 H43Z','#91b1b1',{stroke:'none'})}${l(88,43,88,117,{'stroke-width':2.5})}${l(40,85,129,85,{'stroke-width':2.5})}
    ${r(153,42,68,49,'#9a9b83')}${r(158,47,58,39,'#f2eed9',{'stroke-width':1.2})}${p('M164 77 L174 68 L183 73 L195 56 L209 61','none',{stroke:'#648d90','stroke-width':2})}${l(165,81,208,81,{stroke:'#a8a58e','stroke-width':1})}
    ${p('M239 133 H365 L390 147 H225Z','#c6aa7a')}${p('M225 147 H390 V154 H225Z','#886f52',{'stroke-width':1.5})}${r(235,154,7,25,'#677173',{'stroke-width':1.5})}${r(378,154,7,32,'#677173',{'stroke-width':1.5})}
    ${r(275,83,71,48,'#364b58',{rx:2})}${r(281,89,59,35,'#9fcdd1',{'stroke-width':1.1})}${p('M284 92 H337 L284 121Z','#c6e1d9',{stroke:'none'})}${r(302,131,12,8,'#768b8d',{'stroke-width':1.5})}${p('M293 139 H323 L328 143 H288Z','#62787d',{'stroke-width':1.5})}
    ${p('M247 143 L253 137 H277 L283 143Z','#dedec9',{'stroke-width':1.2})}${r(354,122,12,16,'#bb9460',{'stroke-width':1.2})}${p('M357 121 L354 109 M363 121 L365 108','none',{'stroke-width':1.5})}
    ${r(28,138,26,31,'#8d9e97',{'stroke-width':1.5})}${p('M30 136 L47 136 L48 121 L32 121Z','#d4c59d',{'stroke-width':1.3})}${hatch(29,151,4,12,5)}${dots(151,112,7,4,'#a8b5a6')}`,

  hospital: () => `${room('#e8eee1','#c6d6ca','#bfd0c3')}
    ${flat(24,116,340,7,'#8aaea2')}${l(24,123,364,123,{stroke:'#72998d','stroke-width':1.5})}
    ${r(165,38,60,58,'#f9f4e6')}${p('M188 49 H202 V61 H214 V75 H202 V87 H188 V75 H176 V61 H188Z','#bf675c',{'stroke-width':1.2})}
    ${r(33,60,62,73,'#b1c3b7',{'stroke-width':1.8})}${r(39,66,50,61,'#eff0df',{'stroke-width':1.2})}${l(64,66,64,127,{'stroke-width':1.1})}${l(59,93,59,103,{'stroke-width':1.7})}${l(69,93,69,103,{'stroke-width':1.7})}
    ${l(341,44,341,116,{stroke:'#718e86','stroke-width':1.2})}${p('M341 44 H392 V126 L383 121 L374 126 L365 121 L355 125 L341 121Z','#a5c8bc',{'stroke-width':1.5})}${[349,362,375,388].map(x=>l(x,49,x,115,{stroke:'#7da89c','stroke-width':1.1})).join('')}
    ${p('M263 136 H366 L390 152 H245Z','#f4f3e1')}${p('M245 152 H390 V164 H245Z','#c8dbd1',{'stroke-width':1.8})}${p('M295 137 H364 L386 151 H295Z','#9fc1ba',{'stroke-width':1.3})}${p('M254 139 L264 130 H286 L295 139 L287 147 H259Z','#fff9e8',{'stroke-width':1.4})}
    ${p('M248 164 V179 M382 164 V184 M248 174 H381','none',{stroke:'#6f8d8a','stroke-width':3})}${c(249,182,3,'#596d6f',{'stroke-width':1})}${c(382,186,3,'#596d6f',{'stroke-width':1})}${p('M245 151 V128 Q245 122 251 123 M390 151 V139','none',{stroke:'#607e7c','stroke-width':3})}${dots(116,124,6,4,'#a7bcae')}`,

  cafe: () => `${room('#eedfc4','#d1b693','#bea17a')}
    ${p('M35 39 H155 V112 H35Z','#d0ad76',{stroke:'none'})}${r(30,34,120,72,'#8c6a4d')}${r(37,41,106,58,'#3f5752',{'stroke-width':1.2})}${text(90,59,'MENU',14,'#f1e8cb')}${p('M49 70 H103 M49 81 H96 M113 70 h14 M111 81 h16','none',{stroke:'#dbe0bc','stroke-width':1.7})}${l(49,63,131,63,{stroke:'#b9c5a4','stroke-width':.9})}
    ${r(196,91,165,6,'#a18459',{'stroke-width':1.6})}${[211,247,283,319].map(x=>`${p(`M${x} 73 H${x+19} L${x+17} 89 H${x+2}Z`,'#f2ecda',{'stroke-width':1.4})}${p(`M${x+19} 77 Q${x+29} 76 ${x+20} 85`,'none',{'stroke-width':1.4})}`).join('')}
    ${p('M262 115 H365 L383 126 H251Z','#ab8060')}${r(251,127,131,43,'#728f80',{'stroke-width':2})}${p('M255 133 H373 V166 H255Z','#83a090',{'stroke-width':1.2})}${l(313,135,313,165,{'stroke-width':1.1})}
    ${r(310,102,38,17,'#738c89',{'stroke-width':1.5})}${r(306,94,44,10,'#c0c9b6',{'stroke-width':1.5})}${c(341,107,3,'#e4cc86',{'stroke-width':1})}
    ${l(284,30,284,46,{'stroke-width':2})}${p('M278 46 H290 L302 61 H266Z','#c48d64',{'stroke-width':1.6})}${l(271,63,297,63,{stroke:'#f4e1ac','stroke-width':3})}
    ${p('M27 166 L39 159 H111 L125 167 L114 173 H38Z','#e5c795',{'stroke-width':1.8})}${p('M73 173 V188 M60 190 H85','none',{stroke:'#596a67','stroke-width':3})}${hatch(258,161,9,7,6)}${dots(166,118,5,4,'#bda17d')}`,

  bedroom: () => `${room('#e4e2df','#c5bfc0','#bda082')}
    ${window(40,45,82,68)}${p('M36 42 H54 L48 110 L37 118Z','#9caaad',{'stroke-width':1.5})}${p('M109 42 H126 L128 118 L115 110Z','#9caaad',{'stroke-width':1.5})}${p('M42 48 L41 105 M120 49 L122 105','none',{stroke:'#c6ced0','stroke-width':1.1})}
    ${r(267,40,49,35,'#9a8066',{'stroke-width':1.6})}${r(272,45,39,25,'#d1d6c7',{'stroke-width':1})}${p('M273 67 L286 54 L294 61 L303 51 L310 67Z','#8c9b91',{'stroke-width':1})}
    ${p('M256 129 V103 H378 V166 L363 176 H247Z','#997959')}${p('M260 112 H375 V138 H260Z','#b89971',{'stroke-width':1.4})}${p('M250 129 H359 L386 153 H228Z','#f5efd9')}${p('M228 153 H386 V171 H228Z','#739cad')}${p('M284 131 H359 L386 153 H282Z','#8bb5bd',{'stroke-width':1.4})}${p('M282 153 H386 V171 H282Z','#638da1',{'stroke-width':1.4})}${p('M247 133 L258 124 H279 L290 135 L283 144 H253Z','#faf2dd',{'stroke-width':1.4})}
    ${l(234,171,234,182,{'stroke-width':5})}${l(378,172,378,183,{'stroke-width':5})}${hatch(354,160,5,9,5)}
    ${p('M161 131 H197 L204 139 H155Z','#bc9a6d',{'stroke-width':1.5})}${r(157,139,45,30,'#a98663',{'stroke-width':1.6})}${l(158,153,200,153,{'stroke-width':1.2})}${l(176,146,184,146,{'stroke-width':1.7})}${l(178,131,178,114,{'stroke-width':2})}${p('M167 95 H189 L196 115 H160Z','#e7c582',{'stroke-width':1.5})}${dots(143,61,6,5,'#b0a5a5')}`,

  airport: () => `${flat(0,0,400,250,'#d7e7e3')}
    ${flat(0,40,400,114,'#a5cdd6')}${p('M0 120 L131 107 L257 118 L400 106 V157 H0Z','#c5d0c0',{stroke:'none'})}${p('M0 139 L400 123 V153 H0Z','#a3b0aa',{stroke:'none'})}${l(150,142,336,134,{stroke:'#e5e3c7','stroke-width':2})}
    ${p('M181 99 L257 91 L282 69 L292 71 L280 91 L322 92 Q338 94 349 101 L326 105 L274 106 L249 123 H233 L247 106 L200 108 L187 103Z','#f4f0dc',{'stroke-width':1.8})}${p('M274 106 L248 119 H240 L257 105Z','#849ca4',{stroke:'none'})}${p('M285 75 L280 89 L290 84Z','#ba7765',{stroke:'none'})}${[214,225,236,247,258,300,311].map(x=>l(x,98,x+4,98,{stroke:'#54717f','stroke-width':2})).join('')}
    ${[17,135,253,382].map(x=>`${p(`M${x} 34 H${x+6} V158 H${x}Z`,'#647f85',{'stroke-width':1})}${l(x+7,42,x+7,151,{stroke:'#edf3dc','stroke-width':1.7})}`).join('')}${l(0,77,400,77,{stroke:'#729097','stroke-width':2})}${r(0,32,400,10,'#97afa9',{'stroke-width':1.7})}
    ${l(277,0,277,16,{'stroke-width':2})}${l(375,0,375,16,{'stroke-width':2})}${r(259,16,132,29,'#344d59')}${text(325,35,'DEPARTURES',12,'#efd991')}
    ${flat(0,157,400,93,'#ced2bf')}${l(0,157,400,157,{'stroke-width':2.5})}${p('M12 216 L141 159 M390 216 L274 159 M126 250 L185 159 M288 250 L227 159 M0 193 H400','none',{stroke:'#a0b0a4','stroke-width':.8})}
    ${p('M27 144 H104 L115 163 H25Z','#718f97',{'stroke-width':1.5})}${p('M25 163 H115 V169 H25Z','#536f7b',{'stroke-width':1.4})}${l(33,169,30,178,{'stroke-width':2})}${l(105,169,108,178,{'stroke-width':2})}${l(68,145,70,162,{'stroke-width':1.3})}${dots(3,48,3,5,'#7296a1')}`,

  beach: () => `${sky('#b4dce4')}
    ${c(348,44,21,'#efd48b',{'stroke-width':1.7})}${p('M0 125 Q68 117 137 125 T268 123 T400 120 V178 H0Z','#73b3c2',{'stroke-width':1.8})}
    ${p('M0 142 Q84 131 163 144 T312 139 T400 137 V179 H0Z','#8ec8c9',{stroke:'none'})}${p('M0 158 Q96 143 171 161 Q260 174 400 150 V250 H0Z','#e7d0a3',{'stroke-width':1.8})}${p('M0 158 Q96 143 171 161 Q260 174 400 150','none',{stroke:'#f2f0d4','stroke-width':5})}
    ${p('M23 132 h29 M92 136 h39 M210 133 h28 M304 133 h54 M159 149 h20','none',{stroke:'#d0e4d8','stroke-width':1.4})}
    ${p('M9 177 L46 169 L72 178 L52 184 L18 184Z','#c5b086',{stroke:'none'})}${p('M30 178 L38 141 L43 143 L38 179Z','#b1996e',{'stroke-width':1.3})}${p('M5 143 Q37 104 71 143 L54 139 L39 144 L22 139Z','#bf7861',{'stroke-width':1.8})}${p('M22 139 Q32 115 39 119 Q47 123 54 139 L39 144Z','#ebc58a',{'stroke-width':1.2})}
    ${p('M358 189 l11 -4 l10 5 l-7 4Z','#c3ae86',{'stroke-width':1.1})}${p('M119 182 l3 -2 M277 202 l4 -1 M337 180 l3 -1','none',{stroke:'#a99b75','stroke-width':1.5})}${dots(29,195,9,3,'#b3a071')}${dots(348,204,6,2,'#b3a071')}`,

  library: () => `${room('#e8dfc6','#c6b393','#bea27a')}
    ${window(175,43,54,71)}${p('M175 116 L229 116 L253 167 H200Z','#d8c293',{stroke:'none'})}
    ${[[22,127],[252,128]].map(([x,w])=>`${p(`M${x+4} 39 H${x+w+7} V174 H${x+4}Z`,'#9c845d',{stroke:'none'})}${r(x,34,w,134,'#8c6d4e',{'stroke-width':2})}${flat(x+6,40,w-12,121,'#b49b70')}${[79,119,157].map((y,row)=>`${books(x+11,y,5,21)}${r(x+4,y,w-8,5,'#a98358',{'stroke-width':1.3})}${l(x+5,y+6,x+w-5,y+6,{stroke:'#705c42','stroke-width':1.1})}${row===1?hatch(x+16,y+6,10,4,7,'#705c42'):''}`).join('')}${r(x,34,5,135,'#a2865b',{'stroke-width':1})}${r(x+w-5,34,5,135,'#705b42',{'stroke-width':1})}`).join('')}
${dots(161,126,4,5,'#b6a17b')}`,

  countryside: () => `${sky('#bbd9df')}
    ${p('M0 131 Q67 100 137 119 Q227 82 311 117 Q359 96 400 115 V250 H0Z','#b1bf82',{'stroke-width':1.7})}${p('M0 159 L80 131 L188 153 L287 121 L400 146 V250 H0Z','#91a974',{'stroke-width':1.3})}
    ${p('M0 192 L80 146 L163 171 L241 155 L400 180 V250 H0Z','#c9bd7e',{'stroke-width':1.2})}${p('M0 207 L79 158 L145 178 M0 219 L79 167 L130 184 M266 165 L383 210 M292 163 L400 201','none',{stroke:'#a3965f','stroke-width':1.4})}
    ${p('M215 250 Q200 202 269 161 L284 157 Q236 208 262 250Z','#dcc69a',{'stroke-width':1.3})}
    ${p('M282 95 H345 V149 H282Z','#ead1a5')}${p('M345 95 L371 109 V147 L345 149Z','#b99d79',{'stroke-width':1.6})}${p('M275 97 L314 64 L353 96Z','#b76f56')}${p('M314 64 L343 72 L376 108 L353 97Z','#884f42',{'stroke-width':1.5})}${r(293,106,17,20,'#7f9b9a',{'stroke-width':1.3})}${l(301,107,301,125,{stroke:'#e9d7b2','stroke-width':1})}${l(294,116,309,116,{stroke:'#e9d7b2','stroke-width':1})}${r(322,119,15,30,'#8b7458',{'stroke-width':1.5})}${r(353,116,10,14,'#77928f',{'stroke-width':1.2})}${p('M291 82 V65 H303 V75Z','#ab8260',{'stroke-width':1.3})}${hatch(348,135,4,9,4)}
    ${tree(39,172,.68)}${[16,49,82,115].map((x,i)=>p(`M${x} ${165-i*2} l3 -5 l3 5 v25 h-6Z`,'#e8ddbc',{'stroke-width':1.4})).join('')}${p('M12 174 L125 167 M12 182 L125 175','none',{stroke:'#e8ddbc','stroke-width':4})}${p('M12 174 L125 167 M12 182 L125 175','none',{stroke:'#756c4e','stroke-width':.8})}${dots(325,197,9,3,'#978d5b')}`
};

// Stroke defaults are inherited once rather than repeated on hundreds of ink marks.
export const places = Object.fromEntries(Object.entries(scenes).map(([key, draw]) => [key,
  () => `<g stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">${draw()}</g>`
]));

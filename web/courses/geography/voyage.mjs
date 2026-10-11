// 航海玩法规则（纯函数，无 DOM，测试直接导入）。简化但讲道理：距离按大圆航段累加，风按季风/信风/西风带简化。
import { ports, portById, routes, chapters, lessons } from './course.mjs';
export const MAP = { latN: 78, latS: -72, width: 2880, height: 1200 };
export const SHIPS = [
  { level: 1, name: '小帆船', speed: 5, cargo: 10, supply: 50, cost: 0 },
  { level: 2, name: '双桅船', speed: 7, cargo: 20, supply: 70, cost: 600 },
  { level: 3, name: '三桅帆船', speed: 9, cargo: 35, supply: 100, cost: 1500 }
];
export const SUPPLY_PRICE = 1; // 每份粮食或淡水 1 金币，船员每天各吃 1 份
export const QUIZ_REWARD = 120;
const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
export const monthName = day => MONTHS[Math.floor(((day % 360) + 360) % 360 / 30)];
export const monthIndex = day => Math.floor(((day % 360) + 360) % 360 / 30);

export function freshVoyage() { return { gold: 200, ship: 1, food: 30, water: 30, at: 'shanghai', day: 0, cargo: {}, visited: ['shanghai'], discoveries: [], log: [{ day: 0, text: '从上海黄浦江畔启航，环球航行开始！' }], rewarded: [] }; }
export function normalizeVoyage(v) {
  const f = freshVoyage(); if (!v || typeof v !== 'object') return f;
  const num = (x, d, lo = 0, hi = 1e7) => (Number.isFinite(x) ? Math.min(hi, Math.max(lo, Math.round(x))) : d);
  const ids = new Set(ports.map(p => p.id));
  const ship = num(v.ship, 1, 1, 3), cap = SHIPS[ship - 1].supply;
  const cargo = {}; if (v.cargo && typeof v.cargo === 'object') for (const [k, n] of Object.entries(v.cargo)) if (goodById[k] && Number.isFinite(n) && n > 0) cargo[k] = Math.round(n);
  const list = (a, ok) => [...new Set(Array.isArray(a) ? a.filter(ok) : [])];
  return { gold: num(v.gold, f.gold), ship, food: num(v.food, f.food, 0, cap), water: num(v.water, f.water, 0, cap), at: ids.has(v.at) ? v.at : f.at, day: num(v.day, 0),
    cargo, visited: list(v.visited, x => ids.has(x)).concat(ids.has(v.at) && !(v.visited ?? []).includes(v.at) ? [v.at] : []), discoveries: list(v.discoveries, x => ids.has(x)), rewarded: list(v.rewarded, x => ids.has(x)),
    log: (Array.isArray(v.log) ? v.log : f.log).filter(e => e && typeof e.text === 'string').slice(-60).map(e => ({ day: num(e.day, 0), text: String(e.text).slice(0, 200) })) };
}
export const goodById = Object.fromEntries(ports.flatMap(p => p.goods.map(g => [g.id, { ...g, port: p.id, chapter: p.chapter }])));
const chapterIndex = id => chapters.findIndex(c => c.id === id);
// 越远的海区卖得越贵（环形距离），本海区只能打六折回收。南极科研纪念品不能买卖。
export function sellPrice(goodId, portId) {
  const g = goodById[goodId]; if (!g || !g.price) return 0;
  const a = chapterIndex(g.chapter), b = chapterIndex(portById[portId].chapter), n = chapters.length;
  const ring = Math.min(Math.abs(a - b), n - Math.abs(a - b));
  return ring === 0 ? Math.round(g.price * 0.6) : Math.round(g.price * (1 + 0.22 * ring));
}
export function routePoints(a, b) {
  const r = routes.find(([x, y]) => (x === a && y === b) || (x === b && y === a)); if (!r) return null;
  const pts = [[portById[r[0]].lat, portById[r[0]].lon], ...r[2], [portById[r[1]].lat, portById[r[1]].lon]];
  return r[0] === a ? pts : pts.reverse();
}
export const routeName = (a, b) => routes.find(([x, y]) => (x === a && y === b) || (x === b && y === a))?.[3] ?? null;
export function neighbors(id) { return routes.filter(([a, b]) => a === id || b === id).map(([a, b]) => (a === id ? b : a)); }
const rad = d => d * Math.PI / 180;
export function nm([la1, lo1], [la2, lo2]) { // 大圆距离（海里）
  const dl = rad(lo2 - lo1), a = Math.sin(rad(la2 - la1) / 2) ** 2 + Math.cos(rad(la1)) * Math.cos(rad(la2)) * Math.sin(dl / 2) ** 2;
  return 3440.065 * 2 * Math.asin(Math.min(1, Math.sqrt(a)));
}
// 风：返回 { factor, note }。印度洋/南海季风；低纬信风（东风，向西顺）；中纬西风（向东顺）。
export function wind(points, day) {
  const m = monthIndex(day);
  let east = 0; for (let i = 1; i < points.length; i += 1) { let d = points[i][1] - points[i - 1][1]; if (d > 180) d -= 360; if (d < -180) d += 360; east += d; }
  const lat = points.reduce((s, p) => s + p[0], 0) / points.length, lon = points.reduce((s, p) => s + p[1], 0) / points.length;
  const dir = east >= 0 ? 1 : -1;
  if (lon > 40 && lon < 125 && lat > -10 && lat < 30) {
    const sw = m >= 5 && m <= 8, ne = m >= 10 || m <= 2;
    if (sw) return dir > 0 ? { factor: 1.3, note: '西南季风顺风，船帆鼓鼓！' } : { factor: 0.75, note: '逆着西南季风，航行吃力。' };
    if (ne) return dir < 0 ? { factor: 1.3, note: '东北季风顺风，一路向西南。' } : { factor: 0.75, note: '逆着东北季风，航行吃力。' };
    return { factor: 1, note: '季风转换期，风向不定。' };
  }
  if (Math.abs(lat) < 28) return dir < 0 ? { factor: 1.2, note: '乘着信风向西，顺风顺水。' } : { factor: 0.9, note: '逆着信风向东，要多抢风。' };
  if (Math.abs(lat) >= 35 && Math.abs(lat) < 62) return dir > 0 ? { factor: 1.2, note: '搭上西风带，向东飞驰。' } : { factor: 0.85, note: '顶着西风带向西，比较慢。' };
  return { factor: 1, note: '风平浪静。' };
}
export function plan(v, to) {
  const pts = routePoints(v.at, to); if (!pts) return null;
  let dist = 0; for (let i = 1; i < pts.length; i += 1) dist += nm(pts[i - 1], pts[i]);
  const w = wind(pts, v.day), ship = SHIPS[v.ship - 1];
  const days = Math.max(1, Math.ceil(dist / (ship.speed * 24 * w.factor)));
  return { to, points: pts, distance: Math.round(dist), days, wind: w, via: routeName(v.at, to) };
}
// 港口是否可去：港口课已解锁（按课程顺序）。
export const portLesson = id => lessons.find(l => l.portId === id);
